package com.example.myproj4.controllers;

import com.example.myproj4.models.Asset;
import com.example.myproj4.services.AlphaVantageApiService;

import com.example.myproj4.services.AssetService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")

public class FinancialDataController {

    private final AlphaVantageApiService alphaVantageApiService;
    private final AssetService assetService;

    public FinancialDataController(AlphaVantageApiService alphaVantageApiService, AssetService assetService) {
        this.alphaVantageApiService = alphaVantageApiService;
        this.assetService = assetService;
    }

    @GetMapping("/explore")
    public Asset getFinancialDataBySymbol(@RequestParam String searchString, Authentication authSymbolSearch) {
        System.out.println("authSymbolSearch = " + authSymbolSearch);
        System.out.println("searchStringSymbolSearch = " + searchString);
        var asset = assetService.checkIfAlreadyInDB(searchString, searchString) ? assetService.findByNameOrSymbol(searchString, searchString) : alphaVantageApiService.getFinancialData(searchString);
/*
        var alphaVantageAssetToStore = alphaVantageApiService.getAlphaVantageAssetToStore(searchString);
        alphaVantageApiService.save(alphaVantageAssetToStore);
        var asset = alphaVantageApiService.getFinancialData(searchString);*/
        assetService.save(asset);

        return asset;
    }

    @GetMapping("/exploreByName")
    public List<Asset> getFinancialDataByName(@RequestParam String searchString, Authentication authNameSearch) {
        System.out.println("searchStringNameSearch = " + searchString);
        System.out.println("authNameSearch = " + authNameSearch);
        var assets = assetService.checkIfNameAlreadyInDB(searchString) ? assetService.findByName(searchString) : (((List<Asset>) alphaVantageApiService.getSymbolsWithSearchByName(searchString).stream().map(symbol -> alphaVantageApiService.getFinancialData(symbol)).filter(asset -> asset.getName() != null).collect(Collectors.toList())));
        assetService.saveAll(assets);
        return assets;
        /*var symbols = alphaVantageApiService.getSymbolsWithSearchByName(searchString);
        System.out.println("symbols = " + symbols);
        return ((List<Asset>) symbols.stream().map(symbol -> alphaVantageApiService.getFinancialData(symbol)).filter(asset -> asset.getName() != null).collect(Collectors.toList()));*/
    }

}
