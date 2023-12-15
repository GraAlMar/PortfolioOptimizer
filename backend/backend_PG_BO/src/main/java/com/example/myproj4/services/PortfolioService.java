package com.example.myproj4.services;

import com.example.myproj4.models.Portfolio;
import com.example.myproj4.repositories.PortfolioRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {
    private final PortfolioRepository portfolioRepository;

    public PortfolioService(PortfolioRepository portfolioRepository) {
        this.portfolioRepository = portfolioRepository;
    }

    public List<Portfolio> findAll() {
        List<Portfolio> all = portfolioRepository.findAll();
        //System.out.println("all = " + all);
        return all;
    }

    public Portfolio save(Portfolio portfolio) {
        return portfolioRepository.save(portfolio);
    }
}
