package com.example.myproj4.runners;

import com.example.myproj4.models.Role;
import com.example.myproj4.models.RoleType;
import com.example.myproj4.models.User;
import com.example.myproj4.repositories.RoleRepository;
import com.example.myproj4.repositories.UserRepository;
import com.example.myproj4.security.payload.request.SignupRequest;
import com.example.myproj4.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import static com.example.myproj4.models.RoleType.ROLE_ADMIN;

@Component
public class InitialUsersRunner implements CommandLineRunner {
    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    public InitialUsersRunner(UserService userService, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public void run(String... args) throws Exception {
        Role roleUser = new Role();
        roleUser.setName(RoleType.ROLE_USER);
        roleRepository.save(roleUser);
        Role roleAdmin = new Role();
        roleAdmin.setName(ROLE_ADMIN);
        roleRepository.save(roleAdmin);

        User user01 = new User();
        user01.setUsername("name_01");
        user01.setEmail("email_01@email.com");
        user01.setUserpasswordHash(passwordEncoder.encode("password_01"));
        userService.save(user01);

        SignupRequest signupRequestForUser02 = new SignupRequest("user_02","email_02@email.com","password_02");
        userService.register(signupRequestForUser02);

        User user03 = new User();
        user03.setUsername("name_03");
        user03.setEmail("email_03@email.com");
        user03.setUserpasswordHash(passwordEncoder.encode("password_03"));
        user03.addRole(roleRepository.findByName(ROLE_ADMIN));
        userRepository.save(user03);

    }
}
