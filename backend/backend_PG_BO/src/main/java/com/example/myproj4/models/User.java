package com.example.myproj4.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

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
    private String userpasswordHash;
    @ManyToMany
   /* @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))*/
    private Set<Role> roles = new HashSet<>();

    public User(String username, String email, String userpasswordHash) {

        this.username = username;
        this.email = email;
        this.userpasswordHash = userpasswordHash;

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

    public String getUserpasswordHash() {
        return userpasswordHash;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", userpassword='" + userpasswordHash + '\'' +
                ", roles='" + roles + '\'' +
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



    public void addRole(Role role) {
        this.roles.add(role);
    }

    public void setUserpasswordHash(String hash) {
        this.userpasswordHash = hash;
    }
}
