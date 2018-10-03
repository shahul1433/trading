package com.spring.trading.customer;

import java.util.List;
import java.util.TreeSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerRestController {

	@Autowired
	private CustomerService service;
	
	@RequestMapping("/get-all-customer")
	public List<TCustomer> getAllCustomer(){
		return service.getAllCustomer();
	}
	
	@RequestMapping(value="/add-customer", method=RequestMethod.POST)
	public boolean addCustomer(@RequestBody TCustomer customer) {
		return service.addCustomer(customer);
	}
}
