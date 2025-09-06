// // script/createUserRatingAndReviewTables.js
// const AWS = require("aws-sdk");
// require("dotenv").config();

// AWS.config.update({
//   region: process.env.AWS_REGION || "ap-south-1",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const dynamodb = new AWS.DynamoDB();

// const userRatingParams = {
//   TableName: "UserRating",
//   AttributeDefinitions: [{ AttributeName: "userId", AttributeType: "S" }],
//   KeySchema: [{ AttributeName: "userId", KeyType: "HASH" }],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
// };

// const userReviewParams = {
//   TableName: "UserReview",
//   AttributeDefinitions: [
//     { AttributeName: "userId", AttributeType: "S" },
//     { AttributeName: "reviewDate", AttributeType: "S" },
//   ],
//   KeySchema: [
//     { AttributeName: "userId", KeyType: "HASH" },
//     { AttributeName: "reviewDate", KeyType: "RANGE" },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 5,
//     WriteCapacityUnits: 5,
//   },
// };

// dynamodb.createTable(userRatingParams, (err, data) => {
//   if (err) console.error("Error creating UserRating table:", err);
//   else
//     console.log("UserRating table created:", data.TableDescription.TableName);
// });

// dynamodb.createTable(userReviewParams, (err, data) => {
//   if (err) console.error("Error creating UserReview table:", err);
//   else
//     console.log("UserReview table created:", data.TableDescription.TableName);
// });
