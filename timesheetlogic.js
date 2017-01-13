// For the next 20 minutes, focus all your efforts on creating the application layout for your site.

// This phase involves both:

// Creating the overall HTML/CSS/Bootstrap Layout

// Creating the initial .on("click") event that will dynamically trigger new HTML rows to be generated.

// This phase DOES NOT involve sending or receiving data to Firebase.

// If you finish early:

// Continue refining the design! Take things to the next level. Make this application portfolio-grade!

// Begin reading about push({}) and .on("child_added") in the Firebase documentation.


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3ZUmh-RMuW3nfR8mjcWk63nvE3UzBhXo",
    authDomain: "employeetimesheet-bfd6f.firebaseapp.com",
    databaseURL: "https://employeetimesheet-bfd6f.firebaseio.com",
    storageBucket: "employeetimesheet-bfd6f.appspot.com",
    messagingSenderId: "180630160397"
  };
  firebase.initializeApp(config);



      // Create a variable to reference the database.
   var database = firebase.database();

   var employeeRef = database.ref("/employees"); 


   $('#add-employee-btn').on('click', function(){

   	 var name = $('#employee-name-input').val().trim();
   	 var role = $('#role-input').val().trim();
   	 var start = moment($('#start-input').val().trim(), "DD/MM/YY").format("X");
   	 var rate = $('#rate-input').val().trim();

   	 var employee = employeeRef.push({

   	 	 employee_name : name,
   	 	 employee_role : role,
   	 	 employee_start_date : start,
   	 	 employee_rate : rate,
   	 	 employee_current_timestamp : firebase.database.ServerValue.TIMESTAMP

   	 });

   	 // console.log("Added employee -", name, role, start, rate);

   });


  	 employeeRef.on('child_added', function(childSnapshot){
  	 	var employeeObj =childSnapshot.val();

  	 	// console.log(employeeObj.employee_name);
  	 	// console.log(employeeObj.employee_rate);
  	 	// console.log(employeeObj.employee_role);
  	 	// console.log(employeeObj.employee_start_date);
  	 	// console.log(employeeObj.employee_current_timestamp);
      var convertedDate = moment(new Date(employeeObj.employee_start_date));
      var totalMonths = moment(moment()).diff(convertedDate, 'months');

      console.log("total months " , totalMonths);

      var total = totalMonths * employeeObj.employee_rate;

  	 	$("#employee-table").append(
  	 		// $("tbody").append(
  	 		"<tr><td id='name'>" + employeeObj.employee_name + '</td>' + 
  	 		"<td id='role'>" + employeeObj.employee_role + '</td>' +
  	 		"<td id='start'>" + employeeObj.employee_start_date + '</td>' +
  	 		"<td id='months'>" + totalMonths + '</td>' +
  	 		"<td id='rate'>" + employeeObj.employee_rate + '</td>' +
        "<td id='total'>" + total + '</td></tr>');

  	 
  	 });



// function monthDiff(d1, d2) {
// 	var currentDate = new Date();

//     var months;
//     months = (currentDate.getFullYear() - d1.getFullYear()) * 12;
//     months += currentDate.getMonth() - d1.getMonth();
//     return months;
// }


