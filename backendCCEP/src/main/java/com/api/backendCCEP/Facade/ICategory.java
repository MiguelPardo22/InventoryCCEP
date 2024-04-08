package com.api.backendCCEP.Facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.api.backendCCEP.Model.Category;


public interface ICategory {

    public Page<Category> categoryList(Pageable pageable);
    public Category findById(Long id);
	public void save(Category category);
	public void delete(Category category);

}
