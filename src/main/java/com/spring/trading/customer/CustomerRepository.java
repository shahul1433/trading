package com.spring.trading.customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<TCustomer, Integer>  {
	
	public TCustomer findByGstin(String gstin);
	
}
