package com.example.myproj4.repositories;

import com.example.myproj4.models.Asset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssetRepository extends JpaRepository<Asset,Long> {
}
