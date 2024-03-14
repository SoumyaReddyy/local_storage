$(document).ready(function() {                  
    let users = JSON.parse(localStorage.getItem('users')) || [];  //It retrieves the user data stored in the local storage and parses it into the users array. If there are no users stored, it initializes an empty array.

    //This function populates the user table with data from the users array. It creates table rows dynamically using the jQuery append() method.
    function populateUserTable() {
        let tableBody = $('#user-table-body');
        tableBody.empty();
        users.forEach(function(user) {
            tableBody.append(`<tr><td>${user.username}</td><td>${user.password}</td><td><button class="edit-btn">Edit</button><button class="delete-btn">Delete</button></td></tr>`);
        });
    }
 
    //declare the function to redirect next page
    function navigateToPage(pageUrl){
        window.location.href =pageUrl;
    }
   //It retrieves the values entered in the username and password fields, adds a new user object to the users array, stores the updated array in local storage, and then populates the user table with the updated data.
    $('#login').click(function(event) {
        event.preventDefault();
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }
        users.push({ username: username, password: password });
        localStorage.setItem('users', JSON.stringify(users));
           alert("Your details are saved.");
        $('#username, #password').val('');
        populateUserTable();
        navigateToPage('exercise.html');   //call the redirect next page function
    });
 
    $('#clear').click(function() {
        localStorage.removeItem('users');
        users = [];
        populateUserTable();
    });
 
    $(document).on('click', '.edit-btn', function() {
        let index = $(this).closest('tr').index();
        let user = users[index];
        let newUsername = prompt("Enter new username:", user.username);
        let newPassword = prompt("Enter new password:", user.password);
        if (newUsername && newPassword) {
            user.username = newUsername;
            user.password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            populateUserTable();
        }
    });
 
    $(document).on('click', '.delete-btn', function() {
        let index = $(this).closest('tr').index();
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        populateUserTable();
    });
 
    $.ajax({
        url: 'https://dummyjson.com/users',  // The URL endpoint for the API
        type: 'GET',                     // HTTP method (GET, POST, PUT, DELETE, etc.)
        dataType: 'json',                // Expected data type from the server response
        success: function(data) {        // Callback function to handle successful response
            // Code to execute when the request is successful
            console.log(data);           // Output the response data to the console or process it further
        },
        error: function(xhr, status, error) {  // Callback function to handle errors
            // Code to execute when there is an error with the request
            console.error(status);       // Output the error status to the console or handle it appropriately
        }
    });

    populateUserTable();
});