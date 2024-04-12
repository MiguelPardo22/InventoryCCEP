package com.api.backendCCEP.Model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "reference")
    private long reference;

    @Column(name = "description")
    private String description;

    @Column(name = "purchase_price")
    private BigDecimal purchase_price;

    @Column(name = "sale_price")
    private BigDecimal sale_price;

    @ManyToOne
	@JoinColumn(name = "subcategory_id", referencedColumnName = "id")
	private SubCategory subcategory_id;

    @ManyToOne
	@JoinColumn(name = "provider_id", referencedColumnName = "id")
	private Supplier provider_id;

    @Column(name = "state", nullable = false)
	private String state;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getReference() {
        return reference;
    }

    public void setReference(long reference) {
        this.reference = reference;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPurchase_price() {
        return purchase_price;
    }

    public void setPurchase_price(BigDecimal purchase_price) {
        this.purchase_price = purchase_price;
    }

    public BigDecimal getSale_price() {
        return sale_price;
    }

    public void setSale_price(BigDecimal sale_price) {
        this.sale_price = sale_price;
    }

    public SubCategory getSubcategory_id() {
        return subcategory_id;
    }

    public void setSubcategory_id(SubCategory subcategory_id) {
        this.subcategory_id = subcategory_id;
    }

    public Supplier getProvider_id() {
        return provider_id;
    }

    public void setProvider_id(Supplier provider_id) {
        this.provider_id = provider_id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Product() {
    }

    public Product(long id, String name, long reference, String description, BigDecimal purchase_price,
            BigDecimal sale_price, SubCategory subcategory_id, Supplier provider_id, String state) {
        this.id = id;
        this.name = name;
        this.reference = reference;
        this.description = description;
        this.purchase_price = purchase_price;
        this.sale_price = sale_price;
        this.subcategory_id = subcategory_id;
        this.provider_id = provider_id;
        this.state = state;
    }

}
