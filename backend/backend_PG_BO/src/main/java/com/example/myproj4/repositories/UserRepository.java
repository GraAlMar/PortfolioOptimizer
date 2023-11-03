package com.example.myproj4.repositories;

import com.example.myproj4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String name);
    Optional<User> findByEmail(String email);
    Boolean existsByUsername(String name);
    Boolean existsByEmail(String email);
}
