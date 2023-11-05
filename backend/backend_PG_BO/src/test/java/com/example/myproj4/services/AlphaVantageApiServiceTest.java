package com.example.myproj4.services;

import com.example.myproj4.models.AlphaVantageAsset;
import com.example.myproj4.repositories.AlphaVantageAPIRepository;
import com.example.myproj4.repositories.AssetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.internal.verification.VerificationModeFactory.times;
import static reactor.core.publisher.Mono.just;

class AlphaVantageApiServiceTest {
    @Mock
    private WebClient webClient;
    @Mock
    private WebClient.Builder webClientBuilder;
    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;
    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;
    @Mock
    private WebClient.RequestBodyUriSpec requestBodyUriSpec;
    @Mock
    private WebClient.RequestBodySpec requestBodySpec;
    @Mock
    private WebClient.ResponseSpec responseSpec;
    @Mock
    private AlphaVantageAPIRepository alphaVantageAPIRepository;
    @Mock
    private AssetRepository assetRepository;
    @Mock
    private AssetService assetService;
    @InjectMocks
    private AlphaVantageApiService alphaVantageApiService;
    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
        when(webClientBuilder.build()).thenReturn(webClient);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);

    }


    @Test
    void testGetFinancialData() {
        AlphaVantageAsset alphaVantageAsset = new AlphaVantageAsset();
        when(responseSpec.bodyToMono(AlphaVantageAsset.class)).thenReturn(Mono.just(alphaVantageAsset));
        alphaVantageApiService.getFinancialData("test");
        verify(webClient, times(1)).get();
        verify(requestHeadersUriSpec, times(1)).uri(anyString());
        verify(requestHeadersSpec, times(1)).retrieve();
        verify(responseSpec, times(1)).bodyToMono(AlphaVantageAsset.class);
    }
    @Test
    void testGetSymbolsWithSearchByName() throws JsonProcessingException {
        String apiResponse = "{\"bestMatches\": [{\"1. symbol\": \"symbol1\"}, {\"1. symbol\": \"symbol2\"}]}";

        String searchNameString = "test";

        when(responseSpec.bodyToMono(String.class)).thenReturn(Mono.just(apiResponse));

        alphaVantageApiService.getSymbolsWithSearchByName(searchNameString);
        verify(webClient, times(1)).get();
        verify(requestHeadersUriSpec, times(1)).uri(anyString());
        verify(requestHeadersSpec, times(1)).retrieve();
        verify(responseSpec, times(1)).bodyToMono(String.class);
    }

    @Test
    void extractSymbolsFromApiResponse() throws JsonProcessingException {
        String apiResponse = "{\"bestMatches\": [{\"1. symbol\": \"symbol1\"}, {\"1. symbol\": \"symbol2\"}]}";
        var expected = new ArrayList<String>(List.of("symbol1","symbol2"));
        var actual = alphaVantageApiService.extractSymbolsFromApiResponse(apiResponse);
        assertEquals(expected,actual);
    }

    @Test
    void testUpdateAlphaVantageData() {
    }
}