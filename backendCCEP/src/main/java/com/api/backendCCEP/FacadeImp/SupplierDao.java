package com.api.backendCCEP.FacadeImp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.backendCCEP.Facade.ISuppliers;
import com.api.backendCCEP.Model.Supplier;
import com.api.backendCCEP.Repository.SupplierRepository;

@Service
public class SupplierDao implements ISuppliers{

    //Instacias
    private SupplierRepository supplierRepository;

    public SupplierDao(SupplierRepository supplierRepository) {
        this.supplierRepository = supplierRepository;
    }

    //Llamado a la consulta personalizada ubicada en el repository
    @Override
    public Page<Supplier> listSuppliers(Pageable pageable) {
        return supplierRepository.findAllSuppliersWithPagination(pageable);
    }

    //Llamado al metodo findById del repository
    @Override
    public Supplier findById(long id) {
        return supplierRepository.findById(id).orElse(null);
    }

    //Llamado al repository para el metodo save
    @Override
    public void save(Supplier supplier) {
        supplierRepository.save(supplier);
    }

    //Llamado al repository para el metodo delete
    @Override
    public void delete(Supplier supplier) {
        supplierRepository.delete(supplier);
    }

}
