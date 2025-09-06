// const AWS = require("aws-sdk");
// require("dotenv").config();

// AWS.config.update({
//   region: process.env.AWS_REGION || "ap-south-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const dynamodb = new AWS.DynamoDB();

// const params = {
//   TableName: "Vehicles",
//   AttributeDefinitions: [
//     { AttributeName: "vehicleId", AttributeType: "S" }, // Primary key
//   ],
//   KeySchema: [
//     { AttributeName: "vehicleId", KeyType: "HASH" }, // Partition key
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
// };

// dynamodb.createTable(params, (err, data) => {
//   if (err) console.error("Error creating Vehicles table:", err);
//   else console.log("Vehicles table created:", data.TableDescription.TableName);
// });
