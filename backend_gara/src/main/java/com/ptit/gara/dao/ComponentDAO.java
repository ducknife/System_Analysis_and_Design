package com.ptit.gara.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Component;

@Repository
public class ComponentDAO extends DAO {

    public List<Component> findComponentByKeyword(String keyword) {
        return em.createQuery("select c from Component c where lower(c.name) like :keyword order by c.componentID", Component.class)
                .setParameter("keyword", "%" + (keyword == null ? "" : keyword.trim().toLowerCase()) + "%")
                .getResultList();
    }

    public void updateInventoryQty(Component c) {
        em.merge(c);
    }
}
