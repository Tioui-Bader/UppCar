package com.immo.immo_backend.repository;

import com.immo.immo_backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByAgencyId(Long agencyId);
    List<Car> findByNameContainingIgnoreCase(String name);
    List<Car> findByNameContainingIgnoreCaseOrCategoryIgnoreCase(String name, String category);
    
    // Recherche avancée : Nom contient ET (Ville contient OU Catégorie égale)
    @org.springframework.data.jpa.repository.Query("SELECT c FROM Car c WHERE " +
        "(LOWER(c.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(c.city) LIKE LOWER(CONCAT('%', :query, '%'))) " +
        "AND (:category IS NULL OR :category = '' OR LOWER(c.category) = LOWER(:category))")
    List<Car> searchAdvanced(@org.springframework.data.repository.query.Param("query") String query, 
                             @org.springframework.data.repository.query.Param("category") String category);
}
