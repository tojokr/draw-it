class Utils {
    static objectToArray(obj) {
        var arr = [];

        if (typeof obj !== 'object') {
            throw new Exception('Not an object');
        }

        for (var i in obj) {
            arr[i] = obj[i];
        }
        return arr;
    }
}