package com.ptit.gara.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Service;

@Repository
public class ServiceDAO extends DAO {

    public List<Service> findServicesByKeyword(String keyword) {
        return em.createQuery("select s from Service s where lower(s.name) like :keyword order by s.serviceID", Service.class)
                .setParameter("keyword", "%" + (keyword == null ? "" : keyword.trim().toLowerCase()) + "%")
                .getResultList();
    }
}
