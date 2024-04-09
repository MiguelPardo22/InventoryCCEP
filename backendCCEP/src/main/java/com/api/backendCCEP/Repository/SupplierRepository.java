package com.api.backendCCEP.Repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long>{

    // Consulta personalizada para obtener la lista de proveedores
	// ordenadas asendente por el id
	@Query(value = "SELECT * FROM suppliers s ORDER BY s.id ASC", nativeQuery = true)
	Page<Supplier> findAllSuppliersWithPagination(Pageable pageable);

}
