package com.api.backendCCEP.Facade;

import java.util.List;

import com.api.backendCCEP.Model.Supplier;

public interface ISuppliers {

    public List<Supplier> listSuppliers();
    public Supplier findById(long id);
    public void save(Supplier supplier);
    public void delete(Supplier supplier);

}
