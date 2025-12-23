package com.ecommerce.inventoryservice.controller;

import com.ecommerce.inventoryservice.dto.InventoryRollbackRequest;
import com.ecommerce.inventoryservice.dto.InventoryRollbackResponse;
import com.ecommerce.inventoryservice.service.InventoryRollbackService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@InternalApi
@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryRollbackController {

	private final InventoryRollbackService rollbackService;

	public InventoryRollbackController(InventoryRollbackService rollbackService) {
		this.rollbackService = rollbackService;
	}

	/**
	 * Rollback inventory for a failed or cancelled order.
	 *
	 * This endpoint is: - Internal (called by OrderService) - (safe for
	 * retries) - Saga-aware
	 */
	
	@PostMapping("/rollback")
	public ResponseEntity<InventoryRollbackResponse> rollback(@RequestBody @Valid InventoryRollbackRequest request) {
		InventoryRollbackResponse response = rollbackService.rollback(request);
		return ResponseEntity.ok(response);
	}
}
