package com.example.myproj4.services;

import com.example.myproj4.models.User;
import com.example.myproj4.repositories.AssetRepository;
import com.example.myproj4.repositories.RoleRepository;
import com.example.myproj4.repositories.UserRepository;
import com.example.myproj4.controllers.payload.SignupRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.myproj4.models.RoleType.ROLE_USER;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AssetRepository assetRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, AssetRepository assetRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.assetRepository = assetRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    public List<User> findAll() {return userRepository.findAll();}
    /*public Optional<User> findByName() {return userRepository.findByUsername();}
    public boolean existsByName() {return userRepository.existsByUsername();}
    public boolean existsByEmail() {return userRepository.existsByEmail();}*/
    public User save(User user) {
        user.addRole(roleRepository.findByName(ROLE_USER));
        //System.out.println("user from service= " + user);
        return userRepository.save(user);
    }
    public User register(SignupRequest signupData) {
        final User user = new User();
        user.setUsername(signupData.getUsername());
        user.setEmail(signupData.getEmail());
        user.setUserpasswordHash(passwordEncoder.encode(signupData.getUserpassword()));
        return this.save(user);
    }

    public User findByName(String username) {
        return userRepository.findByUsername(username).get();
    }

    public User addMain(Long userid, String assetSymbol) {
        var asset = assetRepository.findByAbbreviationContainsIgnoreCase(assetSymbol);
        //System.out.println("asset = " + asset);
        User userToChange = userRepository.findById(userid).get();
        userToChange.setMainAsset(asset);
        //System.out.println("userToChange = " + userToChange);

        return userRepository.save(userToChange);
    }

    public User addToShortList(Long userid, String assetSymbol) {
        var asset = assetRepository.findByAbbreviationContainsIgnoreCase(assetSymbol);
        User userToChange = userRepository.findById(userid).get();
        userToChange.addToShortList(asset);
        //System.out.println("userToChange = " + userToChange);
        return userRepository.save(userToChange);
    }

    public void delete(Long userid) {
        //var user = userRepository.findById(userid).get();
        //userRepository.delete(user);
        userRepository.deleteById(userid);
    }
}
