package com.immo.immo_backend.controller;

import com.immo.immo_backend.model.Reservation;
import com.immo.immo_backend.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {

    @Autowired
    private ReservationRepository reservationRepository;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Reservation> createReservation(@RequestBody Reservation reservation) {
        if (reservation.getStatus() == null) {
            reservation.setStatus("PENDING");
        }
        Reservation saved = reservationRepository.save(reservation);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/user/{clientId}")
    public List<Reservation> getReservationsByUser(@PathVariable Long clientId) {
        return reservationRepository.findByClientId(clientId);
    }

    @GetMapping("/agency/{agencyId}")
    public List<Reservation> getReservationsByAgency(@PathVariable Long agencyId) {
        return reservationRepository.findByAgencyId(agencyId);
    }
}
