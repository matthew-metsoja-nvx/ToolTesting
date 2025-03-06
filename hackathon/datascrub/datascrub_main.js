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
        var rows = pasteData.split("\n");
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