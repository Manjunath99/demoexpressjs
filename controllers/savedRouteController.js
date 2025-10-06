// controllers/savedRouteController.js
const asyncHandler = require("express-async-handler");
const { createSavedRoute } = require("../models/savedRouteModel");
const dynamodb = require("../config/dynamoDbConnection");

const SAVED_ROUTE_TABLE = "SavedRoute";

/* -------------------- Add Saved Route -------------------- */
const addSavedRoute = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { userId } = req.params;
  const routeItem = createSavedRoute({ ...req.body, userId });

  await dynamodb
    .put({ TableName: SAVED_ROUTE_TABLE, Item: routeItem })
    .promise();

  res.status(201).json({ message: "Saved route added", route: routeItem });
});

/* -------------------- Get All Saved Routes -------------------- */
const getSavedRoutes = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { userId } = req.params;

  const result = await dynamodb
    .query({
      TableName: SAVED_ROUTE_TABLE,
      IndexName: "UserIdIndex", // GSI on userId
      KeyConditionExpression: "userId = :uid",
      ExpressionAttributeValues: { ":uid": userId },
    })
    .promise();

  res.status(200).json(result.Items || []);
});

/* -------------------- Update Saved Route -------------------- */
const updateSavedRoute = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { userId, routeId } = req.params;
  const {
    routeName,
    startLocation,
    endLocation,
    waypoints,
    notes,
    preferredVehicleType,
    shareRide,
  } = req.body;

  const updateParams = {
    TableName: SAVED_ROUTE_TABLE,
    Key: { routeId },
    UpdateExpression:
      "set routeName = :r, startLocation = :s, endLocation = :e, waypoints = :w, notes = :n, preferredVehicleType = :p, shareRide = :sh",
    ExpressionAttributeValues: {
      ":r": routeName,
      ":s": startLocation,
      ":e": endLocation,
      ":w": waypoints || [],
      ":n": notes || "",
      ":p": preferredVehicleType || "Standard",
      ":sh": shareRide || false,
    },
    ReturnValues: "ALL_NEW",
  };

  const result = await dynamodb.update(updateParams).promise();

  res
    .status(200)
    .json({ message: "Saved route updated", route: result.Attributes });
});

/* -------------------- Delete Saved Route -------------------- */
const deleteSavedRoute = asyncHandler(async (req, res) => {
  if (!req.user || !req.user.userId) {
    res.status(401);
    throw new Error("Unauthorized: No user information found");
  }

  const { routeId } = req.params;

  await dynamodb
    .delete({
      TableName: SAVED_ROUTE_TABLE,
      Key: { routeId },
    })
    .promise();

  res.status(200).json({ message: "Saved route deleted", routeId });
});

module.exports = {
  addSavedRoute,
  getSavedRoutes,
  updateSavedRoute,
  deleteSavedRoute,
};
