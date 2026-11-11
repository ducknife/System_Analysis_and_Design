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
@Table(name = "tblServiceDetail")
@IdClass(ServiceDetail.Key.class)
public class ServiceDetail {

    public record Key(Integer serviceSlip, Integer service) implements Serializable {
    }

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceSlipID")
    private ServiceSlip serviceSlip;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceID")
    private Service service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "staffID")
    private Staff staff;

    private Double price;
    private Double laborContent;
    private LocalDateTime startedAt;
    private LocalDateTime finishedAt;

    public ServiceSlip getServiceSlip() { return serviceSlip; }
    public void setServiceSlip(ServiceSlip serviceSlip) { this.serviceSlip = serviceSlip; }
    public Service getService() { return service; }
    public void setService(Service service) { this.service = service; }
    public Staff getStaff() { return staff; }
    public void setStaff(Staff staff) { this.staff = staff; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getLaborContent() { return laborContent; }
    public void setLaborContent(Double laborContent) { this.laborContent = laborContent; }
    public LocalDateTime getStartedAt() { return startedAt; }
    public void setStartedAt(LocalDateTime startedAt) { this.startedAt = startedAt; }
    public LocalDateTime getFinishedAt() { return finishedAt; }
    public void setFinishedAt(LocalDateTime finishedAt) { this.finishedAt = finishedAt; }
}
