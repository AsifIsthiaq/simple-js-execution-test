// //var msg = "LOCATION-latitude: 45.498602, longitude: -73.647962";
// // var msg = "asif";
// // const splitedMsg = msg.split(", ");
// // const latitude = splitedMsg[0]?.split("LOCATION-latitude: ")?.[1];
// // const longitude = splitedMsg[1]?.split("longitude: ")?.[1];
// // if(latitude && longitude) console.log("ok")
// // console.log(splitedMsg);
// // console.log(latitude);
// // console.log(longitude);

// const inputString1 = "LOCATION-latitude: 45.56039, longitude: -73.444152";
// const inputString2 = "Latitude: 45.56039, Longitude: -73.444152";

// function extractLatLong(inputString) {
//     // Define a regular expression pattern to match latitude and longitude
//     const pattern = /(?:latitude|latitude:)\s*(-?\d+(?:\.\d+)?),?\s*(?:longitude|longitude:)\s*(-?\d+(?:\.\d+)?)/i;
    
//     // Execute the regular expression pattern on the input string
//     const matches = inputString.match(pattern);

//     // Extract latitude and longitude from the matched groups
//     if (matches && matches.length >= 3) {
//         const latitude = parseFloat(matches[1]);
//         const longitude = parseFloat(matches[2]);
//         return { latitude, longitude };
//     } else {
//         return null; // Return null if no match found
//     }
// }

// console.log(extractLatLong(inputString1));
// console.log(extractLatLong(inputString2));

let str = "{\"attributes\":{\"accountDetails\":{\"credentials\":{\"whatsappAuthToken\":\"sASumAJvxARagbetjGe-amHIrQeUng4JaYaQ\",\"whatsappKeyword\":\"whatsapp:cooked-impala\",\"whatsappProvider\":\"zenvia\",\"whatsappSubscriptionID\":\"c628a012-f3ef-4bef-ab00-d992e20a90b7\",\"whatsappZenviaAccountType\":\"SANDBOX\",\"WhatsappRealNumber\":\"whatsapp:+551148377404\",\"whatsappPhoneNumber\":\"whatsapp:c628a012-f3ef-4bef-ab00-d992e20a90b7\"},\"type\":\"Whatsapp\"},\"countryCode\":\"+55\",\"name\":\"whatsapp:+551148377404\",\"originalID\":\"whatsapp:c628a012-f3ef-4bef-ab00-d992e20a90b7\",\"parentUserGroupIDList\":[\"T1\"],\"title\":\"Zenvia Franco\",\"useForDistribution\":\"1\",\"enabled\":true},\"ID\":\"0fbf07f0-d57d-11ee-90a7-0926a3af842e\",\"meta\":{\"createdOn\":\"2024-02-27T14:32:40.687Z\",\"createdBy\":\"U0_AM_159\"}}"


//str = JSON.parse(str);
console.log(str);