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

    public List<Car> searchCars(String query, String category) {
        List<Car> allCars = carRepository.findAll();
        java.util.List<Car> filtered = new java.util.ArrayList<>();
        
        for (Car car : allCars) {
            // 1. Category filter
            if (category != null && !category.trim().isEmpty()) {
                if (car.getCategory() == null || !car.getCategory().equalsIgnoreCase(category.trim())) {
                    continue;
                }
            }
            
            // 2. Keyword tokenized search
            if (query != null && !query.trim().isEmpty()) {
                String[] keywords = query.toLowerCase().split("\\s+");
                boolean allMatched = true;
                for (String keyword : keywords) {
                    if (keyword.isEmpty()) continue;
                    
                    boolean matched = false;
                    if (car.getName() != null && car.getName().toLowerCase().contains(keyword)) matched = true;
                    if (car.getCity() != null && car.getCity().toLowerCase().contains(keyword)) matched = true;
                    if (car.getPlate() != null && car.getPlate().toLowerCase().contains(keyword)) matched = true;
                    if (car.getCategory() != null && car.getCategory().toLowerCase().contains(keyword)) matched = true;
                    if (car.getFuel() != null && car.getFuel().toLowerCase().contains(keyword)) matched = true;
                    
                    if (!matched) {
                        allMatched = false;
                        break;
                    }
                }
                if (!allMatched) {
                    continue;
                }
            }
            
            filtered.add(car);
        }
        
        return filtered;
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
