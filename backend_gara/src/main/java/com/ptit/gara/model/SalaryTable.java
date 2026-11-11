package com.ptit.gara.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "tblSalaryTable")
public class SalaryTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer salaryTableID;
    private Integer month;
    private Integer year;
    private Double laborUnitPrice;
    private String paymentMethod;
    private Boolean isReceived;
    private String status;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "staffID")
    private Staff staff;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "managerID")
    private Manager manager;

    public Integer getSalaryTableID() { return salaryTableID; }
    public void setSalaryTableID(Integer salaryTableID) { this.salaryTableID = salaryTableID; }
    public Integer getMonth() { return month; }
    public void setMonth(Integer month) { this.month = month; }
    public Integer getYear() { return year; }
    public void setYear(Integer year) { this.year = year; }
    public Double getLaborUnitPrice() { return laborUnitPrice; }
    public void setLaborUnitPrice(Double laborUnitPrice) { this.laborUnitPrice = laborUnitPrice; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public Boolean getIsReceived() { return isReceived; }
    public void setIsReceived(Boolean isReceived) { this.isReceived = isReceived; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Staff getStaff() { return staff; }
    public void setStaff(Staff staff) { this.staff = staff; }
    public Manager getManager() { return manager; }
    public void setManager(Manager manager) { this.manager = manager; }
}
