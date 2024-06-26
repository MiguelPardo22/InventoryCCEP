package com.api.backendCCEP.Facade;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.api.backendCCEP.Model.Inventory;

public interface IInventory {

	public void save(Inventory inventory);
	public Page<Inventory> stock(Pageable pageable);
}
