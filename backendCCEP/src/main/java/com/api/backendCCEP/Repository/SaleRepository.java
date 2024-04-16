package com.api.backendCCEP.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Sale;

@Repository
public interface SaleRepository extends JpaRepository<Sale, Long>{

    @Query(value = "SELECT * FROM sales", nativeQuery = true)
    List<Sale> listSales();

}
