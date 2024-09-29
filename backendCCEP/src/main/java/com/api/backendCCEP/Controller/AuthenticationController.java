package com.api.backendCCEP.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.api.backendCCEP.Dto.LoginDto;
import com.api.backendCCEP.FacadeImp.UserSecurityService;
import com.api.backendCCEP.Util.ApiResponse;
import com.api.backendCCEP.Util.JwtUtil;

@RestController
@RequestMapping({ "/auth" })
public class AuthenticationController {

	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;
	private final UserSecurityService securityService;

	public AuthenticationController(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserSecurityService securityService) {
		this.authenticationManager = authenticationManager;
		this.jwtUtil = jwtUtil;
		this.securityService = securityService;
	}

	// Inicio de Sesión
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<String>> login(@RequestBody LoginDto loginDto) {
		ApiResponse<String> response = new ApiResponse<>();

		try {
			UsernamePasswordAuthenticationToken login = new UsernamePasswordAuthenticationToken(loginDto.getEmail(),
					loginDto.getPassword());
			this.authenticationManager.authenticate(login);

			String jwt = jwtUtil.createJwt(loginDto.getEmail());

			response.setSuccess(true);
			response.setMessage("Inicio de Sesion Exitoso");
			response.setData(null);
			response.setCode(200);

			return ResponseEntity.ok().header("Authorization", jwt).body(response);

		} catch (Exception e) {
			response.setSuccess(false);
			response.setMessage("Inicio de Sesion Fallido");
			response.setData(null);
			response.setCode(500);

			return ResponseEntity.internalServerError().body(response);
		}
	}

	// Inicio de Sesión
	@PostMapping("/token-user")
	public ApiResponse<String> verifyTokenUser(@RequestBody String jwt) {

		ApiResponse<String> response = new ApiResponse<>();

		try {

			boolean isValid = this.jwtUtil.isValid(jwt);
			
			String username = this.jwtUtil.getUsername(jwt);
			System.out.println("Usuario: " + username);
			boolean isUserValid = this.securityService.isUserValid(username);
			
			if (isValid && isUserValid) {
				response.setSuccess(true);
				response.setMessage("Verificacion Exitosa");
				response.setData(null);
				response.setCode(200);
			}
			return response;

		} catch (Exception e) {
			response.setSuccess(false);
			response.setMessage("Verificacion Fallida");
			response.setData(null);
			response.setCode(500);

			return response;
		}
	}

}
