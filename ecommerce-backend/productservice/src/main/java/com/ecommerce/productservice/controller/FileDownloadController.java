package com.ecommerce.productservice.controller;

import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.ecommerce.common.security.annotations.PublicAccess;
import com.ecommerce.productservice.service.FileStorageService;

@RestController
@RequestMapping("/uploads")
public class FileDownloadController {

    private final FileStorageService storageService;

    public FileDownloadController(FileStorageService storageService) {
        this.storageService = storageService;
    }

    /**
     * Public image access
     * Example:
     *  /uploads/store-211/pink-lily-bouquet.jpg
     */
    @PublicAccess
    @GetMapping("/store-{storeId}/{filename:.+}")
    public ResponseEntity<Resource> serveFile(
            @PathVariable Long storeId,
            @PathVariable String filename) {

        Resource resource = storageService.loadAsResource(storeId, filename);
        return ResponseEntity.ok(resource);
    }
}
