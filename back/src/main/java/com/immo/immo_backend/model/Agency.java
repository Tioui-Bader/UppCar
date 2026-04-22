package com.immo.immo_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "agences")
public class Agency {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;

    @Column(nullable = false, unique = true)
    private String email;
    private String password;

    private String agencyName;
    private String city;
    private String phone;
    private String fleetSize;

    public Agency() {}

    public Agency(String firstName, String lastName, String email, String password, String agencyName, String city, String phone, String fleetSize) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.agencyName = agencyName;
        this.city = city;
        this.phone = phone;
        this.fleetSize = fleetSize;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getFleetSize() {
        return fleetSize;
    }

    public void setFleetSize(String fleetSize) {
        this.fleetSize = fleetSize;
    }
}
