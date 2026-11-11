package com.ptit.gara.dao;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Customer;

@Repository
public class CustomerDAO extends DAO {

    public Customer findCustomerInfoByPhone(String phone) {
        return em.createQuery("select c from Customer c where c.phone = :phone", Customer.class)
                .setParameter("phone", phone)
                .getResultStream().findFirst().orElse(null);
    }

    public Customer addCustomer(Customer c) {
        em.persist(c);
        return c;
    }
}
