package com.api.backendCCEP.FacadeImp;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.backendCCEP.Facade.ISubCategory;
import com.api.backendCCEP.Model.SubCategory;
import com.api.backendCCEP.Repository.SubCategoryRepository;

@Service
public class SubCategoryDao implements ISubCategory {

	// Instancias
	private SubCategoryRepository subCategoryRepository;

	public SubCategoryDao(SubCategoryRepository subCategoryRepository) {
		this.subCategoryRepository = subCategoryRepository;
	}

	// Usar la instancia del repositorio y obtener el metodo subCategories
	@Override
	public List<SubCategory> listSubCategories() {
		return subCategoryRepository.subCategories();
	}

	// Llamar el metodo findById del repository
	@Override
	public SubCategory findById(long id) {
		return subCategoryRepository.findById(id).orElse(null);
	}

	//Obtener el metodo save para guardar las subcategorias
	@Override
	public void save(SubCategory subCategory) {
		subCategoryRepository.save(subCategory);
	}

	//Obtener la subcategoria por el id y eliminar la categoria encontrada
	@Override
	public void delete(SubCategory subCategory) {
		SubCategory subcat = subCategoryRepository.findById(subCategory.getId()).orElse(null);
		subCategoryRepository.delete(subcat);
	}

}
