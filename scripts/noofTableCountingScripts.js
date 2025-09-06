// // script/listDynamoTables.js
// const AWS = require("aws-sdk");
// require("dotenv").config();

// AWS.config.update({
//   region: process.env.AWS_REGION || "ap-south-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const dynamodb = new AWS.DynamoDB();

// //List all tables in the region
// dynamodb.listTables({}, (err, data) => {
//   if (err) {
//     console.error("Error listing tables:", err);
//   } else {
//     console.log("Tables in ap-south-1:", data.TableNames);
//   }
// });

// // Describe a specific table
// // dynamodb.describeTable({ TableName: "Users" }, (err, data) => {
// //   if (err) console.error("Users table not found:", err);
// //   else console.log("Users table details:", data.Table);
// // });

// // Check existence of multiple tables
// //const tables = ["UserRating", "UserReview", "Users"];
// // tables.forEach((tableName) => {
// //   dynamodb.describeTable({ TableName: tableName }, (err, data) => {
// //     if (err) console.error(`${tableName} not found:`, err.message);
// //     else console.log(`${tableName} details:`, data.Table.TableArn);
// //   });
// // });
