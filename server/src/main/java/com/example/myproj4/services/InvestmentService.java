package com.example.myproj4.services;

import com.example.myproj4.repositories.InvestmentRepository;
import org.springframework.stereotype.Service;

@Service
public class InvestmentService {
    private final InvestmentRepository investmentRepository;

    public InvestmentService(InvestmentRepository investmentRepository) {
        this.investmentRepository = investmentRepository;
    }
}
