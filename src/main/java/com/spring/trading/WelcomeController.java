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
}
