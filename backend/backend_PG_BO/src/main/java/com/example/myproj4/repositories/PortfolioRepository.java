package com.example.myproj4.repositories;

import com.example.myproj4.models.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    @Override
    List<Portfolio> findAll();
}
