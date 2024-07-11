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
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "password_encrypted")
	private String password_encrypted;
	
	@ManyToOne
	@JoinColumn(name = "role_id", referencedColumnName = "id")
	private Rol role_id;
	
	@ManyToOne
	@JoinColumn(name = "person_id", referencedColumnName = "id")
	private Person person_id;
	
	@Column(name = "state")
	private String state;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword_encrypted() {
		return password_encrypted;
	}

	public void setPassword_encrypted(String password_encrypted) {
		this.password_encrypted = password_encrypted;
	}

	public Rol getRole_id() {
		return role_id;
	}

	public void setRole_id(Rol role_id) {
		this.role_id = role_id;
	}

	public Person getPerson_id() {
		return person_id;
	}

	public void setPerson_id(Person person_id) {
		this.person_id = person_id;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public User() {
	}

	public User(long id, String email, String password_encrypted, Rol role_id, Person person_id, String state) {
		this.id = id;
		this.email = email;
		this.password_encrypted = password_encrypted;
		this.role_id = role_id;
		this.person_id = person_id;
		this.state = state;
	}
	
}
