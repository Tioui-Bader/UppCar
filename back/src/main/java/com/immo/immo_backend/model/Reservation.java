package com.immo.immo_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "reservations")
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long carId;
    private Long clientId;
    private Long agencyId;
    private String clientFirstName;
    private String clientLastName;
    private String cin;
    private String licenseNumber;
    private String startDate;
    private String endDate;
    private Double totalPrice;
    @Column(columnDefinition = "TEXT")
    private String idCardFront;
    @Column(columnDefinition = "TEXT")
    private String idCardBack;
    @Column(columnDefinition = "TEXT")
    private String licenseFront;
    @Column(columnDefinition = "TEXT")
    private String licenseBack;
    private String status; // PENDING, CONFIRMED, CANCELLED

    public Reservation() {
    }

    public Reservation(Long carId, Long clientId, String clientFirstName, String clientLastName, String cin,
            String licenseNumber, String startDate, String endDate, Double totalPrice, String status) {
        this.carId = carId;
        this.clientId = clientId;
        this.clientFirstName = clientFirstName;
        this.clientLastName = clientLastName;
        this.cin = cin;
        this.licenseNumber = licenseNumber;
        this.startDate = startDate;
        this.endDate = endDate;
        this.totalPrice = totalPrice;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAgencyId() {
        return agencyId;
    }

    public void setAgencyId(Long agencyId) {
        this.agencyId = agencyId;
    }

    public Long getCarId() {
        return carId;
    }

    public void setCarId(Long carId) {
        this.carId = carId;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getClientFirstName() {
        return clientFirstName;
    }

    public void setClientFirstName(String clientFirstName) {
        this.clientFirstName = clientFirstName;
    }

    public String getClientLastName() {
        return clientLastName;
    }

    public void setClientLastName(String clientLastName) {
        this.clientLastName = clientLastName;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getIdCardFront() {
        return idCardFront;
    }

    public void setIdCardFront(String idCardFront) {
        this.idCardFront = idCardFront;
    }

    public String getIdCardBack() {
        return idCardBack;
    }

    public void setIdCardBack(String idCardBack) {
        this.idCardBack = idCardBack;
    }

    public String getLicenseFront() {
        return licenseFront;
    }

    public void setLicenseFront(String licenseFront) {
        this.licenseFront = licenseFront;
    }

    public String getLicenseBack() {
        return licenseBack;
    }

    public void setLicenseBack(String licenseBack) {
        this.licenseBack = licenseBack;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
