package com.api.backendCCEP.FacadeImp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.backendCCEP.Facade.ISale;
import com.api.backendCCEP.Model.Sale;
import com.api.backendCCEP.Model.Sale_Detail;
import com.api.backendCCEP.Repository.SaleRepository;
import com.api.backendCCEP.Repository.Sale_DetailRepository;

@Service
public class SaleDao implements ISale{

    //Instancias
    private SaleRepository saleRepository;
    private Sale_DetailRepository detailRepository;

    public SaleDao(SaleRepository saleRepository, Sale_DetailRepository detailRepository) {
        this.saleRepository = saleRepository;
        this.detailRepository = detailRepository;
    }
    
    @Override
    public List<Sale> listSales() {
        return saleRepository.listSales();
    }

    //Guardar el objeto sale
    @Override
    public void save(Sale sale) {
        saleRepository.save(sale);
    }

    //Guardar el objeto sale_Detail
    @Override
    public void saveDetails(Sale_Detail sale_Detail) {
        detailRepository.save(sale_Detail);
    }


}
