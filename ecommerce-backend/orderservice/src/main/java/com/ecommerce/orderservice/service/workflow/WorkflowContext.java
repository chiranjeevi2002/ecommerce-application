package com.ecommerce.orderservice.service.workflow;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.ecommerce.orderservice.model.Order;

public final class WorkflowContext {

    private final Order order;
    private final Long userId;
    private final Long storeId;
    private final String traceId;
    private final List<String> completedSteps;

    private WorkflowContext(
            Order order,
            Long userId,
            Long storeId,
            String traceId,
            List<String> completedSteps
    ) {
        this.order = order;
        this.userId = userId;
        this.storeId = storeId;
        this.traceId = traceId;
        this.completedSteps = completedSteps;
    }

    public static WorkflowContext start(Long userId, Long storeId, String traceId) {
        return new WorkflowContext(
                null,
                userId,
                storeId,
                traceId != null ? traceId : UUID.randomUUID().toString(),
                new ArrayList<>()
        );
    }

    public WorkflowContext withOrder(Order order) {
        return new WorkflowContext(
                order,
                userId,
                storeId,
                traceId,
                completedSteps
        );
    }

    public WorkflowContext markCompleted(String step) {
        completedSteps.add(step);
        return this;
    }

    public Order order() {
        return order;
    }

    public Long userId() {
        return userId;
    }

    public Long storeId() {
        return storeId;
    }

    public String traceId() {
        return traceId;
    }

    public List<String> completedSteps() {
        return List.copyOf(completedSteps);
    }
}
