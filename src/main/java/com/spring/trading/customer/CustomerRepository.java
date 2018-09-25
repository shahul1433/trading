package com.spring.trading.customer;

import java.util.TreeSet;

import org.springframework.stereotype.Service;

@Service
public class CustomerRepository {

	private static TreeSet<Customer> customers = new TreeSet<>();
	
	static {
		Customer c1 = new Customer(1, "GreenLeaf Technologies", "Pradeep PP", "Kottappuram", "Kottappuram", "Palakkad", "Kerala", "GSTIN560078");
		Customer c2 = new Customer(2, "Virima Technologies", "Balaji KM", "Banashankari", "Bangalore", "Bangalore", "Karnataka", "GSTIN560079");
		Customer c3 = new Customer(3, "Brilliant Soft", "Shahul P T", "Kottappuram", "Kottappuram", "Palakkad", "Kerala", "GSTIN560080");
		customers.add(c1);
		customers.add(c2);
		customers.add(c3);
	}
	
	public static TreeSet<Customer> getAllCustomer(){
		return customers;
	}
	
	public static void addCustomer(Customer c) {
		customers.add(c);
	}
	
	public static void updateCustomer(Customer c) {
		customers.add(c);
	}
	
	public static boolean deleteCustomer(Integer id) {
		boolean status = false;
		customers.removeIf(c -> c.getId() == id);
		return status;
	}
}
