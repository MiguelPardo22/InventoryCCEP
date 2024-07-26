package com.api.backendCCEP.FacadeImp;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.api.backendCCEP.Model.Rol;
import com.api.backendCCEP.Model.User;
import com.api.backendCCEP.Repository.UserRepository;

@Service
public class UserSecurityService implements UserDetailsService {

	private final UserRepository userRepository;

	@Autowired
	public UserSecurityService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	// Método para mapear roles a autoridades de seguridad
    private Collection<? extends GrantedAuthority> mapAuthoritiesRoles(Collection<Rol> roles) {
        List<GrantedAuthority> authorities = roles.stream()
                                                  .map(this::mapRoleToAuthority)
                                                  .collect(Collectors.toList());

        return authorities;
    }

    // Método auxiliar para mapear un solo rol a una autoridad de seguridad
    private GrantedAuthority mapRoleToAuthority(Rol role) {
        return new SimpleGrantedAuthority(role.getName_role());
    }

	
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username);

        if (user == null) {
            throw new UsernameNotFoundException("Usuario o Contraseña Invalidos");
        } else if ("Inactivo".equals(user.getState())) {
            throw new UsernameNotFoundException("El usuario no tiene permisos");
        }

        return org.springframework.security.core.userdetails.User.withUsername(user.getEmail())
                .password(user.getPassword_encrypted())
                .authorities(mapAuthoritiesRoles(user.getRoles()))
                .build();
	}

}
