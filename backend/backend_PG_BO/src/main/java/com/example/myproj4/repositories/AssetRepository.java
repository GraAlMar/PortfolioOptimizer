package com.example.myproj4.repositories;

import com.example.myproj4.models.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset,Long> {
    Asset findAssetByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(String symbol, String name);
    boolean existsByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(String symbol, String name);

    List<Asset> findAllByNameContainsIgnoreCase(String name);
    boolean existsByNameContainsIgnoreCase(String name);

    boolean existsByAbbreviation(String abbreviation);

    List<Asset> findAllByAbbreviationIn(List<String> abbreviations);
}
