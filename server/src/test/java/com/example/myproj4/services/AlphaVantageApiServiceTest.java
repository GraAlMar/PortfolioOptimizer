package com.example.myproj4.services;

import com.example.myproj4.models.AlphaVantageAsset;
import com.example.myproj4.repositories.AlphaVantageAPIRepository;
import com.example.myproj4.repositories.AssetRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

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
        var expected = new ArrayList<String>(List.of("symbol1", "symbol2"));
        var actual = alphaVantageApiService.extractSymbolsFromApiResponse(apiResponse);
        assertEquals(expected, actual);
    }

    @Test
    void testUpdateAlphaVantageData() {
    }


    private static Stream<Arguments> provideDataForMean() {
        return Stream.of(
                Arguments.of(Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0), 3.0),
                Arguments.of(Arrays.asList(2.0, 4.0, 6.0, 8.0, 10.0), 6.0)
        );
    }

    private static Stream<Arguments> provideDataForVariance() {
        return Stream.of(
                Arguments.of(Arrays.asList(1.0, 2.0, 3.0, 4.0, 5.0), 3.0, Math.sqrt(2.0)),
                Arguments.of(Arrays.asList(2.0, 4.0, 6.0, 8.0, 10.0), 6.0, Math.sqrt(8.0))
        );
    }

    @ParameterizedTest
    @MethodSource("provideDataForMean")
    public void testCalculateMean(List<Double> last10DaysValues, Double expectedMean) {
        Double actualMean = alphaVantageApiService.calculateMean(last10DaysValues);
        assertEquals(expectedMean, actualMean, 0.01);
    }

    @ParameterizedTest
    @MethodSource("provideDataForVariance")
    public void testCalculateVariance(List<Double> last10DaysValues, Double mean, Double expectedVariance) {
        Double actualVariance = alphaVantageApiService.calculateStandDev(last10DaysValues, mean);
        assertEquals(expectedVariance, actualVariance, 0.01);
    }
    @Test
    void testCalculateVariance() {

        Double[] pricesArray = new Double[]{
                92.2,
                92.82,
                92.0524806701031,
                91.205219072165,
                90.497506443299,
                91.7135760309278,
                92.2817396907217,
                92.3913853092783,
                92.2019974226804,
                92.2019974226804
        };

        List<Double> prices = new ArrayList<>(Arrays.asList(pricesArray));

        var mean = alphaVantageApiService.calculateMean(prices);
        var expected = Math.sqrt(0.39816780511675925);
        var actual = alphaVantageApiService.calculateStandDev(prices, mean);
        assertEquals(expected,actual);

    }
}