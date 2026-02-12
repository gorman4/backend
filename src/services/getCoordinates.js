const axios = require("axios");

const getCoordinates = async(placeName) => {
    try {
        const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/search", {
                params: {
                    text: placeName,
                    apiKey: process.env.GEOAPIFY_KEY,
                },
            }
        );

        if (!response.data.features.length) {
            throw new Error("Location not found");
        }

        const result = response.data.features[0];

        return {
            lat: result.properties.lat,
            lon: result.properties.lon,
        };
    } catch (error) {
        console.error("Error getting coordinates:", error.message);
        throw error;
    }
};

module.exports = getCoordinates;