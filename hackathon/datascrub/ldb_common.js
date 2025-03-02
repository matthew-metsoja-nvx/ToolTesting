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

    // This function initializes the language options
    init: function() {
        // Get all <samp> elements and add hover effects
        var c = document.getElementsByTagName("samp");
        for (var i = 0; i < c.length; i++) {
            (function(obj) {
                obj.parentNode.style.cursor = "help";
                obj.parentNode.onmouseover = function() {
                    common.classAdd("hover", obj);
                }
                obj.parentNode.onmouseout = function() {
                    common.classRemove("hover", obj);
                }
            })(c[i]);
        }

        // Add language options to elements with class "LanguageIDName"
        var c = common.C("LanguageIDName");
        for (var i = 0; i < c.length; i++) {
            for (var x in common.LanguageID) {
                var t = document.createElement("option");
                t.value = common.LanguageID[x].lang;
                t.innerHTML = common.LanguageID[x].lang;
                c[i].appendChild(t);
            }
        }

        // Add language options to elements with class "LanguageIDCode"
        var c = common.C("LanguageIDCode");
        for (var i = 0; i < c.length; i++) {
            for (var x in common.LanguageID) {
                var t = document.createElement("option");
                t.value = x;
                t.innerHTML = common.LanguageID[x].lang;
                c[i].appendChild(t);
            }
        }

        // Add language options to elements with class "LanguageID"
        var c = common.C("LanguageID");
        for (var i = 0; i < c.length; i++) {
            for (var x in common.LanguageID) {
                var t = document.createElement("option");
                t.value = common.LanguageID[x].id;
                t.innerHTML = common.LanguageID[x].lang;
                c[i].appendChild(t);
            }
        }
    },

    // This function gets elements by class name
    C: function(cls, elm) {
        if (!elm) elm = document;
        if (document.getElementsByClassName) {
            return elm.getElementsByClassName(cls);
        } else {
            var t = [];
            var o = elm.getElementsByTagName("*");
            var r = new RegExp("(^|\\s)" + cls + "($|\\s)");
            for (var i = 0; i < o.length; i++) {
                if (o[i].className.match(r)) t.push(o[i]);
            }
            return t;
        }
    },

    // This function checks if an element has a class
    classHas: function(obj, cls) {
        if (obj.className.match(new RegExp("(^|\\s)" + cls + "(\\s|$)", "g"))) return true;
        else return false;
    },

    // This function adds a class to an element
    classAdd: function(cls, obj) {
        obj.className += " " + cls;
    },

    // This function removes a class from an element
    classRemove: function(cls, obj) {
        var r = new RegExp("(^|\\s)" + cls + "($|\\s)");
        obj.className = obj.className.replace(r, " ");
    },

    // This function removes duplicate items from an array
    arrayUnique: function(arr, field, simple) {
        var t = [];
        label: for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < t.length; j++) {
                if (simple && arr[i][field]) {
                    if (arr[i][field] == t[j]) continue label;
                } else if (!simple && arr[i][field]) {
                    if (arr[i][field] == t[j][field]) continue label;
                } else if (!simple && !arr[i][field]) {
                    if (arr[i] == t[j]) continue label;
                } else if (arr[i][field] === "") {
                    if (arr[i][field] === t[j]) continue label;
                } else if (arr[i] === "") {
                    if (arr[i] === t[j]) continue label;
                }
            }
            if (simple) t.push(typeof arr[i][field] == "string" ? arr[i][field] : arr[i]);
            else t.push(arr[i]);
        }
        return t;
    },

    // This function trims whitespace from a string
    trim: function(data) {
        data = data.replace(/^\s+|\s+$/, '');
        return data;
    },

    // This function loads data from a URL
    load: function(url, fn) {
        var http = null;
        try {
            http = new XMLHttpRequest();
        } catch (e) {
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                http = new ActiveXObject("Microsoft.XMLHTTP");
            }
        }
        if (http == null) {
            alert("ERROR");
        } else {
            http.onreadystatechange = function() {
                fn(http);
            }
            if (http.overrideMimeType) {
                http.overrideMimeType('text/xml; charset=iso-8859-1');
            }
            http.open("GET", url, true);
            http.send(null);
        }
    },

    // This function gets the document inside an iframe
    frame: function() {
        var frame = document.getElementsByTagName("iframe")[0];
        var doc = frame.contentWindow || frame.contentDocument;
        if (doc.document) doc = doc.document;
        return doc;
    }
}

// When the window loads, initialize the common functions
window.onload = function() {
    common.init();
}