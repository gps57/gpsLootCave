// This is where the main JavaScript code will live.

// process button click
$("#doLootCaveBtn").on("click", function () {
    // Get list of numbers entered by user
    let inputString = document.getElementById("numListInput").value;

    // clean up input string by removing all letters, special characters and white spaces, but leave the comma
    let workingString = inputString.replace(/[^0-9/,]/g, '');

    // convert this string of numbers into an array of numbers
    inputNumArray = workingString.split(',').map(Number);

    let mostLoot = 0;
    let numberOfCaves = inputNumArray.length;

    for (let i = 0; i < numberOfCaves; i++) {
        let newArray = shaveArray(inputNumArray, i);
        let newMax = findMaxLoot(newArray);
        if (newMax > mostLoot) {
            mostLoot = newMax;
        }

    }

    // starting from the first cave.
    // mostLoot = findMaxLoot(inputNumArray);

    // but what if I start from the second, or third, or some other cave?


    outArea = document.getElementById("outArea").innerHTML = `The maximum loot you can harvest from these caves is ${mostLoot}.`
});

function findMaxLoot(array) {
    let loopLoot = 0;
    let maxLoot = 0;
    let nextStart = 0;

    for (let i = 0; i < array.length; i++) {
        loopLoot += array[i];
        if (loopLoot > maxLoot) {
            maxLoot = loopLoot;
            // ok, I looted this cave.  What is the next best cave too loot.
            // I know it can't be the adjacent one, so increment past that one.
            nextStart = i + 2;

            // now, of the remaining caves, which one is largest?
            // build a sub array of the remaining caves
            let newArray = shaveArray(array, nextStart);

            // now, in this new array, where is the first largest number?
            let subMaxIndex = getIndexOfMax(newArray);

            // now just continue the loop at the right location
            i = nextStart + subMaxIndex - 1; // -1 because when the loop continues, it will increment i by one.
            continue;
        }
    }

    return maxLoot;
}

function getIndexOfMax(array) {
    let maxIndex = 0;
    let maxNum = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] > maxNum) {
            maxNum = array[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}

// ===== function shaveArray =====
// Given an array, this returns a new array with the first element removed.
// The original array is not altered.
function shaveArray(array, howMany) {
    if (howMany == 0) {
        return array;
    }

    let shavedArray = [];
    let shavedArraySize = array.length - howMany;

    for (let i = 0; i < shavedArraySize; i++) {
        shavedArray[i] = array[i + howMany];
    }

    return shavedArray;
}

