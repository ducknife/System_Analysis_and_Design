package com.ptit.gara.model;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblCustomer")
@PrimaryKeyJoinColumn(name = "userID")
public class Customer extends User {

    private String address;

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
}
