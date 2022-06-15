// DMS Regex:
// ([0-9]{1,2})[°]([0-9]{1,2})['|′]([0-9]{1,2})["|″]([N|S]), ([0-9]{1,3})[°]([0-9]{1,2})['|′]?([0-9]{1,2})["|″]([E|W])

// DDM Regex:
// ([0-9]{1,2})[°]([0-9]{1,2}[.][0-9]{1,2})['|′]([N|S]), ([0-9]{1,3})[°]([0-9]{1,2}[.][0-9]{1,2})['|′]([E|W])


//Degrees Minutes Seconds to Decimal Degrees
//Decimal degrees = Degrees + (Minutes/60) + (Seconds/3600)
export const convertDMStoDD = (dd) => {

    const regex = /([0-9]{1,2})[°]([0-9]{1,2})['|′]([0-9]{1,2})["|″]([N|S]), ([0-9]{1,3})[°]([0-9]{1,2})['|′]?([0-9]{1,2})["|″]([E|W])/g

    const match = regex.exec(dd);

    let latDeg = parseInt(match[1], 10);
    let latMin = parseInt(match[2], 10);
    let latSec = parseInt(match[3], 10);

    let lonDeg = parseInt(match[5], 10);
    let lonMin = parseInt(match[6], 10);
    let lonSec = parseInt(match[7], 10);

    let resultLat = latDeg + (latMin / 60) + (latSec / 3600)
    let resultLon = lonDeg + (lonMin / 60) + (lonSec / 3600)

    //cardinal directions
    resultLat = match[4] === "S" ? resultLat * (-1) : resultLat
    resultLon = match[8] === "W" ? resultLon * (-1) : resultLon

    return `${resultLat.toFixed(4)},${resultLon.toFixed(4)}`

}


// Decimal Degree Minutes to Decimal Degrees
// Decimal degrees = Degrees + (inputMinutes/60)
export const convertDDMtoDD = (dd) => {

    const regex = /([0-9]{1,2})[°]([0-9]{1,2}[.][0-9]{1,2})['|′]([N|S]), ([0-9]{1,3})[°]([0-9]{1,2}[.][0-9]{1,2})['|′]([E|W])/g

    const match = regex.exec(dd);

    let latDeg = parseInt(match[1], 10);
    let latMin = parseInt(match[2], 10);

    let lonDeg = parseInt(match[4], 10);
    let lonMin = parseInt(match[5], 10);

    let resultLat = latDeg + (latMin / 60)
    let resultLon = lonDeg + (lonMin / 60)

    //cardinal directions
    resultLat = match[3] === "S" ? resultLat * (-1) : resultLat
    resultLon = match[6] === "W" ? resultLon * (-1) : resultLon

    return `${resultLat.toFixed(4)},${resultLon.toFixed(4)}`
}


// Decimal Degrees to Decimal Degree Minutes
export const convertDDtoDMS = (dd) => {
    let match = dd.split(",")

    let lat = match[0]
    let latDegree = Math.trunc(lat)

    let latDecimal = lat - latDegree;
    let latMinutesBase = (latDecimal * 60)
    let latMinute = Math.trunc(latMinutesBase)
    let latSecondBase = latMinutesBase - latMinute
    let latSecond = Math.trunc(latSecondBase * 60)


    let lon = match[1]
    let lonDegree = Math.trunc(lon)

    let lonDecimal = lon - lonDegree;
    let lonMinutesBase = (lonDecimal * 60)
    let lonMinute = Math.trunc(lonMinutesBase)
    let lonSecondBase = lonMinutesBase - lonMinute
    let lonSecond = Math.trunc(lonSecondBase * 60)

    //cardinal directions
    let latDirection = latDegree < 0 ? "S" : "N"
    let lonDirection = lonDegree < 0 ? "W" : "E"

    return `${latDegree}°${latMinute}'${latSecond}"${latDirection}, ${lonDegree}°${lonMinute}'${lonSecond}"${lonDirection}`

}


export const convertDDtoDDM = (dd) => {
    let match = dd.split(",")

    let lat = match[0]
    let latDegree = Math.trunc(lat)

    let latDecimal = lat - latDegree;
    let latMinutesBase = (latDecimal * 60)
    let latMinute = latMinutesBase.toFixed(2)


    let lon = match[1]
    let lonDegree = Math.trunc(lon)

    let lonDecimal = lon - lonDegree;
    let lonMinutesBase = (lonDecimal * 60)
    let lonMinute = lonMinutesBase.toFixed(2)

    //cardinal directions
    let latDirection = latDegree < 0 ? "S" : "N"
    let lonDirection = lonDegree < 0 ? "W" : "E"

    return `${latDegree}°${latMinute}'${latDirection}, ${lonDegree}°${lonMinute}'${lonDirection}`
}