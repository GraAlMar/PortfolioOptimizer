package com.example.myproj4.security.payload.request;

public class LoginRequest {

    private String username;
    private String userpassword;

    public String getUsername() {
        return username;
    }

    public String getUserpassword() {
        return userpassword;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUserpassword(String userpassword) {
        this.userpassword = userpassword;
    }
}
