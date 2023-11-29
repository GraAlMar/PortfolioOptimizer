package com.example.myproj4.security.controllers;

import com.example.myproj4.security.jwt.AuthTokenFilter;
import com.example.myproj4.security.jwt.JwtUtils;
import com.example.myproj4.security.payload.response.UserInfoResponse;
import com.example.myproj4.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.stream.Collectors;

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
    public UserInfoResponse getSession(Authentication authentication, HttpServletRequest request) {
        String jwt = authTokenFilter.parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String username = jwtUtils.getUsernameFromJwtToken(jwt);
            System.out.println("username = " + username);
            var currentUser = userService.findByName(username);
            System.out.println("currentUser = " + currentUser);
            var roles = currentUser.getRoles().stream().map(role -> role.getName().toString()).collect(Collectors.toList());
            var response = new UserInfoResponse(currentUser.getId(), currentUser.getUsername(), currentUser.getEmail(), roles);
            System.out.println("response = " + response);
            System.out.println("authentication.isAuth = " + authentication.isAuthenticated());
            System.out.println("authentication.getAuth = " + authentication.getAuthorities());
            return response;
        }
        return new UserInfoResponse(null,null, null, null);
    }
}
