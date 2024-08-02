package com.api.backendCCEP.Util;

import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Component
public class JwtUtil {

	private final Algorithm ALGORITHM;
	
	public JwtUtil(@Value("${jwt.secret.key}") String secretKey) {
		this.ALGORITHM = Algorithm.HMAC256(secretKey);
	}
	
	public String createJwt(String username) {
		return JWT.create()
				.withSubject(username)
				.withIssuer("mpccepInventoryñ")
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + TimeUnit.HOURS.toHours(6)))
				.sign(ALGORITHM);
	}
	
}
