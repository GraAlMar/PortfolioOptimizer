package com.example.myproj4.models;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
public class Investment {
    @GeneratedValue
    @Id
    private Long id;
    @ManyToOne
    private Asset asset;
    @ManyToOne
    private Portfolio portfolio;
    private BigDecimal amount;

    public Asset getAsset() {
        return asset;
    }

    public Portfolio getPortfolio() {
        return portfolio;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAsset(Asset asset) {
        this.asset = asset;
    }

    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }
}
