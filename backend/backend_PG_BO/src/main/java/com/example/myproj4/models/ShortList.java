package com.example.myproj4.models;

import jakarta.persistence.*;

import java.util.Set;

@Embeddable
public class ShortList {
    @ManyToMany
    Set<Asset> assetShortList;




}
