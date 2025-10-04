// script/listDynamoTables.js
const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  region: process.env.AWS_REGION || "ap-south-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamodb = new AWS.DynamoDB();
// Delete a specific table please be cautious while running this script
const params = {
  TableName: "Users", // replace with the table you want to delete
};
dynamodb.deleteTable(params, (err, data) => {
  if (err) console.error("Error deleting table:", err);
  else console.log("Table deleted:", data.TableDescription.TableName);
});
