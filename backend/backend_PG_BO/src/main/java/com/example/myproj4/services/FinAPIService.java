package com.example.myproj4.services;

import com.example.myproj4.constants.APIKey;
import com.example.myproj4.models.Asset;
import com.example.myproj4.models.AssetAccAPI;
import com.example.myproj4.repositories.AssetAccAPIRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class FinAPIService {


    private final WebClient webClient;
    private final AssetAccAPIRepository assetAccAPIRepository;

    private final AssetService assetService;

    public FinAPIService(WebClient.Builder webClientBuilder, AssetAccAPIRepository assetAccAPIRepository, AssetService assetService) {
        this.webClient = webClientBuilder.build();
        this.assetAccAPIRepository = assetAccAPIRepository;
        this.assetService = assetService;
    }


    public Asset getFinancialData(String searchString) {
        APIKey apiKey = new APIKey();
        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + apiKey;
        System.out.println("apiUrl = " + apiUrl);

        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(AssetAccAPI.class)
                .map(assetAccAPI -> {
                    Asset asset = new Asset();
                    asset.setName(assetAccAPI.getAssetName());
                    asset.setType(assetAccAPI.getAssetType());
                    asset.setBeta(assetAccAPI.getBeta());
                    return asset;
                }).block();
    }
 /*   public List<String> getSymbolList(String searchString) {
        APIKey apiKey = new APIKey();
       String apiUrl =  "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + searchString + "&apikey=" + apiKey;
        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToFlux(Asset.class)
                .map(asset -> asset.getName())
    }*/

    public AssetAccAPI getAssetAccAPIToStore(String searchString) {
        APIKey apiKey = new APIKey();

        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + apiKey;


        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(AssetAccAPI.class).block();
    }
    public List<AssetAccAPI> findAll(){
        return assetAccAPIRepository.findAll();
    }
    public AssetAccAPI save(AssetAccAPI assetAccAPI) {
        return assetAccAPIRepository.save(assetAccAPI);
    }

}
