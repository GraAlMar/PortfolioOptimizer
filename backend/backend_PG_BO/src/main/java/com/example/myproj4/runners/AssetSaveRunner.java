package com.example.myproj4.runners;

import com.example.myproj4.services.AssetService;
import com.example.myproj4.services.FinAPIService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AssetSaveRunner implements CommandLineRunner {
    private FinAPIService finAPIService;
    private final AssetService assetService;

    public AssetSaveRunner(FinAPIService finAPIService, AssetService assetService) {
        this.finAPIService= finAPIService;
        this.assetService = assetService;
    }
    @Override
    public void run(String... args) throws Exception {
        var ibm = finAPIService.getFinancialData("IBM");
        assetService.save(ibm);
        var omv = finAPIService.getFinancialData("TSLA");
        assetService.save(omv);
        System.out.println(ibm + " "+omv);

  }
}
/*
@Configuration

public class AssetSaveRunner {
    @Bean
    CommandLineRunner APIAssetRunner() {
        return args -> {

            System.out.println("hello from runner");
        };

    }
}*/
/*
@Component
public class AssetSaveRunner implements ApplicationRunner {



    @Override
    public void run(ApplicationArguments args) throws Exception {

        System.out.println("assetString = ");
    }
}*/
