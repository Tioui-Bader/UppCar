package com.immo.immo_backend.controller;

import com.immo.immo_backend.dto.CarDTO;
import com.immo.immo_backend.model.Agency;
import com.immo.immo_backend.model.Car;
import com.immo.immo_backend.repository.AgencyRepository;
import com.immo.immo_backend.repository.CarRepository;
import com.immo.immo_backend.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarController {

    @Autowired
    private CarService carService;

    @Autowired
    private AgencyRepository agencyRepository;

    @Autowired
    private CarRepository carRepository;

    @GetMapping
    public List<CarDTO> getAllCars() {
        return carService.getAllCars().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/search")
    public List<CarDTO> searchCars(@RequestParam String query) {
        System.out.println("DEBUG: Searching for cars with query: " + query);
        List<CarDTO> results = carService.searchCars(query).stream().map(this::convertToDTO)
                .collect(Collectors.toList());
        System.out.println("DEBUG: Found " + results.size() + " results. IDs: "
                + results.stream().map(CarDTO::getId).collect(Collectors.toList()));
        return results;
    }

    @GetMapping("/agency/{agencyId}")
    public List<CarDTO> getCarsByAgency(@PathVariable Long agencyId) {
        return carService.getCarsByAgency(agencyId).stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CarDTO> getCarById(@PathVariable Long id) {
        System.out.println("DEBUG: Fetching car by ID: " + id);
        return carService.getCarById(id)
                .map(car -> {
                    System.out.println("DEBUG: Car found: " + car.getName());
                    return ResponseEntity.ok(convertToDTO(car));
                })
                .orElseGet(() -> {
                    System.err.println("DEBUG: Car NOT FOUND for ID: " + id);
                    return ResponseEntity.notFound().build();
                });
    }

    @GetMapping("/debug/all-ids")
    public List<Long> getAllIds() {
        List<Long> ids = carService.getAllCars().stream().map(Car::getId).collect(Collectors.toList());
        System.out.println("DEBUG: All IDs in DB: " + ids);
        return ids;
    }

    // POST = CREATE nouvelle voiture
    @PostMapping
    public ResponseEntity<CarDTO> createCar(@RequestBody CarDTO carDTO) {
        Agency agency = agencyRepository.findById(carDTO.getAgencyId())
                .orElseThrow(() -> new RuntimeException("Agency not found"));

        Car car = convertToEntity(carDTO);
        car.setId(null); // Force creation
        car.setAgency(agency);

        Car savedCar = carService.saveCar(car);
        return ResponseEntity.ok(convertToDTO(savedCar));
    }

    // PUT = UPDATE voiture existante (inclus les photos)
    @PutMapping("/{id}")
    public ResponseEntity<CarDTO> updateCar(@PathVariable Long id, @RequestBody CarDTO carDTO) {
        Car existing = carRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        Agency agency = agencyRepository.findById(carDTO.getAgencyId())
                .orElseThrow(() -> new RuntimeException("Agency not found"));

        existing.setName(carDTO.getName());
        existing.setPlate(carDTO.getPlate());
        existing.setCategory(carDTO.getCategory());
        existing.setPrice(carDTO.getPrice());
        existing.setFuel(carDTO.getFuel());
        existing.setSeats(carDTO.getSeats());
        existing.setYear(carDTO.getYear());
        existing.setStatus(carDTO.getStatus());
        existing.setCity(carDTO.getCity());
        existing.setColor(carDTO.getColor());
        existing.setPhotos(carDTO.getPhotos());
        existing.setAgency(agency);
        existing.setStartDate(carDTO.getStartDate());
        existing.setEndDate(carDTO.getEndDate());

        Car savedCar = carService.saveCar(existing);
        return ResponseEntity.ok(convertToDTO(savedCar));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
        return ResponseEntity.ok().build();
    }

    private CarDTO convertToDTO(Car car) {
        CarDTO dto = new CarDTO();
        dto.setId(car.getId());
        dto.setName(car.getName());
        dto.setPlate(car.getPlate());
        dto.setCategory(car.getCategory());
        dto.setPrice(car.getPrice());
        dto.setFuel(car.getFuel());
        dto.setSeats(car.getSeats());
        dto.setYear(car.getYear());
        dto.setStatus(car.getStatus());
        dto.setCity(car.getCity());
        dto.setColor(car.getColor());
        dto.setPhotos(car.getPhotos());
        dto.setAgencyId(car.getAgency().getId());
        dto.setStartDate(car.getStartDate());
        dto.setEndDate(car.getEndDate());
        return dto;
    }

    private Car convertToEntity(CarDTO dto) {
        Car car = new Car();
        car.setName(dto.getName());
        car.setPlate(dto.getPlate());
        car.setCategory(dto.getCategory());
        car.setPrice(dto.getPrice());
        car.setFuel(dto.getFuel());
        car.setSeats(dto.getSeats());
        car.setYear(dto.getYear());
        car.setStatus(dto.getStatus());
        car.setCity(dto.getCity());
        car.setColor(dto.getColor());
        car.setPhotos(dto.getPhotos());
        car.setStartDate(dto.getStartDate());
        car.setEndDate(dto.getEndDate());
        return car;
    }
}
