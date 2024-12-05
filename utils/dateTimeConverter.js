const convertDateTimeToIST = (date) => {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error("Date Object Not Valid");
    }

    const options = {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    return new Intl.DateTimeFormat("en-IN", options).format(date);
};

module.exports = convertDateTimeToIST;


/*
    How to Use this helper function in the code:

    const { convertDateTimeToIST } = require('./utils/dateConverter');
    const utcDate = new Date("UTC Date String");
    const istDate = convertDateTimeToIST(utcDate);
    console.log("Converted Date in IST:", istDate);  
*/