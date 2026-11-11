package com.ptit.gara.model;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblComponentDetail")
@IdClass(ComponentDetail.Key.class)
public class ComponentDetail {

    public record Key(Integer serviceSlip, Integer component) implements Serializable {
    }

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "serviceSlipID")
    private ServiceSlip serviceSlip;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "componentID")
    private Component component;

    private Integer qty;
    private Double price;

    public ServiceSlip getServiceSlip() { return serviceSlip; }
    public void setServiceSlip(ServiceSlip serviceSlip) { this.serviceSlip = serviceSlip; }
    public Component getComponent() { return component; }
    public void setComponent(Component component) { this.component = component; }
    public Integer getQty() { return qty; }
    public void setQty(Integer qty) { this.qty = qty; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
