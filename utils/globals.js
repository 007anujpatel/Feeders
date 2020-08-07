JSON.parseJSON = function (obj) {
    try {
        return JSON.parse(obj);
    }
    catch (err){
        return obj;
    }
};