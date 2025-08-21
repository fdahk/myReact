/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
    const toBe = (v) => {
        if(val === v) return true
        else{
            throw new Error("Not Equal")
        }
    }
    const notToBe = (v) => {
        if(val !== v) return true
        else{
            throw new Error("Equal")
        }
    }

    return {toBe, notToBe}
};