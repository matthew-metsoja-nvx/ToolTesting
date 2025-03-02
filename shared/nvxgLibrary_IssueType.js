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


var	epIssueTypes = {
	DisplayIssueDesciption		: true,	
	IssuePackageID 			: null,
	CaseTypeID 				: null,
	PackageIndex				: null,
	HasDesciptions				: false,	
	IssueDisplay				:1,
	IssueDisplayState			:0,
	UIType						:0,
	MIMOState					:0,
	IssueDisplayNumber			:1,
	AllowAddIssues				: true,
	MimoSubSectionTitle:		{"Primary": {},"Secondary": {},"Tertiary": {},"Quaternary": {},"Quinary": {}},
// -------------------------------------------------------------------------------------------------------------------------------------------------------------

	Init:function(packageid){
		epIssueTypes.IssueDisplay=1;
		epIssueTypes.IssueDisplayState=0;
		if(document.getElementById("MIMOModule")?.value==1)
			epIssueTypes.MIMOState=1;
		if(epIssueSelection.HideIssues !=undefined){
			if(epIssueSelection.HideIssues.length!=0){
				for (var q=0; q < epIssueSelection.issues.length; q++){
					if(epIssueSelection.HideIssues.indexOf(epIssueSelection.issues[q].id) !=-1){epIssueSelection.issues[q].display = false};
				}
			}
		}
		if(epIssueSelection.UIDisplay==undefined || epIssueSelection.UIDisplay=="" || epIssueSelection.UIDisplay=="null"){epIssueTypes.UIType=0;}else{epIssueTypes.UIType=epIssueSelection.UIDisplay;};
		if(epIssueSelection.categories==undefined || epIssueSelection.categories=="" || epIssueSelection.categories=="null"){epIssueTypes.HasCategories=false;}else{epIssueTypes.HasCategories=true;epIssueTypes.AllowAddIssues=false;epIssueTypes.UIType=0};		
		
		if(epIssueTypes.HasCategories){
			epIssueTypes.AllowAddIssues=false;
			if(epIssueSelection.CategoryWidth==undefined || epIssueSelection.CategoryWidth=="" || epIssueSelection.CategoryWidth=="null"){epIssueTypes.CategoryWidth=epIssueSelection.DisplayWidth};			
			if(epIssueSelection.CategoryLabel==undefined || epIssueSelection.CategoryLabel=="" || epIssueSelection.CategoryLabel=="null"){epIssueSelection.CategoryLabel="DEFINE: CategoryLabel"};			
			if(epIssueSelection.CategoryIntructions==undefined || epIssueSelection.CategoryIntructions=="" || epIssueSelection.CategoryIntructions=="null"){epIssueSelection.CategoryIntructions="DEFINE: CategoryIntructions"};				
			if(epIssueSelection.CategoryDescriptionLabel==undefined || epIssueSelection.CategoryDescriptionLabel=="" || epIssueSelection.CategoryDescriptionLabel=="null"){epIssueSelection.CategoryDescriptionLabel="DEFINE: CategoryDescriptionLabel"};													
			targ=document.getElementById("IssueSelectionContainer");
			cTable=document.createElement('div');
			cTable.setAttribute("id","CategoriesTable");			
//			cTable.setAttribute("cellPadding", 0);			
//			cTable.setAttribute("cellSpacing", 0);			
//			cTable.setAttribute("border", 0);
//			cTable.className = "wifContent_table";
//			cBody=document.createElement('tbody');
			cRow=document.createElement('div');
			cRow.className ="subsection";
			cHead=document.createElement('div');
			cHead.className ="label";
			cCell=document.createElement('div');		
			cCell.className ="content";
			thText = document.createTextNode(epIssueSelection.CategoryLabel);
			//cHead.style.cssText = "Padding-Top:22px";
			cHead.appendChild(thText);
			cRow.appendChild(cHead);
			cDivContainer=document.createElement('div');
			cDivContainer.className ="wif100pContainer";
			cDivInstructions=document.createElement('div');
			cDivInstructions.className ="wifInstructions";
			cDivRequiredFlag=document.createElement('div');
			cDivRequiredFlag.className ="wifRequiredFlag";
			cDivRequiredFlagText = document.createTextNode('');
			cDivRequiredFlag.appendChild(cDivRequiredFlagText);		
			cDivRequiredFlag.innerHTML=epIssueSelection.RequiredFlagText;
			cDivInstructions.appendChild(cDivRequiredFlag);
			cSpanInstructions=document.createElement('label');
			cSpanInstructions.id ="CategoryIDERRTXT";	
			cSpanInstructions.className="defaultText";
			cSpanInstructions.htmlFor = "Category";			
			cSpanInstructions.innerHTML = epIssueSelection.CategoryIntructions;
			cDivInstructions.appendChild(cSpanInstructions);
			cDivContainer.appendChild(cDivInstructions);
			cDivSelectContainer=document.createElement('div');
			cDivSelectContainer.className ="wif"+epIssueSelection.CategoryWidth+"pInputContainer";
			cSelect=document.createElement('select');
			cSelect.id = "CategoryID";
			cSelect.name = "CategoryID";
			cSelect.className = "wif"+epIssueSelection.CategoryWidth+"pSelect";
			cSelect.setAttribute("required", "true");
			cSelect.onfocus = nvxgWIF.focusEml;
			cSelect.onfocusin  = nvxgWIF.focusEml;
			cSelect.onblur = nvxgWIF.blurEml;
			cSelect.onchange = epIssueTypes.setCategoryIssues;
			cSelect.onkeyup = epIssueTypes.setCategoryIssues;
			for (cat=0;cat<epIssueSelection.categories.length;cat++) {
				cOption=document.createElement('option');
				optText = document.createTextNode(nvxgWIF.removeHTMLTags(epIssueSelection.categories[cat].title));
				cOption.appendChild(optText);
				cOption.title = epIssueSelection.categories[cat].title;
				cOption.value = epIssueSelection.categories[cat].id;
				cSelect.appendChild(cOption);
			}
			cDivSelectContainer.appendChild(cSelect);
			cDivContainer.appendChild(cDivSelectContainer);
			cDivSubLabel=document.createElement('div');
			cText = document.createTextNode(lc.$SYS_SELECTONE);
			cDivSubLabel.appendChild(cText);
			cDivSubLabel.className="wifFieldFormatDef";
			cDivContainer.appendChild(cDivSubLabel);
			cDivLablContainerX=document.createElement('div');
			cDivLablContainerX.className="wif100pConatiner";
			cDivLablContainerX.style.cssText = "padding-left: 10px;";
			cDivLablContainer=document.createElement('div');
			cDivLablContainer.className="wifInstructions";
			cText = document.createTextNode(epIssueSelection.CategoryDescriptionLabel);
			cDivLablContainer.appendChild(cText);
			cDivLablContainerX.appendChild(cDivLablContainer);
			cDivContainer.appendChild(cDivLablContainerX);
			cDivLablContainer=document.createElement('div');
			cDivLablContainer.className="wifInstructions";
			cDivDescContainer=document.createElement('div');
			cDivDescContainer.className ="IssueTypeDescription";		
			cDivDescContainer.id ="CategoryDescriptionContainer";				
			cDivDescContainer.style.cssText = "padding-left: 1px;";
			cDivContainer.appendChild(cDivDescContainer);
			cCell.appendChild(cDivContainer);
			cRow.appendChild(cCell);					
			//cBody.appendChild(cRow);						
			cTable.appendChild(cRow);						
			targ.insertBefore(cTable, targ.childNodes[0]);
			
					}else{
			epIssueTypes.InitDisplay(packageid);
		}
	},
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
setCategoryIssues:function(){
	catid=document.getElementById("CategoryID").value;
	catdef=null;
	for (ct=0;ct<epIssueSelection.categories.length;ct++) {
		if(catid==epIssueSelection.categories[ct].id){ break;};
	};
	catdef=epIssueSelection.categories[ct];
	for (var cq=0; cq < epIssueSelection.issues.length; cq++){	
		if(catdef.issues.indexOf(epIssueSelection.issues[cq].id)!=-1){epIssueSelection.issues[cq].parentid = catdef.id};
	};
	document.getElementById("CategoryDescriptionContainer").innerHTML=catdef.description;
	try{nvxgWIF.clearObjectChildNodes('PrimaryIssueTypeContainer');}catch(err){};	
	epIssueTypes.InitDisplay(catdef.id);

	if(catdef.issues.length==1){
		document.getElementById("PrimaryIssueTypeID").selectedIndex=0;
		epIssueTypes.setIssueDesciption("Primary",document.getElementById("PrimaryIssueTypeID").value);
		document.getElementById("CategoryDescriptionContainer").innerHTML = document.getElementById("PrimaryIssueDesciption").innerHTML;
		document.getElementById("PrimaryIssueTypeContainer").style.display = "none";
	}else{
		document.getElementById("PrimaryIssueTypeContainer").style.display = "";		
	};

	
	
},
// -------------------------------------------------------------------------------------------------------------------------------------------------------------	
	InitDisplay:function(packageid){	

		try{nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');}catch(err){};
		try{nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');}catch(err){};
		/*** MIMO Module *************************************************************/
		try{nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');}catch(err){};
		try{nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');}catch(err){};
		/*****************************************************************************/
		epIssueSelection.PackageID=packageid;
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].id == 0){epIssueSelection.issues[q].id=epIssueSelection.OtherPlaceHolderID;epIssueSelection.HasOtherAsZero=true};
		};
			epIssueTypes.createIssueTypeObject('Primary',epIssueSelection.PackageID);


		if(epIssueTypes.UIType==0){
			if(epIssueSelection.DisplayNumIssues < 3)
				epIssueTypes.IssueDisplayNumber = 1;
			else if(epIssueSelection.DisplayNumIssues < 5)
				epIssueTypes.IssueDisplayNumber = 3;
			else
				epIssueTypes.IssueDisplayNumber = 5;

			if(epIssueTypes.IssueDisplayNumber == 1)
				epIssueTypes.AllowAddIssues = false;
			if(epIssueTypes.AllowAddIssues){
				iRow=document.createElement('div');
				iRow.className ="subsection";
				iHead=document.createElement('div');
				iHead.className ="label";;
				iHead.style.border="0px";
				iCell=document.createElement('div');		
				iCell.className ="content";
				iCell.style.border="0px";
				addbutton=document.createElement('div');
				addbutton.id="AdditionalIssueButtons";
				addbutton.innerHTML = "<div class='subLevelNavBar' style='margin:0px 18px 0px 0px!important; padding:0px !important; height:20px !important; width:100px !important; float:right' ><a href='javascript:epIssueTypes.addIssue()' id='AdditionalIssueEnabled'>" + epIssueSelection.AddIssueText + "</a><a  id='AdditionalIssueDisabled' disabled='disabled' href='javascript:void(0)'>" + epIssueSelection.AddIssueText + "</a></div>";
				targ=document.getElementById("IssueSelectionContainer");
				iRow.appendChild(iHead);
				iCell.appendChild(addbutton);
				iRow.appendChild(iCell);
				targ.appendChild(iRow);				
				document.getElementById("SecondaryIssueTypeContainer").style.display="none";
				document.getElementById("TertiaryIssueTypeContainer").style.display="none";
				document.getElementById("QuaternaryIssueTypeContainer").style.display="none";
				document.getElementById("QuinaryIssueTypeContainer").style.display="none";
				/*****************************************************************************/
				document.getElementById("AdditionalIssueEnabled").style.display="none";				
				document.getElementById("AdditionalIssueDisabled").style.display="none";		
			}else{
				parentElm = document.getElementById("IssueSelectionContainer");
				try{nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');}catch(err){};
				try{nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');}catch(err){};
				try{nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');}catch(err){};
				try{nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');}catch(err){};
			};
			if(epIssueTypes.MIMOState == 1)
				epMIMO.Init();
		}else{
			
		};
	
	},
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
	setIssueTypeOptions : function(prefix,parentid){
		nvxgWIF.clearObjectChildNodes('PrimaryIssueTypeContainer');
		nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');
		nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
		nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
		nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
		parentid = String(parentid);
		epIssueTypes.createIssueTypeObject(prefix,parentid);
		
	},
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
	createIssueTypeObject:function (prefix,parentid){
		epIssueTypes.HasDesciptions = false;
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].display == true && epIssueSelection.issues[q].parentid == parentid && epIssueSelection.issues[q].description != undefined ){
				epIssueTypes.HasDesciptions = true;
				break;
			}
		};
		if(epIssueTypes.HasDesciptions == false){epIssueSelection.AnimateRadioButtons = false};
		if(prefix == "Primary")		{it = 0};		
		if(prefix == "Secondary")	{it = 1};
		if(prefix == "Tertiary")	{it = 2};
		if(prefix == "Quaternary")	{it = 3};
		if(prefix == "Quinary")		{it = 4};
		targ = document.getElementById(prefix + "IssueTypeContainer")
		iRow=document.createElement('div');
		iRow.className ="subsection";
		iHead=document.createElement('div');
		iHead.className ="label";
		xext = epIssueSelection.IssueTypeLabel[it];
		 thText = document.createTextNode("");
		iHead.appendChild(thText);
		iHead.innerHTML = xext;
		iCell=document.createElement('div');		
		iCell.className ="content";
		iDivContainer=document.createElement('div');
		iDivContainer.className ="wif100pContainer";
		iDivInstructions=document.createElement('div');
		iDivInstructions.className ="wifInstructions";		
		iDivRequiredFlag=document.createElement('div');
		iDivRequiredFlag.className ="wifRequiredFlag";
		iDivRequiredFlagText = document.createTextNode('');
		iDivRequiredFlag.appendChild(iDivRequiredFlagText);		
		iDivRequiredFlag.innerHTML=epIssueSelection.RequiredFlagText;
		iDivInstructions.appendChild(iDivRequiredFlag);
		iSpanInstructions=document.createElement('label');
		iSpanInstructions.id =prefix + "IssueTypeID" + "ERRTXT";	
		iSpanInstructions.className="defaultText";
		iSpanInstructions.htmlFor =prefix + "IssueTypeID";			
		iSpanInstructions.innerHTML = epIssueSelection.IssueTypeIntructions;
		iDivInstructions.appendChild(iSpanInstructions);
		if(epIssueTypes.UIType==0 && prefix != "Primary"){		
		iDivClose=document.createElement('div');
			iDivClose.className ="closeIcon";	
			iDivClose.id= prefix + "Close";
			iDivClose.onclick=epIssueTypes.removeIssue;
			iDivClose.title= epIssueSelection.CloseIconLabel;
			iCell.appendChild(iDivClose);
		};
		iDivContainer.appendChild(iDivInstructions);
		iCell.appendChild(iDivContainer);
		if(epIssueTypes.UIType==0){				
			iDivContainer=document.createElement('div');
			iDivContainer.className ="wif"+epIssueSelection.DisplayWidth+"pContainer";
			iDivSelectContainer=document.createElement('div');
			iDivSelectContainer.className ="wif"+epIssueSelection.DisplayWidth+"pInputContainer";
			iSelect=document.createElement('select');
			iSelect.id = prefix + "IssueTypeID";
			iSelect.name = prefix + "IssueTypeID";
			iSelect.className = "wif"+epIssueSelection.DisplayWidth+"pSelect";
			iSelect.setAttribute("required", "true");
			iSelect.setAttribute("prefix", prefix);
			iSelect.setAttribute("level", 0);
			iSelect.title = epIssueSelection.IssueTypeTitle[it];
			for (var q=0; q < epIssueSelection.issues.length; q++){
				if(epIssueSelection.issues[q].display == true && epIssueSelection.issues[q].parentid == parentid){			
					iOption=document.createElement('option');
					optText = document.createTextNode(nvxgWIF.removeHTMLTags(epIssueSelection.issues[q].title));
					iOption.appendChild(optText);
					iOption.title = epIssueSelection.issues[q].title;
					iOption.value = epIssueSelection.issues[q].id;
					if(epIssueSelection.issues[q].casetype==0){iOption.style.color = "#333";};
					iSelect.appendChild(iOption);
				}
			}
			iSelect.onfocus = nvxgWIF.focusEml;
			iSelect.onfocusin  = nvxgWIF.focusEml;
			iSelect.onblur = nvxgWIF.blurEml;
			iSelect.onchange = epIssueTypes.setLayers;
			iSelect.onkeyup = epIssueTypes.setLayers;
			iDivSelectContainer.appendChild(iSelect);
			iDivContainer.appendChild(iDivSelectContainer);	
		};
		iDivSubLabel=document.createElement('div');
		iText = document.createTextNode(lc["$SYS_SELECTONE"]);
		iDivSubLabel.appendChild(iText);
		iDivSubLabel.className="wifFieldFormatDef"
		iDivSubLabel.style.paddingTop ="3px";
		iDivContainer.appendChild(iDivSubLabel);
		iRow.appendChild(iHead);
		iCell.appendChild(iDivContainer);
		if(epIssueTypes.UIType==0 && epIssueSelection.DisplayDescription && epIssueTypes.HasDesciptions){
			iDivContainer=document.createElement('div');
			iDivInstructions=document.createElement('div');
			iText = document.createTextNode('');
			iDivInstructions.appendChild(iText);		
			iDivInstructions.innerHTML = epIssueSelection.IssueDescriptionLabel;
			iDivInstructions.className = "IssueTypeDescriptionLabel"
			iDivContainer.appendChild(iDivInstructions);	
			iDivContainer.className = "wif100pConatiner";
			iDivContainer.style.paddingLeft = "10px";
			iCell.appendChild(iDivContainer);		
			iBR=document.createElement('br');
			iBR.className="wifClearFloat";
			iCell.appendChild(iBR);
			iDivDescContainer=document.createElement('div');
			iDivDescContainer.id =prefix + 'IssueDesciption';					
			iDivDescContainer.className ="IssueTypeDescription";		
			iDivContainer.appendChild(iDivDescContainer);
			iDivDescContainer.innerHTML = "<em style='color:#666666'>" + epIssueSelection.IssueDescriptionDefault + "</em>";
			iCell.appendChild(iDivContainer);
		};
		iRow.appendChild(iCell);
		targ.appendChild(iRow);
	
	if(epIssueTypes.UIType==0){
		iSelect.selectedIndex = -1;
	}else{
		iDivContainer=document.createElement('div');	
		iDivContainer.className = "wif100pContainer";	
		iRadioContainer=document.createElement('div');	
		iRadioContainer.className = "wifInputRadioContainer";	
		iRadioContainer.style.marginLeft="10px";
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].display == true && epIssueSelection.issues[q].parentid == parentid){			
				animatebox=document.createElement('div');
				animatebox.id="PrimaryIssueTypeID" + epIssueSelection.issues[q].id + "Animate";
				animatebox.style.marginBottom="3px";
				
				animatelabel=document.createElement('label');
				animatelabel.id="PrimaryIssueTypeID" + epIssueSelection.issues[q].id + "label";
				animatelabel.htmlFor = "PrimaryIssueTypeID" + epIssueSelection.issues[q].id;
				animatelabel.className="wifInputRadioLabel";

				radiobutton=document.createElement('input');
				radiobutton.type="radio";
				radiobutton.name="PrimaryIssueTypeID";
				radiobutton.id = "PrimaryIssueTypeID" + epIssueSelection.issues[q].id;
				radiobutton.value = epIssueSelection.issues[q].id;				
				radiobutton.className = "wifInputRadio";
				radiobutton.setAttribute("animate",epIssueSelection.AnimateRadioButtons);
				radiobutton.setAttribute("state","open");
				radiobutton.style.marginRight="4px";
				radiobutton.style.marginTop="-2px";				
				//iText = document.createTextNode(epIssueSelection.issues[q].title);
				iText=document.createElement('span');
				animatelabel.appendChild(radiobutton);
				animatelabel.appendChild(iText);
				iText.innerHTML = epIssueSelection.issues[q].title;
				animatebox.appendChild(animatelabel);
				if(epIssueTypes.HasDesciptions && epIssueSelection.DisplayDescription ){
					iDivDescContainer=document.createElement('div');				
					iDivDescContainer.className ="IssueTypeDescription";			
					animatebox.appendChild(iDivDescContainer);
					iDivDescContainer.innerHTML = epIssueSelection.issues[q].description + "<br/>";
					iDivDescContainer.style.overflow="hidden";
					iDivDescContainer.style.marginLeft="17px";
					iDivDescContainer.style.marginTop="0px";	
				};
				iRadioContainer.appendChild(animatebox);
			};
			iDivContainer.appendChild(iRadioContainer);
			iCell.appendChild(iDivContainer);
			if(epIssueTypes.HasDesciptions && epIssueSelection.DisplayDescription && epIssueSelection.AnimateRadioButtons){
				cid="PrimaryIssueTypeID" + epIssueSelection.issues[q].id + "Animate";
				eval("nvxgWIF.PrimaryIssueTypeID" + epIssueSelection.issues[q].id + "Animate = new Spry.Widget.CollapsiblePanel('" + cid + "');");
			};
		};
	};	
		
		
		
	},

	
	setCaseType : function(vid){
		vid = Number(vid);
		if(vid!=0){
			for (var q=0; q < epIssueSelection.issues.length; q++){
				if(epIssueSelection.issues[q].id == vid && epIssueSelection.issues[q].parentid==epIssueSelection.PackageID){
					break;
				};
			};
		//
		};

	},
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
	setIssueDesciption : function(prefix,vid){
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].id == vid && epIssueSelection.issues[q].itemtype=="issue"){
				break;
			};
		};
		if(epIssueSelection.DisplayDescription){
			vid = Number(vid);		
			if(vid!=0){
				elm = document.getElementById(prefix + 'IssueDesciption')
				elm.innerHTML = epIssueSelection.issues[q].description;
			};					
		};
		if(epIssueSelection.OverrideCaseType == undefined){OverrideCaseType=false};
		if(prefix=="Primary" && epIssueSelection.OverrideCaseType){
			if(document.getElementById("formtype")== undefined){ishotline = false}else{if(document.getElementById("formtype").value == "hotline"){ishotline = true;}else{ishotline = false;};};
				document.getElementById("CaseTypeID").value = epIssueSelection.issues[q].casetype;
				try{
					if(Number(document.getElementById("CaseTypeID").value) == 2 && ishotline){
						nvxgWIF.toggleElements('AllegationSectionContainer,ParticipantsSectionContainer','none');
						nvxgWIF.toggleElements('InquirySectionContainer','');						
					}else{
						nvxgWIF.toggleElements('AllegationSectionContainer,ParticipantsSectionContainer','');
						nvxgWIF.toggleElements('InquirySectionContainer','none');						
					};	
				 }catch(err){};
		};

		if(epIssueTypes.AllowAddIssues){epIssueTypes.setAddIssueState()};
		if(epIssueTypes.MIMOState == 1)
			epMIMO.OnIssueSelect(prefix,vid);
		nvxgCUSTOM.onissueSelect(prefix,vid);

	},

// -------------------------------------------------------------------------------------------------------------------------------------------------------------
	hasLayers : function(vid,level){
		r = false;
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].parentid == vid && epIssueSelection.issues[q].display){r=true; break;}
		};
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].parentid == epIssueSelection.PackageID && epIssueSelection.issues[q].id == vid && level !=0){r=false; break;}
		};
		return r;
	},

// -------------------------------------------------------------------------------------------------------------------------------------------------------------
	createLayerSection : function(prefix,vid,level){

		iRow=document.createElement('div');
		iRow.className ="subsection";
		iRow.id = prefix + "layer" + level;
		//alert(iRow.id);
		iHead=document.createElement('div');
		iHead.className ="label";
		iHead.style.border="0px";
		thText = document.createTextNode("");
		iHead.appendChild(thText);
		iRow.appendChild(iHead);
		
		iCell=document.createElement('div');		
		iCell.className ="content";
		iCell.style.border="0px";
		iDivContainer=document.createElement('div');
		iDivContainer.className ="wif"+epIssueSelection.DisplayWidth+"pContainer";		
		iDivInstructions=document.createElement('div');
		iDivInstructions.className ="wifInstructions";		
		iDivRequiredFlag=document.createElement('div');
		iDivRequiredFlag.className ="wifRequiredFlag";	
		if(epIssueSelection.LayersRequired == "true"){
			iDivRequiredFlag.innerHTML = epIssueSelection.RequiredFlagText;
		 }else{
			iDivRequiredFlag.innerHTML = " ";			
		}
		iDivInstructions.appendChild(iDivRequiredFlag);
		iSpanInstructions=document.createElement('label');
		iSpanInstructions.id =prefix + "IssueTypeLayer" + level + "ID" + "ERRTXT";	
		iSpanInstructions.className ="defaultText";
		iSpanInstructions.htmlFor =prefix + "IssueTypeLayer" + level + "ID";			
		iSpanInstructions.innerHTML = epIssueSelection.LayerLevelLabel[Number(level-1)];
		iDivInstructions.appendChild(iSpanInstructions);
		iDivContainer.appendChild(iDivInstructions);
		iCell.appendChild(iDivContainer);
		iBR=document.createElement('br');
		iBR.className="wifClearFloat";
		iCell.appendChild(iBR);

	
	
	
		iDivContainer=document.createElement('div');		
		iDivContainer.className ="wif"+epIssueSelection.DisplayWidth+"pContainer";		
		iDivSelectContainer=document.createElement('div');
		iDivSelectContainer.className ="wif"+epIssueSelection.DisplayWidth+"pInputContainer";		
		iSelect=document.createElement('select');
		iSelect.name = prefix + "IssueTypeLayer" + level + "ID";
		iSelect.className = "wif"+epIssueSelection.DisplayWidth+"pSelect";
		iSelect.setAttribute("id", prefix + "IssueTypeLayer" + level + "ID");
		iSelect.setAttribute("required", epIssueSelection.RequiredFlagText);
		iSelect.setAttribute("prefix", prefix);
		iSelect.setAttribute("level", level);
		iSelect.title = epIssueSelection.LayerLevelLabel[Number(level-1)];
		if(epIssueSelection.LayersRequired != "true"){		
			iOption=document.createElement('option');
			optText = document.createTextNode('');
			iOption.appendChild(optText);
			iOption.title ='';
			iOption.value ='';			
			iOption.style.color="#666666";
			iSelect.appendChild(iOption);
		}
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].display == true && epIssueSelection.issues[q].parentid == vid){			
				iOption=document.createElement('option');
				clean=nvxgWIF.removeHTMLTags(epIssueSelection.issues[q].title);
				optText = document.createTextNode(clean);
				iOption.appendChild(optText);
				iOption.title = clean;
				iOption.value = epIssueSelection.issues[q].id;
				iSelect.appendChild(iOption);
			}
		}


		iSelect.onfocus = nvxgWIF.focusEml;
		iSelect.onfocusin  = nvxgWIF.focusEml;
		iSelect.onblur = nvxgWIF.blurEml;
		iSelect.onchange = epIssueTypes.setLayers;
		iDivSelectContainer.appendChild(iSelect);
		iDivContainer.appendChild(iDivSelectContainer);	
		iDivSubLabel=document.createElement('div');
		iText = document.createTextNode(lc["$SYS_SELECTONE"]);
		iDivSubLabel.appendChild(iText);
		iDivSubLabel.className="wifFieldFormatDef"
		iDivSubLabel.style.paddingTop ="3px";
		iDivContainer.appendChild(iDivSubLabel);
		iCell.appendChild(iDivContainer);
		iRow.appendChild(iCell);
		return iRow;
	},	
// -------------------------------------------------------------------------------------------------------------------------------------------------------------
	setLayers : function(e){
		obj = nvxgWIF.getEventTarget(e);
		
		parentid = obj.value;
		level = Number(obj.getAttribute('level'));
		prefix = obj.getAttribute('prefix');
		const title = obj[obj.selectedIndex].title;
		if(level==0 && epIssueTypes.HasDesciptions){epIssueTypes.setIssueDesciption(prefix,parentid)};

		targ = document.getElementById(prefix + "IssueTypeContainer");
		
		switch(level){
			case 0:
				t = document.getElementById(prefix + "layer1");if(t!=undefined){targ.removeChild(t)}
				t = document.getElementById(prefix + "layer2");if(t!=undefined){targ.removeChild(t)}
				t = document.getElementById(prefix + "layer3");if(t!=undefined){targ.removeChild(t)}
				epIssueTypes.MimoSubSectionTitle[prefix]["issueType"] = title;
				delete epIssueTypes.MimoSubSectionTitle[prefix]["layer1"];
				delete epIssueTypes.MimoSubSectionTitle[prefix]["layer2"];
				delete epIssueTypes.MimoSubSectionTitle[prefix]["layer3"];
			  break;
			case 1:
				t = document.getElementById(prefix + "layer3");if(t!=undefined){targ.removeChild(t)};
				t = document.getElementById(prefix + "layer2");if(t!=undefined){targ.removeChild(t)};
				epIssueTypes.MimoSubSectionTitle[prefix]["layer1"] = title;
				delete epIssueTypes.MimoSubSectionTitle[prefix]["layer2"];
				delete epIssueTypes.MimoSubSectionTitle[prefix]["layer3"];
			  break;
			case 2:
				t = document.getElementById(prefix + "layer3");if(t!=undefined){targ.removeChild(t)}
				epIssueTypes.MimoSubSectionTitle[prefix]["layer2"] = title;
				delete epIssueTypes.MimoSubSectionTitle[prefix]["layer3"];
			  break;
			case 3:
				epIssueTypes.MimoSubSectionTitle[prefix]["layer3"] = title;
				break;
		}
		if(epIssueTypes.MIMOState == 1)
			epMIMO.SetSubSectionLabel(prefix);
			
		if(obj.value != 0){
			
			if(epIssueTypes.hasLayers(parentid,level)){
				iTable=epIssueTypes.createLayerSection(prefix,parentid,level+1);
				targ.appendChild(iTable);
				if(epIssueSelection.LayersRequired == "true"){
				 document.getElementById(prefix + "IssueTypeLayer" + (level+1) + "ID").selectedIndex = -1;
				};
				document.getElementById(prefix + "IssueTypeLayer" + (level+1) + "ID").addEventListener('change', function(e){
					nvxgCUSTOM.onissueSelect('Layer' + level, e.target.value);
				});

			}
			
		}
	},

// --------------------------------------------------------------------------------------------------------------------
	sortIssueTypes 	:	function(field, descending) {
		function sortStrings(a,b) { return a[field].toLowerCase().localeCompare(b[field].toLowerCase()); }
		function sortNumbers(a,b){ return a[field] - b[field]; }
		function sortBool(a,b) { return sortNumbers(b,a); }
		
		var sample = epIssueSelection.issues[0][field];
		switch((typeof sample).toLowerCase() ) {
			case 'string' : epIssueSelection.issues.sort(sortStrings); break;
			case 'number' : epIssueSelection.issues.sort(sortNumbers);  break;
			case 'boolean'	: epIssueSelection.issues.sort(sortBool);break;
			default	: alert('No Sort Preformed');
		}
		if (descending) Locations.reverse();
	},
	
// --------------------------------------------------------------------------------------------------------------------	
	checkCombo:function(xi,pi){

		xi = Number(xi);
		pi = Number(pi);
		invaild = "";
		for (var q=0; q < epIssueSelection.issues.length; q++){
			if(epIssueSelection.issues[q].parentid == xi && epIssueSelection.issues[q].id == pi){invaild="X"; break;}
		};
		if(""){
			window.location=epIssueSelection.introASP;
		}
		
		
		
		
	},
// --------------------------------------------------------------------------------------------------------------------
addIssue:function(){
if(epIssueTypes.AllowAddIssues){
	epIssueTypes.IssueDisplay = epIssueTypes.IssueDisplay + 1;
	switch(epIssueTypes.IssueDisplay){
		case 0:
			nvxgWIF.clearObjectChildNodes('PrimaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
			epIssueTypes.createIssueTypeObject('Primary',epIssueSelection.PackageID);
			document.getElementById("SecondaryIssueTypeContainer").style.display="none";
			document.getElementById("TertiaryIssueTypeContainer").style.display="none";
			document.getElementById("QuaternaryIssueTypeContainer").style.display="none";
			document.getElementById("QuinaryIssueTypeContainer").style.display="none";
			document.getElementById("PrimaryIssueTypeID").selectedIndex = -1;
			document.getElementById("PrimaryIssueTypeID").focus();
			epIssueTypes.IssueDisplay = 1;
		break;
		
		case 1:
			nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
			document.getElementById("SecondaryIssueTypeContainer").style.display="none";
			document.getElementById("TertiaryIssueTypeContainer").style.display="none";
			document.getElementById("QuaternaryIssueTypeContainer").style.display="none";
			document.getElementById("QuinaryIssueTypeContainer").style.display="none";
			document.getElementById("PrimaryIssueTypeID").focus();
		break;
		
		case 2:
			nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
			epIssueTypes.createIssueTypeObject('Secondary',epIssueSelection.PackageID);
			document.getElementById("SecondaryIssueTypeContainer").style.display="";
			document.getElementById("TertiaryIssueTypeContainer").style.display="none";
			document.getElementById("QuaternaryIssueTypeContainer").style.display="none";
			document.getElementById("QuinaryIssueTypeContainer").style.display="none";
			document.getElementById("SecondaryIssueTypeID").selectedIndex = -1;
			document.getElementById("SecondaryIssueTypeID").focus();
			document.getElementById("SecondaryClose").style.display="";
		break;
		
		case 3:
			nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
			epIssueTypes.createIssueTypeObject('Tertiary',epIssueSelection.PackageID);
			document.getElementById("TertiaryIssueTypeContainer").style.display="";
			document.getElementById("QuaternaryIssueTypeContainer").style.display="none";
			document.getElementById("QuinaryIssueTypeContainer").style.display="none";
			document.getElementById("TertiaryIssueTypeID").selectedIndex = -1;
			document.getElementById("TertiaryIssueTypeID").focus();
			document.getElementById("TertiaryClose").style.display="";
			document.getElementById("SecondaryClose").style.display="none";
		break;
		case 4:
			nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
			nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
			epIssueTypes.createIssueTypeObject('Quaternary',epIssueSelection.PackageID);
			document.getElementById("QuaternaryIssueTypeContainer").style.display="";
			document.getElementById("QuinaryIssueTypeContainer").style.display="none";
			document.getElementById("QuaternaryIssueTypeID").selectedIndex = -1;
			document.getElementById("QuaternaryIssueTypeID").focus();
			document.getElementById("QuaternaryClose").style.display="";
			document.getElementById("SecondaryClose").style.display="none";
			document.getElementById("TertiaryClose").style.display="none";
		break;
		case 5:
			nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
			epIssueTypes.createIssueTypeObject('Quinary',epIssueSelection.PackageID);
			document.getElementById("QuinaryIssueTypeContainer").style.display="";
			document.getElementById("QuinaryIssueTypeID").selectedIndex = -1;
			document.getElementById("QuinaryIssueTypeID").focus();
			document.getElementById("QuinaryClose").style.display="";
			document.getElementById("SecondaryClose").style.display="none";
			document.getElementById("TertiaryClose").style.display="none";
			document.getElementById("QuaternaryClose").style.display="none";
		break;
	};
	epIssueTypes.setAddIssueState();
};
},
// --------------------------------------------------------------------------------------------------------------------		
	resetIssue:function(){
		nvxgWIF.clearInputValue("PrimaryIssueTypeID");
		if(epIssueSelection.AnimateRadioButtons){
			for (var q=0; q < epIssueSelection.issues.length; q++){
				if(epIssueSelection.issues[q].itemtype=="issue" && epIssueSelection.issues[q].parentid==epIssueSelection.PackageID){
					eval("nvxgWIF.PrimaryIssueTypeID" + epIssueSelection.issues[q].id + "Animate.open(50)");			
					document.getElementById("PrimaryIssueTypeID" + epIssueSelection.issues[q].id).setAttribute("state","open");
				};
			};
		};
	},

// --------------------------------------------------------------------------------------------------------------------
	removeIssue:function(){
		if(epIssueTypes.AllowAddIssues){
			var prefix = { 1: "Primary", 2: "Secondary", 3: "Tertiary", 4: "Quaternary", 5: "Quinary"};
			if(epIssueSelection.DisplayRemovalAlert) {
				r = confirm(lc["$SYS_CLRCONTAINER"]);
				if (r) {
					if(epIssueTypes.MIMOState) {
						document.getElementById("MIMO" + prefix[epIssueTypes.IssueDisplay] + "Container").style.display = "none";
						document.getElementById("MIMO" + prefix[epIssueTypes.IssueDisplay] + "Container").getElementsByClassName("content")[0].innerHTML = "";
						epMIMO.issueDependencies[prefix[epIssueTypes.IssueDisplay]] = {};
						epIssueTypes.MimoSubSectionTitle[prefix[[epIssueTypes.IssueDisplay]]] = {};
					}
				}
				else return;
			}
			else {
				document.getElementById("MIMO" + prefix[epIssueTypes.IssueDisplay] + "Container").style.display = "none";
				document.getElementById("MIMO" + prefix[epIssueTypes.IssueDisplay] + "Container").getElementsByClassName("content")[0].innerHTML = "";
				epMIMO.issueDependencies[prefix[epIssueTypes.IssueDisplay]] = {};
				epIssueTypes.MimoSubSectionTitle[prefix[[epIssueTypes.IssueDisplay]]] = {};
			}
			
			epIssueTypes.IssueDisplay = epIssueTypes.IssueDisplay - 1;
			switch(epIssueTypes.IssueDisplay){
				case 0:
					nvxgWIF.clearObjectChildNodes('PrimaryIssueTypeContainer');
					nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');
					nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
					epIssueTypes.createIssueTypeObject('Primary',epIssueSelection.PackageID);
					document.getElementById("SecondaryIssueTypeContainer").style.display="none";
					document.getElementById("TertiaryIssueTypeContainer").style.display="none";
					document.getElementById("PrimaryIssueTypeID").selectedIndex = -1;
					document.getElementById("PrimaryIssueTypeID").focus();
					epIssueTypes.IssueDisplay = 1;
				break;
				
				case 1:
					nvxgWIF.clearObjectChildNodes('SecondaryIssueTypeContainer');
					nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
					document.getElementById("SecondaryIssueTypeContainer").style.display="none";
					document.getElementById("TertiaryIssueTypeContainer").style.display="none";
					document.getElementById("PrimaryIssueTypeID").focus();
				break;
				
				case 2:
					nvxgWIF.clearObjectChildNodes('TertiaryIssueTypeContainer');
					document.getElementById("SecondaryIssueTypeContainer").style.display="";
					document.getElementById("TertiaryIssueTypeContainer").style.display="none";
					document.getElementById("SecondaryIssueTypeID").focus();
					document.getElementById("SecondaryClose").style.display="";
				break;

				/*** MIMO Module *************************************************************/
				case 3:
					nvxgWIF.clearObjectChildNodes('QuaternaryIssueTypeContainer');
					document.getElementById("TertiaryIssueTypeContainer").style.display="";
					document.getElementById("QuaternaryIssueTypeContainer").style.display="none";
					document.getElementById("TertiaryIssueTypeID").focus();
					document.getElementById("SecondaryClose").style.display="none";
					document.getElementById("TertiaryClose").style.display="";
				break;

				case 4:
					nvxgWIF.clearObjectChildNodes('QuinaryIssueTypeContainer');
					document.getElementById("QuaternaryIssueTypeContainer").style.display="";
					document.getElementById("QuinaryIssueTypeContainer").style.display="none";
					document.getElementById("SecondaryIssueTypeID").focus();
					document.getElementById("SecondaryClose").style.display="none";
					document.getElementById("TertiaryClose").style.display="none";
					document.getElementById("QuaternaryClose").style.display="";
				break;
				/*********************************************************************************/
			};

			epIssueTypes.setAddIssueState();
		};
	},
// --------------------------------------------------------------------------------------------------------------------
setAddIssueState:function(){
if(epIssueTypes.AllowAddIssues){
	if(epIssueTypes.IssueDisplay==0){
		document.getElementById("AdditionalIssueEnabled").style.display="none";
		document.getElementById("AdditionalIssueDisabled").style.display="";
	}
	if(epIssueTypes.IssueDisplay==1){
		if(document.getElementById("PrimaryIssueTypeID").selectedIndex!=-1){
			document.getElementById("AdditionalIssueEnabled").style.display="";
			document.getElementById("AdditionalIssueDisabled").style.display="none";
		}else{
			document.getElementById("AdditionalIssueEnabled").style.display="none";
			document.getElementById("AdditionalIssueDisabled").style.display="";
		};
	};
	if(epIssueTypes.IssueDisplay==2){
		if(document.getElementById("SecondaryIssueTypeID").selectedIndex!=-1){
			document.getElementById("AdditionalIssueEnabled").style.display="";
			document.getElementById("AdditionalIssueDisabled").style.display="none";
		}else{
			document.getElementById("AdditionalIssueEnabled").style.display="none";
			document.getElementById("AdditionalIssueDisabled").style.display="";
		};
	};
	if(epIssueTypes.IssueDisplay==3){
		if(document.getElementById("TertiaryIssueTypeID").selectedIndex!=-1){
			if(epIssueTypes.IssueDisplayNumber!=5){
				document.getElementById("AdditionalIssueEnabled").style.display="none";
				document.getElementById("AdditionalIssueDisabled").style.display="";
			}
			else{
				document.getElementById("AdditionalIssueEnabled").style.display="";
				document.getElementById("AdditionalIssueDisabled").style.display="none";
			}
		}else{
			if(epIssueTypes.IssueDisplayNumber!=5){
				document.getElementById("AdditionalIssueEnabled").style.display="none";
				document.getElementById("AdditionalIssueDisabled").style.display="none";
			}
			else{
				document.getElementById("AdditionalIssueEnabled").style.display="none";
				document.getElementById("AdditionalIssueDisabled").style.display="";
			}
		};
	};
	if(epIssueTypes.IssueDisplay==4){
		if(document.getElementById("QuaternaryIssueTypeID").selectedIndex!=-1){
			document.getElementById("AdditionalIssueEnabled").style.display="";
			document.getElementById("AdditionalIssueDisabled").style.display="none";
		}else{
			document.getElementById("AdditionalIssueEnabled").style.display="none";
			document.getElementById("AdditionalIssueDisabled").style.display="";
		};
	};
	if(epIssueTypes.IssueDisplay==5){
		if(document.getElementById("QuinaryIssueTypeID").selectedIndex!=-1){
			document.getElementById("AdditionalIssueEnabled").style.display="none";
			document.getElementById("AdditionalIssueDisabled").style.display="";
		}else{
			document.getElementById("AdditionalIssueEnabled").style.display="none";
			document.getElementById("AdditionalIssueDisabled").style.display="none";
		};
	};
};
	
},
// --------------------------------------------------------------------------------------------------------------------
lfn:function(){}
}
