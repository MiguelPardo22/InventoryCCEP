package com.api.backendCCEP.FacadeImp;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import com.api.backendCCEP.Repository.CategoryRepository;

@Service
public class FilesUploadService implements IFilesUpload {

	private CategoryRepository categoryRepository;
	
	public FilesUploadService(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	private final Path rootFolder = Paths.get("uploads");
	
	@Override
	public void saveFile(MultipartFile file) throws IOException {
		Files.copy(file.getInputStream(), this.rootFolder.resolve(file.getOriginalFilename()));
	}
	
	//Guardar Categorias
	@Override
	@Secured("ROLE_Administrador")
	public void saveCategoriesExcel(MultipartFile file) throws Exception {
		
			this.saveFile(file);
			
			String nameFile = "uploads/" + file.getOriginalFilename();
			
			//Procesar el archivo Excel
			try(FileInputStream fileInput = new FileInputStream(new File(nameFile));
					XSSFWorkbook book = new XSSFWorkbook(fileInput)) {
				
				XSSFSheet sheet = book.getSheetAt(0);
				
				Iterator<Row> rowIterator = sheet.iterator();
				
				boolean isFirstRow = true;
				
				//Iterar sobre las filas del archivo
				while(rowIterator.hasNext()) {
					
					Row row = rowIterator.next();
					
					// Saltar la primera fila
		            if (isFirstRow) {
		                isFirstRow = false;
		                continue;
		            }
					
					Iterator<Cell> cellIterator = row.cellIterator();
					
					//Verificar si hay celdas suficientes
					if(!cellIterator.hasNext()) continue;
					
					Cell cell = cellIterator.next();
					
					Category category = new Category();
					
					//Asignar el nombre y el estado
					category.setName(cell.getStringCellValue());
					category.setState("Activo");
					
					this.categoryRepository.save(category);
				}
				
				
			} catch (IOException e) {
				e.printStackTrace();
				throw new Exception("Error al procesar el archivo Excel: " + e.getMessage());
			}
			
			
		}
		
	

}
