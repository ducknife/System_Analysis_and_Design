package com.ptit.gara.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblServiceSlip")
public class ServiceSlip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceSlipID;
    private LocalDateTime time;
    private String status;
    private Double totalCost;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "appointmentDetailID")
    private AppointmentDetail appointmentDetail;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "slotID")
    private Slot slot;

    @OneToMany(mappedBy = "serviceSlip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ServiceDetail> listServiceDetail = new ArrayList<>();

    @OneToMany(mappedBy = "serviceSlip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ComponentDetail> listComponentDetail = new ArrayList<>();

    @OneToMany(mappedBy = "serviceSlip", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SlipHandling> listSlipHandling = new ArrayList<>();

    public Car getCar() {
        return appointmentDetail.getCar();
    }

    public Customer getCustomer() {
        return appointmentDetail.getAppointment().getCustomer();
    }

    public ServiceDetail findServiceDetail(int serviceID) {
        return listServiceDetail.stream()
                .filter(detail -> detail.getService().getServiceID() == serviceID)
                .findFirst().orElse(null);
    }

    public ComponentDetail findComponentDetail(int componentID) {
        return listComponentDetail.stream()
                .filter(detail -> detail.getComponent().getComponentID() == componentID)
                .findFirst().orElse(null);
    }

    public Integer getServiceSlipID() { return serviceSlipID; }
    public void setServiceSlipID(Integer serviceSlipID) { this.serviceSlipID = serviceSlipID; }
    public LocalDateTime getTime() { return time; }
    public void setTime(LocalDateTime time) { this.time = time; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Double getTotalCost() { return totalCost; }
    public void setTotalCost(Double totalCost) { this.totalCost = totalCost; }
    public AppointmentDetail getAppointmentDetail() { return appointmentDetail; }
    public void setAppointmentDetail(AppointmentDetail appointmentDetail) { this.appointmentDetail = appointmentDetail; }
    public Slot getSlot() { return slot; }
    public void setSlot(Slot slot) { this.slot = slot; }
    public List<ServiceDetail> getListServiceDetail() { return listServiceDetail; }
    public List<ComponentDetail> getListComponentDetail() { return listComponentDetail; }
    public List<SlipHandling> getListSlipHandling() { return listSlipHandling; }
}
