package com.ecommerce.common.web.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface GenericService<T, ID> {

    T getById(ID id);

    Page<T> getAll(Pageable pageable);

    T create(T entity);

    T update(ID id, T entity);

    void delete(ID id);
}
