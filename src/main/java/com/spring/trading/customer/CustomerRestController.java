package com.spring.trading.customer;

import java.util.ArrayList;
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
@RequestMapping("customer")
public class CustomerRestController {

	@Autowired
	private CustomerService service;
	
	@RequestMapping("/get-all-customer/{page}/{rows}")
	public List<TCustomer> getAllCustomer(@PathVariable String page,@PathVariable String rows){
		Integer pg = Integer.parseInt(page);
		Integer row = Integer.parseInt(rows);
		return service.getAllCustomer(pg, row);
	}
	
	@RequestMapping("/get-no-of-customer")
	public Long getNoOfRecords() {
		return service.getNoOfRecords();
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/add-customer", method=RequestMethod.POST)
	public JSONObject addCustomer(@RequestBody TCustomer customer) {
		JSONObject response = new JSONObject();
		//Check the customer already exist or not
		boolean isExist = service.isCustomerAlreadyExist(customer);
		if(isExist == false) { // Not Exist
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
		}else { //Already Exist
			response.put("status", false);
			response.put("response", "Customer with GSTIN \""+customer.getGstin()+"\" already exist.");
		}
		return response;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/update-customer", method=RequestMethod.PUT)
	public JSONObject updateCustomer(@RequestBody TCustomer customer) {
		JSONObject response = new JSONObject();
		try {
			service.addCustomer(customer);
			response.put("status", true);
			response.put("response", "Customer updates successfully");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			response.put("status", false);
			response.put("response", e.getMessage()+" , "+e.getCause());
		}
		return response;
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/delete-customer" , method=RequestMethod.DELETE)
	public JSONObject deleteCustomers(@RequestBody ArrayList<Integer> ids) {
		
		JSONObject json = new JSONObject();
		json.put("status", true);
		json.put("response", "customers deleted successfully");
		ids.forEach((id) -> {
			try {
				service.deleteCustomer(id);
			} catch (Exception e) {
				e.printStackTrace();
				
				json.put("status", false);
				json.put("response", e.getMessage()+ " , " +e.getCause());
			}
		});
		return json;
	}
}
