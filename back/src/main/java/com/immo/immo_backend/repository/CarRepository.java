package com.immo.immo_backend.repository;

import com.immo.immo_backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByAgencyId(Long agencyId);
    List<Car> findByNameContainingIgnoreCase(String name);
}
