package com.example.myproj4.controllers;

import com.example.myproj4.models.Asset;
import com.example.myproj4.services.AlphaVantageApiService;

import com.example.myproj4.services.AssetService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public List<Asset> getFinancialData(@RequestParam String searchString, Authentication authSymbolSearch) {
        System.out.println("searchString= " + searchString);
        return assetService.search(searchString);
    }
    @GetMapping("/sharpeRatioData")
    public List<Double> getLast10DaysPrices(@RequestParam String assetSymbol) {
        System.out.println("assetSymbol = " + assetSymbol);
        return alphaVantageApiService.getAdjustedReturnsFromClosePrices(assetSymbol);
    }
    @GetMapping("/sharpeRatio")
    public Double getSharpeRatio(@RequestParam String assetSymbol) {
        return alphaVantageApiService.calculateSharpeRatio(assetSymbol);
    }
    @GetMapping("/sharpeRatioDataTY")
    public Object getTreasuryYield() {

        return alphaVantageApiService.getTreasuryYields();
    }

}
