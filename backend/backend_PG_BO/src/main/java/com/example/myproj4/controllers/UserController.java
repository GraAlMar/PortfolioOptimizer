package com.example.myproj4.controllers;

import com.example.myproj4.models.User;
import com.example.myproj4.services.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    List<User> getAll() { return userService.findAll();}
    @PostMapping("/users")
    User add(@RequestBody User user) {
        System.out.println("user = " + user);
        return userService.save(user);
    }
}
