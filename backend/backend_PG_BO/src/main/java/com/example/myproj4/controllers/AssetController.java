package com.example.myproj4.controllers;
import com.example.myproj4.models.Asset;
import com.example.myproj4.repositories.AssetRepository;
import com.example.myproj4.services.AssetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class AssetController {
    private AssetService assetService;

    public AssetController(AssetService assetService) {
        this.assetService = assetService;
    }

    @GetMapping("/assets")
    List<Asset> getAll() {
        return assetService.findAll();
    }
    @PostMapping("/assets")
    Asset add(@RequestBody Asset asset) {
        System.out.println("asset = " + asset);
        return assetService.save(asset);
    }

}