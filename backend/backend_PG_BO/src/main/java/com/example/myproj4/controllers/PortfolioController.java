package com.example.myproj4.controllers;

import com.example.myproj4.models.Portfolio;
import com.example.myproj4.repositories.UserRepository;
import com.example.myproj4.services.PortfolioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")

public class PortfolioController {
    private final PortfolioService portfolioService;
    private final UserRepository userRepository;

    public PortfolioController(PortfolioService portfolioService, UserRepository userRepository) {
        this.portfolioService = portfolioService;
        this.userRepository = userRepository;
    }
    @GetMapping("/portfolios")
    List<Portfolio> getAll() {
        return portfolioService.findAll();
    }

    @PostMapping("/portfolios/{userId}")
    Portfolio add(@RequestBody Portfolio portfolio, @PathVariable Long userId) {
        System.out.println("userId = " + userId);
        System.out.println("portfolio = " + portfolio);
        //var portfolioToSave = portfolio.getId();
        //return portfolioService.save(portfolioToSave);
        return null;
    }

}
