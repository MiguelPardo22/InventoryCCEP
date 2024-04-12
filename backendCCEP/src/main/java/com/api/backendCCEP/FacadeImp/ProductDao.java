package com.api.backendCCEP.FacadeImp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.backendCCEP.Facade.IProduct;
import com.api.backendCCEP.Model.Product;
import com.api.backendCCEP.Repository.ProductRepository;

@Service
public class ProductDao implements IProduct {

    // Instacias
    private ProductRepository productRepository;

    public ProductDao(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Page<Product> listProduct(Pageable pageable) {
        return productRepository.findAllProductsWithPagination(pageable);
    }

    @Override
    public Product findById(long id) {
        return productRepository.findById(id).orElse(null);
    }

    @Override
    public void save(Product product) {
        productRepository.save(product);
    }

    @Override
    public void delete(Product product) {
        productRepository.delete(product);
    }

}
