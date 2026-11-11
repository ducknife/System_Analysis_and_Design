package com.ptit.gara.dao;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

public abstract class DAO {

    @PersistenceContext
    protected EntityManager em;

    public <T> T find(Class<T> type, Object id) {
        return em.find(type, id);
    }
}
