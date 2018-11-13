package com.spring.trading.customer;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

	@Autowired
	private CustomerRepository customerRepository;
	
	public List<TCustomer> getAllCustomer(Integer page, Integer rows){
		List<TCustomer> customers = new ArrayList<>();
		Sort sort;
		//Pageable pageable = new PageRequest(page, rows);
		Pageable pageable = new PageRequest(page, rows, new Sort(Sort.Direction.ASC, "id"));
		customerRepository.findAll(pageable)
		.forEach(customers::add);
		return customers;
	}
	
	public Long getNoOfRecords() {
		return customerRepository.count();
	}
	
	public boolean addCustomer(TCustomer customer) throws Exception{
		customerRepository.save(customer);
		return true;
	}
	
	public void deleteCustomer(Integer id) throws Exception{
		customerRepository.deleteById(id);
	}
	
	public boolean isCustomerAlreadyExist(TCustomer customer) {
		TCustomer c = customerRepository.findByGstin(customer.getGstin());
		if(c == null)
			return false;
		else
			return true;
	}
}
