package com.ecommerce.common.webflux.service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ReactiveGenericService<T, ID> {

    Mono<T> getById(ID id);

    Flux<T> getAll(int page, int size);

    Mono<T> create(T entity);

    Mono<T> update(ID id, T entity);

    Mono<Void> delete(ID id);
}
