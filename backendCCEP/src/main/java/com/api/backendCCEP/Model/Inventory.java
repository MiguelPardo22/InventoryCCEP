package com.api.backendCCEP.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventories")
public class Inventory {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@Column(name = "stock")
	private long stock;
	
	@ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product_id;
	
	@ManyToOne
	@JoinColumn(name = "purchasedetail_id", referencedColumnName = "id")
	private Purchase_Detail purchasedetail_id;
	
	@ManyToOne
	@JoinColumn(name = "saledetail_id", referencedColumnName = "id")
	private Sale_Detail saledetail_id;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getStock() {
		return stock;
	}

	public void setStock(long stock) {
		this.stock = stock;
	}

	public Product getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Product product_id) {
		this.product_id = product_id;
	}

	public Purchase_Detail getPurchasedetail_id() {
		return purchasedetail_id;
	}

	public void setPurchasedetail_id(Purchase_Detail purchasedetail_id) {
		this.purchasedetail_id = purchasedetail_id;
	}

	public Sale_Detail getSaledetail_id() {
		return saledetail_id;
	}

	public void setSaledetail_id(Sale_Detail saledetail_id) {
		this.saledetail_id = saledetail_id;
	}

	public Inventory(long id, long stock, Product product_id, Purchase_Detail purchasedetail_id,
			Sale_Detail saledetail_id) {
		this.id = id;
		this.stock = stock;
		this.product_id = product_id;
		this.purchasedetail_id = purchasedetail_id;
		this.saledetail_id = saledetail_id;
	}

	public Inventory() {
	}
	
}
