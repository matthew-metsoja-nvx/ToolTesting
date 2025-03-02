/* 	JavaScript Document
	Redistribution and use in source and binary forms, with or without modification, is NOT permitted without written consent from NAVEX
	Privacy policy:			http://www.ethicspoint.com/en/privacypolicy.asp
	Acceptable use policy:	http://www.ethicspoint.com/en/acceptableuse.asp
	Contact information:	direct 1-971-250-4100
							toll-free 866-297-0224
							info@ethicspoint.com
							
	Author:					Raymond M. Bodnar | Sr. Client Interface UI/UX Designer, Web Programmer
	Dept.:					Client Interface
	codebase: 				NVXG.V5.2025.10.12
*/


var epValidate = {
	errorlist: "",
	SectionHeader: [],
	ishalt: null,
	errorClass: 'errorText',
	defaultClass: 'defaultText',
	// --------------------------------------------------------------------------------------------------------------------			
	form: function(halt) {
		try { epMultiEdit.validateClonesReset = []; } catch (err) {}
		epValidate.ishalt = halt;
		epValidate.errorlist = "";
		epValidate.resetlabels();

		nvxgCUSTOM.validateForm();
		vr = epValidate.displayErrBox("Form");
		return vr;
	},
	// --------------------------------------------------------------------------------------------------------------------					
	displayErrBox: function(ValidateLabel) {
		try {
			if (epValidate.errorlist != "") {
				//console.log("ERROR LIST:" + epValidate.errorlist); 
				errids = epValidate.errorlist.split("|");
				errlabels = "";
				ids = errids[0].split("~");
				firstid = ids[0];
				obj = document.getElementById(firstid + "ERRTXT");
				obj.scrollIntoView();
				obj = document.getElementsByName(firstid);
				try {
					elm = obj[0];
					if (elm.className == 'time') { elm = document.getElementById(elm.id + "_hrs"); }
					elm.focus();
				} catch (err) {}
				if (nvxgWIF.isIE6 || !nvxgWIF.AdvanceErrMsgEnabled) {
					for (var i = 0; i < errids.length - 1; i++) {
						cerrid = errids[i];
						ids = errids[i].split("~");
						id = ids[0];
						obj = document.getElementById(id + "ERRTXT");
						obj.className = epValidate.errorClass;
					}
					alert(lc["$SYS_ERR.DEFAULTPAGEMSG"]);
				} else {
					nvxgWIF.createModalLayer();
					container = nvxgWIF.createFloatingDiv();
					container.id = "errcontainer";
					var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"];
					for (t = 0; t < tags.length; t++) {
						var elms = container.getElementsByTagName(tags[t]);
						for (i = 0; i < elms.length; i++) {
							if (elms[i].getAttribute("elm") != null) {
								eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
							}
						}
					}
					var msgcon = document.createElement('div');
					msgcon.id = "msgcon";
					txt = document.createTextNode("");
					var msgconmsg = document.createElement('div');
					txt = document.createTextNode("");
					msgconmsg.className = "errmsgcontainer_msg";
					msgconmsg.appendChild(txt);
					str = lc["$SYS_ERR.DEFAULTPAGEMSG"];
					txt = str.replace('\n', '<br>');
					msgconmsg.innerHTML = txt;
					msgcon.appendChild(msgconmsg);
					var msgconmsg2 = document.createElement('div');
					msgconmsg2.className = "errmsgcontainer_msg2";
					txt = document.createTextNode("");
					msgconmsg2.appendChild(txt);
					msgconmsg2.innerHTML = lc["$SYS_ERR.DIALOGINSTRUC"];
					msgcon.appendChild(msgconmsg2);
					var errscontainer = document.createElement('div');
					errscontainer.className = "errscontainer";
					var errs = document.createElement('ol');
					errs.className = "errs";
					for (var i = 0; i < errids.length - 1; i++) {
						cerrid = errids[i];
						ids = errids[i].split("~");
						id = ids[0];
						obj = document.getElementById(id + "ERRTXT");
						obj.className = epValidate.errorClass;
						for (n = 0; n < obj.childNodes.length; n++) {
							if (obj.childNodes[n].tagName == "SPAN") {
								if (obj.childNodes[n].getAttribute("sourceid") != undefined) {
									//obj.setAttribute("swapclass",obj.childNodes[n].className);
									//obj.childNodes[n].className = epValidate.errorClass;
								}
							}
						}
						SectionHeader = "";
						SectionHeader = epValidate.getSectionHeader(obj);
						if (ids[1] != "undefined") { SectionHeader = SectionHeader + ' ' + ids[1]; }
						var err = document.createElement('li');
						err.className = "err";
						txt = document.createTextNode("");
						errtxt = "";
						errtxt = obj.innerHTML;
						if (ids[2] != "undefined" && ids[2] != "") { errtxt = errtxt + ids[2]; }
						err.innerHTML = "<a href=\"javascript:epValidate.closeErrMsg('" + ids[0] + "');void(0)\" style='display:inline-block;float:right;' ><span class='spandot'><span class='spanwhite'>" + SectionHeader + "</span></span><span class='spanblock'>" + errtxt + "</span><br class='wifClearFloat'/>";
						errs.appendChild(err);
					}
					errscontainer.appendChild(errs);
					msgcon.appendChild(errscontainer);
					var msgconmsg3 = document.createElement('div');
					msgconmsg3.className = "errmsgcontainer_msg3";
					txt = document.createTextNode("");
					msgconmsg3.appendChild(txt);
					msgconmsg3.innerHTML = lc["$SYS_ERR.DIALOGOK"];
					var errspan = document.createElement('div');
					errspan.className = "subLevelNavBar";
					errspan.style.cssText = "width:80px; float:right; padding-right:7px; padding-top:5px;";
					var errbutton = document.createElement('a');
					errbutton.onclick = epValidate.closeErrMsg;
					txt = document.createTextNode(lc.$SYS_OK);
					errbutton.appendChild(txt);
					errspan.appendChild(errbutton);
					msgcon.appendChild(errspan);
					msgcon.appendChild(msgconmsg3);
					var br = document.createElement('br');
					br.className = "wifClearFloat";
					msgcon.appendChild(br);
					titlebar.innerHTML = lc["$SYS_ERR.DIALOGTITLE"];
					titlebar.className = "popup_titlebar";
					titlebar.style.backgroundColor = "#bb2e2f";
					titlebar.style.color = "#fff";
					content.appendChild(msgcon);
					container.style.width = "500px";
					content.className = "popup_msg";
					content.style.borderColor = "#bb2e2f";
					content.style.padding = "0";
					container.style.top = "0px";
					container.style.left = "0px";
					container.style.position = "fixed";
					shadow.width = "500";
					document.body.appendChild(container);
					cCord = nvxgWIF.getCenterCord(divbody);
					container.style.left = cCord[0] + "px";
					container.style.top = (10 + Number(cCord[1])) + "px";
				}
				return false;
			}
			return true;
		} catch (err) {
			localerr = "A Validation Script Error Has Occurred!\n\nPlease take a screen shot of this error message and send it to your NavexGlobal System Administrator.\n\n";
			localerr = localerr + "Database:\t" + document.getElementById("dbname").value + "\n";
			localerr = localerr + "Object:\t" + ids[0] + "\n";
			localerr = localerr + err.name + ":\t" + err.message + "\n";
			localerr = localerr + "Stack:\t" + err.stack + "\n";
			alert(localerr);
			return false;
		}

	},
	// --------------------------------------------------------------------------------------------------------------------					
	closeErrMsg: function(id) {
		if (id != undefined) {
			try {
				obj = document.getElementById(id + "ERRTXT");
				obj.scrollIntoView();
				obj = document.getElementsByName(id);
				elm = obj[0];
				if (elm.className == 'time') { elm = document.getElementById(elm.id + "_hrs"); }
				elm.focus();
			} catch (err) {}
		}
		try { epMultiEdit.resetCloneIds(); } catch (err) {}
		document.body.removeChild(document.getElementById("errcontainer"));
		document.body.removeChild(document.getElementById('ModalLayer'));
		document.body.resize = "";
		obj = document.getElementById("UITabControl");
		if (nvxgWIF.tabControlScrollDirection != null) {
			if (nvxgWIF.TabBarObjIsLockHeight) {
				window.scrollBy(0, -60);
			} else {
				window.scrollBy(0, -40);
			}
		} else {
			window.scrollBy(0, -40);
		}
	},
	// --------------------------------------------------------------------------------------------------------------------				
	removeErrMsg: function() {
		document.body.removeChild(document.getElementById("msgcon"));
		document.body.removeChild(document.getElementById("mod"));
	},
	// --------------------------------------------------------------------------------------------------------------------				
	followup: function() {
		epValidate.ishalt = true;
		epValidate.resetlabels();
		if (epValidate.string('username') == -1) { return false; }
		if (epValidate.string('password') == -1) { return false; }
		return true;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	eplogin: function() {
		epValidate.ishalt = true;
		epValidate.resetlabels();
		if (epValidate.string('username') == -1) { return false; }
		if (epValidate.string('password') == -1) { return false; }
		return true;
	},
	// --------------------------------------------------------------------------------------------------------------------					
	issuetypes: function() {
		if (!epIssueSelection.UIDisplay) {
			I = 0;
		} else {
			I = epIssueSelection.UIDisplay;
		}

		if (I === 0) {
			if (epIssueTypes.HasCategories) {
				epValidate.list("CategoryID");
			}
			if (document.getElementById('PrimaryIssueTypeID')) epValidate.list("PrimaryIssueTypeID");
			if (document.getElementById('SecondaryIssueTypeID')) epValidate.list('SecondaryIssueTypeID');
			if (document.getElementById('TertiaryIssueTypeID')) epValidate.list('TertiaryIssueTypeID');
			if (document.getElementById('QuaternaryIssueTypeID')) epValidate.list('QuaternaryIssueTypeID');
			if (document.getElementById('QuinaryIssueTypeID')) epValidate.list('QuinaryIssueTypeID');
			if (epIssueSelection.LayersRequired) {
				if (document.getElementById('PrimaryIssueTypeLayer1ID'))  epValidate.list('PrimaryIssueTypeLayer1ID');
				if (document.getElementById('PrimaryIssueTypeLayer2ID'))  epValidate.list('PrimaryIssueTypeLayer2ID');
				if (document.getElementById('PrimaryIssueTypeLayer3ID'))  epValidate.list('PrimaryIssueTypeLayer3ID');

				if (document.getElementById('SecondaryIssueTypeLayer1ID'))  epValidate.list('SecondaryIssueTypeLayer1ID');
				if (document.getElementById('SecondaryIssueTypeLayer2ID'))  epValidate.list('SecondaryIssueTypeLayer2ID');
				if (document.getElementById('SecondaryIssueTypeLayer3ID'))  epValidate.list('SecondaryIssueTypeLayer3ID');

				if (document.getElementById('TertiaryIssueTypeLayer1ID'))  epValidate.list('TertiaryIssueTypeLayer1ID');
				if (document.getElementById('TertiaryIssueTypeLayer2ID'))  epValidate.list('TertiaryIssueTypeLayer2ID');
				if (document.getElementById('TertiaryIssueTypeLayer3ID'))  epValidate.list('TertiaryIssueTypeLayer3ID');

				if (document.getElementById('QuaternaryIssueTypeLayer1ID'))  epValidate.list('QuaternaryIssueTypeLayer1ID');
				if (document.getElementById('QuaternaryIssueTypeLayer2ID'))  epValidate.list('QuaternaryIssueTypeLayer2ID');
				if (document.getElementById('QuaternaryIssueTypeLayer3ID'))  epValidate.list('QuaternaryIssueTypeLayer3ID');

				if (document.getElementById('QuinaryIssueTypeLayer1ID'))  epValidate.list('QuinaryIssueTypeLayer1ID');
				if (document.getElementById('QuinaryIssueTypeLayer2ID'))  epValidate.list('QuinaryIssueTypeLayer2ID');
				if (document.getElementById('QuinaryIssueTypeLayer3ID'))  epValidate.list('QuinaryIssueTypeLayer3ID');
			}
			if(epIssueTypes.MIMOState == 1 && $("#MIMOContainer").is(":visible"))
				epValidate.mimo();
		} else {
			epValidate.radio("PrimaryIssueTypeID");
		}
	},
	// --------------------------------------------------------------------------------------------------------------------					
	mimo: function() {
		//run through each field within mimocontainer
		var display = { 1: "Primary", 2: "Secondary", 3: "Tertiary", 4: "Quaternary", 5: "Quinary" };
		
		for(var i = 1; i <= 5; i++) {
			if(Object.keys(epMIMO.issueDependencies[display[i]]).length > 0) {
				for(var j = 0; j < Object.keys(epMIMO.issueDependencies[display[i]]).length; j++) {
					var reqField = epMIMOObjDef.fields.find(x => x.id === Object.keys(epMIMO.issueDependencies[display[i]])[j]);
					if(reqField.hasOwnProperty('required')) {
						//contruct the ID for validation
						var parentElm = document.querySelector('[id*="' + epMIMO.issueDependencies[display[i]][reqField.id] + '"]');
						while(parentElm.parentElement.className != "content")
							parentElm = parentElm.parentElement;
						if (parentElm.style.display != "none" && reqField.required) {
							switch(reqField.type) {
								case "Checkbox":
									epValidate.checkbox(epMIMO.issueDependencies[display[i]][reqField.id]);
									break;
								case "CheckboxList":
									epValidate.checkboxgroup(epMIMO.issueDependencies[display[i]][reqField.id] + "List");
									break;
								case "Date":
									epValidate.date(epMIMO.issueDependencies[display[i]][reqField.id]);
									break;
								case "Radio":
									epValidate.radio(epMIMO.issueDependencies[display[i]][reqField.id]);
									break;
								case "Select":
									epValidate.list(epMIMO.issueDependencies[display[i]][reqField.id]);
									break;
								case "Text":
								case "TextArea":
									epValidate.string(epMIMO.issueDependencies[display[i]][reqField.id]);
									break;
								case "Time":
									epValidate.time(epMIMO.issueDependencies[display[i]][reqField.id]);
									break;
							}
						}
					}
				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------				
	password: function(fld1, fld2, SecID) {
		epValidate.string("Password", SecID, 4, " <em>(" + lc.$FUO_1_PASSWORDERR + ")</em>");
		epValidate.string("Password1", SecID, 4, " <em>(" + lc.$FUO_1_PASSWORDERR + ")</em>");
		if (document.getElementById("Password").value != document.getElementById("Password1").value) {
			ErrMsg = " <em>(" + lc.PASSWORDMATCH + ")</em>";
			epValidate.displayErrMsg(Obj.id, SecID, ErrMsg);
			r = -1;
			return r;
		}
	},
	// --------------------------------------------------------------------------------------------------------------------				
	string: function(ObjID, SecID, MinLength, ErrMsg) {
		r = 0;
		if (MinLength == undefined) { MinLength = 1 }; //else{ ErrMsg = " is a required field; requiring a minimum of " + MinLength + " characters.\n\nPlease complete all required fields before submitting this report."};
		Obj = document.getElementById(ObjID);
		str = epValidate.trimString(Obj.value);
		if (str.length < MinLength) { 
			epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; 
			return r;
		}
		var mydiv = document.createElement("div");
		mydiv.innerHTML = str;
		if (document.all) {
			STR = mydiv.innerText;
		} else {
			STR = mydiv.textContent;
		}
		if (Obj.getAttribute('hint') != undefined) {
			hint = Obj.getAttribute('hint');
			if (str == hint) { 
				epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
				r = -1; 
				return r; }
		}
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	number: function(ObjID, SecID, MinValue, MaxValue, Units, ErrMsg) {
		// All number of fields should be build to olny allow numeric entries
		r = 0;
		if (Units == undefined) { Units = 'Units' };
		Obj = document.getElementById(ObjID);
		num = Number(Obj.value);
		if (isNaN(num)) { Obj.value = 0; }
		if (MinValue != undefined) {
			if (num < MinValue) { ErrMsg = ErrMsg + " requires a minimum value of " + MinValue + " " + Units + ".";
				ErrMsg = nvxgWIF.removeHTMLTags(ErrMsg);
				epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
				r = -1; return r; }
		}
		if (MaxValue != undefined) {
			if (num > MaxValue) { ErrMsg = ErrMsg + " has maximum value of " + MaxValue + " " + Units + ".";
				ErrMsg = nvxgWIF.removeHTMLTags(ErrMsg);
				epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
				r = -1; return r; }
		}
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	mask: function(ObjID, SecID, ErrMsg) {
		r = 0;
		Obj = document.getElementById(ObjID);
		m = Typecast.Config.Data.Mask.Masks[ObjID].split(',');
		str = epValidate.trimString(Obj.value);
		if (str.length != m[1].length) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		if (m[1] == Obj.value) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	date: function(ObjID, SecID, ErrMsg, mindate, maxdate) {
		r = 0;
		Obj = document.getElementById(ObjID);
		str = epValidate.trimString(Obj.value);
		if (str.length < 5) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		r = epValidate.validateDateFormat(Obj);
		if (r == -1) { epValidate.displayErrMsg(ObjID, SecID);
			r = -1; return r; }
		if (mindate != undefined && maxdate != undefined) {
			tdatev = Obj.value.split("/");
			tdatefrmt = rbCalendar.dateFormat.split("/");
			thed = new Date();
			for(var i=0;i<tdatefrmt.length;i++){
				if(tdatefrmt[i] == "yyyy") thed.setFullYear(tdatev[i]);
				else if(tdatefrmt[i] == "mm") thed.setMonth(tdatev[i] - 1);
				else if(tdatefrmt[i] == "dd") thed.setDate(tdatev[i]);
			}
			thed.setHours(0, 0, 0);
			today = new Date();
			today.setHours(0, 0, 0);
			aday = 1000 * 60 * 60 * 24;
			if (Number(mindate) != -1) {
				mindate = today - (aday * mindate);
				if (thed < mindate) { epValidate.displayErrMsg(ObjID, "\'" + Obj.title + "\' is out of range.");
					r = -2; return r; }
			}
			if (Number(maxdate) != -1) {
				maxdate = (today * 1) + (aday * maxdate);
				if (thed > maxdate) { epValidate.displayErrMsg(ObjID, "\'" + Obj.title + "\' is out of range.");
					r = -2; return r; }
			}
		}
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	email: function(ObjID, SecID, ErrMsg) {
		r = 0;
		Obj = document.getElementById(ObjID);
		str = epValidate.trimString(Obj.value);
		if (str.length < 7) { epValidate.displayErrMsg(ObjID, SecID, " <em>(" + lc["$SYS_ERR.EMAILINVALID"] + ")</em>");
			r = -1; return r; }
		r = epValidate.validateEMailFormat(Obj);
		if (r == -1) { epValidate.displayErrMsg(ObjID, SecID, " <em>(" + lc["$SYS_ERR.EMAILINVALID"] + ")</em>");
			r = -1; return r; }
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	time: function(ObjID, SecID, ErrMsg) {
		r = 0;
		if (document.getElementById(ObjID + "_hrs").selectedIndex == -1) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		if (document.getElementById(ObjID + "_mns").selectedIndex == -1) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		if (document.getElementById(ObjID + "_aps").selectedIndex == -1) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	list: function(ObjID, SecID, ErrMsg) {
		r = 0;
		Obj = document.getElementById(ObjID);
		if (Obj.selectedIndex == -1) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	radio: function(ObjID, SecID, ErrMsg) {
		//		alert(ObjID);
		r = 0;
		s = false;
		opts = document.getElementsByName(ObjID);
		for (var i = 0; i < opts.length; i++) {
			if (opts[i].checked) { s = true; break; }
		}
		if (s == false) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	checkbox: function(ObjID, SecID, ErrMsg) {
		r = 0;
		Obj = document.getElementById(ObjID);
		if (Obj.checked == false) {
			errmsg = Obj.getAttribute("errmsg");
			if (errmsg != undefined) { ErrMsg = eval(errmsg);}
			epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1;
			return r;
		}
		return r;
	},
	// --------------------------------------------------------------------------------------------------------------------				
	checkboxgroup: function(ObjID, SecID, ErrMsg) {
		r = 0;
		obj = document.getElementById(ObjID);
		var elms = obj.getElementsByTagName("input");
		grpchked = false;
		for (var i = 0; i < elms.length; i++) {
			t = elms[i].type;
			t = t.toUpperCase();
			if (t == "CHECKBOX" && elms[i].checked) { grpchked = true; break; }
		}
		if (grpchked == false) { epValidate.displayErrMsg(ObjID, SecID, ErrMsg);
			r = -1; return r; }
		return r;
	},

	fileupload: function() {
		if (parseInt($("#files-uploaded-number").html()) != 'NaN' && parseInt($("#files-uploaded-number").html()) > 0) {
			return 0;
		} else {
			epValidate.displayErrMsg("browse-file");
			return -1;
		}
	},
	// --------------------------------------------------------------------------------------------------------------------			
	trimString: function(inputString) {
		if (typeof inputString != "string") { return inputString; }
		var retValue = inputString;
		var ch = retValue.substring(0, 1);
		while (ch == " ") {
			retValue = retValue.substring(1, retValue.length);
			ch = retValue.substring(0, 1);
		}
		ch = retValue.substring(retValue.length - 1, retValue.length);
		while (ch == " ") {
			retValue = retValue.substring(0, retValue.length - 1);
			ch = retValue.substring(retValue.length - 1, retValue.length);
		}
		while (retValue.indexOf("  ") != -1) {
			retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ") + 1, retValue.length); // Again, there are two spaces in each of the strings
		}
		//if(retValue.length!=0){retValue=nvxgWIF.removeHTMLTags(retValue)};		
		return retValue;
	},
	// --------------------------------------------------------------------------------------------------------------------			
	validateDateFormat: function(fld) {
		var test_yyyy = "";
		var test_mm = "";
		var test_dd = "";
		var fldfrmt = fld.value.split("/");
		var calfrmt = rbCalendar.dateFormat.split("/");
		for (var i=0;i<calfrmt.length;i++) {
			if (calfrmt[i] == "yyyy") test_yyyy = fldfrmt[i];
			else if (calfrmt[i] == "mm") test_mm = fldfrmt[i];
			else if (calfrmt[i] == "dd") test_dd = fldfrmt[i];
		}
		// Do the values represent a valid date?
		var test_full = new Date(test_yyyy+"/"+test_mm+"/"+test_dd);
		if (test_full.toString() == "Invalid Date") return -1;
		// Correct number of digits?
		if (test_yyyy.length !== 4 || test_mm.length !== 2 || test_dd.length !== 2) return -1;
		// Valid month number?
		if (test_mm < 1 || test_mm > 12) return -1;
		// Valid day number?
		var daysPerMonth = {1: 31, 2: 29, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31};
		if (test_dd < 1 || test_dd > daysPerMonth[test_mm]) return -1;

		// If we've made it this far, it's valid.
		return 0;
	},
	// --------------------------------------------------------------------------------------------------------------------				 
	validateEMailFormat: function(fld) {
		var EMailRegExPattern = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
		if ((fld.value.match(EMailRegExPattern)) && (fld.value != '')) { return 0; } else { return -1; }
	},
	// --------------------------------------------------------------------------------------------------------------------		
	displayErrMsg: function(objID, SecID, errMsg) {
		if (epValidate.ishalt) {
			obj = document.getElementById(objID + "ERRTXT");
			obj.scrollIntoView();
			obj.className = epValidate.errorClass;
			obj = document.getElementsByName(objID);
			if (obj[0] == undefined) { obj = document.getElementsByID(objID); } else { obj = obj[0] }
			obj.focus();
			t = obj.title;
			if (errMsg == undefined) { errMsg = "\"" + obj.title.replace(/<(?:.|\n)*?>/gm, '') + "\"" + lc["$SYS_ERR.DEFAULTERRMSG"] };
			alert(errMsg);
		} else {
			epValidate.errorlist = epValidate.errorlist + objID + '~' + SecID + '~' + errMsg + '|';
		}
	},
	getSectionHeader: function(obj) {
		sectionlabel = "";
		while (obj.className != 'SectionContainer') { obj = obj.parentNode; }
		sectionlabel = obj.getAttribute('sectionlabel');
		return sectionlabel;
	},
	// --------------------------------------------------------------------------------------------------------------------			
	resetlabels: function() {
		z = nvxgWIF.getObjElementsByClassName(epValidate.errorClass, document.body);
		for (e = 0; e < z.length; e++) {
			z[e].className = epValidate.defaultClass;
			for (n = 0; n < z[e].childNodes.length; n++) {
				if (z[e].childNodes[n].tagName == "SPAN") {
					if (z[e].childNodes[n].getAttribute("sourceid") != undefined) {
						//							swap = z[e].getAttribute("swapclass");
						//							z[e].childNodes[n].className = swap;
					}
				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------	
	lfn: function() {}
};