// const axios = require("axios");

// async function getLocationName(lat, lng) {
//     try {
//         const response = await axios.get(
//             `https://nominatim.openstreetmap.org/reverse`, {
//                 params: {
//                     lat: lat,
//                     lon: lng,
//                     format: "json"
//                 },
//                 headers: {
//                     "User-Agent": "my-app"
//                 }
//             }
//         );

//         return response.data.display_name;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

// module.exports = { getLocationName }