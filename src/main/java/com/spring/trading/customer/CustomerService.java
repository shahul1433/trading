package com.spring.trading.customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	public List<TCustomer> getAllCustomer(){
		List<TCustomer> customers = new ArrayList<>();
		customerRepository.findAll()
		.forEach(customers::add);
		return customers;
	}
	
	public boolean addCustomer(TCustomer customer) throws Exception{
		customerRepository.save(customer);
		return true;
	}
	
	public void deleteCustomer(Integer id) throws Exception{
		customerRepository.deleteById(id);
	}
}
