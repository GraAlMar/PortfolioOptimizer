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
    private String name;
    @Column
    private String type;
    @Column
    private String wkpnr;
    @Column
    private Double beta;
    @Column
    private Double sharperatio;


    public Asset(Long id, String name, String type, String wkpnr, Double beta, Double sharperatio) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.wkpnr = wkpnr;
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

    public String getName() {
        return name;
    }

    public String getType() {
        return type;
    }

    public String getWkpnr() {
        return wkpnr;
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
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", wkpnr='" + wkpnr + '\'' +
                ", beta=" + beta +
                ", sharperatio=" + sharperatio +
                '}';
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setWkpnr(String wkpnr) {
        this.wkpnr = wkpnr;
    }

    public void setBeta(Double beta) {
        this.beta = beta;
    }

    public void setSharperatio(Double sharperatio) {
        this.sharperatio = sharperatio;
    }
}
