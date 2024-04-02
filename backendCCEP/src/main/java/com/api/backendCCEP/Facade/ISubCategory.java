package com.api.backendCCEP.Facade;

import java.util.List;

import com.api.backendCCEP.Model.SubCategory;

public interface ISubCategory {

    public List<SubCategory> listSubCategories();
    public SubCategory findById(long id);
    public void save(SubCategory subCategory);
    public void delete(SubCategory subCategory);

}
