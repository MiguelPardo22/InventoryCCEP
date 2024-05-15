package com.api.backendCCEP.FacadeImp;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.backendCCEP.Facade.ISale;
import com.api.backendCCEP.Model.Sale;
import com.api.backendCCEP.Model.Sale_Detail;
import com.api.backendCCEP.Repository.SaleRepository;
import com.api.backendCCEP.Repository.Sale_DetailRepository;

import jakarta.transaction.Transactional;

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
    public Page<Sale> listSales(Pageable pageable) {
        return saleRepository.listSalesWithPagination(pageable);
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

    // Listar los detalles basado en el id de la venta
	@Override
	public List<Sale_Detail> listSaleDetailsById(long saleId) {
		return detailRepository.listSalesDetailsById(saleId);
	}

	// Encontrar la venta por el id
	@Override
	public Sale findById(long id) {
		return saleRepository.findById(id).orElse(null);
	}

	@Override
	public void deleteSales(Sale sale) {
		saleRepository.delete(sale);		
	}

	@Override
	@Transactional
	public void deteteSalesDetails(long saleId) {
		detailRepository.deleteDetails(saleId);
	}

}
