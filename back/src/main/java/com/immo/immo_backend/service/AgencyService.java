package com.immo.immo_backend.service;

import com.immo.immo_backend.model.Agency;
import com.immo.immo_backend.repository.AgencyRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AgencyService {

    private final AgencyRepository agencyRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public AgencyService(AgencyRepository agencyRepository) {
        this.agencyRepository = agencyRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Agency registerAgency(Agency agency) {
        if (agencyRepository.existsByEmail(agency.getEmail())) {
            throw new IllegalArgumentException("L'email est déjà utilisé");
        }
        // Hash le mot de passe avant de sauvegarder
        agency.setPassword(passwordEncoder.encode(agency.getPassword()));
        return agencyRepository.save(agency);
    }

    public Agency loginAgency(String email, String password) {
        Optional<Agency> agencyOptional = agencyRepository.findByEmail(email);

        if (agencyOptional.isEmpty()) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        Agency agency = agencyOptional.get();

        if (!passwordEncoder.matches(password, agency.getPassword())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        return agency;
    }
}
