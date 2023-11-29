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

    public List<Asset> findByName(String name) {
        return assetRepository.findAllByNameContainsIgnoreCase(name);};

    private Asset findBySymbol(String symbol) {
        return assetRepository.findAssetByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(symbol,symbol);
    }
    public Asset findByNameOrSymbol(String symbol, String name) {
        return assetRepository.findAssetByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(symbol, name);};
    public boolean checkIfNameAlreadyInDB(String name) {
        return assetRepository.existsByNameContainsIgnoreCase(name);};
    public boolean checkIfSymbolAlreadyInDB(String symbol) {
        return assetRepository.existsByAbbreviationContainsIgnoreCase(symbol);};
    public boolean checkIfAlreadyInDB(String symbol, String name) {
        return assetRepository.existsByAbbreviationContainsIgnoreCaseOrNameContainsIgnoreCase(symbol, name);};

    public List<Asset> search(String searchTerm) {
       return searchBySymbol(searchTerm) != null ? List.of(searchBySymbol(searchTerm)) : searchByName(searchTerm);
    }

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
    private synchronized Asset insertIfNotExists(Asset asset) {
        return !assetRepository.existsByAbbreviation(asset.getAbbreviation()) ?
                assetRepository.save(asset) :
                assetRepository.findByAbbreviationContainsIgnoreCase(asset.getAbbreviation());
    }

    private List<Asset> searchByNameUsingAPI(String name) {
        return alphaVantageApiService.getSymbolsWithSearchByName(name)
                .stream()
                .map(symbol -> alphaVantageApiService.getFinancialData(symbol))
                .filter(asset -> asset.getName() != null)
                .collect(Collectors.toList());
    }

    public Asset searchBySymbol(String symbol) {
        if (checkIfSymbolAlreadyInDB(symbol)) {
            return findBySymbol(symbol);
        }
        var asset = alphaVantageApiService.getFinancialData(symbol);
        return asset.getName() != null ?
                insertIfNotExists(asset) :
                null;
    }
}
