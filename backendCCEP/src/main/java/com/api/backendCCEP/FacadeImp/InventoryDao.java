package com.api.backendCCEP.FacadeImp;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.api.backendCCEP.Facade.IInventory;
import com.api.backendCCEP.Model.Inventory;
import com.api.backendCCEP.Repository.InventoryRepository;

@Service
public class InventoryDao implements IInventory{

	private InventoryRepository inventoryRepository;
	
	public InventoryDao(InventoryRepository inventoryRepository) {
		this.inventoryRepository = inventoryRepository;
	}

	@Override
	public void save(Inventory inventory) {
		inventoryRepository.save(inventory);
	}

	@Override
	public Page<Inventory> stock(Pageable pageable) {
		return inventoryRepository.stock(pageable);
	}
	
}
