package com.example.myproj4.services;
import com.example.myproj4.models.Asset;
import com.example.myproj4.repositories.AssetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AssetService {
    private final AssetRepository assetRepository;

    public AssetService(AssetRepository assetRepository) {
        this.assetRepository = assetRepository;
    }

    public List<Asset> findAll(){
        return assetRepository.findAll();
    }
    public Asset save(Asset asset) {
        return assetRepository.save(asset);
    }
}
