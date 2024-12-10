package com.api.backendCCEP.FacadeImp;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Iterator;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.api.backendCCEP.Facade.IFilesUpload;
import com.api.backendCCEP.Model.Category;
import com.api.backendCCEP.Model.Product;
import com.api.backendCCEP.Model.SubCategory;
import com.api.backendCCEP.Model.Supplier;
import com.api.backendCCEP.Repository.CategoryRepository;
import com.api.backendCCEP.Repository.ProductRepository;
import com.api.backendCCEP.Repository.SubCategoryRepository;
import com.api.backendCCEP.Repository.SupplierRepository;

@Service
public class FilesUploadService implements IFilesUpload {

	private CategoryRepository categoryRepository;
	private SubCategoryRepository subCategoryRepository;
	private SupplierRepository supplierRepository;
	private ProductRepository productRepository;

	public FilesUploadService(CategoryRepository categoryRepository, SubCategoryRepository subCategoryRepository,
			SupplierRepository supplierRepository, ProductRepository productRepository) {
		this.categoryRepository = categoryRepository;
		this.subCategoryRepository = subCategoryRepository;
		this.supplierRepository = supplierRepository;
		this.productRepository = productRepository;
	}

	private final Path rootFolder = Paths.get("uploads");

	@Override
	public void saveFile(MultipartFile file) throws IOException {
		Files.copy(file.getInputStream(), this.rootFolder.resolve(file.getOriginalFilename()));
	}

	// Guardar Categorias
	@Override
	@Secured("ROLE_Administrador")
	public void saveCategoriesExcel(MultipartFile file) throws Exception {

		this.saveFile(file);

		String nameFile = "uploads/" + file.getOriginalFilename();
		File uploadedFile = new File(nameFile);

		// Procesar el archivo Excel
		try (FileInputStream fileInput = new FileInputStream(new File(nameFile));
				XSSFWorkbook book = new XSSFWorkbook(fileInput)) {

			XSSFSheet sheet = book.getSheetAt(0);

			Iterator<Row> rowIterator = sheet.iterator();

			boolean isFirstRow = true;

			// Iterar sobre las filas del archivo
			while (rowIterator.hasNext()) {

				Row row = rowIterator.next();

				// Saltar la primera fila
				if (isFirstRow) {
					isFirstRow = false;
					continue;
				}

				Iterator<Cell> cellIterator = row.cellIterator();

				// Verificar si hay celdas suficientes
				if (!cellIterator.hasNext())
					continue;

				Cell cell = cellIterator.next();

				Category category = new Category();

				// Asignar el nombre y el estado
				category.setName(cell.getStringCellValue());
				category.setState("Activo");

				this.categoryRepository.save(category);
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new Exception("Error al procesar el archivo Excel: " + e.getMessage());
		} finally {
			// Eliminar el archivo después de procesarlo
			try {
				if (uploadedFile.exists()) {
					Files.delete(uploadedFile.toPath());
					System.out.println("Archivo eliminado: " + uploadedFile.getAbsolutePath());
				}
			} catch (IOException e) {
				System.err.println("No se pudo eliminar el archivo: " + uploadedFile.getAbsolutePath());
			}
		}

	}

	// Guardar SubCategorias
	@Override
	@Secured("ROLE_Administrador")
	public void saveSubCategoriesExcel(MultipartFile file) throws Exception {

		this.saveFile(file);

		String nameFile = "uploads/" + file.getOriginalFilename();
		File uploadedFile = new File(nameFile);

		// Procesar el archivo Excel
		try (FileInputStream fileInput = new FileInputStream(new File(nameFile));
				XSSFWorkbook book = new XSSFWorkbook(fileInput)) {

			XSSFSheet sheet = book.getSheetAt(0);

			Iterator<Row> rowIterator = sheet.iterator();

			boolean isFirstRow = true;

			// Iterar sobre las filas del archivo
			while (rowIterator.hasNext()) {

				Row row = rowIterator.next();

				// Saltar la primera fila
				if (isFirstRow) {
					isFirstRow = false;
					continue;
				}

				Iterator<Cell> cellIterator = row.cellIterator();

				// Verificar si hay celdas suficientes
				if (!cellIterator.hasNext())
					continue;

				Cell cell = cellIterator.next();

				SubCategory subCategory = new SubCategory();

				subCategory.setName(cell.getStringCellValue());

				cell = cellIterator.next();

				// Encontrar la Categoria por el nombre exacto
				Category nameCategory = categoryRepository.findByName(cell.getStringCellValue()).orElse(null);
				subCategory.setCategory_id(nameCategory);
				subCategory.setState("Activo");

				this.subCategoryRepository.save(subCategory);
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new Exception("Error al procesar el archivo Excel: " + e.getMessage());
		} finally {
			// Eliminar el archivo después de procesarlo
			try {
				if (uploadedFile.exists()) {
					Files.delete(uploadedFile.toPath());
					System.out.println("Archivo eliminado: " + uploadedFile.getAbsolutePath());
				}
			} catch (IOException e) {
				System.err.println("No se pudo eliminar el archivo: " + uploadedFile.getAbsolutePath());
			}
		}

	}

	// Guardar Proveedores
	@Override
	public void saveSuppliersExcel(MultipartFile file) throws Exception {
		this.saveFile(file);

		String nameFile = "uploads/" + file.getOriginalFilename();
		File uploadedFile = new File(nameFile);

		// Procesar el archivo Excel
		try (FileInputStream fileInput = new FileInputStream(new File(nameFile));
				XSSFWorkbook book = new XSSFWorkbook(fileInput)) {

			XSSFSheet sheet = book.getSheetAt(0);

			Iterator<Row> rowIterator = sheet.iterator();

			boolean isFirstRow = true;

			// Iterar sobre las filas del archivo
			while (rowIterator.hasNext()) {

				Row row = rowIterator.next();

				// Saltar la primera fila
				if (isFirstRow) {
					isFirstRow = false;
					continue;
				}

				Iterator<Cell> cellIterator = row.cellIterator();

				// Verificar si hay celdas suficientes
				if (!cellIterator.hasNext())
					continue;

				Cell cell = cellIterator.next();

				Supplier supplier = new Supplier();

				supplier.setNit((long) cell.getNumericCellValue());
				cell = cellIterator.next();
				supplier.setName(cell.getStringCellValue());
				cell = cellIterator.next();
				supplier.setPhone((long) cell.getNumericCellValue());
				cell = cellIterator.next();
				supplier.setMail(cell.getStringCellValue());
				supplier.setState("Activo");

				this.supplierRepository.save(supplier);
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new Exception("Error al procesar el archivo Excel: " + e.getMessage());
		} finally {
			// Eliminar el archivo después de procesarlo
			try {
				if (uploadedFile.exists()) {
					Files.delete(uploadedFile.toPath());
					System.out.println("Archivo eliminado: " + uploadedFile.getAbsolutePath());
				}
			} catch (IOException e) {
				System.err.println("No se pudo eliminar el archivo: " + uploadedFile.getAbsolutePath());
			}
		}
	}

	// Guardar Productos
	@Override
	public void saveProductsExcel(MultipartFile file) throws Exception {

		this.saveFile(file);

		String nameFile = "uploads/" + file.getOriginalFilename();
		File uploadedFile = new File(nameFile);

		// Procesar el archivo Excel
		try (FileInputStream fileInput = new FileInputStream(new File(nameFile));
				XSSFWorkbook book = new XSSFWorkbook(fileInput)) {

			XSSFSheet sheet = book.getSheetAt(0);

			Iterator<Row> rowIterator = sheet.iterator();

			boolean isFirstRow = true;

			// Iterar sobre las filas del archivo
			while (rowIterator.hasNext()) {

				Row row = rowIterator.next();

				// Saltar la primera fila
				if (isFirstRow) {
					isFirstRow = false;
					continue;
				}

				Iterator<Cell> cellIterator = row.cellIterator();

				// Verificar si hay celdas suficientes
				if (!cellIterator.hasNext())
					continue;

				Cell cell = cellIterator.next();

				Product product = new Product();
				
				product.setName(cell.getStringCellValue());
				cell = cellIterator.next();
				product.setDescription(cell.getStringCellValue());
				cell = cellIterator.next();
				product.setPurchase_price((long) cell.getNumericCellValue());
				cell = cellIterator.next();
				product.setSale_price((long) cell.getNumericCellValue());
				cell = cellIterator.next();
				//Encontrar la subcategoria basado en el nombre
				SubCategory nameSubCategory = subCategoryRepository.findByName(cell.getStringCellValue()).orElse(null);
				product.setSubcategory_id(nameSubCategory);
				cell = cellIterator.next();
				//Encontrar el Proveedor basado en el nombre
				Supplier nameSuppliers = supplierRepository.findByName(cell.getStringCellValue()).orElse(null);
				product.setProvider_id(nameSuppliers);
				product.setState("Activo");
				
				// Generar la referencia automática
				Long salePrice = product.getSale_price();
				String seconds = String.format("%02d", LocalDateTime.now().getSecond());
				String minutes = String.format("%02d", LocalDateTime.now().getMinute());
				String firstTwoDigits = salePrice.toString().substring(0, Math.min(2, salePrice.toString().length()));

				String reference = String.format("%02d%s%s%s", product.getSubcategory_id().getId(),
						product.getProvider_id().getId(), firstTwoDigits, seconds + minutes);

				// Establecer la referencia en el producto
				product.setReference(Long.parseLong(reference));

				this.productRepository.save(product);
			}

		} catch (IOException e) {
			e.printStackTrace();
			throw new Exception("Error al procesar el archivo Excel: " + e.getMessage());
		} finally {
			// Eliminar el archivo después de procesarlo
			try {
				if (uploadedFile.exists()) {
					Files.delete(uploadedFile.toPath());
					System.out.println("Archivo eliminado: " + uploadedFile.getAbsolutePath());
				}
			} catch (IOException e) {
				System.err.println("No se pudo eliminar el archivo: " + uploadedFile.getAbsolutePath());
			}
		}

	}

}
