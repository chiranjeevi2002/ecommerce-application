package com.ecommerce.orderservice.service.workflow;

import java.util.ArrayList;
import java.util.List;

import reactor.core.publisher.Mono;

public class WorkflowExecutor {

    private final List<WorkflowDefinition> steps = new ArrayList<>();

    public WorkflowExecutor addStep(WorkflowDefinition definition) {
        steps.add(definition);
        return this;
    }

    public Mono<WorkflowContext> execute(WorkflowContext context) {

        List<WorkflowDefinition> completedSteps = new ArrayList<>();
        Mono<WorkflowContext> flow = Mono.just(context);

        for (WorkflowDefinition step : steps) {
            flow = flow.flatMap(ctx -> {

                WorkflowLogger.stepStarted(step.step(), ctx);

                return step.action()
                        .execute(ctx)
                        .doOnSuccess(updated -> {
                            completedSteps.add(step);
                            WorkflowLogger.stepCompleted(step.step(), updated);
                        })
                        .doOnError(error ->
                                WorkflowLogger.stepFailed(step.step(), ctx, error)
                        );
            });
        }

        return flow.onErrorResume(error ->
                rollback(completedSteps, context)
                        .then(Mono.error(error))
        );
    }

    private Mono<Void> rollback(
            List<WorkflowDefinition> completedSteps,
            WorkflowContext context
    ) {

        Mono<Void> rollbackFlow = Mono.empty();

        for (int i = completedSteps.size() - 1; i >= 0; i--) {
            WorkflowDefinition step = completedSteps.get(i);

            rollbackFlow = rollbackFlow.then(
                    step.compensation()
                            .compensate(context)
                            .doOnSuccess(v ->
                                    WorkflowLogger.stepCompensated(step.step(), context)
                            )
            );
        }

        return rollbackFlow;
    }
}
