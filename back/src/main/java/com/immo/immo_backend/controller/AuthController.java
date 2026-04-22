package com.immo.immo_backend.controller;

import com.immo.immo_backend.model.User;
import com.immo.immo_backend.model.Agency;
import com.immo.immo_backend.repository.UserRepository;
import com.immo.immo_backend.repository.AgencyRepository;
import com.immo.immo_backend.service.UserService;
import com.immo.immo_backend.service.AgencyService;
import com.immo.immo_backend.service.JwtService;
import io.jsonwebtoken.Jwts;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final AgencyService agencyService;
    private final JwtService jwtService;
    private final UserRepository userRepository;
    private final AgencyRepository agencyRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${jwt.refresh-secret}")
    private String refreshTokenSecret;

    public AuthController(UserService userService,
                          AgencyService agencyService,
                          JwtService jwtService,
                          UserRepository userRepository,
                          AgencyRepository agencyRepository) {
        this.userService = userService;
        this.agencyService = agencyService;
        this.jwtService = jwtService;
        this.userRepository = userRepository;
        this.agencyRepository = agencyRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // ------------------- REGISTER -------------------
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            user.setEmail(user.getEmail().toLowerCase().trim());
            User savedUser = userService.registerUser(user);

            String accessToken = jwtService.generateAccessToken(savedUser);
            String refreshToken = jwtService.generateRefreshToken(savedUser);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("user", savedUser); // ✅ obligatoire

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur");
        }
    }

    // ------------------- AGENCY REGISTER -------------------
    @PostMapping("/register-agency")
    public ResponseEntity<?> registerAgency(@RequestBody Agency agency) {
        try {
            agency.setEmail(agency.getEmail().toLowerCase().trim());
            Agency savedAgency = agencyService.registerAgency(agency);

            String accessToken = jwtService.generateAccessToken(savedAgency);
            String refreshToken = jwtService.generateRefreshToken(savedAgency);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("agency", savedAgency); 

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur serveur");
        }
    }

    // ------------------- LOGIN -------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email").toLowerCase().trim();
            String password = loginData.get("password");

            User user = userService.loginUser(email, password);

            String accessToken = jwtService.generateAccessToken(user);
            String refreshToken = jwtService.generateRefreshToken(user);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("user", user);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email ou mot de passe incorrect");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erreur serveur");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // ------------------- AGENCY LOGIN -------------------
    @PostMapping("/login-agency")
    public ResponseEntity<?> loginAgency(@RequestBody Map<String, String> loginData) {
        try {
            String email = loginData.get("email").toLowerCase().trim();
            String password = loginData.get("password");

            Agency agency = agencyService.loginAgency(email, password);

            String accessToken = jwtService.generateAccessToken(agency);
            String refreshToken = jwtService.generateRefreshToken(agency);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("agency", agency);

            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Email ou mot de passe incorrect");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "Erreur serveur");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    // ------------------- REFRESH -------------------
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        if (refreshToken == null) {
            return ResponseEntity.badRequest().body("Refresh token manquant");
        }

        try {
            String userId = Jwts.parser()
                .setSigningKey(refreshTokenSecret.getBytes())
                .parseClaimsJws(refreshToken)
                .getBody()
                .getSubject();

            User user = userRepository.findById(Long.parseLong(userId))
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            Map<String, Object> tokens = new HashMap<>();
            tokens.put("accessToken", jwtService.generateAccessToken(user));
            tokens.put("refreshToken", jwtService.generateRefreshToken(user));

            return ResponseEntity.ok(tokens);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Refresh token invalide");
        }
    }

    // ------------------- GOOGLE -------------------
    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, String> body) {
        try {
            String accessToken = body.get("token");

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> googleResponse = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                HttpMethod.GET,
                entity,
                Map.class
            );

            Map<String, Object> googleUser = googleResponse.getBody();
            String email = (String) googleUser.get("email");
            String name = (String) googleUser.get("name"); // ✅ Google retourne "name" = nom complet

            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setName(name); // ✅
                newUser.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                return userRepository.save(newUser);
            });

// ✅ Met à jour le nom même si user existait déjà
            user.setName(name);
userRepository.save(user);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", jwtService.generateAccessToken(user));
            response.put("refreshToken", jwtService.generateRefreshToken(user));
            response.put("user", user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(500).body("Erreur Google login");
        }
    }

    // ------------------- GOOGLE AGENCY -------------------
    @PostMapping("/google-agency")
    public ResponseEntity<?> googleAgencyLogin(@RequestBody Map<String, String> body) {
        try {
            String accessToken = body.get("token");

            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.setBearerAuth(accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> googleResponse = restTemplate.exchange(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                HttpMethod.GET,
                entity,
                Map.class
            );

            Map<String, Object> googleUser = googleResponse.getBody();
            String email = (String) googleUser.get("email");
            String name = (String) googleUser.get("name");
            String givenName = (String) googleUser.get("given_name");
            String familyName = (String) googleUser.get("family_name");

            Agency agency = agencyRepository.findByEmail(email).orElseGet(() -> {
                Agency newAgency = new Agency();
                newAgency.setEmail(email);
                newAgency.setAgencyName(name); // Par défaut on met le nom entier
                newAgency.setFirstName(givenName);
                newAgency.setLastName(familyName);
                newAgency.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
                return agencyRepository.save(newAgency);
            });

            // Mettre à jour au besoin
            agencyRepository.save(agency);

            Map<String, Object> response = new HashMap<>();
            response.put("accessToken", jwtService.generateAccessToken(agency));
            response.put("refreshToken", jwtService.generateRefreshToken(agency));
            response.put("agency", agency);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Erreur Google login agency: " + e.getMessage());
        }
    }
}








/* 
@PostMapping("/forgot-password")
public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
    String email = request.get("email").toLowerCase().trim();  // Normaliser et trimmer l'email

    try {
        // 1️⃣ Vérifier si email existe
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("message", "Email n'existe pas"));
        }

        // 2️⃣ Générer code 6 chiffres
        String code = String.format("%06d", new Random().nextInt(1000000));  // Génère de 000000 à 999999

        // 3️⃣ Supprimer ancien code si existe
        codeRepository.findByCode(code)
                .ifPresent(existingCode -> codeRepository.delete(existingCode));

        // 4️⃣ Sauvegarder nouveau code
        VerificationCode verificationCode = new VerificationCode();
        verificationCode.setEmail(email);
        verificationCode.setCode(code);
        verificationCode.setExpirationTime(LocalDateTime.now().plusMinutes(10));

        codeRepository.save(verificationCode);

        // 5️⃣ Envoyer email
        emailService.sendVerificationCode(email, code);

        return ResponseEntity.ok(Map.of("message", "Code envoyé à votre email"));
    } catch (Exception e) {
        // Gérer l'exception ici pour renvoyer des informations d'erreur plus précises
        e.printStackTrace();
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Une erreur s'est produite", "error", e.getMessage()));
    }
}




@PostMapping("/verify-code")
public ResponseEntity<?> verifyCode(@RequestBody Map<String, String> request) {
    String code = request.get("code");  // Récupère uniquement le code

    // Recherche du code dans la base de données
    Optional<VerificationCode> verificationCodeOptional =
            codeRepository.findByCode(code);  // Utilisation de findByCode

    if (verificationCodeOptional.isEmpty()) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("message", "Code est incorrect"));
    }

    VerificationCode verificationCode = verificationCodeOptional.get();

    // Vérifier l'expiration du code
    if (verificationCode.getExpirationTime().isBefore(LocalDateTime.now())) {
        return ResponseEntity
                .badRequest()
                .body(Map.of("message", "Code expiré"));
    }

    // Code valide
    return ResponseEntity.ok(Map.of("message", "Code valide"));
}






@PostMapping("/reset-password")
public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
    String code = request.get("code");  // Le code reçu
    String newPassword = request.get("newPassword");  // Le nouveau mot de passe

    try {
        // Vérifier le code envoyé
        Optional<VerificationCode> verificationCodeOptional = codeRepository.findByCode(code);
        if (verificationCodeOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Code incorrect ou expiré"));
        }

        VerificationCode verificationCode = verificationCodeOptional.get();

        // Vérifier l'expiration du code
        if (verificationCode.getExpirationTime().isBefore(LocalDateTime.now())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Code expiré"));
        }

        // Récupérer l'utilisateur associé au code (par l'email dans la table VerificationCode)
        Optional<User> userOptional = userRepository.findByEmail(verificationCode.getEmail());
        if (userOptional.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Utilisateur non trouvé"));
        }

        User user = userOptional.get();

        // Hacher le nouveau mot de passe
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String hashedPassword = passwordEncoder.encode(newPassword);

        // Mettre à jour le mot de passe de l'utilisateur
        user.setPassword(hashedPassword);
        userRepository.save(user);

        // Optionnel : Supprimer le code de vérification après son utilisation (si nécessaire)
        codeRepository.delete(verificationCode);

        // Réponse succès
        return ResponseEntity.ok(Map.of("message", "Mot de passe réinitialisé avec succès"));
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Une erreur s'est produite", "error", e.getMessage()));
    }
}

 */