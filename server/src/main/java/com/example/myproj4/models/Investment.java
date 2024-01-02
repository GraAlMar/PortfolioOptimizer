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

    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "portfolioId")
    private Portfolio portfolio;


    public Investment(Asset asset, BigDecimal amount) {
        this.asset = asset;
        this.amount = amount;
    }

    public Investment() {

    }
    public void setPortfolio(Portfolio portfolio) {
        this.portfolio = portfolio;
    }
    public Asset getAsset() {
        return asset;
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



    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    @Override
    public String toString() {
        return "Investment{" +
                "id=" + id +
                ", asset=" + asset +
                ", amount=" + amount +
                '}';
    }
}
