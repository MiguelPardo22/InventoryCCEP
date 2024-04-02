package com.api.backendCCEP.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.api.backendCCEP.Model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    // Consulta personalizada para obtener SubCategories con el nombre de la
	// categoría
	@Query(value = "SELECT * FROM categories c ORDER BY c.id ASC", nativeQuery = true)
	List<Category> categories();

}
