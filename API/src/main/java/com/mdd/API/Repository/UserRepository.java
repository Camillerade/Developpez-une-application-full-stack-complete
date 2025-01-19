package com.mdd.API.Repository;

import com.mdd.API.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
    Optional<User> findById(Long id); // Utiliser Optional<User>
}
