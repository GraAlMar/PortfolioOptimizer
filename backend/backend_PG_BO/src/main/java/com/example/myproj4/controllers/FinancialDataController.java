package com.example.myproj4.controllers;

import com.example.myproj4.models.Asset;
import com.example.myproj4.services.AlphaVantageApiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")

public class FinancialDataController {

    private final AlphaVantageApiService alphaVantageApiService;

    public FinancialDataController(AlphaVantageApiService alphaVantageApiService) {
        this.alphaVantageApiService = alphaVantageApiService;
    }

    @GetMapping("/explore")
    public Asset getFinancialDataBySymbol(@RequestParam String searchString) {
        System.out.println("searchStringSymbolSearch = " + searchString);

        var fetched = alphaVantageApiService.getAlphaVantageAssetToStore(searchString);
        alphaVantageApiService.save(fetched);
        return alphaVantageApiService.getFinancialData(searchString);
    }

    @GetMapping("/exploreByName")
    public List<Asset> getFinancialDataByName(@RequestParam String searchString) {
        System.out.println("searchStringNameSearch = " + searchString);
        var symbols = alphaVantageApiService.getSymbolsWithSearchByName(searchString);
        System.out.println("symbols = " + symbols);
        return ((List<Asset>) symbols.stream().map(symbol -> alphaVantageApiService.getFinancialData(symbol)).filter(asset -> asset.getName() != null).collect(Collectors.toList()));
    }

}
