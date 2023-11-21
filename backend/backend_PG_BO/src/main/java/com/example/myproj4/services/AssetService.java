package com.example.myproj4.services;
import com.example.myproj4.models.Asset;
import com.example.myproj4.repositories.AssetRepository;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> findAll(){
        return assetRepository.findAll();
    }
    public Asset save(Asset asset) {
        return assetRepository.save(asset);
    }
    public List<Asset> saveAll(List<Asset> assets) {return assetRepository.saveAll(assets);};
    public List<Asset> findByName(String name) {return assetRepository.findAllByNameContainsIgnoreCase(name);};
    public boolean checkIfNameAlreadyInDB(String name) {return assetRepository.existsByNameContainsIgnoreCase(name);};
    public Asset findByNameOrSymbol(String symbol, String name) {return assetRepository.findAssetByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(symbol, name);};
    public boolean checkIfAlreadyInDB(String symbol, String name) {return assetRepository.existsByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(symbol, name);};
}
