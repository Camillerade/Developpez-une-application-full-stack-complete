package com.mdd.API.Service;

import com.mdd.API.DTO.AuthSuccess;
import com.mdd.API.DTO.LoginRequest;
import com.mdd.API.DTO.RegisterRequest;
import com.mdd.API.DTO.UserDTO;
import com.mdd.API.model.User;
import com.mdd.API.Repository.UserRepository;
import com.mdd.API.Configuration.JwtProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String authenticate(LoginRequest loginRequest) {
        try {
            User user = userRepository.findByEmail(loginRequest.getEmail());
            if (user == null) {
                throw new BadCredentialsException("User not found");
            }

            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                throw new BadCredentialsException("Incorrect password");
            }

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtProvider.generateJwtToken(userDetails.getUsername());

            return token;

        } catch (BadCredentialsException e) {
            return null;
        }
    }
    public UserDTO updateUser(UserDTO userDTO) throws UsernameNotFoundException {
        User user = userRepository.findById(userDTO.getId())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Mettre à jour les champs nécessaires
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setAdmin(userDTO.isAdmin());
        user.setCreatedAt(userDTO.getCreatedAt()); // Mettre à jour ce champ avec la date fournie
        user.setUpdatedAt(LocalDateTime.now()); // Mettre à jour avec la date et l'heure actuelles

        userRepository.save(user);

        return new UserDTO(user);
    }



    public UserDTO getCurrentUser(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getCreatedAt(), user.getUpdatedAt());
    }

    public AuthSuccess register(RegisterRequest registerRequest) {
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setAdmin(false);

        userRepository.save(user);

        return new AuthSuccess("User registered successfully");
    }
}
