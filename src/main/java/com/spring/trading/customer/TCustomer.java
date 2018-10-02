package com.spring.trading.customer;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import org.hibernate.validator.constraints.UniqueElements;

@Entity
public class TCustomer{
	@Id
	@GeneratedValue
	private Integer id;
	
	private String shopName;
	private String customerName;
	private String mobile;
	private String email;
	private String place;
	private String post;
	private String district;
	private String state;
	private String gstin;
	private Boolean archive;
	
	public TCustomer() {
		super();
	}

	public TCustomer(String shopName, String customerName, String mobile, String email, String place, String post,
			String district, String state, String gstin, Boolean archive) {
		super();
		this.shopName = shopName;
		this.customerName = customerName;
		this.mobile = mobile;
		this.email = email;
		this.place = place;
		this.post = post;
		this.district = district;
		this.state = state;
		this.gstin = gstin;
		this.archive = archive;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPlace() {
		return place;
	}

	public void setPlace(String place) {
		this.place = place;
	}

	public String getPost() {
		return post;
	}

	public void setPost(String post) {
		this.post = post;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getGstin() {
		return gstin;
	}

	public void setGstin(String gstin) {
		this.gstin = gstin;
	}

	public Boolean getArchive() {
		return archive;
	}

	public void setArchive(Boolean archive) {
		this.archive = archive;
	}
		
}
