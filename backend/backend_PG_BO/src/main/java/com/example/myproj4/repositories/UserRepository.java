package com.example.myproj4.repositories;

import com.example.myproj4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByUsername(String name);
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndUsername(String email, String name);
    Boolean existsByUsername(String name);
    Boolean existsByEmail(String email);
}
