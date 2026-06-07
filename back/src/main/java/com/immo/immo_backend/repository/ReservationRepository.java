package com.immo.immo_backend.repository;

import com.immo.immo_backend.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCarId(Long carId);

    List<Reservation> findByClientId(Long clientId);

    List<Reservation> findByAgencyId(Long agencyId);
}
