package com.example.myproj4.repositories;

import com.example.myproj4.models.Portfolio;
import com.example.myproj4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface PortfolioRepository extends JpaRepository<Portfolio, Long> {
    @Override
    List<Portfolio> findAll();
    List<Portfolio> findAllByUser(User user);
}
