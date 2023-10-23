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
    public Asset getFinancialData(@RequestParam String searchString) {
        var fetched = alphaVantageApiService.getAssetAccAPIToStore(searchString);
        alphaVantageApiService.save(fetched);
        return alphaVantageApiService.getFinancialData(searchString);
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
