package com.ecommerce.common.web.controller;

import com.ecommerce.common.web.service.GenericService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

public abstract class GenericController<T, ID> {

    protected abstract GenericService<T, ID> service();

    @GetMapping("/{id}")
    public T getById(@PathVariable ID id) {
        return service().getById(id);
    }

    @GetMapping
    public Page<T> getAll(Pageable pageable) {
        return service().getAll(pageable);
    }

    @PostMapping
    public T create(@RequestBody T entity) {
        return service().create(entity);
    }

    @PutMapping("/{id}")
    public T update(@PathVariable ID id, @RequestBody T entity) {
        return service().update(id, entity);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable ID id) {
        service().delete(id);
    }
}
