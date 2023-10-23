package com.example.myproj4.repositories;

import com.example.myproj4.models.AlphaVantageAsset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlphaVantageAPIRepository extends JpaRepository<AlphaVantageAsset,Long> {
}
