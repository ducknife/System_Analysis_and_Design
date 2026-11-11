package com.ptit.gara.dao;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.ServiceDetail;
import com.ptit.gara.model.Staff;
import com.ptit.gara.model.Status;

@Repository
public class StaffDAO extends DAO {

    public List<Staff> getStaffList() {
        return em.createQuery("select s from Staff s order by s.employeeCode", Staff.class).getResultList();
    }

    public List<ServiceDetail> getServiceDetailsOfStaffInMonth(Staff st, int month, int year) {
        LocalDate start = LocalDate.of(year, month, 1);
        return em.createQuery("""
                select d from ServiceDetail d
                where d.staff = :staff and d.finishedAt >= :start and d.finishedAt < :end
                order by d.finishedAt
                """, ServiceDetail.class)
                .setParameter("staff", st)
                .setParameter("start", start.atStartOfDay())
                .setParameter("end", start.plusMonths(1).atStartOfDay())
                .getResultList();
    }

    public Set<Integer> getBusyStaffIDs() {
        return new HashSet<>(em.createQuery("""
                select d.staff.userID from ServiceDetail d
                where d.finishedAt is null and d.serviceSlip.status = :status
                """, Integer.class)
                .setParameter("status", Status.SLIP_IN_PROGRESS)
                .getResultList());
    }
}
