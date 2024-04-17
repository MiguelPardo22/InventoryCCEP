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
@Table(name = "sales_details")
public class Sale_Detail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "quantity")
    private long quantity;

    @Column(name = "subtotal")
    private long subtotal;

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product_id;

    @ManyToOne
    @JoinColumn(name = "sale_id", referencedColumnName = "id")
    private Sale sale_id;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }

    public long getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(long subtotal) {
        this.subtotal = subtotal;
    }

    public Product getProduct_id() {
        return product_id;
    }

    public void setProduct_id(Product product_id) {
        this.product_id = product_id;
    }

    public Sale getSale_id() {
        return sale_id;
    }

    public void setSale_id(Sale sale_id) {
        this.sale_id = sale_id;
    }

    public Sale_Detail() {
    }

    public Sale_Detail(long id, long quantity, long subtotal, Product product_id, Sale sale_id) {
        this.id = id;
        this.quantity = quantity;
        this.subtotal = subtotal;
        this.product_id = product_id;
        this.sale_id = sale_id;
    }

}
