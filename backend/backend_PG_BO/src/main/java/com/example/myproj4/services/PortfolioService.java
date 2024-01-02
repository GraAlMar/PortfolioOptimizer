package com.example.myproj4.services;

import com.example.myproj4.models.Portfolio;
import com.example.myproj4.repositories.PortfolioRepository;
import com.example.myproj4.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;
    private final UserRepository userRepository;

    public PortfolioService(PortfolioRepository portfolioRepository, UserRepository userRepository) {
        this.portfolioRepository = portfolioRepository;
        this.userRepository = userRepository;
    }

    public List<Portfolio> findAll() {
        List<Portfolio> all = portfolioRepository.findAll();
        //System.out.println("all = " + all);
        return all;
    }

    public Portfolio save(Portfolio portfolio) {

        System.out.println("saved portfolio = " + portfolio);
        return portfolioRepository.save(portfolio);
    }

    public List<Portfolio> findAllUserPortfolios(Long userId) {
        var user = userRepository.findById(userId).get();
        return portfolioRepository.findAllByUser(user);
    }
}
