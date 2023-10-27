package com.example.myproj4.models;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Enumerated(EnumType.STRING)
    @Column
    private RoleType name;

    public Role() {
    }

    public Role(Integer id, RoleType name) {
        this.id = id;
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public RoleType getName() {
        return name;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(RoleType name) {
        this.name = name;
    }

}
