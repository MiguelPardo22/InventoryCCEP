package com.api.backendCCEP.Facade;

import java.util.List;

import com.api.backendCCEP.Model.Category;


public interface ICategory {

    public List<Category> categoryList();
    public Category findById(Long id);
	public void save(Category category);
	public void delete(Category category);

}
