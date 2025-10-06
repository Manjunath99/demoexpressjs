const fetch = require("node-fetch");

const OLA_API_KEY = process.env.OLA_API_KEY;
const BASE_URL = "https://api.olamaps.io";

// 🔹 Autocomplete API
const autocomplete = async (req, res) => {
  try {
    const { input } = req.query;
    if (!input)
      return res.status(400).json({ error: "Input query is required" });

    const url = `${BASE_URL}/places/v1/autocomplete?input=${encodeURIComponent(
      input
    )}&api_key=${OLA_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Ola Autocomplete failed");
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Ola Autocomplete Error:", err.message);
    res.status(500).json({ error: "Failed to fetch autocomplete results" });
  }
};

// 🔹 Reverse Geocode API
const geocode = async (req, res) => {
  try {
    const { lat, lng } = req.query;
    if (!lat || !lng)
      return res.status(400).json({ error: "lat and lng are required" });

    const url = `${BASE_URL}/places/v1/geocode?latlng=${lat},${lng}&api_key=${OLA_API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) throw new Error("Ola Geocode failed");
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Ola Geocode Error:", err.message);
    res.status(500).json({ error: "Failed to fetch geocode results" });
  }
};

// 🔹 Route API
const getRoute = async (req, res) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.body;
    if (!originLat || !originLng || !destLat || !destLng) {
      return res
        .status(400)
        .json({ error: "originLat, originLng, destLat, destLng are required" });
    }

    const url = `${BASE_URL}/routing/v1/directions?api_key=${OLA_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: { lat: originLat, lng: originLng },
        destination: { lat: destLat, lng: destLng },
        travelMode: "DRIVE",
      }),
    });

    if (!response.ok) throw new Error("Ola Route failed");
    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error("Ola Route Error:", err.message);
    res.status(500).json({ error: "Failed to fetch route" });
  }
};

module.exports = {
  autocomplete,
  geocode,
  getRoute,
};
