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

// JavaScript Document
var dragObj = {};
var resizeObj = {};
var colorhex = "#CCCCCC";


nvxgWIF = {
	printed: false,
	AdvanceErrMsgEnabled: true,
	LoggedByCookieEnabled: true,
	FocusBlurEventsEnabled: true,
	HotlineEnabled: true,
	PrintFromFromEnabled: false,
	masterPaticipantCounter: 0,
	isIE: false,
	isIEOld: false,
	isHTML5Enabled: false,

	issueTypeIndex: null,
	userType: null,
	issueCategory: null,
	qsParm: [],
	primatyindex: null,
	TermsConditions: null,
	AttorneyClientPrivilege: null,
	ScratchPad: {},
	TabBarObj: null,
	TabBarObjLockHeight: 0,
	TabBarObjIsLockHeight: false,
	isDevMode: false,
	// These Values are populated from the CSS Files on PageInit


	LoggedByDataBackground: "#f5faeb",
	LoggedByDataBorder: "#99CC33",
	OnBlurDataFieldBackground: "#FFFFFF",
	OnBlurDataFieldBorder: "#CCCCCC",
	OnFocusDataFieldBackground: "#fafae2",
	OnFocusDataFieldBorder: "#ffea00",



	// --------------------------------------------------------------------------------------------------------------------
	initForm: function(p) {
		nvxgWIF.setPageTitle(p);
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { nvxgWIF.isIE = true; }
		if (nvxgWIF.isIE) {
			var v = 0;
			if (/MSIE ([0-9]{1,}[\.0-9]{0,});/.exec(navigator.userAgent) != null) { v = parseFloat(RegExp.$1); }
			if (v < 8) { nvxgWIF.isIEOld = true; }
		}
		nvxgWIF.langCode = (document.getElementsByTagName("html")[0].lang).toUpperCase();
		var test_canvas = document.createElement("canvas"); //try and create sample canvas element
		var canvascheck = (test_canvas.getContext) ? true : false; //check if object supports getContext() method, a method of the canvas element
		document.getElementById("HTML5").value = canvascheck;
		nvxgWIF.isHTML5Enabled = canvascheck;
		document.wifFORM.reset();
		document.getElementById("ContinueDisabled").style.display = "none";
		cons = ["PurposeStatement", "Header", "MenuBarContainer", "LangBar"];
		for (k = 0; k < cons.length; k++) {
			con = document.getElementById(cons[k]);
			if (con != undefined) {
				H = nvxgWIF.getElmDimensions(con);
				nvxgWIF.TabBarObjLockHeight = nvxgWIF.TabBarObjLockHeight + H[0];
			}
		}
		nvxgWIF.TabBarObjLockHeight = nvxgWIF.TabBarObjLockHeight + 24;
		nvxgWIF.getQueryString();
		action = document.getElementById("wifFORM").action;
		if (action.indexOf("form.aspx") != -1 || action.indexOf("finish.asp") != -1) { nvxgWIF.isDevMode = false; } else { nvxgWIF.isDevMode = true; }
		if (nvxgWIF.qsParm.devmode == "override") {
			nvxgWIF.isDevMode = true;
			document.getElementById("wifFORM").action = "form_local.asp";
		}
		nvxgWIF.filepathdepth();
		if (nvxgWIF.isDevMode) { nvxgWIF.initQAMode(); }
		nvxgWIF.initLang();
		nvxgCUSTOM.initForm();
		nvxgWIF.initPopUps();
		var classlen = [15, 25, 33, 50, 66, 100];
		for (s = 0; s < classlen.length; s++) {
			DataFieldContainerClass = ".wif" + classlen[s] + "pInputContainer";
			nvxgWIF.setStyleRuleValue('background-color', DataFieldContainerClass, nvxgWIF.OnBlurDataFieldBackground);
		}
		// Set Section Headers From Localization Values
		SEC = nvxgWIF.getObjElementsByClassName("SectionContainer");
		for (S = 0; S < SEC.length; S++) {
			slab = SEC[S].getAttribute("sectionlabel");
			if (slab != "null") {
				if (slab.substring(0, 1) == "$") {
					SEC[S].setAttribute("sectionlabel", lc[slab]);
				}
			}
		}


		window.scrollTo(0, 0);
		nvxgWIF.setUILoggedCookie();
	},
	// --------------------------------------------------------------------------------------------------------------------	
	filepathdepth: function() {
		let urlstring = window.location.href.split("/");
		let index = Math.max(urlstring.indexOf("custom"),urlstring.indexOf("CA_Kelowna"),urlstring.indexOf("US_SanJose"));
		urlstring = urlstring.splice(index + 1, urlstring.length - 1);
		let depth = "../../";

		for(let i = 0; i < urlstring.length - 1; i++) {
			if(urlstring[i] != "forms")
				depth += "../";
			else
				break;
		}

		document.getElementById("filepathDepth").value = depth;
	},
	// --------------------------------------------------------------------------------------------------------------------	
	initLang: function() {
		if (document.getElementById("LanguageConfig") == undefined) { return; }
		langbarcontainer = document.getElementById("LangBar");
		if (langbarcontainer == undefined) { return; }

		// Always use dropdown for mobile forms
		if(document.getElementById("MobileDesign")){
			LanguageConfiguration.displaytype = 1;
		}

		if (LanguageConfiguration.languages.length < 2) {
			langbarcontainer.innerHTML = " ";
		} else {
			if (LanguageConfiguration.displaytype == undefined) { LanguageConfiguration.displaytype = 0; }
			if (LanguageConfiguration.displaytype == 0) {
				langbarcontainer.style.overflow = "hidden";
				// Menu Bar
				langbar = document.createElement("DIV");
				langbar.className = "lang_bar";
				for (l = 0; l < LanguageConfiguration.languages.length; l++) {
					langtag = document.createElement("A");
					if (LanguageConfiguration.displayimg == undefined) { LanguageConfiguration.displayimg = false; }
					if (LanguageConfiguration.displayimg) {
						langimg = document.createElement("IMG");
						langingsrc = LanguageConfiguration.imapath + "clear.png";
						langimg.setAttribute("src", langingsrc);
						langimg.style.backgroundImage = "url(" + LanguageConfiguration.imapath + LanguageConfiguration.languages[l].img + ")";
						langtag.appendChild(langimg);
					}
					langabbr = document.createElement("dl");
					langtxt = document.createTextNode("");
					langabbr.appendChild(langtxt);
					langtag.appendChild(langabbr);
					langabbr.innerHTML = LanguageConfiguration.languages[l].native;
					if (LanguageConfiguration.urlpath == undefined) { LanguageConfiguration.urlpath = "#" ;}
					if (nvxgWIF.langCode == LanguageConfiguration.languages[l].code.toUpperCase()) { langtag.setAttribute("selected", "selected"); };
					if (LanguageConfiguration.languages[l].redirect != undefined) {
						hreftxt = LanguageConfiguration.languages[l].redirect;
						if (LanguageConfiguration.languages[l].target != undefined) { hreftarg = LanguageConfiguration.languages[l].target; } else { hreftarg = ""; }
					} else {
						hreftxt = LanguageConfiguration.urlpath;
						hreftarg = "";
					}
					hreftxt = hreftxt.replace("[LANG]", LanguageConfiguration.languages[l].code);
					langtag.setAttribute("href", hreftxt);
					langtag.setAttribute("target", hreftarg);
					langbar.appendChild(langtag);
					langsep = document.createTextNode("|");
					if (l != LanguageConfiguration.languages.length - 1) { langbar.appendChild(langsep); }
				}
				langbarcontainer.appendChild(langbar);
			} else {
				// Dropdown
				langbarcontainer.style.height = "28px";
				langmenu = document.createElement("UL");
				langmenu.className = "lang_menu";
				langmenu.id = "lang_menu";
				langsub = document.createElement("LI");
				langsub.setAttribute("submenu", "down");
				langsub.id = "lang_submenudown";
				langtag = document.createElement("A");
				langtag.setAttribute("href", "#");
				langtag.setAttribute("selected", "selected");
				langtag.id = "lang_selected";
				var sl = 0;
				for (l = 0; l < LanguageConfiguration.languages.length; l++) {
					if (nvxgWIF.langCode == LanguageConfiguration.languages[l].code.toUpperCase()) { sl = l; break; }
				}
				if (LanguageConfiguration.displayimg) {
					langimg = document.createElement("IMG");
					langingsrc = LanguageConfiguration.imapath + "clear.png";
					langimg.setAttribute("src", langingsrc);
					langimg.style.backgroundImage = "url(" + LanguageConfiguration.imapath + LanguageConfiguration.languages[sl].img + ")";
					langtag.appendChild(langimg);
				}
				langabbr = document.createElement("dl");
				langabbr.id = "langabbr";
				if (LanguageConfiguration.displayimg == false) { langabbr.className = "setCurrentRight"; }
				langtxt = document.createTextNode("");
				langabbr.appendChild(langtxt);
				langtag.appendChild(langabbr);
				langabbr.innerHTML = LanguageConfiguration.languages[sl].native;

				langsub.appendChild(langtag);
				langmenu.appendChild(langsub);
				langmenuul = document.createElement("UL");
				langmenuul.id = "lang_submenudown_menu";
				for (l = 0; l < LanguageConfiguration.languages.length; l++) {
					if (l != sl) {
						langmenuli = document.createElement("li");
						langtag = document.createElement("A");
						if (LanguageConfiguration.displayimg == undefined) { LanguageConfiguration.displayimg = false; }
						if (LanguageConfiguration.displayimg) {
							langimg = document.createElement("IMG");
							langingsrc = LanguageConfiguration.imapath + "clear.png";
							langimg.setAttribute("src", langingsrc);
							langimg.style.backgroundImage = "url(" + LanguageConfiguration.imapath + LanguageConfiguration.languages[l].img + ")";
							langtag.appendChild(langimg);
						}
						langabbr = document.createElement("dl");
						langtxt = document.createTextNode("");
						langabbr.appendChild(langtxt);
						langtag.appendChild(langabbr);
						langabbr.innerHTML = LanguageConfiguration.languages[l].native;
						if (LanguageConfiguration.urlpath == undefined) { LanguageConfiguration.urlpath = "#"; }
						if (nvxgWIF.langCode == LanguageConfiguration.languages[l].code.toUpperCase()) { langtag.setAttribute("selected", "selected"); }
						if (LanguageConfiguration.languages[l].redirect != undefined) {
							hreftxt = LanguageConfiguration.languages[l].redirect;
							if (LanguageConfiguration.languages[l].target != undefined) { hreftarg = LanguageConfiguration.languages[l].target; } else { hreftarg = ""; }
						} else {
							hreftxt = LanguageConfiguration.urlpath;
							hreftarg = "";
						}
						hreftxt = hreftxt.replace("[LANG]", LanguageConfiguration.languages[l].code);
						langtag.setAttribute("href", hreftxt);
						langtag.setAttribute("target", hreftarg);
						langmenuli.appendChild(langtag);
						langmenuul.appendChild(langmenuli);
					}
				}
				langmenuul.appendChild(langmenuli);
				langsub.appendChild(langmenuul);
				langmenu.appendChild(langsub);
				langbarcontainer.appendChild(langmenu);

				langimg = document.createElement("IMG");
				langimg.className = "lang_menu_icon";
				langingsrc = LanguageConfiguration.imapath + "__language.png";
				langimg.setAttribute("src", langingsrc);
				langimg.setAttribute("border", 0);
				langbarcontainer.appendChild(langimg);


			}

		}

		// Mobile design click event for lang menu
		if(document.getElementById("MobileDesign")){
			document.getElementById("langabbr").onclick = function() {
				if(document.getElementById("lang_submenudown_menu").style.display !== "block") {
					document.getElementById("lang_submenudown_menu").style.display = "block";
				} else {
					document.getElementById("lang_submenudown_menu").style.display = "none";
				}
			};
		}

		return;
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	initMobile: function() {
		if(document.getElementById("MobileDesign")){
			// Setting menu click events for mobile form
			if(document.getElementById("FormMenuContainer")){
				var theMenu = document.getElementById("FormMenuContainer");
				var menuFolders = theMenu.querySelectorAll('[submenu]');
				for(var m=0; m<menuFolders.length; m++){
					menuFolders[m].querySelector("a.folder").onclick = function(e) {
						var menuParent = this.parentNode;
						if(menuParent.querySelector("ul").style.visibility !== "visible"){
							menuParent.className = "hover";
							menuParent.querySelector("ul").style.visibility = "visible";
						} else {
							var allULs = menuParent.querySelectorAll("ul");
							for(var q in allULs){
								allULs[q].parentNode.className = "";
								allULs[q].style.visibility = "hidden";
							}
						}
					};
				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	submitForm: function() {
		var valid = false;
		if (document.getElementById("disablevalidation") != undefined) {
			if (document.getElementById("disablevalidation").checked) {
				valid = true;
			} else {
				valid = epValidate.form(false);
			}
		} else {
			valid = epValidate.form(false);
		}
		if (valid) {
			document.getElementById("ContinueEnabled").style.display = "none";
			document.getElementById("ContinueDisabled").style.display = "";
			nvxgWIF.createModalLayer();

			var target = document.getElementById('ModalLayer');
			var spinner = new Spinner(spinopts).spin(target);


			var elm = document.getElementsByTagName('INPUT');
			for (i = 0; i < elm.length; i++) {
				hint = elm[i].getAttribute("hint");
				if (hint != undefined) { if (elm[i].value == hint) { elm[i].value = ""; } }
			}

			r = nvxgCUSTOM.submitForm();
			if (r) {
				try {
					if (typeof nvxgObjectDef !== "undefined") {
						for (var key in nvxgObjectDef) {
							if (nvxgObjectDef.hasOwnProperty(key)) {
								if (nvxgObjectDef[key].objcount > 0) { epMultiEdit.writeOutput(key); }
							}
						}
					}
				} catch (err) {}


				if (typeof epIssueSelection !== "undefined" && typeof epIssueSelection.MapToQuestions !== "undefined") {
					if (epIssueSelection.MapToQuestions) {
						vid = Number(document.getElementById("PrimaryIssueTypeID").value);
						for (var q = 0; q < epIssueSelection.issues.length; q++) {
							if (epIssueSelection.issues[q].id == vid) {
								issuetype = epIssueSelection.issues[q];
								break;
							}
						}
						for (qu = 0; qu < issuetype.questions.length; qu++) {
							short = issuetype.questions[qu].short;
							if (short != "") {
								qElms = document.getElementsByName(short);
								if (qElms.length > 0) {
									for (qx = 0; qx < qElms.length; qx++) {
										qElms[qx].name = "CustomQuestion" + issuetype.questions[qu].id;
									}
								}
							}
						}
					}
				}

				nvxgWIF.writeUILoggedCookie();
				nvxgWIF.HasOtherAsZero();
				nvxgWIF.cleanDateValue();
				nvxgWIF.cleanCustomFields();
				nvxgWIF.cleanStrings();
				string = document.getElementById("wifFORM").action;
				if (string.indexOf("form_local.asp") != -1) { dur = 3000; } else { dur = 500; }
				setTimeout(function() { document.wifFORM.submit() }, dur);
			} else {
				document.getElementById("ContinueEnabled").style.display = "";
				document.getElementById("ContinueDisabled").style.display = "none";
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	initFollowUp: function(p) {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { nvxgWIF.isIE = true; }
		if (nvxgWIF.isIE) {
			var v = 0;
			if (/MSIE ([0-9]{1,}[\.0-9]{0,});/.exec(navigator.userAgent) != null) {
				v = parseFloat(RegExp.$1);
			}
			if (v < 8) { nvxgWIF.isIEOld = true; }
		}
		nvxgWIF.langCode = (document.getElementsByTagName("html")[0].lang).toUpperCase();
		nvxgWIF.initLang();
		try { nvxgCUSTOM.initFollowUp(); } catch (err) {}
		nvxgWIF.setTextBoxes();
		document.getElementById("username").focus();
		nvxgWIF.setPageTitle(p);
	},



	// --------------------------------------------------------------------------------------------------------------------
	initFinish: function(p) {
		if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { nvxgWIF.isIE = true; }
		if (nvxgWIF.isIE) {
			var v = 0;
			if (/MSIE ([0-9]{1,}[\.0-9]{0,});/.exec(navigator.userAgent) != null) {
				v = parseFloat(RegExp.$1);
			}
			if (v < 8) { nvxgWIF.isIEOld = true; }
		}
		nvxgWIF.langCode = (document.getElementsByTagName("html")[0].lang).toUpperCase();
		nvxgWIF.initLang();
		try { nvxgCUSTOM.initFinish(); } catch (err) {}
		nvxgWIF.setTextBoxes();
		nvxgWIF.setPageTitle(p);
		/*
				if(nvxgWIF.HotlineEnabled==false){
					obj =document.getElementById("HotlineContainer");
					obj.parentNode.removeChild(obj);			
				};

				if(nvxgWIF.PrintFromFromEnabled){		
					document.PrintForm.submit();void(0);
				}else{
					
					obj =document.getElementById("PrintButtonContainer");
					obj.parentNode.removeChild(obj);			
					
					obj =document.getElementById("PrintFromFormDataContainer");
					obj.parentNode.removeChild(obj);			
				};		
		*/
	},

	// -------------------------------------------------------------------------------------------------------------------
	initFileUpload: function() {
		$("#FileUploadDetailsContainer").hide();
		$("#error-container").hide();
		$("#upload-reset").click(function() {
			if(document.getElementById('files-attached-list')) document.getElementById('files-attached-list').innerHTML = '';
			if(document.getElementById('files-attached')) document.getElementById('files-attached').style.display = 'none';

			nvxgWIF.initFileUpload();
			nvxgWIF.clearInputValue('upload-description,browse-file');
			$("#browse-file").remove();
			$("#browse-file-container").append("<input type='file' name='file' id='browse-file'/>");
			$("#browse-file-name").html("");
			$("#browse-file").change(function(){
			$("#browse-file-name").html($(this)[0].files[0].name);
		});

		});
		$("#browse-file").change(function(){
			$("#browse-file-name").html($(this)[0].files[0].name);
		});
		if (document.getElementById('FileUploadSectionContainer')) {
			var uploadUrl = `${document.getElementById("filepathDepth").value}../Api/FileUpload`;
			$.get(uploadUrl)
				.done(function(data) {
					$("#FileUploadDetailsContainer").show();
					$("#files-uploaded-number").text(0);
					$("#space-remaining").text(parseInt(data.BytesRemaining) / 1048576 + " MB");
					$("#max-file-size").text(parseInt(data.MaxFileSize) / 1048576 + " MB");
					$("#form-token").val(data.Token);
				})
				.fail(function() {
					$("#files-uploaded-number").text(lc["$SYS_FILEUPLOAD.ERROR"]);
					$("#space-remaining").text(lc["$SYS_FILEUPLOAD.ERROR"]);
					$("#max-file-size").text(lc["$SYS_FILEUPLOAD.ERROR"]);
					$("#token-span").text(lc["$SYS_FILEUPLOAD.ERROR"]);
					$("#form-token").val("");
				});

			document.getElementById('upload-add-file').onclick = function(event) {
				// prevent any other events from firing
				event.preventDefault();

				// abort if no file selected
				if ($("#browse-file")[0].files.length === 0) {
					alert(lc["$SYS_FILEUPLOAD.SELECTAFILE"]);
					return;
				}

				// disable the add-file button while the upload is processing
				// to avoid duplicate uploads
				$("#upload-add-file").prop("disabled", true);

				// create a new "form" and populate it
				var form = new FormData();
				form.append('file', $("#browse-file")[0].files[0]);
				form.append('description', $("#upload-description").val());
				form.append('token', $("#form-token").val());
				form.append('clientKey', $("#upload-client-key").val());

				// post to the FileUpload controller
				$.ajax({
					url: uploadUrl,
					type: 'POST',
					dataType: "JSON",
					data: form,
					processData: false,
					contentType: false,
					success: function(data, status) {
						// re-enable button and update UI with latest stats
						$("#upload-add-file").prop("disabled", false);
						$("#files-uploaded-number").text(data.FilesUploaded);
						$("#space-remaining").text(parseInt(data.BytesRemaining) / 1048576 + " MB");
						$("#max-file-size").text(parseInt(data.MaxFileSize) / 1048576 + " MB");

						// File list
						if(document.getElementById('browse-file-name').innerText !== '' && document.getElementById('files-attached-list') && document.getElementById('files-attached')){
							var newLI = document.createElement('li');
							newLI.innerText = document.getElementById('browse-file-name').innerText;
							document.getElementById('files-attached-list').appendChild(newLI);
			
							if(document.getElementById('files-attached').style.display == 'none') document.getElementById('files-attached').style.display = 'block';
						}

						$("#error-listing").html("");
						$("#error-container").hide();
						if (data.LastUploadSuccess) {
							// success, so clear file and description
							$("#browse-file").val("");
							$("#upload-description").val("");
						} else {
							// error, so show problems
							for (var i = 0; i < data.Errors.length; i++) {
								$("#error-listing").append($("<li/>").text(data.Errors[i]));
							}
						}
					},
					error: function(xhr, desc, err) {
						$("#upload-add-file").prop("disabled", false);
						$("#error-listing").html("");
						for (var i = 0; i < JSON.parse(xhr.responseText).Errors.length; i++) {
							$("#error-listing").append(
								$("<li/>").text(JSON.parse(xhr.responseText).Errors[i])
							);
						}
						$("#error-container").show();
					}
				});
			};
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	setPageTitle: function(p) {
		p = p.toUpperCase();
		document.title = lc.$SYS_CLIENTNAME + " | " + lc["$" + p + "_FRMNAME"];
		if (document.getElementById("clientname") != undefined) { document.getElementById("clientname").value = lc.$SYS_CLIENTNAME; }
		if (document.getElementById("pagetitle") != undefined) { document.getElementById("pagetitle").value = lc["$" + p + "_FRMNAME"] };
		document.getElementById("Header").title = lc["$SYS_CLIENTNAME"] + " | " + lc["$" + p + "_FRMNAME"];
		document.getElementById("HeaderH1").innerHTML = lc["$" + p + "_FRMNAME"];
		document.getElementById("HeaderH2").innerHTML = lc["$" + p + "_FRMNAMESUB"];
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	submitFollowUp: function() {
		var valid = false;
		valid = epValidate.followup();
		if (valid) {
			document.LoginForm.submit();
		}
	},
	// --------------------------------------------------------------------------------------------------------------------	 		
	initEPLogin: function() {
		nvxgWIF.setTextBoxes();
		document.getElementById("username").focus();
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	submitEPLogin: function() {
		var valid = false;
		valid = epValidate.eplogin();
		if (valid) {
			document.LoginForm.submit();
		}
	},

	// --------------------------------------------------------------------------------------------------------------------	 	
	initRetrieveLostPassword: function() {
		nvxgWIF.setTextBoxes();
		document.getElementById("email").focus();

	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	submittRetrieveLostPassword: function() {
		var valid = false;
		valid = epValidate.retrievelostpassword();
		if (valid) {
			document.loginform.submit();
		}
	},

	// --------------------------------------------------------------------------------------------------------------------
	clickRadioButtn: function(e) {
		var obj = nvxgWIF.getEventTarget(e);
		ibjID = obj.id;
		rad = obj;
		while (obj.className != 'wifInputRadioContainer') { obj = obj.parentNode };
		t = nvxgWIF.getObjElementsByClassName('wifInputRadioLabel', obj);
		for (i = 0; i < t.length; i++) {
			f = t[i].htmlFor;
			if (f == undefined || f == "") { f = t[i].getAttribute("htmlFor") }
			animate = document.getElementById(ibjID).getAttribute("animate");
			state = document.getElementById(f).getAttribute("state");
			if (animate == undefined) { animate = false };
			if (f == ibjID) {
				t[i].style.color = '#0000FF';
				if (animate == "true" && epIssueTypes.HasDesciptions && state == "close") {
					eval("nvxgWIF." + f + "Animate.open(125)");
					document.getElementById(f).setAttribute("state", "open");
				}
			} else {
				t[i].style.color = '#333333'
				if (animate == "true" && epIssueTypes.HasDesciptions && state == "open") {
					eval("nvxgWIF." + f + "Animate.close(50)");
					document.getElementById(f).setAttribute("state", "close");
				}
			}
		}
		// Allows Popups to occur in a label;
		t = nvxgWIF.getObjElementsByClassName('rollover', obj);
		for (i = 0; i < t.length; i++) {
			f = t[i].tag;
			if (f == undefined || f == "" || f == null) { f = t[i].getAttribute("tag"); }
			if (f == ibjID) { t[i].style.color = '#0000FF'; } else { t[i].style.color = '#333333'; }
		}
		t = rad.getAttribute("TriggerAction");
		if (t != undefined) {
			epMultiEdit.onchangeActionsEvent(rad);
		}

		objname = rad.getAttribute("ObjName");
		if (objname != undefined) {
			state = rad.getAttribute("State");

			if (state == "true") {
				x = document.getElementById(objname + "Container").childNodes.length;
				if (nvxgObjectDef[objname].objcount == 0 && x == 0) {
					epMultiEdit.createUIDisplay(objname);
					targ = document.getElementById(objname + "Container");
					nvxgWIF.setTextBoxes(targ);
					nvxgWIF.setTextArea(targ);
					nvxgWIF.setSelectList(targ);
					nvxgWIF.toggleElements(objname + "Container", "");
				}
			} else {
				if (nvxgObjectDef[objname].objcount != 0) {
					r = confirm(lc["$SYS_CLRSECTION"] + "\n\n" + lc["$SYS_CONTINUECONFIRM"]);
					if (r) {
						for (var k = 0; k < nvxgObjectDef[objname].objcount; k++) {
							nvxgObjectDef[objname].objdata.pop();
						};
						nvxgObjectDef[objname].objcount = 0;
						TabItemCounter = document.getElementById(objname + "ItemTabCounter");
						if (TabItemCounter != undefined) {
							TabItemCounter.innerHTML = 0;
							TabItemCounter.style.display = "none";
						};
						epMultiEdit.Action = null;
						epMultiEdit.PreviewAction = null;
						epMultiEdit.InsertAction = 0;
						epMultiEdit.EditAction = 1;
						nvxgWIF.toggleElements(objname + "Container", "none");
						nvxgWIF.clearObjectChildNodes(objname + "Container");

					} else {
						nvxgWIF.clearInputValue(name);
						rd = nvxgWIF.getObjElementsByClassName('wifInputRadio', obj);
						for (i = 0; i < rd.length; i++) {
							trst = rd[i].getAttribute("State");
							if (trst == "true") {
								ibjID = rd[i].id;
								break;
							};
						};
						document.getElementById(ibjID).checked = true;
						while (obj.className != 'wifInputRadioContainer') { obj = obj.parentNode };
						t = nvxgWIF.getObjElementsByClassName('wifInputRadioLabel', obj);
						for (i = 0; i < t.length; i++) {
							if (t[i].htmlFor == ibjID) { t[i].style.color = '#0000FF'; } else { t[i].style.color = '#333333' };
						};

						try {
							document.getElementById(ibjID).focus();
						} catch (err) {
							//Handle errors here
						};

					};
				} else {
					nvxgObjectDef[objname].objcount = 0;
					epMultiEdit.Action = null;
					epMultiEdit.PreviewAction = null;
					epMultiEdit.InsertAction = 0;
					epMultiEdit.EditAction = 1;
					nvxgWIF.toggleElements(objname + "Container", "none");
					nvxgWIF.clearObjectChildNodes(objname + "Container");
				};
			};
		};



		nvxgCUSTOM.clickRadioButtn(ibjID);
	},



	// --------------------------------------------------------------------------------------------------------------------	
	clickCheckboxGroupCheckBox: function(e) {
		var chkbox = nvxgWIF.getEventTarget(e);
		if (chkbox.id == "LoggedByRemember") { nvxgWIF.setUILoggedCookie(); }
		nvxgWIF.clickCheckboxGroupCheckBoxAction(chkbox);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	clickCheckboxGroupCheckBoxAction: function(chkbox) {
		t = chkbox.getAttribute("TriggerAction");
		if (t != undefined) {
			if (chkbox.checked) { v = chkbox.getAttribute("trueValue") } else { v = chkbox.getAttribute("falseValue") };
			chkbox.value = Number(v);
			if (t) {
				epMultiEdit.onchangeActionsEvent(chkbox);
			};
		};
		nvxgCUSTOM.clickCheckboxGroupCheckBox(chkbox);
		nvxgWIF.setMutuallyExclusiveDisplay(chkbox);
		parentObj = chkbox.parentNode
		if (chkbox.checked) { parentObj.style.color = '#0000FF' } else { parentObj.style.color = '#333' }
	},

	setMutuallyExclusiveDisplay: function(chkbox) {
		if (chkbox == null || chkbox == undefined) { return };
		// 	Mutually Exclusive	Option =====================================================================================
		mx = chkbox.getAttribute("mutuallyexclusive");
		if (mx != undefined && mx != null) {
			mx = mx.toLowerCase();
			chkboxgrp = chkbox;
			while (chkboxgrp.className != "wifCheckBoxGroup") { chkboxgrp = chkboxgrp.parentNode };
			checkboxes = nvxgWIF.getObjElementsByClassName("wifInputCheckbox", chkboxgrp);
			falseischecked = false;
			trueischecked = false;

			for (var u = 0; u < checkboxes.length; u++) {
				elmx = checkboxes[u].getAttribute("mutuallyexclusive");
				if (elmx != undefined && elmx != null) {
					elmx = elmx.toLowerCase();
					if (elmx == "true" && checkboxes[u].checked) { trueischecked = true; };
					if (elmx == "false" && checkboxes[u].checked) { falseischecked = true; };
				};
			};


			for (var u = 0; u < checkboxes.length; u++) {


				elmx = checkboxes[u].getAttribute("mutuallyexclusive");
				if (elmx != undefined && elmx != null) {
					elmx = elmx.toLowerCase();
					if (mx == "true") {
						if (chkbox.checked == true) {
							if (elmx == "false") {
								checkboxes[u].setAttribute("disabled", "disabled");
								checkboxes[u].style.cursor = "not-allowed";
								parentObj = checkboxes[u].parentNode;
								parentObj.style.cursor = "not-allowed";
								parentObj.style.color = "#666";
							};
						} else {
							if (trueischecked != true) {
								if (elmx == "false") {
									checkboxes[u].removeAttribute("disabled");
									checkboxes[u].style.cursor = "default";
									parentObj = checkboxes[u].parentNode;
									parentObj.style.cursor = "default";
									parentObj.style.color = "#333";
								};
							};
						};
					};
					if (mx == "false") {
						if (chkbox.checked == true) {
							if (elmx == "true") {
								checkboxes[u].setAttribute("disabled", "disabled");
								checkboxes[u].style.cursor = "not-allowed";
								parentObj = checkboxes[u].parentNode;
								parentObj.style.cursor = "not-allowed";
								parentObj.style.color = "#666";
							};
						} else {
							if (falseischecked != true) {
								if (elmx == "true") {
									checkboxes[u].removeAttribute("disabled");
									checkboxes[u].style.cursor = "default";
									parentObj = checkboxes[u].parentNode;
									parentObj.style.cursor = "default";
									parentObj.style.color = "#333";


								};
							};
						};
					};
					parentObj = checkboxes[u].parentNode
					if (checkboxes[u].checked) { parentObj.style.color = '#0000FF' }

				};
			};
		};
		return;
	},
	// --------------------------------------------------------------------------------------------------------------------
	toggleLastOption: function(obj, targetid) {
		if (obj.options.length - 1 == obj.selectedIndex) {
			nvxgWIF.toggleElements(targetid + 'Container', '');
			try {
				document.getElementById(targetid).focus();
			} catch (err) {
				//Handle errors here
			}

		} else {
			nvxgWIF.toggleElements(targetid + 'Container', 'none');
			nvxgWIF.clearInputValue(targetid);

		}

	},
	// --------------------------------------------------------------------------------------------------------------------		
	cancelForm2: function() {
		r = confirm(lc["$SYS_CXLFORM"] + "\n" + lc["$SYS_CLRFORM"] + "\n\n" + lc["$SYS_CONTINUECONFIRM"]);
		if (r) { window.location = "followup.asp" };
	},
	// --------------------------------------------------------------------------------------------------------------------	
	clearContainerInputValue: function(idString) {
		var ids = idString.toString().split(",");
		ids.forEach(function(id) {
			var obj = document.getElementById(id);
			if (obj == undefined || obj == '' || obj == null) { obj = document };
			var children = obj.getElementsByTagName('*') || obj.all;
			var str = "";
			for (var i = 0; i < children.length; i++) {
				var child = children[i];
				if (child.tagName == "TEXTAREA" || child.tagName == "INPUT" || child.tagName == "SELECT") {
					str = str + child.name + ",";
				}
			}
			nvxgWIF.clearInputValue(str + "deadValue");
		})
	},
	// --------------------------------------------------------------------------------------------------------------------
	clearInputValue: function(elmString) {
		var et = elmString.split(",");
		for (var i = 0; i < et.length; i++) {
			var elms = document.getElementsByName(et[i]);
			var elm = elms[0];
			if (elm != null) {
				var elmTag = elm.tagName.toUpperCase();
				
				switch (elmTag) {
					case 'SELECT':
						if (elm.getAttribute('required').toLowerCase() == 'true') {
							elm.selectedIndex = -1;
						} else {
							d = elm.getAttribute('default');
							if (d != 'undefined') {
								elm.value = d;
							} 
						}
						break;
					case 'TEXTAREA':
						elm.value = '';
						break;
					case 'INPUT':
						var elmType = elm.type.toUpperCase();
						if(document.getElementById(elm.name+"_hrs")) {nvxgWIF.clearClockObj(elm.name);}
						switch (elmType) {
							case 'HIDDEN':
								elm.value = '';
								break;
							case 'TEXT':
								elm.value = '';

								isFixed = elm.getAttribute('fixed');
								hint = elm.getAttribute('hint');
								c = elm.className.indexOf("Calendar");
								if (c > 0) { rbCalendar.clickClearDate(elm.id); }
								if (isFixed != undefined && c == -1) {
									if (hint != undefined && (Number(elm.value) == 0 || elm.value == "")) {
										elm.value = hint;
										elm.style.color = "#cdcdcd";

									} else {
										v = Number(elm.value);
										f = Number(isFixed);
										f = Math.abs(f, 0);
										if (isNaN(v)) { v = 0; }
										elm.value = v.toFixed(f);
									}
								} else {
									if (hint != undefined && elm.value == "") {
										elm.value = hint;
										elm.style.color = "#cdcdcd";
									}
								}


								break;
							case 'RADIO':
								for (var y = 0; y < elms.length; y++) {
									obj = elms[y];
									obj.checked = false;
									while (obj.className != 'wifInputRadioContainer') { obj = obj.parentNode; }
									z = nvxgWIF.getObjElementsByClassName('wifInputRadioLabel', obj);
									for (e = 0; e < z.length; e++) { z[e].style.color = '#333'; }
								}
								break;
							case 'CHECKBOX':
								elm.checked = false;
								break;
						}
						break;
				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	setInputValue: function(elmString) {
		t = elmString.split(",");
		for (var i = 0; i < t.length; i++) {
			elm = document.getElementById(t[i]);
			if (elm != null) {
				emlTag = elm.tagName.toUpperCase();
				switch (emlTag) {
					case 'INPUT':
						emlType = elm.type.toUpperCase();
						switch (emlType) {
							case 'RADIO':
								elm.checked = true;
								obj = elm;
								while (obj.className != 'wifInputRadioContainer') { obj = obj.parentNode };
								z = nvxgWIF.getObjElementsByClassName('wifInputRadioLabel', obj);
								for (e = 0; e < z.length; e++) {
									if (elmString == z[e].htmlFor) { z[e].style.color = '#000000'; };
								}
								break;
						}
						break;
				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	getEventTarget: function(e) {
		try { if (e.nodeType == 1) { targ = e; return targ }; } catch (err) {};
		if (!e) { e = window.event; }
		if (e.target) { targ = e.target; } else if (e.srcElement) { targ = e.srcElement; }
		if (targ.nodeType == 3) { targ = targ.parentNode; }
		return targ;
	},


	// --------------------------------------------------------------------------------------------------------------------
	getObjElementsByClassName: function(className, obj) {
		if (obj == undefined || obj == '' || obj == null) { obj = document };
		var children = obj.getElementsByTagName('*') || obj.all;
		var elements = [];
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			try {
				var classNames = child.className.split(' ');
			} catch (err) {};

			for (var j = 0; j < classNames.length; j++) {
				if (classNames[j] == className) {
					elements.push(child);
					break;
				}
			}
		}
		return elements;
	},

	// --------------------------------------------------------------------------------------------------------------------
	setSelectList: function(obj) {
		if (obj == undefined) {
			var listboxes = document.getElementsByTagName('SELECT');
		} else {
			var listboxes = obj.getElementsByTagName('SELECT');
		};
		for (j = 0; j < listboxes.length; j++) {
			if (listboxes[j].id != "wifSearchOnSubBlockSelect") {
				if (listboxes[j].id.indexOf("cal_") == -1) {


					r = listboxes[j].getAttribute('required') + "";
					if (r == null || r == undefined || r == "null" || r == "undefined") { r = 'false' };
					r = r.toLowerCase();
					if (r != 'false') {
						listboxes[j].selectedIndex = -1;
					};

				};

				listboxes[j].onclick = nvxgWIF.focusEml;
				listboxes[j].onfocusin = nvxgWIF.focusEml;
				listboxes[j].onfocus = nvxgWIF.focusEml;
				listboxes[j].onblur = nvxgWIF.blurEml;
			}
		}
	},

	// --------------------------------------------------------------------------------------------------------------------
	setTextBoxes: function(obj) {
		if (obj == undefined) {
			var elm = document.getElementsByTagName('INPUT');
		} else {
			var elm = obj.getElementsByTagName('INPUT');
		};
		for (j = 0; j < elm.length; j++) {
			if (elm[j].id != "wifSearchForText") {
				if (elm[j].type.toUpperCase() == "TEXT" || elm[j].type.toUpperCase() == "PASSWORD") {
					isFixed = elm[j].getAttribute('fixed');
					if (isFixed != undefined) {
						elm[j].style.textAlign = "right";
					};
					hint = elm[j].getAttribute('hint');
					if (hint != undefined && elm[j].value == "") {
						elm[j].value = hint;
						elm[j].style.color = "#cdcdcd";
					};

					elm[j].onfocus = nvxgWIF.focusEml;


					if (elm[j].addEventListener) {
						elm[j].addEventListener("blur", nvxgWIF.blurEml);
					} else {
						elm[j].attachEvent("onblur", nvxgWIF.blurEml);
					};



				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	setTextArea: function(obj) {
		if (obj == undefined) {
			var elm = document.getElementsByTagName('TEXTAREA');
		} else {
			var elm = obj.getElementsByTagName('TEXTAREA');
		};
		for (j = 0; j < elm.length; j++) {
			elm[j].onfocus = nvxgWIF.focusEml;
			elm[j].onblur = nvxgWIF.blurEml;
			var maxchar = elm[j].getAttribute("maxchar");
			if (maxchar != undefined) {
				if (Number(maxchar) != 0) {
					container = elm[j];
					container = container.parentNode;
					container = container.parentNode;
					var countelm = nvxgWIF.getObjElementsByClassName("charcount", container);
					countstr = countelm[0].getAttribute("charcount");
					countstr = countstr.replace("[WORDCOUNT]", "0");
					countstr = countstr.replace("[CHARCOUNT]", "0");
					countstr = countstr.replace("[MAXCOUNT]", maxchar);
					countelm[0].innerHTML = countstr;
				};
			};
			nvxgWIF.autoresize(elm[j]);


		};
	},

	// --------------------------------------------------------------------------------------------------------------------
	setCheckBoxListEvents: function(obj) {
		if (obj == undefined)(obj = window.document);
		chkboxes = nvxgWIF.getObjElementsByClassName('wifInputCheckbox', obj);
		for (j = 0; j < chkboxes.length; j++) {
			chkboxes[j].onclick = nvxgWIF.clickCheckboxGroupCheckBox;
			if (chkboxes[j].checked) { nvxgWIF.clickCheckboxGroupCheckBox(chkboxes[j]) };

		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	setRadioButtonEvents: function(obj) {
		if (obj == undefined)(obj = window.document);
		rdbuttons = nvxgWIF.getObjElementsByClassName('wifInputRadio', obj);
		for (j = 0; j < rdbuttons.length; j++) {
			rdbuttons[j].onclick = nvxgWIF.clickRadioButtn;
			rdbuttons[j].checked = false;

		}
	},
	// --------------------------------------------------------------------------------------------------------------------	
	setScale: function(obj) {
		classset = ["Scale5", "Scale10"];
		for (c = 0; c < classset.length; c++) {
			objs = nvxgWIF.getObjElementsByClassName(classset[c]);
			for (i = 0; i < objs.length; i++) {
				var elm = objs[i].getElementsByTagName('LI');
				for (j = 0; j < elm.length; j++) {
					elm[j].onclick = nvxgWIF.clickScaleButton;
					elm[j].setAttribute("tabindex", 0);
				};
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------
	clickScaleButton: function(e) {
		obj = nvxgWIF.getEventTarget(e);
		targ = obj.getAttribute("target");
		val = obj.getAttribute("value");
		par = obj;
		while (par.tagName != 'UL') { par = par.parentNode };
		var bttns = par.getElementsByTagName('LI');
		for (j = 0; j < bttns.length; j++) {
			bval = bttns[j].getAttribute("value");
			if (bval == val) {
				bttns[j].setAttribute("selected", "true");
			} else {
				bttns[j].setAttribute("selected", "false");
			};
		};
		document.getElementById(targ).value = val;


	},
	// --------------------------------------------------------------------------------------------------------------------	
	setStarRate: function() {
		stul = nvxgWIF.getObjElementsByClassName('StarRate');
		for (j = 0; j < stul.length; j++) {
			var strs = stul[j].getElementsByTagName('LI');
			for (i = 0; i < strs.length; i++) {
				strs[i].onclick = nvxgWIF.clickStarButton;
				if (i == 5) {
					strs[i].setAttribute("star", 0);
					strs[i].setAttribute("title", "Clear");
				} else {
					strs[i].setAttribute("star", i + 1);
					strs[i].setAttribute("title", i + 1);
				};
			};
		};

	},
	// --------------------------------------------------------------------------------------------------------------------
	clickStarButton: function(e) {
		obj = nvxgWIF.getEventTarget(e);
		star = Number(obj.getAttribute("star"));
		par = obj;
		while (par.tagName != 'UL') { par = par.parentNode };
		target = par.getAttribute("target");
		document.getElementById(target).value = star;
		if (star == 0) {
			par.style.backgroundPosition = "0px -100px";
		} else {
			par.style.backgroundPosition = "0px -" + (100 - (star * 20)) + "px";
		}

	},

	// --------------------------------------------------------------------------------------------------------------------
	focusEml: function(e) {
		obj = nvxgWIF.getEventTarget(e);

		if (obj.readOnly == false || obj.readOnly == undefined) {
			objParent = obj.parentNode
			obj.style.backgroundColor = nvxgWIF.OnFocusDataFieldBackground;
			if (objParent.id != "ListToListOptions") { objParent.style.backgroundColor = nvxgWIF.OnFocusDataFieldBackground; };

			objParent.style.borderColor = nvxgWIF.OnFocusDataFieldBorder;
			hint = obj.getAttribute('hint');
			if (hint != undefined) {
				if (obj.value == hint) {
					obj.value = "";
					obj.style.color = "#00F";
				}
			};
			isFixed = obj.getAttribute('fixed');
			if (isFixed != undefined) {
				obj.select();

			};
			if (obj.getAttribute("sourceid") != undefined) {
				nvxgWIF.displayPopUp(e);
			};
			try { nvxgCUSTOM.focusEml(obj); } catch (err) {};
		};
	},


	// --------------------------------------------------------------------------------------------------------------------	
	blurEml: function(e) {
		obj = null;
		obj = nvxgWIF.getEventTarget(e);
		if (obj.readOnly == false || obj.readOnly == undefined) {
			Remember = obj.getAttribute("Remember");
			if (Remember != undefined) {
				borderC = nvxgWIF.LoggedByDataBorder;
				clearC = nvxgWIF.LoggedByDataBackground;
				backC = nvxgWIF.LoggedByDataBackground;
			} else {
				borderC = nvxgWIF.OnBlurDataFieldBorder;
				clearC = "";
				backC = nvxgWIF.OnBlurDataFieldBackground;

			}
			objParent = obj.parentNode
			obj.style.backgroundColor = backC;
			if (objParent.id != "ListToListOptions") {
				objParent.style.backgroundColor = backC;
			};
			if (obj.tagName.toUpperCase() == "SELECT") {
				for (O = 0; O < obj.options.length; O++) {
					obj.options[O].style.backgroundColor = "";
				};
			};


			if (obj.tagName.toUpperCase() == "SELECT") {
				if (obj.selectedIndex != -1) {
					obj.options[obj.selectedIndex].style.backgroundColor = "";
				};
			};

			isFixed = obj.getAttribute('fixed');
			hint = obj.getAttribute('hint');
			c = obj.className.indexOf("Calendar");
			if (isFixed != undefined && c == -1) {
				if (hint != undefined && (Number(obj.value) == 0 || obj.value == "")) {
					obj.value = hint;
					obj.style.color = "#cdcdcd";
				} else {
					v = Number(obj.value);
					f = Number(isFixed);
					f = Math.abs(f, 0);
					if (isNaN(v)) { v = 0 };
					obj.value = v.toFixed(f);
				};
			} else {
				if (hint != undefined && obj.value == "") {
					obj.value = hint;
					obj.style.color = "#cdcdcd";
				}
			};
			if (objParent.className == "time") {
				grand = objParent.parentNode;
				grand.style.borderColor = borderC;
			} else {
				objParent.style.borderColor = borderC;
			};
			hint = obj.getAttribute("hint");
			if (c != -1 && obj.value != hint) {
				mn = Number(obj.getAttribute("mindate"));
				mx = Number(obj.getAttribute("maxdate"));
				r = epValidate.date(obj.id, null, null, mn, mx);
				if (r < 0) {
					obj.select();
					if (r == -1) { errmsg = lc["$SYS_ERR.INVALIDDATE"]  };
					if (r == -2) { errmsg = lc.$CAL_OUTOFRANGEMSG};
					errmsg = errmsg.replace("~", obj.value);
					obj.setAttribute("sdate", null);
					alert(errmsg);
					obj.value = "";
					obj.focus();
					obj.select();
				} else {
					sd = obj.value.split("/");
					if (sd[0].length == 1) { sd[0] = "0" + sd[0] };
					if (sd[1].length == 1) { sd[1] = "0" + sd[1] };
					obj.value = sd[0] + "/" + sd[1] + "/" + sd[2];
					if(rbCalendar.dateFormat == "mm/dd/yyyy"){
						obj.setAttribute("sdate", sd[2] + "" + sd[0] + "" + sd[1]);
					}
					if(rbCalendar.dateFormat == "dd/mm/yyyy"){
						obj.setAttribute("sdate", sd[2] + "" + sd[1] + "" + sd[0]);
					}
					if(rbCalendar.dateFormat == "yyyy/mm/dd"){
						obj.setAttribute("sdate", sd[0] + "" + sd[1] + "" + sd[2]);
					}
				};
			};
		};

		if (obj.getAttribute("evalformula") != undefined) {
			eval(obj.getAttribute("evalformula"));
		};
		if (obj.getAttribute("sourceid") != undefined) {
			nvxgWIF.closeRollOver(e);
		};
		if (obj.getAttribute("setBlockLabel") != undefined) {

			epMultiEdit.setBlockLabel(obj);
		};
		//				try{nvxgCUSTOM.blurEml(obj);}catch(err){};



	},
	// --------------------------------------------------------------------------------------------------------------------

	noSelect: function(e) {
		obj = nvxgWIF.getEventTarget(e);
		var r = document.body.createTextRange();
		r.moveToElementText(obj);
		r.select();
		return true;
	},
	// --------------------------------------------------------------------------------------------------------------------
	noDrag: function() {
		event.dataTransfer.effectAllowed = "all";
		return true;
	},



	// --------------------------------------------------------------------------------------------------------------------
	toggleDotLeader: function(objID, val) {
		obj = document.getElementById(objID);
		obj = obj.parentNode.parentNode.parentNode;
		if (val) { obj.className = "custChkTxtGroupChecked" } else { obj.className = "custChkTxtGroup" };
	},
	// --------------------------------------------------------------------------------------------------------------------
	toggleIntructionLabel: function(objID, elmString) {
		test = 'none';
		var t = elmString.split(",");
		for (var i = 0; i < t.length; i++) {
			if (document.getElementById(t[i]).checked) { test = '' };
		}
		document.getElementById(objID).style.display = test;
	},
	// --------------------------------------------------------------------------------------------------------------------
	clearCheckBoxList: function(elmID) {
		var hasOther = false;
		obj = document.getElementById(elmID);
		f = nvxgWIF.getObjElementsByClassName('wifInputCheckbox', obj);
		for (i = 0; i < f.length; i++) { f[i].checked = false; if (f[i].isOther == 'true') { hasOther = true } };
		f = nvxgWIF.getObjElementsByClassName('wifInputRadio', obj);
		for (i = 0; i < f.length; i++) { f[i].checked = false };
		f = nvxgWIF.getObjElementsByClassName('wifInputCheckboxLabel', obj);
		for (i = 0; i < f.length; i++) { f[i].style.color = '#333' }
		f = nvxgWIF.getObjElementsByClassName('wifInputRadioLabel', obj);
		for (i = 0; i < f.length; i++) { f[i].style.color = '#333' }

		if (hasOther) {
			f = nvxgWIF.getObjElementsByClassName('wif100pInputTextArea', obj);
			for (i = 0; i < f.length; i++) { f[i].value = '' }
			f = nvxgWIF.getObjElementsByClassName('wifInputCheckboxOther', obj);
			for (i = 0; i < f.length; i++) { f[i].style.display = 'none' }
		}

		//obj=document.getElementById(obj.listtarget);
		//obj.selectedIndex = -1;
	},
	// --------------------------------------------------------------------------------------------------------------------
	toggleElements: function(elmString, val) {
		var t = elmString.split(",");
		for (var i = 0; i < t.length; i++) {
			var obj = document.getElementById(t[i]);
			if (obj != undefined) {
				obj.style.display = val;
				// Toggling UITabControl tabs when necessary
				if(document.getElementById('UITabControl')){
					var uitabs = document.getElementById('UITabControl').getElementsByTagName('div');
					var objTabLabel = obj.getAttribute('tablabel');
					if(objTabLabel !== null){
						var objTabLabelText = lc[objTabLabel].trim();
						for(var j = 0; j < uitabs.length; j++){
							var tabText = uitabs[j].innerText.trim();
							if(tabText == objTabLabelText){
								uitabs[j].style.display = val;
							}
						}
					}
				}
			}
		}
	},


	// --------------------------------------------------------------------------------------------------------------------
	toggleOther: function(objID, targetString) {
		obj = document.getElementById(objID);
		var t = targetString.split(",");
		d = 'none';
		if (obj.selectedIndex != -1) {
			if (obj.options[obj.selectedIndex].getAttribute('isOther') == 'true') { d = '' } else { d = 'none' };
		}
		for (var i = 0; i < t.length; i++) {
			document.getElementById(t[i]).style.display = d;

		}

	},
	// --------------------------------------------------------------------------------------------------------------------
	createElement: function(element) {
		if (typeof document.createElementNS != 'undefined') {
			return document.createElementNS('http://www.w3.org/1999/xhtml', element);
		}
		if (typeof document.createElement != 'undefined') {
			return document.createElement(element);
		}
		return false;
	},
	// --------------------------------------------------------------------------------------------------------------------
	clearObjectChildNodes: function(objID) {
		obj = document.getElementById(objID);
		x = obj.childNodes.length;
		for (var i = 0; i < x; i++) {
			obj.removeChild(obj.childNodes[0])
		};
	},
	// --------------------------------------------------------------------------------------------------------------------
	removeObj: function(objID) {
		obj = document.getElementById(objID);
		obj.parentNode.removeChild(obj);
	},
	// --------------------------------------------------------------------------------------------------------------------	
	getStyle: function(oElm, strCssRule) {
		var strValue = "";
		if (document.defaultView && document.defaultView.getComputedStyle) {
			strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
		} else if (oElm.currentStyle) {
			strCssRule = strCssRule.replace(/\-(\w)/g, function(strMatch, p1) {
				return p1.toUpperCase();
			});
			strValue = oElm.currentStyle[strCssRule];
		}
		return strValue;
	},
	// --------------------------------------------------------------------------------------------------------------------	 
	stripStyle: function(x) {
		x.toUpperCase();
		y = x.split('P');
		return parseInt(y[0]);
	},

	// --------------------------------------------------------------------------------------------------------------------	 		
	maxLength: function(field, maxChars) {
		if (field.value.length >= maxChars) {
			event.returnValue = false;
			alert(lc["$SYS_ERR.ERROR"]);
			return false;
		}
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	maxLengthPaste: function(field, maxChars) {
		event.returnValue = false;
		if ((field.value.length + window.clipboardData.getData("Text").length) > maxChars) {
			alert(lc["$SYS_ERR.ERROR"]);
			return false;
		}
		event.returnValue = true;
	},

	// --------------------------------------------------------------------------------------------------------------------		
	initDateListValue: function(targ) {
		obj = document.getElementById(targ + "_MONTH");
		for (var m = 1; m < 13; m++) {
			if (m < 10) { m = "0" + m };
			var newOption = document.createElement('option');
			newOption.setAttribute('value', m);
			var text = document.createTextNode(m);
			newOption.appendChild(text);
			obj.appendChild(newOption);
		}
		obj.selectedIndex = -1;
		obj = document.getElementById(targ + "_DAY");
		for (var m = 1; m < 32; m++) {
			if (m < 10) { m = "0" + m };
			var newOption = document.createElement('option');
			newOption.setAttribute('value', m);
			var text = document.createTextNode(m);
			newOption.appendChild(text);
			obj.appendChild(newOption);
		}
		obj.selectedIndex = -1;
		var iNow = new Date();
		var iYear = iNow.getFullYear();
		obj = document.getElementById(targ + "_YEAR");
		for (var m = iYear; m > (iYear - 101); m--) {
			var newOption = document.createElement('option');
			newOption.setAttribute('value', m);
			var text = document.createTextNode(m);
			newOption.appendChild(text);
			obj.appendChild(newOption);
		}
		obj.selectedIndex = -1;
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setDateListValue: function(targ) {
		var month_num = Number(document.getElementById(targ + "_MONTH").value - 1);
		var thedate = Number(document.getElementById(targ + "_DAY").value);
		var right_year = Number(document.getElementById(targ + "_YEAR").value);
		if (month_num != -1 && thedate != 0 && right_year != 0) {
			if (month_num == 0 || month_num == 2 || month_num == 4 || month_num == 6 || month_num == 7 || month_num == 9 || month_num == 11) { lastdayofmonth = 31; }
			if (month_num == 3 || month_num == 5 || month_num == 8 || month_num == 10) { lastdayofmonth = 30; }
			if (month_num == 1) {
				right_year_divided = right_year / 4;
				right_year_divided_string = new String(right_year_divided);
				var is_decimal = right_year_divided_string.indexOf('.');
				if (is_decimal != -1) { lastdayofmonth = 28; } else { lastdayofmonth = 29; };
				right_year_string = new String(right_year);
				var the_century = new String(right_year_string.charAt(2))
				the_century = the_century + new String(right_year_string.charAt(3));
				if (the_century == "00") {
					right_year_divided = right_year / 400;
					right_year_divided_string = new String(right_year_divided);
					var is_decimal = right_year_divided_string.indexOf('.');
					if (is_decimal != -1) { lastdayofmonth = 28; } else { lastdayofmonth = 29; };
				}
			}
			if (thedate > lastdayofmonth) {
				alert(lc["$SYS_ERR.ERROR"]);
				document.getElementById(targ + "_DAY").selectedIndex = -1;
				document.getElementById(targ + "_DAY").focus();
				return false;
			} else {
				thed = new Date();
				thed.setFullYear(right_year);
				thed.setMonth(month_num);
				thed.setDate(thedate);
				thed.setHours(0, 0, 0);
				today = new Date();
				today.setHours(0, 0, 0);
				if (thed > today) {
					alert(lc["$SYS_ERR.ERROR"]);
					document.getElementById(targ + "_DAY").selectedIndex = -1;
					document.getElementById(targ + "_MONTH").selectedIndex = -1;
					document.getElementById(targ + "_MONTH").focus();
					return false;
				} else {
					month_num = month_num + 1;
					if (month_num < 10) { month_num = "0" + month_num };
					if (thedate < 10) { thedate = "0" + thedate };
					document.getElementById(targ).value = month_num + "/" + thedate + "/" + right_year;
					//alert(document.getElementById(targ).value);
				};
			};
		};

	},
	// --------------------------------------------------------------------------------------------------------------------		
	setTodayListValue: function(targ) {
		inputControl = document.getElementById(targ);
		inputMMControl = document.getElementById(targ + "_MONTH");
		inputDDControl = document.getElementById(targ + "_DAY");
		inputYYControl = document.getElementById(targ + "_YEAR");
		var right_now = new Date();
		var MM = right_now.getMonth() + 1;
		if (MM < 10) { MM = "0" + MM };
		var DD = right_now.getDate()
		if (DD < 10) { DD = "0" + DD };
		var YY = right_now.getFullYear();
		inputMMControl.value = MM;
		inputDDControl.value = DD;
		inputYYControl.value = YY;
		inputControl.value = MM + "/" + DD + "/" + YY;
		nvxgWIF.setDateListValue(targ);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	clearDateListValue: function(targ) {
		inputControl = document.getElementById(targ);
		inputMMControl = document.getElementById(targ + "_MONTH");
		inputDDControl = document.getElementById(targ + "_DAY");
		inputYYControl = document.getElementById(targ + "_YEAR");
		defaultval = inputControl.getAttribute("defaultval");

		if (defaultval != undefined) {
			if (defaultval.indexOf(",") != -1) {
				defaultval = defaultval.split(",");
				inputMMControl.value = defaultval[0];
				inputDDControl.value = defaultval[1];
				inputYYControl.value = defaultval[2];
				inputControl.value = defaultval[0] + "/" + defaultval[1] + "/" + defaultval[2];
			} else {
				defaultval = defaultval.toUpperCase();
				if (defaultval == "NOW") {
					var right_now = new Date();
					var MM = right_now.getMonth() + 1;
					if (MM < 10) { MM = "0" + MM };
					var DD = right_now.getDate()
					if (DD < 10) { DD = "0" + DD };
					var YY = right_now.getFullYear();
					inputMMControl.value = MM;
					inputDDControl.value = DD;
					inputYYControl.value = YY;
					inputControl.value = MM + "/" + DD + "/" + YY;
				} else {
					inputControl.value = "";
					inputMMControl.selectedIndex = -1;
					inputDDControl.selectedIndex = -1;
					inputYYControl.selectedIndex = -1;
				};
			};
		} else {
			inputControl.value = "";
			inputMMControl.selectedIndex = -1;
			inputDDControl.selectedIndex = -1;
			inputYYControl.selectedIndex = -1;
		};
		nvxgWIF.setDateListValue(targ);
	},

	// --------------------------------------------------------------------------------------------------------------------			
	trimString: function(optionliststr) {
		if (typeof optionliststr != "string") { return optionliststr; }
		var retValue = optionliststr;
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
		if (retValue.length != 0) { retValue = nvxgWIF.removeHTMLTags(retValue) };
		return retValue;
	},

	// --------------------------------------------------------------------------------------------------------------------	 	
	submitIntro: function() {
		var valid = false;
		valid = epValidate.intro(true);

		if (valid) {
			document.issueFORM.submit();
		}

	},

	// --------------------------------------------------------------------------------------------------------------------
	HasOtherAsZero: function() {
		try {
			if (epIssueSelection.HasOtherAsZero) {
				if(epIssueSelection.MIMOState!=1)
					objlist = ["PrimaryIssueTypeID", "SecondaryIssueTypeID", "TertiaryIssueTypeID"];
				else
					objlist = ["PrimaryIssueTypeID", "SecondaryIssueTypeID", "TertiaryIssueTypeID", "QuaternaryIssueTypeID", "QuinaryIssueTypeID"];
				for (var q = 0; q < objlist.length; q++) {
					if (document.getElementById(objlist[q]) != undefined) {
						issuelist = document.getElementById(objlist[q])
						if (issuelist.value == epIssueSelection.OtherPlaceHolderID) {
							iOption = document.createElement('option');
							iOption.value = 0;
							issuelist.appendChild(iOption);
							issuelist.value = 0;
						};
					};
				};
			};
		} catch (err) {
			//Handle errors here
		};

	},

	// --------------------------------------------------------------------------------------------------------------------
	cleanDateValue: function() {
		dateclasses = ["wif33pCalendar", "wif25pCalendar"]
		for (var q = 0; q < dateclasses.length; q++) {
			z = nvxgWIF.getObjElementsByClassName(dateclasses[q], document.getElementById("wifFORM"));
			for (var w = 0; w < z.length; w++) {
				cal_val = z[w].value;
				cal_val = cal_val.replace(/ /g, "");
				if (cal_val == "//" || cal_val == lc["$CAL_FORMATVAL"]) {
					z[w].value = "";
				} else if (rbCalendar.dateFormat) {
					try {
						var newCalVal_mm = "";
						var newCalVal_dd = "";
						var newCalVal_yyyy = "";
						var dateFormat_split = rbCalendar.dateFormat.split("/");
						var cal_val_split = cal_val.split("/");
						for (var i=0; i<dateFormat_split.length; i++) {
							switch(dateFormat_split[i]){
								case "mm": newCalVal_mm = cal_val_split[i]; break;
								case "dd": newCalVal_dd = cal_val_split[i]; break;
								case "yyyy": newCalVal_yyyy = cal_val_split[i]; break;
							}
						}
						if(newCalVal_mm !== undefined && newCalVal_dd !== undefined && newCalVal_yyyy !== undefined){
							z[w].value = newCalVal_mm + "/" + newCalVal_dd + "/" + newCalVal_yyyy;
						}
					} catch (err) {}
				}
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------
	cleanCustomFields: function() {
		var children = document.forms[0].getElementsByTagName('*') || src.all;
		for (var c = 0; c < children.length; c++) {
			nomap = false;
			remove = false;
			var child = children[c];
			tag = child.tagName.toUpperCase();
			if (tag == "INPUT") { tag = child.type.toUpperCase(); };
			if (tag == "TEXT" || tag == "TEXTAREA" || tag == "SELECT" || tag == "RADIO" || tag == "CHECKBOX" || tag == "HIDDEN") {
				cname = child.name;
				cname = cname.toUpperCase();
				if (cname.indexOf("CUSTOMFIELD") != -1) {
					switch (tag) {
						case 'SELECT':
							if (child.selectedIndex == -1 || child.value == "") { remove = true } else { remove = false };
							break;
						case 'CHECKBOX':
							if (child.checked == false) { remove = true } else { remove = false };
							break;
						case 'RADIO':
							opts = document.getElementsByName(child.name);
							remove = true;
							for (o = 0; o < opts.length; o++) {
								if (opts[o].checked) { remove = false; break };
							};
							break;
						default:
							if (child.value.length == 0) { remove = true } else { remove = false };
					};
				};
				for (k = 0; k < nvxgCUSTOM.removeKeys.length; k++) {
					if (cname.indexOf(nvxgCUSTOM.removeKeys[k]) != -1) { nomap = true };
				};
				if (remove || nomap) {
					objParent = child.parentNode
					objParent.removeChild(child);
					c = c-1;
				};
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------
	setUILoggedCookie: function() {
		src = document.getElementById("LoggedByCookieContainer");
		if (src) {
			var children = src.getElementsByTagName('*') || src.all;
			if (document.getElementById("LoggedByRemember").checked) {
				document.getElementById("LoggedByData").style.display = "block";
				document.getElementById("LoggedByDataKey").style.display = "block";
				for (var c = 0; c < children.length; c++) {
					TAG = children[c].tagName.toUpperCase();
					if (TAG == "INPUT") { TAG = children[c].type.toUpperCase(); };
					if (TAG == "SELECT" || TAG == "TEXT" || TAG == "TEXTAREA") {
						objParent = children[c].parentNode
						children[c].style.backgroundColor = "transparent";
						children[c].setAttribute("Remember", "Remember");
						objParent.style.backgroundColor = nvxgWIF.LoggedByDataBackground;
						if (TAG == "SELECT") {
							for (M = 0; M < children[c].options.length; M++) {
								children[c].options[M].style.backgroundColor = nvxgWIF.LoggedByDataBackground;
							};
							if (children[c].selectedIndex != -1) {
								children[c].options[children[c].selectedIndex].style.backgroundColor = "";
							};
						};
						objParent.style.borderColor = nvxgWIF.LoggedByDataBorder;
					};
				};
			} else {
				document.getElementById("LoggedByData").style.display = "none";
				document.getElementById("LoggedByDataKey").style.display = "none";
				for (var c = 0; c < children.length; c++) {
					TAG = children[c].tagName.toUpperCase();
					if (TAG == "INPUT") { TAG = children[c].type.toUpperCase(); };
					if (TAG == "SELECT" || TAG == "TEXT" || TAG == "TEXTAREA") {
						objParent = children[c].parentNode
						children[c].style.backgroundColor = "";
						children[c].removeAttribute("Remember");
						objParent.style.backgroundColor = "";
						if (TAG == "SELECT") {
							for (M = 0; M < children[c].options.length; M++) {
								children[c].options[M].style.backgroundColor = "";
							};
							if (children[c].selectedIndex != -1) {
								children[c].options[children[c].selectedIndex].style.backgroundColor = "";
							};
						};
						objParent.style.borderColor = "#CCCCCC";
					};
				};

			};
		};

	},

	// --------------------------------------------------------------------------------------------------------------------
	writeUILoggedCookie: function() {
		var expire = "";
		if (document.getElementById("LoggedByRemember") != undefined) {
			if (document.getElementById("LoggedByRemember").checked) {
				expire = new Date((new Date()).getTime() + 168 * 3600000); // set for 7 days (hours * ms/hr)
			} else {
				expire = new Date(); // Sets date so that the cookie expries istanyly				
			};
			expire = "; expires=" + expire.toGMTString();
			document.cookie = "LoggedByRemember=" + document.getElementById("LoggedByRemember").checked + expire;
			src = document.getElementById("LoggedByCookieContainer");
			var children = src.getElementsByTagName('*') || src.all;
			for (var c = 0; c < children.length; c++) {
				var child = children[c];
				tag = child.tagName.toUpperCase();
				if (tag == "INPUT") { tag = child.type.toUpperCase(); };
				if (tag == "TEXT" || tag == "TEXTAREA" || tag == "SELECT" || tag == "RADIO" || tag == "CHECKBOX") {
					val = "";
					switch (tag) {
						case 'TEXT':
							val = child.value;
							break;
						case 'TEXTAREA':
							val = child.value;
							break;
						case 'SELECT':
							val = child.value;
							break;
						case 'CHECKBOX':
							val = child.checked;
							break;
						case 'RADIO':
							val = child.checked;
							break;
					}
					document.cookie = child.id + "=" + escape(val) + expire;
				};
			};

			nvxgWIF.writeScratchPadCookie();
		};

	},

	writeScratchPadCookie: function() {

		s = document.getElementById("SaveScratchPad");
		var expire = "";
		if (s != undefined) {
			if (s.checked) {
				expire = new Date((new Date()).getTime() + 30 * 3600000); // set for 90 days
				expire = "; expires=" + expire.toGMTString();
			} else {
				expire = new Date(); // Sets date so that the cookie expries instantly				
			}
			pad = document.getElementById("ScratchPad");
			w = pad.getAttribute("width");
			h = pad.getAttribute("height");
			t = nvxgWIF.getStyle(pad, "top");
			l = nvxgWIF.getStyle(pad, "left");
			document.cookie = "SaveScratchPad=" + document.getElementById("SaveScratchPad").checked + expire;
			document.cookie = "PadText=" + escape(document.getElementById("PadText").value) + expire;
			document.cookie = "PadTop=" + t + expire;
			document.cookie = "PadLeft=" + l + expire;
			document.cookie = "PadWidth=" + w + expire;
			document.cookie = "PadHeight=" + h + expire;
			if (nvxgWIF.ScratchPad.contentIsOpen) { d = "true" } else { d = "false" };
			document.cookie = "PadState=" + d + expire;
		};
	},
	// --------------------------------------------------------------------------------------------------------------------	
	getUILoggedCookie: function() {
		val = Boolean(nvxgWIF.readCookie('LoggedByRemember'));
		if (val) {
			document.getElementById("LoggedByRemember").checked = true;
			src = document.getElementById("LoggedByCookieContainer");
			var children = src.getElementsByTagName('*') || src.all;
			for (var c = 0; c < children.length; c++) {
				var child = children[c];
				tag = child.tagName.toUpperCase();
				if (tag == "INPUT") { tag = child.type.toUpperCase(); };
				if (tag == "TEXT" || tag == "TEXTAREA" || tag == "SELECT" || tag == "RADIO" || tag == "CHECKBOX") {
					val = "";
					val = nvxgWIF.readCookie(child.id);
					targ = document.getElementById(child.id);
					switch (tag) {
						case 'TEXT':
							targ.value = val;
							break;
						case 'TEXTAREA':
							targ.value = val;
							break;
						case 'SELECT':
							targ.value = val;
							break;
						case 'CHECKBOX':
							targ.checked = Boolean(val=="true");
							break;
						case 'RADIO':
							targ.checked = Boolean(val=="true");
							break;
					}
				};
			}
		};

	},

	// --------------------------------------------------------------------------------------------------------------------	
	readCookie: function(name) {
		var cookieValue = "";
		var search = name + "=";
		if (document.cookie.length > 0) {
			offset = document.cookie.indexOf(search);
			if (offset != -1) {
				offset += search.length;
				end = document.cookie.indexOf(";", offset);
				if (end == -1) end = document.cookie.length;
				cookieValue = unescape(document.cookie.substring(offset, end))
			}
		}
		return cookieValue;
	},

	// --------------------------------------------------------------------------------------------------------------------	 	
	getQueryString: function() {
		var query = window.location.search.substring(1);
		var parms = query.split('&');
		for (var i = 0; i < parms.length; i++) {
			var pos = parms[i].indexOf('=');
			if (pos > 0) {
				var key = parms[i].substring(0, pos);
				key = key.toLowerCase();
				var val = parms[i].substring(pos + 1);
				val = val.toLowerCase();
				nvxgWIF.qsParm[key] = val;
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	ControlPanel: function(e) {
		var obj = nvxgWIF.getEventTarget(e);
		state = obj.getAttribute("state");
		targ = obj.getAttribute("target");
		if (state == "closed") {
			eval(targ + ".open()");
			obj.setAttribute("state", "open");
			obj.className = "CollapsibleToolClosed";
			obj.title = "Collapse View";
		} else {
			eval(targ + ".close()");
			obj.setAttribute("state", "closed");
			obj.className = "CollapsibleToolOpen";
			obj.title = "Expand View";
		};
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	ControlPanel2014: function(obj, targ) {
		if (targ.state == "closed") {
			targ.open();
			targ.state = "open";
			obj.setAttribute("state", "open");
		} else {
			targ.close();
			targ.state = "closed";
			obj.setAttribute("state", "closed");
		};
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	AttorneyClientPrivilegeState: true,
	AttorneyClientPrivilegeControls: function() {

		if (nvxgWIF.AttorneyClientPrivilegeState) {
			nvxgWIF.AttorneyClientPrivilegeState = false;
			document.getElementById("AttorneyClientPrivilegeControl").className = "CollapsibleToolOpen";
			document.getElementById("AttorneyClientPrivilegeControl").title = "Expand View";
			nvxgWIF.AttorneyClientPrivilege.close();
		} else {
			nvxgWIF.AttorneyClientPrivilegeState = true;
			document.getElementById("AttorneyClientPrivilegeControl").className = "CollapsibleToolClosed";
			document.getElementById("AttorneyClientPrivilegeControl").title = "Collapse View";
			nvxgWIF.AttorneyClientPrivilege.open();
		};
	},

	// --------------------------------------------------------------------------------------------------------------------	 	
	setListOptions: function(objid, id) {
		id = Number(id);
		obj = document.getElementById(objid);
		x = obj.childNodes.length;
		if (x != 0) {
			for (var i = 0; i < x; i++) {
				obj.removeChild(obj.childNodes[0])
			};
		};
		for (var i = 0; i < reportsource.length; i++) {
			if (reportsource[i].parent == id) {
				var newOption = document.createElement('option');
				newOption.setAttribute('value', reportsource[i].id);
				newOption.setAttribute('title', reportsource[i].label);
				newOption.setAttribute('isother', reportsource[i].isother);
				var text = document.createTextNode(reportsource[i].label);
				newOption.appendChild(text);
				obj.appendChild(newOption);
			};
			obj.selectedIndex = -1;
		}
	},
	// --------------------------------------------------------------------------------------------------------------------	 	
	setToggleIsOther: function(targid, obj) {
		tragContainer = document.getElementById(targid + "Container");
		if (obj.selectedIndex != -1) {
			isother = obj.options[obj.selectedIndex].getAttribute('isother');
			if (isother == "true") {
				tragContainer.style.display = ""
				document.getElementById(targid).focus();
			} else {
				tragContainer.style.display = "none"
				nvxgWIF.clearInputValue(targid);
			}
		} else {
			tragContainer.style.display = "none"
			nvxgWIF.clearInputValue(targid);
		}
	},

	// --------------------------------------------------------------------------------------------------------------------		
	cancelForm: function() {
		r = confirm(lc["$SYS_CXLFORM"] + "\n" + lc["$SYS_CLRFORM"] + "\n\n" + lc["$SYS_CONTINUECONFIRM"]);
		if (r) { window.location = "default.asp" };
	},
	// --------------------------------------------------------------------------------------------------------------------		
	menuWarning: function(formtitle, navto) {
		r = confirm(lc["$SYS_CXLFORM"] + "\n" + lc["$SYS_CLRFORM"] + "\n\n" + lc["$SYS_CONTINUECONFIRM"]);
		if (r) { window.location = navto };
	},
	// --------------------------------------------------------------------------------------------------------------------		
	resetForm: function() {
		r = confirm(lc["$SYS_CXLFORM"] + "\n" + lc["$SYS_CLRFORM"] + "\n\n" + lc["$SYS_CONTINUECONFIRM"]);
		if (r) { window.location = window.location };
	},
	// --------------------------------------------------------------------------------------------------------------------			
	intTimeObjs: function(interval,parent) {
		interval = interval || 1;
		parent = parent || document;
		if (interval == 0 || isNaN(interval)) { interval = 1; } 
		t = nvxgWIF.getObjElementsByClassName('time',parent);
		for (var i = 0; i < t.length; i++) {
			targ = t[i];
			elmname = targ.getAttribute('elmname');
			title = targ.getAttribute('title');
			var output = document.createElement('input');
			output.type = 'hidden';
			output.id = elmname;
			output.name = elmname;
			output.value = "";
			targ.appendChild(output);
			var hrs = document.createElement('select');
			hrs.id = elmname + "_hrs"
			hrs.setAttribute('elmname', elmname);
			hrs.style.paddingTop = "1px";
			hrs.setAttribute('required', 'false');
			hrs.setAttribute('title', title + " : Hrs.");
			hrs.onchange = nvxgWIF.setTimeObj;
			for (var h = 0; h < 12; h++) {
				var newOption = document.createElement('option');
				if (h == 0) {
					h_txt = "12"
				} else {
					if (h < 10) {
						h_txt = "0" + h;
					} else {
						h_txt = h;
					};
				}
				newOption.value = h_txt;
				newOption.title = h_txt;
				text = document.createTextNode(h_txt);
				newOption.appendChild(text);
				hrs.appendChild(newOption);
			}
			targ.appendChild(hrs);
			var mns = document.createElement('select');
			mns.id = elmname + "_mns"
			mns.style.paddingTop = "1px";
			mns.setAttribute('elmname', elmname);
			mns.setAttribute('required', 'false');
			mns.setAttribute('title', title + " : Mins.");
			mns.onchange = nvxgWIF.setTimeObj;
			for (var m = 0; m < 60; m = m + interval) {
				var newOption = document.createElement('option');
				if (m < 10) {
					m_txt = "0" + m;
				} else {
					m_txt = m;
				};
				newOption.value = m_txt;
				newOption.title = m_txt;
				text = document.createTextNode(m_txt);
				newOption.appendChild(text);
				mns.appendChild(newOption);
			}
			targ.appendChild(mns);
			var aps = document.createElement('select');
			aps.id = elmname + "_aps"
			aps.setAttribute('elmname', elmname);
			aps.setAttribute('required', 'false');
			aps.style.paddingTop = "1px";
			aps.setAttribute('title', title + " : am/pm");
			aps.onchange = nvxgWIF.setTimeObj;
			aps.onclick = nvxgWIF.setTimeObj;
			var newOption = document.createElement('option');
			newOption.value = "am";
			newOption.title = "am";
			text = document.createTextNode("am");
			newOption.appendChild(text);
			aps.appendChild(newOption);
			var newOption = document.createElement('option');
			newOption.value = "pm";
			newOption.title = "pm";
			text = document.createTextNode("pm");
			newOption.appendChild(text);
			aps.appendChild(newOption);
			targ.appendChild(aps);
			var setclockIcon = document.createElement('div');
			setclockIcon.setAttribute('elmname', elmname);
			setclockIcon.onclick = nvxgWIF.setClockIconObj;
			setclockIcon.title = "Set '" + title + "' to the current time.";
			setclockIcon.className = 'setclockIcon';
			targ.appendChild(setclockIcon);
			setclock = targ.getAttribute('setclock');
			if (setclock.toUpperCase() == "TRUE") {
				nvxgWIF.setClockObj(elmname);
			} else {
				document.getElementById(elmname).value = document.getElementById(elmname + "_hrs").value + ":" + document.getElementById(elmname + "_mns").value + " " + document.getElementById(elmname + "_aps").value
			};
			nvxgWIF.clearClockObj(elmname);
		}
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setTimeObj: function(e) {
		var obj = nvxgWIF.getEventTarget(e);
		elmname = obj.getAttribute('elmname');
		a = document.getElementById(elmname + "_hrs").selectedIndex;
		b = document.getElementById(elmname + "_mns").selectedIndex;
		c = document.getElementById(elmname + "_aps").selectedIndex;
		if (a != -1 && b == -1 && c == -1) {
			document.getElementById(elmname + "_mns").selectedIndex = 0;
			document.getElementById(elmname + "_aps").selectedIndex = 0;
			document.getElementById(elmname).value = document.getElementById(elmname + "_hrs").value + ":" + document.getElementById(elmname + "_mns").value + " " + document.getElementById(elmname + "_aps").value;
		};
		if (a != -1 && b != -1 && c != -1) {
			document.getElementById(elmname).value = document.getElementById(elmname + "_hrs").value + ":" + document.getElementById(elmname + "_mns").value + " " + document.getElementById(elmname + "_aps").value;
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setClockIconObj: function(e) {
		var obj = nvxgWIF.getEventTarget(e);
		elmname = obj.getAttribute('elmname');
		nvxgWIF.setClockObj(elmname);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	clearClockIconObj: function(e) {
		var obj = nvxgWIF.getEventTarget(e);
		elmname = obj.getAttribute('elmname');
		document.getElementById(elmname).value = "";
		document.getElementById(elmname + "_hrs").selectedIndex = -1;
		document.getElementById(elmname + "_mns").selectedIndex = -1;
		document.getElementById(elmname + "_aps").selectedIndex = -1;
	},
	// --------------------------------------------------------------------------------------------------------------------		
	clearClockObj: function(elmname) {
		document.getElementById(elmname).value = "";
		document.getElementById(elmname + "_hrs").selectedIndex = -1;
		document.getElementById(elmname + "_mns").selectedIndex = -1;
		document.getElementById(elmname + "_aps").selectedIndex = -1;
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setClockObj: function(elmname) {

		var curdate = new Date();
		var h = curdate.getHours();
		if (Number(h) > 11) { ap = "pm" } else { ap = "am" };
		var m = curdate.getMinutes();
		document.getElementById(elmname).value = h + ':' + m + ' ' + ap;
		if (Number(h) == 0) { h = 12 } else { if (Number(h) > 12) { h = h - 12 } };
		if (Number(h) < 10) { h = "0" + h };
		document.getElementById(elmname + "_hrs").value = h;
		if (Number(m) < 10) { m = "0" + m };
		if (m >= 0 && m < 15) { si = 0 };
		if (m >= 15 && m < 30) { si = 15 };
		if (m >= 30 && m < 45) { si = 30 };
		if (m >= 45 && m < 59) { si = 45 };
		document.getElementById(elmname + "_mns").selectedIndex = si;
		document.getElementById(elmname + "_aps").value = ap;
		document.getElementById(elmname).value = document.getElementById(elmname + "_hrs").value + ":" + document.getElementById(elmname + "_mns").value + " " + document.getElementById(elmname + "_aps").value
	},



	// --------------------------------------------------------------------------------------------------------------------	
	getElementLeft: function(Elem) {
		var elem;
		if (document.getElementById) {
			var elem = document.getElementById(Elem);
		} else if (document.all) {
			var elem = document.all[Elem];
		}
		xPos = elem.offsetLeft;
		tempEl = elem.offsetParent;
		while (tempEl != null) {
			xPos += tempEl.offsetLeft;
			tempEl = tempEl.offsetParent;
		}
		return xPos;
	},
	// --------------------------------------------------------------------------------------------------------------------
	getElementTop: function(Elem) {
		if (document.getElementById) {
			var elem = document.getElementById(Elem);
		} else if (document.all) {
			var elem = document.all[Elem];
		}
		yPos = elem.offsetTop;
		tempEl = elem.offsetParent;
		while (tempEl != null) {
			yPos += tempEl.offsetTop;
			tempEl = tempEl.offsetParent;
		}
		return yPos;
	},



	//---------------------------------------------------------------------------------------
	getContainerByQuestion: function(className, obj) {
		if (obj == undefined || obj == '' || obj == null) { obj = document };
		var children = obj.getElementsByTagName('*') || obj.all;
		var elements = [];
		for (var i = 0; i < children.length; i++) {
			var child = children[i];
			var classNames = child.className.split(' ');
			for (var j = 0; j < classNames.length; j++) {
				if (classNames[j] == className) {
					elements.push(child);
					break;
				}
			}
		}
		return elements;
	},

	setCheckBoxGroupColDisplay: function(container, p) {
		while (container.className != 'wifCheckBoxGroup') { container = container.parentNode };
		Q = container.getElementsByTagName("DIV");
		for (E = 0; E < Q.length; E++) {
			isCol = Q[E].getAttribute("isChkBoxColumn");
			if (isCol != undefined) {
				if (isCol == "true") {
					Q[E].className = "wif" + p + "pContainer"
				};
			};
		};
	},


	// --------------------------------------------------------------------------------------------------------------------					
	clearCheckBoxGroup: function(container) {
		while (container.className != 'wifCheckBoxGroup') { container = container.parentNode };
		Q = container.getElementsByTagName("INPUT");
		for (E = 0; E < Q.length; E++) {
			if (Q[E].type.toUpperCase() == "CHECKBOX") {
				Q[E].checked = false;
				Q[E].removeAttribute("disabled");
				Q[E].style.cursor = "default";
				parentObj = Q[E].parentNode;
				parentObj.style.cursor = "default";
				parentObj.style.color = "#000";
			}
			if (Q[E].type.toUpperCase() == "TEXT" || Q[E].type.toUpperCase() == "HIDDEN") {
				Q[E].value = "";
			}
		}
		Q = container.getElementsByTagName("LABEL");
		for (E = 0; E < Q.length; E++) {
			Q[E].style.color = "#000";
		}
		Q = container.getElementsByTagName("SELECT");
		for (E = 0; E < Q.length; E++) {
			Q[E].selectedIndex = -1;
		}

	},
	// --------------------------------------------------------------------------------------------------------------------			 
	numbersonly: function(e) {
		var keyCodeList = "";
		var charCode = 0;
		var n = false;
		var d = false;
		var obj = nvxgWIF.getEventTarget(e);
		try {
			charCode = (e.which) ? e.which : event.keyCode;
			document.getElementById(targetid).focus();
		} catch (err) {
			//Handle errors here
		};
		//  KeyCode : KeyBoardVaule
		keyCodeList = { "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", "96": "numpad 0", "97": "numpad 1", "98": "numpad 2", "99": "numpad 3", "100": "numpad 4", "101": "numpad 5", "102": "numpad 6", "103": "numpad 7", "104": "numpad 8", "105": "numpad 9", "104": "numpad 8", "105": "numpad 9", "35": "Home", "36": "End", "8": "Backspace", "46": "Delete", "9": "Tab", "37": "ArrowLeft", "39": "ArrowRight" };
		keyCodeListNum = { "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", "96": "numpad 0", "97": "numpad 1", "98": "numpad 2", "99": "numpad 3", "100": "numpad 4", "101": "numpad 5", "102": "numpad 6", "103": "numpad 7", "104": "numpad 8", "105": "numpad 9", "104": "numpad 8", "105": "numpad 9" };
		if (charCode in keyCodeList) {
			return true;
		} else {
			return false;
		};
	},
	// --------------------------------------------------------------------------------------------------------------------			 
	currency: function(e) {
		var key;
		var keychar;
		if (window.event)
			key = window.event.keyCode;
		else if (e)
			key = e.which;
		else
			return true;
		keychar = String.fromCharCode(key);
		if ((key == null) || (key == 0) || (key == 8) ||
			(key == 9) || (key == 13) || (key == 27))
			return true;
		else if ((("0123456789.").indexOf(keychar) > -1))
			return true;
		else
			return false;
	},



	// --------------------------------------------------------------------------------------------------------------------		
	setListAvailable: function() {
		r = document.getElementById("ListFilter").value;
		nvxgWIF.clearObjectChildNodes('ListAvailable');
		if (Number(r) == -1) {
			obj = document.getElementById("ListAvailable");
			for (var e = 0; e < ImpactedLocations.length; e++) {
				var newOptGroup = document.createElement('optgroup');
				newOptGroup.label = ImpactedLocations[e].region;
				newOptGroup.title = ImpactedLocations[e].label;

				for (var i = 0; i < ImpactedLocations[e].items.length; i++) {
					if (ImpactedLocations[e].items[i].selected == false) {
						var newOption = document.createElement('option');
						newOption.setAttribute('value', ImpactedLocations[e].items[i].entity);
						newOption.setAttribute('regionIndex', e);
						newOption.setAttribute('entityIndex', i);
						var text = document.createTextNode(ImpactedLocations[e].items[i].entity);
						newOption.appendChild(text);
						newOptGroup.appendChild(newOption);
					};
				}
				if (newOptGroup.children.length != 0) {
					obj.appendChild(newOptGroup);
				}
			}
		} else {
			obj = document.getElementById("ListAvailable");;
			for (var i = 0; i < ImpactedLocations[r].items.length; i++) {
				if (ImpactedLocations[r].items[i].selected == false) {
					var newOption = document.createElement('option');
					newOption.setAttribute('value', ImpactedLocations[r].items[i].entity);
					newOption.setAttribute('regionIndex', r);
					newOption.setAttribute('entityIndex', i);
					var text = document.createTextNode(ImpactedLocations[r].items[i].entity);
					newOption.appendChild(text);
					obj.appendChild(newOption);
				};

			}
		}
		obj.selectedIndex = -1;

		nvxgWIF.clearObjectChildNodes('ListSelected');
		obj = document.getElementById("ListSelected");
		for (var e = 0; e < ImpactedLocations.length; e++) {
			var newOptGroup = document.createElement('optgroup');
			newOptGroup.label = ImpactedLocations[e].region;
			newOptGroup.title = ImpactedLocations[e].label;

			for (var i = 0; i < ImpactedLocations[e].items.length; i++) {
				if (ImpactedLocations[e].items[i].selected == true) {
					var newOption = document.createElement('option');
					newOption.setAttribute('value', ImpactedLocations[e].items[i].entity);
					newOption.setAttribute('regionIndex', e);
					newOption.setAttribute('entityIndex', i);
					var text = document.createTextNode(ImpactedLocations[e].items[i].entity);
					newOption.appendChild(text);
					newOptGroup.appendChild(newOption);
				};
			}
			if (newOptGroup.children.length != 0) {
				obj.appendChild(newOptGroup);
			}
		}
		document.getElementById("entitycount").innerHTML = obj.options.length;
		nvxgWIF.setListToListButtons();
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setSelectedOptions: function(b) {
		if (b) {
			id = "ListAvailable";
			tar = "ListSelected"
		} else {
			id = "ListSelected";
			tar = "ListAvailable"
		};
		obj = document.getElementById(id);
		for (var i = 0; i < obj.options.length; i++) {
			if (obj.options[i].selected) {
				regionIndex = obj.options[i].getAttribute("regionIndex");
				entityIndex = obj.options[i].getAttribute("entityIndex");
				ImpactedLocations[regionIndex].items[entityIndex].selected = b
			}
		}
		document.getElementById(tar).focus();
		nvxgWIF.setListAvailable();
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setAllOptions: function(b) {
		r = Number(document.getElementById("ListFilter").value);
		if (b) {
			id = "ListAvailable";
			tar = "ListSelected";
			if (r == -1) {
				msg = "This option will ADD all items from the \"Available\" list, under \"All\" regions. \nDo you wish to continue?";
			} else {
				msg = "This option will ADD all items from the \"Available\" list,  under the \"" + document.getElementById("ListFilter").options[document.getElementById("ListFilter").selectedIndex].title + "\" region. \nDo you wish to continue?";
			}
		} else {
			id = "ListSelected";
			tar = "ListAvailable";
			msg = "This option will RMOVE all items from the \"Selected\" list. \nDo you wish to continue?";
		};
		c = confirm(msg);
		obj = document.getElementById(id);
		if (c) {
			if (b && r != -1) {
				for (var i = 0; i < ImpactedLocations[r].items.length; i++) {
					ImpactedLocations[r].items[i].selected = b
				}
			} else {
				for (var e = 0; e < ImpactedLocations.length; e++) {
					for (var i = 0; i < ImpactedLocations[e].items.length; i++) {
						ImpactedLocations[e].items[i].selected = b
					}
				}
			}
			document.getElementById(tar).focus();
			nvxgWIF.setListAvailable();
		} else {
			obj.focus();
		};
		nvxgWIF.setListToListButtons();
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setListToListButtons: function() {
		//ADD
		if (document.getElementById("ListAvailable").selectedIndex != -1) {
			nvxgWIF.toggleElements('AddDisabled', 'none');
			nvxgWIF.toggleElements('AddEnabled', '')
		} else {
			nvxgWIF.toggleElements('AddDisabled', '');
			nvxgWIF.toggleElements('AddEnabled', 'none')
		};
		//ADDALL
		if (document.getElementById("ListAvailable").options.length != 0) {
			nvxgWIF.toggleElements('AddAllDisabled', 'none');
			nvxgWIF.toggleElements('AddAllEnabled', '')
		} else {
			nvxgWIF.toggleElements('AddAllDisabled', '');
			nvxgWIF.toggleElements('AddAllEnabled', 'none')
		};
		//REMOVE
		if (document.getElementById("ListSelected").selectedIndex != -1) {
			nvxgWIF.toggleElements('RemoveDisabled', 'none');
			nvxgWIF.toggleElements('RemoveEnabled', '')
		} else {
			nvxgWIF.toggleElements('RemoveDisabled', '');
			nvxgWIF.toggleElements('RemoveEnabled', 'none')
		};
		//REMOVE All
		if (document.getElementById("ListSelected").options.length != 0) {
			nvxgWIF.toggleElements('RemoveAllDisabled', 'none');
			nvxgWIF.toggleElements('RemoveAllEnabled', '')
		} else {
			nvxgWIF.toggleElements('RemoveAllDisabled', '');
			nvxgWIF.toggleElements('RemoveAllEnabled', 'none')
		};
		//Other
		if (document.getElementById("ListFilter").selectedIndex != 0) {
			nvxgWIF.toggleElements('OtherDisabled', 'none');
			nvxgWIF.toggleElements('OtherEnabled', '')
		} else {
			nvxgWIF.toggleElements('OtherDisabled', '');
			nvxgWIF.toggleElements('OtherEnabled', 'none')
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	addOtherListToListItem: function() {
		txt = prompt("Please enter new location item:", "");
		txt = epValidate.trimString(txt);
		if (txt != undefined && txt.length != 0) {
			r = document.getElementById("ListFilter").value;
			var ltlitem = {};
			ltlitem['entity'] = txt;
			ltlitem['selected'] = false;
			ImpactedLocations[r].items.push(ltlitem);
			nvxgWIF.sortListToList(r);
			nvxgWIF.setListAvailable();
			for (var i = 0; i < document.getElementById("ListAvailable").options.length; i++) {
				if (document.getElementById("ListAvailable").options[i].value == txt) {
					document.getElementById("ListAvailable").options[i].selected = true;
					break;
				};
			}
			document.getElementById("OtherItemMsg").innerHTML = "* \"Other\" items are only temporary, and will only be available for this instance of this report.";
			document.getElementById("OtherItemMsg2").innerHTML = "*";
		} else {
			alert(lc["$SYS_ERR.ERROR"]);
		}
		document.getElementById("ListAvailable").focus();
		nvxgWIF.setListToListButtons();
	},
	// --------------------------------------------------------------------------------------------------------------------		
	sortListToList: function(r) {
		field = 'entity';
		descending = false;
		var sample = ImpactedLocations[r].items[0].entity[0];
		switch ((typeof sample).toLowerCase()) {
			case 'string':
				ImpactedLocations[r].items.sort(sortStrings);
				break;
			case 'number':
				ImpactedLocations[r].items.sort(sortNumbers);
				break;
			case 'boolean':
				ImpactedLocations[r].items.sort(sortBool);
				break;
			default:
		}
		if (descending) ImpactedLocations[r].items.reverse();

		function sortStrings(a, b) { return a[field].toLowerCase().localeCompare(b[field].toLowerCase()); }

		function sortNumbers(a, b) { return a[field] - b[field]; }

		function sortBool(a, b) { return sortNumbers(b, a); }
	},

	// --------------------------------------------------------------------------------------------------------------------		
	toggleEmployee: function(val) {
		if (document.getElementById("EmployeeContainer")) {
			if (Number(val) == Number(document.getElementById("EmployeeRelID").value)) {
				nvxgWIF.toggleElements('EmployeeContainer', '');
			} else {
				nvxgWIF.toggleElements('EmployeeContainer', 'none');
				nvxgWIF.clearContainerInputValue('EmployeeContainer');
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------		
	autoresize: function(txtbox) {
		var cols = txtbox.cols;
		var minrows = txtbox.getAttribute("minrows");
		var maxrows = txtbox.getAttribute("maxrows");
		if (minrows == undefined) { minrows = txtbox.getAttribute("rows") };
		if (maxrows == undefined) { maxrows = 10 };
		var content = txtbox.value;
		var lineCount = 1;
		var lastEOL = -1;
		do {
			var begin = lastEOL + 1;
			lastEOL = content.indexOf("\n", lastEOL + 1);
			var line = "";
			if (lastEOL != -1) {
				line = content.substring(begin, lastEOL);
			} else {
				line = content.substring(begin, content.length);
			}
			var rows_in_line = Math.floor(line.length / cols) + 1;
			lineCount += rows_in_line
		} while (lastEOL != -1);
		if (lineCount <= minrows) { lineCount = minrows };
		if (lineCount >= maxrows) { lineCount = maxrows };

		txtbox.rows = lineCount;

		maxchar = txtbox.getAttribute("maxchar");
		if (maxchar != undefined) {
			if (Number(maxchar) != 0) {
				txtlen = txtbox.value.length;
				if (Number(txtlen) > Number(maxchar)) {
					str = txtbox.value;
					txtbox.value = str.substring(0, maxchar);
					return false
				};
				var y = txtbox.value;
				var r = 0;
				a = y.replace(/\s/g, ' ');
				a = a.split(' ');
				for (z = 0; z < a.length; z++) { if (a[z].length > 0) r++; }
				container = txtbox;
				container = container.parentNode;
				container = container.parentNode;
				var countelm = nvxgWIF.getObjElementsByClassName("charcount", container);
				if (countelm.length != 0) {
					countstr = countelm[0].getAttribute("charcount");
					countstr = countstr.replace("[WORDCOUNT]", r);
					countstr = countstr.replace("[CHARCOUNT]", txtlen);
					countstr = countstr.replace("[MAXCOUNT]", maxchar);
					p = (txtlen / maxchar)
					hp = (125 * Number(p));
					hp = hp.toFixed(0);
					hp = (125 - hp) * -1;
					vp = (125 * Number(p));
					vp = vp.toFixed(0);
					vp = vp * -1;
					countelm[0].innerHTML = countstr;
					countelm[0].style.backgroundPosition = hp + "px " + vp + "px";
				};
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		

	// --------------------------------------------------------------------------------------------------------------------		
	setTierID: function(val) {
		for (var e = 0; e < TierMapping.length; e++) {
			if (TierMapping[e].tiername == val) { document.getElementById("TierID").value = TierMapping[e].cm; break };
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setCurrencyType: function(obj) {
		opt = obj.options[obj.selectedIndex];
		CurrencySymbol = opt.getAttribute("symbol");
		CurrencyFixed = opt.getAttribute("fixedto");
		CurrencyTitle = opt.getAttribute("title");
		if (Number(CurrencyFixed) == 0) { CurrencyFixedTxt = "#" };
		if (Number(CurrencyFixed) == 1) { CurrencyFixedTxt = "#.#" };
		if (Number(CurrencyFixed) == 2) { CurrencyFixedTxt = "#.##" };
		if (Number(CurrencyFixed) == 3) { CurrencyFixedTxt = "#.###" };
		if (Number(CurrencyFixed) == 4) { CurrencyFixedTxt = "#.####" };

		CurrencyTitle = opt.title;
		CurrencyCode = opt.value;
		container = obj;
		container = container.parentNode;
		while (container.className.indexOf("InputContainer") != -1) { container = container.parentNode };

		CurrencySymbolContainer = nvxgWIF.getObjElementsByClassName("CurrencySymbol", container);
		CurrencySymbolContainer[0].innerHTML = CurrencySymbol;
		CurrencySymbolContainer[0].title = CurrencyTitle;
		CurrencyFormatContainer = nvxgWIF.getObjElementsByClassName("wifFieldFormatDef", container);
		CurrencyFormatContainer[0].innerHTML = "(Format: " + CurrencyFixedTxt + ")";
		var children = container.getElementsByTagName('*');
		for (var i = 0; i < children.length; i++) {
			if (children[i].className.indexOf("pCurrency") != -1) { break; }
		};
		f = Number(CurrencyFixed);
		children[i].setAttribute("fixed", f);
		children[i].value = Number(children[i].value).toFixed(f);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	submitOnEnter: function() {
		var key;
		var keychar;
		if (window.event)
			key = window.event.keyCode;
		else if (e)
			key = e.which;
		else
			return true;
		keychar = String.fromCharCode(key);
		if (key == 13) { nvxgWIF.submitEPLogin() };
	},
	// --------------------------------------------------------------------------------------------------------------------		
	fixedNumberKey: function(e) {
		var keyCodeList = "";
		var charCode = 0;
		var n = false;
		var d = false;
		var obj = nvxgWIF.getEventTarget(e);
		v = obj.value;
		c = obj.className.indexOf("Calendar");
		f = obj.getAttribute("fixed");
		if (f.indexOf("-") != -1) { n = true };
		if (v.indexOf("-") != -1) { n = false };
		f = Number(f);
		if (f != 0) { d = true };
		if (v.indexOf(".") != -1) { d = false };
		try {
			charCode = (e.which) ? e.which : event.keyCode;
			document.getElementById(targetid).focus();
		} catch (err) {
			//Handle errors here
		}

		// KeyCode : KeyBoardVaule
		keyCodeList = { "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", "96": "numpad 0", "97": "numpad 1", "98": "numpad 2", "99": "numpad 3", "100": "numpad 4", "101": "numpad 5", "102": "numpad 6", "103": "numpad 7", "104": "numpad 8", "105": "numpad 9", "104": "numpad 8", "105": "numpad 9", "35": "Home", "36": "End", "8": "Backspace", "46": "Delete", "9": "Tab", "37": "ArrowLeft", "39": "ArrowRight" };
		keyCodeListNum = { "48": "0", "49": "1", "50": "2", "51": "3", "52": "4", "53": "5", "54": "6", "55": "7", "56": "8", "57": "9", "96": "numpad 0", "97": "numpad 1", "98": "numpad 2", "99": "numpad 3", "100": "numpad 4", "101": "numpad 5", "102": "numpad 6", "103": "numpad 7", "104": "numpad 8", "105": "numpad 9", "104": "numpad 8", "105": "numpad 9" };
		if (n) {
			keyCodeList["109"] = "Dash";
			keyCodeList["189"] = "Subtract";
		};
		if (d) {
			keyCodeList["110"] = "Decimal Point";
			keyCodeList["190"] = "Period";
		};
		if (c != -1) {
			keyCodeList["111"] = "/";
			keyCodeList["191"] = "/";
		}
		if (charCode in keyCodeList) {
			//if (charCode in keyCodeListNum){
			//	if(f!=0 && v.indexOf(".")!=-1 && v.substring(v.indexOf("."),v.length).length>f){return false};
			//};
			return true;
		} else {
			return false;

		};


	},
	// --------------------------------------------------------------------------------------------------------------------			
	moveCarret: function(e) {
		obj = nvxgWIF.getEventTarget(e);
		var charCode;
		if (e && e.which) { charCode = e.which; } else if (window.event) {
			e = window.event;
			charCode = e.keyCode;
		};
		m = Number(obj.getAttribute("maxlength"));
		if (m == 3) { t = 0 };
		if (m == 2) { t = 1 };
		if (m == 4) { t = 2 };

		par = obj.parentNode;
		ssn = nvxgWIF.getObjElementsByClassName("ssn", par);
		if (t != 0 && obj.value.length == 0) {
			if (charCode == 8 || charCode == 64) {
				u = t - 1;
				ssn[u].focus();
				//ssn[u].select();

			};
		};

		//		window.status=obj.id;
	},
	// --------------------------------------------------------------------------------------------------------------------			
	toggleFilter: function(ListIndex) {
		Prefix = LTL[ListIndex].Prefix;
		obj = document.getElementById(Prefix + "_ListFilter");
		if (document.getElementById(Prefix + "_DisplayOptionSort").checked) {
			obj.setAttribute('disabled', 'disabled');
			obj.onfocus = "";
			obj.onblur = "";
			parentobj = document.getElementById(obj.id).parentNode;
			parentobj.style.backgroundColor = "#ededed"
			document.getElementById(Prefix + "_ListFilterConatiner").style.backgroundImage = `url(${document.getElementById("filepathDepth").value}_public_includes/images/filter_disabled.png)`;
			document.getElementById(Prefix + "_ListFilter").selectedIndex = 0;
		} else {
			obj.removeAttribute('disabled');
			obj.style.backgroundColor = "#ffffff";
			obj.style.color = "#000000"
			obj.onfocus = nvxgWIF.focusEml;
			obj.onblur = nvxgWIF.blurEml;
			parentobj = document.getElementById(obj.id).parentNode;
			parentobj.style.backgroundColor = "#ffffff";
			document.getElementById(Prefix + "_ListFilterConatiner").style.backgroundImage = `url(${document.getElementById("filepathDepth").value}_public_includes/images/filter.png)`;

		};
		nvxgWIF.setListAvailable(ListIndex);
		nvxgWIF.setListToListButtons(ListIndex);

	},

	// --------------------------------------------------------------------------------------------------------------------		
	setListAvailable: function(ListIndex) {

		alpha = true;
		ListObj = LTL[ListIndex].ListValues;
		Prefix = LTL[ListIndex].Prefix;
		r = document.getElementById(Prefix + "_ListFilter").value;
		nvxgWIF.clearObjectChildNodes(Prefix + "_ListAvailable");
		if (document.getElementById(Prefix + "_DisplayOptionSort").checked) {
			for (var e = 0; e < ListObj.length; e++) {
				for (var i = 0; i < ListObj[e].items.length; i++) {
					if (ListObj[e].items[i].selected == false) {
						var alphaitem = {};
						alphaitem['entity'] = ListObj[e].items[i].entity;;
						alphaitem['regionIndex'] = e;
						alphaitem['entityIndex'] = i;

						LTL[ListIndex].Alpha.push(alphaitem);
					};
				};
			};
			nvxgWIF.sortListToList(LTL[ListIndex].Alpha);
			var e = null;
			var i = null;
			obj = document.getElementById(Prefix + "_ListAvailable");
			for (var j = 0; j < LTL[ListIndex].Alpha.length; j++) {

				e = LTL[ListIndex].Alpha[j].regionIndex;
				i = LTL[ListIndex].Alpha[j].entityIndex;


				var newOption = document.createElement('option');
				newOption.setAttribute('value', ListObj[e].items[i].entity);
				if (ListObj[e].items[i].csstext != undefined) { newOption.style.cssText = ListObj[e].items[i].csstext; };
				newOption.setAttribute('regionIndex', e);
				newOption.setAttribute('entityIndex', i);

				var text = document.createTextNode(ListObj[e].items[i].entity);
				newOption.title = ListObj[e].items[i].entity;
				newOption.appendChild(text);
				obj.appendChild(newOption);


			}
			LTL[ListIndex].Alpha = [];
		} else {
			if (Number(r) == -1) {
				obj = document.getElementById(Prefix + "_ListAvailable");
				for (var e = 0; e < ListObj.length; e++) {
					var newOptGroup = document.createElement('optgroup');
					newOptGroup.label = ListObj[e].region;
					//newOptGroup.title = ListObj[e].label;

					for (var i = 0; i < ListObj[e].items.length; i++) {
						if (ListObj[e].items[i].selected == false) {
							var newOption = document.createElement('option');
							newOption.setAttribute('value', ListObj[e].items[i].entity);
							newOption.setAttribute('regionIndex', e);
							newOption.setAttribute('entityIndex', i);
							var text = document.createTextNode(ListObj[e].items[i].entity);
							newOption.title = ListObj[e].items[i].entity;
							newOption.appendChild(text);
							if (ListObj[e].items[i].csstext != undefined) { newOption.style.cssText = ListObj[e].items[i].csstext; };
							newOptGroup.appendChild(newOption);
						};
					}
					if (newOptGroup.children.length != 0) {
						obj.appendChild(newOptGroup);
					}
				}
			} else {
				obj = document.getElementById(Prefix + "_ListAvailable");;
				for (var i = 0; i < ListObj[r].items.length; i++) {
					if (ListObj[r].items[i].selected == false) {
						var newOption = document.createElement('option');
						newOption.setAttribute('value', ListObj[r].items[i].entity);
						newOption.setAttribute('regionIndex', r);
						newOption.setAttribute('entityIndex', i);
						if (ListObj[r].items[i].csstext != undefined) { newOption.style.cssText = ListObj[r].items[i].csstext; };
						var text = document.createTextNode(ListObj[r].items[i].entity);
						newOption.title = ListObj[r].items[i].entity;
						newOption.appendChild(text);
						obj.appendChild(newOption);
					};

				}
			}
		}
		obj.selectedIndex = -1;

		nvxgWIF.clearObjectChildNodes(Prefix + "_ListSelected");
		obj = document.getElementById(Prefix + "_ListSelected");
		for (var e = 0; e < ListObj.length; e++) {
			var newOptGroup = document.createElement('optgroup');
			newOptGroup.label = ListObj[e].region;
			newOptGroup.title = ListObj[e].label;

			for (var i = 0; i < ListObj[e].items.length; i++) {
				if (ListObj[e].items[i].selected == true) {
					var newOption = document.createElement('option');
					newOption.setAttribute('value', ListObj[e].items[i].entity);
					newOption.setAttribute('regionIndex', e);
					newOption.setAttribute('entityIndex', i);
					if (ListObj[e].items[i].csstext != undefined) { newOption.style.cssText = ListObj[e].items[i].csstext; };
					var text = document.createTextNode(ListObj[e].items[i].entity);
					newOption.title = ListObj[e].items[i].entity;
					newOption.appendChild(text);
					newOptGroup.appendChild(newOption);
				};
			}
			if (newOptGroup.children.length != 0) {
				obj.appendChild(newOptGroup);
			}
		}
		document.getElementById(Prefix + "_entitycount").innerHTML = obj.options.length;
		nvxgWIF.setListToListButtons(ListIndex);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setSelectedOptions: function(b, ListIndex) {
		ListObj = LTL[ListIndex].ListValues;
		Prefix = LTL[ListIndex].Prefix;
		if (b) {
			id = Prefix + "_ListAvailable";
			tar = Prefix + "_ListSelected"
		} else {
			id = Prefix + "_ListSelected";
			tar = Prefix + "_ListAvailable"
		};
		obj = document.getElementById(id);
		for (var i = 0; i < obj.options.length; i++) {
			if (obj.options[i].selected) {
				regionIndex = obj.options[i].getAttribute("regionIndex");
				entityIndex = obj.options[i].getAttribute("entityIndex");
				ListObj[regionIndex].items[entityIndex].selected = b
			}
		}
		document.getElementById(tar).focus();
		nvxgWIF.setListAvailable(ListIndex);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setAllOptions: function(b, ListIndex) {
		ListObj = LTL[ListIndex].ListValues;
		Prefix = LTL[ListIndex].Prefix;

		r = Number(document.getElementById(Prefix + "_ListFilter").value);
		if (b) {
			id = Prefix + "_ListAvailable";
			tar = Prefix + "_ListSelected";
			if (r == -1) {
				msg = "This option will ADD all items from the \"Available\" list, under \"All\" categories. \rDo you wish to continue?";
			} else {
				msg = "This option will ADD all items from the \"Available\" list,  under the \"" + document.getElementById(Prefix + "_ListFilter").options[document.getElementById(Prefix + "_ListFilter").selectedIndex].title + "\" region. \rDo you wish to continue?";
			}
		} else {
			id = Prefix + "_ListSelected";
			tar = Prefix + "_ListAvailable";
			msg = "This option will REMOVE all items from the \"Selected\" list. \rDo you wish to continue?";
		};
		c = confirm(msg);
		obj = document.getElementById(id);
		if (c) {
			if (b && r != -1) {
				for (var i = 0; i < ListObj[r].items.length; i++) {
					ListObj[r].items[i].selected = b
				}
			} else {
				for (var e = 0; e < ListObj.length; e++) {
					for (var i = 0; i < ListObj[e].items.length; i++) {
						ListObj[e].items[i].selected = b
					}
				}
			}
			document.getElementById(tar).focus();
			nvxgWIF.setListAvailable(ListIndex);
		} else {
			obj.focus();
		};
		nvxgWIF.setListToListButtons(ListIndex);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setListToListButtons: function(ListIndex) {
		ListObj = LTL[ListIndex].ListValues;
		Prefix = LTL[ListIndex].Prefix;

		i = 0;
		e = 0;
		//ADD
		if (document.getElementById(Prefix + "_ListAvailable").selectedIndex != -1) {
			nvxgWIF.toggleElements(Prefix + "_AddDisabled", "none");
			nvxgWIF.toggleElements(Prefix + "_AddEnabled", "")
		} else {
			nvxgWIF.toggleElements(Prefix + "_AddDisabled", "");
			nvxgWIF.toggleElements(Prefix + "_AddEnabled", "none")
		};
		//ADDALL
		if (document.getElementById(Prefix + "_ListAvailable").options.length != 0) {
			nvxgWIF.toggleElements(Prefix + "_AddAllDisabled", "none");
			nvxgWIF.toggleElements(Prefix + "_AddAllEnabled", "")
		} else {
			nvxgWIF.toggleElements(Prefix + "_AddAllDisabled", "");
			nvxgWIF.toggleElements(Prefix + "_AddAllEnabled", "none")
		};
		//REMOVE
		if (document.getElementById(Prefix + "_ListSelected").selectedIndex != -1) {
			nvxgWIF.toggleElements(Prefix + "_RemoveDisabled", "none");
			nvxgWIF.toggleElements(Prefix + "_RemoveEnabled", "")
		} else {
			nvxgWIF.toggleElements(Prefix + "_RemoveDisabled", "");
			nvxgWIF.toggleElements(Prefix + "_RemoveEnabled", "none")
		};
		//REMOVE All
		if (document.getElementById(Prefix + "_ListSelected").options.length != 0) {
			nvxgWIF.toggleElements(Prefix + "_RemoveAllDisabled", "none");
			nvxgWIF.toggleElements(Prefix + "_RemoveAllEnabled", "")
		} else {
			nvxgWIF.toggleElements(Prefix + "_RemoveAllDisabled", "");
			nvxgWIF.toggleElements(Prefix + "_RemoveAllEnabled", "none")
		};


		if (document.getElementById(Prefix + "_ListFilter").selectedIndex != 0) {
			nvxgWIF.toggleElements(Prefix + "_OtherDisabled", "none");
			nvxgWIF.toggleElements(Prefix + "_OtherEnabled", "")
		} else {
			nvxgWIF.toggleElements(Prefix + "_OtherDisabled", "");
			nvxgWIF.toggleElements(Prefix + "_OtherEnabled", "none")
		};



	},

	// --------------------------------------------------------------------------------------------------------------------		
	addOtherListToListItem: function(ListIndex) {
		ListObj = LTL[ListIndex].ListValues;
		Prefix = LTL[ListIndex].Prefix;


		txt = prompt("Please enter new location item:", "");
		txt = epValidate.trimString(txt);
		if (txt != undefined && txt.length != 0) {
			r = document.getElementById(Prefix + "_ListFilter").value;
			var ltlitem = {};
			ltlitem['entity'] = txt;
			ltlitem['selected'] = false;
			ltlitem['csstext'] = "color:#F60 !important";


			ListObj[r].items.push(ltlitem);


			nvxgWIF.sortListToListOther(r, ListIndex);
			nvxgWIF.setListAvailable(ListIndex);
			for (var i = 0; i < document.getElementById(Prefix + "_ListAvailable").options.length; i++) {
				if (document.getElementById(Prefix + "_ListAvailable").options[i].value == txt) {
					document.getElementById(Prefix + "_ListAvailable").options[i].selected = true;
					break;
				};
			}
			document.getElementById(Prefix + "_OtherItemMsg").style.display = "";
		} else {
			alert(lc["$SYS_ERR.ERROR"]);
		}
		document.getElementById(Prefix + "_ListAvailable").focus();
		nvxgWIF.setListToListButtons(ListIndex);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	sortListToListOther: function(r, ListIndex) {
		ListObj = LTL[ListIndex].ListValues;
		Prefix = LTL[ListIndex].Prefix;
		field = 'entity';
		descending = false;
		ListObj[r].items.sort(sortStrings);

		function sortStrings(a, b) { return a[field].toLowerCase().localeCompare(b[field].toLowerCase()); }
	},

	// --------------------------------------------------------------------------------------------------------------------		
	sortListToList: function(ListObj) {
		field = 'entity';
		ListObj.sort(sortStrings);

		function sortStrings(a, b) { return a[field].toLowerCase().localeCompare(b[field].toLowerCase()); }

		function sortNumbers(a, b) { return a[field] - b[field]; }

		function sortBool(a, b) { return sortNumbers(b, a); }
	},
	// --------------------------------------------------------------------------------------------------------------------		
	UITabs: [{ index: 0, label: "All", title: "Display \"All\" Sub-Sections", active: true }],
	UISections: [],
	// --------------------------------------------------------------------------------------------------------------------		
	tabControlWidth: 0,
	tabControlScrollPos: 0,
	tabControlScrollDirection: null, //Right = true | Left = false | Stop = null
	tabControlScrollMouseDown: false,
	tabControlObj: null,
	dragOK: null,
	clickOK: true,
	dragXoffset: null,


	// --------------------------------------------------------------------------------------------------------------------
	tabDragHandler: function() {
		/*		var htype='-moz-grabbing'; 
				if (e == null) {e = window.event; htype='move';}  
				var target = e.target != null ? e.target : e.srcElement; 
				while(target.id != 'UITabControl'){if(target.tagName != 'BODY'){target = target.parentNode;}else{break}}; 
				if (target.id=='UITabControl') {
					nvxgWIF.tabControlObj=target;
					nvxgWIF.dragOK=true;
					nvxgWIF.clickOK=false
					nvxgWIF.dragXoffset=e.clientX - (parseInt(document.getElementById("MasterContainer").offsetLeft)+24);			
					document.onmousemove=nvxgWIF.moveHandler;
					//document.onmouseup=epLoactionsSearch.cleanup;
					return false;
				};
		*/
	},
	// --------------------------------------------------------------------------------------------------------------------
	moveHandler: function(e) {
		if (e == null) { e = window.event }
		if (e.button <= 1 && nvxgWIF.dragOK) {
			x = e.clientX - (parseInt(document.getElementById("MasterContainer").offsetLeft) + 20);
			p = nvxgWIF.dragXoffset - x
			q = ((nvxgWIF.tabControlWidth * -1) - 752);
			if (p > q) { p = q };
			if (p < 0) { p = 0 };
			document.getElementById("UITabControl").style.marginLeft = (p * -1) + "px";
			nvxgWIF.tabControlScrollPos = p * -1;
			//	if(nvxgWIF.tabControlScrollPos<0){document.getElementById("tabScrollLeft").style.display="";}else{document.getElementById("tabScrollLeft").style.display="none"};	
			//	if(nvxgWIF.tabControlScrollPos==nvxgWIF.tabControlWidth+752){document.getElementById("tabScrollRight").style.display="none";}else{document.getElementById("tabScrollRight").style.display=""};				


			return false;
		}



	},
	// --------------------------------------------------------------------------------------------------------------------		
	tabControlScroll: function() {
		if (nvxgWIF.tabControlScrollMouseDown) {
			obj = document.getElementById("UITabControl");
			if (nvxgWIF.tabControlScrollDirection != null) {
				if (nvxgWIF.tabControlScrollDirection) {
					nvxgWIF.tabControlScrollPos = nvxgWIF.tabControlScrollPos - 5;
					if (nvxgWIF.tabControlScrollPos < nvxgWIF.tabControlWidth + 752) { nvxgWIF.tabControlScrollPos = nvxgWIF.tabControlWidth + 752 }
				} else {
					nvxgWIF.tabControlScrollPos = nvxgWIF.tabControlScrollPos + 5;
					if (nvxgWIF.tabControlScrollPos >= 0) { nvxgWIF.tabControlScrollPos = 0 }
				};
				obj.style.marginLeft = nvxgWIF.tabControlScrollPos + "px";
				//			if(nvxgWIF.tabControlScrollPos<0){document.getElementById("tabScrollLeft").style.display="";}else{document.getElementById("tabScrollLeft").style.display="none"};	
				//			if(nvxgWIF.tabControlScrollPos==nvxgWIF.tabControlWidth+752){document.getElementById("tabScrollRight").style.display="none";}else{document.getElementById("tabScrollRight").style.display=""};				
				setTimeout("nvxgWIF.tabControlScroll()", 10);
			};


		};
	},

	// --------------------------------------------------------------------------------------------------------------------		
	scrollLockTabControl: function() {
		if (window.pageYOffset >= nvxgWIF.TabBarObjLockHeight) {
			nvxgWIF.TabBarObj.style.position = "fixed";
			nvxgWIF.TabBarObj.style.top = "0px";
			document.getElementById("UITabControl").style.backgroundColor = "#fff";
			nvxgWIF.TabBarObjIsLockHeight = true;
		} else {

			nvxgWIF.TabBarObj.style.position = "";
			nvxgWIF.TabBarObj.style.top = "";
			document.getElementById("UITabControl").style.backgroundColor = "";
			nvxgWIF.TabBarObjIsLockHeight = false;

		};



	},

	changeAlpha: function(obj, opacity) {
		if (opacity > 0) {
			opacity -= 0.1;
			opacity *= 100;
			opacity = Math.floor(opacity);
			opacity /= 100;
			obj.style.filter = "alpha(opacity=" + opacity * 100 + ")";
			obj.style.opacity = opacity;
			obj.timeout = setTimeout(function() {
				changeAlpha(obj, opacity);
			}, 75);
		} else if (opacity <= 0) {
			clearTimeout(obj.timeout);
			obj.style.filter = "alpha(opacity=100)";
			obj.style.opacity = "1";
			elm.insertBefore(obj, imgs[0]);
			imgs = elm.getElementsByTagName("div");
			elm.timeout = setTimeout(function() {
				changeAlpha(imgs[len], 1);
			}, delay);
		}
	},


	// --------------------------------------------------------------------------------------------------------------------		
	initTabControl: function() {
		targ = document.getElementById("UITabControl");

		if (targ != undefined) {
			nvxgWIF.UISections = nvxgWIF.getObjElementsByClassName('SectionContainer');

			for (var t = 0; t < nvxgWIF.UISections.length; t++) {
				if (nvxgWIF.UISections[t].getAttribute("sectionlabel") != undefined) {
					var uitabitem = {};
					uitabitem['index'] = t + 1;
					seclabel = lc[nvxgWIF.UISections[t].getAttribute("sectionlabel")];
					tablabel = lc[nvxgWIF.UISections[t].getAttribute("tablabel")];
					if (tablabel != undefined) {
						uitabitem['title'] = tablabel;
						uitabitem['label'] = tablabel;
					} else {
						uitabitem['title'] = tablabel;
						uitabitem['title'] = seclabel;
					};
					uitabitem['objname'] = nvxgWIF.UISections[t].getAttribute("objname");
					uitabitem['active'] = false;
					nvxgWIF.UITabs.push(uitabitem);
					uitabitem = null;
				};
			};

			nvxgWIF.clearObjectChildNodes("UITabControl");
			for (var t = 0; t < nvxgWIF.UITabs.length; t++) {
				var TabItem = document.createElement('div');
				if (nvxgWIF.UITabs[t].objname != null) {

					var TabItemCounter = document.createElement('span');
					TabItemCounter.setAttribute("objname", nvxgWIF.UITabs[t].objname);
					TabItemCounter.setAttribute("sourceid", "multiedit");
					TabItemCounter.title = "";
					TabItemCounter.className = "MultiRecordItemTabCounter";
					TabItemCounter.id = nvxgWIF.UITabs[t].objname + "ItemTabCounter";
					TabItemCounter.innerHTML = "0";
					TabItemCounter.style.display = "none";
					TabItemCounter.setAttribute("index", nvxgWIF.UITabs[t].index);
					TabItemCounter.setAttribute("active", nvxgWIF.UITabs[t].active);
					TabItemCounter.onclick = nvxgWIF.TabControlClick;
					TabItem.appendChild(TabItemCounter);
				};

				TabItemTxt = document.createTextNode(nvxgWIF.UITabs[t].label);
				TabItem.appendChild(TabItemTxt);
				TabItem.title = nvxgWIF.UITabs[t].title;
				//TabItem.tabIndex = 0;
				TabItem.setAttribute("index", nvxgWIF.UITabs[t].index);
				TabItem.setAttribute("active", nvxgWIF.UITabs[t].active);
				TabItem.onclick = nvxgWIF.TabControlClick;
				if (t == 0) { TabItem.style.backgroundColor = "#17a5f7"; };

				targ.appendChild(TabItem);
			};
			tabs = targ.getElementsByTagName("DIV");
			for (var t = 0; t < tabs.length; t++) {
				nvxgWIF.tabControlWidth = nvxgWIF.tabControlWidth + nvxgWIF.getElementWidth(tabs[t]);
			};
			//		if(nvxgWIF.tabControlWidth<752){
			//			document.getElementById("tabScrollLeft").style.display="none";
			//			document.getElementById("tabScrollRight").style.display="none";
			//		};
			//		if(nvxgWIF.tabControlWidth>752){document.getElementById("tabScrollRight").style.display="";}
			nvxgWIF.tabControlWidth = nvxgWIF.tabControlWidth * -1;



		};


	},
	RetunFalse: function() { return false },
	// --------------------------------------------------------------------------------------------------------------------		
	TabControlClick: function(e) {
		if (nvxgWIF.clickOK) {
			var tab = nvxgWIF.getEventTarget(e);
			targ = document.getElementById("UITabControl")
			tabItems = targ.getElementsByTagName('div');
			anchors = nvxgWIF.getObjElementsByClassName('anchor');

			i = Number(tab.getAttribute("index"));
			for (var t = 0; t < nvxgWIF.UITabs.length; t++) {
				tabItems[t].style.backgroundColor = "transparent";
				nvxgWIF.UITabs[t].active = false;
				if (t != nvxgWIF.UITabs.length - 1) {
					nvxgWIF.UISections[t].style.display = "none";
				};
			};
			tabItems[i].style.backgroundColor = "#17a5f7";
			nvxgWIF.UITabs[i].active = true;
			if (i == 0) {
				for (var t = 0; t < nvxgWIF.UITabs.length - 1; t++) {
					nvxgWIF.UISections[t].style.display = "";
					anchors[t].style.display = "";
				};
			} else {

				anchors[i - 1].style.display = "none";
				nvxgWIF.UISections[i - 1].style.display = "";

			};
			tabs = targ.getElementsByTagName("DIV");
			tabpos = 0
			for (var t = 0; t < i + 1; t++) {
				tabpos = tabpos + nvxgWIF.getElementWidth(tabs[t]);
			};
			p = (tabpos - 752) * -1;
			if (p < nvxgWIF.tabControlScrollPos) {
				nvxgWIF.tabControlScrollPos = p;
				obj.style.marginLeft = nvxgWIF.tabControlScrollPos + "px";
			};
			ipos = (tabpos - (nvxgWIF.getElementWidth(tabs[i]))) * -1;
			if (nvxgWIF.tabControlScrollPos < ipos) {
				nvxgWIF.tabControlScrollPos = ipos;
				obj.style.marginLeft = nvxgWIF.tabControlScrollPos + "px";

			};
			//			if(nvxgWIF.tabControlScrollPos<0){document.getElementById("tabScrollLeft").style.display="";}else{document.getElementById("tabScrollLeft").style.display="none"};	
			//			if(nvxgWIF.tabControlScrollPos==nvxgWIF.tabControlWidth+752){document.getElementById("tabScrollRight").style.display="none";}else{document.getElementById("tabScrollRight").style.display=""};				
		};
		if (nvxgWIF.TabBarObjIsLockHeight) {
			window.scrollBy(0, -50);
		};
		window.location = "#tabjump";
	},
	// --------------------------------------------------------------------------------------------------------------------				
	getElementWidth: function(obj) {
		if (typeof obj.clip !== "undefined") {
			return obj.clip.width;
		} else {
			if (obj.pixelWidth) {
				return obj.style.pixelWidth;
			} else {
				return obj.offsetWidth;
			}
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	removeHTMLTags: function(htmlString) {
		if (htmlString) {
			var mydiv = document.createElement("div");
			mydiv.innerHTML = htmlString;
			if (document.all) {
				ht = mydiv.innerText;
				ht = ht.replace(/“/g, '"');
				ht = ht.replace(/(<([^>]+)>)/ig, "");
				return ht;
			} else {
				ht = mydiv.textContent;
				ht = ht.replace(/"“/g, '"');
				ht = ht.replace(/(<([^>]+)>)/ig, "");
				return ht;
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------			
	createFloatingDiv: function() {
		var container = document.createElement('DIV');
		container.setAttribute("elm", 'container');
		container.className = "floatingDiv";
		z = nvxgWIF.getNextHighestZindex();
		container.style.zIndex = z;
		var divbody = document.createElement('div');
		divbody.setAttribute("elm", 'divbody');
		var titlebar = document.createElement('div');
		titlebar.setAttribute("elm", 'titlebar');
		titlebar.onmousedown = nvxgWIF.dragStart;
		divbody.appendChild(titlebar);
		var content = document.createElement('div');
		content.setAttribute("elm", 'content');
		divbody.appendChild(content);
		container.appendChild(divbody);
		var shadow = document.createElement('img');
		w = nvxgWIF.getStyle(container, "width");
		w = nvxgWIF.stripStyle(w);
		shadow.src = `${document.getElementById("filepathDepth").value}_public_includes/images/popup_shadow.png`;
		shadow.setAttribute("elm", 'shadow');
		shadow.width = w;
		container.appendChild(shadow);
		return container;
	},


	// --------------------------------------------------------------------------------------------------------------------		
	dragStart: function(event) {
		var obj = nvxgWIF.getEventTarget(event);
		while (obj.getAttribute("elm") != 'container') { obj = obj.parentNode };
		var el;
		var x, y;
		dragObj.elNode = obj;
		if (nvxgWIF.isIE) {
			x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
			y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
		} else {
			x = event.clientX + window.scrollX;
			y = event.clientY + window.scrollY;
		};
		dragObj.cursorStartX = x;
		dragObj.cursorStartY = y;
		dragObj.elStartLeft = parseInt(dragObj.elNode.style.left, 10);
		dragObj.elStartTop = parseInt(dragObj.elNode.style.top, 10);
		if (isNaN(dragObj.elStartLeft)) {
			l = nvxgWIF.getStyle(obj, "left");
			l = nvxgWIF.stripStyle(l);
			dragObj.elStartLeft = l
		};
		if (isNaN(dragObj.elStartTop)) {
			t = nvxgWIF.getStyle(obj, "top");
			t = nvxgWIF.stripStyle(t);
			dragObj.elStartTop = t;
		};
		if (nvxgWIF.isIE) {
			document.attachEvent("onmousemove", nvxgWIF.dragGo);
			document.attachEvent("onmouseup", nvxgWIF.dragStop);
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		} else {
			document.addEventListener("mousemove", nvxgWIF.dragGo, true);
			document.addEventListener("mouseup", nvxgWIF.dragStop, true);
			event.preventDefault();
		};

	},
	// --------------------------------------------------------------------------------------------------------------------		
	dragGo: function(event) {
		var x, y;
		if (nvxgWIF.isIE) {
			x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
			y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
		} else {
			x = event.clientX + window.scrollX;
			y = event.clientY + window.scrollY;
		}
		dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
		dragObj.elNode.style.top = (dragObj.elStartTop + y - dragObj.cursorStartY) + "px";
		if (nvxgWIF.isIE) {
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		}
		if (nvxgWIF.isIE != true) { event.preventDefault() };
		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		var notch;
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};

		if (notch != undefined) { notch.style.borderColor = "transparent" };


	},
	// --------------------------------------------------------------------------------------------------------------------		
	dragStop: function(event) {
		if (nvxgWIF.isIE) {
			document.detachEvent("onmousemove", nvxgWIF.dragGo);
			document.detachEvent("onmouseup", nvxgWIF.dragStop);
		} else {
			document.removeEventListener("mousemove", nvxgWIF.dragGo, true);
			document.removeEventListener("mouseup", nvxgWIF.dragStop, true);
		};
		var obj = nvxgWIF.getEventTarget(event);
		while (obj.getAttribute("elm") != 'container') { obj = obj.parentNode };
		if (obj.id == "ScratchPad") { nvxgWIF.writeScratchPadCookie(); };
		u = obj.childNodes[i];
	},
	// --------------------------------------------------------------------------------------------------------------------		
	resizeStart: function(event) {
		var obj = nvxgWIF.getEventTarget(event);
		while (obj.getAttribute("elm") != 'container') { obj = obj.parentNode };
		var el;
		var x, y;
		resizeObj.elNode = obj;
		if (nvxgWIF.isIE) {
			x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
			y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
		} else {
			x = event.clientX + window.scrollX;
			y = event.clientY + window.scrollY;
		};
		resizeObj.cursorStartX = x;
		resizeObj.cursorStartY = y;
		resizeObj.elStartLeft = parseInt(resizeObj.elNode.style.left, 10);
		resizeObj.elStartTop = parseInt(resizeObj.elNode.style.top, 10);
		if (isNaN(resizeObj.elStartLeft)) {
			l = nvxgWIF.getStyle(obj, "left");
			l = nvxgWIF.stripStyle(l);
			resizeObj.elStartLeft = l
		};
		if (isNaN(resizeObj.elStartTop)) {
			t = nvxgWIF.getStyle(obj, "top");
			t = nvxgWIF.stripStyle(t);
			resizeObj.elStartTop = t;
		};


		if (nvxgWIF.isIE) {
			document.attachEvent("onmousemove", nvxgWIF.resizeGo);
			document.attachEvent("onmouseup", nvxgWIF.resizeStop);
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		} else {
			document.addEventListener("mousemove", nvxgWIF.resizeGo, true);
			document.addEventListener("mouseup", nvxgWIF.resizeStop, true);
			event.preventDefault();
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	resizeGo: function(event) {
		var x, y;
		if (nvxgWIF.isIE) {
			x = window.event.clientX + document.documentElement.scrollLeft + document.body.scrollLeft;
			y = window.event.clientY + document.documentElement.scrollTop + document.body.scrollTop;
			sy = document.documentElement.scrollTop + document.body.scrollTop;
		} else {
			x = event.clientX + window.scrollX;
			y = event.clientY + window.scrollY;
			sy = window.scrollY;
		}

		container = resizeObj.elNode;
		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};


		if (container.id == "ScratchPad") {
			t = nvxgWIF.getElmDimensions(titlebar);
			s = nvxgWIF.getElmDimensions(savemsgcontainer);
			d = nvxgWIF.getElmDimensions(shadow);
			if (((y - sy - resizeObj.elStartTop - t[0] - 4) < 100) || ((x - resizeObj.elStartLeft) < 280)) { return }
			resizeObj.elNode.style.width = (x - resizeObj.elStartLeft) + "px";
			collapsecontent.style.width = (x - (resizeObj.elStartLeft)) - 2 + "px";
			savemsgcontainer.style.width = (x - (resizeObj.elStartLeft)) - 4 + "px";
			titlebar.style.width = (x - (resizeObj.elStartLeft)) - 8 + "px";
			container.setAttribute("width", (x - resizeObj.elStartLeft));

			document.getElementById("PadText").style.width = (x - (resizeObj.elStartLeft)) - 8 + "px";
			shadow.width = (x - resizeObj.elStartLeft);
			document.title = textarea.value;
			textarea.style.height = (y - sy - resizeObj.elStartTop - t[0] - s[0] - 10) + "px";
			container.setAttribute("height", (y - sy - resizeObj.elStartTop - t[0] - s[0] - 10));
			nvxgWIF.writeScratchPadCookie();
			nvxgWIF.ScratchPad.open();
		};

		if (nvxgWIF.isIE) {
			window.event.cancelBubble = true;
			window.event.returnValue = false;
		}
		if (nvxgWIF.isIE != true) { event.preventDefault() };
	},
	// --------------------------------------------------------------------------------------------------------------------		
	resizeStop: function(event) {
		if (nvxgWIF.isIE) {
			document.detachEvent("onmousemove", nvxgWIF.resizeGo);
			document.detachEvent("onmouseup", nvxgWIF.resizeStop);
		} else {
			document.removeEventListener("mousemove", nvxgWIF.resizeGo, true);
			document.removeEventListener("mouseup", nvxgWIF.resizeStop, true);
		};
		//var obj = nvxgWIF.getEventTarget(event);
	},

	// --------------------------------------------------------------------------------------------------------------------		
	closeFloatingDiv: function(event) {
		try {
			if (event.type == "keydown") {
				try { charCode = (e.which) ? e.which : event.keyCode; } catch (err) {};
				if (charCode != 13) { return false };
			};
		} catch (err) {};
		modal = document.getElementById("ModalLayer");
		var obj = nvxgWIF.getEventTarget(event);
		if (modal != undefined) {
			did = obj.getAttribute("DialogInDialog");
			if (did != undefined) {} else {
				document.body.removeChild(modal);
			}
			if (nvxgWIF.isIE) {
				document.detachEvent("onresize", nvxgWIF.resizeModalLayer);
			} else {
				document.removeEventListener("resize", nvxgWIF.resizeModalLayer, true);
			};
		};
		//		var obj = nvxgWIF.getEventTarget(event);
		while (obj.getAttribute("elm") != 'container') { obj = obj.parentNode };
		obj.parentNode.removeChild(obj);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	initScratchPad: function() {
		container = nvxgWIF.createFloatingDiv();
		container.id = "ScratchPad";
		container.className = "ScratchPadContainer";

		// Sets Default Objects: divbody(titlebar, content), shadow	
		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};

		shadow.width = "275";
		//container.style.backgroundColor="#CCC";
		divbody.className = "ScratchPadBody";
		titlebar.className = "ScratchPadTitleBar";
		container.style.top = "30px";
		w = nvxgWIF.getWindowSize();
		container.style.left = w[1] - 325 + "px";
		var closebutton = document.createElement('DIV');
		closebutton.className = "popup_close";
		closebutton.title = "Reset / Clear Contents";
		closebutton.setAttribute("sourceid", "clearscratchpad");
		closebutton.onclick = nvxgWIF.displayDialogBoxPassThrough;

		titlebar.appendChild(closebutton);
		var text = document.createTextNode("Scartch Pad");
		titlebar.appendChild(text);
		var togglebutton = document.createElement('DIV');
		togglebutton.id = "ScratchPadToggleButton";

		togglebutton.style.marginTop = "3px";
		togglebutton.setAttribute("target", "nvxgWIF.ScratchPad");
		togglebutton.setAttribute("state", "open");
		togglebutton.title = "Collapse View";
		togglebutton.className = "CollapsibleToolClosed";
		togglebutton.onclick = nvxgWIF.ControlPanel;

		titlebar.appendChild(togglebutton);

		content.id = "PadObj";
		var hideobj = document.createElement('span');
		hideobj.style.display = "none";

		content.appendChild(hideobj);
		var collapsecontent = document.createElement('DIV');
		collapsecontent.className = "CollapseContent";
		collapsecontent.setAttribute("elm", "collapsecontent");
		var textarea = document.createElement('textarea');
		textarea.setAttribute("elm", 'textarea');
		textarea.className = "ScratchPadContent";
		textarea.value = "The Scratch Pad is intended for users take notes in a static field during the intake process.  This information is NOT recorded in the report form or the submitted case.";
		textarea.id = "PadText";
		textarea.onblur = nvxgWIF.writeScratchPadCookie;
		collapsecontent.appendChild(textarea);


		var savemsgcontainer = document.createElement('DIV');
		savemsgcontainer.setAttribute("elm", "savemsgcontainer");
		savemsgcontainer.id = "savemsgcontainer";
		var savechk = document.createElement('INPUT');
		savechk.type = "checkbox";
		savechk.value = "true";
		savechk.style.padding = "0px";
		savechk.style.margin = "4px";
		savechk.style.float = "left";
		savechk.height = "16px";
		savechk.id = "SaveScratchPad";
		var savelabel = document.createElement('LABEL');
		var text = document.createTextNode("");
		savelabel.appendChild(text);
		savelabel.innerHTML = "Save contents of the &ldquo;Scratch Pad&rdquo; for future sessions.";
		savelabel.htmlFor = "SaveScratchPad";
		savelabel.style.height = "20px";
		savelabel.style.float = "left";
		savelabel.style.paddingTop = "4px";
		var savemsgtext = document.createElement('DIV');
		savemsgtext.id = "SaveMSGText";
		savechk.onclick = nvxgWIF.toggleSaveScratchPadMsg;
		savemsgtext.style.display = "none";
		var text = document.createTextNode("");
		savemsgtext.appendChild(text);
		savemsgtext.innerHTML = "The contents of the &ldquo;Scratch Pad&rdquo; will be saved in a &ldquo;<a href=\"http://www.navexglobal.com/privacy-statement/#cookie\" target=\"_blank\" style=\"color:#494429\">Cookie</a>” on this computer, and will not be available on any other.";
		savemsgtext.className = "SaveMSGText";
		savemsgcontainer.className = "SaveMSGContainer";
		var cornerresize = document.createElement('DIV');
		cornerresize.className = "CornerResize";
		cornerresize.onmousedown = nvxgWIF.resizeStart;



		savemsgcontainer.appendChild(savechk);
		savemsgcontainer.appendChild(savelabel);
		savemsgcontainer.appendChild(savemsgtext);
		savemsgcontainer.appendChild(cornerresize);

		collapsecontent.appendChild(savemsgcontainer);
		content.appendChild(collapsecontent);

		container.style.position = "fixed";
		container.style.display = "none";
		container.style.overflow = "auto";
		document.body.appendChild(container);

		nvxgWIF.ScratchPad = new Spry.Widget.CollapsiblePanel("PadObj");
		nvxgWIF.ScratchPad.close();
		s = nvxgWIF.readCookie("SaveScratchPad");
		if (s == "true") {
			savechk.checked = true;
			savemsgtext.style.display = "";
			s = nvxgWIF.readCookie("PadText");
			textarea.value = unescape(s);
			t = nvxgWIF.readCookie("PadTop");
			l = nvxgWIF.readCookie("PadLeft");
			d = nvxgWIF.readCookie("PadState");
			container.style.top = t;
			container.style.left = l;

			w = nvxgWIF.readCookie("PadWidth");
			if (w != null && w != "null" && w != undefined) {
				content.style.width = (Number(w) - 2) + "px";
				collapsecontent.style.width = (Number(w) - 2) + "px";
				savemsgcontainer.style.width = (Number(w) - 4) + "px";
				textarea.width = (Number(w) - 8);
				titlebar.style.width = (Number(w) - 8) + "px";
				document.getElementById("PadText").style.width = (Number(w)) - 8 + "px";
				shadow.width = Number(w);
			}
			z = nvxgWIF.readCookie("PadHeight");

			if (z != null && z != "null" && z != undefined && z != "") {
				textarea.style.height = (Number(z)) + "px";

			};
			if (d == undefined) { d = "true" };
			if (d == "true") {
				togglebutton.setAttribute("state", "open");
				togglebutton.title = "Collapse View";
				togglebutton.className = "CollapsibleToolClosed";
				container.style.display = "";
				nvxgWIF.ScratchPad.open();

			} else {
				togglebutton.setAttribute("state", "closed");
				togglebutton.title = "Expand View";
				togglebutton.className = "CollapsibleToolOpen";
				nvxgWIF.ScratchPad.close();
				container.style.display = "";
			};
		} else {
			container.style.display = "";
			nvxgWIF.ScratchPad.open();
		};



	},
	// --------------------------------------------------------------------------------------------------------------------		
	toggleSaveScratchPadMsg: function() {
		if (document.getElementById("SaveScratchPad").checked) {
			document.getElementById("SaveMSGText").style.display = "";
			nvxgWIF.ScratchPad.open();
		} else {
			document.getElementById("SaveMSGText").style.display = "none";
			nvxgWIF.ScratchPad.open();
		};
		nvxgWIF.writeScratchPadCookie();
	},


	// --------------------------------------------------------------------------------------------------------------------		
	closeSaveScratchDiv: function() {
		//r=confirm("Are you sure you want to \"Reset & Clear the Contents\" of the Scratch Pad?");
		//if(r){

		var container = document.getElementById("ScratchPad");
		container.style.display = "none";
		container.style.top = "30px";
		w = nvxgWIF.getWindowSize();
		container.style.left = w[1] - 325 + "px";
		document.getElementById("PadText").value = "";
		var container = document.getElementById("ScratchPadToggleButton");
		state = container.getAttribute("state");
		targ = container.getAttribute("target");
		eval(targ + ".close()");
		container.setAttribute("state", "closed");
		container.setAttribute("PasWidth", null);
		container.setAttribute("PadHeight", null);
		container.className = "CollapsibleToolOpen";
		container.title = "Expand View";
		var container = document.getElementById("ScratchPad");
		w = 284
		z = 300
		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};
		content.style.width = (Number(w) - 2) + "px";
		collapsecontent.style.width = (Number(w) - 2) + "px";
		savemsgcontainer.style.width = (Number(w) - 4) + "px";
		textarea.width = (Number(w) - 8);
		titlebar.style.width = (Number(w) - 8) + "px";
		document.getElementById("PadText").style.width = (Number(w)) - 8 + "px";
		shadow.width = Number(w);
		textarea.style.height = (Number(z)) + "px";
		document.getElementById("ScratchPad").style.display = "";
		//};
		document.getElementById("SaveScratchPad").checked = false;
		nvxgWIF.writeScratchPadCookie();

	},
	// --------------------------------------------------------------------------------------------------------------------		

	initQAMode: function() {
		container = nvxgWIF.createFloatingDiv();
		container.id = "QAMode";
		container.className = "QAModeContainer";
		//	container.style.opacity="0.5" 
		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};
		shadow.width = "300";
		divbody.className = "QAModeBody";
		titlebar.className = "QAModeTitleBar";
		container.style.top = "10px";
		container.style.left = "10px";
		var text = document.createTextNode("NAVEX CI Development Mode");
		var closebutton = document.createElement('DIV');
		closebutton.className = "popup_close";
		closebutton.style.float = "left";
		closebutton.style.hieght = "20px";
		closebutton.onclick = nvxgWIF.hideQAMode;
		titlebar.appendChild(closebutton);
		titlebar.appendChild(text);
		var togglebutton = document.createElement('DIV');
		content.id = "QAObj";
		var collapsecontent = document.createElement('DIV');
		collapsecontent.className = "QAContent";
		collapsecontent.setAttribute("elm", "collapsecontent");
		var qacontent = document.createElement('div');
		qacontent.setAttribute("elm", 'div');
		qacontent.className = "QAModeContent";
		qacontent.id = "PadText";
		collapsecontent.appendChild(qacontent);
		content.appendChild(collapsecontent);
		container.style.position = "fixed";
		container.style.overflow = "auto";
		document.body.appendChild(container);
		nvxgWIF.load(`${document.getElementById("filepathDepth").value}_public_includes/lib/includes/devmode.asp`, function(http) {
			if (http.readyState == 4) {
				HTTPresponseText = http.responseText;
				qacontent.innerHTML = HTTPresponseText;
			} else {
				// Do nothing
			};
		});
	},
	// --------------------------------------------------------------------------------------------------------------------	

	langvars: { "displaytype": "UI Display", "displayimg": "Display Image", "imapath": "Image Path", "urlpath": "HREF Rel Path", "languages": "Languages:" },
	locvars: { "UseAjax": "AJAX", "UseEnhanced": "DES Locations", "UseAdvance": "Advance", "LocationSourceID": "Source ID", "LockLocations": "Locked", "SubSearchKey": "SubSearch Key", "AllowOther": "Other", "OtherKeyIndex": "Other Key Index", "PostionOtherAtTop": "Other @ Top", "OtherLocationLabel": "Other Label", "OtherLocationOn": "Other On", "DeleteLocationWith": "Delete w/", "DeleteLocationOn": "Delet On", "SortIndex": "Sort Index", "SortToTop": "Sort to Top" },
	devvars: { "engine": "Engine", "codebase": "Code Base Ver.", "browser": "Browser Details", "HTML5": "HTML5/CSS3 Support", "remote_host": "Remote Host IP", "local_host": "Local Host IP", "domain": "Domain", "dbname": "CM DB Name", "command": "Command Action", "clientname": "Client", "pagetitle": "Title", "formtype": "Type", "TierID": "CM Tier ID", "EPRSClientID": "EPRS ID", "FollowUp": "Follow Up", "Dispatch": "Dispatch", "StatusID": "Case Status ID", "SourceID": "InTake Method", "CaseTypeID": "Case Type", "IssuePackageID": "Package ID", "PrimaryIssueTypeID": "Issue Type ID", "PrimaryIssueTypeLayer1ID": "Layer 1", "PrimaryIssueTypeLayer2ID": "Layer 2", "PrimaryIssueTypeLayer3ID": "Layer 3", "Participants": "Default Participant #", "Items": "Default Items #", "Agencies": "Default Agency #" },
	multivars: { "typeofoutput": "Mapped To", "objcount": "Curent Count", "typeofUI": "UI/UX ID", "allowcloning": "Allow Clone", "minimum": "Minimum", "maximum": "Maximum" },

	// --------------------------------------------------------------------------------------------------------------------	
	refreshQAVariables: function() {

		return
		/*
		//nvxgWIF.clearObjectChildNodes("qaVariablesContainer");	
		//litarg= document.getElementById("qaVariablesContainer");
		for(var key in nvxgWIF.devvars) {					
			if (nvxgWIF.devvars.hasOwnProperty(key)) {
				var keyval="";
				if(document.getElementById(key)==undefined){keyval="<em style='color:#c00'>undefined<em>"}else{keyval=document.getElementById(key).value;};
				var li = document.createElement('li');		
				var span = document.createElement('span');		
				var txt = document.createTextNode(nvxgWIF.devvars[key]);						
				span.appendChild(txt);			
				li.appendChild(span);			
				var cite = document.createElement('cite');		
				var txt = document.createTextNode("");			
				li.title=keyval;			
				cite.appendChild(txt);			
				cite.innerHTML=keyval;
				li.appendChild(cite);			
				litarg.appendChild(li);	
			};
			
		};
		//Locations
		nvxgWIF.clearObjectChildNodes("locVariablesContainer");	
		loctarg= document.getElementById("locVariablesContainer");
		if(document.getElementById("LocationConfig")==undefined){
			var li = document.createElement('li');		
			var span = document.createElement('span');		
			var txt = document.createTextNode("");						
			span.appendChild(txt);			
			span.innerHTML = "<em>none</em>";
			li.appendChild(span);			
			loctarg.appendChild(li);	
		}else{
			for (lcx=0;lcx<LocationsConfiguration.Configs.length;lcx++) {
				var div = document.createElement('div');				
				var txt = document.createTextNode("Config["+lcx+"]");								
				div.appendChild(txt);			
				loctarg.appendChild(div);					
		for(var key in nvxgWIF.locvars) {					
			if (nvxgWIF.locvars.hasOwnProperty(key)) {
				var keyval = null;
				//if(document.getElementById(key)==undefined){keyval="<em style='color:#c00'>undefined<em>"}else{keyval=document.getElementById(key).value;};
				keyval=LocationsConfiguration.Configs[lcx][key];
				if(keyval==undefined){keyval="<em>undefined</em>"};		
				if(keyval==""){keyval="<em>empty</em>"};
				var li = document.createElement('li');		
				var span = document.createElement('span');		
				var txt = document.createTextNode(nvxgWIF.locvars[key]);						
				span.appendChild(txt);			
				li.appendChild(span);			
				var cite = document.createElement('cite');		
				var txt = document.createTextNode("");			
				li.title=keyval;			
				cite.appendChild(txt);			
				cite.innerHTML=keyval;
				li.appendChild(cite);			
				loctarg.appendChild(li);			
			};
		};
			

		//MultiEdit
		nvxgWIF.clearObjectChildNodes("multiVariablesContainer");	
		mextarg= document.getElementById("multiVariablesContainer");
		if(document.getElementById("MultiEditConfig")==undefined){
			var li = document.createElement('li');		
			var span = document.createElement('span');		
			var txt = document.createTextNode("");						
			span.appendChild(txt);			
			span.innerHTML = "<em>none</em>";
			li.appendChild(span);			
			mextarg.appendChild(li);	

		 }else{
			for(var mkey in nvxgObjectDef) {					
				if (nvxgObjectDef.hasOwnProperty(mkey)) {
					var div = document.createElement('div');				
					var txt = document.createTextNode(mkey);								
					div.appendChild(txt);			
					mextarg.appendChild(div);
					var mxol = document.createElement('OL');	
					 mxol.classname="QAVariablesContainer";
					for(var key in nvxgWIF.multivars) {					
						if (nvxgWIF.multivars.hasOwnProperty(key)) {
							var keyval = null;
							keyval=nvxgObjectDef[mkey][key];
							var li = document.createElement('li');		
							var span = document.createElement('span');		
							var txt = document.createTextNode(nvxgWIF.multivars[key]);						
							span.appendChild(txt);			
							li.appendChild(span);			
							var cite = document.createElement('cite');		
							var txt = document.createTextNode("");			
							li.title=keyval;			
							cite.appendChild(txt);			
							cite.innerHTML=keyval;
							li.appendChild(cite);			
							mxol.appendChild(li);			
						};
					};
					mextarg.appendChild(mxol);
				};
			};
		 };

		//LANG
		nvxgWIF.clearObjectChildNodes("transVariablesContainer");	
		langtarg= document.getElementById("transVariablesContainer");
		if(document.getElementById("LanguageConfig")==undefined){
			var li = document.createElement('li');		
			var span = document.createElement('span');		
			var txt = document.createTextNode("");						
			span.appendChild(txt);			
			span.innerHTML = "none / <em>undefined</em>";
			li.appendChild(span);			
			langtarg.appendChild(li);	

		}else{
			if(LanguageConfiguration.languages.length!=0){
				for(var key in nvxgWIF.langvars) {					
					if (nvxgWIF.langvars.hasOwnProperty(key)) {
						var keyval="";
						keyval=LanguageConfiguration[key];
						var li = document.createElement('li');		
						var span = document.createElement('span');		
						var txt = document.createTextNode(nvxgWIF.langvars[key]);						
						span.appendChild(txt);			
						li.appendChild(span);			
						var cite = document.createElement('cite');		
						var txt = document.createTextNode(keyval);			
						cite.appendChild(txt);
						if(key!="languages"){
							li.appendChild(cite);
						}else{
							var ul = document.createElement('ul');							
							for (ln=0;ln<LanguageConfiguration.languages.length;ln++) {
								var lix = document.createElement('li');		
								var txtx = document.createTextNode("");												
								var langtxt=LanguageConfiguration.languages[ln].english;
								if(LanguageConfiguration.languages[ln].redirect!=undefined){langtxt=langtxt + "—<em style='color:#C00'>(Has Redirect)</em>"}
								lix.appendChild(txtx);	
								ul.appendChild(lix);	
								lix.innerHTML = langtxt;
							};
							li.appendChild(ul);
						};
						langtarg.appendChild(li);	
					};
				};
			}else{
				var li = document.createElement('li');		
				var span = document.createElement('span');		
				var txt = document.createTextNode("");						
				span.appendChild(txt);			
				span.innerHTML = "<em>none</em>";
				li.appendChild(span);			
				langtarg.appendChild(li);	
			}

		};
		};
		};



			document.getElementById("QAVarContainer").style.display="";	
		*/

	},

	// --------------------------------------------------------------------------------------------------------------------	
	hideQAMode: function() { document.getElementById("QAMode").style.display = "none"; },
	// --------------------------------------------------------------------------------------------------------------------	
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
			alert("ERROR An error occurred while trying to access location data. Please try again. |" + xURL);
		} else {
			http.onreadystatechange = function() {
				fn(http);
			}
			try {
				http.open("GET", url, true);
				http.send(null);
			} catch (err) {
				alert(err + "|" + xURL);
			}
		}


	},

	initPopUps: function(obj) {

		if (obj == undefined) {
			p = nvxgWIF.getObjElementsByClassName('popup');
		} else {
			p = nvxgWIF.getObjElementsByClassName('popup', obj);
		};


		if (p.length != 0) {
			for (i = 0; i < p.length; i++) {
				p[i].onclick = nvxgWIF.displayPopUp;
			};
		};

		p = nvxgWIF.getObjElementsByClassName('rollover');
		if (p.length != 0) {
			for (i = 0; i < p.length; i++) {
				p[i].onmouseover = nvxgWIF.displayPopUp;
				p[i].onmouseout = nvxgWIF.closeRollOver;
			};
		};
		p = nvxgWIF.getObjElementsByClassName('MultiRecordItemTabCounter');
		if (p.length != 0) {
			for (i = 0; i < p.length; i++) {
				p[i].onmouseover = nvxgWIF.displayPopUp;
				p[i].onmouseout = nvxgWIF.closeRollOver;
			};
		};

	},
	// --------------------------------------------------------------------------------------------------------------------			
	closeRollOver: function(event) {
		var trig = nvxgWIF.getEventTarget(event);
		srcid = trig.getAttribute("sourceid");
		container = document.getElementById(srcid);
		if (container != undefined) {
			container.parentNode.removeChild(container);
		};
	},

	// --------------------------------------------------------------------------------------------------------------------			
	displayPopUp: function(event) {

		var trig = nvxgWIF.getEventTarget(event);
		if (trig.tagName.toUpperCase() == "SPAN" || trig.tagName.toUpperCase() == "DIV" || trig.tagName.toUpperCase() == "EM" || trig.tagName.toUpperCase() == "STRONG") {
			while (trig.className != 'popup' && trig.className != 'rollover' && trig.className != 'MultiRecordItemTabCounter') { trig = trig.parentNode };
		};
		srcid = trig.getAttribute("sourceid");
		did = trig.getAttribute("DialogInDialog");
		if (srcid == "multiedit") {
			objname = trig.getAttribute("objname");
			var ObjDef = nvxgObjectDef[objname];
		};
		for (i = 0; i < epPopUp.Definitions.length; i++) {
			if (epPopUp.Definitions[i].sourceid == srcid) { var def = epPopUp.Definitions[i]; };
		};
		if (def.modal != undefined) { if (def.modal) { nvxgWIF.createModalLayer() } };
		exists = document.getElementById(srcid);
		if (exists != undefined) {
			if (def.type == 0) {
				return;
			} else {
				exists.parentNode.removeChild(exists);
			};
		};
		container = nvxgWIF.createFloatingDiv();
		container.id = srcid;


		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};
		if (def.modal != undefined) {
			if (def.modal) {
				titlebar.onmousedown = "";
				titlebar.style.cursor = "default"
			}
		};
		if (def.type == undefined) { def.type = 1 };
		if (def.type == 0) {
			titlebar.onmousedown = "";
			titlebar.style.cursor = "default"
		};
		pos = nvxgWIF.getElmPosition(trig);
		if (did != undefined) {
			if (nvxgWIF.isIE) {
				sy = document.documentElement.scrollTop + document.body.scrollTop;
			} else {
				sy = window.scrollY;
			};
			pos[0] = pos[0] + sy;
		};

		dim = nvxgWIF.getElmDimensions(trig);
		notch = document.createElement('DIV');
		notch.setAttribute("elm", "notch");
		if (def.offset != undefined) { notchoffset = def.offset } else { notchoffset = epPopUp.NotchOffset };
		if (srcid == "multiedit") { notchoffset = 108 };
		container.style.width = def.width + "px";
		switch (def.position) {
			case epPopUp.Left:
				notch.className = "notchLeft";
				notch.style.marginTop = notchoffset + "px";
				container.style.top = (pos[0] - notchoffset - 2) + "px";
				container.style.left = (pos[1] - def.width + 2) + "px";
				shadow.style.width = (def.width - (notchoffset / 2)) - 2 + "px";
				shadow.style.marginRight = (notchoffset - 2) + "px";
				break;

			case epPopUp.Right:
				notch.className = "notchRight";
				notch.style.marginTop = notchoffset + "px";
				container.style.top = (pos[0] - notchoffset - 2) + "px";
				container.style.left = (pos[1] + dim[1] - 2) + "px";
				shadow.style.width = (def.width - (notchoffset / 2)) - 2 + "px";
				shadow.style.marginLeft = (notchoffset / 2) + 2 + "px";
				break;

			default:
				notch.className = "notchTop";
				notch.style.marginLeft = notchoffset + "px";


				if (srcid == "multiedit") {
					container.style.left = (pos[1] - 110) + "px";
					if (nvxgWIF.TabBarObjIsLockHeight) {
						Q = nvxgWIF.getElmPosition(trig);
						//alert(Q);
						container.style.top = (pos[0] + dim[0] - 2 + window.pageYOffset) + "px";
					} else {
						container.style.top = (pos[0] + dim[0] - 2) + "px";
					};
				} else {
					container.style.left = (pos[1] - (notchoffset / 2)) + "px";
					container.style.top = (pos[0] + dim[0] - 2) + "px";
				};

				shadow.style.width = (def.width + 2) + "px";
		};

		container.insertBefore(notch, divbody);
		titlebar.className = "popup_titlebar";
		if (srcid == "multiedit") {
			def.title = ObjDef.recordtitle + " Records : " + ObjDef.objcount;
			def.content = epMultiEdit.getRecordLabels(objname);

		};


		if (def.type == 1) {
			var closebutton = document.createElement('DIV');
			closebutton.className = "popup_close";
			if (did != undefined) {
				closebutton.setAttribute("DialogInDialog", did);
			};
			closebutton.title = lc["$SYS_CLOSE"];
			closebutton.onclick = nvxgWIF.closeFloatingDiv;
			closebutton.style.float = "right";
			titlebar.appendChild(closebutton);
			var titlebarcontent = document.createElement('DIV');
			titlebarcontent.style.width = "90%";
			titlebarcontent.style.float = "left";
			titlebar.appendChild(titlebarcontent);
			titlebarcontent.innerHTML = def.title;

		} else {
			titlebar.innerHTML = def.title;
		};
		content.className = "popup_msg";
		content.innerHTML = def.content;
		document.body.appendChild(container);
	},
	// --------------------------------------------------------------------------------------------------------------------	
	getWindowSize: function() {
		var myWidth = 0,
			myHeight = 0;
		if (typeof(window.innerWidth) == 'number') {
			//Non-IE
			myWidth = window.innerWidth;
			myHeight = window.innerHeight;
		} else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			//IE 6+ in 'standards compliant mode'
			myWidth = document.documentElement.clientWidth;
			myHeight = document.documentElement.clientHeight;
		} else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
			//IE 4 compatible
			myWidth = document.body.clientWidth;
			myHeight = document.body.clientHeight;
		}
		return [myHeight, myWidth];
	},
	// --------------------------------------------------------------------------------------------------------------------		
	getElmPosition: function(obj) {
		var curleft = curtop = 0;
		if (obj.offsetParent) {
			curleft = obj.offsetLeft
			curtop = obj.offsetTop
			while (obj = obj.offsetParent) {
				curleft += obj.offsetLeft
				curtop += obj.offsetTop
			}
		}
		return [curtop, curleft];
	},

	// --------------------------------------------------------------------------------------------------------------------		
	getElmDimensions: function(obj) {
		if (typeof obj.clip !== "undefined") {
			curwidth = obj.clip.width;
		} else {
			if (obj.pixelWidth) {
				curwidth = obj.style.pixelWidth;
			} else {
				curwidth = obj.offsetWidth;
			}
		};
		if (typeof obj.clip !== "undefined") {
			curhieght = obj.clip.height;
		} else {
			if (obj.pixelHeight) {
				curheight = obj.style.pixelHeight;
			} else {
				curheight = obj.offsetHeight;
			}
		};
		return [curheight, curwidth];
	},
	// --------------------------------------------------------------------------------------------------------------------		
	getCenterCord: function(obj) {
		winDim = nvxgWIF.getWindowSize();
		elmDim = nvxgWIF.getElmDimensions(obj);
		cordX = (winDim[1] * .5) - ((elmDim[1] + 24) * .5);
		cordY = (winDim[0] * .5) - ((elmDim[0] + 24) * .65);
		return [cordX.toFixed(0), cordY.toFixed(0)];
	},
	// --------------------------------------------------------------------------------------------------------------------		
	// COLOR MAP FUNCTIONS---------------------------------------------------------------------------------------------------------------		

	mouseOverColor: function(hex) {
		document.getElementById("divpreview").style.backgroundColor = hex;
		document.getElementById("divpreviewtxt").innerHTML = hex;
		document.body.style.cursor = "pointer";
	},
	// --------------------------------------------------------------------------------------------------------------------		
	mouseOutMap: function() {
		document.getElementById("divpreview").style.backgroundColor = colorhex;
		document.getElementById("divpreviewtxt").innerHTML = colorhex;
		document.body.style.cursor = "";
	},
	// --------------------------------------------------------------------------------------------------------------------		
	clickColor: function(hex, seltop, selleft) {
		var xhttp, c
		if (hex == 0) {
			c = document.getElementById("colorhex").value;
		} else {
			c = hex;
		}
		if (c.substr(0, 1) == "#") { c = c.substr(1); }
		colorhex = "#" + c;
		if (seltop > -1 && selleft > -1) {
			document.getElementById("selectedColor").style.top = seltop + "px";
			document.getElementById("selectedColor").style.left = selleft + "px";
			document.getElementById("selectedColor").style.visibility = "visible";
			document.getElementById("ColorMapPicked").style.backgroundColor = colorhex;
		} else {
			document.getElementById("divpreview").style.backgroundColor = colorhex;
			document.getElementById("divpreviewtxt").innerHTML = colorhex;
			document.getElementById("selectedColor").style.visibility = "hidden";
		}
	},

	// --------------------------------------------------------------------------------------------------------------------		
	getNextHighestZindex: function(obj) {
		if (obj == undefined) { obj == document.body };
		var highestIndex = 0;
		var currentIndex = 0;
		var elArray = Array();
		if (obj) { elArray = obj.getElementsByTagName('*'); } else { elArray = document.getElementsByTagName('*'); }
		for (var i = 0; i < elArray.length; i++) {
			if (elArray[i].currentStyle) {
				currentIndex = parseFloat(elArray[i].currentStyle['zIndex']);
			} else if (window.getComputedStyle) {
				currentIndex = parseFloat(document.defaultView.getComputedStyle(elArray[i], null).getPropertyValue('z-index'));
			}
			if (!isNaN(currentIndex) && currentIndex > highestIndex) { highestIndex = currentIndex; }
		}
		return (highestIndex + 1);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	createModalLayer: function() {
		container = nvxgWIF.createFloatingDiv();
		container.id = "ModalLayer";
		x = container.childNodes.length;
		for (var i = 0; i < x; i++) {
			container.removeChild(container.childNodes[0])
		};
		w = nvxgWIF.getWindowSize();
		container.style.top = "0px";
		container.style.left = "0px";
		container.style.width = w[1] + "px";
		container.style.height = w[0] + "px";
		container.className = "Modal";
		container.style.position = "fixed"
		if (nvxgWIF.isIE) {
			document.body.attachEvent("onresize", nvxgWIF.resizeModalLayer);
		} else {
			document.body.addEventListener("resize", nvxgWIF.resizeModalLayer, true);
		};
		document.body.appendChild(container);
	},

	// --------------------------------------------------------------------------------------------------------------------		
	resizeModalLayer: function(event) {
		container = document.getElementById("ModalLayer");
		if (container != undefined) {
			w = nvxgWIF.getWindowSize();
			container.style.width = w[1] + "px";
			container.style.height = w[0] + "px";
		};
		errcontainer = document.getElementById("errcontainer");
		if (errcontainer != undefined) {
			var elms = errcontainer.getElementsByTagName("DIV");
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
			cCord = nvxgWIF.getCenterCord(divbody);
			errcontainer.style.left = cCord[0] + "px";
			errcontainer.style.top = cCord[1] + "px";
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	isVisible: function(id) {
		return document.getElementById(id).style.display !== 'none';
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setPrintStatus: function(e) {
		nvxgWIF.printed = true;
	},
	// --------------------------------------------------------------------------------------------------------------------		
	displayDialogBoxPassThrough: function(event) {
		var trig = nvxgWIF.getEventTarget(event);
		sourceid = trig.getAttribute("sourceid");
		nvxgWIF.displayDialogBox(sourceid);
	},
	// --------------------------------------------------------------------------------------------------------------------		
	displayDialogBox: function(sourceid) {

		nvxgWIF.createModalLayer();
		for (i = 0; i < epDialog.Definitions.length; i++) {
			if (epDialog.Definitions[i].sourceid == sourceid) { var def = epDialog.Definitions[i]; };
		};
		container = nvxgWIF.createFloatingDiv();
		container.id = sourceid;
		var tags = ["DIV", "SPAN", "TEXTAREA", "IMG"]
		for (t = 0; t < tags.length; t++) {
			var elms = container.getElementsByTagName(tags[t]);
			for (i = 0; i < elms.length; i++) {
				if (elms[i].getAttribute("elm") != null) {
					eval("var " + elms[i].getAttribute("elm") + " = elms[" + i + "]");
				};
			};
		};
		container.style.width = def.width + "px";
		container.style.top = "0px";
		container.style.left = "0px";
		container.style.position = "fixed";
		shadow.width = def.width;
		titlebar.className = "popup_titlebar";
		titlebar.style.backgroundColor = "#3a77c6";
		titlebar.style.color = "#ffffff";
		titlebar.innerHTML = def.title;
		content.className = "dialogContent";
		var dialogmsg = document.createElement('DIV');
		dialogmsg.className = "dialogMsg";
		if (def.type == undefined) {
			def.type = epDialog.Alert;
		};
		if (def.type == epDialog.None) {
			dialogmsg.style.paddingLeft = "10px";
		} else {
			dialogmsg.style.backgroundImage = def.type;
		};
		dialogmsg.innerHTML = def.content;
		content.appendChild(dialogmsg);
		var dialogbuttonbar = document.createElement('DIV');
		dialogbuttonbar.className = "dialogButtonBar";
		content.appendChild(dialogbuttonbar);

		//Build Buttons
		document.body.appendChild(container);
		if (def.buttons == undefined || def.buttons.length == 0) {
			if (def.buttons == undefined) {
				t = []
				def.buttons = t
			};
			var bttn = {};
			bttn['label'] = epDialog.defaultButtonLabel;
			def.buttons.push(bttn);
			bttn = null;
		};

		for (b = 0; b < def.buttons.length; b++) {
			var dialogbutton = document.createElement('DIV');
			if (def.buttons[b].classname != undefined) {
				dialogbutton.className = def.buttons[b].classname;
			} else {
				dialogbutton.className = "dialogButton";
			};
			dialogbutton.id = "dialogbutton" + b;
			dialogbutton.innerHTML = def.buttons[b].label;
			dialogbutton.tabIndex = 0;
			dialogbuttonbar.appendChild(dialogbutton);
			elmDim = nvxgWIF.getElmDimensions(dialogbutton);
			if (Number(elmDim[1]) < epDialog.minButtonSize) { dialogbutton.style.width = epDialog.minButtonSize + "px" } else {
				dialogbutton.style.paddingLeft = "10px";
				dialogbutton.style.paddingRight = "10px";
			};
			if (def.buttons[b].defaultvalue != undefined) {
				if (def.buttons[b].defaultvalue == true) {
					dialogbutton.focus();
				};
			};
			if (def.buttons[b].action != NoAction) {
				if (nvxgWIF.isIE) {
					dialogbutton.attachEvent("onclick", nvxgWIF.closeFloatingDiv);
					dialogbutton.attachEvent("onkeydown", nvxgWIF.closeFloatingDiv);
				} else {
					dialogbutton.addEventListener("click", nvxgWIF.closeFloatingDiv, false);
					dialogbutton.addEventListener("keydown", nvxgWIF.closeFloatingDiv, true);
				};

				if (def.buttons[b].action != undefined && def.buttons[b].action != "") {
					if (nvxgWIF.isIE) {
						dialogbutton.attachEvent("onclick", def.buttons[b].action);
						dialogbutton.attachEvent("onkeydown", def.buttons[b].action);
					} else {
						dialogbutton.addEventListener("click", def.buttons[b].action, true);
						dialogbutton.addEventListener("keydown", def.buttons[b].action, true);
					};
				};

			};
		};
		if (def.buttons.length == 1) { dialogbutton.focus(); };
		cCord = nvxgWIF.getCenterCord(divbody);
		container.style.left = cCord[0] + "px";
		container.style.top = cCord[1] + "px";



	},
	// ------------------------------------------------------------------------------------------------------------
	tncClick: function(b) {
		dialogbutton = document.getElementById("dialogbutton0");
		if (b) {
			dialogbutton.className = "dialogButton";
			if (nvxgWIF.isIE) {
				dialogbutton.attachEvent("onclick", nvxgWIF.closeFloatingDiv);
				dialogbutton.attachEvent("onkeydown", nvxgWIF.closeFloatingDiv);
			} else {
				dialogbutton.addEventListener("click", nvxgWIF.closeFloatingDiv, true);
				dialogbutton.addEventListener("keydown", nvxgWIF.closeFloatingDiv, true);
			}
		} else {
			dialogbutton.className = "dialogButtonDisabled";
			if (nvxgWIF.isIE) {
				dialogbutton.detachEvent("onclick", nvxgWIF.closeFloatingDiv);
				dialogbutton.detachEvent("onkeydown", nvxgWIF.closeFloatingDiv);
			} else {
				dialogbutton.removeEventListener("click", nvxgWIF.closeFloatingDiv, true);
				dialogbutton.removeEventListener("keydown", nvxgWIF.closeFloatingDiv, true);
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	initDateControl: function(targ) {
		inputContainer = document.getElementById(targ + "Container")


		// Month ----------------------------------------------------------------------------------
		inputMMControl = document.createElement("SELECT");
		inputMMControl.id = targ + "_MONTH";
		nvxgCUSTOM.removeKeys.push(inputMMControl.id.toUpperCase());
		inputMMControl.className = "wifchar2Select";
		inputMMControl.style.cssText = "margin-left:-3px";
		inputMMControl.setAttribute("required", false);
		//					inputMMControl.title=epMultiEdit.CalendarText[3];
		for (var m = 1; m < 13; m++) {
			if (m < 10) { m = "0" + m };
			var newOption = document.createElement('option');
			newOption.setAttribute('value', m);
			var text = document.createTextNode(m);
			newOption.appendChild(text);
			inputMMControl.appendChild(newOption);
		};
		inputContainer.appendChild(inputMMControl);

		// Day ----------------------------------------------------------------------------------					
		inputDDControl = document.createElement("SELECT");
		inputDDControl.id = targ + "_DAY";
		nvxgCUSTOM.removeKeys.push(inputDDControl.id.toUpperCase());
		inputDDControl.className = "wifchar2Select";

		inputDDControl.setAttribute("required", false);
		//					inputDDControl.title=epMultiEdit.CalendarText[4];
		for (var m = 1; m < 32; m++) {
			if (m < 10) { m = "0" + m };
			var newOption = document.createElement('option');
			newOption.setAttribute('value', m);
			var text = document.createTextNode(m);
			newOption.appendChild(text);
			inputDDControl.appendChild(newOption);
		};
		inputContainer.appendChild(inputDDControl);

		// Year ----------------------------------------------------------------------------------					
		inputYYControl = document.createElement("SELECT");
		inputYYControl.id = targ + "_YEAR";
		nvxgCUSTOM.removeKeys.push(inputYYControl.id.toUpperCase());
		inputYYControl.className = "wifchar3Select";
		inputYYControl.setAttribute("required", false);
		//					inputYYControl.title=epMultiEdit.CalendarText[5];
		var iNow = new Date();
		var iYear = iNow.getFullYear();
		iYear = Number(iYear) + 1
		for (var m = iYear; m > (iYear - 2); m--) {
			var newOption = document.createElement('option');
			newOption.setAttribute('value', m);
			var text = document.createTextNode(m);
			newOption.appendChild(text);
			inputYYControl.appendChild(newOption);
		}
		inputContainer.appendChild(inputYYControl);
		// Year ----------------------------------------------------------------------------------					
		inputControl = document.createElement("INPUT");
		inputControl.type = "HIDDEN";
		inputControl.id = targ;
		inputControl.name = targ;
		inputContainer.appendChild(inputControl);
		// Tools ----------------------------------------------------------------------------------										
		clrButton = document.createElement("DIV");
		clrButton.className = "rbImgCalendarClear";
		clrButton.tabIndex = 0;
		//					clrButton.title=epMultiEdit.CalendarText[1]
		clrButton.setAttribute("onClick", "nvxgWIF.clearDateListValue('" + targ + "')");
		clrButton.setAttribute("onkeypress", "nvxgWIF.clearDateListValue('" + targ + "')");
		inputContainer.appendChild(clrButton);
		tdyButton = document.createElement("div");
		tdyButton.className = "rbImgTodayCalendar";
		tdyButton.tabIndex = 0;
		//					tdyButton.title=epMultiEdit.CalendarText[2]
		var right_now = new Date();
		var DD = right_now.getDate()
		tdyButton.innerHTML = DD;
		tdyButton.setAttribute("onClick", "nvxgWIF.setTodayListValue('" + targ + "')");
		//tdyButton.setAttribute("onkeypress","nvxgWIF.setTodayListValue('" + ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");									
		inputContainer.appendChild(tdyButton);

		inputMMControl.setAttribute("onchange", "nvxgWIF.setDateListValue('" + targ + "')");
		inputDDControl.setAttribute("onchange", "nvxgWIF.setDateListValue('" + targ + "')");
		inputYYControl.setAttribute("onchange", "nvxgWIF.setDateListValue('" + targ + "')");
		// SET DEFAULT ----------------------------------------------------------------------------------										
		inputControl.value = "";
		inputMMControl.selectedIndex = -1;
		inputDDControl.selectedIndex = -1;
		inputYYControl.selectedIndex = -1;


	},
	// --------------------------------------------------------------------------------------------------------------------		
	cleanStrings: function() {
		//TEXT
		var elm = document.getElementsByTagName('INPUT');
		for (j = 0; j < elm.length; j++) {
			if (elm[j].type.toUpperCase() == "TEXT" || elm[j].type.toUpperCase() == "PASSWORD") {
				if (elm[j].value != undefined) { if (elm[j].value.length = 0) { elm[j].value = nvxgWIF.removeHTMLTags(elm[j].value) } };
			};
		};
		//TEXTAREA
		var elm = document.getElementsByTagName('TEXTAREA');
		for (j = 0; j < elm.length; j++) {
			if (elm[j].value != undefined) { if (elm[j].value.length = 0) { elm[j].value = nvxgWIF.removeHTMLTags(elm[j].value) } };
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	clearOptions: function(objid) {
		obj = document.getElementById(objid);
		x = obj.childNodes.length;
		if (x != 0) {
			for (var i = 0; i < x; i++) {
				obj.removeChild(obj.childNodes[0])
			};
		};
	},

	// --------------------------------------------------------------------------------------------------------------------		
	msgCancelReport: function() { window.location = "default.asp"; },
	// --------------------------------------------------------------------------------------------------------------------		
	winPrint: function() {
		window.print();
		nvxgWIF.printed = true;
	},
	// --------------------------------------------------------------------------------------------------------------------			
	loadTestData: function() {
		sdate = rbCalendar.serializeNow()
		today = sdate.substring(4, 6) + "/" + sdate.substring(6, 8) + "/" + sdate.substring(0, 4);
		meobjs = [];
		var x = document.getElementsByTagName("input");
		y = x;
		j = y.length;
		for (u = 0; u < j; u++) {
			if (y[u].type.toUpperCase() == "RADIO") {
				objname = x[u].getAttribute("objname");
				if (objname != undefined) {
					state = y[u].getAttribute("state");
					if (state == "true") {
						y[u].checked = true;
						meobjs.push(objname);
					};
				} else {
					y[u].checked = true;
				};
			};
		};
		for (m = 0; m < meobjs.length; m++) {
			if (nvxgObjectDef[meobjs[m]].objcount == 0) {
				epMultiEdit.createUIDisplay(meobjs[m]);
				nvxgWIF.toggleElements(meobjs[m] + "Container", "");
			};
		};
		var x = document.getElementsByTagName("input");
		for (i = 0; i < x.length; i++) {
			switch (x[i].type.toUpperCase()) {
				case "TEXT":
					if (x[i].className.indexOf("Calendar") != -1) {
						x[i].value = today;
					} else {
						if (x[i].getAttribute("readonly") != "true") {
							x[i].value = nvxgWIF.removeHTMLTags(document.getElementById(x[i].id + "ERRTXT").innerHTML).trim();
							if (x[i].getAttribute("fixed") != undefined) { x[i].value = 100 };
						};
					};
					break;
				case "PASSWORD":
					x[i].value = "PASSWORD";
					break;
				case "CHECKBOX":
					if (x[i].id != "disablevalidation") { x[i].checked = true };
					break;
				default:
					// Default Action
			};
		};
		var x = document.getElementsByTagName("textarea");
		for (i = 0; i < x.length; i++) {
			if(document.getElementById(x[i].id + "ERRTXT")) x[i].value = nvxgWIF.removeHTMLTags(document.getElementById(x[i].id + "ERRTXT").innerHTML).trim();
		};
		var x = document.getElementsByTagName("select");
		for (i = 0; i < x.length; i++) {
			if (x[i].getAttribute("required") == "true") { x[i].selectedIndex = 0; } else { x[i].selectedIndex = 1; }
		};
		for (m = 0; m < meobjs.length; m++) {
			if (nvxgObjectDef[meobjs[m]].typeofUI == 0) {
				epMultiEdit.insertNewParticipant(meobjs[m], true)
			};
		};
	},
	// --------------------------------------------------------------------------------------------------------------------			
	NXsetSelectionRange: function(input, selectionStart, selectionEnd) {
		if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		} else if (input.createTextRange) {
			var range = input.createTextRange();
			range.collapse(true);
			range.moveEnd('character', selectionEnd);
			range.moveStart('character', selectionStart);
			range.select();
		}
	},
	// --------------------------------------------------------------------------------------------------------------------		
	replaceSelection: function(input, replaceString) {
		if (input.setSelectionRange) {
			var selectionStart = input.selectionStart;
			var selectionEnd = input.selectionEnd;
			input.value = input.value.substring(0, selectionStart) + replaceString + input.value.substring(selectionEnd);

			if (selectionStart != selectionEnd) {
				nvxgWIF.NXsetSelectionRange(input, selectionStart, selectionStart + replaceString.length);
			} else {
				nvxgWIF.NXsetSelectionRange(input, selectionStart + replaceString.length, selectionStart + replaceString.length);
			}

		} else if (document.selection) {
			var range = document.selection.createRange();

			if (range.parentElement() == input) {
				var isCollapsed = range.text == '';
				range.text = replaceString;

				if (!isCollapsed) {
					range.moveStart('character', -replaceString.length);
					range.select();
				}
			}
		}
	},
	// --------------------------------------------------------------------------------------------------------------------		
	catchTab: function(e) {
		var taobj = nvxgWIF.getEventTarget(e);
		if (navigator.userAgent.match("Gecko")) {
			c = e.which;
		} else {
			c = e.keyCode;
		}
		if (c == 36 && taobj.id == "importeddata") {
			D = document.getElementById("ImportedDataContainer");
			//		D.style.display="none";
			D.scrollLeft = 0;
		};
		if (c == 9) {
			nvxgWIF.replaceSelection(taobj, String.fromCharCode(9));
			setTimeout("document.getElementById('" + taobj.id + "').focus();", 0);
			return false;
		}

	},
	// --------------------------------------------------------------------------------------------------------------------		
	checkMinLength: function(obj) {
		str = obj.value;
		charmin = Number(obj.getAttribute("minlength"));
		if (isNaN(charmin)) { charmin = 0 };
		if (str.length < charmin) {
			obj.style.color = "#CC0000";
		} else {
			obj.style.color = "#0000FF";
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	checkPasswordMatch: function(obj) {

		pswd = document.getElementById("Password").value;
		if (obj.value == pswd) {
			obj.style.color = "#0000FF";
		} else {
			obj.style.color = "#CC0000";
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	copyvalues: function(from, to, idarray) {
		for (i = 0; i < idarray.length; i++) {
			keyid = idarray[i];
			if (keyid == "PhoneNumber" && from == "Reporter") { keyid = "Phone"; };
			fromElm = document.getElementById(from + keyid + "");
			keyid = idarray[i];
			if (keyid == "PhoneNumber" && to == "Reporter") { keyid = "Phone"; };
			toElm = document.getElementById(to + keyid + "");
			if (fromElm != undefined && toElm != undefined) { toElm.value = fromElm.value };
		};
	},
	// --------------------------------------------------------------------------------------------------------------------		
	getStyleRuleValue: function(style, selector, sheet) {
		var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
		for (var SH = 0, L = sheets.length; SH < L; SH++) {
			var sheet = sheets[SH];
			if (!sheet.cssRules) { continue; }
			for (var J = 0, K = sheet.cssRules.length; J < K; J++) {
				var rule = sheet.cssRules[J];
				if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
					return rule.style[style];
				};
			};
		};
		return null;
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setStyleRuleValue: function(style, selector, newval, sheet) {
		var sheets = typeof sheet !== 'undefined' ? [sheet] : document.styleSheets;
		for (var SH = 0, L = sheets.length; SH < L; SH++) {
			var sheet = sheets[SH];
			if (!sheet.cssRules) { continue; }
			for (var J = 0, K = sheet.cssRules.length; J < K; J++) {
				var rule = sheet.cssRules[J];
				if (rule.selectorText && rule.selectorText.split(',').indexOf(selector) !== -1) {
					rule.style[style] = newval;
				};
			};
		};
		return null;
	},
	// --------------------------------------------------------------------------------------------------------------------		
	setTierLevelValues: function(key, flds) {
		var children = document.getElementsByTagName('*') || obj.all;
		for (var d = 0; d < children.length; d++) {
			var child = children[d];
			if (child.tagName == "TEXTAREA" || child.tagName == "INPUT" || child.tagName == "SELECT") {
				child_id = "";
				c_val = "";

				for (f = 0; f < flds.length; f++) {
					var child_id = child.id;
					if (child_id.indexOf(flds[f]) != -1) {
						c_val = child.value;
						if (c_val != "") {
							if (child.tagName == "SELECT") {
								opt = document.createElement('option');
								opt.value = TierLevelValues[key][c_val];
								child.appendChild(opt);
							};

							child.value = TierLevelValues[key][c_val];
							//alert(child.id + ":" + flds[f] + ":" + key +":" + c_val + "=" + TierLevelValues[key][c_val]);
						};
					};
				};
			};
		};
	},

	// --------------------------------------------------------------------------------------------------------------------		
	setPrintTextArea: function() {
		elms = document.getElementsByTagName("TEXTAREA");
		for (t = 0; t < elms.length; t++) {
			textarea = elm[t];
			textarea.setAttribute("rows", 400);
			alert(textarea.scrollHeight)
		};
	},

	// --------------------------------------------------------------------------------------------------------------------		
	lastFunction: function() {}
}



function lc_pr(k, n) {
	if (Object.prototype.toString.call(lc[k]) == "[object Array]") {
		if (n == undefined || n == null) { document.write(lc[k][0]); } else { document.write(lc[k][n]); };
	} else {
		if (lc[k] == undefined) {
			document.write("<span class='localization_err'>" + k + "</span>");
			//				document.write(k);				
		} else {
			txtstr = lc[k]
			if (txtstr.indexOf("[LANG]") != -1) {
				txtstr = txtstr.replace("[LANG]", (document.getElementById("language").value).toUpperCase());
				document.write(txtstr);
			} else {
				document.write(lc[k]);
			};
		};
	};
}

function lc_opt(opts) {
	for (oi = 0; oi < opts.length; oi++) {
		if (Object.prototype.toString.call(lc[opts[oi]]) == "[object Array]") {
			if (lc[opts[oi]][2] == undefined || lc[opts[oi]][2] == "") { lc[opts[oi]][2] = 0 }
			document.write("<option value=\"" + lc[opts[oi]][1] + "\"  isother=\"" + lc[opts[oi]][2] + "\">" + lc[opts[oi]][0] + "</option>")
		} else {
			document.write("<option value=\"" + lc[opts[oi]] + "\">" + lc[opts[oi]] + "</option>")
		};
	};
}


var spinopts = {
	lines: 13, // The number of lines to draw
	length: 20, // The length of each line
	width: 10, // The line thickness
	radius: 30, // The radius of the inner circle
	corners: 1, // Corner roundness (0..1)
	rotate: 0, // The rotation offset
	direction: 1, // 1: clockwise, -1: counterclockwise
	color: '#000', // #rgb or #rrggbb or array of colors
	speed: 1, // Rounds per second
	trail: 60, // Afterglow percentage
	shadow: false, // Whether to render a shadow
	hwaccel: false, // Whether to use hardware acceleration
	className: 'spinner', // The CSS class to assign to the spinner
	zIndex: 2e9, // The z-index (defaults to 2000000000)
	top: '50%', // Top position relative to parent
	left: '50%' // Left position relative to parent
};
//fgnass.github.com/spin.js#v2.0.1
! function(a, b) { "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.Spinner = b() }(this, function() {
	"use strict";

	function a(a, b) { var c, d = document.createElement(a || "div"); for (c in b) d[c] = b[c]; return d }

	function b(a) { for (var b = 1, c = arguments.length; c > b; b++) a.appendChild(arguments[b]); return a }

	function c(a, b, c, d) {
		var e = ["opacity", b, ~~(100 * a), c, d].join("-"),
			f = .01 + c / d * 100,
			g = Math.max(1 - (1 - a) / b * (100 - f), a),
			h = j.substring(0, j.indexOf("Animation")).toLowerCase(),
			i = h && "-" + h + "-" || "";
		return l[e] || (m.insertRule("@" + i + "keyframes " + e + "{0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + g + "}}", m.cssRules.length), l[e] = 1), e
	}

	function d(a, b) {
		var c, d, e = a.style;
		for (b = b.charAt(0).toUpperCase() + b.slice(1), d = 0; d < k.length; d++)
			if (c = k[d] + b, void 0 !== e[c]) return c;
		return void 0 !== e[b] ? b : void 0
	}

	function e(a, b) { for (var c in b) a.style[d(a, c) || c] = b[c]; return a }

	function f(a) { for (var b = 1; b < arguments.length; b++) { var c = arguments[b]; for (var d in c) void 0 === a[d] && (a[d] = c[d]) } return a }

	function g(a, b) { return "string" == typeof a ? a : a[b % a.length] }

	function h(a) { this.opts = f(a || {}, h.defaults, n) }

	function i() {
		function c(b, c) { return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c) }
		m.addRule(".spin-vml", "behavior:url(#default#VML)"), h.prototype.lines = function(a, d) {
			function f() { return e(c("group", { coordsize: k + " " + k, coordorigin: -j + " " + -j }), { width: k, height: k }) }

			function h(a, h, i) { b(m, b(e(f(), { rotation: 360 / d.lines * a + "deg", left: ~~h }), b(e(c("roundrect", { arcsize: d.corners }), { width: j, height: d.width, left: d.radius, top: -d.width >> 1, filter: i }), c("fill", { color: g(d.color, a), opacity: d.opacity }), c("stroke", { opacity: 0 })))) }
			var i, j = d.length + d.width,
				k = 2 * j,
				l = 2 * -(d.width + d.length) + "px",
				m = e(f(), { position: "absolute", top: l, left: l });
			if (d.shadow)
				for (i = 1; i <= d.lines; i++) h(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
			for (i = 1; i <= d.lines; i++) h(i);
			return b(a, m)
		}, h.prototype.opacity = function(a, b, c, d) {
			var e = a.firstChild;
			d = d.shadow && d.lines || 0, e && b + d < e.childNodes.length && (e = e.childNodes[b + d], e = e && e.firstChild, e = e && e.firstChild, e && (e.opacity = c))
		}
	}
	var j, k = ["webkit", "Moz", "ms", "O"],
		l = {},
		m = function() { var c = a("style", { type: "text/css" }); return b(document.getElementsByTagName("head")[0], c), c.sheet || c.styleSheet }(),
		n = { lines: 12, length: 7, width: 5, radius: 10, rotate: 0, corners: 1, color: "#000", direction: 1, speed: 1, trail: 100, opacity: .25, fps: 20, zIndex: 2e9, className: "spinner", top: "50%", left: "50%", position: "absolute" };
	h.defaults = {}, f(h.prototype, {
		spin: function(b) {
			this.stop(); {
				var c = this,
					d = c.opts,
					f = c.el = e(a(0, { className: d.className }), { position: d.position, width: 0, zIndex: d.zIndex });
				d.radius + d.length + d.width
			}
			if (e(f, { left: d.left, top: d.top }), b && b.insertBefore(f, b.firstChild || null), f.setAttribute("role", "progressbar"), c.lines(f, c.opts), !j) {
				var g, h = 0,
					i = (d.lines - 1) * (1 - d.direction) / 2,
					k = d.fps,
					l = k / d.speed,
					m = (1 - d.opacity) / (l * d.trail / 100),
					n = l / d.lines;
				! function o() {
					h++;
					for (var a = 0; a < d.lines; a++) g = Math.max(1 - (h + (d.lines - a) * n) % l * m, d.opacity), c.opacity(f, a * d.direction + i, g, d);
					c.timeout = c.el && setTimeout(o, ~~(1e3 / k))
				}()
			}
			return c
		},
		stop: function() { var a = this.el; return a && (clearTimeout(this.timeout), a.parentNode && a.parentNode.removeChild(a), this.el = void 0), this },
		lines: function(d, f) {
			function h(b, c) { return e(a(), { position: "absolute", width: f.length + f.width + "px", height: f.width + "px", background: b, boxShadow: c, transformOrigin: "left", transform: "rotate(" + ~~(360 / f.lines * k + f.rotate) + "deg) translate(" + f.radius + "px,0)", borderRadius: (f.corners * f.width >> 1) + "px" }) }
			for (var i, k = 0, l = (f.lines - 1) * (1 - f.direction) / 2; k < f.lines; k++) i = e(a(), { position: "absolute", top: 1 + ~(f.width / 2) + "px", transform: f.hwaccel ? "translate3d(0,0,0)" : "", opacity: f.opacity, animation: j && c(f.opacity, f.trail, l + k * f.direction, f.lines) + " " + 1 / f.speed + "s linear infinite" }), f.shadow && b(i, e(h("#000", "0 0 4px #000"), { top: "2px" })), b(d, b(i, h(g(f.color, k), "0 0 1px rgba(0,0,0,.1)")));
			return d
		},
		opacity: function(a, b, c) { b < a.childNodes.length && (a.childNodes[b].style.opacity = c) }
	});
	var o = e(a("group"), { behavior: "url(#default#VML)" });
	return !d(o, "transform") && o.adj ? i() : j = d(o, "animation"), h
});

window.addEventListener("load", function(){
	nvxgWIF.initMobile();
});