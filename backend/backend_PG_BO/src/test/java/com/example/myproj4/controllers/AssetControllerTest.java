package com.example.myproj4.controllers;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

import com.example.myproj4.models.Asset;
import com.example.myproj4.services.AssetService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AssetControllerTest {
    //    @MockBean
    private AssetService assetService;

    private AssetController assetController;
    @Test
    void getAll() {
        AssetService mockedAssetService = mock(AssetService.class);
        AssetController assetController = new AssetController(mockedAssetService);
        List<Asset> assets = new ArrayList<>(List.of(new Asset(),new Asset(),new Asset()));
        when(mockedAssetService.findAll()).thenReturn(assets);
        List<Asset> expected = assets;
        List<Asset> actual = assetController.getAll();
        assertEquals(expected,actual);
    }

    @Test
    void add() {
        AssetService mockedAssetService = mock(AssetService.class);
        AssetController assetController = new AssetController(mockedAssetService);
        Asset asset = new Asset();
        when(mockedAssetService.save(asset)).thenReturn(asset);
        Asset actual = assetController.add(asset);
        Asset expected = asset;

        verify(mockedAssetService).save(asset);

        assertEquals(expected,actual);
    }
}