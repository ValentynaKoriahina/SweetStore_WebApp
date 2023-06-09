// This simple authorization and registration form is based on the lecture material

const users = [ { username: 'user', password: 'pass', email: 'user@example.com' } ];
const authorizedUsers = { };

// Function to create a new user and store it in the users array
function createUser(username, password, email) {

    // Find the given username and email in the users array
    const checkUsername = users.find(user => user.username === username);
    const checkEmail = users.find(user => user.email === email);

    // Check if the user is in users array
    if(checkUsername) {
        return "user name";
    } else if(checkEmail) {
        return "email";
    } else {
        users.push({ username, password, email});
        return "successfully registered";
    }
}

// Function to authenticate a user
function authenticateUser(username, password, userId){

    // Find the given username in the users array
    const user = users.find(user => user.username === username);

    // Check if the user is not in users array
    if(!user || user.password !== password ) {
        return false;
    }
    // If the username and password match, keep it in authorizedUsers
    // along with a temporary unique user ID, in case you later need to match the same data
    authorizedUsers[username] = userId;

    // If the username was in users array and password is match, return true
    return true;
}

// Export for use in other modules
module.exports = { createUser, authenticateUser, authorizedUsers };