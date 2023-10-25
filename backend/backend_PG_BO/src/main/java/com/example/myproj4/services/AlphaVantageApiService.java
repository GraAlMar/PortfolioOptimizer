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
import reactor.core.publisher.Flux;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@EnableScheduling
@Service
public class AlphaVantageApiService {


    private final WebClient webClient;
    @Value("${data.apis.alphavantage.apikey}")
    private  String alphaVantageApiKey;
    private final AlphaVantageAPIRepository alphaVantageAPIRepository;
    private final AssetRepository assetRepository;


    private final AssetService assetService;

    public AlphaVantageApiService(WebClient.Builder webClientBuilder, @Value("${data.apis.alphavantage.apikey}") String alphaVantageApiKey, AlphaVantageAPIRepository alphaVantageAPIRepository, AssetRepository assetRepository, AssetService assetService) {
        this.webClient = webClientBuilder.build();
        this.alphaVantageApiKey = alphaVantageApiKey;
        this.alphaVantageAPIRepository = alphaVantageAPIRepository;
        this.assetRepository = assetRepository;
        this.assetService = assetService;
    }


    public Asset getFinancialData(String symbolSearchString) {
        System.out.println("alphaVantageApiKey = " + alphaVantageApiKey);
        String apiUrl = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=" + symbolSearchString + "&apikey=" + alphaVantageApiKey;
        System.out.println("apiUrl = " + apiUrl);

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
                    return asset;
                }).block();
    }
    public List<String> getSymbolsWithSearchByName(String searchNameString) {
        var apiPart = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=";
        String apiUrl = apiPart + searchNameString + "&apikey=" + alphaVantageApiKey;

        return webClient.get()
                .uri(apiUrl)
                .retrieve()
                .bodyToFlux(String.class)
                .flatMap(response -> {
                    try {
                        return extractSymbolsFromApiResponse(response);
                    } catch (JsonProcessingException e) {
                        return Flux.error(new RuntimeException(e));
                    }
                })
        .collectList().block();
    }

    private Flux<String> extractSymbolsFromApiResponse(String apiResponse) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> responseMap = objectMapper.readValue(apiResponse, new TypeReference<Map<String, Object>>() {});

        List<Map<String, String>> bestMatches = (List<Map<String, String>>) responseMap.get("bestMatches");

        return Flux.fromIterable(bestMatches)
                .map(company -> company.get("1. symbol"));

    }



    @Scheduled(cron = "@hourly") //bzw. (cron="0 0 * * * *")
    public void updateAlphaVantageData(){
        List<Asset> assets = assetService.findAll();
        var updatedAssets = assets.stream().map(asset -> {
            var newAsset = getFinancialData(asset.getAbbreviation());
            newAsset.setId(asset.getId());
            return newAsset;
        }).collect(Collectors.toList());
        assetRepository.saveAll(updatedAssets);
    }


    public AlphaVantageAsset getAlphaVantageAssetToStore(String searchString) {


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
