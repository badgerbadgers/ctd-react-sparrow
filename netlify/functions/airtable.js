// // // const axios = require("axios");
// const url = `/.netlify/functions/todo?id=${tableName}`;

// exports.handler = async function (event, context) {
//   console.log(event);
//   console.log(context);
//   try {
//     const { tableName } = event.queryStringParameters;
//     const response = await fetch(`url`);
//     return {
//       statusCode: 200,
//       body: JSON.stringify({ 
//         "records": 
//       [{
//         "fields": {
//           "Name": title
//         }
//       }] }),
//     };
//   } catch (err) {
//     return {
//       statusCode: 404,
//       body: err.toString(),
//     };
//   }
// };