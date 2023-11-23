package com.example.myproj4.services;
import com.example.myproj4.models.Asset;
import com.example.myproj4.repositories.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AssetService {
    private final AssetRepository assetRepository;
    private final AlphaVantageApiService alphaVantageApiService;

    public AssetService(AssetRepository assetRepository, AlphaVantageApiService alphaVantageApiService) {
        this.assetRepository = assetRepository;
        this.alphaVantageApiService = alphaVantageApiService;
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
    public List<Asset> searchByName(String name) {
        if (checkIfNameAlreadyInDB(name)) {
            return findByName(name);
        }
        var assets = searchByNameUsingAPI(name);
        return insertIfNotExists(assets);
    }

    private synchronized List<Asset> insertIfNotExists(List<Asset> assets) {
        assets.stream()
                .filter(asset -> !assetRepository.existsByAbbreviation(asset.getAbbreviation()))
                .forEach(asset -> assetRepository.save(asset));
        return assetRepository.findAllByAbbreviationIn(assets.stream().map(asset -> asset.getAbbreviation()).toList());

    }
    private List<Asset> searchByNameUsingAPI(String name) {
        return alphaVantageApiService.getSymbolsWithSearchByName(name)
                .stream()
                .map(symbol -> alphaVantageApiService.getFinancialData(symbol))
                .filter(asset -> asset.getName() != null)
                .collect(Collectors.toList());
    }
}
