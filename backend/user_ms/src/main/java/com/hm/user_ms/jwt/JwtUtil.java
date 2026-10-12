package  com.hm.user_ms.jwt;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final Long JWT_TOKEN_VALIDITY = 5 * 60 * 60L;

    private static final String SECRET =
            "b05319c5798e0af8a69e7b35b63e0a9acc50b0ece4e2e71bcb9eee7864679cbea706d2b3536cf9ac34a0fec4cd9d6ab211516b7122bc149937f88322c30ac947";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    public String generateToken(UserDetails userDetails) {

        Map<String, Object> claims = new HashMap<>();

        CustomUserDetails user = (CustomUserDetails) userDetails;

        claims.put("id", user.getId());
        claims.put("email", user.getUsername());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());

        return doGenerateToken(claims, user.getUsername());
    }

    public String doGenerateToken(Map<String, Object> claims, String subject) {

        return Jwts.builder()
                .claims(claims)
                .subject(subject)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(
                        System.currentTimeMillis()
                                + JWT_TOKEN_VALIDITY * 1000
                ))
                .signWith(key, Jwts.SIG.HS512)
                .compact();
    }
}