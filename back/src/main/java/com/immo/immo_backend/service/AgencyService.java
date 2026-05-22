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

    public Optional<Agency> findByEmail(String email) {
        return agencyRepository.findByEmail(email);
    }

    public Agency updateAgencyProfile(String email, Agency newData) {
        Agency agency = agencyRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Agency not found"));

        if (newData.getFirstName() != null)
            agency.setFirstName(newData.getFirstName());
        if (newData.getLastName() != null)
            agency.setLastName(newData.getLastName());
        if (newData.getAgencyName() != null)
            agency.setAgencyName(newData.getAgencyName());
        if (newData.getPhone() != null)
            agency.setPhone(newData.getPhone());
        if (newData.getCity() != null)
            agency.setCity(newData.getCity());
        if (newData.getAddress() != null)
            agency.setAddress(newData.getAddress());
        if (newData.getCountry() != null)
            agency.setCountry(newData.getCountry());
        if (newData.getLogo() != null)
            agency.setLogo(newData.getLogo());

        return agencyRepository.save(agency);
    }
}
