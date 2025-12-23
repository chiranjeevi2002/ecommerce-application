package com.ecommerce.productservice.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    List<String> uploadFiles(List<MultipartFile> files, Long storeId);

    Resource loadAsResource(Long storeId, String filename);

    void deleteFile(String fileUrl);
}
