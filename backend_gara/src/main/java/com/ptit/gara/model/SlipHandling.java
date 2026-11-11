package com.ptit.gara.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblSlipHandling")
@IdClass(SlipHandling.Key.class)
public class SlipHandling {

    public record Key(Integer serviceSlip, Integer manager, String role) implements Serializable {
    }

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceSlipID")
    private ServiceSlip serviceSlip;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "managerID")
    private Manager manager;

    @Id
    private String role;

    private LocalDateTime handledAt;

    public ServiceSlip getServiceSlip() { return serviceSlip; }
    public void setServiceSlip(ServiceSlip serviceSlip) { this.serviceSlip = serviceSlip; }
    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public LocalDateTime getHandledAt() { return handledAt; }
    public void setHandledAt(LocalDateTime handledAt) { this.handledAt = handledAt; }
}
