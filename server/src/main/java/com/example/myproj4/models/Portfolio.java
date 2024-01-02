package com.example.myproj4.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "Portfolios")
public class Portfolio {
    @ManyToOne()
    private User user;
    @Id
    @GeneratedValue
    private Long id;

    //@JoinColumn(name = "portfolioId")
    //@OneToMany
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "portfolio")
    Set<Investment> investments;

    public Portfolio(User user, Set<Investment> investments) {
        this.user = user;
        this.investments = investments;
    }

    public Portfolio() {

    }
    public void addInvestment(Investment investment) {
        investments.add(investment);
        investment.setPortfolio(this);
    }
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setInvestments(Set<Investment> investments) {
        this.investments = investments;
    }

    public Set<Investment> getInvestments() {
        return investments;
    }

    @Override
    public String toString() {
        return "Portfolio{" +
                "user=" + user +
                ", id=" + id +
                ", investments=" + investments +
                '}';
    }
}
