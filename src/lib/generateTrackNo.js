const generateTrackNo = (uniqueId) => {
    //We want the first ten characters

    //check data type
    if (typeof uniqueId !== "string") {
        throw new TypeError("Unique value must be a string")
    }

    //Keep only [A-Za-z0-9]
    const alphanum = uniqueId.replace(/[^a-zA-Z0-9]/g, '');

    //return first 10 characters
    return alphanum.slice(0, 10);



}

module.exports = generateTrackNo