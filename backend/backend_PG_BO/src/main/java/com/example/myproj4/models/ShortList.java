package com.example.myproj4.models;

import jakarta.persistence.*;

import java.util.Set;

@Embeddable
public class ShortList {
    @ManyToMany
    Set<Asset> assetShortList;

    public ShortList() {
    }

    @Override
    public String toString() {
        return "ShortList{" +
                "assetShortList=" + assetShortList +
                '}';
    }

    public Set<Asset> getShortList() {
        return assetShortList;
    }

    public void setShortList(Set<Asset> assetShortList) {
        this.assetShortList = assetShortList;
    }

}
