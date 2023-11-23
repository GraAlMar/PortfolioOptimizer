package com.example.myproj4.services;

import com.example.myproj4.models.Asset;
import com.example.myproj4.models.AlphaVantageAsset;
import com.example.myproj4.repositories.AlphaVantageAPIRepository;
import com.example.myproj4.repositories.AssetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@EnableScheduling
@Service
public class AlphaVantageApiService {



    private final WebClient.Builder webClientBuilder;
    @Value("${data.apis.alphavantage.apikey}")
    private  String alphaVantageApiKey;
    private final AlphaVantageAPIRepository alphaVantageAPIRepository;
    private final AssetRepository assetRepository;



    public AlphaVantageApiService(WebClient.Builder webClientBuilder, @Value("${data.apis.alphavantage.apikey}") String alphaVantageApiKey,
                                  AlphaVantageAPIRepository alphaVantageAPIRepository,
                                  AssetRepository assetRepository) {

        this.webClientBuilder = webClientBuilder;
        this.alphaVantageApiKey = alphaVantageApiKey;
        this.alphaVantageAPIRepository = alphaVantageAPIRepository;
        this.assetRepository = assetRepository;
    }
    public Asset getFinancialData(String symbolSearchString) {
        WebClient webClient = webClientBuilder.build();
        //System.out.println("alphaVantageApiKey = " + alphaVantageApiKey);
        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbolSearchString + "&apikey=" + alphaVantageApiKey;
        //System.out.println("apiUrl = " + apiUrl);
        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(AlphaVantageAsset.class)
                .map(alphaVantageAsset -> {
                    Asset asset = new Asset();
                    asset.setAbbreviation(alphaVantageAsset.getAssetAbbreviation());
                    asset.setType(alphaVantageAsset.getAssetType());
                    asset.setName(alphaVantageAsset.getAssetName());
                    asset.setBeta(alphaVantageAsset.getBeta());
                    asset.setPrice(alphaVantageAsset.getAvPrice());
                    return asset;
                }).block();
    }
    public List<String> getSymbolsWithSearchByName(String searchNameString) {
        WebClient webClient = webClientBuilder.build();
        var apiPart = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=";
        String apiUrl = apiPart + searchNameString + "&apikey=" + alphaVantageApiKey;
        System.out.println("apiUrl = " + apiUrl);

        if (searchNameString != "") {
            var symbolsFromNames = webClient.get()
                    .uri(apiUrl)
                    .retrieve()
                    .bodyToMono(String.class)
                    .map(response -> {
                        System.out.println("response = " + response);
                        try {
                            return extractSymbolsFromApiResponse(response);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .block();
        System.out.println("symbolsFromNames = " + symbolsFromNames);
        return symbolsFromNames;
        }
        return new ArrayList<>();
    }

    public List<String> extractSymbolsFromApiResponse(String apiResponse) throws JsonProcessingException {
        System.out.println("apiResponse = " + apiResponse);
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseMap = objectMapper.readValue(apiResponse, new TypeReference<Map<String, Object>>() {});
        System.out.println("responseMap = " + responseMap);
        List<Map<String, String>> bestMatches = (List<Map<String, String>>) responseMap.get("bestMatches");
        System.out.println("bestMatches = " + bestMatches);

        return bestMatches.stream()
                .flatMap(map -> map.entrySet().stream()
                        .filter(entry -> "1. symbol".equals(entry.getKey()))
                        .map(Map.Entry::getValue))
                .collect(Collectors.toList());

    }



    @Scheduled(cron = "@hourly") //bzw. (cron="0 0 * * * *")
    public void updateAlphaVantageData(){
        List<Asset> assets = assetRepository.findAll();
        var updatedAssets = assets.stream().map(asset -> {
            var newAsset = getFinancialData(asset.getAbbreviation());
            newAsset.setId(asset.getId());
            return newAsset;
        }).collect(Collectors.toList());
        assetRepository.saveAll(updatedAssets);
    }


    public AlphaVantageAsset getAlphaVantageAssetToStore(String searchString) {
        WebClient webClient = webClientBuilder.build();

        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + searchString + "&apikey=" + alphaVantageApiKey;


        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToMono(AlphaVantageAsset.class).block();
    }


    public List<AlphaVantageAsset> findAll(){
        return alphaVantageAPIRepository.findAll();
    }
    public AlphaVantageAsset save(AlphaVantageAsset alphaVantageAsset) {
        return alphaVantageAPIRepository.save(alphaVantageAsset);
    }

}
