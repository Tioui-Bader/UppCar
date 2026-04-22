package com.immo.immo_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "utilisateur")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;
    private String password;
    private String confirmPassword;
    private String name;

    public User() {}

    public User(String email, String password,
                String confirmPassword,String name) {
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.name = name;
      
    }

 
 
    // getters & setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
    return email;
}

public void setEmail(String email) {
    this.email = email;
}

public String getPassword() {
    return password;
}

public void setPassword(String password) {
    this.password = password;
}

public String getConfirmPassword() {
    return confirmPassword;
}

public void setConfirmPassword(String confirmPassword) {
    this.confirmPassword = confirmPassword;
}

public String getName() { return name; }
public void setName(String name) { this.name = name; }
}


/*
Hibernate est la bibliothèque qui fait le lien entre Java et SQL.

Elle transforme tes objets Java (tes @Entity) en tables SQL.

Elle exécute automatiquement le SQL pour créer/modifier les tables selon ce que tu as dans tes classes @Entity
*/