package com.example.myproj4.controllers.payload;

import com.example.myproj4.models.Asset;

import java.util.List;
import java.util.Set;

public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private List<String> roles;
    private Asset main;
    private Set<Asset> shortList;

    public UserDTO(Long id, String username, String email, List<String> roles, Asset main, Set<Asset> shortList) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.main = main;
        this.shortList = shortList;
    }

}
