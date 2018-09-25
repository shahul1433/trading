package com.spring.trading.customer;

import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerRestController {

	@Autowired
	private CustomerRepository service;
	
	@RequestMapping("/get-all-customer")
	public TreeSet<Customer> getAllCustomer(){
		return service.getAllCustomer();
	}
}
