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
    @OneToMany(mappedBy = "portfolio")
    Set<Investment> investments;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
