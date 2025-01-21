let body = "list and typing it manually it is not allowing me to save the box \nThere is no way to add a condition equals empty or not equals empty \nFor better customer experience, it will be good if we can duplicate/save as a request in the catalogue builder";
console.log(JSON.stringify(body));
// Sanitize the string
let sanitizedBody = JSON.stringify(body).slice(1, -1); // Remove the surrounding double quotes added by JSON.stringify

console.log(sanitizedBody);