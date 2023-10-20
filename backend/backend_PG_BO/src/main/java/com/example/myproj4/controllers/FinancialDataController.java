package com.example.myproj4.controllers;

import com.example.myproj4.constants.APIKey;
import com.example.myproj4.models.Asset;
import com.example.myproj4.models.AssetAccAPI;
import com.example.myproj4.services.FinAPIService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")

public class FinancialDataController {

    private final FinAPIService finAPIService;

    public FinancialDataController(FinAPIService finAPIService) {
        this.finAPIService = finAPIService;
    }

    @GetMapping("/explore")
    public Asset getFinancialData(@RequestParam String searchString) {
        var fetched = finAPIService.getAssetAccAPIToStore(searchString);
        finAPIService.save(fetched);
        return finAPIService.getFinancialData(searchString);
    }
    /*
    @GetMapping("/explore")
    public Mono<String> getFinancialData(@RequestParam String searchString) {
        APIKey apiKey = new APIKey();
        System.out.println("apiKey = " + apiKey);
        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + apiKey + "'";
        System.out.println(apiUrl);

        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(String.class);
    }*/


    /*public FinancialDataController(WebClient webClient) {
        this.webClient = webClient;
    }

    @GetMapping("/explore")
    public Mono<String> getFinancialData(@RequestParam String searchString) {
        APIKey apiKey = new APIKey();
        String apiUrl = "'https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + apiKey + "'";
        System.out.println(apiUrl);
        WebClient webClient = WebClient.create(apiUrl);
        return webClient.get()
                .retrieve()
                .bodyToMono(String.class);
    }*/

}
