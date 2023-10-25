package com.example.myproj4.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
public class Portfolio {
    @ManyToOne()
    private User user;
    @Id
    @GeneratedValue
    private Long id;
    @ManyToMany
    Set<Asset> assets;

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
