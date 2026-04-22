package com.immo.immo_backend.service;

import com.immo.immo_backend.model.Car;
import com.immo.immo_backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public List<Car> getCarsByAgency(Long agencyId) {
        return carRepository.findByAgencyId(agencyId);
    }

    public List<Car> searchCars(String query) {
        return carRepository.findByNameContainingIgnoreCase(query);
    }

    public Car saveCar(Car car) {
        return carRepository.save(car);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }
}
