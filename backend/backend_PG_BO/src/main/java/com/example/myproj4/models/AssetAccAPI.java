package com.example.myproj4.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "AssetsAccApi")
public class AssetAccAPI {
    @Id
    @GeneratedValue
    private Long id;
    @JsonProperty("Symbol")
    private String assetName;
    @JsonProperty("AssetType")
    private String assetType;
    @JsonProperty("Beta")
    private Double beta;

    public AssetAccAPI(Long id, String assetName, String assetType, Double beta) {
        this.id = id;
        this.assetName = assetName;
        this.assetType = assetType;
        this.beta = beta;
    }

    public AssetAccAPI() {
    }

    public Long getId() {
        return id;
    }

    public String getAssetName() {
        return assetName;
    }

    public String getAssetType() {
        return assetType;
    }

    public Double getBeta() {
        return beta;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "AssetAccAPI{" +
                "id=" + id +
                ", assetName='" + assetName + '\'' +
                ", assetType='" + assetType + '\'' +
                ", beta=" + beta +
                '}';
    }

    public void setAssetName(String assetName) {
        this.assetName = assetName;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public void setBeta(Double beta) {
        this.beta = beta;
    }
}
