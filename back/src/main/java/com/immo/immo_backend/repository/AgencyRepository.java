package com.immo.immo_backend.repository;

import com.immo.immo_backend.model.Agency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long> {
    Optional<Agency> findByEmail(String email);
    boolean existsByEmail(String email);
}
