// function moveLocation(lat, lng, direction, km) {
//     const kmPerDegree = 111;

//     let newLat = lat;
//     let newLng = lng;

//     switch (direction) {
//         case "north":
//             newLat += km / kmPerDegree;
//             break;

//         case "south":
//             newLat -= km / kmPerDegree;
//             break;

//         case "east":
//             newLng += km / (kmPerDegree * Math.cos(lat * Math.PI / 180));
//             break;

//         case "west":
//             newLng -= km / (kmPerDegree * Math.cos(lat * Math.PI / 180));
//             break;
//     }

//     return { lat: newLat, lng: newLng };
// }

// module.exports = moveLocation;