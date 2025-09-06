// const AWS = require("aws-sdk");
// require("dotenv").config();

// AWS.config.update({
//   region: process.env.AWS_REGION || "ap-south-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const dynamodb = new AWS.DynamoDB();
// const params = {
//   TableName: "Users",
//   AttributeDefinitions: [
//     { AttributeName: "userId", AttributeType: "S" }, // PK
//     { AttributeName: "email", AttributeType: "S" }, // For GSI
//   ],
//   KeySchema: [
//     { AttributeName: "userId", KeyType: "HASH" }, // Primary key
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
//   GlobalSecondaryIndexes: [
//     {
//       IndexName: "EmailIndex",
//       KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
//       Projection: { ProjectionType: "ALL" },
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
