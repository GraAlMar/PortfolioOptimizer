package com.example.myproj4.controllers.payload;

import jakarta.persistence.Column;

public class SignupRequest {
    private String username;

    private String email;

    private String userpassword;

    public SignupRequest(String username, String email, String userpassword) {
        this.username = username;
        this.email = email;
        this.userpassword = userpassword;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getUserpassword() {
        return userpassword;
    }
}
