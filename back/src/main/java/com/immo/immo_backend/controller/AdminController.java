package com.immo.immo_backend.controller;

import com.immo.immo_backend.model.Agency;
import com.immo.immo_backend.model.Reservation;
import com.immo.immo_backend.model.User;
import com.immo.immo_backend.repository.AgencyRepository;
import com.immo.immo_backend.repository.CarRepository;
import com.immo.immo_backend.repository.ReservationRepository;
import com.immo.immo_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AgencyRepository agencyRepository;

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private CarRepository carRepository;

    // --- GET ALL USERS ---
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // --- GET ALL AGENCIES ---
    @GetMapping("/agencies")
    public List<Agency> getAllAgencies() {
        return agencyRepository.findAll();
    }

    // --- GET ALL RESERVATIONS ---
    @GetMapping("/reservations")
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    // --- STATS SUMMARY ---
    @GetMapping("/stats")
    public Map<String, Object> getStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalAgencies", agencyRepository.count());
        stats.put("totalReservations", reservationRepository.count());

        double totalRevenue = reservationRepository.findAll().stream()
                .mapToDouble(r -> r.getTotalPrice() != null ? r.getTotalPrice() : 0.0)
                .sum();
        stats.put("totalRevenue", totalRevenue);

        return stats;
    }

    // --- PURGE ALL DATA (FOR TESTING) ---
    @DeleteMapping("/purge-test-data")
    @Transactional
    public Map<String, String> purgeAllData() {
        reservationRepository.deleteAllInBatch();
        carRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
        agencyRepository.deleteAllInBatch();

        Map<String, String> response = new HashMap<>();
        response.put("status", "SUCCESS");
        response.put("message", "All test data (Users, Agencies, Cars, Reservations) has been purged.");
        return response;
    }
}
