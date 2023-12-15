package com.example.myproj4.repositories;

import com.example.myproj4.models.Investment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvestmentRepository extends JpaRepository<Investment, Long> {
}
