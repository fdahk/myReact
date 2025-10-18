/**
 * @param {string} word
 * @return {number}
 */
var numberOfSpecialChars = function(word) {
    const low = {} 
    const up = {}
    const res = {}
    let i; 
    for(i of word) {
        if(i >= 'a' && i <= 'z' && !up[i.toUpperCase()] ) {
            low[i] = true 
        }
        else if(i >= 'A' && i <= 'Z') {
            up[i] = true
            if(low[i.toLowerCase()] && low[i.toLowerCase()] !== false) {
                res[i] = true
            }
        } 
        else if(i >= 'a' && i <= 'z' && up[i.toUpperCase()]) {
            res[i] = false
        }
    }
    return Object.keys(res).length
};