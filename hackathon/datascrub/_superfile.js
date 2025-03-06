var common = {
    // This is a list of languages with their IDs and names
    LanguageID: {
        en: {id: 0, lang: "English", trans: "English"},
        ar: {id: 22, lang: "Arabic", trans: "Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©"},
        hy: {id: 43, lang: "Armenian", trans: "Õ€Õ¡ÕµÕ¥Ö€Õ¥Õ¶"},
        bg: {id: 28, lang: "Bulgarian", trans: "Ð‘ÑŠÐ»Ð³Ð°Ñ€ÑÐºÐ¸"},
        zhs: {id: 24, lang: "Chinese (Simplified)", trans: "æ±‰è¯­[S]"},
        zh: {id: 3, lang: "Chinese (Traditional)", trans: "æ±‰è¯­"},
        hr: {id: 40, lang: "Croatian", trans: "Hrvatski"},
        cs: {id: 20, lang: "Czech", trans: "CeÅ¡tina"},
        da: {id: 18, lang: "Danish", trans: "Dansk"},
        nl: {id: 19, lang: "Dutch", trans: "Nederlands"},
        et: {id: 47, lang: "Estonian", trans: "Eesti"},
        fil: {id: 35, lang: "Filipino", trans: "Filipino"},
        fi: {id: 15, lang: "Finnish", trans: "Suomi"},
        frca: {id: 27, lang: "French (Canada)", trans: "FranÃ§ais (Canada)"},
        fr: {id: 16, lang: "French (France)", trans: "FranÃ§ais (France)"},
        de: {id: 7, lang: "German", trans: "Deutsch"},
        gr: {id: 29, lang: "Greek", trans: "ÎµÎ»Î»Î·Î½Î¹ÎºÎ¬"},
        he: {id: 17, lang: "Hebrew", trans: "×¢×‘×¨×™×ª"},
        hi: {id: 25, lang: "Hindi", trans: "à¤¹à¤¿à¤‚à¤¦à¥€"},
        hmn: {id: 45, lang: "Hmong", trans: "Hmoob"},
        hu: {id: 9, lang: "Hungarian", trans: "Magyar"},
        id: {id: 21, lang: "Indonesian", trans: "Indonesia"},
        it: {id: 10, lang: "Italian", trans: "Italiano"},
        ja: {id: 4, lang: "Japanese", trans: "æ—¥æœ¬èªž"},
        kn: {id: 58, lang: "Kannada", trans: "à²•à²¨à³à²¨à²¡"},
        ko: {id: 5, lang: "Korean", trans: "í•œ ê¸€"},
        lv: {id: 53, lang: "Latvian", trans: "LatviaÅ¡u"},
        lt: {id: 11, lang: "Lithuanian", trans: "LietuviÅ¡kai"},
        ms: {id: 36, lang: "Malay", trans: "Bahasa Melayu"},
        ml: {id: 39, lang: "Malayalam", trans: "à´®à´²à´¯à´¾à´³à´‚"},
        mr: {id: 38, lang: "Marathi", trans: "à¤®à¤°à¤¾à¤ à¥€"},
        mn: {id: 33, lang: "Mongolian", trans: "ÐœÐ¾Ð½Ð³Ð¾Ð»"},
        no: {id: 14, lang: "Norwegian", trans: "Norsk"},
        pl: {id: 8, lang: "Polish", trans: "Polski"},
        pt: {id: 6, lang: "Portuguese", trans: "PortuguÃªs"},
        ro: {id: 31, lang: "Romanian", trans: "RomÃ¢nÄƒ"},
        ru: {id: 12, lang: "Russian", trans: "Ð ÑƒÑÑÐºÐ¸Ð¹"},
        sr: {id: 42, lang: "Serbian", trans: "CÑ€Ð¿ÑÐºÐ¸"},
        sk: {id: 52, lang: "Slovak", trans: "SlovenÄina"},
        es: {id: 2, lang: "Spanish", trans: "EspaÃ±ol"},
        ke: {id: 30, lang: "Swahili", trans: "Kiswahili"},
        sv: {id: 13, lang: "Swedish", trans: "Svenska"},
        th: {id: 23, lang: "Thai", trans: "à¹„à¸—à¸¢"},
        tr: {id: 32, lang: "Turkish", trans: "TÃ¼rkÃ§e"},
        uk: {id: 41, lang: "Ukrainian", trans: "YÐºÑ€Ð°Ñ—Ð½ÑŒÑÐºÐ°"},
        vi: {id: 34, lang: "Vietnamese", trans: "TiÃªÌng ViÃªÌ£t"},
        xh: {id: 59, lang: "Xhosa", trans: "isiXhosa"},
        zu: {id: 37, lang: "Zulu", trans: "isiZulu"},
        ht: {id: 49, lang: "Haitian (Creole)", trans: "KreyÃ²l ayisyen"},
        kk: {id: 55, lang: "Kazakh", trans: "ÒšÐ°Ð·Ð°Ò› Ñ‚Ñ–Ð»Ñ–"},
        mk: {id: 48, lang: "Macedonian", trans: "ÐœÐ°ÐºÐµÐ´Ð¾Ð½ÑÐºÐ¸"},
        pteu: {id: 56, lang: "Portuguese (European Union)", trans: "PortuguÃªs (European Union)"},
        sl: {id: 50, lang: "Slovenian", trans: "SlovenÅ¡Äina"},
        eseu: {id: 57, lang: "Spanish (European Union)", trans: "EspaÃ±ol (European Union)"},
        ur: {id: 51, lang: "Urdu", trans: "â€«Ø§Ø±Ø¯Ùˆ"},
        ptpt: {id: 54, lang: "Portuguese (Portugal)", trans: "PortuguÃªs"},
        esmx: {id: 44, lang: "Spanish (Mexico)", trans: "EspaÃ±ol (MÃ©xico)"},
        ja_1: {id: 46, lang: "Japanese (Sojitz Only)", trans: "æ—¥æœ¬èªž (Sojitz Only)"},
        enuk: {id: 26, lang: "English (UK)", trans: "English (UK)"},
        zz22: {id: 58, lang: "Placeholder 022", trans: "Placeholder 022"},
        zz23: {id: 59, lang: "Placeholder 023", trans: "Placeholder 023"},
        zz24: {id: 60, lang: "Placeholder 024", trans: "Placeholder 024"},
        zz25: {id: 61, lang: "Placeholder 025", trans: "Placeholder 025"},
        zz26: {id: 62, lang: "Placeholder 026", trans: "Placeholder 026"}
    },

  // Start a new function that sets up our language tools
    init: function() {
        // Find all HTML elements with the tag name 'samp' and store them in variable 'c'
        var c = document.getElementsByTagName("samp");
        
        // Loop through each 'samp' element we found
        for (var i = 0; i < c.length; i++) {
            // Create a new function that takes each element (we call it 'obj')
            (function(obj) {
                // Change the mouse cursor to a help icon when hovering over the parent element
                obj.parentNode.style.cursor = "help";
                
                // When the mouse moves over the parent element...
                obj.parentNode.onmouseover = function() {
                    // Add the 'hover' class to our element
                    common.classAdd("hover", obj);
                }
                
                // When the mouse moves away from the parent element...
                obj.parentNode.onmouseout = function() {
                    // Remove the 'hover' class from our element
                    common.classRemove("hover", obj);
                }
            })(c[i]); // Pass the current element to our function
        }

        // Find all elements with class "LanguageIDName" and store them in 'c'
        var c = common.C("LanguageIDName");
        
        // Loop through each element we found
        for (var i = 0; i < c.length; i++) {
            // For each language in our list of languages...
            for (var x in common.LanguageID) {
                // Create a new 'option' element for a dropdown menu
                var t = document.createElement("option");
                // Set the value of this option to the language name
                t.value = common.LanguageID[x].lang;
                // Set the text that shows up in the dropdown to the language name
                t.innerHTML = common.LanguageID[x].lang;
                // Add this new option to our dropdown menu
                c[i].appendChild(t);
            }
        }

        // Find all elements with class "LanguageIDCode" and store them in 'c'
        var c = common.C("LanguageIDCode");
       
        // Loop through each element we found
        for (var i = 0; i < c.length; i++) {
            // For each language in our list...
            for (var x in common.LanguageID) {
                // Create a new dropdown option
                var t = document.createElement("option");
                // Set the value to the language code (like 'en' for English)
                t.value = x;
                // Set the display text to the full language name
                t.innerHTML = common.LanguageID[x].lang;
                // Add this option to the dropdown
                c[i].appendChild(t);
            }
        }

        // Find all elements with class "LanguageID" and store them in 'c'
        var c = common.C("LanguageID");
        
        // Loop through each element
        for (var i = 0; i < c.length; i++) {
            // For each language in our list...
            for (var x in common.LanguageID) {
                // Create a new dropdown option
                var t = document.createElement("option");
                // Set the value to the language's ID number
                t.value = common.LanguageID[x].id;
                // Set the display text to the language name
                t.innerHTML = common.LanguageID[x].lang;
                // Add this option to the dropdown
                c[i].appendChild(t);
            }
        }
    },

    // This function looks through a page to find elements with a specific class name
    C: function(cls, elm) {
        // If no specific place to look was given, look through the whole page
        if (!elm) elm = document;
        
        // If the browser has a built-in way to find elements by class name, use that
        if (document.getElementsByClassName) {
            return elm.getElementsByClassName(cls);
        } 
        else {
            // If the browser doesn't have that built-in tool:
            var t = [];  // Create an empty array to store what we find
            var o = elm.getElementsByTagName("*");  // Get ALL elements on the page
            var r = new RegExp("(^|\\s)" + cls + "($|\\s)");  // Create a pattern to match
            // Look at each element one by one
            for (var i = 0; i < o.length; i++) {
                // If the element has the class we're looking for, add it to our array
                if (o[i].className.match(r)) t.push(o[i]);
            }
            return t;  // Give back the box with everything we found
        }
    },

   // This function checks if something has a specific class name
    // NOTE: This function isn't being used anywhere in the code!
    classHas: function(obj, cls) {
        // Look for the class name and return true if found, false if not
        if (obj.className.match(new RegExp("(^|\\s)" + cls + "(\\s|$)", "g"))) return true;
        else return false;
    },

    // This function adds a class name to something
    classAdd: function(cls, obj) {
        // Add the new class name with a space before it
        obj.className += " " + cls;
    },

    // This function removes a class name from something
    classRemove: function(cls, obj) {
        // Create a pattern to find the class name
        var r = new RegExp("(^|\\s)" + cls + "($|\\s)");
        // Remove the class name and replace it with a space
        obj.className = obj.className.replace(r, " ");
    },

    // This function prevents duplicates in our list
    arrayUnique: function(arr, field, simple) {
        // Create an empty array to store unique items
        var t = [];  

        // Start a loop with a label 'label' - this lets us break out of nested loops
        label: for (var i = 0; i < arr.length; i++) {
            // For each item in the input array, look through our unique array
            for (var j = 0; j < t.length; j++) {
                
                // Case 1: If we're in simple mode and the item has the field we're checking
                if (simple && arr[i][field]) {
                    // If we find a match, skip to the next item in the outer loop
                    if (arr[i][field] == t[j]) continue label;
                } 
                
                // Case 2: If we're not in simple mode and the item has the field we're checking
                else if (!simple && arr[i][field]) {
                    // If the fields match, skip to the next item in the outer loop
                    if (arr[i][field] == t[j][field]) continue label;
                } 
                
                // Case 3: If we're not in simple mode and the item doesn't have the field
                else if (!simple && !arr[i][field]) {
                    // If the items themselves match, skip to the next item in the outer loop
                    if (arr[i] == t[j]) continue label;
                } 
                
                // Case 4: If the field is empty
                else if (arr[i][field] === "") {
                    // If both fields are empty, skip to the next item in the outer loop
                    if (arr[i][field] === t[j]) continue label;
                } 
                
                // Case 5: If the item itself is empty
                else if (arr[i] === "") {
                    // If both items are empty, skip to the next item in the outer loop
                    if (arr[i] === t[j]) continue label;
                }
            }

            // If we get here, we didn't find a match, so add the item to our unique array
            if (simple) {
                // In simple mode, just add the field value if it's a string, otherwise add the whole item
                t.push(typeof arr[i][field] == "string" ? arr[i][field] : arr[i]);
            } else {
                // In normal mode, add the whole item
                t.push(arr[i]);
            }
        }
        
        // Return our array of unique items
        return t;
    },

    /*  Key concepts  ===
The label: keyword creates a named loop that we can reference
continue label jumps back to the start of the labeled loop
The function handles 5 different cases for comparing items
The simple parameter determines if we store just the field values or whole objects
The nested loops compare each item against all items we've already kept



== Simple mode example
var data = [
    {name: "John"},
    {name: "John"},  // This duplicate won't be included
    {name: "Jane"}
];
arrayUnique(data, "name", true); // Returns ["John", "Jane"]

== Normal mode example
var data = [
    {id: 1, name: "John"},
    {id: 1, name: "John"},  // This duplicate won't be included
    {id: 2, name: "Jane"}
];
arrayUnique(data, "id", false); // Returns the full objects, without duplicates

*/

    // This function removes extra spaces from the beginning and end of text
    trim: function(data) {
        // Take the input text (data) and:
        // - /^\s+/ finds any whitespace at the start (^)
        // - |\s+$/ finds any whitespace at the end ($)
        // - replace these matches with nothing ('')
        data = data.replace(/^\s+|\s+$/, '');
        // Give back the cleaned up text
        return data;
    },

    load: function(url, fn) {
        // Create a variable to store our connection to the internet
        var http = null;

        // Try to create a connection using the modern way
        try {
            // XMLHttpRequest is like a telephone that can call the internet
            http = new XMLHttpRequest();
        } catch (e) {
            // If the modern way didn't work, try an older way (for Internet Explorer)
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                // If that didn't work either, try an even older way
                http = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }

        // If we couldn't connect at all, show an error message
        if (http == null) {
            alert("ERROR");
        } else {
            // When we get a response from the internet...
            http.onreadystatechange = function() {
                // Run the function that was passed to us (fn)
                fn(http);
            }

            // If the browser can handle special characters
            if (http.overrideMimeType) {
                // Tell it how to read special characters
                http.overrideMimeType('text/xml; charset=iso-8859-1');
            }

            // Start the connection and send the request
            http.open("GET", url, true);
            http.send(null);
        }
    },


       // This function finds a special window inside our webpage
       frame: function() {
        // Find the first iframe (a webpage inside our webpage) and store it
        var frame = document.getElementsByTagName("iframe")[0];
        
        // Get either the content window or content document of the iframe
        var doc = frame.contentWindow || frame.contentDocument;
        
        // If we got the content window, get its document
        if (doc.document) doc = doc.document;
        
        // Give back what we found
        return doc;
    }
}

// When the webpage first loads, start setting everything up
window.onload = function() {
    // Run the initialization function we defined earlier
    common.init();
}

// This is the main object that does all the work
var APP = {
    // These are empty lists where we will store different things
    oArr: [],
    report: [],
    corrections: [],
    abbreviations: [],
    logDuplicate: [],
    logVariation: [],
    logDP: [],
    logTier: [],
    logBadchar: [],
    logSanctionedCountry: [],
    cid: window.location.search,
    tiers: "",

    // This function starts the process
    go: function() {
        // Load the data from the input box
        common.load(document.getElementsByTagName("input")[0].value, function(http) {
            if (http.readyState == 4) {
                // Clear all the lists
                APP.oArr = [];
                APP.csArr = [];
                APP.report = [];
                APP.corrections = [];
                APP.abbreviations = [];
                APP.logDuplicate = [];
                APP.logSanctionedCountry = [];
                APP.logVariation = [];
                APP.logDP = [];
                APP.logTier = [];
                APP.logBadchar = [];

                // Get the data and split it into rows
                var rawData = http.responseText.replace(/[\n\r\s]+$/, "");
                var rows = rawData.split("\r\n");
                var headers = rows[0].split("\t");

                // Go through each row and make an object for each one
                for (var i = 1; i < rows.length; i++) {
                    var o = {};
                    var r = rows[i].split("\t");
                    for (var h = 0; h < headers.length; h++) {
                        o[headers[h].toLowerCase()] = r[h] || "";
                    }
                    APP.oArr.push(o);
                }
                // Check the data we just loaded
                APP.check(APP.oArr);
            }
        });
    },

    // This function adds spaces to the content in the input area
    addSpaces: function() {
        var content = document.getElementById('input-area').value;
        var withSpaces = content.split('\n');
        for (r = 1; r < withSpaces.length; r++) {
            function removeSpace() {
                if (withSpaces[r][withSpaces[r].length - 1] == " ") {
                    console.log('end space');
                    withSpaces[r] = withSpaces[r].slice(0, -1);
                    removeSpace();
                }
            }
        }
        var postContent = withSpaces.join('\n');
        document.getElementById('input-area').value = postContent;
    },

    // This function copies settings from another place
    copySettings: function() {
        console.log('click');
        var frameShort = $('iframe')[0];
        $('#redirectInput').val('loading...');
        var server = "com";
        if (APP.cid.search('server=eu') > -1) {
            server = "eu";
        }
        $('iframe')[0].src = "https://secure.ethicspoint." + server + "/domain/administration/client_admin_child_settings.asp" + APP.cid;
        $(frameShort).on('load', function() {
            setTimeout(function() {
                console.log('boom');
                var frameTarget = APP.frame();
                var copyText = APP.frame().getElementsByTagName('td')[3].innerText.split('Select None')[1];
                $('#redirectInput').val(copyText);
            }, 500)
        })
    },

    // This function corrects the data
    correct: function() {
        APP.oArr = [];
        APP.csArr = [];
        APP.report = [];
        APP.corrections = [];
        APP.abbreviations = [];
        APP.logDuplicate = [];
        APP.logSanctionedCountry = [];
        APP.logVariation = [];
        APP.logDP = [];
        APP.logTier = [];
        APP.logBadchar = [];
        APP.sanitizedOutput = [];
        var pasteData = document.getElementById("input-area").value.replace(/[\n\r\s]+$/, "");
        var redirectData = document.getElementById("redirectInput").value;
        var redRows = redirectData.split("\n");
        var DPData = document.getElementById("DPInput").value;
        var DPRows = DPData.split("\n");
        var DPCountry = "";
        var DPFlag = "";
        var redLeft = "";
        var redRight = "";
        var redTemp = "";
        var cs = {};
        var dp = {};

        // This part handles the redirect client ID replacement
        if (!document.getElementsByName("redirect")[0].checked) {
            for (var j = 0; j < redRows.length; j++) {
                if (redRows[j]) {
                    redRows[j] = redRows[j].replace(/^\s*-\s*-\s*-\s*/, "");
                    redRows[j] = redRows[j].replace(/^\s*-\s*-\s*/, "");
                    redRows[j] = redRows[j].replace(/^\s*-\s*/, "");
                    redRows[j] = redRows[j].replace(/^\s*/, "");
                    redRows[j] = redRows[j].replace(/\s+\(#/, "|");
                    redLeft = redRows[j].split("|")[0];
                    redTemp = redRows[j].split("|")[1];
                    redRight = redTemp.replace(/\)+/, "");
                    redRows[j] = redLeft + "|" + redRight;
                    if (!document.getElementsByName("redirect")[1].checked) {
                        cs[redRows[j].split("|")[1]] = redRows[j].split("|")[0];
                    }
                    if (!document.getElementsByName("redirect")[2].checked) {
                        redRows[j] = redRows[j].toLowerCase();
                        cs[redRows[j].split("|")[0]] = redRows[j].split("|")[1];
                    }
                }
            }
        }

        // This part builds the data privacy array
        for (var d = 0; d < DPRows.length; d++) {
            if (DPRows[d]) {
                DPRows[d] = DPRows[d].replace(" : {", ":{");
                DPRows[d] = DPRows[d].replace(/^\s*"/, "");
                DPCountry = DPRows[d].split("\":{dp:")[0];
                DPCountry = DPCountry.replace(/\s\s*$/, '');
                DPFlag = DPRows[d].split("\":{dp:")[1];
                DPFlag = DPFlag.split("\,")[0];
                DPFlag = DPFlag.replace(/},+/, "");
                DPFlag = DPFlag.replace(/}+/, "");
                if (DPFlag == "true") {
                    DPFlag = "yes"
                } else {
                    DPFlag = "no"
                }
                dp[DPCountry] = DPFlag;
            }
        }

        // Check for bad characters in the data 👈
        if (pasteData.indexOf("\"") > -1) alert("There are quotes in the data that will not allow the script to parse the data correctly.  Correct data in text editor before using this script.");
        if (pasteData.indexOf(";") > -1) alert("There are semi-colons in the data that will not allow the script to parse the data correctly.  Correct data in text editor before using this script.");
        const nonLatinChars = /[^\u0000-\u007F\u0080-\u024F]/;

        if(pasteData.match(nonLatinChars)) alert('There are some Non-Latin/Foreign characters in the LDB. May need TS team upload LDB. Please review.');

         // Check for non-ANSI characters (characters above ASCII 255)
        const nonAnsiTest = /[^\x00-\xFF]/;

        if (nonAnsiTest.test(pasteData)) {
            alert("Warning: Non-ANSI characters detected. The file appears to be UTF-8/16 encoded. DO NOT UPLOAD!! Please save it in ANSI/ASCII format.");
        }

        var rows = pasteData.split("\n");

            // Process each row for 128 character length first
            for (var i = 0; i < rows.length; i++) {
                if (rows[i].length == 127) {
                    // If line starts with a number
                    if (/^\d+/.test(rows[i])) {
                        // Add space after the number
                        rows[i] = rows[i].replace(/^(\d+)/, '$1 ');

                        // update array so that we can output message in the 4th box (logDisplay function)
                        APP.sanitizedOutput.push(i);
                    }
                }
            }

        // Update the sanitized data textarea
        if(APP.sanitizedOutput.length > 0) document.getElementById("sanitizedData").value = rows.join("\n");

        rows[0] = rows[0].toLowerCase().replace('data privacy', 'dataprivacy');
        rows[0] = rows[0].replace('address 1', 'address1');
        rows[0] = rows[0].replace('tier name', 'redirectclientid');
        var headers = rows[0].split("\t");

         // Go through each row and make an object for each one
         for (var i = 1; i < rows.length; i++) {
            var o = {};
            var r = rows[i].split("\t");
            for (var h = 0; h < headers.length; h++) {
                if (headers[h] == "Data Privacy") {
                    headers[h] = "dataprivacy";
                }
                if (r[h]) {
                    r[h] = r[h].trim();
                }
                if (headers[h] == "counter") {
                    o[headers[h].toLowerCase()] = i.toString();
                } else {
                    if (headers[h] && headers[h].toLowerCase() != "dataprivacy" && config.rules.duplicates.indexOf(headers[h].toLowerCase()) == -1) {
                        alert("Invalid column header detected: (" + headers[h] + ")");
                        return;
                    }
                    if (headers[h] == "redirectclientid") {
                        r[h] = r[h].trim();
                        r[h] = r[h].toLowerCase();
                    }
                    o[headers[h].toLowerCase()] = r[h] || "";
                }
                if (headers[h] == "redirectclientid" && !document.getElementsByName("redirect")[0].checked) {
                    if (cs[o[headers[h].toLowerCase()]]) {
                        o[headers[h].toLowerCase()] = cs[o[headers[h].toLowerCase()]];
                    }
                    if (!document.getElementsByName("redirect")[2].checked && !Number(o[headers[h]])) {
                        APP.logAdd(7, "", "", o[headers[h]]);
                    }
                    if (!document.getElementsByName("redirect")[1].checked && Number(o[headers[h]])) {
                        APP.logAdd(7, "", "", o[headers[h]]);
                    }
                }
            }
            APP.oArr.push(o);
        }
        APP.check(APP.oArr, dp);

    },

    // This function checks if an object is empty
    isEmpty: function(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    },

    // This function checks the data for problems
    check: function(obj, dpObj) {
        var dupeDataCounter = {}, duplicates = {}, variations = {}, tempabbr = {}, abbrfound = {}, countryObj = {};
        var usaArr = ["us", "usa", "united states", "united states of america", "u.s.", "u.s.a."];
        var dupeData = "";

        // Convert sanctioned countries list to lowercase
        config.rules.sanctionedCountries = config.rules.sanctionedCountries.map(country => country.toLowerCase());

        for (r in obj) {
            for (c in obj[r]) {
                if (c == "country" && !APP.isEmpty(dpObj)) {
                    countryObj[obj[r][c].replace(/\s\s*$/, '')] = "true";
                    if (dpObj[obj[r][c].replace(/\s\s*$/, '')]) {
                        if (obj[r]["dataprivacy"]) {
                            if (dpObj[obj[r][c]] != obj[r]["dataprivacy"].toLowerCase()) {
                                APP.logAdd(5, r, c, obj[r]["dataprivacy"]);
                            }
                        }
                    } else {
                        APP.logAdd(3, r, c);
                    }
                }

                if (c == "zip" || c == "postal code") {
                    if (obj[r]["country"]) {
                        if ((usaArr.indexOf(obj[r]["country"].toLowerCase()) >= 0) && obj[r][c].length == 4) {
                            APP.logAdd(4, r, c, "Leading zero missing");
                        }
                    }
                }

                if (c === "country") {
                    const formattedCountryName = obj[r].country.toLowerCase().replace(/ /g, " ").replace(/’/g, "'");
                    if (config.rules.sanctionedCountries.includes(formattedCountryName)) APP.logAdd(8, r, c, "Sanctioned country");
                }

                if (config.rules.badchars) {
                    for (e in config.rules.badchars) {
                        if (obj[r][c].match(config.rules.badchars[e])) {
                            APP.logAdd(4, r, c, e);
                        }
                    }
                }

                if (config.rules[c]) {
                    if (config.rules[c].variations) {
                        if (!variations[c]) variations[c] = {};

                        for (e in config.rules[c].variations) {
                            if (obj[r][c].match(config.rules[c].variations[e])) {
                                if (variations[c][obj[r][c].match(config.rules[c].variations[e])]) {
                                    variations[c][obj[r][c].match(config.rules[c].variations[e])]++; 
                                } else {
                                    variations[c][obj[r][c].match(config.rules[c].variations[e])] = 1;
                                }
                                APP.logAdd(2, r, c, e);
                            }
                        }
                    }

                    if (config.rules[c].badchars) {
                        for (e in config.rules[c].badchars) {
                            if (obj[r][c].match(config.rules[c].badchars[e])) {
                                APP.logAdd(4, r, c, e);
                            }
                        }
                    }

                    if (config.rules[c].abbreviations) {
                        if (!tempabbr[c]) {
                            tempabbr[c] = {};
                            abbrfound[c] = {};
                        }
                        tempabbr[c][obj[r][c]] = obj[r][c];

                        if (tempabbr[c][config.rules[c].abbreviations[obj[r][c]]] && tempabbr[c][obj[r][c]] && !abbrfound[c][obj[r][c]]) {
                            APP.abbreviationAdd(c, config.rules[c].abbreviations[obj[r][c]], tempabbr[c][obj[r][c]]);
                            abbrfound[c][obj[r][c]] = true;
                        }
                    }
                }
            }

            if (config.rules.duplicates) {
                dupeData = "";
                for (var f = 0; f < config.rules.duplicates.length; f++) {
                    dupeData += " - " + obj[r][config.rules.duplicates[f]];
                }
                if (duplicates[dupeData]) {
                    APP.logAdd(1, r, c, dupeDataCounter[dupeData]);
                } else {
                    duplicates[dupeData] = true;
                    dupeDataCounter[dupeData] = obj[r]["counter"];
                }
            }
        }

        for (d in dpObj) {
            if (!countryObj[d]) {
                APP.logAdd(6, r, c, d);
            }
        }
        APP.tabOutput(obj);
        if (!document.getElementsByName("child")[0].checked) {
            APP.childOutput(obj);
        }
        APP.correctionAdd(variations);
        APP.abbreviationDisplay();
        APP.logDisplay();
    },

    // This function outputs the data to a text area
    tabOutput: function(obj) {
        var output = "";
        for (h in obj[0]) {
            output += h + "\t";
        }
        output += "\n";
        for (r in obj) {
            for (c in obj[r]) {
                output += obj[r][c] + "\t";
            }
            output += "\n";
        }
        document.getElementById("input-area").value = output;
    },

    // This function creates separate windows for child tiers
    childOutput: function(obj) {
        var idCompile = "";
        var tempOut = "";
        var masterOut = "";
        var cOut = "";
        var cCounter = 1;
        var currentID = "";
        var finalIteration = obj.length - 1;
        obj.sort(function(a, b) {
            return a.redirectclientid - b.redirectclientid
        })
        for (r in obj) {
            if (obj[r].redirectclientid == currentID) {
                obj[r].counter = cCounter;
                for (c in obj[r]) {
                    cOut += obj[r][c] + "\t";
                }
                cOut += "\n";
                cCounter++;
                if (r == finalIteration) {
                    idCompile += currentID + "|";
                    tempOut += "<br /><br /><strong>" + currentID + "</strong><br /><textarea rows=\"8\" cols=\"205\" id=\"" + currentID + "\" wrap=\"off\" class=\"output\">" + cOut + "</textarea>";
                }
            } else {
                if (currentID) {
                    idCompile += currentID + "|";
                    tempOut += "<br /><br /><strong>" + currentID + "</strong><br /><textarea rows=\"8\" cols=\"205\" id=\"" + currentID + "\" wrap=\"off\" class=\"output\">" + cOut + "</textarea>";
                }
                currentID = obj[r].redirectclientid;
                cCounter = 1;
                obj[r].counter = cCounter;
                cOut = "";
                for (h in obj[0]) {
                    cOut += h + "\t";
                }
                cOut += "\n";
                for (c in obj[r]) {
                    cOut += obj[r][c] + "\t";
                }
                cOut += "\n";
                cCounter++;
                if (r == finalIteration) {
                    idCompile += currentID + "|";
                    tempOut += "<br /><br /><strong>" + currentID + "</strong><br /><textarea rows=\"8\" cols=\"205\" id=\"" + currentID + "\" wrap=\"off\" class=\"output\">" + cOut + "</textarea>";
                }
            }
            document.getElementById("input-area").innerHTML = tempOut;
        }
    },

    // This function creates a text file for a specific ID
    createTextFile: function(id) {
        var txtData = document.getElementById(id).innerHTML;
        var url = 'data:text/csv;charset=utf-8,' + escape(txtData);
        var downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = id + ".txt";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    },

    // This function creates text files for all IDs
    createTextFileAll: function(multID) {
        var idArr = multID.split("|");
        for (id in idArr) {
            var txtData = document.getElementById(idArr[id]).innerHTML;
            var url = 'data:text/csv;charset=utf-8,' + escape(txtData);
            var downloadLink = document.createElement("a");
            downloadLink.href = url;
            downloadLink.download = idArr[id] + ".txt";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    },

    // This function displays abbreviations
	abbreviationDisplay:function(){
		
		var abbr="Warnings: <br />";
		for(a in APP.abbreviations){
			abbr += APP.abbreviations[a];
		}		
		for(r in APP.corrections){
			abbr += APP.corrections[r];
		}
		document.getElementById("abbreviationDisplay").innerHTML = abbr;
	},
	abbreviationAdd:function(rule,abbr,full){
        // This function adds a message about abbreviations found
        APP.abbreviations.push("Both <strong>"+abbr+"</strong> and <strong>"+full+"</strong> were found in <span class='italic'>"+rule+"</span><BR />");
    },
    correctionAdd:function(variations){	
        // This function sorts and adds corrections
        var sortVariations = [];
        var sorted = {};
        for(v in variations){
            sortVariations = [];
            for(y in variations[v]){
                sortVariations.push([y, variations[v][y]])
                sortVariations.sort(function(a, b) {return b[1] - a[1]})						
            }
            for(x in sortVariations){
                if(!sorted[v]) sorted[v] = {};					
                sorted[v][sortVariations[x][0]] = sortVariations[x][1];
            }
        }
        for(s in sorted){
            for(c in sorted[s]){					
                APP.corrections.push("<span style='font-weight:bold;background:blue'>&nbsp;</span>There were <strong>"+sorted[s][c]+"</strong> occurance(s) of <span class='italic'>"+s+"</span>: <strong>"+c+"</strong>  <br />"); 
            }
        }
    },	
    logDisplay:function(){	
        // This function displays the log of errors
        document.getElementById("errorDisplay").innerHTML = "";
        var report = "";
        for(d in APP.logDuplicate){
            report += APP.logDuplicate[d];
        }
        for(b in APP.logBadchar){
            report += APP.logBadchar[b];
        }				
        for(i in APP.logDP){
            report += APP.logDP[i];
        }
        for(t in APP.logTier){
            report += APP.logTier[t];
        }
        for(z in APP.logSanctionedCountry){
            report += APP.logSanctionedCountry[z];
        }
        for(m in APP.sanitizedOutput){
            report += `Auto added a space to end of <b>line ${APP.sanitizedOutput[m]}</b> <br>` ;
        }
        
        document.getElementById("errorDisplay").innerHTML = report;
    },		
    logAdd:function(type,row,col,details){
        // This function adds a log entry
        var displayRow = parseInt(row)+1;
        tempDisplayRow = "\\r\\n"+displayRow+"\\t";
        if(row && col){
            var data = APP.oArr[row][col];
            var tempdata = "\\r\\n"+data+"\\t";
        }		
        var tempDetails = "";
        switch(type)
        {
        case 1:
            tempDetails = "\\r\\n"+details+"\\t";
            APP.logDuplicate.push("<span class='bold yellow'><a href=\"#\" onclick=\"find('"+tempDisplayRow+"');document.getElementById('input-area').focus();\">"+displayRow+"</a></span> :DUPLICATE of <strong><a href=\"#\" onclick=\"find('"+tempDetails+"');document.getElementById('input-area').focus();\">"+details+"</a></strong><br />");
            break;		
        case 2:
            APP.logVariation.push("<span class='bold cyan'><a href=\"#\" onclick=\"find('"+tempDisplayRow+"');document.getElementById('input-area').focus();\">"+displayRow+"</a></span> :variation in <span class='italic'>"+col+"</span>:  <strong><a href=\"#\" onclick=\"find('"+tempdata+"');document.getElementById('input-area').focus();\">"+data+"</a></strong><br />");
            break;
        case 3:
            APP.logDP.push("<span class='bold red'><a href=\"#\" onclick=\"find('"+tempDisplayRow+"');document.getElementById('input-area').focus();\">"+displayRow+"</a></span> :<span class='italic'>"+col+"</span> in LDB not found in the DP LIST:  <strong><a href=\"#\" onclick=\"find('"+tempdata+"');document.getElementById('input-area').focus();\">"+data+"</a></strong><br />");
            break;
        case 4:  
            APP.logBadchar.push("<span class='bold mint'><a href=\"#\" onclick=\"find('"+tempDisplayRow+"');document.getElementById('input-area').focus();\">"+displayRow+"</a></span> :<strong>"+details+"</strong> in <span class='italic'>"+col+"</span>:  <strong><a href=\"#\" onclick=\"find('"+data+"');document.getElementById('input-area').focus();\">"+data+"</a></strong><br />");
            break;
        case 5: //DP descrepancy
            APP.logDP.push("<span sclass='bold yellow''><a href=\"#\" onclick=\"find('"+tempDisplayRow+"');document.getElementById('input-area').focus();\">"+displayRow+"</a></span> :DATAPRIVACY descrepancy:  <strong><a href=\"#\" onclick=\"find('"+tempdata+"');document.getElementById('input-area').focus();\">"+data+"&nbsp;("+details+")</a></strong><br />");
            break;
        case 6: //Country not found in DP
            tempDetails = "<span class='bold red'>&nbsp;&nbsp;</span> :Extra/unused <span class='italic'>COUNTRY</span> found in DP LIST:  <strong><a href=\"#\" onclick=\"find('"+details+"');document.getElementById('input-area').focus();\">"+details+"</a></strong><br />";
            if(!APP.inArray(APP.logDP,tempDetails)) APP.logDP.push(tempDetails);			
            break;
        case 7: //REDIRECTCLIENTID 
            tempDetails = "<span class='bold oj'>&nbsp;&nbsp;</span> :<span class='italic'>REDIRECTCLIENTID</span> not translated:  <strong><a href=\"#\" onclick=\"find('"+details+"');document.getElementById('input-area').focus();\">"+details+"</a></strong><br />";			
            if(!APP.inArray(APP.logTier,tempDetails)) APP.logTier.push(tempDetails);			
            break;
        case 8: // Sanctioned countries
            APP.logSanctionedCountry.push("<span class='bold red''><a href=\"#\" onclick=\"find('"+tempDisplayRow+"');document.getElementById('input-area').focus();\">"+displayRow+"</a></span> : SANCTIONED COUNTRY:  <strong><a href=\"#\" onclick=\"find('"+tempdata+"');document.getElementById('input-area').focus();\">"+data+"</a></strong><br />");
            break;
        }
        
    },
    inArray: function(array, string) {
        // This function checks if a string is in an array
        for(var i=0;i<array.length;i++) {
            if (array[i] === string) return true;
        }
        return false;
    },
    frame: function() {
        // This function gets the document inside an iframe
        var frame = document.getElementsByTagName("iframe")[0];
        var doc = frame.contentWindow || frame.contentDocument;
        if(doc.document) doc = doc.document;
        return doc;
    }
}


window.addEventListener("load",APP.whenLoad);



var config = {
    rules: {
        // These are the fields we check for duplicates
        duplicates: ["name", "branch", "address1", "address2", "city", "state", "zip", "country", "region code", "misc 1", "misc 2", "redirectclientid", "violationpackageid", "custom field 1", "custom field 2", "custom field 3", "custom field 4", "custom field 5", "custom field 6"],

        //! These are rules for bad characters we don't want 👈
        badchars: {
            "preceding comma": /^\s*,/, // No comma at the start
            "ending comma": /,\s*$/, // No comma at the end
            "ending hyphen": /-\s*$/, // No hyphen at the end
            "preceding hyphen": /^\s*-/, // No hyphen at the start
            "double quote": "\"", // No double quotes
            "semi-colon": ";" ,// No semi-colons
            "opening square bracket": /\[/, // No opening square brackets
            "closing square bracket": /]/, // No closing square brackets
           
            "equals sign": /=/, // No equals signs
            "plus sign": /\+/, // No plus signs
            "asterisk": /\*/, // No asterisks
            "non-latin character": /[^\u0000-\u007F\u0080-\u024F]/, // Flags any non-Latin character
            "em dash (find/replace with a minus symbol)": /—/, // No em dashes
             // ! NOT WORKING
            // "line break": /[\r\n]+/gm, // Catches all types of line breaks with multiline flag
        },

        // These are countries we don't want to include
        sanctionedCountries: [
            "Cuba",
            "Iran",
            "Iran (Islamic Republic of)",
            "Iran, Islamic Republic of",
            "Islamic Republic of Iran",
            "North Korea",
            "Korea (North)",
            "Korea North",
            "Korea, DPR",
            "Korea, Dem. People's Rep of",
            "Korea, Dem. People's Rep. of",
            "Korea, Democratic People's Republic of",
            "Korea, North",
            "North Korea (Democratic People's Republic)",
            "Syria",
            "Syrian Arab Republic (Syria)",
            "Syrian Arab Republic",
        ],

        // These are rules for the "address1" field
        address1: {
            variations: {
                // These are different ways people might write "drive"
                " drive ": /\s+drive+\s/,
                " DRIVE ": /\s+DRIVE+\s/,
                " Drive ": /\s+Drive+\s/,
                " drive ": /\s+drive/,
                " DRIVE ": /\s+DRIVE/,
                " Drive ": /\s+Drive/,
                " Dr. ": /\s+Dr\.+\s/,
                " dr. ": /\s+dr\.+\s/,
                " DR. ": /\s+DR\.+\s/,
                " Dr, ": /\s+Dr\,+\s/,
                " dr, ": /\s+dr\,+\s/,
                " DR, ": /\s+DR\,+\s/,
                " DR ": /\s+DR+\s/,
                " Dr ": /\s+Dr+\s/,
                // These are different ways people might write "road"
                " road ": /\s+road+\s/,
                " ROAD ": /\s+ROAD+\s/,
                " Road ": /\s+Road+\s/,
                " road ": /\s+road/,
                " ROAD ": /\s+ROAD/,
                " Road ": /\s+Road/,
                " rd. ": /\s+rd\.+\s/,
                " Rd. ": /\s+Rd\.+\s/,
                " RD. ": /\s+RD\.+\s/,
                " rd, ": /\s+rd\,+\s/,
                " Rd, ": /\s+Rd\,+\s/,
                " RD, ": /\s+RD\,+\s/,
                " RD ": /\s+RD+\s/,
                " Rd ": /\s+Rd+\s/
            },
            abbreviations: {
                // These are abbreviations for "road"
                "rd": "Road",
                "rd.": "Road",
                "Rd": "Road",
                "Rd.": "Road",
                "RD.": "Road",
                "RD": "Road"
            }
        },

        // These are rules for the "city" field
        city: {
            variations: {
                // These are different ways people might write "north"
                " north ": /\s+north+\s/,
                " NORTH ": /\s+NORTH+\s/,
                " North ": /\s+North+\s/,
                "north ": /north+\s/,
                "NORTH ": /NORTH+\s/,
                "North ": /North+\s/,
                "N. ": /^N\.+\s/,
                "N ": /^N+\s/,
                " N ": /\s+N+\s/,
                // These are different ways people might write "saint"
                " SAINT ": /\s+SAINT+\s/,
                "SAINT ": /SAINT+\s/,
                "Saint ": /Saint+\s/,
                "saint ": /saint+\s/,
                " Saint ": /\s+Saint+\s/,
                " saint ": /\s+saint+\s/,
                " st ": /\s+st+\s/,
                " St ": /\s+St+\s/,
                " ST ": /\s+ST+\s/,
                "Saint ": /Saint+\s/,
                "ST. ": /^ST\.+\s/,
                "ST, ": /^ST\,+\s/,
                "ST ": /^ST+\s/,
                "St.": /^St\.+\s/,
                "St,": /^St\,+\s/,
                "St ": /^St+\s/,
                "st ": /^st+\s/,
                "st.": /^st\.+\s/,
                "st,": /^st\,+\s/,
                // These are different ways people might write "fort"
                "fort ": /^fort+\s/,
                " fort ": /\s+fort+\s/,
                " ft ": /\s+ft+\s/,
                " Ft ": /\s+Ft+\s/,
                " FT ": /\s+FT+\s/,
                "Fort ": /^Fort+\s/,
                " FORT ": /\s+FORT+\s/,
                "FORT ": /FORT+\s/,
                "FT ": /^FT+\s/,
                "FT. ": /^FT\.+\s/,
                "Ft. ": /^Ft\.+\s/,
                "Ft ": /^Ft+\s/,
                "ft ": /^ft+\s/,
                "ft. ": /^ft\.+\s/
            },
            abbreviations: {
                // These are abbreviations for "fort" and "saint"
                "ft": "Fort",
                "ft.": "Fort",
                "Ft": "Fort",
                "Ft.": "Fort",
                "St.": "Saint",
                "st.": "Saint",
                "St": "Saint",
                "st": "Saint"
            }
        },

        // These are rules for the "state" field
        state: {
            abbreviations: {
                // These are abbreviations for US states and some other regions
                "AB": "Alberta",
                "AL": "Alabama",
                "AK": "Alaska",
                "AZ": "Arizona",
                "AR": "Arkansas",
                "CA": "California",
                "CO": "Colorado",
                "CT": "Connecticut",
                "DE": "Delaware",
                "FL": "Florida",
                "GA": "Georgia",
                "HI": "Hawaii",
                "ID": "Idaho",
                "IL": "Illinois",
                "IN": "Indiana",
                "IA": "Iowa",
                "KS": "Kansas",
                "KY": "Kentucky",
                "LA": "Louisiana",
                "ME": "Maine",
                "MD": "Maryland",
                "MA": "Massachusetts",
                "MI": "Michigan",
                "MN": "Minnesota",
                "MS": "Mississippi",
                "MO": "Missouri",
                "MT": "Montana",
                "NE": "Nebraska",
                "NV": "Nevada",
                "NH": "New Hampshire",
                "NJ": "New Jersey",
                "NM": "New Mexico",
                "NY": "New York",
                "NC": "North Carolina",
                "ND": "North Dakota",
                "OH": "Ohio",
                "OK": "Oklahoma",
                "OR": "Oregon",
                "PA": "Pennsylvania",
                "RI": "Rhode Island",
                "SC": "South Carolina",
                "SD": "South Dakota",
                "TN": "Tennessee",
                "TX": "Texas",
                "UT": "Utah",
                "VT": "Vermont",
                "VA": "Virginia",
                "WA": "Washington",
                "WV": "West Virginia",
                "WI": "Wisconsin",
                "WY": "Wyoming",
                "ACT": "Australian Capital Territory",
                "JBT": "New South Wales",
                "NSW": "Norfolk Island",
                "NT": "Northern Territory",
                "QLD": "Queensland",
                "SA": "South Australia",
                "TAS": "Tasmania",
                "VIC": "Victoria",
                "WA": "Western Australia"
            },
            inclusions: {
                // These are states and regions we want to include
                "Australian Capital Territory": 1,
                "New South Wales": 1,
                "Norfolk Island": 1,
                "Northern Territory": 1,
                "Queensland": 1,
                "South Australia": 1,
                "Tasmania": 1,
                "Victoria": 1,
                "Western Australia": 1,
                "ACT": 1,
                "JBT": 1,
                "NSW": 1,
                "NT": 1,
                "QLD": 1,
                "SA": 1,
                "TAS": 1,
                "VIC": 1,
                "WA": 1,
                "Beijing": 1,
                "Tianjin": 1,
                "Chongqing": 1,
                "Shanghai": 1,
                "Heilongjiang": 1,
                "Jilin": 1,
                "Liaoning": 1,
                "Qinghai": 1,
                "Gansu": 1,
                "Shaanxi": 1,
                "Shanxi": 1,
                "Hebei": 1,
                "Sichuan": 1,
                "Hubei": 1,
                "Henan": 1,
                "Shandong": 1,
                "Anhui": 1,
                "Jiangsu": 1,
                "Yunnan": 1,
                "Guizhou": 1,
                "Hunan": 1,
                "Jiangxi": 1,
                "Zhejiang": 1,
                "Hainan": 1,
                "Guangdong": 1,
                "Fujian": 1,
                "Ontario": 1,
                "Quebec": 1,
                "Nova Scotia": 1,
                "New Brunswick": 1,
                "Manitoba": 1,
                "British Columbia": 1,
                "Prince Edward Island": 1,
                "Saskatchewan": 1,
                "Alberta": 1,
                "Newfoundland and Labrador": 1,
                "Newfoundland": 1,
                "Ont.": 1,
                "ON": 1,
                "Que., P.Q.": 1,
                "QC": 1,
                "N.S.": 1,
                "NS": 1,
                "N.B.": 1,
                "NB": 1,
                "Man.": 1,
                "MB": 1,
                "B.C.": 1,
                "BC": 1,
                "P.E.I.": 1,
                "PE": 1,
                "Sask.": 1,
                "SK": 1,
                "Alta.": 1,
                "AB": 1,
                "Nfld., Lab.": 1,
                "NL": 1,
                "Alabama": 1,
                "Alaska": 1,
                "Arizona": 1,
                "Arkansas": 1,
                "California": 1,
                "Colorado": 1,
                "Connecticut": 1,
                "Delaware": 1,
                "Florida": 1,
                "Georgia": 1,
                "Hawaii": 1,
                "Idaho": 1,
                "Illinois": 1,
                "Indiana": 1,
                "Iowa": 1,
                "Kansas": 1,
                "Kentucky": 1,
                "Louisiana": 1,
                "Maine": 1,
                "Maryland": 1,
                "Massachusetts": 1,
                "Michigan": 1,
                "Minnesota": 1,
                "Mississippi": 1,
                "Missouri": 1,
                "Montana": 1,
                "Nebraska": 1,
                "Nevada": 1,
                "New Hampshire": 1,
                "New Jersey": 1,
                "New Mexico": 1,
                "New York": 1,
                "North Carolina": 1,
                "North Dakota": 1,
                "Ohio": 1,
                "Oklahoma": 1,
                "Oregon": 1,
                "Pennsylvania": 1,
                "Rhode Island": 1,
                "South Carolina": 1,
                "South Dakota": 1,
                "Tennessee": 1,
                "Texas": 1,
                "Utah": 1,
                "Vermont": 1,
                "Virginia": 1,
                "Washington": 1,
                "West Virginia": 1,
                "Wisconsin": 1,
                "Wyoming": 1,
                "AL": 1,
                "AK": 1,
                "AZ": 1,
                "AR": 1,
                "CA": 1,
                "CO": 1,
                "CT": 1,
                "DE": 1,
                "DC": 1,
                "FL": 1,
                "GA": 1,
                "HI": 1,
                "ID": 1,
                "IL": 1,
                "IN": 1,
                "IA": 1,
                "KS": 1,
                "KY": 1,
                "LA": 1,
                "ME": 1,
                "MD": 1,
                "MA": 1,
                "MI": 1,
                "MN": 1,
                "MS": 1,
                "MO": 1,
                "MT": 1,
                "NE": 1,
                "NV": 1,
                "NH": 1,
                "NJ": 1,
                "NM": 1,
                "NY": 1,
                "NC": 1,
                "ND": 1,
                "OH": 1,
                "OK": 1,
                "OR": 1,
                "PA": 1,
                "RI": 1,
                "SC": 1,
                "SD": 1,
                "TN": 1,
                "TX": 1,
                "UT": 1,
                "VT": 1,
                "VA": 1,
                "WA": 1,
                "WV": 1,
                "WI": 1,
                "WY": 1,
                "AS": 1,
                "GU": 1,
                "MP": 1,
                "PR": 1,
                "VI": 1,
                "GUANAJUATO": 1,
                "QUERÉTARO": 1,
                "AGUASCALIENTES": 1,
                "MICHOACÁN": 1,
                "SAN LUIS POTOSÍ": 1,
                "PUEBLA": 1,
                "TLAXCALA": 1,
                "VERACRUZ": 1,
                "JALISCO": 1,
                "COLIMA": 1,
                "SINALOA": 1,
                "NAYARIT": 1,
                "DISTRITO FEDERAL": 1,
                "ESTADO DE MÉXICO": 1,
                "HIDALGO": 1,
                "GUERRERO": 1,
                "MORELOS": 1,
                "NUEVO LEON": 1,
                "TAMAULIPAS": 1,
                "COAHUILA": 1,
                "TABASCO": 1,
                "CHIAPAS": 1,
                "QUINTANA ROO": 1,
                "CAMPECHE": 1,
                "YUCATÁN": 1
            }
        },

        // These are rules for the "country" field
        country: {
            abbreviations: {
                // These are abbreviations for countries
                "US": "USA",
                "USA": "United States",
                "AFG": "Afghanistan",
                "AHO": "Netherlands Antilles",
                "ALB": "Albania",
                "ALG": "Algeria",
                "AND": "Andorra",
                "ANG": "Angola",
                "ANT": "Antigua and Barbuda",
                "ARG": "Argentina",
                "ARM": "Armenia",
                "ARU": "Aruba",
                "ASA": "American Samoa",
                "AUS": "Australia",
                "AUT": "Austria",
                "AZE": "Azerbaijan",
                "BAH": "Bahamas",
                "BAN": "Bangladesh",
                "BAR": "Barbados",
                "BDI": "Burundi",
                "BEL": "Belgium",
                "BEN": "Benin",
                "BER": "Bermuda",
                "BHU": "Bhutan",
                "BIH": "Bosnia and Herzegovina",
                "BIZ": "Belize",
                "BLR": "Belarus",
                "BOL": "Bolivia",
                "BOT": "Botswana",
                "BRA": "Brazil",
                "BRN": "Bahrain",
                "BRU": "Brunei",
                "BUL": "Bulgaria",
                "BUR": "Burkina Faso",
                "CAF": "Central African Republic",
                "CAM": "Cambodia",
                "CAN": "Canada",
                "CAY": "Cayman Islands",
                "CGO": "Congo",
                "CHA": "Chad",
                "CHI": "Chile",
                "CHN": "China",
                "CIV": "Côte d'Ivoire",
                "CMR": "Cameroon",
                "COD": "DR Congo",
                "COK": "Cook Islands",
                "COL": "Colombia",
                "COM": "Comoros",
                "CPV": "Cape Verde",
				"CRC":"Costa Rica",
				"CRO":"Croatia",
				"CUB":"Cuba",
				"CYP":"Cyprus",
				"CZE":"Czech Republic",
				"DEN":"Denmark",
				"DJI":"Djibouti",
				"DMA":"Dominica",
				"DOM":"Dominican Republic",
				"ECU":"Ecuador",
				"EGY":"Egypt",
				"ERI":"Eritrea",
				"ESA":"El Salvador",
				"ESP":"Spain",
				"EST":"Estonia",
				"ETH":"Ethiopia",
				"FIJ":"Fiji",
				"FIN":"Finland",
				"FRA":"France",
				"FSM":"Micronesia",
				"GAB":"Gabon",
				"GAM":"Gambia",
				"GBR":"Great Britain",
				"GBS":"Guinea-Bissau",
				"GEO":"Georgia",
				"GEQ":"Equatorial Guinea",
				"GER":"Germany",
				"GHA":"Ghana",
				"GRE":"Greece",
				"GRN":"Grenada",
				"GUA":"Guatemala",
				"GUI":"Guinea",
				"GUM":"Guam",
				"GUY":"Guyana",
				"HAI":"Haiti",
				"HKG":"Hong Kong",
				"HON":"Honduras",
				"HUN":"Hungary",
				"INA":"Indonesia",
				"IND":"India",
				"IRI":"Iran",
				"IRL":"Ireland",
				"IRQ":"Iraq",
				"ISL":"Iceland",
				"ISR":"Israel",
				"ISV":"Virgin Islands",
				"ITA":"Italy",
				"IVB":"British Virgin Islands",
				"JAM":"Jamaica",
				"JOR":"Jordan",
				"JPN":"Japan",
				"KAZ":"Kazakhstan",
				"KEN":"Kenya",
				"KGZ":"Kyrgyzstan",
				"KIR":"Kiribati",
				"KOR":"South Korea",
				"KSA":"Saudi Arabia",
				"KUW":"Kuwait",
				"LAO":"Laos",
				"LAT":"Latvia",
				"LBA":"Libya",
				"LBR":"Liberia",
				"LCA":"Saint Lucia",
				"LES":"Lesotho",
				"LIB":"Lebanon",
				"LIE":"Liechtenstein",
				"LTU":"Lithuania",
				"LUX":"Luxembourg",
				"MAD":"Madagascar",
				"MAR":"Morocco",
				"MAS":"Malaysia",
				"MAW":"Malawi",
				"MDA":"Moldova",
				"MDV":"Maldives",
				"MEX":"Mexico",
				"MGL":"Mongolia",
				"MHL":"Marshall Islands",
				"MKD":"Macedonia",
				"MLI":"Mali",
				"MLT":"Malta",
				"MNE":"Montenegro",
				"MON":"Monaco",
				"MOZ":"Mozambique",
				"MRI":"Mauritius",
				"MTN":"Mauritania",
				"MYA":"Myanmar",
				"NAM":"Namibia",
				"NCA":"Nicaragua",
				"NED":"Netherlands",
				"NEP":"Nepal",
				"NGR":"Nigeria",
				"NIG":"Niger",
				"NOR":"Norway",
				"NRU":"Nauru",
				"NZL":"New Zealand",
				"OMA":"Oman",
				"PAK":"Pakistan",
				"PAN":"Panama",
				"PAR":"Paraguay",
				"PER":"Peru",
				"PHI":"Philippines",
				"PLE":"Palestine",
				"PLW":"Palau",
				"PNG":"Papua New Guinea",
				"POL":"Poland",
				"POR":"Portugal",
				"PRK":"North Korea",
				"PUR":"Puerto Rico",
				"QAT":"Qatar",
				"ROU":"Romania",
				"RSA":"South Africa",
				"RUS":"Russia",
				"RWA":"Rwanda",
				"SAM":"Samoa",
				"SEN":"Senegal",
				"SEY":"Seychelles",
				"SIN":"Singapore",
				"SKN":"Saint Kitts and Nevis",
				"SLE":"Sierra Leone",
				"SLO":"Slovenia",
				"SMR":"San Marino",
				"SOL":"Solomon Islands",
				"SOM":"Somalia",
				"SRB":"Serbia",
				"SRI":"Sri Lanka",
				"STP":"São Tomé and Príncipe",
				"SUD":"Sudan",
				"SUI":"Switzerland",
				"SUR":"Suriname",
				"SVK":"Slovakia",
				"SWE":"Sweden",
				"SWZ":"Swaziland",
				"SYR":"Syria",
				"TAN":"Tanzania",
				"TGA":"Tonga",
				"THA":"Thailand",
				"TJK":"Tajikistan",
				"TKM":"Turkmenistan",
				"TLS":"Timor-Leste",
				"TOG":"Togo",
				"TPE":"Chinese Taipei[3]",
				"TRI":"Trinidad and Tobago",
				"TUN":"Tunisia",
				"TUR":"Turkey",
				"TUV":"Tuvalu",
				"UAE":"United Arab Emirates",
				"UGA":"Uganda",
				"UKR":"Ukraine",
				"URU":"Uruguay",
				"USA":"United States",
				"UZB":"Uzbekistan",
				"VAN":"Vanuatu",
				"VEN":"Venezuela",
				"VIE":"Vietnam",
				"VIN":"Saint Vincent and the Grenadines",
				"YEM":"Yemen",
				"ZAM":"Zambia",
				"ZIM":"Zimbabwe"
			},	
			inclusions:{				
					"Afghanistan":1,
					"Africa":1,
					"Albania":1,
					"Algeria":1,
					"American Samoa":1,
					"Andorra":1,
					"Angola":1,
					"Anguilla":1,
					"Antarctica":1,
					"Antigua":1,
					"Argentina":1,
					"Armenia":1,
					"Aruba":1,
					"Ascension Island":1,
					"Australia":1,
					"Austria":1,
					"Azerbaijan":1,
					"Bahamas":1,
					"Bahrain":1,
					"Bangladesh":1,
					"Barbados":1,
					"Belarus":1,
					"Belgium":1,
					"Belize":1,
					"Benin":1,
					"Bermuda":1,
					"Bhutan":1,
					"Bolivia":1,
					"Bosnia":1,
					"Botswana":1,
					"Bouvet Island":1,
					"Brazil":1,
					"British Virgin Islands":1,
					"Brunei":1,
					"Bulgaria":1,
					"Burkina Faso":1,
					"Burma":1,
					"Burundi":1,
					"Cambodia":1,
					"Cameroon":1,
					"Canada":1,
					"Cape Verde Islands":1,
					"Carriacou":1,
					"Cayman Islands":1,
					"Central African Republic":1,
					"Central America":1,
					"Chad":1,
					"Chile":1,
					"China":1,
					"Christmas Islands":1,
					"Cocos Island":1,
					"Colombia":1,
					"Comoros":1,
					"Congo":1,
					"Cook Islands":1,
					"Costa Rica":1,
					"Croatia":1,
					"Cuba":1,
					"Curacao":1,
					"Cyprus":1,
					"Czech Republic":1,
					"Denmark":1,
					"Diego Garcia":1,
					"Djibouti":1,
					"Dominica":1,
					"Dominican Republic":1,
					"East Timor":1,
					"Easter Island":1,
					"Ecuador":1,
					"Egypt":1,
					"El Salvador":1,
					"Equatorial Guinea":1,
					"Eritrea":1,
					"Estonia":1,
					"Ethiopia":1,
					"Faeroe Islands":1,
					"Falkland Islands":1,
					"Fiji":1,
					"Finland":1,
					"France":1,
					"French Antilles":1,
					"French Guiana":1,
					"French Polynesia":1,
					"Gabon":1,
					"Gambia":1,
					"Georgia":1,
					"Germany":1,
					"Ghana":1,
					"Gibraltar":1,
					"Greece":1,
					"Greenland":1,
					"Grenada":1,
					"Guadeloupe":1,
					"Guam":1,
					"Guantanamo Bay":1,
					"Guatemala":1,
					"Guernsey":1,
					"Guinea":1,
					"Guinea-Bissau":1,
					"Guyana":1,
					"Haiti":1,
					"Honduras":1,
					"Hong Kong":1,
					"Hungary":1,
					"Iceland":1,
					"India":1,
					"Indonesia":1,
					"Iran":1,
					"Iraq":1,
					"Ireland":1,
					"Isle of Man":1,
					"Israel":1,
					"Italy":1,
					"Ivory Coast":1,
					"Jamaica":1,
					"Japan":1,
					"Jersey":1,
					"Jordan":1,
					"Kazakhstan":1,
					"Kyrgyzstan":1,
					"Kenya":1,
					"Kiribati":1,
					"Korea (North)":1,
					"Korea (South)":1,
					"Kosovo":1,
					"Kuwait":1,
					"Kyrgyzstan":1,
					"Laos":1,
					"Lao People's Democratic Republic":1,
					"Latvia":1,
					"Lebanon":1,
					"Lesotho":1,
					"Liberia":1,
					"Libya":1,
					"Liechtenstein":1,
					"Lithuania":1,
					"Luxembourg":1,
					"Macau":1,
					"Macedonia":1,
					"Madagascar":1,
					"Malawi":1,
					"Malaysia":1,
					"Maldives":1,
					"Mali":1,
					"Malta":1,
					"Marshall Islands":1,
					"Martinique (French)":1,
					"Mauritania":1,
					"Mauritius":1,
					"Mayotte Island":1,
					"Mexico":1,
					"Micronesia":1,
					"Moldova":1,
					"Monaco":1,
					"Mongolia":1,
					"Montenegro":1,
					"Montserrat":1,
					"Morocco":1,
					"Mozambique":1,
					"Myanmar":1,
					"Namibia":1,
					"Nauru":1,
					"Nepal":1,
					"Netherlands":1,
					"Netherlands Antilles":1,
					"Nevis":1,
					"New Caledonia":1,
					"New Zealand":1,
					"Nicaragua":1,
					"Niger":1,
					"Nigeria":1,
					"Niue":1,
					"Norfolk Island":1,
					"North Korea":1,
					"Northern Mariana Islands":1,
					"Norway":1,
					"Oman":1,
					"Pago Pago":1,
					"Pakistan":1,
					"Palau":1,
					"Panama":1,
					"Papua New Guinea":1,
					"Paraguay":1,
					"Peru":1,
					"Philippines":1,
					"Pitcairn Island":1,
					"Poland":1,
					"Polynesia (French)":1,
					"Portugal":1,
					"Puerto Rico":1,
					"Qatar":1,
					"Reunion Island":1,
					"Romania":1,
					"Russia":1,
					"Rwanda":1,
					"S. Georgia & S. Sandwich Isls.":1,
					"Saba":1,
					"Saint Helena":1,
					"Saipan":1,
					"Samoa":1,
					"San Marino":1,
					"Sao Tome":1,
					"Saudi Arabia":1,
					"Scotland":1,
					"Senegal":1,
					"Serbia":1,
					"Serbia and Montenegro":1,
					"Seychelles Islands":1,
					"Sierra Leone":1,
					"Singapore":1,
					"Slovakia":1,
					"Slovenia":1,
					"Solomon Islands":1,
					"Somalia Republic":1,
					"South Africa":1,
					"Somalia":1,
					"South Korea":1,
					"Spain":1,
					"Spanish Sahara":1,
					"Sri Lanka":1,
					"St. Barthelemy":1,
					"St. Eustatius":1,
					"St. Helena":1,
					"St. Kitts/Nevis":1,
					"St. Maarten":1,
					"St. Martin":1,
					"St. Pierre and Miquelon":1,
					"St. Vincent":1,
					"Sudan":1,
					"Suriname":1,
					"Svalbard and Jan Mayen Islands":1,
					"Swaziland":1,
					"Sweden":1,
					"Switzerland":1,
					"Syria":1,
					"Taiwan":1,
					"Tajikistan":1,
					"Tanzania":1,
					"Thailand":1,
					"Togo":1,
					"Tokelau":1,
					"Tonga Island":1,
					"Trinidad and Tobago":1,
					"Tunisia":1,
					"Turkey":1,
					"Turkmenistan":1,
					"Turks and Caicos":1,
					"Tuvalu":1,
					"Uganda":1,
					"Ukraine":1,
					"United Arab Emirates":1,
					"United Kingdom":1,
					"United States":1,
					"Uruguay":1,
					"US Virgin Islands":1,
					"Uzbekistan":1,
					"Vanuatu":1,
					"Vatican City":1,
					"Venezuela":1,
					"Vietnam":1,
					"Wallis and Futuna Islands":1,
					"Western Sahara":1,
					"Western Samoa":1,
					"Yemen":1,
					"Yugoslavia":1,
					"Zaire":1,
					"Zambia":1,
					"Zimbabwe":1,
					"AFG":1,
					"AHO":1,
					"ALB":1,
					"ALG":1,
					"AND":1,
					"ANG":1,
					"ANT":1,
					"ARG":1,
					"ARM":1,
					"ARU":1,
					"ASA":1,
					"AUS":1,
					"AUT":1,
					"AZE":1,
					"BAH":1,
					"BAN":1,
					"BAR":1,
					"BDI":1,
					"BEL":1,
					"BEN":1,
					"BER":1,
					"BHU":1,
					"BIH":1,
					"BIZ":1,
					"BLR":1,
					"BOL":1,
					"BOT":1,
					"BRA":1,
					"BRN":1,
					"BRU":1,
					"BUL":1,
					"BUR":1,
					"CAF":1,
					"CAM":1,
					"CAN":1,
					"CAY":1,
					"CGO":1,
					"CHA":1,
					"CHI":1,
					"CHN":1,
					"CIV":1,
					"CMR":1,
					"COD":1,
					"COK":1,
					"COL":1,
					"COM":1,
					"CPV":1,
					"CRC":1,
					"CRO":1,
					"CUB":1,
					"CYP":1,
					"CZE":1,
					"DEN":1,
					"DJI":1,
					"DMA":1,
					"DOM":1,
					"ECU":1,
					"EGY":1,
					"ERI":1,
					"ESA":1,
					"ESP":1,
					"EST":1,
					"ETH":1,
					"FIJ":1,
					"FIN":1,
					"FRA":1,
					"FSM":1,
					"GAB":1,
					"GAM":1,
					"GBR":1,
					"GBS":1,
					"GEO":1,
					"GEQ":1,
					"GER":1,
					"GHA":1,
					"GRE":1,
					"GRN":1,
					"GUA":1,
					"GUI":1,
					"GUM":1,
					"GUY":1,
					"HAI":1,
					"HKG":1,
					"HON":1,
					"HUN":1,
					"INA":1,
					"IND":1,
					"IRI":1,
					"IRL":1,
					"IRQ":1,
					"ISL":1,
					"ISR":1,
					"ISV":1,
					"ITA":1,
					"IVB":1,
					"JAM":1,
					"JOR":1,
					"JPN":1,
					"KAZ":1,
					"KEN":1,
					"KGZ":1,
					"KIR":1,
					"KOR":1,
					"KSA":1,
					"KUW":1,
					"LAO":1,
					"LAT":1,
					"LBA":1,
					"LBR":1,
					"LCA":1,
					"LES":1,
					"LIB":1,
					"LIE":1,
					"LTU":1,
					"LUX":1,
					"MAD":1,
					"MAR":1,
					"MAS":1,
					"MAW":1,
					"MDA":1,
					"MDV":1,
					"MEX":1,
					"MGL":1,
					"MHL":1,
					"MKD":1,
					"MLI":1,
					"MLT":1,
					"MNE":1,
					"MON":1,
					"MOZ":1,
					"MRI":1,
					"MTN":1,
					"MYA":1,
					"NAM":1,
					"NCA":1,
					"NED":1,
					"NEP":1,
					"NGR":1,
					"NIG":1,
					"NOR":1,
					"NRU":1,
					"NZL":1,
					"OMA":1,
					"PAK":1,
					"PAN":1,
					"PAR":1,
					"PER":1,
					"PHI":1,
					"PLE":1,
					"PLW":1,
					"PNG":1,
					"POL":1,
					"POR":1,
					"PRK":1,
					"PUR":1,
					"QAT":1,
					"ROU":1,
					"RSA":1,
					"RUS":1,
					"RWA":1,
					"SAM":1,
					"SEN":1,
					"SEY":1,
					"SIN":1,
					"SKN":1,
					"SLE":1,
					"SLO":1,
					"SMR":1,
					"SOL":1,
					"SOM":1,
					"SRB":1,
					"SRI":1,
					"STP":1,
					"SUD":1,
					"SUI":1,
					"SUR":1,
					"SVK":1,
					"SWE":1,
					"SWZ":1,
					"SYR":1,
					"TAN":1,
					"TGA":1,
					"THA":1,
					"TJK":1,
					"TKM":1,
					"TLS":1,
					"TOG":1,
					"TPE":1,
					"TRI":1,
					"TUN":1,
					"TUR":1,
					"TUV":1,
					"UAE":1,
					"UGA":1,
					"UK":1,
					"UKR":1,
					"URU":1,
					"US":1,
					"USA":1,
					"UZB":1,
					"VAN":1,
					"VEN":1,
					"VIE":1,
					"VIN":1,
					"YEM":1,
					"ZAM":1,
					"ZIM":1
			}
		}
		
	}

};