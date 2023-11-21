package com.example.myproj4.runners;

import com.example.myproj4.services.AssetService;
import com.example.myproj4.services.AlphaVantageApiService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ImportAlphaVantageDataRunner implements CommandLineRunner {
    private AlphaVantageApiService alphaVantageApiService;
    private final AssetService assetService;

    public ImportAlphaVantageDataRunner(AlphaVantageApiService alphaVantageApiService, AssetService assetService) {
        this.alphaVantageApiService = alphaVantageApiService;
        this.assetService = assetService;
    }
    @Override
    public void run(String... args) throws Exception {
        //var apiPart = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=";
        var ibm = alphaVantageApiService.getFinancialData("IBM");
        assetService.save(ibm);
        var tesla = alphaVantageApiService.getFinancialData("TSLA");
        assetService.save(tesla);
        var disney = alphaVantageApiService.getFinancialData("DIS");
        assetService.save(disney);
        System.out.println("ibm = " + ibm);
        System.out.println("tesla = " + tesla);
        System.out.println("disney = " + disney);

  }
}