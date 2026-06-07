package com.immo.immo_backend.controller;

import org.springframework.web.bind.annotation.*;
import java.nio.file.*;
import java.io.IOException;

@RestController
@RequestMapping("/api/admin/ai")
@CrossOrigin(origins = "*")
public class AIController {

    @GetMapping("/forecast")
    public String getForecast() throws IOException {
        // Path adjusted for execution environment
        Path path = Paths.get("src/main/python/growth_forecast.json");
        if (Files.exists(path)) {
            return Files.readString(path);
        }

        // Try fallback path if running from root
        Path fallback = Paths.get("back/src/main/python/growth_forecast.json");
        if (Files.exists(fallback)) {
            return Files.readString(fallback);
        }

        return "{}";
    }
}
