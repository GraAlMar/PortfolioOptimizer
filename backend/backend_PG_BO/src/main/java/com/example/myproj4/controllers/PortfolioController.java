package com.example.myproj4.controllers;

import com.example.myproj4.models.Investment;
import com.example.myproj4.models.Portfolio;
import com.example.myproj4.repositories.UserRepository;
import com.example.myproj4.controllers.payload.PortfolioDTO;
import com.example.myproj4.services.PortfolioService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

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
    Portfolio add(@RequestBody Portfolio portfolio, @PathVariable Long userId, Authentication authentication) {
        System.out.println("userId = " + userId);
        var user = userRepository.findById(userId).get();
        System.out.println("user = " + user);
        System.out.println("authentication = " + authentication.getName());
        System.out.println("portfolioWITHOUT_user = " + portfolio);
        portfolio.setUser(user);
        System.out.println("portfolioWITH_user = " + portfolio);
        return portfolioService.save(portfolio);
        //var portfolioToSave = portfolio.getId();
        //return portfolioService.save(portfolioToSave);

    };
    @GetMapping("/portfolios/{userId}")
    List<PortfolioDTO> getUserPortfolios(@PathVariable Long userId) {
        var userPortfolios = portfolioService.findAllUserPortfolios(userId);

        return userPortfolios.stream()
                .map(portfolio -> new PortfolioDTO(portfolio.getId(), userId,new LinkedList<Investment>(portfolio.getInvestments()),  0.0, 0.0))
                .collect(Collectors.toList());
    }

}
