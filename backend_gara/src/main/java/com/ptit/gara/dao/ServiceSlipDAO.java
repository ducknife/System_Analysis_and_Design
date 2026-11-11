package com.ptit.gara.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.AppointmentDetail;
import com.ptit.gara.model.Car;
import com.ptit.gara.model.Component;
import com.ptit.gara.model.ComponentDetail;
import com.ptit.gara.model.Service;
import com.ptit.gara.model.ServiceDetail;
import com.ptit.gara.model.ServiceSlip;
import com.ptit.gara.model.Staff;
import com.ptit.gara.model.Status;

@Repository
public class ServiceSlipDAO extends DAO {

    public ServiceSlip createServiceSlip(ServiceSlip ss) {
        em.persist(ss);
        return ss;
    }

    public void saveServiceSlip(ServiceSlip ss) {
        double total = 0;
        for (ServiceDetail detail : ss.getListServiceDetail()) {
            total += detail.getPrice();
        }
        for (ComponentDetail detail : ss.getListComponentDetail()) {
            total += detail.getQty() * detail.getPrice();
        }
        ss.setTotalCost(total);
        ss.setStatus(Status.SLIP_WAITING);
        em.merge(ss);
    }

    public List<ServiceSlip> findServiceSlipByKeyword(String keyword) {
        String text = keyword == null ? "" : keyword.trim();
        String digits = text.replaceAll("\\D", "");
        int id = digits.isEmpty() || digits.length() > 9 ? -1 : Integer.parseInt(digits);
        return em.createQuery("""
                select ss from ServiceSlip ss
                where ss.status = :status
                and (ss.serviceSlipID = :id
                    or lower(ss.appointmentDetail.car.licensePlate) like :text
                    or lower(ss.appointmentDetail.appointment.customer.fullname) like :text)
                order by ss.time
                """, ServiceSlip.class)
                .setParameter("status", Status.SLIP_WAITING)
                .setParameter("id", id)
                .setParameter("text", "%" + text.toLowerCase() + "%")
                .getResultList();
    }

    public void updateServiceSlip(ServiceSlip ss) {
        em.merge(ss);
    }

    public void addServiceToSlip(ServiceSlip ss, Service sv) {
        ServiceDetail detail = new ServiceDetail();
        detail.setServiceSlip(ss);
        detail.setService(sv);
        detail.setPrice(sv.getPrice());
        detail.setLaborContent(sv.getLaborContent());
        ss.getListServiceDetail().add(detail);
        em.persist(detail);
    }

    public void addComponentToSlip(ServiceSlip ss, Component c, int qty) {
        ComponentDetail detail = ss.findComponentDetail(c.getComponentID());
        if (detail != null) {
            detail.setQty(detail.getQty() + qty);
            return;
        }
        detail = new ComponentDetail();
        detail.setServiceSlip(ss);
        detail.setComponent(c);
        detail.setQty(qty);
        detail.setPrice(c.getPrice());
        ss.getListComponentDetail().add(detail);
        em.persist(detail);
    }

    public void assignStaffToServiceDetail(ServiceSlip ss, Service sv, Staff st) {
        ss.findServiceDetail(sv.getServiceID()).setStaff(st);
    }

    public void removeServiceFromSlip(ServiceSlip ss, Service sv) {
        ss.getListServiceDetail().remove(ss.findServiceDetail(sv.getServiceID()));
    }

    public void removeComponentFromSlip(ServiceSlip ss, Component c) {
        ss.getListComponentDetail().remove(ss.findComponentDetail(c.getComponentID()));
    }

    public ServiceSlip findDraftServiceSlipOfCar(Car car) {
        return em.createQuery("select ss from ServiceSlip ss where ss.appointmentDetail.car = :car and ss.status = :status", ServiceSlip.class)
                .setParameter("car", car)
                .setParameter("status", Status.SLIP_DRAFT)
                .getResultStream().findFirst().orElse(null);
    }

    public boolean hasServiceSlip(AppointmentDetail ad) {
        return !em.createQuery("select ss from ServiceSlip ss where ss.appointmentDetail = :detail", ServiceSlip.class)
                .setParameter("detail", ad)
                .getResultList().isEmpty();
    }
}
