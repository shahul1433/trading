package com.spring.trading.customer;

public class Customer implements Comparable<Customer> {
	private Integer id;
	private String shopName;
	private String customerName;
	private String place;
	private String post;
	private String district;
	private String state;
	private String GSTIN;
	
	public Customer(Integer id, String shopName, String customerName, String place, String post, String district,
			String state, String gSTIN) {
		super();
		this.id = id;
		this.shopName = shopName;
		this.customerName = customerName;
		this.place = place;
		this.post = post;
		this.district = district;
		this.state = state;
		GSTIN = gSTIN;
	}
	
	public Customer() {
		// TODO Auto-generated constructor stub
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

	public String getGSTIN() {
		return GSTIN;
	}

	public void setGSTIN(String gSTIN) {
		GSTIN = gSTIN;
	}

	@Override
	public int compareTo(Customer o) {
		if(id > o.id)
			return 1;
		else if(id < o.id)
			return -1;
		else
			return 0;
	}
	
}
