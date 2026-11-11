package com.ptit.gara.dao;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Manager;
import com.ptit.gara.model.User;

@Repository
public class UserDAO extends DAO {

    public Manager checkLogin(User u) {
        return em.createQuery("select m from Manager m where m.username = :username and m.password = :password", Manager.class)
                .setParameter("username", u.getUsername())
                .setParameter("password", u.getPassword())
                .getResultStream().findFirst().orElse(null);
    }
}
