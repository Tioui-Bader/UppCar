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
    public List<CarDTO> searchCars(@RequestParam String query, @RequestParam(required = false) String category) {
        System.out.println("DEBUG: Searching for cars with query: " + query + " and category: " + category);
        List<CarDTO> results = carService.searchCars(query, category).stream().map(this::convertToDTO)
                .collect(Collectors.toList());
        System.out.println("DEBUG: Found " + results.size() + " results.");
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

    @GetMapping("/agency-details/{id}")
    public ResponseEntity<Agency> getAgencyDetails(@PathVariable Long id) {
        return agencyRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
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
        existing.setStatus(carDTO.getStatus());
        existing.setCity(carDTO.getCity());
        List<String> photos = carDTO.getPhotos();
        existing.setImageUrl1(photos != null && photos.size() > 0 ? photos.get(0) : null);
        existing.setImageUrl2(photos != null && photos.size() > 1 ? photos.get(1) : null);
        existing.setImageUrl3(photos != null && photos.size() > 2 ? photos.get(2) : null);
        existing.setImageUrl4(photos != null && photos.size() > 3 ? photos.get(3) : null);
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
        dto.setStatus(car.getStatus());
        dto.setCity(car.getCity());
        List<String> photos = new java.util.ArrayList<>();
        if (car.getImageUrl1() != null) photos.add(car.getImageUrl1());
        if (car.getImageUrl2() != null) photos.add(car.getImageUrl2());
        if (car.getImageUrl3() != null) photos.add(car.getImageUrl3());
        if (car.getImageUrl4() != null) photos.add(car.getImageUrl4());
        dto.setPhotos(photos);
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
        car.setStatus(dto.getStatus());
        car.setCity(dto.getCity());
        List<String> photos = dto.getPhotos();
        car.setImageUrl1(photos != null && photos.size() > 0 ? photos.get(0) : null);
        car.setImageUrl2(photos != null && photos.size() > 1 ? photos.get(1) : null);
        car.setImageUrl3(photos != null && photos.size() > 2 ? photos.get(2) : null);
        car.setImageUrl4(photos != null && photos.size() > 3 ? photos.get(3) : null);
        car.setStartDate(dto.getStartDate());
        car.setEndDate(dto.getEndDate());
        return car;
    }
}
