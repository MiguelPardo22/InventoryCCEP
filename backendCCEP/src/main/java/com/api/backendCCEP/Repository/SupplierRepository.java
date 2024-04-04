package com.api.backendCCEP.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Supplier;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long>{

    // Consulta personalizada para obtener la lista de proveedores
	// ordenadas asendente por el id
	@Query(value = "SELECT * FROM suppliers s ORDER BY s.id ASC", nativeQuery = true)
	List<Supplier> suppliers();

}
