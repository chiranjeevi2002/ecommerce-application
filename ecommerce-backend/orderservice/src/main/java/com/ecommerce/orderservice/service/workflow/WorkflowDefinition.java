package com.ecommerce.orderservice.service.workflow;

import com.ecommerce.common.workflow.OrderWorkflowStep;

public record WorkflowDefinition(
        OrderWorkflowStep step,
        WorkflowStep action,
        CompensationStep compensation
) {}
