function maximumOccurringCharacter(array) {
    let order = array.sort((a, b) => a - b);
    let newArray = [];

    return console.log(array);

    console.log(newArray);
}

maximumOccurringCharacter([5, 2, 7, 8, -2, 25, 25]);

function maximumOccurringCharacter(text) {
    let stringToArray = text.split("");
    let oder = stringToArray.sort();
    let result = { l: "", n: 0 };
    let cont = 1;
    for (let i = 0; i < oder.length; i++) {
        if (oder[i] === oder[i - 1]) {
            cont = cont + 1;
            if (cont > result.n) {
                result = { l: oder[i], n: cont };
            }
        } else {
            cont = 1;
        }
    }
    return result.l;
}

maximumOccurringCharacter("helloworld");
