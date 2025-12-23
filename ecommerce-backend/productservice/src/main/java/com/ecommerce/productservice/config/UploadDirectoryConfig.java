package com.ecommerce.productservice.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.File;

//@Component
public class UploadDirectoryConfig {

    @PostConstruct
    public void init() {

        String uploadPath = System.getProperty("user.dir") + "/uploads/";

        File uploadDir = new File(uploadPath);

        if (!uploadDir.exists()) {
            boolean created = uploadDir.mkdirs();
            if (created) {
                System.out.println("📁 Uploads folder created at: " + uploadPath);
            }
        }

        createStoreFolder(uploadPath, "store-211");
        createStoreFolder(uploadPath, "store-212");
        createStoreFolder(uploadPath, "store-213");
    }

    private void createStoreFolder(String base, String folderName) {
        File storeDir = new File(base + folderName);
        if (!storeDir.exists()) {
            storeDir.mkdirs();
        }
    }
}
