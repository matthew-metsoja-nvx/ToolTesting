let removeBadCharacters = function() {
        // check for data
        let origData = document.getElementById('origData').value.split('\n');

        // Define bad characters and their replacements
        const badchars = {
           "precedingComma": {
               regEx: /\t,/g,
               replaceWith: "\t"
           },
           "endingComma": {
               regEx: /,\t/g,
               replaceWith: "\t"
           },
           "endingHyphen": {
              regEx: /-\t/g,
              replaceWith: "\t"
           },
          // THESE TWO WORK
           "doubleQuote": {
               regEx: /"/g,
               replaceWith: ""
           },
           "semiColon": {
               regEx: /;/g,
               replaceWith: ""
           }
       };
       // Function to clean data
       const cleanData = origData.map(line => {
           for (let key in badchars) {
               line = line.replace(badchars[key].regEx, badchars[key].replaceWith);
           }
           return line;
       });
       // Update the output
       document.getElementById('updatedOutput').value = cleanData.join('\n');
}


let fixErrors = function () {
    // check for data
    let origData = document.getElementById('origData').value.split('\n');
    let errMessages = document.getElementById('errData').value.split('\n');

    let updatedData = [...origData];

    errMessages.forEach(message => {
        const lineNumber = parseInt(message.match(/\d+/)[0]);
        if (lineNumber && origData[lineNumber]) {
            updatedData[lineNumber] += ' ';
        }
    });

    document.getElementById('updatedOutput').value = updatedData.join('\n');
}


let fixAndRemove = function () {

    // check for data
    let origData = document.getElementById('origData').value.split('\n');

    // Define bad characters and their replacements
    const badchars = {
        "precedingComma": {
            regEx: /\t,/g,
            replaceWith: "\t"
        },
        "endingComma": {
            regEx: /,\t/g,
            replaceWith: "\t"
        },
        "endingHyphen": {
            regEx: /-\t/g,
            replaceWith: "\t"
        },
        // THESE TWO WORK
        "doubleQuote": {
            regEx: /"/g,
            replaceWith: ""
        },
        "semiColon": {
            regEx: /;/g,
            replaceWith: ""
        }

    };
    // Function to clean data
    const cleanData = origData.map(line => {
        for (let key in badchars) {
            line = line.replace(badchars[key].regEx, badchars[key].replaceWith);
        }
        return line;
    });

    let errMessages = document.getElementById('errData').value.split('\n');

    let updatedData = [...cleanData];
    
    errMessages.forEach(message => {
        const lineNumber = parseInt(message.match(/\d+/)[0]);
        if (lineNumber && cleanData[lineNumber]) {
            updatedData[lineNumber] += ' ';
        }
    });

    document.getElementById('updatedOutput').value = updatedData.join('\n');
};



// submit button
document.querySelector("#removeBadChar").addEventListener("click", function() {
    console.log("hello");
    removeBadCharacters();
});


// Add spaces to end of lines that EPAdmin calls out when validating the LDB info
document.querySelector("#fixErrors").addEventListener("click", function() {
    console.log("hello");
    fixErrors();
});


// Do both things
document.querySelector("#fixAndRemove").addEventListener("click", function() {
    console.log("hello");
    fixAndRemove();
});





