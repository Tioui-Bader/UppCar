package com.immo.immo_backend.service;

import com.immo.immo_backend.model.User;
import com.immo.immo_backend.repository.UserRepository;
import com.immo.immo_backend.dto.AuthResponse;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.jwtService = jwtService;
    }

    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email déjà existe");
        }
        // ✅ Hash le mot de passe avant de sauvegarder
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setConfirmPassword(null); // ✅ Vider avant sauvegarde
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Email ou mot de passe incorrect");
        }

        return user;
    }

    public AuthResponse loginUserWithToken(String email, String password) {
        User user = loginUser(email, password);

        AuthResponse response = new AuthResponse();
        response.setAccessToken(jwtService.generateAccessToken(user));
        response.setRefreshToken(jwtService.generateRefreshToken(user));
        response.setUser(user);

        return response;
    }

    public User updateUserProfile(Long userId, User updatedData) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (updatedData.getFirstName() != null)
            user.setFirstName(updatedData.getFirstName());
        if (updatedData.getLastName() != null)
            user.setLastName(updatedData.getLastName());
        if (updatedData.getPhone() != null)
            user.setPhone(updatedData.getPhone());
        if (updatedData.getAddress() != null)
            user.setAddress(updatedData.getAddress());
        if (updatedData.getCity() != null)
            user.setCity(updatedData.getCity());
        if (updatedData.getCountry() != null)
            user.setCountry(updatedData.getCountry());

        // On peut aussi mettre à jour le champ 'name' si besoin
        if (updatedData.getName() != null)
            user.setName(updatedData.getName());

        return userRepository.save(user);
    }
}