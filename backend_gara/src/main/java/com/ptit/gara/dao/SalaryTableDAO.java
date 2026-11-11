package com.ptit.gara.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.SalaryTable;

@Repository
public class SalaryTableDAO extends DAO {

    public boolean checkSalaryTableOfMonth(int month, int year) {
        return !getSalaryTablesOfMonth(month, year).isEmpty();
    }

    public List<SalaryTable> getSalaryTablesOfMonth(int month, int year) {
        return em.createQuery("""
                select t from SalaryTable t
                where t.month = :month and t.year = :year
                order by t.staff.employeeCode
                """, SalaryTable.class)
                .setParameter("month", month)
                .setParameter("year", year)
                .getResultList();
    }

    public void saveAllSalaryTableOfMonth(List<SalaryTable> list) {
        list.forEach(em::persist);
    }

    public void savePaymentMethod(SalaryTable st) {
        em.merge(st);
    }

    public void updateIsReceived(SalaryTable st) {
        em.merge(st);
    }
}
