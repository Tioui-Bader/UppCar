package com.immo.immo_backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cars")
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String plate;
    private String category;
    private Double price;
    private String fuel;
    private Integer seats;
    private String status;
    private String city;
    private String startDate;
    private String endDate;

    @Column(name = "image_url1", columnDefinition = "TEXT")
    private String imageUrl1;

    @Column(name = "image_url2", columnDefinition = "TEXT")
    private String imageUrl2;

    @Column(name = "image_url3", columnDefinition = "TEXT")
    private String imageUrl3;

    @Column(name = "image_url4", columnDefinition = "TEXT")
    private String imageUrl4;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "agency_id", nullable = false)
    private Agency agency;

    public Car() {}

    public Car(String name, String plate, String category, Double price, String fuel, Integer seats, String status, String city, String imageUrl1, String imageUrl2, String imageUrl3, String imageUrl4, Agency agency) {
        this.name = name;
        this.plate = plate;
        this.category = category;
        this.price = price;
        this.fuel = fuel;
        this.seats = seats;
        this.status = status;
        this.city = city;
        this.imageUrl1 = imageUrl1;
        this.imageUrl2 = imageUrl2;
        this.imageUrl3 = imageUrl3;
        this.imageUrl4 = imageUrl4;
        this.agency = agency;
        this.startDate = "";
        this.endDate = "";
    }

    public Car(String name, String plate, String category, Double price, String fuel, Integer seats, String status, String city, String imageUrl1, String imageUrl2, String imageUrl3, String imageUrl4, Agency agency, String startDate, String endDate) {
        this.name = name;
        this.plate = plate;
        this.category = category;
        this.price = price;
        this.fuel = fuel;
        this.seats = seats;
        this.status = status;
        this.city = city;
        this.imageUrl1 = imageUrl1;
        this.imageUrl2 = imageUrl2;
        this.imageUrl3 = imageUrl3;
        this.imageUrl4 = imageUrl4;
        this.agency = agency;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPlate() { return plate; }
    public void setPlate(String plate) { this.plate = plate; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public String getFuel() { return fuel; }
    public void setFuel(String fuel) { this.fuel = fuel; }

    public Integer getSeats() { return seats; }
    public void setSeats(Integer seats) { this.seats = seats; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getImageUrl1() { return imageUrl1; }
    public void setImageUrl1(String imageUrl1) { this.imageUrl1 = imageUrl1; }

    public String getImageUrl2() { return imageUrl2; }
    public void setImageUrl2(String imageUrl2) { this.imageUrl2 = imageUrl2; }

    public String getImageUrl3() { return imageUrl3; }
    public void setImageUrl3(String imageUrl3) { this.imageUrl3 = imageUrl3; }

    public String getImageUrl4() { return imageUrl4; }
    public void setImageUrl4(String imageUrl4) { this.imageUrl4 = imageUrl4; }

    public Agency getAgency() { return agency; }
    public void setAgency(Agency agency) { this.agency = agency; }

    public String getStartDate() { return startDate; }
    public void setStartDate(String startDate) { this.startDate = startDate; }

    public String getEndDate() { return endDate; }
    public void setEndDate(String endDate) { this.endDate = endDate; }
}
