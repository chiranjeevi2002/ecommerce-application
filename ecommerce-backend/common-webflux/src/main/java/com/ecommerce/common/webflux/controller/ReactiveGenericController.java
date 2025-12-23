package com.ecommerce.common.webflux.controller;

import com.ecommerce.common.webflux.service.ReactiveGenericService;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import org.springframework.web.bind.annotation.*;

public abstract class ReactiveGenericController<T, ID> {

    protected abstract ReactiveGenericService<T, ID> service();

    @GetMapping("/{id}")
    public Mono<T> getById(@PathVariable ID id) {
        return service().getById(id);
    }

    @GetMapping
    public Flux<T> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return service().getAll(page, size);
    }

    @PostMapping
    public Mono<T> create(@RequestBody T entity) {
        return service().create(entity);
    }

    @PutMapping("/{id}")
    public Mono<T> update(@PathVariable ID id, @RequestBody T entity) {
        return service().update(id, entity);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> delete(@PathVariable ID id) {
        return service().delete(id);
    }
}
