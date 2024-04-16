package com.api.backendCCEP.Model;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "total_sale")
    private long total_sale;

    @Column(name = "sale_date")
    private Date sale_date;

    @Column(name = "user_id")
    private long user_id;

    @Column(name = "state", nullable = false)
    private String state;

    @OneToMany(mappedBy = "sale_id", fetch = FetchType.LAZY)
    @JsonBackReference
    private List<Sale_Detail> sale_Details = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getTotal_sale() {
        return total_sale;
    }

    public void setTotal_sale(long total_sale) {
        this.total_sale = total_sale;
    }

    public Date getDate_sale() {
        return sale_date;
    }

    public void setDate_sale(Date sale_date) {
        this.sale_date = sale_date;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public List<Sale_Detail> getSale_Details() {
        return sale_Details;
    }

    public void setSale_Details(List<Sale_Detail> sale_Details) {
        this.sale_Details = sale_Details;
    }

    public Sale() {
    }

    public Sale(long id, long total_sale, Date sale_date, long user_id, String state,
            List<Sale_Detail> sale_Details) {
        this.id = id;
        this.total_sale = total_sale;
        this.sale_date = sale_date;
        this.user_id = user_id;
        this.state = state;
        this.sale_Details = sale_Details;
    }

    public Sale(long id) {
        this.id = id;
    }
}
