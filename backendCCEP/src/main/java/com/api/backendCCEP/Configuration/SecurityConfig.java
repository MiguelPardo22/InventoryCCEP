package com.api.backendCCEP.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
	
	//Configuracion de Spring Security
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
		
		http
		.csrf(csrf -> csrf.disable())
		.cors(Customizer.withDefaults())
	    .authorizeHttpRequests((authorize) -> authorize
	    	.requestMatchers("/admin/productnotpaginated").hasAnyAuthority("Administrador", "Vendedor")
	    	.requestMatchers("/admin/products/search").hasAnyAuthority("Administrador", "Vendedor")
	    	.requestMatchers("/vendor/**").hasAnyAuthority("Administrador", "Vendedor")
	    	.requestMatchers("/admin/**").hasAuthority("Administrador")
	        .anyRequest()
	        .authenticated()
	    )
        .httpBasic(Customizer.withDefaults());
    
		
		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
}
