package com.api.backendCCEP.Facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.api.backendCCEP.Model.Supplier;

public interface ISupplier {

    public Page<Supplier> listSuppliers(Pageable pageable);
    public Supplier findById(long id);
    public void save(Supplier supplier);
    public void delete(Supplier supplier);

}
