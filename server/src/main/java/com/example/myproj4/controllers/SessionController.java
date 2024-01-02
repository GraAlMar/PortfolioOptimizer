package com.example.myproj4.controllers;

import com.example.myproj4.models.User;
import com.example.myproj4.services.AuthTokenFilter;
import com.example.myproj4.services.JwtUtils;
import com.example.myproj4.services.UserService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class SessionController {
    private final String authCookieName;
    private final UserService userService;
    private final AuthTokenFilter authTokenFilter;
    private final JwtUtils jwtUtils;

    public SessionController(@Value("${bo.app.jwtCookieName}") String authCookieName, UserService userService, AuthTokenFilter authTokenFilter, JwtUtils jwtUtils) {
        this.authCookieName = authCookieName;
        this.userService = userService;
        this.authTokenFilter = authTokenFilter;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/session")
//    public UserInfoResponse getSession(Authentication authentication) {
    public User getSession(Authentication authentication) {

        if (authentication != null && authentication.isAuthenticated()) {
            String username = authentication.getName();
            //System.out.println("username = " + username);
            User currentUser = userService.findByName(username);
            System.out.println("currentUser from checkSession = " + currentUser);
            var response = currentUser;

            //var roles = currentUser.getRoles().stream().map(role -> role.getName().toString()).collect(Collectors.toList());
            //var response = new UserInfoResponse(currentUser.getId(), currentUser.getUsername(), currentUser.getEmail(), roles);
            //System.out.println("response = " + response);
            //System.out.println("authentication.isAuth = " + authentication.isAuthenticated());
            //System.out.println("authentication.getAuth = " + authentication.getAuthorities());
            return response;
        } else {
            throw new InsufficientAuthenticationException("Not authenticated");
        }

    }
}
