/* 	JavaScript Document
	Redistribution and use in source and binary forms, with or without modification, is NOT permitted without written consent from NAVEX
	Privacy policy:			http://www.ethicspoint.com/en/privacypolicy.asp
	Acceptable use policy:	http://www.ethicspoint.com/en/acceptableuse.asp
	Contact information:	direct 1-971-250-4100
							toll-free 866-297-0224
							info@ethicspoint.com
							
	Author:					Austin Linnell | Sr. Web Developer
	Dept.:					Client Interface
	codebase: 				NVXG.V5.2023.12.4
*/

var epMIMO = {
	issueTypeTitle:			false,
	prefixes:				["Primary","Secondary","Tertiary","Quaternary","Quinary"],
	issueDependencies:		{"Primary": {},"Secondary": {},"Tertiary": {},"Quaternary": {},"Quinary": {}},
	headerIDCounter:		0,
	lineBreakIDCounter:		0,

	Init: function(){
		//Initialize sub-section
		if(!epMIMOObjDef.issueTypeTitle)
			this.issueTypeTitle = false;
		else
			this.issueTypeTitle = true;

		//Add error handling in case the container DNE
		if(document.getElementById("MIMOContainer") == undefined) {
			alert("MIMO Container does not exist.");
			return;
		}
		else
			mContainer = document.getElementById("MIMOContainer");

		//Construct sub-sections for issue type prefix
		for(var issueCount = 0; issueCount < 5; issueCount++) {
			mPrefixContainer = document.createElement('div');
			mPrefixContainer.id = "MIMO" + this.prefixes[issueCount] + "Container";
			mRow = document.createElement('div');
			mRow.className = "subsection";
			mLabel = document.createElement('div');
			mLabel.className = "label";
			mContent = document.createElement('div');
			mContent.className = "content";

			mContentHeader = document.createElement('div');
			mContentHeader.id = "MIMO" + this.prefixes[issueCount] + "HeaderContainer";
			mContentHeader.className = "wif100pContainer";
			mContent.appendChild(mContentHeader);

			mLabelText = document.createTextNode(epMIMOObjDef.issueSubSectionLabel[issueCount]);
			mLabel.appendChild(mLabelText);
			mRow.appendChild(mLabel);
			mRow.appendChild(mContent);
			mPrefixContainer.appendChild(mRow);
			mPrefixContainer.style.display = "none";
			mContainer.appendChild(mPrefixContainer);
		}
		epMIMO.Completeness();
		epMIMO.InitDisplay();
	},
	// --------------------------------------------------------------------------------------------------------------------
	InitDisplay: function(){
		//This function is really only used for 'Primary' issue type for Mapping and RF Doctor purposes
		//All fields are hidden to start out with but are added to the DOM
		var ObjDef = epMIMOObjDef.fields;
		var PrimaryElm = document.getElementById("MIMOPrimaryContainer").getElementsByClassName("content")[0];
		for(var field = 0; field < ObjDef.length; field++) {
			//check config fields for issueDepency, actions and outcomes and populate with empty arrays if missing
			(!ObjDef[field].issueDependency) ? ObjDef[field].issueDependency = [] : null;
			(!ObjDef[field].actions) ? ObjDef[field].actions = [] : null;
			(!ObjDef[field].outcomes) ? ObjDef[field].outcomes = [] : null;
			//ID of field does not exist (applies line breaks and headers only)
			if(!ObjDef[field].id)
				(ObjDef[field].type == "BR") ? epMIMOObjDef.fields[field].id = "LineBreak" + ++this.lineBreakIDCounter : epMIMOObjDef.fields[field].id = "Header" + ++this.headerIDCounter;
			elmField = epMIMO.CreateField(ObjDef[field], this.prefixes[0], false, true);

			PrimaryElm.appendChild(elmField);
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	OnIssueSelect: function(prefix, issueType){
		this.issueDependencies[prefix] = {};
		this.headerIDCounter,this.lineBreakIDCounter = 0;
		var ObjDef=epMIMOObjDef.fields;
		var IssueTypeElm = document.getElementById("MIMO" + prefix + "Container").getElementsByClassName("content")[0];
		IssueTypeElm.innerHTML = "<div id=\"MIMO" + prefix + "HeaderContainer\" class=\"wif100pContainer\"><h2></h2></div>";
		//IssueTypeElm.innerHTML = "";
		for(var field = 0; field < ObjDef.length; field++) {
			if(ObjDef[field].issueDependency.length == 0) { //Available for all issue types
				(ObjDef[field].actions.length == 0 && ObjDef[field].outcomes.length == 0) ? elmField = epMIMO.CreateField(ObjDef[field], prefix, true, true) : elmField = epMIMO.CreateField(ObjDef[field], prefix, false, true);
			}
			else {
				if(ObjDef[field].issueDependency.indexOf(Number(issueType)) > -1) {
					(ObjDef[field].actions.length == 0 && ObjDef[field].outcomes.length == 0) ? elmField = epMIMO.CreateField(ObjDef[field], prefix, true, true) : elmField = epMIMO.CreateField(ObjDef[field], prefix, false, true);
				}
				else
					epMIMO.CreateField(ObjDef[field], prefix, false, false);
			}
			IssueTypeElm.appendChild(elmField);
		}
		this.SetSubSectionLabel(prefix);
		document.getElementById("MIMO" + prefix + "Container").style.display = "";
		nvxgWIF.setCheckBoxListEvents(document.getElementById("MIMO" + prefix + "Container"));
		nvxgWIF.intTimeObjs(1,document.getElementById("MIMO" + prefix + "Container"));
	},
	// --------------------------------------------------------------------------------------------------------------------
	CreateField: function(field, prefix, display, activeForIssue){
		var sectionPrefix,fieldIdStr = "";

		//determine sectionPrefix
		if(!field.classification)
			sectionPrefix = "IssueType_";
		else {
			switch(field.classification.toUpperCase()) {
				case "A":
					sectionPrefix = "ActionTaken_";
					break;
				case "O":
					sectionPrefix = "Outcome_";
					break;
				default:
					sectionPrefix = "IssueType_";
					break;
			}
		}

		fieldIdStr = ((sectionPrefix == "ActionTaken_" || field.id == "ActionTakenID") ? ((prefix == "Primary") ? "" : prefix) : prefix) + ((field.id == "OutcomeID" || field.id == "ActionTakenID") ? "" : sectionPrefix) + field.id;
		if(activeForIssue == true)
			this.issueDependencies[prefix][field.id] = fieldIdStr;

		switch(field.type) {
			case "BR":
				elm = document.createElement("BR");
				elm.id = "NOTMAPPED_" + fieldIdStr;
				elm.className = "wifClearFloat";

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "Checkbox":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wifInputCheckboxContainer";

				elmLabel = document.createElement("LABEL");
				elmLabel.id = fieldIdStr + "Label";
				elmLabel.className = "wifInputCheckboxLabel";
				elmLabel.setAttribute('for',fieldIdStr);

				elmInput = document.createElement("INPUT");
				elmInput.id = fieldIdStr;
				elmInput.className = "wifInputCheckbox";
				elmInput.setAttribute('name',fieldIdStr);
				elmInput.setAttribute('type','checkbox');
				elmInput.setAttribute('value',field.value);
				(field.defaultValue) ? elmInput.checked = true : elmInput.checked = false;

				elmLabelText = document.createTextNode(field.boxTitle);

				elmLabel.appendChild(elmInput);
				elmLabel.appendChild(elmLabelText);

				elmInputContainer.appendChild(elmLabel);

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormat);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "CheckboxList":
				elm = this.CreateMainElement(field.size, fieldIdStr, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr + "List", field.title, field.required);

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmFormat);

				elmGroupContainer = document.createElement("DIV");
				elmGroupContainer.className = "wifCheckBoxGroup";

				for(var i = 0; i < field.cols.length; i++) {
					elmColumnContainer = document.createElement("DIV");
					elmColumnContainer.className = "wif"+ field.cols[i].size +"pContainer";
					elmColumnContainer.id = fieldIdStr + "_Col" + (i + 1);

					for(var j = 0; j < field.cols[i].src.length; j++) {
						elmInputContainer = document.createElement("DIV");
						elmInputContainer.className = "wifInputCheckboxContainer";
	
						elmLabel = document.createElement("LABEL");
						elmLabel.setAttribute('for',fieldIdStr + field.cols[i].src[j].id);
						elmLabel.className = "wifInputCheckboxLabel";

						elmInput = document.createElement("INPUT");
						elmInput.id = fieldIdStr + field.cols[i].src[j].id;
						elmInput.className = "wifInputCheckbox";
						elmInput.setAttribute('name',fieldIdStr + field.cols[i].src[j].id);
						elmInput.setAttribute('type','checkbox');
						elmInput.setAttribute('value',field.cols[i].src[j].value);
						(field.cols[i].src[j].mutuallyexclusive) ? elmInput.setAttribute('mutuallyexclusive',true) : elmInput.setAttribute('mutuallyexclusive',false);

						elmLabel.appendChild(elmInput);
						elmLabel.innerHTML += field.cols[i].src[j].label;

						elmInputContainer.appendChild(elmLabel);

						elmColumnContainer.appendChild(elmInputContainer);
					}
					
					elmGroupContainer.appendChild(elmColumnContainer);
					elm.appendChild(elmGroupContainer);
				}

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "Date":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wif33pInputContainer";

				elmInput = document.createElement("INPUT");
				elmInput.id = fieldIdStr;
				elmInput.setAttribute('name',fieldIdStr);
				elmInput.className = "wif33pCalendar";
				(field.hint != "") ? elmInput.setAttribute('hint',field.hint) : elmInput.setAttribute('hint',rbCalendar.dateFormat);
				elmInput.style.color = "#0000FF";
				elmInput.setAttribute('mindate',field.mindate);
				elmInput.setAttribute('maxdate',field.maxdate);
				(field.hint != "") ? elmInput.setAttribute('value',field.hint) : elmInput.setAttribute('value',rbCalendar.dateFormat);
				elmInput.setAttribute('style','text-align: right;');
				elmInput.setAttribute('fixed',0);
				elmInput.setAttribute('maxlength',10);
				elmInput.setAttribute('sdate',null);
				elmInput.setAttribute("onkeydown","return nvxgWIF.fixedNumberKey(event);");

				if(field.required == true)
					elmInput.setAttribute('aria-required', true);

				elmOpen = document.createElement("DIV");
				elmOpen.className = "rbImgCalendar";
				elmOpen.setAttribute('tabindex',0);
				elmOpen.setAttribute('onkeypress',"rbCalendar.openCalendar('" + fieldIdStr + "',null," + field.mindate + "," + field.maxdate + ",0,0," + ((field.monthControl) ? "0,": "1,") + ((field.monthControl) ? "0,": "1,") + "0)");
				elmOpen.setAttribute('onclick',"rbCalendar.openCalendar('" + fieldIdStr + "',null," + field.mindate + "," + field.maxdate + ",0,0," + ((field.monthControl) ? "0,": "1,") + ((field.monthControl) ? "0,": "1,") + "0)");

				elmClear = document.createElement("DIV");
				elmClear.className = "rbImgCalendarClear";
				elmClear.setAttribute('tabindex',0);
				elmClear.setAttribute("onkeypress","rbCalendar.clickClearDate('" + fieldIdStr + "');");
				elmClear.setAttribute("onclick","rbCalendar.clickClearDate('" + fieldIdStr + "');");
				
				elmInputContainer.appendChild(elmInput);
				elmInputContainer.appendChild(elmClear);
				elmInputContainer.appendChild(elmOpen);

				elmFormatContainer = document.createElement("DIV");
				elmFormatContainer.className = "wif33pContainer";

				elmFormat = this.CreateFormatDef(field.formatStr, true);
				
				elmFormatContainer.appendChild(elmFormat);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormatContainer);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "Header":
				elm = this.CreateMainElement(field.size, undefined, field.typeDef);
				elm.id = "NOTMAPPED_" + fieldIdStr;
				elm.innerHTML = field.title;

				elm = epMIMO.SetDisplay(elm,display);
				
				return elm;
			case "Radio":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wifInputRadioContainer";

				for(var i = 0; i < field.src.length; i++) {
					elmOption = document.createElement("LABEL");
					elmOption.className = "wifInputRadioLabel";
					elmOption.setAttribute('for',fieldIdStr + (i+1));

					elmInput = document.createElement("INPUT");
					elmInput.id = fieldIdStr + (i+1);
					elmInput.setAttribute('name', fieldIdStr);
					elmInput.setAttribute('type','radio');
					elmInput.setAttribute('value',field.src[i].value)
					elmInput.className = "wifInputRadio";

					elmOption.appendChild(elmInput);
					elmOption.innerHTML += (" " + field.src[i].label);

					elmInputContainer.appendChild(elmOption);
				}

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormat);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "Select":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wif"+ field.size +"pInputContainer";

				elmInput = document.createElement("SELECT");
				if(field.id == "ActionTakenID") {
					if(prefix != "Primary") {
						elmInput.id = prefix + field.id;
						elmInput.setAttribute('name', prefix + field.id);
					}
					else {
						elmInput.id = field.id;
						elmInput.setAttribute('name', field.id);
					}
					elmInput.addEventListener('change', (event) => {
						var outcomeValue,fCon;
						for(var i = 0; i < epMIMOObjDef.fields.length; i++) {
							if(Object.keys(this.issueDependencies[prefix]).indexOf(epMIMOObjDef.fields[i].id) > -1 && (epMIMOObjDef.fields[i].id != "ActionTakenID" && epMIMOObjDef.fields[i].id != "OutcomeID")) {
								if(epMIMOObjDef.fields[i].actions.length != 0) { //only looking for fields that are action dependent
									if(epMIMOObjDef.fields[i].outcomes.length != 0) {
										if(Object.keys(this.issueDependencies[prefix]).indexOf("OutcomeID") != -1) {
											outcomeValue = document.getElementById(this.issueDependencies[prefix]["OutcomeID"]).value;
											fCon = epMIMO.GetContainerElement(this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
											if(epMIMOObjDef.fields[i].actions.indexOf((isNaN(event.target.value)) ? event.target.value : Number(event.target.value)) > -1 && epMIMOObjDef.fields[i].outcomes.indexOf(((isNaN(outcomeValue)) ? outcomeValue : Number(outcomeValue))) > -1)
												$(fCon).show()
											else {
												nvxgWIF.clearContainerInputValue((epMIMOObjDef.fields[i].type == "CheckboxList") ? this.issueDependencies[prefix][epMIMOObjDef.fields[i].id] + "List" : this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
												$(fCon).hide();
											}
										}
										else {
											fCon = epMIMO.GetContainerElement(this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
											if(epMIMOObjDef.fields[i].actions.indexOf((isNaN(event.target.value)) ? event.target.value : Number(event.target.value)) > -1)
												$(fCon).show()
											else {
												nvxgWIF.clearContainerInputValue((epMIMOObjDef.fields[i].type == "CheckboxList") ? this.issueDependencies[prefix][epMIMOObjDef.fields[i].id] + "List" : this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
												$(fCon).hide();
											}
										}
									}
									else {
										fCon = epMIMO.GetContainerElement(this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
										if(epMIMOObjDef.fields[i].actions.indexOf((isNaN(event.target.value)) ? event.target.value : Number(event.target.value)) > -1)
											$(fCon).show()
										else {
											nvxgWIF.clearContainerInputValue((epMIMOObjDef.fields[i].type == "CheckboxList") ? this.issueDependencies[prefix][epMIMOObjDef.fields[i].id] + "List" : this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
											$(fCon).hide();
										}
									}
								}
							}
						}
					});
				}
				else if(field.id == "OutcomeID") {
					elmInput.id = prefix + field.id;
					elmInput.setAttribute('name', prefix + field.id);
					
					elmInput.addEventListener('change', (event) => {
						var actionValue,fCon;
						for(var i = 0; i < epMIMOObjDef.fields.length; i++) {
							if(Object.keys(this.issueDependencies[prefix]).indexOf(epMIMOObjDef.fields[i].id) > -1 && (epMIMOObjDef.fields[i].id != "ActionTakenID" && epMIMOObjDef.fields[i].id != "OutcomeID")) {
								if(epMIMOObjDef.fields[i].outcomes.length != 0) { //only looking for fields that are outcome dependent
									if(epMIMOObjDef.fields[i].actions.length != 0) {
										if(Object.keys(this.issueDependencies[prefix]).indexOf("ActionTakenID") != -1) {
											actionValue = document.getElementById(this.issueDependencies[prefix]["ActionTakenID"]).value;
											fCon = epMIMO.GetContainerElement(this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
											if(epMIMOObjDef.fields[i].outcomes.indexOf((isNaN(event.target.value)) ? event.target.value : Number(event.target.value)) > -1 && epMIMOObjDef.fields[i].actions.indexOf((isNaN(actionValue)) ? actionValue : Number(actionValue)) > -1)
												$(fCon).show()
											else {
												nvxgWIF.clearContainerInputValue((epMIMOObjDef.fields[i].type == "CheckboxList") ? this.issueDependencies[prefix][epMIMOObjDef.fields[i].id] + "List" : this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
												$(fCon).hide();
											}
										}
										else {
											fCon = epMIMO.GetContainerElement(this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
											if(epMIMOObjDef.fields[i].outcomes.indexOf((isNaN(event.target.value)) ? event.target.value : Number(event.target.value)) > -1)
												$(fCon).show()
											else {
												nvxgWIF.clearContainerInputValue((epMIMOObjDef.fields[i].type == "CheckboxList") ? this.issueDependencies[prefix][epMIMOObjDef.fields[i].id] + "List" : this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
												$(fCon).hide();
											}
										}
									}
									else {
										fCon = epMIMO.GetContainerElement(this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
										if(epMIMOObjDef.fields[i].outcomes.indexOf((isNaN(event.target.value)) ? event.target.value : Number(event.target.value)) > -1)
											$(fCon).show()
										else {
											nvxgWIF.clearContainerInputValue((epMIMOObjDef.fields[i].type == "CheckboxList") ? this.issueDependencies[prefix][epMIMOObjDef.fields[i].id] + "List" : this.issueDependencies[prefix][epMIMOObjDef.fields[i].id]);
											$(fCon).hide();
										}
									}
								}
							}
						}
					});
				}
				else {
					elmInput.id = fieldIdStr;
					elmInput.setAttribute('name', fieldIdStr);
				}
				elmInput.className = "wif"+ field.size +"pSelect";
				if(field.required == true) {
					elmInput.setAttribute('aria-required', true);
					elmInput.setAttribute('required', true);
				}
				else {
					elmOption = document.createElement("OPTION");
					elmOption.setAttribute('value',"");
					elmOption.setAttribute('title',"");
					elmInput.appendChild(elmOption);
				}
				elmInput.setAttribute('value','');

				for(var i = 0; i < field.src.length; i++) {
					elmOption = document.createElement("OPTION");
					elmOption.setAttribute('value',field.src[i].value);
					elmOption.innerHTML = field.src[i].label;
					elmInput.appendChild(elmOption);
				}
				elmInput.selectedIndex = "-1";

				elmInputContainer.appendChild(elmInput);

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormat);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "Text":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wif"+ field.size +"pInputContainer";
				
				elmInput = document.createElement("INPUT");
				elmInput.id = fieldIdStr;
				elmInput.className = "wif"+ field.size +"pText";
				elmInput.setAttribute('name', fieldIdStr);
				elmInput.setAttribute('type', field.type);
				elmInput.setAttribute('maxlength', 100);
				elmInput.setAttribute('value','');
				if(field.required == true)
					elmInput.setAttribute('aria-required', true);

				elmInputContainer.appendChild(elmInput);

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormat);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "TextArea":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wif"+ field.size +"pInputContainer";
				
				elmInput = document.createElement("TEXTAREA");
				elmInput.id = fieldIdStr;
				elmInput.className = "wif"+ field.size +"pTextArea";
				elmInput.setAttribute('name', fieldIdStr);
				(field.rows != undefined) ? elmInput.setAttribute('rows', field.rows) : elmInput.setAttribute('rows', 4);
				switch(field.size) {
					case 50:
						elmInput.setAttribute('cols', 30);
					break;
					case 66:
						elmInput.setAttribute('cols', 45);
					break;
					case 100:
						elmInput.setAttribute('cols', 70);
					break;
				}
				elmInput.setAttribute("onpaste","nvxgWIF.autoresize(this)");
				elmInput.setAttribute("oncut","nvxgWIF.autoresize(this)");
				elmInput.setAttribute("onkeyup","nvxgWIF.autoresize(this)");
				if(field.required == true)
					elmInput.setAttribute('aria-required', true);

				elmInputContainer.appendChild(elmInput);

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormat);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			case "Time":
				elm = this.CreateMainElement(field.size, undefined, undefined);

				elmInstr = this.CreateInstructions(fieldIdStr, field.title, field.required);

				elmInputContainer = document.createElement("DIV");
				elmInputContainer.className = "wif33pInputContainer";

				elmInput = document.createElement("DIV");
				elmInput.className = "time";
				elmInput.setAttribute('elmname',fieldIdStr);
				elmInput.setAttribute('setclock',false);

				elmInputContainer.appendChild(elmInput);

				elmFormat = this.CreateFormatDef(field.formatStr);

				elm.appendChild(elmInstr);
				elm.appendChild(elmInputContainer);
				elm.appendChild(elmFormat);

				elm = epMIMO.SetDisplay(elm,display);

				return elm;
			default:
				break;
		};
	},
	// --------------------------------------------------------------------------------------------------------------------
	CreateMainElement: function(size, id, typeDef){
		(typeDef != undefined) ? elm = document.createElement(typeDef) : elm = document.createElement("DIV");
		elm.className = "wif"+ size +"pContainer";

		if(id != undefined)
			elm.id = id + "List";

		return elm;
	},
	// --------------------------------------------------------------------------------------------------------------------
	CreateInstructions: function(id, text, requirement){
		elmInstr = document.createElement("DIV");
		elmInstr.className = "wifInstructions";

		elmRequirement = document.createElement("DIV");
		elmRequirement.className = "wifRequiredFlag";
		(requirement === Object || requirement == true) ? elmRequirement.innerHTML = "♦": elmRequirement.innerHTML = "&nbsp;";

		elmLabel = document.createElement("LABEL");
		elmLabel.id = id + "ERRTXT";
		elmLabel.setAttribute('for', id);
		
		elmLabel.className = "defaultText";
		elmLabel.innerHTML = text;
		elmInstr.appendChild(elmRequirement);
		elmInstr.appendChild(elmLabel);

		return elmInstr;
	},
	// --------------------------------------------------------------------------------------------------------------------
	CreateFormatDef: function(formatString, calendar){
		elmFormat = document.createElement("DIV");
		(formatString != undefined) ? elmFormat.innerHTML = formatString: elmFormat.innerHTML = "&nbsp;";
		(calendar) ? elmFormat.className = "wifFieldFormatDefRight" : elmFormat.className = "wifFieldFormatDef";

		return elmFormat;
	},
	// --------------------------------------------------------------------------------------------------------------------
	GetContainerElement: function(id){
		var field = document.querySelector('[id*="' + id + '"]');

		while(field.parentElement.className != "content") {
			field = field.parentElement;
		}

		return field;
	},
	// --------------------------------------------------------------------------------------------------------------------
	SetDisplay: function(field, display){
		(display == false) ? field.style.display = "none" : field.style.display = "";
		
		return field;
	},
	// --------------------------------------------------------------------------------------------------------------------
	SetSubSectionLabel: function(prefix){
		document.getElementById("MIMO" + prefix + "Container").getElementsByClassName("label")[0].innerHTML = epMIMOObjDef.issueSubSectionLabel[this.prefixes.indexOf(prefix)];

		if(this.issueTypeTitle) {
			var issueHeader = epIssueTypes.MimoSubSectionTitle[prefix]["issueType"] + 
				((epIssueTypes.MimoSubSectionTitle[prefix]["layer1"]) ? " : " + epIssueTypes.MimoSubSectionTitle[prefix]["layer1"] : "") +
				((epIssueTypes.MimoSubSectionTitle[prefix]["layer2"]) ? " : " + epIssueTypes.MimoSubSectionTitle[prefix]["layer2"] : "") +
				((epIssueTypes.MimoSubSectionTitle[prefix]["layer3"]) ? " : " + epIssueTypes.MimoSubSectionTitle[prefix]["layer3"] : "");

				document.getElementById("MIMO" + prefix + "HeaderContainer").innerHTML = `<h3>${issueHeader}</h3>`;
				document.getElementById("MIMO" + prefix + "HeaderContainer").style.display = "";
		}
		else
			document.getElementById("MIMO" + prefix + "HeaderContainer").style.display = "none";
	},
	// --------------------------------------------------------------------------------------------------------------------
	Completeness: function() {
		var errorMessageARR = [];
		//check for duplicates
		var IDs = epMIMOObjDef.fields.map(field => field.id);
		let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
		var dupes = findDuplicates(IDs);
		dupes = dupes.filter(e => e !== undefined)
		if(dupes.length > 0) {
			errorMessageARR.push(`${dupes.length} Duplicate field IDs are being used.`);
		}
		//check for missing Action or Outcome with field onchanges
		var Actions = epMIMOObjDef.fields.map(field => field.actions).filter(e => e !== undefined).filter(act => act.length !== 0);
		var Outcomes = epMIMOObjDef.fields.map(field => field.outcomes).filter(e => e !== undefined).filter(out => out.length !== 0);
		if(Actions.length > 0) {
			if(IDs.indexOf("ActionTakenID") == -1)
				errorMessageARR.push("Action Dependencies are being used but ActionTakenID is not a used field.");
			else {
				var at = epMIMOObjDef.fields.find(x => x.id == "ActionTakenID").src.map(field => field.value);
				var missingActionCount = 0;
				Actions.forEach(act => {
					act.forEach(ac => {
						if(at.indexOf(ac) == -1)
							missingActionCount++;
					});
				});
				if(missingActionCount > 0)
					errorMessageARR.push(missingActionCount + ((missingActionCount == 1) ? " Field uses an ActionTakenID value that does not exist." : " Fields use an ActionTakenID value that does not exist."));
			}
		}
		if(Outcomes.length > 0) {
			if(IDs.indexOf("OutcomeID") == -1)
				errorMessageARR.push("Outcome Dependencies are being used but OutcomeID is not a used field.");
			else {
				var ov = epMIMOObjDef.fields.find(x => x.id == "OutcomeID").src.map(field => field.value);
				var missingOutcomeCount = 0;
				Outcomes.forEach(out => {
					out.forEach(oi => {
						if(ov.indexOf(oi) == -1)
						missingOutcomeCount++;
					});
				});
				if(missingOutcomeCount > 0)
					errorMessageARR.push(missingOutcomeCount + ((missingOutcomeCount == 1) ? " Field uses an OutcomeID value that does not exist." : " Fields use an OutcomeID value that does not exist."));
			}
		}
		//check for missing classifications
		var missingClasses = 0;
		epMIMOObjDef.fields.filter(field => field.actions).filter(field => field.type != "BR" && field.type != "Header").filter(field => !field.classification).forEach(cls => {
			(cls.actions.length > 0) ? missingClasses++ : null;
		});
		epMIMOObjDef.fields.filter(field => field.outcomes).filter(field => field.type != "BR" && field.type != "Header").filter(field => !field.classification).forEach(cls => {
			(cls.outcomes.length > 0) ? missingClasses++ : null;
		});

		if(missingClasses > 0)
			errorMessageARR.push(missingClasses + ((missingClasses == 1) ? " Field is referencing Actions or Outcomes but does" : " Fields are referencing Actions or Outcomes but do") + " not contain a classification.");

		var wrongClasses = epMIMOObjDef.fields.filter(field => field.classification).filter(field => field.type != "BR" && field.type != "Header");
		var wrongClassCount = 0;
		wrongClasses.forEach(field => {
			if((field.classification.toUpperCase() == "A" && (!field.actions || field?.actions.length == 0)) ||
				(field.classification.toUpperCase() == "O" && (!field.outcomes || field?.outcomes.length == 0)))
				wrongClassCount++;
		});
		if(wrongClassCount > 0)
			errorMessageARR.push(wrongClassCount + ((wrongClassCount == 1) ? " Field is" : " Fields are") + " using the incorrect classification.");

		//generate alert
		var errorMSG = "MIMO Errors:\n\n";
		errorMessageARR.forEach(msg => {
			errorMSG += msg + "\n\n";
		})
		if(errorMessageARR.length > 0)
			alert(errorMSG);
	}
}