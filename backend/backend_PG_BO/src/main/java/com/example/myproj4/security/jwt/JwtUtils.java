package com.example.myproj4.security.jwt;

import com.example.myproj4.security.services.UserDetailsImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;
import org.springframework.web.util.WebUtils;

import java.security.Key;
import java.util.Date;
import java.util.List;

@Component

public class JwtUtils {

    private String jwtSecret;

    private int jwtExpirationMs;

    private String jwtCookieName;

    public JwtUtils(@Value("${bo.app.jwtSecret}") String jwtSecret,
                    @Value("${bo.app.jwtExpirationMs}") int jwtExpirationMs,
                    @Value("${bo.app.jwtCookieName}") String jwtCookieName) {
        this.jwtSecret = jwtSecret;
        this.jwtExpirationMs = jwtExpirationMs;
        this.jwtCookieName = jwtCookieName;
    }

    public String getJwtFromCookies(HttpServletRequest request) {
        Cookie cookie = WebUtils.getCookie(request, jwtCookieName);
        if (cookie != null) {
            return cookie.getValue();
        } else
            return null;
    }
    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }
    public String generateTokenFromUsername(String username) {
        return Jwts.builder()
                .setSubject(username)
                .claim("scope", List.of("ADMIN","USER"))
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .signWith(key(), SignatureAlgorithm.HS256)
                .compact();
    }
    public ResponseCookie generateJwtCookie(UserDetailsImpl userPrincipal) {

        String jwt = generateTokenFromUsername(userPrincipal.getUsername());

        ResponseCookie cookie = ResponseCookie.from(jwtCookieName, jwt).path("/api").maxAge(24*60*60).httpOnly(true).build();
        return cookie;
    }
    public ResponseCookie getCleanJwtCookie() {
        ResponseCookie cookie = ResponseCookie.from(jwtCookieName, null).path("/api").build();
        return cookie;
    }
    public String getUsernameFromJwtToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateJwtToken(String authToken) {
        Jwts.parserBuilder().setSigningKey(key()).build().parse(authToken);
        return true;
    }

}
