package com.immo.immo_backend.controller;

import com.immo.immo_backend.model.Review;
import com.immo.immo_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping("/car/{carId}")
    public List<Review> getReviewsByCarId(@PathVariable Long carId) {
        return reviewService.getReviewsByCarId(carId);
    }

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        Review saved = reviewService.saveReview(review);
        return ResponseEntity.ok(saved);
    }
}
