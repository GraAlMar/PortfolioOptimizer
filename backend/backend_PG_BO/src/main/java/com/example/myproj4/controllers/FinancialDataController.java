package com.example.myproj4.controllers;

import com.example.myproj4.models.Asset;
import com.example.myproj4.services.AlphaVantageApiService;
import org.springframework.web.bind.annotation.*;

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
        var apiPart = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=";
        var fetched = alphaVantageApiService.getAlphaVantageAssetToStore(searchString);
        alphaVantageApiService.save(fetched);
        return alphaVantageApiService.getFinancialData(searchString, apiPart);
    }

    @GetMapping("/exploreByName")
    public Asset getFinancialDataByName(@RequestParam String searchString) {
        System.out.println("searchStringNameSearch = " + searchString);
        var apiPart = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=";

        return alphaVantageApiService.getFinancialData(searchString, apiPart);
    }

}
