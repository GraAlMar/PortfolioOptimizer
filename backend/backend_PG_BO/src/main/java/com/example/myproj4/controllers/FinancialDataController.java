package com.example.myproj4.controllers;

import com.example.myproj4.models.Asset;
import com.example.myproj4.services.AlphaVantageApiService;

import com.example.myproj4.services.AssetService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public List<Asset> getFinancialData(@RequestParam String searchString, Authentication authSymbolSearch) {
        System.out.println("searchString= " + searchString);
        return assetService.search(searchString);
    }
    @GetMapping("/sharpeRatioData")
    public List<String> getLast10DaysPrices(@RequestParam String assetSymbol) {
        System.out.println("assetSymbol = " + assetSymbol);
        return alphaVantageApiService.getAdjustedClosePrices(assetSymbol);
    }

    @GetMapping("/sharpeRatioDataTY")
    public Object getTreasuryYield() {

        return alphaVantageApiService.getTreasuryYield();
    }

}
