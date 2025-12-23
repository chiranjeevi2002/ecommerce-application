package com.ecommerce.productservice.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

//@Component
public class ImageCopyRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

        String baseDir = System.getProperty("user.dir") + "/productservice/";
        Path sourceBase = Path.of(baseDir + "image-source/");
        Path targetBase = Path.of(baseDir + "uploads/");

        System.out.println("Image Source Path: " + sourceBase);
        System.out.println("Image Upload Path: " + targetBase);

        if (!Files.exists(sourceBase)) {
            System.out.println("❌ Source folder does not exist: " + sourceBase);
            return;
        }

        // Create uploads/ if missing
        if (!Files.exists(targetBase)) {
            Files.createDirectories(targetBase);
        }

        File[] storeFolders = sourceBase.toFile().listFiles(File::isDirectory);
        if (storeFolders == null || storeFolders.length == 0) {
            System.out.println("❌ No store folders found under image-source/");
            return;
        }

        for (File storeFolder : storeFolders) {
            Path storeTarget = targetBase.resolve(storeFolder.getName());

            // Create uploads/store-xxx
            if (!Files.exists(storeTarget)) {
                Files.createDirectories(storeTarget);
            }

            // Copy all images
            File[] images = storeFolder.listFiles();
            if (images == null) continue;

            for (File img : images) {
                Path dest = storeTarget.resolve(img.getName());
                Files.copy(img.toPath(), dest, StandardCopyOption.REPLACE_EXISTING);
                System.out.println("✔ Copied: " + img.getName() + " → " + storeTarget);
            }
        }

        System.out.println("✅ Image copy complete.");
    }
}
