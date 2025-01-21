// function extractJsonFromMessage(message) {
//     // Regex to match JSON objects: starts with '{' and ends with '}'
//     const jsonRegex = /{[^{}]*}/g;

//     // Find all matches in the message
//     const matches = message.match(jsonRegex);

//     if (matches) {
//         const extractedJsons = [];
//         for (const jsonString of matches) {
//             try {
//                 // Parse each match to validate if it's a proper JSON
//                 const parsedJson = JSON.parse(jsonString);
//                 extractedJsons.push(parsedJson);
//             } catch {
//                 // Skip invalid JSON
//             }
//         }

//         return {
//             containsJson: extractedJsons.length > 0,
//             extractedJsons
//         };
//     }

//     return {
//         containsJson: false,
//         extractedJsons: []
//     };
// }

// // Example Usage
// const messages = [
//     "{ok}{\"name\":\"asif\"} ||END|| hello how are u",
//     "conversation_ended {\"name\":\"asif\"} ||END||",
//     "additional info {not json} {\"name\":\"asif\"} ||END||",
//     "random text without json"
// ];

// messages.forEach((msg, index) => {
//     console.log(`Message ${index + 1}:`, extractJsonFromMessage(msg));
// });


function extractJsonFromMessage(message) {
    // Regex to match potential JSON strings: starts with '{' and ends with '}'
    const jsonRegex = /{[^{}]*}/g;

    // Find all matches in the message
    const matches = message.match(jsonRegex);
    const extractedJsons = [];

    if (matches) {
        for (let jsonString of matches) {
            try {
                // Unescape JSON string if it has escaped characters
                jsonString = jsonString.replace(/\\([\s\S])/g, "$1");

                // Parse JSON
                const parsedJson = JSON.parse(jsonString);

                extractedJsons.push(parsedJson);
            } catch {
                // Skip invalid JSON
            }
        }
    }

    return extractedJsons;
}

// Example Usage
// const messages = [
//     '{ok}{"name":"asif"} ||END|| hello how are u',
//     'conversation_ended "{\\"name\\":\\"asif\\"}" ||END||',
//     'additional info {not json} "{\\"name\\":\\"asif\\"}" ||END||',
//     'random text without json',
//     '\\{"name":"asif"}'
// ];
const messages = [
    // Original Test Cases
    '{ok}{"name":"asif"} ||END|| hello how are u',
    'conversation_ended "{\\"name\\":\\"asif\\"}" ||END||',
    'additional info {not json} "{\\"name\\":\\"asif\\"}" ||END||',
    'random text without json',
    '\\{"name":"asif"}',

    // New Test Cases
    '{garbage before}{"name":"asif"}{garbage after}', // 1. JSON with garbage text
    'conversation_ended "{\\"user\\":{\\"name\\":\\"asif\\",\\"age\\":25}}" ||END||', // 2. Nested stringified JSON
    '{"name":"asif"} some text {"age":25} ||END||', // 3. Multiple JSON objects
    '\\{"name":"asif"}', // 4. Escaped JSON string
    '{name:"asif"} ||END||', // 5. Invalid JSON structure
    '', // 6. Empty string
    'This is just a random string with no JSON.', // 7. Random text without JSON
    '{"greeting":"hello, world!", "symbols":"!@#$%^&*()"}', // 8. JSON with special characters
    '{"user":{"name":"asif","hobbies":["reading","coding"]}}', // 9. JSON with nested arrays and objects
    '\\{"name":"asif"} random text \\{"age":25}', // 10. Multiple escaped JSONs
    '<<<{"name":"asif"}>>>', // 11. JSON surrounded by special characters
    '{"name":"عاصف", "language":"العربية"}', // 12. JSON with Unicode characters
    '"name":"asif"', // 13. Malformed JSON (missing braces)
    '<div>{"name":"asif"}</div>', // 14. JSON inside HTML-like structure
    '{"name":"asif"} \\{"role":"developer"} random text', // 15. Multiple JSONs with escaped and unescaped variants
    'conversation_ended "{\\"user\\":{\\"name\\":\\"asif\\",\\"details\\":{\\"age\\":25,\\"city\\":\\"Montreal\\"}}}" ||END||',
];

messages.forEach((msg, index) => {
    console.log(`Message ${index + 1}: Message: ${msg}:- `, extractJsonFromMessage(msg));
});