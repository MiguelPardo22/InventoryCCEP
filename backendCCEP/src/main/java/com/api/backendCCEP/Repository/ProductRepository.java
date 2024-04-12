package com.api.backendCCEP.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{

    // Consulta personalizada para obtener la lista de proveedores
	// ordenadas asendente por el id
	@Query(value = "SELECT * FROM products p ORDER BY p.id ASC", nativeQuery = true)
	Page<Product> findAllProductsWithPagination(Pageable pageable);

}
