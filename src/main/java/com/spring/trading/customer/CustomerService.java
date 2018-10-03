package com.spring.trading.customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository repository;
	
	public List<TCustomer> getAllCustomer(){
		List<TCustomer> customers = new ArrayList<>();
		repository.findAll()
		.forEach(customers::add);
		return customers;
	}
	
	public boolean addCustomer(TCustomer customer) {
		repository.save(customer);
		return true;
	}
}
