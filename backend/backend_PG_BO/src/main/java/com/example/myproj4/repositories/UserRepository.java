package com.example.myproj4.repositories;

import com.example.myproj4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
}
