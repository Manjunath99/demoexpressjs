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

// const params = {
//   TableName: "SavedRoute",
//   AttributeDefinitions: [
//     { AttributeName: "routeId", AttributeType: "S" },
//     { AttributeName: "userId", AttributeType: "S" }, // for GSI
//   ],
//   KeySchema: [
//     { AttributeName: "routeId", KeyType: "HASH" }, // Primary key
//   ],
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
//   if (err) console.error("Error creating SavedRoute table:", err);
//   else console.log("SavedRoute table created:", data);
// });

// const params = {
//   TableName: "RideHistory",
//   AttributeDefinitions: [
//     { AttributeName: "rideId", AttributeType: "S" },
//     { AttributeName: "driverId", AttributeType: "S" }, // For GSI 1
//     { AttributeName: "passengerId", AttributeType: "S" }, // For GSI 2
//   ],
//   KeySchema: [
//     { AttributeName: "rideId", KeyType: "HASH" }, // Primary key
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
//   GlobalSecondaryIndexes: [
//     {
//       IndexName: "DriverIdIndex",
//       KeySchema: [{ AttributeName: "driverId", KeyType: "HASH" }],
//       Projection: {
//         ProjectionType: "ALL",
//       },
//       ProvisionedThroughput: {
//         ReadCapacityUnits: 5,
//         WriteCapacityUnits: 5,
//       },
//     },
//     {
//       IndexName: "PassengerIdIndex",
//       KeySchema: [{ AttributeName: "passengerId", KeyType: "HASH" }],
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
//   if (err) console.error("Error creating Ride table:", err);
//   else console.log("Ride table created:", data);
// });
