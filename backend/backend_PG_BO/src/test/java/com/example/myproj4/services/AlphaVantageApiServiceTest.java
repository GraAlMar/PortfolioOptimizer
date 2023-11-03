package com.example.myproj4.services;

import com.example.myproj4.models.AlphaVantageAsset;
import com.example.myproj4.repositories.AlphaVantageAPIRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.internal.verification.VerificationModeFactory.times;
import static reactor.core.publisher.Mono.just;

class AlphaVantageApiServiceTest {
    @InjectMocks
    private AlphaVantageApiService alphaVantageApiService;
    @Mock
    private WebClient.Builder webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;
    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;
    @Mock
    private AlphaVantageAPIRepository alphaVantageAPIRepository;
    @Mock
    private AssetService assetService;
    @BeforeEach
    public void setup() {

        MockitoAnnotations.openMocks(AlphaVantageApiService.class);

        when(webClient.build().get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.retrieve()).thenReturn(responseSpec);

    }

    @Test
    void testGetFinancialData() {
        AlphaVantageAsset alphaVantageAsset = new AlphaVantageAsset();
        when(responseSpec.bodyToMono(AlphaVantageAsset.class)).thenReturn(Mono.just(alphaVantageAsset));

        alphaVantageApiService.getFinancialData("test");

        verify(webClient.build(), times(1)).get();
        verify(requestHeadersUriSpec, times(1)).uri(anyString());
        verify(requestHeadersSpec, times(1)).retrieve();
        verify(responseSpec, times(1)).bodyToMono(AlphaVantageAsset.class);
    }

    @Test
    void testGetSymbolsWithSearchByName() {
    }

    @Test
    void testUpdateAlphaVantageData() {
    }
}