/**
 * @param {number[]} pizzas
 * @return {number}
 */
var maxWeight = function(pizzas) {
    let ans = 0
    pizzas.sort((a, b) => a - b)
    console.log(pizzas)
    let tp = pizzas.length / 4
    for(let i = 0; i < Math.ceil(tp/2); i++) {

        ans += pizzas[pizzas.length - 1 - i]
    }
    for(let i = 1; i <= Math.floor(tp/2); i++) {
        ans += pizzas[pizzas.length - 1 - tp - i*2 + 1]
    }
    return ans
};