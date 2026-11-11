package com.ptit.gara.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblService")
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceID;
    private String name;
    private Double price;
    private Double laborContent;

    public Integer getServiceID() { return serviceID; }
    public void setServiceID(Integer serviceID) { this.serviceID = serviceID; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
    public Double getLaborContent() { return laborContent; }
    public void setLaborContent(Double laborContent) { this.laborContent = laborContent; }
}
