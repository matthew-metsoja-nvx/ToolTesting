// This function removes bad characters from the data
let removeBadCharacters = function() {
        // check for data
           // Get the original data from the input box and split it into lines
        let origData = document.getElementById('origData').value.split('\n');

        // Define the bad characters and what to replace them with
        const badchars = {
            "precedingComma": {
                regEx: /\t,/g, // Find tabs followed by commas
                replaceWith: "\t" // Replace with just a tab
            },
            "endingComma": {
                regEx: /,\t/g, // Find commas followed by tabs
                replaceWith: "\t" // Replace with just a tab
            },
            "endingHyphen": {
                regEx: /-\t/g, // Find hyphens followed by tabs
                replaceWith: "\t" // Replace with just a tab
            },

           // THESE TWO WORK? (we need to check if the ones above work and add some more stuff 😉)
            "doubleQuote": {
                regEx: /"/g, // Find double quotes
                replaceWith: "" // Replace with nothing (remove them)
            },
            "semiColon": {
                regEx: /;/g, // Find semicolons
                replaceWith: "" // Replace with nothing (remove them)
            }
       };
       // Function to clean data by replacing bad characters
       const cleanData = origData.map(line => {
           for (let key in badchars) {
               line = line.replace(badchars[key].regEx, badchars[key].replaceWith);
           }
           return line;
       });
         // Update the output box with the cleaned data
       document.getElementById('updatedOutput').value = cleanData.join('\n');
}

// This function fixes errors by adding spaces to certain lines
let fixErrors = function () {
    // Get the original data and error messages from the input boxes
    let origData = document.getElementById('origData').value.split('\n');
    let errMessages = document.getElementById('errData').value.split('\n');

      // Make a copy of the original data
    let updatedData = [...origData];

     // For each error message, find the line number and add a space to that line
    errMessages.forEach(message => {
        const lineNumber = parseInt(message.match(/\d+/)[0]);
        if (lineNumber && origData[lineNumber]) {
            updatedData[lineNumber] += ' ';
        }
    });

     // Update the output box with the fixed data
    document.getElementById('updatedOutput').value = updatedData.join('\n');
}


// This function does both: removes bad characters and fixes errors
let fixAndRemove = function () {
    // Get the original data from the input box and split it into lines
    let origData = document.getElementById('origData').value.split('\n');

    // Define the bad characters and what to replace them with
    const badchars = {
        "precedingComma": {
            regEx: /\t,/g, // Find tabs followed by commas
            replaceWith: "\t" // Replace with just a tab
        },
        "endingComma": {
            regEx: /,\t/g, // Find commas followed by tabs
            replaceWith: "\t" // Replace with just a tab
        },
        "endingHyphen": {
            regEx: /-\t/g, // Find hyphens followed by tabs
            replaceWith: "\t" // Replace with just a tab
        },
        // THESE TWO WORK? (we need to check if the ones above work and add some more stuff 😉)
        "doubleQuote": {
            regEx: /"/g, // Find double quotes
            replaceWith: "" // Replace with nothing (remove them)
        },
        "semiColon": {
            regEx: /;/g, // Find semicolons
            replaceWith: "" // Replace with nothing (remove them)
        }
    };

     // Clean the data by replacing bad characters
    const cleanData = origData.map(line => {
        for (let key in badchars) {
            line = line.replace(badchars[key].regEx, badchars[key].replaceWith);
        }
        return line;
    });

    // Get the error messages from the input box
    let errMessages = document.getElementById('errData').value.split('\n');

       // Make a copy of the cleaned data
    let updatedData = [...cleanData];
    
      // For each error message, find the line number and add a space to that line
    errMessages.forEach(message => {
        const lineNumber = parseInt(message.match(/\d+/)[0]);
        if (lineNumber && cleanData[lineNumber]) {
            updatedData[lineNumber] += ' ';
        }
    });

   // Update the output box with the cleaned and fixed data
    document.getElementById('updatedOutput').value = updatedData.join('\n');
};



// submit button
// When the "Remove Bad Characters" button is clicked, run the removeBadCharacters function
document.querySelector("#removeBadChar").addEventListener("click", function() {
    console.log("hello");
    removeBadCharacters();
});


// When the "Fix Errors" button is clicked, run the fixErrors function
// Add spaces to end of lines that EPAdmin calls out when validating the LDB info
document.querySelector("#fixErrors").addEventListener("click", function() {
    console.log("hello");
    fixErrors();
});


// Do both things
// When the "Fix and Remove" button is clicked, run the fixAndRemove function
document.querySelector("#fixAndRemove").addEventListener("click", function() {
    console.log("hello");
    fixAndRemove();
});





