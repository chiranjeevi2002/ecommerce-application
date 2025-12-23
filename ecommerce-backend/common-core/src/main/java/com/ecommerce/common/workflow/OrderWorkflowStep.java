package com.ecommerce.common.workflow;


public enum OrderWorkflowStep {
    CREATE_ORDER,
    RESERVE_INVENTORY,
    INITIATE_PAYMENT;
    @Override
    public String toString() {
        return name();
    }
}

