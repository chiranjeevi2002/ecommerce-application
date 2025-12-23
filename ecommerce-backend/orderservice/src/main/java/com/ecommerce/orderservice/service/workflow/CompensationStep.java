package com.ecommerce.orderservice.service.workflow;

import reactor.core.publisher.Mono;


@FunctionalInterface
public interface CompensationStep {
    Mono<Void> compensate(WorkflowContext context);
}
