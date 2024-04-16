package com.api.backendCCEP.Facade;

import java.util.List;

import com.api.backendCCEP.Model.Sale;
import com.api.backendCCEP.Model.Sale_Detail;

public interface ISale {

    public List<Sale> listSales();
    public void save(Sale sale);
    public void saveDetails(Sale_Detail sale_Detail);

}
