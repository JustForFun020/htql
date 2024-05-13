package com.example.bookstoreserver.config;

import com.example.bookstoreserver.entity.NguoiDung;
import com.example.bookstoreserver.exceptions.DataNotFoundException;
import com.example.bookstoreserver.repository.NguoiDungRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final NguoiDungRepository userRepository;

    @Bean
    public UserDetailsService userDetailsService(){
        return email -> {
            Optional<NguoiDung> optionalUser = userRepository.findByEmail(email);
            if (optionalUser.isPresent()){
                return optionalUser.get();
            }else {
                try {
                    throw new DataNotFoundException("Không tìm thấy người dùng với email " + email);
                } catch (DataNotFoundException e) {
                    throw new RuntimeException(e);
                }
            }
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

