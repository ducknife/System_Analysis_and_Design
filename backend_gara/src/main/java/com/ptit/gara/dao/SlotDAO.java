package com.ptit.gara.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.ptit.gara.model.Slot;

@Repository
public class SlotDAO extends DAO {

    public List<Slot> getAvailableSlots() {
        return em.createQuery("select s from Slot s order by s.slotID", Slot.class).getResultList();
    }

    public void updateSlotStatus(Slot s) {
        em.merge(s);
    }
}
