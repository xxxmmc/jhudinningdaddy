package com.diningdaddy.project.repo;

import org.springframework.data.repository.CrudRepository;

import com.diningdaddy.project.model.User;

// Auto-implemented by Spring

public interface UserRepository extends CrudRepository<User, Long> {
    public com.diningdaddy.project.model.User findByLastName(String lastName);
    public com.diningdaddy.project.model.User findByEmail(String email);
}
