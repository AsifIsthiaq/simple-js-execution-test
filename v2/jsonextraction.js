function validateAndExtractJson(message) {
    const prefix = "conversation_ended";
    const suffix = "||END||";

    // Function to extract JSON from a string
    function extractJson(text) {
        const jsonRegex = /{.*?}/;
        const match = text.match(jsonRegex);
        return match ? match[0] : null;
    }

    // Extract JSON from the message
    const jsonString = extractJson(message);

    if (jsonString) {
        try {
            const parsedJson = JSON.parse(jsonString);

            // Check for valid prefix and suffix
            const hasPrefix = message.startsWith(prefix);
            const hasSuffix = message.endsWith(suffix);

            return {
                containsJson: true,
                isValidFormat: hasPrefix && hasSuffix,
                parsedJson,
                errors: !hasPrefix || !hasSuffix ? ["Invalid prefix or suffix"] : []
            };
        } catch (error) {
            // JSON parsing failed
            return {
                containsJson: false,
                isValidFormat: false,
                error: "Invalid JSON format in the message"
            };
        }
    }

    // If no JSON found
    return {
        containsJson: false,
        isValidFormat: false,
        error: "No JSON found in the message"
    };
}

// Example Usage
const messages = [
    "conversation_ended Je vais bien, merci. ||END||",
    'conversation_ended {"name":"asif"} ||END||',
    "additional info conversation_ended {\"name\":\"asif\"} ||END|| hello how are u",
    '{"name":"asif"}',
    "additional info conversation_ended {\"name\":\"asif\"}",
    '{ok}{"name":"asif"} ||END|| hello how are u'
];

messages.forEach((msg, index) => {
    console.log(`Message ${index + 1}:`, validateAndExtractJson(msg));
});


// function validateMessageFormat(message) {
//     const prefix = "conversation_ended";
//     const suffix = "||END||";

//     // Function to extract JSON from a string
//     function extractJson(text) {
//         const jsonRegex = /{.*?}/;
//         const match = text.match(jsonRegex);
//         return match ? match[0] : null;
//     }

//     // Check if the message starts with the prefix and ends with the suffix
//     if (message.startsWith(prefix) && message.endsWith(suffix)) {
//         // Extract JSON portion from the message
//         const jsonString = extractJson(message);

//         if (jsonString) {
//             try {
//                 const parsedJson = JSON.parse(jsonString);
//                 return {
//                     containsJson: true,
//                     isValidFormat: true,
//                     parsedJson
//                 };
//             } catch (error) {
//                 return {
//                     containsJson: false,
//                     isValidFormat: true,
//                     error: "Invalid JSON inside the message"
//                 };
//             }
//         } else {
//             return {
//                 containsJson: false,
//                 isValidFormat: true,
//                 error: "No JSON found in the message"
//             };
//         }
//     }

//     // If the message does not have the required prefix and suffix
//     const jsonString = extractJson(message);
//     if (jsonString) {
//         try {
//             JSON.parse(jsonString);
//             return {
//                 containsJson: true,
//                 isValidFormat: false,
//                 error: "Message does not have the required prefix or suffix"
//             };
//         } catch {
//             return {
//                 containsJson: false,
//                 isValidFormat: false,
//                 error: "Invalid JSON found in the message"
//             };
//         }
//     }

//     return {
//         containsJson: false,
//         isValidFormat: false,
//         error: "No JSON found in the message"
//     };
// }

// // Example Usage
// const messages = [
//     "conversation_ended Je vais bien, merci. ||END||",
//     'conversation_ended {"name":"asif"} ||END||',
//     "additional info conversation_ended {\"name\":\"asif\"} ||END|| hello how are u",
//     '{"name":"asif"}',
//     "additional info conversation_ended {\"name\":\"asif\"}",
//     '{"name":"asif"} ||END|| hello how are u'
// ];

// messages.forEach((msg, index) => {
//     console.log(`Message ${index + 1}:`, validateMessageFormat(msg));
// });