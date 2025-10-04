// const AWS = require("aws-sdk");
// require("dotenv").config();

// AWS.config.update({
//   region: process.env.AWS_REGION || "ap-south-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const dynamodb = new AWS.DynamoDB();

// //for user db creation
// // const params = {
// //   TableName: "Users",
// //   AttributeDefinitions: [
// //     { AttributeName: "userId", AttributeType: "S" },
// //     { AttributeName: "phoneNumber", AttributeType: "S" },
// //   ],
// //   KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
// //   ProvisionedThroughput: {
// //     ReadCapacityUnits: 5,
// //     WriteCapacityUnits: 5,
// //   },
// //   GlobalSecondaryIndexes: [
// //     {
// //       IndexName: "PhoneNumberIndex",
// //       KeySchema: [{ AttributeName: "phoneNumber", KeyType: "HASH" }],
// //       Projection: {
// //         ProjectionType: "ALL",
// //       },
// //       ProvisionedThroughput: {
// //         ReadCapacityUnits: 5,
// //         WriteCapacityUnits: 5,
// //       },
// //     },
// //   ],
// // };

// //for emeregency contact db creation

// const params = {
//   TableName: "EmergencyContact",
//   AttributeDefinitions: [
//     { AttributeName: "contactId", AttributeType: "S" },
//     { AttributeName: "userId", AttributeType: "S" }, // for GSI
//   ],
//   KeySchema: [{ AttributeName: "contactId", KeyType: "HASH" }],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
//   GlobalSecondaryIndexes: [
//     {
//       IndexName: "UserIdIndex",
//       KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//   ],
// };

// dynamodb.createTable(params, (err, data) => {
//   if (err) console.error("Error creating table:", err);
//   else console.log("Table created:", data);
// });
