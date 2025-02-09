// Example input string with placeholders
const inputString = `
  Hello, {{inputs.username}}! 
  Your account {{inputs.username}}! balance is {{inputs.balance}}. 
  Please contact {{inputs.supportEmail}} for assistance.
  2Hello2, {{inputs.username}}!
`;

// Example replacement values
const replacements = {
  username: "JohnDoe",
  balance: "$100",
  supportEmail: "support@example.com",
};

// Function to replace placeholders using split/join
function replacePlaceholders(str, replacements) {
  let result = str;

  // Iterate over each placeholder and replace it
  for (const [key, value] of Object.entries(replacements)) {
    const placeholder = `{{inputs.${key}}}`;
    let splitedArr = result.split(placeholder);
    console.log(`splitedArr:${key} `,splitedArr);
    result = splitedArr.join(value);
    console.log(`AfterJoin:${key} `,result);
  }

  return result;
}

// Run the replacement
const outputString = replacePlaceholders(inputString, replacements);

// Log the result
console.log(outputString);