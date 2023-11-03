package com.example.myproj4.security.controllers;

import com.example.myproj4.repositories.UserRepository;
import com.example.myproj4.security.jwt.JwtUtils;
import com.example.myproj4.security.payload.request.LoginRequest;
import com.example.myproj4.security.payload.request.SignupRequest;
import com.example.myproj4.security.payload.response.MessageResponse;
import com.example.myproj4.security.payload.response.UserInfoResponse;
import com.example.myproj4.security.services.UserDetailsImpl;
import com.example.myproj4.services.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/auth")

public class AuthController {
    private UserRepository userRepository;
    private UserService userService;
    private  AuthenticationManager authenticationManager;
    private JwtUtils jwtUtils;

    public AuthController(UserRepository userRepository, UserService userService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByUsername(signupRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username already taken"));
        }
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email already in use"));
        }
        userService.register(signupRequest);
        return ResponseEntity.ok().body(new MessageResponse("Registration successful"));
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getUserpassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body((new UserInfoResponse(userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles)));
    }
    @PostMapping("/signout")
    public ResponseEntity<?> logoutUser() {
        ResponseCookie cookie = jwtUtils.getCleanJwtCookie();
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body((new MessageResponse("You are signed out!")));
    }

}
