package com.immo.immo_backend;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class DbUpdater implements CommandLineRunner {
    private final JdbcTemplate jdbc;
    
    public DbUpdater(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }
    
    @Override
    public void run(String... args) {
        try {
            jdbc.execute("ALTER TABLE car_photos ALTER COLUMN photo_url TYPE TEXT;");
            System.out.println("TABLE UPDATED: car_photos column photo_url is now TEXT");
        } catch(Exception e) {
            System.out.println("Ignored DbUpdater Exception: " + e.getMessage());
        }
    }
}
