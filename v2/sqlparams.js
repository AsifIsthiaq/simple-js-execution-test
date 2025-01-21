// const sql = "select * from {{inputs.cartId}} where id = {{globalParams.productId}}"
const sql = "select * from cfg_agent where LAST_NAME = {{inputs.lastName}} and first_name = {{inputs.firstName}}"
console.log(sql);

// Step 1: Extract all substrings within `{{}}`
// const placeholders = [];
// const newSql = sql.replace(/{{(.*?)}}/g, (match, p1) => {
//   //placeholders.push(p1.trim()); // add the captured part without `{{}}` to the array
//   placeholders.push(p1.trim);
//   return '?'; // replace `{{...}}` with `?`
// });

// Step 1: Extract all substrings within `{{}}` (including the delimiters)


const placeholders = [];
const newSql = sql.replace(/{{(.*?)}}/g, (match) => {
  placeholders.push(match); // add the full match including `{{}}` to the array
  return '?'; // replace `{{...}}` with `?`
});

// console.log("Placeholders stringify:", JSON.stringify(placeholders));

console.log("Placeholders:", placeholders);
console.log("New SQL:", newSql);


const dymmySqlCatalog = {
    catalogName: 'SQL CATALOG',
    provider: 'sql-dev7',
    version: 'v1',
    baseURI: 'baseURI',
    type: 'mysql',
    globalParams: {
      host: '10.16.1.102',
      username: 'aheevaccs',
      password: 'Ah123QpoZ',
      database: 'aheevaccs_1',
      port: 3306,
    },
    requests: [
      {
        name: 'SQLRequest1',
        query:
          'select * from cfg_agent where LAST_NAME = {{inputs.lastName}} and FIRST_NAME = {{inputs.firstName}}',
        formattedQuery:
          'select * from cfg_agent where LAST_NAME = ? and FIRST_NAME = ?',
        parameters: ['{{inputs.lastName}}', '{{inputs.firstName}}'],
        inputs: [
          {
            fieldName: 'firstName',
            fieldLabel: 'First Name',
          },
          {
            fieldName: 'lastName',
            fieldLabel: 'Last Name',
          },
        ],
        outputs: [
          {
            fieldName: 'firstName',
            fieldLabel: 'First Name',
          },
          {
            fieldName: 'lastName',
            fieldLabel: 'Last Name',
          },
          {
            fieldName: 'dbid',
            fieldLabel: 'DBID',
          },
        ],
        responseParams: {},
      },
    ],
  };

//   const str = JSON.stringify(dymmySqlCatalog);

// console.log(str);
// console.log(JSON.parse(str));