$(document).ready(function(){
	$("#body").load("home/index.html");
});

$(document).on('click','#home',function(){
	$("#body").load("home/index.html");
});
$(document).on('click','#customer',function(){
	$("#body").load("customer/index.html");
	$.ajax({
		url: "http://localhost:8080/get-all-customer"
	}).then(function(data){
		var html = "<table class='table table-hover'>" +
				"<thead>" +
				"<th>ID</th><th>Shop Name</th><th>Customer</th><th>Place</th><th>Post</th><th>District</th><th>State</th><th>GSTIN</th>" +
				"</thead>" +
				"<tbody>";
				
		for(var i=0; i<data.length; i++){
			var content = data[i];
			html += "<tr>" +
						"<td>"+content.id+"</td>" +
						"<td>"+content.shopName+"</td>" +
						"<td>"+content.customerName+"</td>" +
						"<td>"+content.place+"</td>" +
						"<td>"+content.post+"</td>" +
						"<td>"+content.district+"</td>" +
						"<td>"+content.state+"</td>" +
						"<td>"+content.gstin+"</td>" +
					"</tr>";
		}
		html += "</tbody>" +
				"</table>";
		$('.customer-table').html(html);
	});
});
$(document).on('click','#about',function(){
	$("#body").load("about/index.html");
});