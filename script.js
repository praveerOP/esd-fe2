const api_url = "https://esd69.herokuapp.com/resident"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++)
	 {
		table_data += `<tr>`;
		table_data += `<td>${records[i].flatNo}</td>`;
		table_data += `<td>${records[i].firstName}</td>`;
		table_data += `<td>${records[i].lastName}</td>`;
		table_data += `<td>${records[i].phoneNumber}</td>`;
		table_data += `<td>${records[i].emailID}</td>`;
		table_data += `<td>`;
		table_data += `<a href="edit.html?id=${records[i]._id}"><i class="fas fa-edit"></i></a>  <i class="fas fa-trash-alt" onclick=deleteData('${records[i]._id}')></i>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
	
		document.getElementById("flatNo").value = data.flatNo;
		document.getElementById("firstName").value = data.firstName;
		document.getElementById("lastName").value = data.lastName;
		document.getElementById("phoneNumber").value = data.phoneNumber;
		document.getElementById("emailID").value = data.emailID;
		
		
		
	})
}


function postData() {
	
    var flatNo = document.getElementById("flatNo").value;
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var emailID = document.getElementById("emailID").value;

	
	
	data = {flatNo: flatNo, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, emailID: emailID};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "table.html";
	})
}	


function putData() {
	var flatNo = document.getElementById("flatNo").value;
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var phoneNumber = document.getElementById("phoneNumber").value;
	var emailID = document.getElementById("emailID").value;

	
	
	
	data = {flatNo: flatNo, firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, emailID: emailID};
	
	
	
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "table.html";
	})
	.catch((err)=>{
		console.log("Error is " , err)
	})
}


function deleteData(id) {
	const user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}