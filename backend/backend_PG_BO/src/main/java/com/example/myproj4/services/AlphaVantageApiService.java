package com.example.myproj4.services;

import com.example.myproj4.models.Asset;
import com.example.myproj4.models.AlphaVantageAsset;
import com.example.myproj4.repositories.AlphaVantageAPIRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AlphaVantageApiService {

    private final WebClient webClient;
    private final String alphaVantageApiKey;
    private final AlphaVantageAPIRepository alphaVantageAPIRepository;

    private final AssetService assetService;

    public AlphaVantageApiService(WebClient.Builder webClientBuilder, @Value("data.apis.alphavantage.apikey") String alphaVantageApiKey, AlphaVantageAPIRepository alphaVantageAPIRepository, AssetService assetService) {
        this.webClient = webClientBuilder.build();
        this.alphaVantageApiKey = alphaVantageApiKey;
        this.alphaVantageAPIRepository = alphaVantageAPIRepository;
        this.assetService = assetService;
    }


    public Asset getFinancialData(String searchString) {

        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + alphaVantageApiKey;
        System.out.println("apiUrl = " + apiUrl);

        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(AlphaVantageAsset.class)
                .map(alphaVantageAsset -> {
                    Asset asset = new Asset();
                    asset.setAbbreviation(alphaVantageAsset.getAssetAbbreviation());
                    asset.setType(alphaVantageAsset.getAssetType());
                    asset.setBeta(alphaVantageAsset.getBeta());
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

    public AlphaVantageAsset getAlphaVantageAssetToStore(String searchString) {


        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + alphaVantageApiKey;


        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(AlphaVantageAsset.class).block();
    }


}
