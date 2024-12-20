function meanderingArray(array) {
    let order = array.sort((a, b) => b - a);
    let newArray = [];

    for (let i = 0; i < order.length; i++) {
        if (i % 2 === 0) {
            newArray.push(order[i / 2]);
        } else {
            newArray.push(order[order.length - 1 - Math.floor(i / 2)]);
        }
    }

    console.log(newArray);
}

meanderingArray([5, 2, 7, 8, -2, 25, 25]);
