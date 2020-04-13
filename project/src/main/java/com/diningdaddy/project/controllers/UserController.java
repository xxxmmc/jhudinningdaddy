package com.diningdaddy.project.controllers;

import java.util.Optional;

import com.diningdaddy.project.model.Geotag;
import com.diningdaddy.project.model.Rating;
import com.diningdaddy.project.model.User;
import com.diningdaddy.project.model.UserLogin;
import com.diningdaddy.project.repo.PostingRepository;
import com.diningdaddy.project.repo.UserRepository;
import com.diningdaddy.project.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
class UserController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private UserService user_service;

    UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Upon successful post, return the id.
    @PostMapping("/register")
    public ResponseEntity<Long> newUser(@RequestBody User newUser) {
        Long id = user_service.register(newUser);
        if (id == null) {
            new ResponseEntity(HttpStatus.CONFLICT);
        }
        return new ResponseEntity(id, HttpStatus.OK);
    }

    // Update user info
    @PutMapping("/users/{userId}")
    public ResponseEntity updateUser(@RequestBody User newUser, @PathVariable Long userId) {
        Optional<User> user_op = userRepository.findById(userId);
        if (!user_op.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        newUser.setId(userId);
        userRepository.save(newUser);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<Map<String, String>> newUser(@RequestBody UserLogin login) {
        Map<String, String> message = new HashMap<String, String>();
        User user = userRepository.findByEmail(login.getEmail());
        if (user == null) {
            return new ResponseEntity<Map<String, String>>(HttpStatus.NOT_FOUND);
        }
        String token = user_service.authenticate(login);
        if (token == null) {
            return new ResponseEntity<Map<String, String>>(HttpStatus.UNAUTHORIZED);
        }
        message.put("token", token);
        message.put("userId", user.getId().toString());
        return new ResponseEntity<Map<String, String>>(message, HttpStatus.OK);
    }

    @PostMapping("/users/rating")
    public ResponseEntity rateUser(@RequestBody Rating newRating) {
        if (newRating.getRating() < 1 || newRating.getRating() > 5) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        Optional<User> op_user = userRepository.findById(newRating.getUserId());
        if (!op_user.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        User user = op_user.get();
        float old_rating = user.getRating();
        int num_of_ratings = user.getNum_of_ratings() + 1;
        float new_rating = old_rating * (num_of_ratings - 1)/num_of_ratings + newRating.getRating()/num_of_ratings;
        user.setRating(new_rating);
        user.setNum_of_ratings(num_of_ratings);
        userRepository.save(user);
        return new ResponseEntity(HttpStatus.OK);
    }

    // Upon successful post, return the user info as json
    @GetMapping("/users/userid/{userId}")
    public ResponseEntity<User> findUserById(@PathVariable Long userId) {
        Optional<User> op_user = userRepository.findById(userId);
        if (!op_user.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(op_user.get(), HttpStatus.OK);
    }

    // return the rating as float
    @GetMapping("/users/rating/{userId}")
    public ResponseEntity<Float> getRatingById(@PathVariable Long userId) {
        Optional<User> op_user = userRepository.findById(userId);
        if (!op_user.isPresent()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity(op_user.get().getRating(), HttpStatus.OK);
    }

    // post location for user
//    @PostMapping("/users/location/{userId}")
//    public ResponseEntity updateUser(@RequestBody Geotag geotag, @PathVariable Long userId) {
//        Optional<User> user_op = userRepository.findById(userId);
//        if (!user_op.isPresent()) {
//            return new ResponseEntity(HttpStatus.NOT_FOUND);
//        }
//        User user = user_op.get();
//        user.setLocation(geotag);
//        userRepository.save(user);
//        return new ResponseEntity(HttpStatus.OK);
//    }
}
