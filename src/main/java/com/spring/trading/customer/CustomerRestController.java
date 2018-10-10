package com.spring.trading.customer;

import java.util.List;
import java.util.TreeSet;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/add-customer", method=RequestMethod.POST)
	public JSONObject addCustomer(@RequestBody TCustomer customer) {
		JSONObject response = new JSONObject();
		try {
			service.addCustomer(customer);
			response.put("status", true);
			response.put("response", "Success");
		} catch (Exception e) {
			e.printStackTrace();
			System.err.println("Error => "+e.getMessage()+" , Cause : "+e.getCause());
			response.put("status", false);
			response.put("response", "Error : "+e.getMessage()+" , Cause : "+e.getCause());
		}
		return response;
	}
	
	@RequestMapping(value="/delete-customer/{id}", method=RequestMethod.DELETE)
	public void deleteCustomer(@PathVariable String id) {
		try {
			Integer idInt = Integer.parseInt(id);
			service.deleteCustomer(idInt);
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
}
