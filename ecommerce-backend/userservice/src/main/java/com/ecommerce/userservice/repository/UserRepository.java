package com.ecommerce.userservice.repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ecommerce.userservice.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByIdAndStoreId(Long id, Long storeId);
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    
    
    List<User> findAllByStoreId(Long storeId);
    Page<User> findAllByStoreId(Long storeId, Pageable pageable);

    // custom search (username or email) - example using @Query or method name
    @Query("select u from User u where lower(u.username) like lower(concat('%',:q,'%')) or lower(u.email) like lower(concat('%',:q,'%'))")
    List<User> searchByUsernameOrEmail(@Param("q") String q);

    @Query("select u from User u where lower(u.username) like lower(concat('%',:q,'%')) or lower(u.email) like lower(concat('%',:q,'%'))")
    Page<User> searchByUsernameOrEmail(@Param("q") String q, Pageable pageable);

}
