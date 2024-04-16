package com.api.backendCCEP.Repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

	// Consulta personalizada para obtener la lista de products
	// ordenadas asendente por el id
	@Query(value = "SELECT * FROM products p ORDER BY p.id ASC", nativeQuery = true)
	Page<Product> findAllProductsWithPagination(Pageable pageable);

	// Filtrar el producto por referencia o por nombre
	@Query(value = "SELECT * FROM products WHERE LOWER(reference) LIKE LOWER(CONCAT('%', :value, '%')) OR LOWER(name) LIKE LOWER(CONCAT('%', :value, '%'));", nativeQuery = true)
	List<Product> searchProductByKeywordOrReference(@Param("value") String value);

}
