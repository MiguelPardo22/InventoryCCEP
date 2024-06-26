package com.api.backendCCEP.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Inventory;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long>{

	@Query(value = "SELECT inven.id, sum(inven.stock) AS stock, inven.purchasedetail_id, inven.saledetail_id, inven.product_id from inventories inven GROUP BY product_id ORDER BY stock DESC", nativeQuery = true)
	Page<Inventory> stock(Pageable pageable);
	
}
