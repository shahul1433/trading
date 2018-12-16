package com.spring.trading;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WelcomeController {

	@GetMapping("/")
	public String getHome() {
		return "home";
	}
	
	@GetMapping("/login")
	public String getLoginPage() {
		return "login/login";
	}
	
	@GetMapping("/about")
	public String getAbout() {
		return "about/index";
	}
	
	@GetMapping("/customer")
	public String getCustomer() {
		return "customer/index";
	}
	
	@GetMapping("/stock")
	public String getStock() {
		return "stock/index";
	}
	
	@GetMapping("/ledger")
	public String getLedger() {
		return "ledger/index";
	}
	
	@GetMapping("/credit")
	public String getCredit() {
		return "credit/index";
	}
	
	@GetMapping("/account")
	public String getAccount() {
		return "account/index";
	}
	
}
