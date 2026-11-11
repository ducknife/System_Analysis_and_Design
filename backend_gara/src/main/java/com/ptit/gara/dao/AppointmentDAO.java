package com.ptit.gara.dao;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Appointment;
import com.ptit.gara.model.Car;
import com.ptit.gara.model.Customer;
import com.ptit.gara.model.Status;

@Repository
public class AppointmentDAO extends DAO {

    public List<Appointment> findAppointmentsOfCustomer(Customer c) {
        return em.createQuery("select a from Appointment a where a.customer = :customer order by a.time desc", Appointment.class)
                .setParameter("customer", c)
                .getResultList();
    }

    public void updateAppointmentStatus(Appointment a) {
        em.merge(a);
    }

    public Appointment createAppointmentAtCounter(Customer c, Car car) {
        Appointment a = new Appointment();
        a.setCustomer(c);
        a.setTime(LocalDateTime.now());
        a.setStatus(Status.APPOINTMENT_CONFIRMED);
        a.addCar(car);
        em.persist(a);
        return a;
    }
}
