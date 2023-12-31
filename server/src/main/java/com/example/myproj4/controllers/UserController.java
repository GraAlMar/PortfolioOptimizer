package com.example.myproj4.controllers;

import com.example.myproj4.models.Asset;
import com.example.myproj4.models.User;
import com.example.myproj4.services.UserService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admin/users")
    List<User> getAll(Authentication authentication) {
        System.out.println("authentication.roles = " + authentication.getAuthorities());
        return userService.findAll();
    }

    @PostMapping("/users")
    User add(@RequestBody User user) {
        System.out.println("user = " + user);
        return userService.save(user);
    }

    @DeleteMapping("/users/{userid}")
    void delete(@PathVariable Long userid) {
        userService.delete(userid);
    }

    @PostMapping("/users/{userid}/main")
    User addMain(@RequestBody Asset asset, @PathVariable Long userid) {
        System.out.println("userid = " + userid);
        String assetSymbol = asset.getAbbreviation();
        System.out.println("assetSymbol = " + assetSymbol);
        return userService.addMain(userid, assetSymbol);
    }

    @PostMapping("/users/{userid}/shortlist")
    User addToShortList(@RequestBody Asset asset, @PathVariable Long userid) {
        String assetSymbol = asset.getAbbreviation();
        System.out.println("assetSymbol = " + assetSymbol);
        return userService.addToShortList(userid, assetSymbol);
    }

}
