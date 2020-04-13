package com.diningdaddy.project.services;

import com.diningdaddy.project.model.User;
import com.diningdaddy.project.model.UserLogin;
import com.diningdaddy.project.security.JwtUtil;
import com.diningdaddy.project.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;
    private BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public User findUserById(long id) {
        Optional<User> op_user = userRepository.findById(id);
        if (!op_user.isPresent()) {
            return null;
        }
        return op_user.get();
    }

    public Long register(User newUser) {
        // if email already registered, return null
        if (userRepository.findByEmail(newUser.getEmail()) != null) {
            return null;
        }
        newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
        User user = userRepository.save(newUser);
        return user.getId();
    }

    public String authenticate(UserLogin login) {
        User user = userRepository.findByEmail(login.getEmail());
        if (user == null) {
            return null;
        }
        if (bCryptPasswordEncoder.matches(login.getPassword(), user.getPassword())) {
            return jwtUtil.generateToken(login.getEmail());
        } else {
            return null;
        }
    }
}
