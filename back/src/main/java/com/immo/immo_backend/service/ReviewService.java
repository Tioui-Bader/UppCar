package com.immo.immo_backend.service;

import com.immo.immo_backend.model.Review;
import com.immo.immo_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    public List<Review> getReviewsByCarId(Long carId) {
        return reviewRepository.findByCarId(carId);
    }

    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }
}
