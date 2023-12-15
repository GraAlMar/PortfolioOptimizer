package com.example.myproj4.services;

import com.example.myproj4.models.Investment;

import java.util.List;

public class PortfolioDTO {
    private  Long id;
    private  Long userId;
    private  List<Investment> investments;
    private  Double overallBeta;
    private  Double overallSharpeRatio;

    public PortfolioDTO(Long id, Long userId, List<Investment> investments, Double overallBeta, Double overallSharpeRatio) {
        this.id = id;
        this.userId = userId;
        this.investments = investments;
        this.overallBeta = overallBeta;
        this.overallSharpeRatio = overallSharpeRatio;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public List<Investment> getInvestments() {
        return investments;
    }

    public Double getOverallBeta() {
        return overallBeta;
    }

    public Double getOverallSharpeRatio() {
        return overallSharpeRatio;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setInvestments(List<Investment> investments) {
        this.investments = investments;
    }

    public void setOverallBeta(Double overallBeta) {
        this.overallBeta = overallBeta;
    }

    public void setOverallSharpeRatio(Double overallSharpeRatio) {
        this.overallSharpeRatio = overallSharpeRatio;
    }
}
