package com.example.myproj4.repositories;

import com.example.myproj4.models.Role;
import com.example.myproj4.models.RoleType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByName(RoleType name);
}
