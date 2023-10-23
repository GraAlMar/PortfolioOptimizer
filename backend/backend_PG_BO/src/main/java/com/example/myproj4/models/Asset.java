package com.example.myproj4.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
@Table(name = "assets")
public class Asset {
    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String abbreviation;
    @Column
    private String type;
    @Column
    private String name;

    @Column
    private Double beta;
    @Column
    private Double sharperatio;


    public Asset(Long id, String abbreviation, String type, String name, Double beta, Double sharperatio) {
        this.id = id;
        this.abbreviation = abbreviation;
        this.type = type;
        this.name = name;
        this.beta = beta;
        this.sharperatio = sharperatio;
    }

    public Asset() {
    }


    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getAbbreviation() {
        return abbreviation;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public Double getBeta() {
        return beta;
    }

    public Double getSharperatio() {
        return sharperatio;
    }

    @Override
    public String toString() {
        return "Asset{" +
                "id=" + id +
                ", abbreviation='" + abbreviation + '\'' +
                ", type='" + type + '\'' +
                ", name='" + name + '\'' +
                ", beta=" + beta +
                ", sharperatio=" + sharperatio +
                '}';
    }

    public void setAbbreviation(String name) {
        this.abbreviation = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBeta(Double beta) {
        this.beta = beta;
    }

    public void setSharperatio(Double sharperatio) {
        this.sharperatio = sharperatio;
    }
}
