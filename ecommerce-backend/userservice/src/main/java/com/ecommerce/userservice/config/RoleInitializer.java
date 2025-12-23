package com.ecommerce.userservice.config;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.ecommerce.userservice.model.Role;
import com.ecommerce.userservice.model.User;
import com.ecommerce.userservice.repository.RoleRepository;
import com.ecommerce.userservice.repository.UserRepository;

import jakarta.annotation.PostConstruct;

//@Component
public class RoleInitializer {

    private final RoleRepository roleRepo;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public RoleInitializer(RoleRepository roleRepo,
                           UserRepository userRepo,
                           PasswordEncoder passwordEncoder) {
        this.roleRepo = roleRepo;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @PostConstruct
    public void init() {

        // --- 1. Rewrite roles table ---
        roleRepo.deleteAll();

        List<Role> roles = List.of(
                new Role(202129L, "ROLE_SUPERADMIN"),
                new Role(412801L, "ROLE_ADMIN"),
                new Role(412802L, "ROLE_CUSTOMER"),
                new Role(412803L, "ROLE_VENDOR"),
                new Role(412804L, "ROLE_STORE_MANAGER"),
                new Role(412805L, "ROLE_PRODUCT_MANAGER"),
                new Role(412806L, "ROLE_ORDER_MANAGER"),
                new Role(412807L, "ROLE_INVENTORY_MANAGER"),
                new Role(412808L, "ROLE_CUSTOMER_SUPPORT"),
                new Role(412809L, "ROLE_MARKETING_MANAGER"),
                new Role(412810L, "ROLE_FINANCE"),
                new Role(412811L, "ROLE_DEVELOPER"),
                new Role(412812L, "ROLE_GUEST")
        );

        roleRepo.saveAll(roles);
        roleRepo.flush();
        

        // --- 2. Create SUPERADMIN user if missing ---
        createDumpUser("chiru_superadmin", "chiru_superadmin@yopmail.com",202129L,"superadmin123");
        createDumpUser("chiru_admin", "chiru_admin@yopmail.com",412801L,"admin123");
        createDumpUser("chiru_customer", "chiru_customer@yopmail.com",412802L,"customer123");
    }

	private void createDumpUser(String baseUsername,String email,Long roleId,String password) {
		

        if (!userRepo.existsByUsername(baseUsername) && !userRepo.existsByEmail(email)) {

            User u = new User();
            u.setUsername(baseUsername);
            u.setPassword(passwordEncoder.encode(password)); // change if needed
            u.setEmail(email);

            Role superadminRole = roleRepo.findById(roleId)
                                          .orElseThrow(() -> new RuntimeException(("role with roleId %s missing").formatted(roleId)));

            u.getRoles().add(superadminRole);

            userRepo.save(u);

            System.out.println("SUPERADMIN created: " + baseUsername);
        }
	}
}

