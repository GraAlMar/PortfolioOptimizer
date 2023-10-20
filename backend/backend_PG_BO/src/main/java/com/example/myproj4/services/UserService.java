package com.example.myproj4.services;

import com.example.myproj4.models.User;
import com.example.myproj4.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<User> findAll() {return userRepository.findAll();}
    public User save(User user) {
        user.setRole("USER");
        System.out.println("user from service= " + user);
        return userRepository.save(user);}

}
