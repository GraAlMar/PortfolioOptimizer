package com.example.myproj4.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "AlphaVantAssets")
public class AlphaVantageAsset {
    @Id
    @GeneratedValue
    private Long id;

    @JsonProperty("Symbol")
    private String assetAbbreviation;
    @JsonProperty("AssetType")
    private String assetType;
    @JsonProperty("Name")
    private String assetName;
    @JsonProperty("Beta")
    private Double beta;
    @JsonProperty("50DayMovingAverage")
    private Double avPrice;

    public AlphaVantageAsset(Long id, String assetAbbreviation, String assetType, String assetName, Double beta, Double avPrice) {
        this.id = id;
        this.assetAbbreviation = assetAbbreviation;
        this.assetType = assetType;
        this.assetName = assetName;
        this.beta = beta;
        this.avPrice = avPrice;
    }

    public AlphaVantageAsset() {
    }

    public Long getId() {
        return id;
    }

    public String getAssetAbbreviation() {
        return assetAbbreviation;
    }

    public String getAssetType() {
        return assetType;
    }

    public String getAssetName() {
        return assetName;
    }

    public Double getBeta() {
        return beta;
    }

    public Double getAvPrice() {
        return avPrice;
    }

    @Override
    public String toString() {
        return "AlphaVantageAsset{" +
                "id=" + id +
                ", assetAbbreviation='" + assetAbbreviation + '\'' +
                ", assetType='" + assetType + '\'' +
                ", assetName='" + assetName + '\'' +
                ", beta=" + beta +
                ", avPrice=" + avPrice +
                '}';
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssetAbbreviation(String assetName) {
        this.assetAbbreviation = assetName;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public void setBeta(Double beta) {
        this.beta = beta;
    }

    public void setAvPrice(Double avPrice) {
        this.avPrice = avPrice;
    }
}
