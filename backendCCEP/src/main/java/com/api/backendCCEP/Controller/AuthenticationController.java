package com.api.backendCCEP.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.backendCCEP.Dto.LoginDto;
import com.api.backendCCEP.Util.ApiResponse;
import com.api.backendCCEP.Util.JwtUtil;

@RestController
@RequestMapping({ "/auth" })
public class AuthenticationController {

	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;

	public AuthenticationController(AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
	}

	// Inicio de Sesion
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<String>> login(@RequestBody LoginDto loginDto) {

		ApiResponse<String> response = new ApiResponse<>();

		try {

			UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
					loginDto.getPassword());

			Authentication authentication = this.authenticationManager.authenticate(login);

			if (authentication.isAuthenticated()) {
				String jwt = jwtUtil.createJwt(loginDto.getEmail());

				response.setSuccess(true);
				response.setMessage("Inicio de Sesion Exitoso");
				response.setData(null);
				response.setCode(200);

				return ResponseEntity.ok().header("Authorization", jwt).body(response);
			} else {
				response.setSuccess(false);
				response.setMessage("Inicio de sesion Fallido");
				response.setData(null);
				response.setCode(401);
				
				return ResponseEntity.badRequest().body(response);
			}

		} catch (Exception e) {

			response.setSuccess(false);
			response.setMessage("Inicio de Sesion Fallido: " + e);
			response.setData(null);
			response.setCode(500);

			return ResponseEntity.internalServerError().body(response);

		}

	}

}
