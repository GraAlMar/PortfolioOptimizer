package com.example.myproj4.runners;

import com.example.myproj4.models.*;
import com.example.myproj4.repositories.*;
import com.example.myproj4.payload.request.SignupRequest;
import com.example.myproj4.services.AlphaVantageApiService;
import com.example.myproj4.services.AssetService;
import com.example.myproj4.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

import static com.example.myproj4.models.RoleType.ROLE_ADMIN;

@Component
public class InitialRunner implements CommandLineRunner {
    private final UserService userService;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AlphaVantageApiService alphaVantageApiService;
    private final AssetService assetService;
    private final AssetRepository assetRepository;
    private final InvestmentRepository investmentRepository;
    private final PortfolioRepository portfolioRepository;



    public InitialRunner(UserService userService, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, AlphaVantageApiService alphaVantageApiService, AssetService assetService, AssetRepository assetRepository, InvestmentRepository investmentRepository, PortfolioRepository portfolioRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.alphaVantageApiService = alphaVantageApiService;
        this.assetService = assetService;
        this.assetRepository = assetRepository;
        this.investmentRepository = investmentRepository;
        this.portfolioRepository = portfolioRepository;
    }
    @Override
    public void run(String... args) throws Exception {

        //USERS
        Role roleUser = new Role();
        roleUser.setName(RoleType.ROLE_USER);
        roleRepository.save(roleUser);
        Role roleAdmin = new Role();
        roleAdmin.setName(ROLE_ADMIN);
        roleRepository.save(roleAdmin);

        User user01 = new User();
        user01.setUsername("adam");
        user01.setEmail("adam@email.com");
        user01.setUserpasswordHash(passwordEncoder.encode("eva"));
        userService.save(user01);

        User user02 = new User();
        user02.setUsername("eva");
        user02.setEmail("eva@email.com");
        user02.setUserpasswordHash(passwordEncoder.encode("adam"));
        user02.addRole(roleRepository.findByName(ROLE_ADMIN));
        //System.out.println("user02_eva = " + user02);
        userRepository.save(user02);

        SignupRequest signupRequestForUser03 = new SignupRequest("romeo","romeo@email.com","julia");
        userService.register(signupRequestForUser03);

        User user04 = new User();
        user04.setUsername("julia");
        user04.setEmail("julia@email.com");
        user04.setUserpasswordHash(passwordEncoder.encode("romeo"));
        userService.save(user04);

        SignupRequest signupRequestForUser05 = new SignupRequest("bonnie","bonnie@email.com","clyde");
        userService.register(signupRequestForUser05);

        SignupRequest signupRequestForUser06 = new SignupRequest("clyde","clyde@email.com","bonnie");
        userService.register(signupRequestForUser06);


        //ASSETS
        var ibm = alphaVantageApiService.getFinancialData("IBM");
        assetService.save(ibm);
        var tesla = alphaVantageApiService.getFinancialData("TSLA");
        assetService.save(tesla);
        var disney = alphaVantageApiService.getFinancialData("DIS");
        assetService.save(disney);
        //System.out.println("ibm = " + ibm);
        //System.out.println("tesla = " + tesla);
        //System.out.println("disney = " + disney);
        var amBatteryTechComp = alphaVantageApiService.getFinancialData("ABAT");
        assetService.save(amBatteryTechComp);
        //System.out.println("amBatteryTechComp = " + amBatteryTechComp);
        var cencora = alphaVantageApiService.getFinancialData("COR");
        assetService.save(cencora);
        //System.out.println("cencora = " + cencora);
        var fiserv = alphaVantageApiService.getFinancialData("FI");
        assetService.save(fiserv);
        //System.out.println("fiserv = " + fiserv);
        var nokia = alphaVantageApiService.getFinancialData("NOK");
        assetService.save(nokia);
        //System.out.println("nokia = " + nokia);
        var pfizer = alphaVantageApiService.getFinancialData("PFE");
        assetService.save(pfizer);
        //System.out.println("pfizer = " + pfizer);
        var nyTimes = alphaVantageApiService.getFinancialData("NYT");
        assetService.save(nyTimes);
        //System.out.println("nyTimes = " + nyTimes);

        //PORTFOLIOS
        BigDecimal amountOne = new BigDecimal(10000);
        BigDecimal amountTwo = new BigDecimal(15000);
        BigDecimal amountThree = new BigDecimal(20000);
        BigDecimal amountFour = new BigDecimal(25000);
        BigDecimal amountFive = new BigDecimal(50000);

        Investment investment01 = new Investment(assetRepository.findByAbbreviationContainsIgnoreCase("NOK"), amountOne);
        Investment investment02 = new Investment(assetRepository.findByAbbreviationContainsIgnoreCase("nyt"), amountTwo);
        Investment investment03 = new Investment(assetRepository.findByAbbreviationContainsIgnoreCase("cor"), amountThree);
        Investment investment04 = new Investment(assetRepository.findByAbbreviationContainsIgnoreCase("pfe"), amountFour);
        Investment investment05 = new Investment(assetRepository.findByAbbreviationContainsIgnoreCase("nok"), amountFive);
        Investment investment06 = new Investment(assetRepository.findByAbbreviationContainsIgnoreCase("ibm"), amountThree);

        Portfolio portfolio0ne = new Portfolio(user01, new HashSet<>(Set.of(investment01, investment02)));
        portfolioRepository.save(portfolio0ne);

        portfolio0ne.addInvestment(investment01);
        portfolio0ne.addInvestment(investment02);

        portfolioRepository.save(portfolio0ne);

        Portfolio portfolioTwo = new Portfolio(user02, new HashSet<>(Set.of(investment03, investment04)));
        portfolioRepository.save(portfolioTwo);

        portfolioTwo.addInvestment(investment03);
        portfolioTwo.addInvestment(investment04);

        portfolioRepository.save(portfolioTwo);

        Portfolio portfolioThree = new Portfolio(user04, new HashSet<>(Set.of(investment05, investment06)));
        portfolioRepository.save(portfolioThree);

        portfolioThree.addInvestment(investment05);
        portfolioThree.addInvestment(investment06);

        portfolioRepository.save(portfolioThree);

    }
}
