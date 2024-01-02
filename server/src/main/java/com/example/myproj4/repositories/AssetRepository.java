package com.example.myproj4.repositories;

import com.example.myproj4.models.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface AssetRepository extends JpaRepository<Asset,Long> {
    boolean existsByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(String symbol, String name);
    boolean existsByNameContainsIgnoreCase(String name);

    boolean existsByAbbreviation(String abbreviation);
    Asset findAssetByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(String symbol, String name);

    List<Asset> findAllByNameContainsIgnoreCase(String name);

    Asset findByAbbreviation(String symbol);

    Asset findByAbbreviationContainsIgnoreCase(String symbol);

    List<Asset> findAllByAbbreviationIn(List<String> abbreviations);

    boolean existsByAbbreviationContainsIgnoreCase(String symbol);
}
