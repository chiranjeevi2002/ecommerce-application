package com.ecommerce.productservice.service.impl;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.productservice.service.FileStorageService;

@Service
public class FileStorageServiceImpl implements FileStorageService {

    private static final Logger log =
            LoggerFactory.getLogger(FileStorageServiceImpl.class);

    private final Path rootLocation = Paths.get("uploads");

    @Override
    public List<String> uploadFiles(List<MultipartFile> files, Long storeId) {

        Path storeDir = rootLocation.resolve("store-" + storeId);
        createDirectories(storeDir);

        return files.stream()
                .map(file -> storeSingleFile(file, storeId, storeDir))
                .toList();
    }

    @Override
    public Resource loadAsResource(Long storeId, String filename) {

        try {
            Path file =
                    rootLocation.resolve("store-" + storeId).resolve(filename);

            if (!Files.exists(file) || !Files.isReadable(file)) {
                throw new RuntimeException("File not found: " + filename);
            }

            return new UrlResource(file.toUri());

        } catch (MalformedURLException e) {
            throw new RuntimeException("Invalid file path", e);
        }
    }

    @Override
    public void deleteFile(String fileUrl) {

        if (fileUrl == null || fileUrl.isBlank()) return;

        try {
            String cleaned = fileUrl.replaceFirst("^/uploads/", "");
            Path file = rootLocation.resolve(cleaned);

            Files.deleteIfExists(file);
            log.info("Deleted file {}", file.toAbsolutePath());

        } catch (Exception e) {
            log.warn("Failed to delete file {}", fileUrl, e);
        }
    }


    private String storeSingleFile(
            MultipartFile file,
            Long storeId,
            Path storeDir) {

        String ext = getExtension(file.getOriginalFilename());
        String filename = UUID.randomUUID() + (ext.isEmpty() ? "" : "." + ext);
        Path target = storeDir.resolve(filename);

        try {
            Files.copy(
                    file.getInputStream(),
                    target,
                    StandardCopyOption.REPLACE_EXISTING
            );
            log.info("Stored file {}", target.toAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }

        return "/uploads/store-" + storeId + "/" + filename;
    }

    private void createDirectories(Path dir) {
        try {
            if (Files.notExists(dir)) {
                Files.createDirectories(dir);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create upload directory", e);
        }
    }

    private String getExtension(String filename) {
        if (filename == null) return "";
        int i = filename.lastIndexOf('.');
        return i < 0 ? "" : filename.substring(i + 1);
    }
}
