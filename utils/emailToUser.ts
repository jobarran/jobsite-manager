export const emailToUser = (email:string) => {
    // Split the email address into an array using "@" as the delimiter
    var parts = email.split("@");
  
    // Take the first part of the array, which is the username
    var username = parts[0];
  
    return username;
  }