import jsSHA from 'jssha';

export const GetAuthorizationHeader = () => {
    //  填入自己 ID、KEY 開始
    let AppID = '2db62364b8cc45119ba7a9c97c74cfe0';
    let AppKey = 'i7UmCAqBwc6Bj9n1Jy6AHgMv6SI';
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization =
        'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
    return { Authorization: Authorization, 'X-Date': GMTString };
};

/**
 * 取得自行車路線資料
 */

export const fetchRoutesData = (city) => {
    const cityURL = `https://ptx.transportdata.tw/MOTC/v2/Cycling/Shape/` + city + `?`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: GetAuthorizationHeader(),
    };

    return fetch(cityURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => console.log('error', error));
};

/**
 * 取得定位周邊自行車站
 */
export const fetchNearByStation = (longitude, latitude) => {
    const StationNearbyURL = `https://ptx.transportdata.tw/MOTC/v2/Bike/Station/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: GetAuthorizationHeader(),
    };

    return fetch(StationNearbyURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => console.log('error', error));
};

/**
 * 取得定位周邊自行車站車況
 */
export const fetchAvailableBike = (longitude, latitude) => {
    const StationNearbyURL = `https://ptx.transportdata.tw/MOTC/v2/Bike/Availability/NearBy?$spatialFilter=nearby(${latitude},${longitude},500)`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: GetAuthorizationHeader(),
    };

    return fetch(StationNearbyURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result, 'result');
            return result;
        })
        .catch((error) => console.log('error', error));
};

/**
 * 取得周邊景點資料
 */
export const fetchNearbyScenicSpot = (longitude, latitude) => {
    const ScenicSpotNearbyURL = `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$spatialFilter=nearby(${latitude},${longitude},1000)&$format=JSON`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: GetAuthorizationHeader(),
    };

    return fetch(ScenicSpotNearbyURL, requestOptions)
        .then((response) => response.json())
        .then((result) => {
            return result;
        })
        .catch((error) => console.log('error', error));
};
