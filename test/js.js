/**
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function(nums) {
    const set = new Set(nums);
    let best = 0;

    for (const n of set) {
        if (set.has(n - 1)) continue; // not a sequence start
        let len = 1;
        while (set.has(n + len)) len++;
        if (len > best) best = len;
    }

    return best;
};