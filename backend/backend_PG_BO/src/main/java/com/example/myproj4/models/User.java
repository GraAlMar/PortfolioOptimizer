package com.example.myproj4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column
    private String username;
    @Column
    private String email;
    @Column
    private String userpassword;
    @Column
    private String role;

    public User(Long id, String username, String email, String userpassword, String role) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.userpassword = userpassword;
        this.role = role;
    }

    public User() {
    }

    public Long getId() {
        return id;
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

    public String getRole() {
        return role;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", userpassword='" + userpassword + '\'' +
                ", role='" + role + '\'' +
                '}';
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setUserpassword(String password) {
        this.userpassword = password;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
