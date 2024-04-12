package com.api.backendCCEP.Facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.api.backendCCEP.Model.Product;

public interface IProduct {

    public Page<Product> listProduct(Pageable pageable);
    public Product findById(long id);
    public void save(Product product);
    public void delete(Product product);


}
