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


var	epMultiEdit = {
	Action:null,
	PreviewAction:null,							
	InsertAction:0,
	EditAction:1,	
	InputType:{"Text":"Text","Currency":"Currency","Select":"Select","TextArea":"TextArea","Date":"Date","Calendar":"Calendar","Time":"Time","Checkbox":"Checkbox","Radio":"Radio","Hidden":"Hidden","CheckBoxGroup":"CheckBoxGroup"},
	BottomSortValues:{"OTHER":"OTHER","NA":"NA","N/A":"N/A","UNKNOWN":"UNKNOWN","DO NOT WISH TO DISCLOSE":"DO NOT WISH TO DISCLOSE"},
	DefaultCurrency:["$","U.S. Dollars"],
	CalendarText:["Select Date from Calendar","Reset Date","Select 'Today'","Month","Day","Year","Hour","Minute","am/pm"],



// ****************************************************************************************************************
createUIDisplay:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	for (var q=0; q < ObjDef.inputfields.length; q++){
		ObjDef.inputfields[q].uidisplayorder = q;
		if(ObjDef.inputfields[q].coldisplayorder == undefined){ObjDef.inputfields[q].coldisplayorder = 999999;}
		
	}
	ObjDef.deletesortdatakey=ObjDef.sortdatakey;	
	if(ObjDef.typeofUI==undefined){ObjDef.typeofUI=0;}
	if(ObjDef.typeofUI==0){
		epMultiEdit.createListUIDisplay(ObjName);
	}else{
		epMultiEdit.createBlockUIDisplay(ObjName);
	}
},

// ****************************************************************************************************************
createBlockUIDisplay:function(ObjName){	

	var ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.allowcloning==undefined){ObjDef.allowcloning=false;}
	if(ObjDef.minimum==undefined){ObjDef.minimum=0;}	
	if(ObjDef.maximum==undefined){ObjDef.maximum=100;}	
	MultiEditContainer=document.getElementById(ObjName+"Container");
	OutputContainer = document.createElement("DIV");
	OutputContainer.id = ObjDef.objprefix + "OUTPUT";
	OutputContainer.style.display = "none";
	OutputContainer.style.backgroundColor = "#00CC00";
	SecIntructionsContainer = document.createElement("DIV");
	SecIntructionsContainer.id = ObjName + "List";
	SecIntructionsContainer.className = "wif100pContainer";
	Intructions = document.createElement("DIV");
	Intructions.className="wifInstructions";
	ReqFlag = document.createElement("DIV");
	ReqFlag.className = "wifRequiredFlag";
	ReqFlag.innerHTML=" ";
	ErrTxt = document.createElement("LABEL");
	ErrTxt.htmlFor = ObjName + "List";	
	ErrTxt.className = "defaultText";	
	ErrTxt.id = ObjName + "ListERRTXT";
	ErrTxt.name = ObjName + "List";
	ErrTxt.innerHTML=ObjDef.instructions;
	Intructions.appendChild(ReqFlag);
	Intructions.appendChild(ErrTxt);
	FormatStr = document.createElement("DIV");
	FormatStr.className = "wifFieldFormatDef";
	FormatStr.innerHTML=ObjDef.instructionsformatstr;
	SecIntructionsContainer.appendChild(Intructions);	
	SecIntructionsContainer.appendChild(FormatStr);		
	MultiEditContainer.appendChild(SecIntructionsContainer);		
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	MultiEditContainer.appendChild(BR);	
	
	ToggleAllContainer = document.createElement("DIV");	
	ToggleAllContainer.className = "MultiRecordCloneBlockToggleAllContainer";	
	ToggleAllContainer.id=(ObjName+"ToggleAllContainer");
	
	
	CollaspeAllContainer = document.createElement("DIV");	
	CollaspeAllContainer.className = "MultiRecordCloneBlockToggleCollaspeAll";
	CollaspeAllContainer.setAttribute("objname",ObjName);
	CollaspeAllContainer.setAttribute("display","CLOSED");	
	CollaspeAllContainer.onclick = epMultiEdit.toggleALLCloneBlock;
	CollaspeAllContainer.title=ObjDef.toolbarlabeltitle[6];
	CollaspeAllContainer.id=(ObjName+"CollaspeAllContainer");
	CollaspeAllContainer.style.display="none";	
	ToggleAllContainer.appendChild(CollaspeAllContainer);	
	
	ExpandAllContainer = document.createElement("DIV");	
	ExpandAllContainer.className = "MultiRecordCloneBlockToggleExpandAll";
	ExpandAllContainer.setAttribute("objname",ObjName);
	ExpandAllContainer.setAttribute("display","OPEN");	
	ExpandAllContainer.onclick = epMultiEdit.toggleALLCloneBlock;
	ExpandAllContainer.title=ObjDef.toolbarlabeltitle[7];
	ExpandAllContainer.id=(ObjName+"ExpandAllContainer");		
	ExpandAllContainer.style.display="none";		
	ToggleAllContainer.appendChild(ExpandAllContainer);	
	MultiEditContainer.appendChild(ToggleAllContainer);	
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	MultiEditContainer.appendChild(BR);	
	CloneBlockContainer = document.createElement("DIV");
	CloneBlockContainer.id= ObjName + "CloneBlockContainer";
	CloneBlockContainer.className = "MultiRecordCloneBlockContainer";
	var IsSingular = false;
	if(ObjDef.minimum==1 && ObjDef.maximum==1){IsSingular=true;}		
	if(IsSingular){CloneBlockContainer.style.border="0px";}
	MultiEditContainer.appendChild(CloneBlockContainer);		
	if(ObjDef.minimum>0){for (c=0;c<ObjDef.minimum;c++) {epMultiEdit.createCloneBlock(ObjName);}}
	CloneBlockToolBarContainer = document.createElement("DIV");			
	CloneBlockToolBarContainer.className ="subLevelNavBar";
	CloneBlockToolBarContainer.style.cssText = "padding-top:10px !important;padding-right:10px !important";	
	CloneBlockToolItemAncorh = document.createElement("A");				
	CloneBlockToolItemAncorh.setAttribute("href","javascript:epMultiEdit.createCloneBlock('"+ ObjName +"')");		
	CloneBlockToolItemAncorh.innerHTML = ObjDef.toolbarlabel[0];
	CloneBlockToolItemAncorh.title = ObjDef.toolbarlabeltitle[0];	
	CloneBlockToolBarContainer.appendChild(CloneBlockToolItemAncorh);
	MultiEditContainer.appendChild(CloneBlockToolBarContainer);
	if(IsSingular){CloneBlockToolBarContainer.style.display="none";}
},
// ****************************************************************************************************************
createCloneBlock:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	var IsSingular = false;
	if(ObjDef.minimum==1 && ObjDef.maximum==1){IsSingular=true;}		
	if(ObjDef.objcount>=ObjDef.maximum){
		msg = "The maximum number("+ ObjDef.maximum +") of '" + ObjDef.recordtitle + "s' has already been reached for this section.";	
		alert(msg);
		return;		
	}else{
	

		CloneBlockContainer = document.getElementById(ObjName + "CloneBlockContainer");
		CloneBlock = document.createElement("DIV");
		CloneBlock.className = "MultiRecordCloneBlock";
		CloneBlock.setAttribute("cloneblockcount",0);

		CloneBlockHeader = document.createElement("DIV");
		CloneBlockHeader.className = "MultiRecordCloneBlockHeader";
		CloneBlockHeader.setAttribute("oncontextmenu","return false");	
		CloneBlockHeader.setAttribute("unselectable","on");		

		CloneBlockToggle = document.createElement("DIV");
		CloneBlockToggle.setAttribute("objname",ObjName);
		CloneBlockToggle.setAttribute("display","OPEN");
		CloneBlockToggle.onclick=epMultiEdit.toggleCloneBlock;	
		CloneBlockToggle.className="MultiRecordCloneBlockToggleCollaspe";
		CloneBlockToggle.title=ObjDef.toolbarlabeltitle[4];
		CloneBlockHeader.appendChild(CloneBlockToggle);	
	
	
		CloneBlockHeaderClose = document.createElement("DIV");
		CloneBlockHeaderClose.className="MultiRecordCloneBlockHeaderClose";
		CloneBlockHeaderClose.title=ObjDef.toolbarlabeltitle[2];
		CloneBlockHeaderClose.setAttribute("objname",ObjName);
		CloneBlockHeaderClose.onclick=epMultiEdit.deleteCloneBlock;
		CloneBlockHeader.appendChild(CloneBlockHeaderClose);
		if(ObjDef.allowcloning){
			CloneBlockHeaderClone = document.createElement("DIV");
			CloneBlockHeaderClone.setAttribute("objname",ObjName);
			CloneBlockHeaderClone.onmouseover=epMultiEdit.CloneOver;
			CloneBlockHeaderClone.onmouseout=epMultiEdit.CloneOut;	
			CloneBlockHeaderClone.onclick=epMultiEdit.CloneBlock;	
			CloneBlockHeaderClone.className="MultiRecordCloneBlockHeaderClone";
			CloneBlockHeaderClone.title=ObjDef.toolbarlabeltitle[3];
			CloneBlockHeader.appendChild(CloneBlockHeaderClone);	
		}
		CloneBlockHeaderCounter = document.createElement("DIV");
		CloneBlockHeaderCounter.className="MultiRecordCloneBlockHeaderCounter";
		TextNode = document.createTextNode(" ");
		CloneBlockHeaderCounter.appendChild(TextNode);	
		CloneBlockHeader.appendChild(CloneBlockHeaderCounter);	
		CloneBlockHeaderCounter.setAttribute("oncontextmenu","return false");	
		CloneBlockHeaderCounter.setAttribute("unselectable","on");		
		CloneBlockHeaderLabel = document.createElement("DIV");
		CloneBlockHeaderLabel.className="MultiRecordCloneBlockHeaderLabel";
		CloneBlockHeaderLabel.setAttribute("oncontextmenu","return false");	
		CloneBlockHeaderLabel.setAttribute("unselectable","on");		
		TextNode = document.createTextNode("");
		CloneBlockHeaderLabel.appendChild(TextNode);
		CloneBlockHeaderLabel.innerHTML = "<em style='color:#eee'>" + lc.$SYS_UNDEFINED + "&nbsp;" + ObjDef.recordtitle+ "</em>";
		CloneBlockHeader.appendChild(CloneBlockHeaderLabel);	
		CloneBlock.appendChild(CloneBlockHeader);
		EditPanel = epMultiEdit.createEditPanelInputControls(ObjName);
		CloneBlock.appendChild(EditPanel);				
		DIV = document.createElement("DIV");	
		DIV.className ="wifClearFloat";
		CloneBlock.appendChild(DIV);					
		CloneBlockContainer.appendChild(CloneBlock);	
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if(ObjDef.inputfields[q].src!=undefined && ObjDef.inputfields[q].src.length!=0){
				w =ObjDef.inputfields[q].src;
				if(w[0].onchange!=undefined){
					for (var j=0; j < w[0].onchange.length; j++){
						// SetRequired
						if(w[0].onchange[j].required!=undefined){
							for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[0].onchange[j].objid){break;}}
							try{
		
								requiredflag=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"InputRequired");
								requiredflag.innerHTML = " ";	
								ObjDef.inputfields[gt].required = false;								
								elm=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"Input");								
								elm.setAttribute("cloneRequired",ObjDef.inputfields[gt].required);
							 }catch(err){}	
						}
						// SetDisplay
						if(w[0].onchange[j].display!=undefined){
							for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[0].onchange[j].objid){break;}}
							iContainer=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"InputContainer");
							iContainer.style.display="none";	
						}
					}
				}
			}
		}					
		nvxgWIF.intTimeObjs(null,CloneBlock);		
		nvxgWIF.setRadioButtonEvents(CloneBlock);
		nvxgWIF.setTextBoxes(CloneBlock);
		nvxgWIF.setTextArea(CloneBlock);
		nvxgWIF.setCheckBoxListEvents(CloneBlock);
		nvxgWIF.setSelectList(CloneBlock);	
		epMultiEdit.setCloneBlockCounter(ObjName);
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type !="Hidden"){break;}
		}
		elms=CloneBlock.getElementsByTagName('*');
		for (f=0;f<elms.length;f++) {
			if(elms[f].id!=undefined){
				if(elms[f].id==ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input"){break;}
			}
		}
		nvxgWIF.initPopUps(CloneBlock);		
		if(IsSingular){
			CloneBlockHeader.style.display="none";
			CloneBlock.style.border="0px";
			
		}
	}
},
// ****************************************************************************************************************
setCloneBlockCounter:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	CloneBlockContainer = document.getElementById(ObjName + "CloneBlockContainer");
	CloneBlocks = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlock',CloneBlockContainer );
	for (c=0;c<CloneBlocks.length;c++){
		CloneBlocks[c].setAttribute("cloneblockcount",c+1);
		CloneBlockHeaderCounter = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlockHeaderCounter',CloneBlocks[c] );
		CloneBlockHeaderCounter[0].innerHTML = c+1 +".";
	}	
	if(CloneBlocks.length >1){
		document.getElementById(ObjName + "ExpandAllContainer").style.display="";
		document.getElementById(ObjName + "CollaspeAllContainer").style.display="";		
	}else{
		document.getElementById(ObjName + "ExpandAllContainer").style.display="none";
		document.getElementById(ObjName + "CollaspeAllContainer").style.display="none";		
	}
	

	ObjDef.objcount = CloneBlocks.length;
	TabItemCounter = document.getElementById(ObjName + "ItemTabCounter");
	if(TabItemCounter != undefined){
		TabItemCounter.innerHTML = ObjDef.objcount;
		if(ObjDef.objcount > 0){
			TabItemCounter.style.display = "";
		}else{
			TabItemCounter.style.display = "none";			
		}
	}	
},
// ****************************************************************************************************************
deleteCloneBlock:function(e){
	var obj = epMultiEdit.getEventTarget(e);
	ObjName = obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];	
	CloneBlockContainer = document.getElementById(ObjName + "CloneBlockContainer");
	if((ObjDef.objcount-1)<ObjDef.minimum){
		alert(lc["$SYS_MEO.WARN.DELETE.NO"]);
		return;
	}else{
		j = confirm(lc["$SYS_MEO.WARN.DELETE"]);
		if(j){
			CloneBlockContainer = document.getElementById(ObjName + "CloneBlockContainer");	
			while(obj.className != 'MultiRecordCloneBlock'){obj = obj.parentNode;}
			CloneBlockContainer.removeChild(obj);
			epMultiEdit.setCloneBlockCounter(ObjName);
		}else{
		if(ObjDef.allowimport==true && ObjDef.objcount < ObjDef.maximum && ObjDef.minimum > 0){				
		
		}else{
			return;
		}
		}
	}
},

// ****************************************************************************************************************
toggleALLCloneBlock:function(e){
	var obj = epMultiEdit.getEventTarget(e);
	display=obj.getAttribute("display");
	ObjName = obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];
	CloneBlockContainer = document.getElementById(ObjName + "CloneBlockContainer");
	CloneBlocks = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlock',CloneBlockContainer );
		for (c=0;c<CloneBlocks.length;c++){
			CloneBlockContainer=CloneBlocks[c];
			
			tog = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlockToggleCollaspe',CloneBlocks[c] );
			if(tog.length==0){
				tog = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlockToggleExpand',CloneBlocks[c] );				
			}
			CloneBlock=epMultiEdit.getElementByIdInObjContainer(CloneBlocks[c],ObjDef.objprefix + "EditPanel");
			if(display=="OPEN"){
				CloneBlock.style.display="";
				tog[0].className="MultiRecordCloneBlockToggleCollaspe";	
				tog[0].setAttribute("display","OPEN");							
			}else{
				CloneBlock.style.display="none";
				tog[0].className="MultiRecordCloneBlockToggleExpand";					
				tog[0].setAttribute("display","CLOSED");							
			}
		}
	},
// ****************************************************************************************************************
toggleCloneBlock:function(e){
	var obj = epMultiEdit.getEventTarget(e);
	display=obj.getAttribute("display");
	ObjName = obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];
	CloneBlockContainer=obj;
	while(CloneBlockContainer.className != 'MultiRecordCloneBlock'){CloneBlockContainer = CloneBlockContainer.parentNode;}
	CloneBlock=epMultiEdit.getElementByIdInObjContainer(CloneBlockContainer,ObjDef.objprefix + "EditPanel");
	if(display=="OPEN"){
		CloneBlock.style.display = "none";
		obj.setAttribute("display","CLOSED");
		obj.className ="MultiRecordCloneBlockToggleExpand";
		obj.title=ObjDef.toolbarlabeltitle[5];
	}else{
		CloneBlock.style.display = "";	
		obj.setAttribute("display","OPEN");			
		obj.className ="MultiRecordCloneBlockToggleCollaspe";
		obj.title=ObjDef.toolbarlabeltitle[4];
	}
},

// ****************************************************************************************************************
createListUIDisplay:function(ObjName){	
	var ObjDef=nvxgObjectDef[ObjName];
	MultiEditContainer=document.getElementById(ObjName+"Container");
	for (var q=0; q < ObjDef.inputfields.length; q++){
		ObjDef.inputfields[q].uidisplayorder = q;
		if(ObjDef.inputfields[q].coldisplayorder == undefined){ObjDef.inputfields[q].coldisplayorder = 999999;}
	}
	if(ObjDef.allowcloning==undefined){ObjDef.allowcloning=false;}
	if(ObjDef.allowimport==undefined){ObjDef.allowimport=false;}	
	
// -------------------------------------------------------------------------------------------------	
// Intructions	
	OutputContainer = document.createElement("DIV");
	OutputContainer.id = ObjDef.objprefix + "OUTPUT";
	OutputContainer.style.display = "none";
	OutputContainer.style.backgroundColor = "#00CC00";
	SecIntructionsContainer = document.createElement("DIV");
	SecIntructionsContainer.id = ObjName + "List";
	SecIntructionsContainer.className = "wif100pContainer";
	Intructions = document.createElement("DIV");
	Intructions.className="wifInstructions";
	ReqFlag = document.createElement("DIV");
	ReqFlag.className = "wifRequiredFlag";
	ReqFlag.innerHTML="♦";
	ErrTxt = document.createElement("LABEL");
	ErrTxt.id = ObjName + "ListERRTXT";
	ErrTxt.htmlFor = ObjName + "List";	
	ErrTxt.className = "defaultText";
	ErrTxt.name = ObjName + "List";
	ErrTxt.innerHTML=ObjDef.instructions;
	Intructions.appendChild(ReqFlag);
	Intructions.appendChild(ErrTxt);
	FormatStr = document.createElement("DIV");
	FormatStr.className = "wifFieldFormatDef";
	FormatStr.innerHTML=ObjDef.instructionsformatstr;
	FormatStr.style.cssText="margin-left:10px; margin-top:2px;width:379px; float:left; overflow:hidden";
	Intructions.appendChild(FormatStr);	
	ObjDef.ToggleTableViewState = false;
	ToggleView = document.createElement("DIV");
	ToggleView.className = "CollapsibleToolOpen";
	ToggleView.id = ObjName + "ToggleView";			
	ToggleView.setAttribute("ObjName",ObjName);
	ToggleView.title = lc["$SYS_MEO.TOGGLEVIEW"];
	ToggleView.style.display="none";
	ToggleView.onclick=epMultiEdit.ToggleTableView;		
	Intructions.appendChild(ToggleView);		
	SecIntructionsContainer.appendChild(Intructions);
	MultiEditContainer.appendChild(SecIntructionsContainer);	
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	MultiEditContainer.appendChild(BR);	
// -------------------------------------------------------------------------------------------------	
// RecordTable	
	RecordTableContainer = document.createElement("DIV");	
	RecordTableContainer.id=ObjName + "MultiRecordEditorContainer";
	RecordTableContainer.className = "MultiRecordEditorContainer";
	RecordTable = document.createElement("TABLE");	
//	RecordTable.className = "MultiRecordEditorTable";
	RecordTable.className = "wifRecordTable";	
	RecordTable.style.width="543px";
	RecordTable.setAttribute("border",0);
	RecordTable.setAttribute("cellPadding",0);
	RecordTable.setAttribute("cellSpacing",0);
	RecordTable.setAttribute("ObjName",ObjName);	
	RecordTableHeader = document.createElement("THEAD");	
	
	RecordTableHeader.id = ObjDef.objprefix + "UIListTHead";
	RecordTableHeader.setAttribute("oncontextmenu","return false");	
	RecordTableHeader.setAttribute("unselectable","on");
	RecordTableHeader.setAttribute("objname",ObjName);
	RecordTableHeaderRow = epMultiEdit.createUIDisplayHeaderRow(ObjName);		
	RecordTableHeader.appendChild(RecordTableHeaderRow);
	RecordTable.appendChild(RecordTableHeader);
	RecordTableBody = document.createElement("TBODY");	
	RecordTableBody.id = ObjDef.objprefix + "UIListTBody";
	RecordTableBody.setAttribute("oncontextmenu","return false");	
	RecordTableBody.setAttribute("unselectable","on");		
	RecordTable.appendChild(RecordTableBody);	
	RecordTableContainer.appendChild(RecordTable);
	MultiEditContainer.appendChild(RecordTableContainer);		
	if(ObjDef.countstr !=undefined){
		CounterBox = document.createElement("DIV");
		CounterBox.className = "wifFieldFormatDef";
		CounterBox.id = ObjName + "ListCounter";	
		content=ObjDef.countstr;
		content=content.replace('%MAXIUM%', ObjDef.maximum);				
		content=content.replace('%COUNT%', ObjDef.objdata.length);						
		CounterBox.innerHTML=content;
		CounterBox.style.cssText="margin-left:20px; margin-top:-12px; margin-bottom:8px; width:180px;float:left;text-align:left;";
		MultiEditContainer.appendChild(CounterBox);		
	}

		CounterBox = document.createElement("DIV");
		CounterBox.className = "wifFieldFormatDef";
		CounterBox.id = ObjName + "ScrollMsgCounter";	
		CounterBox.innerHTML=lc["$SYS_MEO.SCROLLDWN"];
		CounterBox.style.cssText="margin-right:20px; margin-top:-12px; margin-bottom:8px; width:180px;float:right;text-align:right;";
		CounterBox.style.display="none";
		MultiEditContainer.appendChild(CounterBox);		


	
					
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	MultiEditContainer.appendChild(BR);	

	
	
// -------------------------------------------------------------------------------------------------	
//Tool Bar		
	RecordToolBarContainer = document.createElement("DIV");			
	RecordToolBarContainer.id = ObjName + "RecordToolBar";				
	RecordToolBarContainer.className ="subLevelNavBar";
	RecordToolBarContainer.style.cssText="padding-right:18px; padding-bottom:16px important;";		
	
// -------------------------------------------------------------------------------------------------
//import	
	if(ObjDef.allowimport==true){	
		try{
		 	Iscodeloaded = epMultiEditImport.importcolcount;
			ObjDef.AllowImport = Number(ObjDef.maximum) - Number(ObjDef.objcount);
			RecordToolItemAncorh = document.createElement("A");				
			RecordToolItemAncorh.id = ObjDef.objprefix + "ImportEnabled";					
			RecordToolItemAncorh.id = ObjDef.objprefix + "CloneEnabledButton";		
			RecordToolItemAncorh.setAttribute("href","javascript:epMultiEditImport.importData('"+ ObjName +"')");		
			RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[7];
			RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
			RecordToolItemAncorh.title = ObjDef.toolbarlabeltitle[8];	
			RecordToolItemAncorh.style.display="none";		
			RecordToolItemAncorhDis = document.createElement("A");				
			RecordToolItemAncorhDis.id = ObjDef.objprefix + "ImportDisabled";		
			RecordToolItemAncorhDis.innerHTML = ObjDef.toolbarlabel[7];
			RecordToolItemAncorhDis.title = ObjDef.toolbarlabeltitle[8];	
			RecordToolItemAncorhDis.style.display="none";		
			RecordToolBarContainer.appendChild(RecordToolItemAncorh);
			RecordToolBarContainer.appendChild(RecordToolItemAncorhDis);
		 }catch(err){
			alert("This MultiEditObject [" + ObjName + "] has been configured for Import, but the \"epMultiEditImport.js\" module has not been attached to this form.");			
			ObjDef.allowimport = false;
		}
	}
//RecordToolBar.style.width="auto";
//RecordToolBar.style.backgroundColor="#C0C";
// -------------------------------------------------------------------------------------------------
//Delete
//  Enabled		
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "DeleteEnabled";
	RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.deleteParticipantData('"+ ObjName +"')");		
	RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
	RecordToolItemAncorh.setAttribute("warning","true");								
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[2];
	RecordToolBarContainer.appendChild(RecordToolItemAncorh);	
//  Disabled
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "DeleteDisabled";
	RecordToolItemAncorh.setAttribute("href","javascript:void(0)");	
	RecordToolItemAncorh.setAttribute("disabled","disabled");		
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[2];
	RecordToolBarContainer.appendChild(RecordToolItemAncorh);	
// -------------------------------------------------------------------------------------------------
//Edit
//  Enabled		
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "EditEnabled";	
	RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.editParticipantData('"+ ObjName +"')");	
	RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[1];
	RecordToolBarContainer.appendChild(RecordToolItemAncorh);		
//  Disabled
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "EditDisabled";
	RecordToolItemAncorh.setAttribute("href","javascript:void(0)");		
	RecordToolItemAncorh.setAttribute("disabled","disabled");			
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[1];
	RecordToolBarContainer.appendChild(RecordToolItemAncorh);	
// -------------------------------------------------------------------------------------------------
//New	
//  Enabled		
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "AddEnabled";	
	RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.addParticipant('"+ ObjName +"')");	
	RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[0];
	RecordToolBarContainer.appendChild(RecordToolItemAncorh);		
//  Disabled
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "AddDisabled";
	RecordToolItemAncorh.setAttribute("href","javascript:void(0)");		
	RecordToolItemAncorh.setAttribute("disabled","disabled");			
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[0];
	RecordToolBarContainer.appendChild(RecordToolItemAncorh);	

// -------------------------------------------------------------------------------------------------
//Clone	
	if(ObjDef.allowcloning==true){	
	//  Enabled		
		RecordToolItemAncorh = document.createElement("A");				
		RecordToolItemAncorh.id = ObjDef.objprefix + "CloneEnabled";	
		RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.cloneParticipantData('"+ ObjName +"')");	
		RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[6];
		RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
		RecordToolBarContainer.appendChild(RecordToolItemAncorh);		
		RecordToolItemAncorh.onmouseover = epMultiEdit.CloneOver;
		RecordToolItemAncorh.onmouseout = epMultiEdit.CloneOut;			
	//  Disabled
		RecordToolItemAncorh = document.createElement("A");				
		RecordToolItemAncorh.id = ObjDef.objprefix + "CloneDisabled";
		RecordToolItemAncorh.setAttribute("href","javascript:void(0)");		
		RecordToolItemAncorh.setAttribute("disabled","disabled");			
		RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[6];
		RecordToolBarContainer.appendChild(RecordToolItemAncorh);	
		RecordToolItemAncorh.style.display = "none";		
	}
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	RecordToolBarContainer.appendChild(BR);	
	BR = document.createElement("BR");	
	RecordToolBarContainer.appendChild(BR);		
	MultiEditContainer.appendChild(RecordToolBarContainer);		
	
// -------------------------------------------------------------------------------------------------
// Preview Panel	
	MultiRecordEditorPanelContainer = document.createElement("DIV");				
	MultiRecordEditorPanelContainer.className = "MultiRecordEditorPanelContainer";
	DisplayPreview = document.createElement("SPAN");				
	DisplayPreview.id=	ObjDef.objprefix + "UIIndexDisplayPreview";
	MultiRecordEditorPanelContainer.appendChild(DisplayPreview);
	PreviewPanel = document.createElement("DIV");	
	PreviewPanel.className = "MultiRecordEditorDisplayPanel";
	PreviewPanel.id=ObjDef.objprefix + "PreviewPanel";
	epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'uidisplayorder', false);				
	for (var q=0; q < ObjDef.inputfields.length; q++){
		HTMLType = ObjDef.inputfields[q].type;		
		switch (HTMLType){
			case "BR":
				elm = document.createElement("BR");				
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "PreviewContainer";				
				elm.className ="wifClearFloat";
			break;
			case "H4":
				elm = document.createElement("H4");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "PreviewContainer";			
				elm.innerHTML =ObjDef.inputfields[q].label;
				if(ObjDef.inputfields[q].csstext != undefined){
					elm.style.cssText = ObjDef.inputfields[q].csstext;
				}
			break;
			case "Msg":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "PreviewContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer";							
				elm.innerHTML =ObjDef.inputfields[q].label;
				if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,elm,q);}				
			break;			
			case "Hidden":
				elm = document.createElement("SPAN");							
				elm.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Preview";
				elm.style.display="none";
			break;
			default:
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "PreviewContainer";
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					elm.className = "wif"+ ObjDef.inputfields[q].size[0] +"pContainer";
				}else{
					elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer";
				}
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext;}
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				reqc.innerHTML = " ";
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "PreviewERRTXT";
				errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Preview";	
				errtxt.className = "defaultText";			
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[1]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				if(labelstr!=""){elm.appendChild(instrc);}
				datacon=document.createElement("DIV");
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					datacon.className = "MultiRecord_"+ ObjDef.inputfields[q].size[0] +"pPreviewContainer";
				}else{
					datacon.className = "MultiRecord_"+ ObjDef.inputfields[q].size +"pPreviewContainer";					
				}
				datainputcon=document.createElement("DIV");
				datainputcon.className = "MultiRecordEditorPreviewLabel";
				datainputcon.setAttribute("objname",ObjName);
				datainputcon.setAttribute("editfldid",ObjDef.inputfields[q].id);
				datainputcon.title=lc.$SYS_INLINEEDIT,				
				datainputcon.ondblclick=epMultiEdit.editParticipantDataInline;
				
				datainputcon.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Preview";
				datainputcon.innerHTML ="*";
				if(ObjDef.inputfields[q].type=="Select" && ObjDef.inputfields[q].displayas=="InlineRadio"){
					datacon.className = "MultiRecord_"+ ObjDef.inputfields[q].size[1] +"pPreviewContainer";
					datacon.style.cssFloat="Right";
					datacon.style.marginTop="-18px";
				}			
				if(HTMLType=="TextArea"){
					datacon.style.cssText="white-space:normal !important; height:auto !important";
					datainputcon.style.cssText="white-space:normal !important; height:auto !important";
				}
				datacon.appendChild(datainputcon);		
				elm.appendChild(datacon);		
		}
		PreviewPanel.appendChild(elm);
	}
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	PreviewPanel.appendChild(BR);
	MultiRecordEditorPanelContainer.appendChild(PreviewPanel);	
// -------------------------------------------------------------------------------------------------	
	EditPanel = epMultiEdit.createEditPanelInputControls(ObjName);
	MultiRecordEditorPanelContainer.appendChild(EditPanel);	
	MultiEditContainer.appendChild(MultiRecordEditorPanelContainer);
	BR = document.createElement("BR");
	BR.className="wifClearFloat";
	MultiEditContainer.appendChild(BR);	
// -------------------------------------------------------------------------------------------------	
//Tool Bar		
	EditToolBarContainer = document.createElement("DIV");			
	EditToolBarContainer.id = ObjName + "EditToolBar";				
	EditToolBarContainer.className ="subLevelNavBar";
	EditToolBarContainer.style.cssText="padding-right:18px; padding-bottom:16px important;";		
// -------------------------------------------------------------------------------------------------		
//Cancel
//  Enabled		
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "CancelEnabled";	
	RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.cancelButton('"+ ObjName +"')");	
	RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
	RecordToolItemAncorh.setAttribute("warning","true");								
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[5];
	EditToolBarContainer.appendChild(RecordToolItemAncorh);		
//  Disabled
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "CancelDisabled";
	RecordToolItemAncorh.setAttribute("href","javascript:void(0)");		
	RecordToolItemAncorh.setAttribute("disabled","disabled");			
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[5];
	EditToolBarContainer.appendChild(RecordToolItemAncorh);	

// -------------------------------------------------------------------------------------------------		
//Update
//  Enabled		
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "UpdateEnabled";	
	RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.updateParticipant('"+ ObjName +"')");	
	RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[4];
	EditToolBarContainer.appendChild(RecordToolItemAncorh);		
//  Disabled
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "UpdateDisabled";
	RecordToolItemAncorh.setAttribute("href","javascript:void(0)");		
	RecordToolItemAncorh.setAttribute("disabled","disabled");			
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[4];
	EditToolBarContainer.appendChild(RecordToolItemAncorh);	
// -------------------------------------------------------------------------------------------------	
//Insert
//  Enabled		
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "InsertEnabled";	
	RecordToolItemAncorh.setAttribute("href","javascript:epMultiEdit.insertNewParticipant('"+ ObjName +"')");	
	RecordToolItemAncorh.setAttribute("ObjName",ObjName);							
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[3];
	EditToolBarContainer.appendChild(RecordToolItemAncorh);		
//  Disabled
	RecordToolItemAncorh = document.createElement("A");				
	RecordToolItemAncorh.id = ObjDef.objprefix + "InsertDisabled";
	RecordToolItemAncorh.setAttribute("href","javascript:void(0)");		
	RecordToolItemAncorh.setAttribute("disabled","disabled");			
	RecordToolItemAncorh.innerHTML = ObjDef.toolbarlabel[3];
	EditToolBarContainer.appendChild(RecordToolItemAncorh);	

	MultiEditContainer.appendChild(EditToolBarContainer);		
// -------------------------------------------------------------------------------------------------	
//Init  Form Data
	nvxgWIF.initPopUps(MultiEditContainer);		
	epMultiEdit.clearParticipantInputFields(ObjName);
	
	if(ObjDef.allowimport==true){				
		epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,true);		
		document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';	
		document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';	
		ObjDef.action =0;					
	}else{
		epMultiEdit.setToolBar(ObjName,false,false,false,true,false,false,false,false);				
		epMultiEdit.setPanelDisplay(ObjName,ObjDef.displayinput);									
		ObjDef.action =1;			
	}
	epMultiEdit.clearUIList(ObjName);		
	epMultiEdit.sortDataObj(ObjName);		
	ObjDef.selecteddataobjindex = null;	
	ObjDef.objcount = 0;
	ObjDef.currentkey = 100;
	ObjDef.updatekey = null;

},

// ****************************************************************************************************************
createEditPanelInputControls:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'uidisplayorder', false);	
//Edit Panel
	EditPanel = document.createElement("DIV");							
	EditPanel.className = "MultiRecordEditorDisplayPanel";
	EditPanel.id=ObjDef.objprefix + "EditPanel";
	EditPanelDisplay = document.createElement("SPAN");							
	EditPanelDisplay.style.display="none";
	EditPanelDisplay.id=ObjDef.objprefix + "UIIndexDisplayInput";
	EditPanel.appendChild(EditPanelDisplay);	
	for (var q=0; q < ObjDef.inputfields.length; q++){
		HTMLType = ObjDef.inputfields[q].type;		
		
		switch (HTMLType){
			case "BR":
				elm = document.createElement("BR");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";											
				elm.className ="wifClearFloat";
			break;
	
			case "H4":
				elm = document.createElement("H4");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";											
				elm.innerHTML =ObjDef.inputfields[q].label;
				if(ObjDef.inputfields[q].csstext != undefined){
					elm.style.cssText = ObjDef.inputfields[q].csstext;
				};
			break;
			case "Msg":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"							
				elm.innerHTML =ObjDef.inputfields[q].label;
				if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,elm,q)};
			break;			
			case "Hidden":
				elm = document.createElement("INPUT");							
				elm.type ="Hidden";
				elm.value= ObjDef.inputfields[q].defaultval;
				elm.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				elm.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				elm.style.display="none";
			break;
			case "Select":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				if(ObjDef.inputfields[q].displayas=="undefined" || ObjDef.inputfields[q].displayas==undefined){ObjDef.inputfields[q].displayas="Select"};
				if(ObjDef.inputfields[q].defaultval=="undefined" || ObjDef.inputfields[q].defaultval==undefined){ObjDef.inputfields[q].defaultval=-1};
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					elm.className = "wif"+ ObjDef.inputfields[q].size[0] +"pContainer";
				}else{
					elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer";
				};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";				
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				//alert(ObjDef.inputfields[q].displayas);
				if(ObjDef.typeofUI==0 && ObjDef.inputfields[q].displayas=="Select"){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
				errtxt.className = "defaultText";
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					inputContainer.className = "wif"+ ObjDef.inputfields[q].size[1] +"pInputContainer";

				}else{;			
					inputContainer.className = "wif"+ ObjDef.inputfields[q].size +"pInputContainer";			
				};
				inputControl=document.createElement("SELECT");
				inputControl.setAttribute("inputfieldid",ObjDef.inputfields[q].id);
				if(ObjDef.inputfields[q].title!=undefined){titlestr=ObjDef.inputfields[q].title}else{titlestr=labelstr};
				//inputControl.title=nvxgWIF.removeHTMLTags(titlestr);;
				inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				inputControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";




				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					inputControl.className="wif"+ ObjDef.inputfields[q].size[1] +"p" + ObjDef.inputfields[q].type;		
										
				}else{
					inputControl.className="wif"+ ObjDef.inputfields[q].size +"p" + ObjDef.inputfields[q].type;	
				};
				
				inputControl.setAttribute("required",req);
				inputControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);				
				inputControl.setAttribute("ObjName",ObjName);
				if(ObjDef.inputfields[q].blocklabel!=undefined){
					inputControl.setAttribute("setBlockLabel","true");
				};
				hasOnchangeEvent = false;
				w =ObjDef.inputfields[q].src;
				for (var f=0; f < w.length; f++){

//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
if(ObjDef.inputfields[q].displayas=="VertRadio" || ObjDef.inputfields[q].displayas=="HorzRadio" || ObjDef.inputfields[q].displayas=="InlineRadio"){
					var randomnumber=Math.floor(Math.random()*1001);				
					var newRadioLabel = document.createElement('label');	
					newRadioLabel.className = "wifInputRadioLabel";
					newRadioLabel.style.lineHeight="20px";
					if(w[f].title==undefined){newRadioLabel.setAttribute('title',w[f].label)}else{newRadioLabel.setAttribute('title',w[f].title)};		
					var textRadio = w[f].label;
					var newRadio = document.createElement('input');
					newRadio.onclick = epMultiEdit.mirrorSelectionOption;
					newRadio.className = "DispalyAsRadio";
					newRadio.setAttribute('type','radio');
					newRadio.setAttribute('ObjName',ObjName);					
					newRadio.style.marginRight="3px";
					newRadio.style.cssFloat = "left";
					if(ObjDef.typeofUI==1){
						//alert(ObjDef.objcount);
						newRadio.setAttribute('name',ObjDef.objprefix + ObjDef.typeofoutput + "NOTMAPPED_" + ObjDef.inputfields[q].id + "InputRadio" + ObjDef.objcount);
						newRadio.setAttribute('id',ObjDef.objprefix + ObjDef.typeofoutput + "NOTMAPPED_" + ObjDef.inputfields[q].id + "InputRadio"  + ObjDef.objcount + "_"+ f);
					 }else{
						newRadio.setAttribute('name',ObjDef.objprefix + ObjDef.typeofoutput + "NOTMAPPED_" + ObjDef.inputfields[q].id + "InputRadio");
						newRadio.setAttribute('id',ObjDef.objprefix + ObjDef.typeofoutput + "NOTMAPPED_" + ObjDef.inputfields[q].id + "InputRadio" + f);
					}
					newRadio.setAttribute('inputtarget',inputControl.id);											
					newRadioLabel.appendChild(newRadio);			
					var txtcon = document.createElement('span');
					txtcon.style.cssFloat = "left";
					txtcon.style.lineHeight="20px";
					txtcon.style.paddingRight="8px";
					txtcon.innerHTML = textRadio
					newRadioLabel.appendChild(txtcon);	
					if(ObjDef.inputfields[q].displayas=="VertRadio"){
						newRadioLabel.style.display="block";
						newRadioLabel.style.width="100%";
						newRadioLabel.style.paddingBottom="2px";
					};									
					newRadio.setAttribute('value',w[f].cmid);
					if(w[f].onchange!=undefined){
						hasOnchangeEvent = true;
						newRadio.setAttribute("TriggerAction",true);
					}
					inputContainer.appendChild(newRadioLabel);
					if(ObjDef.inputfields[q].displayas=="VertRadio"){					
						BR = document.createElement("BR");
						BR.className="wifClearFloat"
						inputContainer.appendChild(BR);
					};
			};

					var newOption = document.createElement('option');	
					newOption.setAttribute('value',w[f].cmid);
					if(w[f].title==undefined){newOption.setAttribute('title',w[f].label)}else{newOption.setAttribute('title',w[f].title)};		
					var text = document.createTextNode(w[f].label);
					if(w[f].csstext != undefined){
						newOption.style.cssText = w[f].csstext;
					}
					if(w[f].onchange!=undefined){
						hasOnchangeEvent = true;
						newOption.setAttribute("TriggerAction",true);
					}
					newOption.appendChild(text);
					inputControl.appendChild(newOption);		
					
								
				};
				if(ObjDef.inputfields[q].displayas=="VertRadio" || ObjDef.inputfields[q].displayas=="HorzRadio"  || ObjDef.inputfields[q].displayas=="InlineRadio"){
					inputControl.style.display="none";	
					inputContainer.style.border="0px";
					inputContainer.style.backgroundColor="Transparent";
					if(ObjDef.inputfields[q].displayas=="InlineRadio"){
						inputContainer.style.cssFloat="right";
						inputContainer.style.marginTop="-18px";
					};

				};
				
				if(hasOnchangeEvent){
					inputControl.onchange = epMultiEdit.onchangeActions;	
					inputControl.onkeyup = epMultiEdit.onchangeActions;						
					inputControl.setAttribute("ObjName",ObjName);
					inputControl.setAttribute("inputfieldid",ObjDef.inputfields[q].id);
				};
				if(ObjDef.inputfields[q].attributes!=undefined){
					for (var a=0; a < ObjDef.inputfields[q].attributes.length; a++){
						attributes=ObjDef.inputfields[q].attributes[a];
						for (var key in attributes) {
						   var value = attributes[key];
						   inputControl.setAttribute(key, value);
						};
					};
				};
				inputContainer.appendChild(inputControl);				
				elm.appendChild(inputContainer);
				elm.appendChild(inputContainer);				
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					elm.appendChild(formatDef);
				};
				
				
				
//				inputControl.style.display="none";
				
				break;
/* *********************************************************************************************************************************************************
			case "Radio":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";				
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
				errtxt.className = "defaultText";
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				inputContainer.className = "wifInputRadioContainer"			
				w =ObjDef.inputfields[q].src;
				for (var f=0; f < w.length; f++){
					
				radioLabel=document.createElement("LABEL");					
				radioLabel.className = "wifInputRadioLabel";
				radioLabel.setAttribute("htmlFor",ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input" + f);
				radioControl=document.createElement("INPUT");
				radioControl.type= "radio";			
				radioControl.setAttribute("inputfieldid",ObjDef.inputfields[q].id);						
				radioControl.className = "wifInputRadio";
				radioControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input" + f;
				radioControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";	
				if(ObjDef.inputfields[q].title!=undefined){titlestr=ObjDef.inputfields[q].title}else{titlestr=labelstr};
				radioControl.title=nvxgWIF.removeHTMLTags(titlestr);;
				radioControl.setAttribute('value',w[f].cmid);
				if(w[f].cmid==0){radioLabel.style.display="none";}					
				hasOnchangeEvent = false;	
				if(w[f].onchange!=undefined){
					hasOnchangeEvent = true;
					radioControl.setAttribute("TriggerAction",true);
					radioControl.setAttribute("ObjName",ObjName);
					radioControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);									
					radioControl.setAttribute("inputfieldid",ObjDef.inputfields[q].id);
				}
				
				
				if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,inputControl,q)};
				radioLabel.appendChild(radioControl);	
				var text = document.createTextNode(" " + w[f].label);
				radioLabel.appendChild(text);							
				inputContainer.appendChild(radioLabel);	
			};
			elm.appendChild(inputContainer);				
			if(ObjDef.inputfields[q].formatstr!=undefined){
				formatDef=document.createElement("DIV");
				formatDef.className = "wifFieldFormatDef";
				formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
				elm.appendChild(formatDef);
			};
			break;
*/
			case "Checkbox":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";				
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
				errtxt.className = "defaultText";
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				if(labelstr!=""){elm.appendChild(instrc);};
				inputContainer=document.createElement("DIV");
				inputContainer.className = "wifInputRadioContainer"			
				w =ObjDef.inputfields[q].src;
				checkboxLabel=document.createElement("LABEL");					
				checkboxLabel.className = "wifInputCheckboxLabel";
				checkboxLabel.setAttribute("htmlFor",ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
				checkboxLabel.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputLabel";
				checkboxControl=document.createElement("INPUT");
				checkboxControl.type= "checkbox";		
				checkboxControl.setAttribute("inputfieldid",ObjDef.inputfields[q].id);													
				checkboxControl.className = "wifInputCheckbox";
				checkboxControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				checkboxControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";	
				//checkboxControl.setAttribute('value',ObjDef.inputfields[q].defaultval);
				checkboxControl.setAttribute('trueValue',w[0].cmid);
				checkboxControl.setAttribute('falseValue',w[1].cmid);
				
				if(ObjDef.inputfields[q].defaultval==true){
					checkboxControl.checked=true;
					checkboxControl.value=w[0].cmid;
				  }else{
					checkboxControl.checked=false;
					checkboxControl.value=w[1].cmid;
				};		
				
				//checkboxControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);				
				if(ObjDef.inputfields[q].title!=undefined){titlestr=ObjDef.inputfields[q].title}else{titlestr=w[0].label};
				checkboxControl.title=nvxgWIF.removeHTMLTags(titlestr);;
				hasOnchangeEvent = false;	
				if(w[0].onchange!=undefined){
					hasOnchangeEvent = true;
					checkboxControl.setAttribute("ObjName",ObjName);
					checkboxControl.setAttribute("inputfieldid",ObjDef.inputfields[q].id);
				};
				checkboxControl.setAttribute("TriggerAction",hasOnchangeEvent);
				if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,inputControl,q)};
				
				checkboxLabel.appendChild(checkboxControl);	
				
				var text = document.createTextNode(" " + w[0].label);
				checkboxLabel.appendChild(text);							
				inputContainer.appendChild(checkboxLabel);	
				elm.appendChild(inputContainer);				
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					elm.appendChild(formatDef);
				};
			
			
			break;
			case "Text":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					elm.className = "wif"+ ObjDef.inputfields[q].size[0] +"pContainer";
				}else{
					elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer";
				};
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";							
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
				errtxt.className = "defaultText";
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					inputContainer.className = "wif"+ ObjDef.inputfields[q].size[1] +"pInputContainer"			
				}else{;			
					inputContainer.className = "wif"+ ObjDef.inputfields[q].size +"pInputContainer"			
				};

				if(ObjDef.inputfields[q].readonly!=undefined){
					if(ObjDef.inputfields[q].readonly){
						inputContainer.style.cssText="background-color:transparent !important";
					};
				};				
				inputControl=document.createElement("INPUT");
				inputControl.type= "text";
				inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				inputControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				inputControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);									
				if(ObjDef.inputfields[q].title!=undefined){titlestr=ObjDef.inputfields[q].title}else{titlestr=labelstr};
				//inputControl.title=nvxgWIF.removeHTMLTags(titlestr);;
				if(ObjDef.inputfields[q].blocklabel!=undefined){
					inputControl.setAttribute("setBlockLabel","true");
				};					
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					inputControl.className="wif"+ ObjDef.inputfields[q].size[1] +"p" + ObjDef.inputfields[q].type;								
				}else{;			
					inputControl.className="wif"+ ObjDef.inputfields[q].size +"p" + ObjDef.inputfields[q].type;		
				};
				if(ObjDef.inputfields[q].readonly!=undefined){
					if(ObjDef.inputfields[q].readonly){
						inputControl.style.cssText="background-color:transparent !important; ";
						inputControl.setAttribute("readOnly", true);
						inputControl.setAttribute("tabindex", 0);		
						inputControl.setAttribute("onSelect", "return false");							
						inputControl.style.cursor="default";
					};
				};			
				inputControl.setAttribute("ObjName",ObjName);		
				if(ObjDef.inputfields[q].evalformula!=undefined){inputControl.setAttribute("evalformula", ObjDef.inputfields[q].evalformula);};											
				if(ObjDef.inputfields[q].hint!=undefined){inputControl.setAttribute("hint",ObjDef.inputfields[q].hint);};
				if(ObjDef.inputfields[q].numfixed!=undefined){inputControl.setAttribute("fixed",ObjDef.inputfields[q].numfixed);};	
				if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,inputControl,q)};
				inputContainer.appendChild(inputControl);
				elm.appendChild(inputContainer);				
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					if(ObjDef.inputfields[q].sortas =="number"){formatDef.style.cssText="text-align:right !important;padding-right:1px"};
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					elm.appendChild(formatDef);
				};
				break;		
			case "Calendar":
			
				var randomnumber=Math.floor(Math.random()*1001)
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";							
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				if(ObjDef.typeofUI==1){
					errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~" + randomnumber + "ERRTXT";
				}else{
					errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input"  + "ERRTXT";
				}
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
				errtxt.className = "defaultText";
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				inputContainer.className = "wif"+ ObjDef.inputfields[q].size +"pInputContainer"			
					inputControl=document.createElement("INPUT");
					inputControl.type= "text";
					if(ObjDef.typeofUI==1){
						inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber;
					}else{
						inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
					};
					inputControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";

					inputControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);
					inputControl.setAttribute("RndNum",randomnumber);
					if(ObjDef.inputfields[q].title!=undefined){titlestr=ObjDef.inputfields[q].title}else{titlestr=labelstr};
					//inputControl.title=nvxgWIF.removeHTMLTags(titlestr);;
					inputControl.className="wif"+ ObjDef.inputfields[q].size +"p" + ObjDef.inputfields[q].type;		
					
					
					

					
					
					
		
					
					
					
					
					
					
					
					
					if(ObjDef.inputfields[q].hint!=undefined){inputControl.setAttribute("hint",ObjDef.inputfields[q].hint);};
					
					if(ObjDef.inputfields[q].defaultval!=undefined){
						if(Object.prototype.toString.call(ObjDef.inputfields[q].defaultval) == "[object Array]"){
							inputControl.value=ObjDef.inputfields[q].defaultval[0] + "/" + ObjDef.inputfields[q].defaultval[1] + "/" + ObjDef.inputfields[q].defaultval[2];
							sDate = ObjDef.inputfields[q].defaultval[2] + "" + ObjDef.inputfields[q].defaultval[0] + "" + ObjDef.inputfields[q].defaultval[1];
							inputControl.setAttribute("sdate",sDate);					
						}else{
							Df=ObjDef.inputfields[q].defaultval;
							if(Df.toUpperCase()=="NOW"){
								d=rbCalendar.serializeNow();
								
								right_year 	= (d.substring(0,4));
								month_num 	= (d.substring(4,6));
								thedate 	= (d.substring(6,8));
								inputControl.value= month_num + "/" + thedate + "/" + right_year;
								sDate = right_year + "" + month_num + "" + thedate;
								inputControl.setAttribute("sdate",sDate);					
										};
									};
					}else{
						sDate = "";	
					};


					
					
					if(ObjDef.inputfields[q].mindate!=undefined){mn=ObjDef.inputfields[q].mindate}else{mn=-1;};
					inputControl.setAttribute("mindate",mn)
					if(ObjDef.inputfields[q].maxdate!=undefined){mx=ObjDef.inputfields[q].maxdate}else{mx=-1;};
					inputControl.setAttribute("maxdate",mx)					
					if(ObjDef.inputfields[q].numfixed!=undefined){inputControl.setAttribute("fixed",ObjDef.inputfields[q].numfixed);};	
					if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,inputControl,q)};
					inputContainer.appendChild(inputControl);					
				clrButton=document.createElement("div");
				clrButton.className = "rbImgCalendarClear";
				clrButton.tabIndex = 0;
				clrButton.title=epMultiEdit.CalendarText[1];
				inputContainer.appendChild(clrButton);						
				calButton=document.createElement("div");
				calButton.className = "rbImgCalendar";
				calButton.tabIndex = 0;
				calButton.title=epMultiEdit.CalendarText[0];
				inputContainer.appendChild(calButton);		

				
				if(ObjDef.typeofUI==1){
					inputControl.setAttribute("onClick","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber +"','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");				
					inputControl.setAttribute("onkeypress","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber +"','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");													

					clrButton.setAttribute("onClick","rbCalendar.clickClearDate('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber +"')");				
					clrButton.setAttribute("onkeypress","rbCalendar.clickClearDate('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber +"')");				

					calButton.setAttribute("onClick","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber +"','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");				
					calButton.setAttribute("onkeypress","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input~"+randomnumber +"','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");								

				}else{
					inputControl.setAttribute("onClick","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");				
					inputControl.setAttribute("onkeypress","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");			

					clrButton.setAttribute("onClick","rbCalendar.clickClearDate('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");				
					clrButton.setAttribute("onkeypress","rbCalendar.clickClearDate('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input" +"')");

					calButton.setAttribute("onClick","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");				
					calButton.setAttribute("onkeypress","rbCalendar.openCalendar('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");								

				};
				
				
				
				
				
				elm.appendChild(inputContainer);				
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					if(ObjDef.inputfields[q].sortas =="number"){formatDef.style.cssText="text-align:right !important;padding-right:1px"};
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					
					elm.appendChild(formatDef);
					

				};
			break;						
			case "Date":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";							
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
								errtxt.className = "defaultText";
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				inputContainer.className = "wif"+ ObjDef.inputfields[q].size +"pInputContainer"			
				// Month ----------------------------------------------------------------------------------
					inputMMControl=document.createElement("SELECT");
					inputMMControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_MONTH";
					inputMMControl.className="wifchar2Select";
					inputMMControl.style.cssText="margin-left:-3px";
					inputMMControl.setAttribute("required",false);
					inputMMControl.title=epMultiEdit.CalendarText[3];
					for (var m = 1; m < 13; m++) {
						if(m<10){m= "0"+m};
						var newOption = document.createElement('option');	
						newOption.setAttribute('value',m);
						var text = document.createTextNode(m);
						newOption.appendChild(text);
						inputMMControl.appendChild(newOption);
					};
					inputContainer.appendChild(inputMMControl);					
				// Day ----------------------------------------------------------------------------------					
					inputDDControl=document.createElement("SELECT");
					inputDDControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_DAY";
					inputDDControl.className="wifchar2Select";
					inputDDControl.setAttribute("required",false);
					inputDDControl.title=epMultiEdit.CalendarText[4];
					for (var m = 1; m < 32; m++) {
						if(m<10){m= "0"+m};
						var newOption = document.createElement('option');	
						newOption.setAttribute('value',m);
						var text = document.createTextNode(m);
						newOption.appendChild(text);
						inputDDControl.appendChild(newOption);
					};
					inputContainer.appendChild(inputDDControl);			
				// Year ----------------------------------------------------------------------------------					
					inputYYControl=document.createElement("SELECT");
					inputYYControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_YEAR";
					inputYYControl.className="wifchar3Select";
					inputYYControl.setAttribute("required",false);
					inputYYControl.title=epMultiEdit.CalendarText[5];
					var iNow=new Date();
					var iYear=iNow.getFullYear();
					for (var m = iYear; m > (iYear-101); m--) {
						var newOption = document.createElement('option');	
						newOption.setAttribute('value',m);
						var text = document.createTextNode(m);
						newOption.appendChild(text);
						inputYYControl.appendChild(newOption);
					}
					inputContainer.appendChild(inputYYControl);	
				// Year ----------------------------------------------------------------------------------					
					inputControl=document.createElement("HIDDEN");
					inputControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);					
					inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
					inputControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";	
					inputContainer.appendChild(inputControl);					
				// Tools ----------------------------------------------------------------------------------										
					clrButton=document.createElement("DIV");
					clrButton.className = "rbImgCalendarClear";
					clrButton.tabIndex = 0;
					clrButton.title=epMultiEdit.CalendarText[1]
					clrButton.setAttribute("onClick","nvxgWIF.clearDateListValue('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input" +"')");				
					clrButton.setAttribute("onkeypress","nvxgWIF.clearDateListValue('"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input" +"')");									
					inputContainer.appendChild(clrButton);						
					tdyButton=document.createElement("div");
					tdyButton.className = "rbImgTodayCalendar";
					tdyButton.tabIndex = 0;
					tdyButton.title=epMultiEdit.CalendarText[2]
					var right_now=new Date();
					var DD=right_now.getDate()
					tdyButton.innerHTML = DD;
					tdyButton.setAttribute("onClick","nvxgWIF.setTodayListValue('" + ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");				
					//tdyButton.setAttribute("onkeypress","nvxgWIF.setTodayListValue('" + ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");									
					inputContainer.appendChild(tdyButton);						
					elm.appendChild(inputContainer);
					if(ObjDef.inputfields[q].formatstr!=undefined){
						formatDef=document.createElement("DIV");
						formatDef.className = "wifFieldFormatDef";
						formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
						if(ObjDef.inputfields[q].sortas =="number"){formatDef.style.cssText="text-align:right !important;padding-right:1px"};
						elm.appendChild(formatDef);
					};
					inputMMControl.setAttribute("onchange","nvxgWIF.setDateListValue('" + ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");	
					inputDDControl.setAttribute("onchange","nvxgWIF.setDateListValue('" + ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");	
					inputYYControl.setAttribute("onchange","nvxgWIF.setDateListValue('" + ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input')");	
				// SET DEFAULT ----------------------------------------------------------------------------------										
					inputControl.value = "";
					inputMMControl.selectedIndex = -1;
					inputDDControl.selectedIndex = -1;
					inputYYControl.selectedIndex = -1;												
				
					if(ObjDef.inputfields[q].defaultval!=undefined){
						defaultval=ObjDef.inputfields[q].defaultval;
						inputControl.setAttribute("defaultval",defaultval);
						if(Object.prototype.toString.call(defaultval) == "[object Array]"){
								inputMMControl.value = defaultval[0];
								inputDDControl.value = defaultval[1];
								inputYYControl.value = defaultval[2];
								inputControl.value = defaultval[0] + "/" + defaultval[1] +"/"+ defaultval[2];
						  }else{
							defaultval= defaultval.toUpperCase();
							if(defaultval=="NOW"){
								var right_now=new Date();
								var MM = right_now.getMonth()+1;
								if(MM<10){MM="0"+MM};
								var DD=right_now.getDate()
								if(DD<10){DD="0"+DD};				
								var YY=right_now.getFullYear();
								inputMMControl.value = MM;
								inputDDControl.value = DD;
								inputYYControl.value = YY;
								inputControl.value = MM + "/" + DD +"/"+ YY;
							}else{
								inputControl.value = "";
								inputMMControl.selectedIndex = -1;
								inputDDControl.selectedIndex = -1;
								inputYYControl.selectedIndex = -1;												
							};
						};
						
					}else{
						inputControl.value = "";
						inputMMControl.selectedIndex = -1;
						inputDDControl.selectedIndex = -1;
						inputYYControl.selectedIndex = -1;												
					};
			break;						

			case "Currency":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";							
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};				
				errtxt.className = "defaultText";				
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				inputContainer.className = "wif"+ ObjDef.inputfields[q].size +"pInputContainer"
				if(ObjDef.inputfields[q].readonly!=undefined){
						if(ObjDef.inputfields[q].readonly){
						inputContainer.style.cssText="background-color:transparent !important";
					};
				};				
					symbolContainer=document.createElement("DIV");
					symbolContainer.className = "CurrencySymbol";
					if(ObjDef.inputfields[q].symbol==undefined){sy=epMultiEdit.DefaultCurrency[0];syname=epMultiEdit.DefaultCurrency[1]}else{sy=ObjDef.inputfields[q].symbol[0];syname=ObjDef.inputfields[q].symbol[1]};
					symbolContainer.innerHTML = sy;
					symbolContainer.title=syname;
					inputContainer.appendChild(symbolContainer);
					inputControl=document.createElement("INPUT");
					inputControl.type= "text";
					inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
					inputControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
					inputControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);
					//inputControl.title=labelstr;
					inputControl.className="wif"+ ObjDef.inputfields[q].size +"p" + ObjDef.inputfields[q].type;	
					if(ObjDef.inputfields[q].readonly!=undefined){
						if(ObjDef.inputfields[q].readonly){
							inputControl.style.cssText="background-color:transparent !important; color:#000 !important";
							inputControl.setAttribute("readOnly", true);
							inputControl.setAttribute("onSelect", "return false");							
							inputControl.style.cursor="default";
						};
					};
					if(ObjDef.inputfields[q].evalformula!=undefined){inputControl.setAttribute("evalformula", ObjDef.inputfields[q].evalformula);};					
					if(ObjDef.inputfields[q].hint!=undefined){inputControl.setAttribute("hint",ObjDef.inputfields[q].hint);};
					if(ObjDef.inputfields[q].numfixed!=undefined){inputControl.setAttribute("fixed",ObjDef.inputfields[q].numfixed);};					
					if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,inputControl,q)};

				inputContainer.appendChild(inputControl);
				elm.appendChild(inputContainer);				
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					if(ObjDef.inputfields[q].sortas =="number"){formatDef.style.cssText="text-align:right !important;padding-right:2px"};
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					elm.appendChild(formatDef);
				};
				break;				
			case "TextArea":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wif"+ ObjDef.inputfields[q].size +"pContainer"
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";				
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";};
				errtxt.className = "defaultText";								
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elm.appendChild(instrc);
				inputContainer=document.createElement("DIV");
				inputContainer.className = "wif"+ ObjDef.inputfields[q].size +"pInputContainer"			
					inputControl=document.createElement("TEXTAREA");
					inputControl.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
					inputControl.name=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
					inputControl.setAttribute("cloneRequired",ObjDef.inputfields[q].required);
					//inputControl.title=labelstr;
					inputControl.className="wif"+ ObjDef.inputfields[q].size +"p" + ObjDef.inputfields[q].type;		
					inputControl.setAttribute("onpaste","nvxgWIF.autoresize(this)");
					inputControl.setAttribute("oncut","nvxgWIF.autoresize(this)");
					inputControl.setAttribute("onkeyup","nvxgWIF.autoresize(this)");
					;if(ObjDef.inputfields[q].size==undefined){x=3}else{x=Number(ObjDef.inputfields[q].rows)};
					inputControl.setAttribute("rows",x);
					if(ObjDef.inputfields[q].size==50){x=30};
					if(ObjDef.inputfields[q].size==66){x=45};
					if(ObjDef.inputfields[q].size==100){x=70};										
					inputControl.setAttribute("cols",x);
					if(ObjDef.inputfields[q].attributes!=undefined){epMultiEdit.setControlAttributes(ObjDef,inputControl,q)};
					inputContainer.appendChild(inputControl);
				elm.appendChild(inputContainer);				
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					elm.appendChild(formatDef);
				};
				break;		
			case "CheckBoxGroup":
				elm = document.createElement("DIV");							
				elm.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputContainer";
				elm.className = "wifCheckBoxGroup";
				if(ObjDef.inputfields[q].containercsstext!=undefined){elm.style.cssText = ObjDef.inputfields[q].containercsstext};
				elm.setAttribute("required",ObjDef.inputfields[q].required);
				elm.setAttribute("cloneRequired",ObjDef.inputfields[q].required);				

				elmx = document.createElement("DIV");							
				elmx.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				elmx.name = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				elmx.className = "wif"+ ObjDef.inputfields[q].size +"pContainer";
				iDivClose=document.createElement('div');
				iDivClose.className ="popup_close";	
				iDivClose.style.marginRight ="-18px";
				iDivClose.style.marginTop ="-4px";
				iDivClose.id= ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Close";
				iDivClose.onclick=epMultiEdit.clearCheckBoxGroup;
				iDivClose.title= "Clear All";
				elmx.appendChild(iDivClose);
				instrc = document.createElement("DIV");
				instrc.className = "wifInstructions";
				reqc = document.createElement("DIV");
				reqc.className = "wifRequiredFlag";
				reqc.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputRequired";				
				if(ObjDef.inputfields[q].required!=undefined){if(ObjDef.inputfields[q].required){reqstr = "♦";req='true';}else{reqstr = " ";req='false';};}else{reqstr = " ";req='false'};
				reqc.innerHTML = reqstr;
				instrc.appendChild(reqc);
				errtxt=document.createElement("LABEL");
				errtxt.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputERRTXT";
				if(ObjDef.typeofUI==0){
					errtxt.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				};
				errtxt.className = "defaultText";								
				var label=ObjDef.inputfields[q].label;
				if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
				errtxt.innerHTML = labelstr;
				instrc.appendChild(errtxt);
				elmx.appendChild(instrc);
				if(ObjDef.inputfields[q].formatstr!=undefined){
					formatDef=document.createElement("DIV");
					formatDef.className = "wifFieldFormatDef";
					formatDef.innerHTML = ObjDef.inputfields[q].formatstr;
					formatDef.style.paddingTop = "3px";
					elmx.appendChild(formatDef);
				};
				cols =ObjDef.inputfields[q].cols.length
				var loadopts=false;
				if(ObjDef.inputfields[q].opt.length==0){loadopts=true};
				for (var c=0; c < cols; c++){
					col = document.createElement("DIV");							
					col.id = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Column" + c;
					col.className = "wif"+ ObjDef.inputfields[q].cols[c].size +"pContainer";
					if(ObjDef.inputfields[q].cols[c].csstext != undefined){
						col.style.cssText=ObjDef.inputfields[q].cols[c].csstext;		
					};
					if(ObjDef.inputfields[q].cols[c].label != undefined){
						collabel = document.createElement("DIV");							
						collabel.innerHTML = ObjDef.inputfields[q].cols[c].label;
						collabel.className = "wifInstructions";
						collabel.style.marginLeft="20px";
						collabel.style.marginBottom="4px";				
						col.appendChild(collabel);
					};
					if(ObjDef.inputfields[q].cols[c].src != undefined){
						colchks=ObjDef.inputfields[q].cols[c].src
						for (var cks=0; cks < colchks.length; cks++){					
							ckContainer = document.createElement("DIV");
							ckContainer.className = "wifInputRadioContainer";
							rsContainer = document.createElement("DIV");
							rsContainer.className = "wifResponseBlock";
							ckLabel = document.createElement("LABEL");
							ckLabel.className = "wifInputCheckboxLabel";
							if(ObjDef.typeofUI==0){ckLabel.htmlFor = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + colchks[cks].id + "Input";};
							ckLabel.style.whiteSpace = "nowrap";
							ckBox = document.createElement("INPUT");
							ckBox.type="checkbox";
							ckBox.id=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + colchks[cks].id + "Input";
							ckBox.setAttribute("checkedvalue",colchks[cks].cmid);
							ckBox.value=colchks[cks].cmid;
							ckBox.setAttribute('trueValue',colchks[cks].cmid);
							ckBox.setAttribute('falseValue',colchks[cks].cmid);					
							ckBox.setAttribute("mutuallyexclusive",colchks[cks].mutuallyexclusive);
							ckBox.setAttribute("objname",ObjName);ckBox.setAttribute("ObjName",ObjName);
							ckBox.setAttribute("inputfieldid",ObjDef.inputfields[q].id);						
							ckBox.setAttribute("inputfieldidB",colchks[cks].id);						
							ckBox.setAttribute("ischkbxgrp","true");
							if(colchks[cks].title != undefined){
								ckBox.title=colchks[cks].title;
								ckLabel.title=colchks[cks].title;
							};
							if(colchks[cks].attributes != undefined){
								
							for (var a=0; a < colchks[cks].attributes.length; a++){
								attributes=colchks[cks].attributes[a];
								for (var key in attributes) {
								   var value = attributes[key];
								   if(nvxgWIF.isIEOld && key.indexOf("on")!=-1){
									   eval("fnc=function(){" + value + "}");
									   ckBox.attachEvent(key, fnc);
								   }else{
									   ckBox.setAttribute(key, value);
								   };
								};
							};
		
							};
							if(colchks[cks].defaultval){					
								ckBox.checked = true;
							};
							if(colchks[cks].onchange!=undefined){
								hasOnchangeEvent = true;
								ckBox.setAttribute("TriggerAction",true);
								if(loadopts){ObjDef.inputfields[q].src.push(colchks[cks])};							
							};
							if(loadopts){ObjDef.inputfields[q].opt.push(colchks[cks])};
							ckBox.className = "wifInputCheckbox";
							ckLabel.appendChild(ckBox);
	
							spLabel = document.createElement("SPAN");
							var visiblelabel=false;
							if(colchks[cks].label==undefined || colchks[cks].label==""){
								visiblelabel=true;
							}else{
								labeltxt=nvxgWIF.removeHTMLTags(colchks[cks].label);
								if(colchks[cks].label=="<cite>" + labeltxt + "</cite>"){visiblelabel=true;}
							}
							if(visiblelabel){
								spLabel.className ="SpanBlock";			
							}else{
								spLabel.className ="SpanBlockText";								

							};
							spLabel.innerHTML = colchks[cks].label;							
								
							if(colchks[cks].csstext != undefined){spLabel.style.cssText = colchks[cks].csstext;};
							ckLabel.appendChild(spLabel);
							rsContainer.appendChild(ckLabel);
							ckContainer.appendChild(rsContainer);
							HR = document.createElement("BR");
							HR.className="wifClearFloat";
							HR.style.height="1px";
							HR.style.padding = "0px"
							HR.style.margin="0px";
							ckContainer.appendChild(HR);	
							col.appendChild(ckContainer);				
						};
					};
					elmx.appendChild(col);
					//alert(ObjDef.inputfields[q].id +":"+ ObjDef.inputfields[q].src.length);
				};
				elm.appendChild(elmx);	
				nvxgWIF.setCheckBoxListEvents(elm);
			break;						
			default:
			// No Action
		};
		EditPanel.appendChild(elm);
		inputContainer=null;
		elm=null;
	}
	return EditPanel
},

// ****************************************************************************************************************
setFirstElement:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];	
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type !="Hidden"){break;};
	};	
	elm = document.getElementsByName(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
	elm[0].focus();
},

// ****************************************************************************************************************
createUIDisplayHeaderRow:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	RecordTableHeaderRow = document.createElement("TR");	
	RecordTableHeaderRow.setAttribute("onmouseover","return false");				
	RecordTableHeaderCell = document.createElement("TH");	
	RecordTableHeaderCell.style.cssText="width:20px !important";
	RecordTableHeaderCell.setAttribute('width','20');

	
	RecordTableHeaderCell.setAttribute("oncontextmenu","return false");		
	RecordTableHeaderCell.setAttribute("unselectable","on");				
//	RecordTableHeaderCell.innerHTML = " ";
	RecordTableHeaderRow.appendChild(RecordTableHeaderCell);	
	if(ObjDef.typeofUI==0){epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'coldisplayorder', false)};					
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if(ObjDef.inputfields[q].coldisplayorder!=undefined && ObjDef.inputfields[q].coldisplayorder!=999999){
			RecordTableHeaderCell = document.createElement("TH");	
			RecordTableHeaderCell.setAttribute("oncontextmenu","return false");		
			RecordTableHeaderCell.setAttribute("unselectable","on");				
			if(ObjDef.inputfields[q].colwidth!=undefined && ObjDef.inputfields[q].colwidth!=""){RecordTableHeaderCell.style.cssText="width:" + Number(ObjDef.inputfields[q].colwidth)+ "px !important";	};
			RecordTableHeaderCellUL = document.createElement("UL");	
			RecordTableHeaderCellUL.setAttribute("oncontextmenu","return false");		
			RecordTableHeaderCellUL.setAttribute("unselectable","on");				
			RecordTableHeaderCellULLI = document.createElement("LI");	
			RecordTableHeaderCellULLI.setAttribute("oncontextmenu","return false");		
			RecordTableHeaderCellULLI.setAttribute("unselectable","on");
			RecordTableHeaderCell.setAttribute("key",ObjDef.inputfields[q].objdatakey);
			RecordTableHeaderCell.setAttribute("ObjName",ObjName);
			RecordTableHeaderCell.setAttribute("SortAs",ObjDef.inputfields[q].sortas);				
			RecordTableHeaderCell.onclick=epMultiEdit.sortOnColClick;
			var label=ObjDef.inputfields[q].label;
			if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[0]}else{labelstr=label};
			if(ObjDef.inputfields[q].title!=undefined){titlestr=ObjDef.inputfields[q].title}else{titlestr=labelstr};				
			RecordTableHeaderCell.title=lc["$SYS_SORTCLICK"] + " '" + titlestr + "'.";
			if(ObjDef.sortdatakey==ObjDef.inputfields[q].objdatakey){
				if(ObjDef.sortdataorder == false || ObjDef.sortdataorder==undefined ){
					labelstr=labelstr + "<span class='MultiRecordEditorSortKey'>▼</span>";					
				}else{
					labelstr=labelstr + "<span class='MultiRecordEditorSortKey'>▲</span>";
				};
			};
			RecordTableHeaderCellULLI.innerHTML = labelstr;
			RecordTableHeaderCellUL.appendChild(RecordTableHeaderCellULLI);	
			RecordTableHeaderCell.appendChild(RecordTableHeaderCellUL);				
			RecordTableHeaderRow.appendChild(RecordTableHeaderCell);	
		};
	};
	return 	RecordTableHeaderRow
},

// ****************************************************************************************************************	
sortDisplayHeaderCols : function(cols,field, descending) {
	function sortNumbers(a,b){ return a[field] - b[field]; }
	cols.sort(sortNumbers); 
},


// ****************************************************************************************************************	
sortOnColClick:function(e){
	var obj = epMultiEdit.getEventTarget(e);
	while(obj.tagName != 'TH'){obj = obj.parentNode};
	ObjName = obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];		
	Key=obj.getAttribute("key");
	if(obj.getAttribute("sortas")==undefined){SortAs='string'}else{SortAs=obj.getAttribute("sortas")};
	
	if(ObjDef.sortdatakey == Key){
		if(ObjDef.sortdataorder){ObjDef.sortdataorder=false}else{ObjDef.sortdataorder=true};
	}else{
		ObjDef.sortdatakey = Key;
		ObjDef.sortas = SortAs;
	};
	RecordTableHeader = document.getElementById(ObjDef.objprefix + "UIListTHead");
	RecordTableHeader.removeChild(RecordTableHeader.childNodes[0]);
	RecordTableHeaderRow = epMultiEdit.createUIDisplayHeaderRow(ObjName);		
	RecordTableHeader.appendChild(RecordTableHeaderRow);
	epMultiEdit.sortDataObj(ObjName);		
	epMultiEdit.writeParticipantRows(ObjName);
},
// ****************************************************************************************************************	
setControlAttributes:function(ObjDef,inputControl,q){
	for (var a=0; a < ObjDef.inputfields[q].attributes.length; a++){
		attributes=ObjDef.inputfields[q].attributes[a];
		for (var key in attributes) {
		   var value = attributes[key];
		   if(nvxgWIF.isIEOld && key.indexOf("on")!=-1){
			   eval("fnc=function(){" + value + "}");
			   inputControl.attachEvent(key, fnc);
		   }else{
			   inputControl.setAttribute(key, value);
		   };
		};
	};
},						

// ****************************************************************************************************************	
writeOutput : function(ObjName){
	var ObjDef = nvxgObjectDef[ObjName];
	var copycontact = false;

	if(ObjDef.typeofoutput == "Agency" && ObjDef.objcount!==0 && ObjDef.typeofUI===0 && ObjDef.copycontact !== undefined) copycontact=ObjDef.copycontact;
	
	var countit = 0;	
	if (document.getElementById(ObjDef.outputcounter)) countit = Number(document.getElementById(ObjDef.outputcounter).value);

	if(ObjDef.objcount!==0){

		if(ObjDef.typeofUI==1){
			CloneBlockContainer =document.getElementById(ObjName + "CloneBlockContainer");
			clones = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlock',CloneBlockContainer );
			for (var c=0; c < clones.length; c++){		
				countit = countit + 1;
				for (var q=0; q < ObjDef.inputfields.length; q++){
					var str="";					
					if (ObjDef.inputfields[q].type in epMultiEdit.InputType){
						if(ObjDef.inputfields[q].type=="CheckBoxGroup"){
							if(ObjDef.inputfields[q].outputas===undefined){ObjDef.inputfields[q].outputas=0;}
							if(ObjDef.inputfields[q].outputas===0){
								for (co=0;co<ObjDef.inputfields[q].opt.length;co++) {
										elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].opt[co].id +"Input");	
										if(elm.checked){
												elm.name =  ObjDef.typeofoutput + countit + "_" + ObjDef.inputfields[q].opt[co].id;	
												if(ObjDef.typeofoutput == "Case") elm.name = ObjDef.inputfields[q].opt[co].id + countit;							
										}
								}
							}else{
								var newField = document.createElement('input');		
								newField.type='hidden';		
								outputname = ObjDef.typeofoutput + countit + "_" + ObjDef.inputfields[q].id;		
								newField.name=outputname;	
								newField.id=outputname;	
								newField.value="";
								for (co=0;co<ObjDef.inputfields[q].opt.length;co++) {
									elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].opt[co].id +"Input");	
									if(elm.checked){
											str = str + "• " + nvxgWIF.removeHTMLTags(ObjDef.inputfields[q].opt[co].label) + "\r";
									}
								}
								newField.value=str;
								clones[c].appendChild(newField);																			
							}
						}else{
							if(ObjDef.inputfields[q].type=="Calendar"){							
					 			elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input","INPUT");
							}else{
								elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input");
							}
							elm.name =  ObjDef.typeofoutput + countit + "_" + ObjDef.inputfields[q].id;
							if(ObjDef.typeofoutput == "Case") elm.name = ObjDef.inputfields[q].id  + countit ;
						}
					}
				}
			}
		}else{
			var obj = document.getElementById(ObjName + "Output");
			var copycontactParticipantCount	= 0;
			if(obj!==undefined){epMultiEdit.clearObjectChildNodes(obj);}	
			if(ObjDef.typeofoutput == "Field"){
				var outputString = "";
				for (var i=0; i < ObjDef.objdata.length; i++){
					for(var j=0; j<ObjDef.fieldFormat.length; j++){
						var formatObj = ObjDef.fieldFormat[j];
						if(formatObj.type == 'text'){
							outputString += formatObj.val;
						}
						if(formatObj.type == 'objdatakey' && ObjDef.objdata[i][formatObj.val]){
							var finalString = decodeURIComponent(ObjDef.objdata[i][formatObj.val]);
							if(formatObj.label) finalString = formatObj.label + finalString;
							if(formatObj.after) finalString = finalString + formatObj.after;
							outputString += finalString;
						}
					}
					outputString += "\n";
				}
				var newField = document.createElement('input');
				newField.type = 'hidden';		
				newField.name = ObjDef.fieldID;
				newField.value = outputString;		
				obj.appendChild(newField);
			}
			else{
				for (var i=0; i < ObjDef.objdata.length; i++){
					countit = countit + 1;		
					if(copycontact){
						copycontactParticipantCount = Number(document.getElementById("Participants").value) + 1;
						document.getElementById("Participants").value = copycontactParticipantCount;
						var newField = document.createElement('input');		
						newField.type='hidden';		
						newField.name = "Participant" + copycontactParticipantCount + "_RoleID";		
						newField.value=ObjDef.copycontactParticipantRoleID;
						obj.appendChild(newField);	
						var newField = document.createElement('input');		
						newField.type='hidden';		
						newField.name = "Participant" + copycontactParticipantCount + "_RelationshipID";		
						newField.value=ObjDef.copycontactParticipantRelationshipID;
						obj.appendChild(newField);						
					}
					
					var str="";
					for (var q=0; q < ObjDef.inputfields.length; q++){
						if(ObjDef.inputfields[q].type=="CheckBoxGroup"){
							if(ObjDef.inputfields[q].outputas===undefined){ObjDef.inputfields[q].outputas=0;}
							if(ObjDef.inputfields[q].outputas===0){
								for (co=0;co<ObjDef.inputfields[q].opt.length;co++) {
									v = ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
									if(v[co].checked){
										var newField = document.createElement('input');		
										newField.type='hidden';		
										outputname = ObjDef.typeofoutput + countit + "_" + ObjDef.inputfields[q].opt[co].id;
										if(ObjDef.typeofoutput == "Case") outputname = ObjDef.inputfields[q].opt[co].id + countit ;
										newField.name=outputname;	
										newField.id=outputname;						
										newField.value=v[co].value;
										obj.appendChild(newField);									
									}
								}
							}else{
								var newField = document.createElement('input');		
								newField.type='hidden';		
								outputname = ObjDef.typeofoutput + countit + "_" + ObjDef.inputfields[q].id;	
								if(ObjDef.typeofoutput == "Case")	outputname = ObjDef.inputfields[q].id  + countit;
								newField.name=outputname;	
								newField.id=outputname;	
								var str="";
								v = ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
								for (co=0;co<ObjDef.inputfields[q].opt.length;co++) {
									if(v[co].checked){
										str = str + "• " + nvxgWIF.removeHTMLTags(v[co].label) + "\r";
									}
								}
								newField.value=str;
								obj.appendChild(newField);																			
							}
						}else{
							if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].id.indexOf("NotMapped")==-1){					
								var newField = document.createElement('input');		
								newField.type='hidden';		
								outputname = ObjDef.typeofoutput + countit + "_" + ObjDef.inputfields[q].id;
								if(ObjDef.typeofoutput == "Case")	outputname = ObjDef.inputfields[q].id  + countit;		
								newField.name=outputname;	
								newField.id=outputname;						
								v = ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
								if(v=="  /  /    " || v=="  -  -    " || v=="- -"  || v=="-1"){v="";}
								v = decodeURIComponent(v);
								v=v.replace(/<br\/>/g, "\n");
								newField.value=v;
								obj.appendChild(newField);
								if(copycontact){
									if(ObjDef.inputfields[q].copycontactto !==undefined){
										if(ObjDef.inputfields[q].copycontactto !==""){										
											var newField = document.createElement('input');		
											newField.type='hidden';		
											newField.name = "Participant" + copycontactParticipantCount + "_" + ObjDef.inputfields[q].copycontactto;		
											newField.value=v;
											obj.appendChild(newField);	
										}
									}
								}								
							}
						}
					}
				}

			}
			obj = document.getElementById(ObjName + "Container");	
			if(obj!==undefined){epMultiEdit.clearObjectChildNodes(obj);}	
			}
		}
	if(document.getElementById(ObjDef.outputcounter))document.getElementById(ObjDef.outputcounter).value = countit;	
},

// ****************************************************************************************************************	
cleanupOutput : function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];		
	for (var q=0; q < ObjDef.inputfields.length; q++){
		obj = document.getElementsByName(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.objprefix.inputfields[q].id + "Input");
		for (var o=0; o <obj.length; o++){
			objParent = obj[o].parentNode
			objParent.removeChild(obj[o]);
		};
	};	
},

// ****************************************************************************************************************	
validateParticipant : function(ObjName){
	epValidate.errorlist = "";
	var ObjDef=nvxgObjectDef[ObjName];
	epValidate.resetlabels(ObjDef.objprefix + '_EditPanel');
	isclear = true;			
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if(ObjDef.inputfields[q].required){
			if(ObjDef.inputfields[q].validate != undefined && ObjDef.inputfields[q].validate !=""){
				v=ObjDef.inputfields[q].validate.split("|");
				func =epValidate[v[0].toLowerCase()];
				for (var w=0; w < 7; w++){func[w]=undefined;};					
				func[0] = ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input";
				
				if(v.length==2){arg=v[1].split(",");for (var w=0; w < arg.length; w++){func[w+1] =arg[w];};};
				if(func(func[0],func[1],func[2],func[3],func[4],func[5],func[6])==-1){isclear=false};
			};
		};
	};
	return isclear;
},
// ****************************************************************************************************************
resetCloneIds :function (){

	if(epMultiEdit.validateClonesReset.length!=0){
		for (r=0;r<epMultiEdit.validateClonesReset.length;r++) {
		var ObjDef=nvxgObjectDef[epMultiEdit.validateClonesReset[r]];
		if(ObjDef.objcount!=0){
			CloneBlockContainer =document.getElementById(epMultiEdit.validateClonesReset[r] + "CloneBlockContainer");
			clones = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlock',CloneBlockContainer );
			for (var c=0; c < clones.length; c++){		
				for (var q=0; q < ObjDef.inputfields.length; q++){
					if (ObjDef.inputfields[q].type in epMultiEdit.InputType){

							elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input" + (c+1));
							errtxt=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input"+ (c+1) + "ERRTXT");						

//alert(errtxt +":"+ ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input" + (c+1) + "ERRTXT");
//							alert(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input"+ (c+1) + "ERRTXT" +":"+errtxt.tagName );
//							alert(errtxt.tagName );







						if(elm!=undefined){
							switch (ObjDef.inputfields[q].type){
								case "Calendar":
									rnd = elm.getAttribute("RndNum");
									elm.id = elm.name + "~" + rnd;
									errtxt.id = elm.name + "~" + rnd + "ERRTXT" ;
					
								break;
					
								case "CheckBoxGroup":
									elm.id = elm.name;
									errtxt.id = elm.name + "ERRTXT";
								break;
					
								default:
									isRequired = elm.getAttribute("clonerequired");
										if(isRequired=="true"){
											elm.id = elm.name;
											errtxt.id = elm.name + "ERRTXT";
										};
									};
							};
						};
					};
				};
			};
		};
	};
},

// ****************************************************************************************************************
validateClones : function(ObjName){
	epMultiEdit.validateClonesReset.push(ObjName);
	var ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.objcount!=0){
		CloneBlockContainer =document.getElementById(ObjName + "CloneBlockContainer");
		clones = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlock',CloneBlockContainer );
		resetclone=true;
		for (var c=0; c < clones.length; c++){		
			for (var q=0; q < ObjDef.inputfields.length; q++){
				if (ObjDef.inputfields[q].type in epMultiEdit.InputType){
					
		switch (ObjDef.inputfields[q].type){
			case "CheckBoxGroup":
/*
							elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input");
							isRequired = elm.getAttribute("clonerequired");
							errtxt=epMultiEdit.getElementByIdInObjContainer(clones[c],elm.id +"ERRTXT");
							if(isRequired=="true"){						
								elm.id = elm.name + Number(c+1);
								errtxt.id = elm.name  + Number(c+1) + "ERRTXT";					
								r=epValidate.checkboxgroup(elm.id, "#" + Number(c+1) + ".");						
								if(r==-1){resetclone=false;};
							};

*/
							elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input","DIV");
							isRequired = "true";//elm.getAttribute("clonerequired");
							//alert(isRequired);
							errtxt=epMultiEdit.getElementByIdInObjContainer(clones[c],elm.id +"ERRTXT", "LABEL");
							if(isRequired=="true"){						
								elm.id = elm.name + Number(c+1);
								errtxt.id = elm.name  + Number(c+1) + "ERRTXT";					
								r=epValidate.checkboxgroup(elm.id, "#" + Number(c+1) + ".");						
								if(r==-1){resetclone=false;};
							};

			break;

			case "Calendar":


			 elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input","INPUT");
			 errtxt=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input","LABEL");
				isRequired = elm.getAttribute("clonerequired");
				elm.id = elm.name + (c+1);
				errtxt.id = elm.name  + (c+1) + "ERRTXT";
				if(isRequired=="true"){	r=epValidate.date(elm.id,"#" + (c+1) + ".");	};
				

			break;

			default:
							elm=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input");
							errtxt=epMultiEdit.getElementByIdInObjContainer(clones[c],ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"InputERRTXT");						
							isRequired = elm.getAttribute("clonerequired");
							if(isRequired=="true"){
								elm.id = elm.name + (c+1);
								errtxt.id = elm.name  + (c+1) + "ERRTXT";
								if(ObjDef.inputfields[q].validate != undefined && ObjDef.inputfields[q].validate !=""){
									v=ObjDef.inputfields[q].validate.split("|");
									func =epValidate[v[0].toLowerCase()];
									for (var w=0; w < 7; w++){func[w]=undefined;};					
									func[0] = elm.id;
									func[1] = "#" + (c+1) + ".";
									if(v.length==2){arg=v[1].split(",");for (var w=0; w < arg.length; w++){func[w+1] =arg[w];};};
									r=func(func[0],func[1],func[2],func[3],func[4],func[5],func[6]);
									if(r==-1){resetclone=false;};
								};
							};							

		};


						
				};
			};
		};
		if(resetclone){epMultiEdit.resetCloneIds()};
	};
	
},

// ****************************************************************************************************************
	insertNewParticipant : function(ObjName,halt) {
		var ObjDef=nvxgObjectDef[ObjName];
		epValidate.ishalt = false;
		k = epMultiEdit.validateParticipant(ObjName);

		if(k){;
			ObjDef.currentkey = ObjDef.currentkey + 1;			
			var record = new Object();
			record=epMultiEdit.writeRecord(ObjName,record)
			record['sortval']="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ";
			record['key']=0;		
			i=ObjDef.objdata.push(record);		
			i=i-1;
			ObjDef.objdata[i].key = ObjDef.currentkey;
			epMultiEdit.sortDataObj(ObjName);
			ObjDef.objcount = ObjDef.objcount + 1;
			TabItemCounter = document.getElementById(ObjName + "ItemTabCounter");
			if(TabItemCounter != undefined){
				TabItemCounter.innerHTML = ObjDef.objcount;
				if(ObjDef.objcount > 0){
					TabItemCounter.style.display = "";
				}else{
					TabItemCounter.style.display = "none";			
				};
			};			
			epMultiEdit.writeParticipantRows(ObjName);	
			epMultiEdit.clearParticipantInputFields(ObjName);
			if(ObjDef.maximum == ObjDef.objdata.length){
				epMultiEdit.setToolBar(ObjName,false,true,true,false,false,false,true,false,false);		
			}else{
				epMultiEdit.setToolBar(ObjName,true,true,true,false,false,false,true,false,true);		
				document.getElementById(ObjDef.objprefix + "AddEnabled").focus();
			}
			epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);
			index = epMultiEdit.findKeyRowIndex(ObjName,ObjDef.currentkey);
			ObjDef.selecteddataobjindex = index;
			ObjDef.action=null;
			epMultiEdit.previewParticipantData(ObjName,index);
		}else{
			epValidate.displayErrBox(ObjDef.recordtitle);
		};
		if(nvxgWIF.isDevMode){nvxgWIF.refreshQAVariables();};		
},

// ****************************************************************************************************************
writeRecord : function(ObjName,record){
	var ObjDef=nvxgObjectDef[ObjName];
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType){
			tElm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id + "Input");			
			var t = '';
			switch(ObjDef.inputfields[q].type){
				case "TextArea":
					t= epMultiEdit.trimString(tElm.value);
						t=t.replace(/\r\n|\r|\n/g,"~");
						var t = t.replace(/<\/?[^>]+(>|$)/g, "");
						t = t.replace( new RegExp( "~", "gi" ), "<br/>" );
						t = encodeURIComponent(t);
						if(ObjDef.sortdatakey==ObjDef.inputfields[q].objdatakey){S=t};
				  break;
				case 'Hidden':
				   t=epMultiEdit.trimString(ObjDef.inputfields[q].defaultval);		
				  break;
				case "Radio":
					R = document.getElementsByName(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id + "Input");
					for (var rd=0; rd < R.length; rd++){
						if(R[rd].checked){break}	
					}
					t = R[rd].value;
				  break;
				case "Checkbox":
					t = document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id + "Input").value;
				break;	
				case "CheckBoxGroup":
					t=[];
					for (oc=0;oc<ObjDef.inputfields[q].opt.length;oc++) {
						var chkopt = new Object();
						chkopt['id']		=	ObjDef.inputfields[q].opt[oc].id;
						chkopt['label']		=	nvxgWIF.removeHTMLTags(ObjDef.inputfields[q].opt[oc].label);		
						chkopt['value']		=	ObjDef.inputfields[q].opt[oc].cmid;		
						chkopt['checked']	=	document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].opt[oc].id + "Input").checked;	
						t.push(chkopt);
					};
					chkopt=null;
				break;			  
				case 'Select':
					if(tElm.selectedIndex!=-1){
						if(ObjDef.sortdatakey==ObjDef.inputfields[q].objdatakey){
							w =ObjDef.inputfields[q].src;
							for (var f=0; f < w.length; f++){if(w[f].cmid == tElm.value){break;};};
							S=w[f].label;
						};
						t=epMultiEdit.trimString(tElm.value);						
					}else{
						t="";

					};
				break;
				case "Calendar":
					if(tElm.value == "mm/dd/yyyy") tElm.value = "";
					t=epMultiEdit.trimString(tElm.value);
					if((ObjDef.inputfields[q].hint != undefined)&&(t==ObjDef.inputfields[q].hint)){
							t="";
					};
					
				break;					
				default:
					t=epMultiEdit.trimString(tElm.value);
					if(ObjDef.inputfields[q].hint!=undefined && ObjDef.inputfields[q].defaultval!= undefined){
						if((ObjDef.inputfields[q].hint != ObjDef.inputfields[q].defaultval)&&(t==ObjDef.inputfields[q].hint)){
								t="";
						};
						
					};
					if(ObjDef.sortdatakey==ObjDef.inputfields[q].objdatakey){S=t};
				 break; 
			};		
			record[ObjDef.inputfields[q].objdatakey]=t;		
		};
	};
	return record
},	

// ****************************************************************************************************************
updateParticipant : function(ObjName,halt) {
	var ObjDef=nvxgObjectDef[ObjName];	
	epValidate.ishalt = false;
	k = epMultiEdit.validateParticipant(ObjName);
	if(k){
		i = epMultiEdit.findArrayIndex(ObjName,ObjDef.updatekey);			
		record=ObjDef.objdata[i];
		record=epMultiEdit.writeRecord(ObjName,record)
		ObjDef.action = null;	
		epMultiEdit.sortDataObj(ObjName);			
		epMultiEdit.writeParticipantRows(ObjName);	
		epMultiEdit.clearParticipantInputFields(ObjName);
		if(ObjDef.maximum == ObjDef.objdata.length){
			epMultiEdit.setToolBar(ObjName,false,true,true,false,false,false,false,false);		
		}else{
			epMultiEdit.setToolBar(ObjName,true,true,true,false,false,false,false,true);	
			document.getElementById(ObjDef.objprefix + "AddEnabled").focus();
		};
		epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);
		index = epMultiEdit.findKeyRowIndex(ObjName,ObjDef.updatekey);
		ObjDef.selecteddataobjindex = index;
		epMultiEdit.previewParticipantData(ObjName,index);
	}else{
			epValidate.displayErrBox(ObjDef.recordtitle);
		};

},

// ****************************************************************************************************************
writeParticipantRows : function(ObjName) {
	var ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.typeofUI==0){epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'coldisplayorder', false)};					
	var total_items = 0; var total_value = 0; var total_recovered = 0; var total_net = 0;
	epMultiEdit.clearUIList(ObjName);
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");		
	
	
	for (var i=0; i < ObjDef.objdata.length; i++){
		var hastotalcalc = false;
		//alert(ObjDef.objdata[i][ObjDef.sortdatakey]);
		//if(ObjDef.objdata[i][ObjDef.sortdatakey] != "") {
			var newROW = document.createElement('tr');		
			newROW.setAttribute('key',ObjDef.objdata[i].key);				
			var c = document.createElement('TH');	
			c.innerHTML = i + 1 + '.';	
			newROW.appendChild(c);				
			hastotalcalc = false;
			for (var q=0; q < ObjDef.inputfields.length; q++){
				altcoldisplay="undefined";
				if(ObjDef.inputfields[q].coldisplayorder!=undefined && ObjDef.inputfields[q].coldisplayorder!=999999){
					if(ObjDef.inputfields[q].totalcalc !=undefined){hastotalcalc = true};
					v="";
					switch (ObjDef.inputfields[q].type){						
					case 'Select':
							w="";
							u=ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
							w =ObjDef.inputfields[q].src;
							for (var f=0; f < w.length; f++){
								if(w[f].cmid == u){
									v=w[f].label;
									if(w[f].altcoldisplay!="undefined"){altcoldisplay=w[f].altcoldisplay;};
									//alert(altcoldisplay)
									break;
									};	
							};
					break;
					case "Radio":
							u=ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
							w =ObjDef.inputfields[q].src;
							for (var f=0; f < w.length; f++){
								if(w[f].cmid == u){v=w[f].label;break}	
							};					
					break;	
					case "Checkbox":
							w="";
							u=ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
							w =ObjDef.inputfields[q].src;
							for (var f=0; f < w.length; f++){
								if(w[f].cmid == u){v="<img src='" + ObjDef.inputfields[q].img[f] +"' align='texttop'/>";break}	
							};
					break;							
					default:
						v= ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];	
					};
					numfixed=null;
					if(i%2 == 0){eo=1}else{eo=2};

					c = epMultiEdit.createTableCell(ObjDef.inputfields[q],eo,v,null,null,altcoldisplay);

					c.style.borderBottom="1px solid #CCCCCC"
					c.style.borderRight="1px solid #CCCCCC"
					newROW.appendChild(c);
				};
			//};
		tbody.appendChild(newROW);
		csyml="";				
		};
	};
	if(hastotalcalc){

			var newROW = document.createElement('tr');		
			c = epMultiEdit.createTableCell(ObjDef.inputfields[q],0," ","border:0px !important");
			newROW.appendChild(c);											
			var numfixed=null;				
			for (var q=0; q < ObjDef.inputfields.length; q++){
				if(ObjDef.inputfields[q].coldisplayorder !=undefined && ObjDef.inputfields[q].coldisplayorder !=999999){
					
					if(ObjDef.inputfields[q].numfixed!=undefined){numfixed=Math.abs(ObjDef.inputfields[q].numfixed,0)}else{numfixed=null}
					c = epMultiEdit.createTableCell(ObjDef.inputfields[q],0," ","border:0px !important",false);
															
					if(ObjDef.inputfields[q].totalcalc !=undefined){
						cval=0;
						switch (ObjDef.inputfields[q].totalcalc){
						case "SUM":
							sum=0;
							for (var i=0; i < ObjDef.objdata.length; i++){
								v= Number(ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey]);	
								sum=sum+v;
							}
							cval=sum.toFixed(numfixed);
							if(ObjDef.inputfields[q].totalcalctarg !=undefined){document.getElementById(ObjDef.inputfields[q].totalcalctarg).value = cval};
							if(cval>=0){
								csstext = "border-top:3px double #333 !important;border-right:0px !important; padding-right:1px !important;border-bottom:0px !important;font-weight:bold;";

							}else{
								csstext = "border-top:3px double #333 !important;border-right:0px !important;padding-right:1px !important;border-bottom:0px !important;color:#C00 !important;font-weight:bold;";

							};
							
						break;
						case "AVG":
						cval=0;
						break;
						default:
						// Default Action
						};
						c = epMultiEdit.createTableCell(ObjDef.inputfields[q],0,cval,csstext,false);
						numfixed=null;csstext="";					
					};
					newROW.appendChild(c);						
				};
			};
			tbody.appendChild(newROW);
	};
	epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'uidisplayorder', false);	
	if(ObjDef.countstr !=undefined){
		content=ObjDef.countstr;
		content=content.replace('%MAXIUM%', ObjDef.maximum);				
		content=content.replace('%COUNT%', ObjDef.objdata.length);						
		document.getElementById(ObjName + "ListCounter").innerHTML = content;	
	};

	RecordTableContainer=document.getElementById(ObjName + "MultiRecordEditorContainer");
	ScrollMsgCounter=document.getElementById(ObjName + "ScrollMsgCounter");		
	if(ObjDef.objdata.length>10){
		 if(ObjDef.ToggleTableViewState){
			 RecordTableContainer.style.height="auto";
			 document.getElementById(ObjName + "ScrollMsgCounter").style.display = "none";
		  }else{
			  RecordTableContainer.style.height="213px";
			  document.getElementById(ObjName + "ScrollMsgCounter").style.display = "";
		 };
		 document.getElementById(ObjName + "ToggleView").style.display = "";
	  }else{
		 RecordTableContainer.style.height="auto";
		 document.getElementById(ObjName + "ToggleView").style.display = "none";		
	};
		
	

},

// ****************************************************************************************************************
clearParticipantInputFields : function(ObjName) {
	var ObjDef=nvxgObjectDef[ObjName];			
	epValidate.resetlabels(ObjDef.objprefix + '_EditPanel');
	for (var q=0; q < ObjDef.inputfields.length; q++){
		tElm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
		switch (ObjDef.inputfields[q].type){
			case 'Select':
				if(ObjDef.inputfields[q].defaultval =="" || ObjDef.inputfields[q].defaultval == undefined){
				tElm.selectedIndex = -1;
				}else{
				tElm.value = ObjDef.inputfields[q].defaultval;						
				};
				tElm.disabled= false;

				tElm.style.color="#00F";
				tElm=tElm.parentNode;
				//%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
				if(ObjDef.inputfields[q].displayas=="HorzRadio" || ObjDef.inputfields[q].displayas=="VertRadio" ||  ObjDef.inputfields[q].displayas=="InlineRadio"){				
					radopts=nvxgWIF.getObjElementsByClassName("DispalyAsRadio",document.getElementById(ObjName + "Container"));
					for (opi=0;opi<radopts.length;opi++) {
						radpar = radopts[opi].parentNode
						radopts[opi].checked = false;
						radpar.style.color = '#333333';
					};
				};				
			  break;
			case "Radio":
				R = document.getElementsByName(ObjDef.objprefix+ ObjDef.typeofoutput + "INDEX_"  + ObjDef.inputfields[q].id + "Input");
				for (var rd=0; rd < R.length; rd++){
					obj = R[rd];					
					if(ObjDef.inputfields[q].defaultval == ObjDef.inputfields[q].src[rd].cmid){
						obj.checked = true;		
						if(ObjDef.inputfields[q].src[rd].onchange !=undefined){										
							epMultiEdit.onchangeActionsEvent(obj);				
							if(ObjDef.inputfields[q].src[rd].cmid==0){obj.checked = false};
						};
					}else{
						obj.checked = false;					
					}
									obj.disabled= false;
					while(obj.className != 'wifInputRadioContainer'){obj = obj.parentNode};	
					z = nvxgWIF.getObjElementsByClassName('wifInputRadioLabel',obj );
					for (e=0;e<z.length;e++){z[e].style.color = '#333';}
				}
			 break;				  
			case "Calendar":
					hint= tElm.getAttribute("hint");
					tElm.setAttribute("sdate","null");
					if(hint != undefined){
						tElm.value = hint;
						tElm.style.color="#cdcdcd";				
					}else{
						if(ObjDef.inputfields[q].readonly == undefined || ObjDef.inputfields[q].readonly == "undefined"){
							tElm.style.color="#00f";											  							
						}else{
							if( ObjDef.inputfields[q].readonly ==true){
							tElm.style.color="#555";	
							tElm.setAttribute("tabindex", -1);
							tElm.setAttribute("onSelect", "return false");
							};
						};
					};
			  break;					  
			case "Text":
					tElm.value = ObjDef.inputfields[q].defaultval;				
					hint= tElm.getAttribute("hint");
					if(hint != undefined && tElm.value == ObjDef.inputfields[q].defaultval){
						tElm.value = hint;
						tElm.style.color="#cdcdcd";				
					}else{
						if(ObjDef.inputfields[q].readonly == undefined || ObjDef.inputfields[q].readonly == "undefined"){
							tElm.style.color="#00f";											  							
						}else{
							if( ObjDef.inputfields[q].readonly ==true){
							tElm.style.color="#555";	
							tElm.setAttribute("tabindex", -1);
							tElm.setAttribute("onSelect", "return false");
							};
						};
					};
					tElm.disabled= false;
					tElm=tElm.parentNode;
//					tElm.style.backgroundColor = "#fff";						
					
			  break;	
			case "Currency":
					tElm.value = ObjDef.inputfields[q].defaultval;				
					hint= tElm.getAttribute("hint");
					if(hint != undefined && tElm.value == ObjDef.inputfields[q].defaultval){
						tElm.value = hint;
						tElm.style.color="#cdcdcd";				
					}else{
						if(ObjDef.inputfields[q].readonly == undefined || ObjDef.inputfields[q].readonly == "undefined"){
							tElm.style.color="#00f";											  							
						}else{
							if( ObjDef.inputfields[q].readonly ==true){
							tElm.style.color="#555";	
							tElm.setAttribute("tabindex", -1);
							tElm.setAttribute("onSelect", "return false");
							};
						};

					};
			  break;
			case "Time":
				tElm.value = ObjDef.inputfields[q].defaultval;				
				document.getElementById(ObjDef.objprefix+ ObjDef.typeofoutput + "INDEX_"  + ObjDef.inputfields[q].id + "Input_hrs").selectedIndex =	-1;
				document.getElementById(ObjDef.objprefix+ ObjDef.typeofoutput + "INDEX_"  + ObjDef.inputfields[q].id + "Input_mns").selectedIndex =	-1;
				document.getElementById(ObjDef.objprefix+ ObjDef.typeofoutput + "INDEX_"  + ObjDef.inputfields[q].id + "Input_aps").selectedIndex =	-1;					
			 break;	
			case 'Date':
					inputControl.value = "";
					tElm.value="";
					inputMMControl.selectedIndex = -1;
					inputDDControl.selectedIndex = -1;
					inputYYControl.selectedIndex = -1;												
					if(ObjDef.inputfields[q].defaultval!=undefined){
						defaultval=ObjDef.inputfields[q].defaultval;
						if(Object.prototype.toString.call(defaultval) == "[object Array]"){
								inputMMControl.value = defaultval[0];
								inputDDControl.value = defaultval[1];
								inputYYControl.value = defaultval[2];
								inputControl.value = defaultval[0] + "/" + defaultval[1] +"/"+ defaultval[2];
						  }else{
							defaultval= defaultval.toUpperCase();
							if(defaultval=="NOW"){
								var right_now=new Date();
								var MM = right_now.getMonth()+1;
								if(MM<10){MM="0"+MM};
								var DD=right_now.getDate()
								if(DD<10){DD="0"+DD};				
								var YY=right_now.getFullYear();
								inputMMControl.value = MM;
								inputDDControl.value = DD;
								inputYYControl.value = YY;
								inputControl.value = MM + "/" + DD +"/"+ YY;
							}else{
								inputControl.value = "";
								inputMMControl.selectedIndex = -1;
								inputDDControl.selectedIndex = -1;
								inputYYControl.selectedIndex = -1;												
							};
						};
					}else{
						inputControl.value = "";
						inputMMControl.selectedIndex = -1;
						inputDDControl.selectedIndex = -1;
						inputYYControl.selectedIndex = -1;												
					};
			 break;	
			case "TextArea":
				tElm.value = ObjDef.inputfields[q].defaultval;	
				tElm.disabled= false;	
//					tElm.style.backgroundColor = "#fff";
					tElm.style.color="#00F";
					tElm=tElm.parentNode;
//					tElm.style.backgroundColor = "#fff";						
						
			  break;			
			case "Checkbox":
	
			w=ObjDef.inputfields[q].src;

					if(ObjDef.inputfields[q].defaultval==true){
						tElm.checked=true;
						tElm.value=w[0].cmid;
					  }else{
						tElm.checked=false;
						tElm.value=w[1].cmid;
					};
					obj=tElm;
					while(obj.className != 'wifInputRadioContainer'){obj = obj.parentNode;};	
					z = nvxgWIF.getObjElementsByClassName('wifInputCheckboxLabel',obj );
					z[0].style.color = '#333';
					obj.disabled= false;	
										
			  break;

			case "CheckBoxGroup":
				for (oc=0;oc<ObjDef.inputfields[q].opt.length;oc++) {
					copt=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].opt[oc].id + "Input");
					if(ObjDef.inputfields[q].opt[oc].defaultval){
					  copt.checked = true;
					}else{
					  copt.checked = false;
					};
					parentObj = copt.parentNode
				};
				obj=tElm;
				while(obj.className != 'wifCheckBoxGroup'){obj = obj.parentNode;};		
				z = nvxgWIF.getObjElementsByClassName('wifInputCheckboxLabel',obj );					
					for (zi=0;zi<z.length;zi++) {
					z[zi].style.color = '#333';
				};				
		
				
			break;
			  
		};
		if(ObjDef.inputfields[q].src!=undefined && ObjDef.inputfields[q].src.length!=0){
			w =ObjDef.inputfields[q].src;
			if(w[0].onchange!=undefined){
				for (var j=0; j < w[0].onchange.length; j++){
					// SetRequired
					if(w[0].onchange[j].required!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[0].onchange[j].objid){break;};};
						requiredflag=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"InputRequired");															
							requiredflag.innerHTML = " ";	
							ObjDef.inputfields[gt].required = false;								
					};
					// SetDisplay
					if(w[0].onchange[j].display!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[0].onchange[j].objid){break;};};
						iContainer=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"InputContainer");
						iContainer.style.display="none";	
					};
				};
			};
		};
	};
},

// ****************************************************************************************************************
clearParticipantPreviewFields : function(ObjName) {
	var ObjDef=nvxgObjectDef[ObjName];
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type !="Hidden"){
			document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id + "Preview").innerHTML = "";			
		};
	};

},

// ****************************************************************************************************************
previewParticipantData : function (ObjName,rowIndex){
	
	csyml=null;		
	isother=null;
	isedevice=null;
	var ObjDef=nvxgObjectDef[ObjName];
	if(rowIndex==null || rowIndex== undefined){return false};
	var j = true;
	
	if(ObjDef.action!=null){
j=true
	};
	if(j){
		var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
		for (var i=0; i < tbody.rows.length; i++){
			tbody.rows[i].removeAttribute("selected");
		};
		tbody.rows[rowIndex].setAttribute("selected","selected");
		key = tbody.rows[rowIndex].getAttribute('key');
		e = epMultiEdit.findArrayIndex(ObjName,key);
		for (var q=0; q < ObjDef.inputfields.length; q++){	
		var t ='';var v ='';
		pObj=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id + "Preview");
			switch (ObjDef.inputfields[q].type){
				case "Select":
					v=" ";
					u=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey];
					if(u != undefined && u !=""){
						w =ObjDef.inputfields[q].src;
						for (var f=0; f < w.length; f++){
							if(w[f].cmid == u){
								v=w[f].label;
								break;
							};
						};					
						if(v == " "){v = " "};
						pObj.innerHTML = v;													
						pObj.setAttribute("OptionValueIndex",f);
						if(w[f].onchange!=undefined){
							for (var j=0; j < w[f].onchange.length; j++){
								elm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + w[f].onchange[j].objid +"PreviewContainer");																
								if(w[f].onchange[j].display){
									elm.style.display="";
								}else{
									elm.style.display="none";
								};						
							};
						};
						

						
						
					}else{
						pObj.innerHTML = " ";
					};
				break;
				case "Radio":
					u=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey];
					if(u != undefined){
						w =ObjDef.inputfields[q].src;
						for (var f=0; f < w.length; f++){
							if(w[f].cmid == u){v=w[f].label;break}	
						};
						pObj.innerHTML = v;													
						if(w[f].onchange!=undefined){
							for (var j=0; j < w[f].onchange.length; j++){
								elm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + w[f].onchange[j].objid +"PreviewContainer");																
								if(w[f].onchange[j].display){
									elm.style.display="";
								}else{
									elm.style.display="none";
								};						
							};
						};							
					}else{
						pObj.innerHTML = "";
					};
				break;
				case "Checkbox":
						u=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey];
						w =ObjDef.inputfields[q].src;
						pObj.innerHTML=u;
						parObj=pObj.parentNode;
						parObj=parObj.parentNode;
						if(Number(u) == ObjDef.inputfields[q].src[0].cmid){
							pObj.innerHTML = "&bull;&nbsp;" + ObjDef.inputfields[q].src[0].label;;																					
							parObj.style.display="";
						}else{
							parObj.style.display="none";	
						};	
			break;					
				case "Time":		
					var t = '';
					 if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]}
					pObj.innerHTML = t;			
				break;
				case "Date":		
					var t = '';
					if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey]}
					if(ObjDef.inputfields[q].sortas =="number"){
						clcss ="float: right !important; padding-right:5px !important";
						pObj.style.cssText = clcss;
					};
					pObj.innerHTML = t;		
				break;
				case "Calendar":
					var t = '';
					if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]}
					if(ObjDef.inputfields[q].sortas =="number"){
						clcss ="float: right !important; padding-right:5px !important";
						pObj.style.cssText = clcss;
					};
					pObj.innerHTML = t;			
				break;						
				case "Text":
					var t = '';
					if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]}
					if(ObjDef.inputfields[q].sortas =="number"){
						clcss ="float: right !important; padding-right:5px !important";
						if(Number(t)<0){clcss = clcss + "; color:#c00";}
						pObj.style.cssText = clcss;
					};
					pObj.innerHTML = t;			
				break;	
				case "Currency":
					numfixed=Math.abs(ObjDef.inputfields[q].numfixed,0);
					var t = '';
					if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]}
					if(numfixed!=undefined){
						clcss ="float: right !important; padding-right:5px !important";
						if(Number(t)<0){clcss = clcss + "; color:#c00";}
						if(ObjDef.inputfields[q].symbol==undefined){s=epMultiEdit.DefaultCurrency[0]}else{s=ObjDef.inputfields[q].symbol[0]};
						t=epMultiEdit.CommaFormatted(t);
						t=s+" "+ t;
						pObj.style.cssText = clcss;
					};
					pObj.innerHTML = t;			
				break;						
				case "TextArea":
					var t = '';
					 if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]}
					t = decodeURIComponent(t);
					pObj.innerHTML = t;			
				break;
				case "Checkbox":
					t= Number(ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey]);
					pObj.innerHTML = t;			
				break;
				case "CheckBoxGroup":
					w =ObjDef.inputfields[q].opt;
					var t = '';
					
					 if (ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]==""){t=' '}else{t=ObjDef.objdata[e][ObjDef.inputfields[q].objdatakey ]}
					T="";
					L=""
					for (oc=0;oc<t.length;oc++) {
						if(t[oc].checked){
							L=Number(L)+14;
							T=T+ "<span style='padding-left:4px;padding-right:8px;font-weight:bold'>&bull;</span>" + t[oc].label + "<br/>";
//							alert(ObjDef.inputfields[q].objdatakey+"-"+t[oc].label +"-"+ t[oc].checked);
						};
						if(w[oc].onchange!=undefined){
							for (ox=0;ox<w[oc].onchange.length;ox++) {
								elm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + w[oc].onchange[ox].objid +"PreviewContainer");
								if(t[oc].checked){
									elm.style.display = "";
								}else{
									elm.style.display = "none";
								};
							};
						}
					};
					
					//alert(T);
					objParent = pObj.parentNode
					pObj.style.cssText = "line-height:14px";
					objParent.style.height=(Number(L)+4) + "px";
					pObj.innerHTML = T +"<br class='wifClearFloat'/>";			
				break;				
				
			};
		};
		epMultiEdit.clearParticipantInputFields(ObjName);
		epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);		
		if(ObjDef.maximum == ObjDef.objdata.length){
			epMultiEdit.setToolBar(ObjName,false,true,true,false,false,false,false,false);							
		}else{
			epMultiEdit.setToolBar(ObjName,true,true,true,false,false,false,ObjDef.allowcloning,true);											
		};
		ObjDef.action = null;			
	};
	e = epMultiEdit.findArrayIndex(ObjName,key);
},

// ****************************************************************************************************************
editParticipantDataInline:function(e){
		var obj = epMultiEdit.getEventTarget(e);
		ObjName = obj.getAttribute("ObjName");
		editfldid = obj.getAttribute("editfldid");
		epMultiEdit.editParticipantData(ObjName);
		var ObjDef=nvxgObjectDef[ObjName];	
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if(ObjDef.inputfields[q].id == editfldid){break;}
		};
		switch (ObjDef.inputfields[q].type){
			case 'Select':
				//displayas:	"VertRadio",	//Select(default),VertRadio,HorzRadio,InlineRadio,Scale
				if(ObjDef.inputfields[q].displayas != undefined){
					if(ObjDef.inputfields[q].displayas=="Select"){
						editfldstr=ObjDef.objprefix + ObjDef.typeofoutput + 'INDEX_' + editfldid + 'Input';	
					}else{
						optionvalueindex = obj.getAttribute("optionvalueindex");
						editfldstr=ObjDef.objprefix + ObjDef.typeofoutput + 'NOTMAPPED_' + editfldid + 'InputRadio' + optionvalueindex;
					};
				};
			break;
			case 'Calendar':
				editfldstr=ObjDef.objprefix + ObjDef.typeofoutput + 'INDEX_' + editfldid + 'Input';	
				rbCalendar.openCalendar(editfldstr,'MM/DD/YYYY',365,1,0,0,0,-1,0);
				
			break;			


			default:
				editfldstr=ObjDef.objprefix + ObjDef.typeofoutput + 'INDEX_' + editfldid + 'Input';				
		};
		//alert(editfldstr);
		editfld = document.getElementById(editfldstr);
		try{
			editfld.focus();
			editfld.select()
		}catch(err){};

		
},

// ****************************************************************************************************************
editParticipantData : function (ObjName){

	
	var ObjDef=nvxgObjectDef[ObjName];	
	var rowIndex = ObjDef.selecteddataobjindex
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
	key = tbody.rows[rowIndex].getAttribute('key');
	ObjDef.updatekey = key;
	j = Number(epMultiEdit.findArrayIndex(ObjName,key));
	epMultiEdit.clearParticipantInputFields(ObjName);
	for (var q=0; q < ObjDef.inputfields.length; q++){
		tElm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
		switch (ObjDef.inputfields[q].type){
			case 'Select':
				if(ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ]==''){
					tElm.selectedIndex = -1;
				}else{
					tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey];						
					tElm.disabled = false;					
				};					
				epMultiEdit.onchangeActionsEvent(document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input"));
//%%%%%%%%%%%%%%%%%%%%%%%%%%%						
if(ObjDef.inputfields[q].displayas=="VertRadio" || ObjDef.inputfields[q].displayas=="HorzRadio"  || ObjDef.inputfields[q].displayas=="InlineRadio"){
	radopts=document.getElementsByName(ObjDef.objprefix + ObjDef.typeofoutput + "NOTMAPPED_" + ObjDef.inputfields[q].id + "InputRadio");
	//radopts=nvxgWIF.getObjElementsByClassName("DispalyAsRadio",document.getElementById(ObjName + "Container"));
	for (opi=0;opi<radopts.length;opi++) {
		radpar = radopts[opi].parentNode
		if(radopts[opi].value == ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey]){
			radpar.style.color = '#0000FF';
			radopts[opi].checked = true;
		}else{
			radpar.style.color = '#333333';
			radopts[opi].checked = false;
		};
	};	
	
};			
			
			
			break;
			case "Radio":
				if(ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ]!=''){
					u=ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];
					w=ObjDef.inputfields[q].src;
					for (var f=0; f < w.length; f++){
						if(w[f].cmid == u){break}	
					};
					obj= document.getElementsByName(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");						
					obj[f].checked = true;
					obj[f].click();
					epMultiEdit.onchangeActionsEvent(obj[f]);								
				};
			break;				
			case "Checkbox":
					u=ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];
					obj= document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
					if(ObjDef.inputfields[q].src[0].cmid==u){
						//obj.value = ObjDef.inputfields[q].src[0].cmid
						obj.checked=true;
						document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputLabel").style.color="#00F";
					}else{
						//obj.value = ObjDef.inputfields[q].src[1].cmid
						obj.checked=false;
						document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputLabel").style.color="#333";
					};
					epMultiEdit.onchangeActionsEvent(obj);			
			break;
			case "CheckBoxGroup":
				u=ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ]
				for (oc=0;oc<u.length;oc++) {
					copt=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].opt[oc].id + "Input");
					copt.checked = u[oc].checked;
				};
				for (oc=0;oc<u.length;oc++) {				
					copt=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].opt[oc].id + "Input");
					parentObj = copt.parentNode
					//if(copt.checked){parentObj.style.color='#0000FF'}else{parentObj.style.color='#333'}
					//<<nvxgWIF.clickCheckboxGroupCheckBox(copt);
					nvxgWIF.setMutuallyExclusiveDisplay(copt);
				};
				w=ObjDef.inputfields[q].opt;		
				for (oc=0;oc<u.length;oc++) {				
					if(w[oc].onchange!=undefined){
							for (ox=0;ox<w[oc].onchange.length;ox++) {
								rflg=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + w[oc].onchange[ox].objid +"InputRequired");
								elm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + w[oc].onchange[ox].objid +"InputContainer");
								chk=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + w[oc].onchange[ox].objid +"Input");								
								if(w[oc].onchange[ox].display !=undefined){
									if(w[oc].onchange[ox].display && u[oc].checked){
										elm.style.display = "";
										nvxgWIF.setMutuallyExclusiveDisplay(chk);
									}else{
										elm.style.display = "none";
									};
								};
								
								if(w[oc].onchange[ox].required!=undefined){
									for (var oi=0; oi < ObjDef.inputfields.length; oi++){if(ObjDef.inputfields[oi].id==w[oc].onchange[ox].objid){break;};};
									if(w[oc].onchange[ox].required && u[oc].checked){
										ObjDef.inputfields[oi].required = true;
										elm.setAttribute("clonerequired","true");
										rflg.innerHTML = "♦";
									}else{
										ObjDef.inputfields[oi].required = false;
										elm.setAttribute("clonerequired","false");
										rflg.innerHTML = " ";
									};
								};
								
								
							};
						};
				};

/*
					if(w[f].onchange[j].required!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						requiredflag=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"InputRequired");															
						requiredelm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");																					
						if(w[f].onchange[j].required ){
							requiredflag.innerHTML = "♦";
							ObjDef.inputfields[gt].required = true;
							requiredelm.setAttribute("clonerequired","true");
						}else{
							requiredflag.innerHTML = " ";	
							ObjDef.inputfields[gt].required = false;		
							requiredelm.setAttribute("clonerequired","false");													
						};
					};
*/					
						



				
			break;
			case "Calendar":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				hint= tElm.getAttribute("hint");
				if(hint != undefined && tElm.value ==""){tElm.value =hint};
				if(hint != undefined && tElm.value == hint){
					tElm.style.color="#cdcdcd";				
					tElm.setAttribute("sdate",null);
				}else{
					tElm.style.color="#00f";				
					sd=tElm.value.split("/");
					if(sd[0].length==1){sd[0]="0"+sd[0]};
					if(sd[1].length==1){sd[1]="0"+sd[1]};
					tElm.value=sd[0] + "/" + sd[1] + "/" +sd[2];
					tElm.setAttribute("sdate",sd[2] + "" + sd[0] + "" + sd[1] );
				};					
			break;
			case "Text":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				hint= tElm.getAttribute("hint");
				if(hint != undefined && tElm.value == ObjDef.inputfields[q].defaultval){
					tElm.value = hint;
					tElm.style.color="#cdcdcd";				
				}else{
					tElm.style.color="#00f";
				};					
			break;
			case "Currency":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				hint= tElm.getAttribute("hint");
				if(hint != undefined && tElm.value == ObjDef.inputfields[q].defaultval){
					tElm.value = hint;
					tElm.style.color="#cdcdcd";				
				}else{
					tElm.style.color="#00f";				
				};					
			break;
			case "Time":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				str = tElm.value
				h=str.substring(0,2);
				m=str.substring(3,5);
				a=str.substring(6,9);					
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_hrs").value =h;
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_mns").value =m;
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_aps").value = a;
			break;
			case 'Date':
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				str = tElm.value
				if(str.indexOf("/")!=-1){
				cal = str.split("/");
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_MONTH").value =cal[0];
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_DAY").value =cal[1];
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_YEAR").value = cal[2];
				};
			break;
			case "TextArea":
				t = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];;
				t = decodeURIComponent(t);
				t=t.replace(/<br\/>/g, "\n");
				tElm.value = t;								
			break;					
		};

	};
	epMultiEdit.setToolBar(ObjName,false,false,false,false,true,true,false,false);	
	epMultiEdit.setPanelDisplay(ObjName,ObjDef.displayinput);		
	nvxgObjectDef[ObjName].action = epMultiEdit.EditAction;
	nvxgObjectDef[ObjName].action=1;
	epMultiEdit.setFirstElement(ObjName);
},

// ****************************************************************************************************************
cloneParticipantData : function (ObjName){
	var ObjDef=nvxgObjectDef[ObjName];	
	var rowIndex = ObjDef.selecteddataobjindex
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
	key = tbody.rows[rowIndex].getAttribute('key');
	ObjDef.updatekey = key;
	j = Number(epMultiEdit.findArrayIndex(ObjName,key));
	epMultiEdit.clearParticipantInputFields(ObjName);
	for (var q=0; q < ObjDef.inputfields.length; q++){
	if(ObjDef.inputfields[q].clone){	
		if(ObjDef.inputfields[q].locked ==undefined){ObjDef.inputfields[q].locked=false};
		tElm=document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
		switch (ObjDef.inputfields[q].type){
			case 'Select':
				if(ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ]==''){
					tElm.selectedIndex = -1;
				}else{
					tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];						
					tElm.disabled = false;
					
				};					
				epMultiEdit.onchangeActionsEvent(document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input"));
				if(ObjDef.inputfields[q].locked){
					tElm.disabled = true;
					tElm.style.backgroundColor = "#eee";
					tElm.style.color="#666";
					tElm=tElm.parentNode;
					tElm.style.backgroundColor = "#eee";					
					};

					
			break;
/*
			case "Radio":
				if(ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ]!=''){
					u=ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];
					w=ObjDef.inputfields[q].src;
					for (var f=0; f < w.length; f++){
						if(w[f].cmid == u){break}	
					};
					obj= document.getElementsByName(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");						
					obj[f].checked = true;
					obj[f].click();
					if(ObjDef.inputfields[q].locked){obj[f].disabled = true;};
				};
			break;				
*/
			case "Checkbox":
					u=ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];
					obj= document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input");
					if(ObjDef.inputfields[q].src[0].cmid==u){
						obj.value = ObjDef.inputfields[q].src[0].cmid
						obj.checked=true;
						document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputLabel").style.color="#00F";
					}else{
						obj.value = ObjDef.inputfields[q].src[1].cmid
						obj.checked=false;
						document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "InputLabel").style.color="#333";
					};
					if(ObjDef.inputfields[q].locked){obj.disabled = true;};					
					epMultiEdit.onchangeActionsEvent(obj);			
			break;
			case "Calendar":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				hint= tElm.getAttribute("hint");
				if(hint != undefined && tElm.value ==""){tElm.value =hint};
				if(hint != undefined && tElm.value == hint){
					tElm.style.color="#cdcdcd";				
					tElm.setAttribute("sdate",null);
				}else{
					tElm.style.color="#00f";				
					sd=tElm.value.split("/");
					if(sd[0].length==1){sd[0]="0"+sd[0]};
					if(sd[1].length==1){sd[1]="0"+sd[1]};
					tElm.value=sd[0] + "/" + sd[1] + "/" +sd[2];
					tElm.setAttribute("sdate",sd[2] + "" + sd[0] + "" + sd[1] );
				};					
			break;
			case "Text":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				hint= tElm.getAttribute("hint");
				if(hint != undefined && tElm.value == ObjDef.inputfields[q].defaultval){
					tElm.value = hint;
					tElm.style.color="#cdcdcd";				
				}else{
					tElm.style.color="#00f";
				};			
				if(ObjDef.inputfields[q].locked){
					tElm.disabled = true;
					tElm.style.backgroundColor = "#eee";
					tElm.style.color="#666";
					tElm=tElm.parentNode;
					tElm.style.backgroundColor = "#eee";					
				};						
			break;
			case "Currency":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				hint= tElm.getAttribute("hint");
				if(hint != undefined && tElm.value == ObjDef.inputfields[q].defaultval){
					tElm.value = hint;
					tElm.style.color="#cdcdcd";				
				}else{
					tElm.style.color="#00f";				
				};
				if(ObjDef.inputfields[q].locked){tElm.disabled = true;};										
			break;
			case "Time":
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				str = tElm.value
				h=str.substring(0,2);
				m=str.substring(3,5);
				a=str.substring(6,9);					
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_hrs").value =h;
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_mns").value =m;
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_aps").value = a;
			break;
			case 'Date':
				tElm.value = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];								
				str = tElm.value
				if(str.indexOf("/")!=-1){
				cal = str.split("/");
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_MONTH").value =cal[0];
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_DAY").value =cal[1];
				document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[q].id + "Input_YEAR").value = cal[2];
				};
			break;
			case "TextArea":
				t = ObjDef.objdata[j][ObjDef.inputfields[q].objdatakey ];;
				t = decodeURIComponent(t);
				t=t.replace(/<br\/>/g, "\n");
				tElm.value = t;	
				if(ObjDef.inputfields[q].locked){
					tElm.disabled = true;
					tElm.style.backgroundColor = "#eee";
					tElm.style.color="#666";
					tElm=tElm.parentNode;
					tElm.style.backgroundColor = "#eee";					
				};												
			break;					
		};
	};
	};
	epMultiEdit.setToolBar(ObjName,false,false,false,true,false,true,false,false);	
	epMultiEdit.setPanelDisplay(ObjName,ObjDef.displayinput);		
	nvxgObjectDef[ObjName].action = epMultiEdit.EditAction;
	nvxgObjectDef[ObjName].action=1;
	epMultiEdit.setFirstElement(ObjName);
},


// ****************************************************************************************************************
clearUIList : function(ObjName) {
	var ObjDef=nvxgObjectDef[ObjName];	
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
	x = tbody.rows.length;
	for (var i=0; i < x; i++){
		tbody.removeChild(tbody.rows[0]);
	};
	nvxgObjectDef[ObjName].selecteddataobjindex = 0;		
},

// ****************************************************************************************************************	
deleteParticipantData : function (ObjName){
	var ObjDef=nvxgObjectDef[ObjName];	
	
	

			
	var rowIndex = ObjDef.selecteddataobjindex;
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
	key = tbody.rows[rowIndex].getAttribute('key');
	ekjhlkj = epMultiEdit.findArrayIndex(ObjName,key);
	roleStr = "";

	temp = ObjDef.objdata[ekjhlkj][ObjDef.deletesortdatakey];			
	tmsg = ObjDef.deletemsg.replace( new RegExp( "XXXXX", "gi" ), roleStr.toLowerCase());		
	msg = tmsg.replace( new RegExp( "~", "gi" ), temp );		
	j = confirm(msg);
	if(j){
		epMultiEdit.clearParticipantInputFields(ObjName);
		epMultiEdit.clearParticipantPreviewFields(ObjName);
		for (var i=0; i < ObjDef.objdata.length; i++){
			v = ObjDef.objdata[i][ObjDef.sortdatakey];
			if(v==""){v=" "};	
			ObjDef.objdata[i].sortval=v;
			if(ekjhlkj==i){ObjDef.objdata[ekjhlkj].sortval = 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ';}; //	reset sort value
		};
		temps=ObjDef.sortdatakey;
		ObjDef.sortdatakey=  ObjDef.deletesortdatakey;
		epMultiEdit.sortDataObj(ObjName,true);	
		if(ObjDef.sortdataorder){
			ObjDef.objdata.shift();
		}else{
			ObjDef.objdata.pop();
		};
		
		ObjDef.sortdatakey=  temps
		epMultiEdit.sortDataObj(ObjName);	
		epMultiEdit.writeParticipantRows(ObjName);
		ObjDef.selecteddataobjindex = null;	
		ObjDef.objcount = ObjDef.objcount - 1;
		TabItemCounter = document.getElementById(ObjName + "ItemTabCounter");
		if(TabItemCounter != undefined){
			TabItemCounter.innerHTML = ObjDef.objcount;
			if(ObjDef.objcount > 0){
				TabItemCounter.style.display = "";
			}else{
				TabItemCounter.style.display = "none";			
			};
		};			
		if(ObjDef.objcount == 0){
			for (var q=0; q < ObjDef.inputfields.length; q++){
				if(ObjDef.inputfields[q].totalcalctarg !=undefined){document.getElementById(ObjDef.inputfields[q].totalcalctarg).value = ""};
			};
			if(ObjDef.minimum > 0){
				epMultiEdit.setPanelDisplay(ObjName,ObjDef.displayinput);
				epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);							
				epMultiEdit.setFirstElement(ObjName);
				epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,true);									
				
			}else{
				epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,false);									
			};
			if(ObjDef.minimum > 0){	
					if(ObjDef.allowimport==true && ObjDef.objcount == 0){
					document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';	
					document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';	
					epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,true);									
					
				}else{
					document.getElementById(ObjDef.objprefix + "EditPanel").style.display = '';	
					epMultiEdit.setFirstElement(ObjName);	
					epMultiEdit.setToolBar(ObjName,false,false,false,true,false,false,false,false);		
				};
			}else{
				document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';		
				document.getElementById(ObjDef.objprefix + "AddEnabled").focus();	
					epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,true);		
			};
			
			document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';			
			nvxgObjectDef[ObjName].action = null;			
		}else{
			epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);							
			epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,false);				
			if(ObjDef.allowimport==true || ObjDef.allowclone==true){
				if(ObjDef.allowimport==true && ObjDef.objcount < ObjDef.maximum && ObjDef.minimum > 0){				
					epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,ObjDef.allowclone,ObjDef.allowimport);		
					document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';	
					document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';	
					ObjDef.action =0;					
				};
			}else{
	if(ObjDef.minimum > 0){	
			if(ObjDef.allowimport==true && ObjDef.objcount == 0){
			document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';	
			document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';	
			epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,true);									
			
		}else{
			document.getElementById(ObjDef.objprefix + "EditPanel").style.display = '';	
			epMultiEdit.setFirstElement(ObjName);	
			epMultiEdit.setToolBar(ObjName,false,false,false,true,false,false,false,false);		
		};
	}else{
		document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';		
		document.getElementById(ObjDef.objprefix + "AddEnabled").focus();	
			epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,true);		
	};
	
	document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';			
	nvxgObjectDef[ObjName].action = null;				
			};
			
		};
	};
	document.getElementById(ObjName + "Container").scrollIntoView();	

	
				if(nvxgWIF.isDevMode){nvxgWIF.refreshQAVariables();};		

},

// ****************************************************************************************************************
addParticipant : function (ObjName,rowIndex,sRole,sRelationship){
	var ObjDef=nvxgObjectDef[ObjName];
	if(rowIndex==null){rowIndex=undefined }
	epMultiEdit.clearParticipantInputFields(ObjName);
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
	for (var i=0; i < tbody.rows.length; i++){tbody.rows[i].style.backgroundColor = '';};
	ObjDef.selecteddataobjindex = null;
	epMultiEdit.setPanelDisplay(ObjName,ObjDef.displayinput);
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type !="Hidden"){break;};
	};
	epMultiEdit.setToolBar(ObjName,false,false,false,true,false,true,false,false);

	document.getElementById(ObjName + "Container").scrollIntoView();
	ObjDef.action=1;
	epMultiEdit.setFirstElement(ObjName);
},
// ****************************************************************************************************************
cancelButton : function (ObjName){
	var ObjDef=nvxgObjectDef[ObjName];		
	c = true;
	if(c){
		msg = "Are you sure you want to cancel your edits?"
		j = confirm(msg);
		if(j){
			ObjDef.action = null;
			if(ObjDef.selecteddataobjindex == null){
				epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);						
				epMultiEdit.clearParticipantInputFields(ObjName);
				epMultiEdit.clearParticipantPreviewFields(ObjName);						
				ObjDef.action = null;							
			  }else{
				epMultiEdit.previewParticipantData(ObjName,ObjDef.selecteddataobjindex);	
			};
			if(ObjDef.maximum ==  ObjDef.objdata.length){
				epMultiEdit.setToolBar(ObjName,false,true,true,false,false,false,false,true);
			  }else{
				epMultiEdit.setToolBar(ObjName,true,true,true,false,false,false,false,true);						
				document.getElementById(ObjDef.objprefix + "AddEnabled").focus();
			};				
			document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';	
			document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';			
			ObjDef.action = null;	
			document.getElementById(ObjName + "Container").scrollIntoView();					
		};
	}else{
		if(ObjDef.maximum == ObjDef.objdata.length){
			epMultiEdit.setToolBar(ObjName,false,false,false,false,true,true,false,false);
		}else{
			epMultiEdit.setToolBar(ObjName,true,false,false,false,false,false,false,false);
			document.getElementById(ObjDef.objprefix + "AddEnabled").focus();
		};
		epMultiEdit.clearParticipantInputFields(ObjName);
		epMultiEdit.clearParticipantPreviewFields(ObjName);
		epMultiEdit.setPanelDisplay(ObjName,ObjDef.displaypreview);


		
	};
},
// ****************************************************************************************************************
setToolBar : function(ObjName,bAdd,bEdit,bDelete,bInsert,bUpdate,bCancel,bClone,bImport) {
	var ObjDef=nvxgObjectDef[ObjName];		

//	if(ObjDef.allowimport && ObjDef.objdata.length==0){bImport=true};
	
if(ObjDef.objcount >= ObjDef.maximum){bAdd=false};
if(ObjDef.allowcloning){if(ObjDef.objcount >= ObjDef.maximum){bImport=false};};
	
	if(bClone == undefined){bClone=false};
	var e = document.getElementById(ObjDef.objprefix + "AddEnabled");var d = document.getElementById(ObjDef.objprefix + "AddDisabled");		
	if(bAdd){e.style.display = '';d.style.display = 'none';}else{e.style.display = 'none';d.style.display = '';};

	var e = document.getElementById(ObjDef.objprefix + "EditEnabled");	var d = document.getElementById(ObjDef.objprefix + "EditDisabled");
	if(bEdit){e.style.display = '';d.style.display = 'none'}else{e.style.display = 'none';d.style.display = ''};

	var e = document.getElementById(ObjDef.objprefix + "DeleteEnabled");	var d = document.getElementById(ObjDef.objprefix + "DeleteDisabled");		
	if(bDelete){e.style.display = '';d.style.display = 'none'}else{e.style.display = 'none';d.style.display = ''};

	var e = document.getElementById(ObjDef.objprefix + "InsertEnabled");	var d = document.getElementById(ObjDef.objprefix + "InsertDisabled");		
	if(bInsert){e.style.display = '';d.style.display = 'none'}else{e.style.display = 'none';d.style.display = ''};

	var e = document.getElementById(ObjDef.objprefix + "UpdateEnabled");	var d = document.getElementById(ObjDef.objprefix + "UpdateDisabled");		
	if(bUpdate){e.style.display = '';d.style.display = 'none'}else{e.style.display = 'none';d.style.display = ''};



	var e = document.getElementById(ObjDef.objprefix + "CancelEnabled");	var d = document.getElementById(ObjDef.objprefix + "CancelDisabled");				
	if(bCancel){e.style.display = '';d.style.display = 'none'}else{e.style.display = 'none';d.style.display = ''};

/*
	if(ObjDef.allowcloning){
		var e = document.getElementById(ObjDef.objprefix + "CloneEnabled");	var d = document.getElementById(ObjDef.objprefix + "CloneDisabled");
		if(bClone){e.style.display = '';d.style.display = 'none';}else{e.style.display = 'none';d.style.display = '';};
	}else{
		var e = document.getElementById(ObjDef.objprefix + "CloneEnabled");	var d = document.getElementById(ObjDef.objprefix + "CloneDisabled");		
		bClone = false;e.style.display = '';d.style.display = 'none';e.style.display = 'none';d.style.display = 'none';		
	};
*/
			
	if(ObjDef.allowimport){
		var e = document.getElementById(ObjDef.objprefix + "ImportEnabled");	var d = document.getElementById(ObjDef.objprefix + "ImportDisabled");	
		if(bImport && ObjDef.AllowImport > 0){e.style.display = '';d.style.display = 'none';}else{e.style.display = 'none';d.style.display = '';};
	};


	if(bAdd || bEdit || bDelete || bImport){
		document.getElementById(ObjName + "RecordToolBar").style.display="";
	}else{
		document.getElementById(ObjName + "RecordToolBar").style.display="none";		
	};
	if(bInsert || bUpdate || bCancel){
		document.getElementById(ObjName + "EditToolBar").style.display="";
	}else{
		document.getElementById(ObjName + "EditToolBar").style.display="none";		
	};	
	
	
	
},
// ****************************************************************************************************************
setPanelDisplay : function(ObjName,p) {	
	var ObjDef=nvxgObjectDef[ObjName];					
	if(p){
		document.getElementById(ObjDef.objprefix + "EditPanel").style.display = '';	
		document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = 'none';	
	}else{
		document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';
		document.getElementById(ObjDef.objprefix + "PreviewPanel").style.display = '';		
	}
	
if(ObjDef.objcount > ObjDef.maximum){document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';};
if(ObjDef.allowcloning){if(ObjDef.objcount > ObjDef.maximum){document.getElementById(ObjDef.objprefix + "EditPanel").style.display = 'none';};};
	
	
},	
// ****************************************************************************************************************
createTableCell : function(elmDef,eo,txtValue,csstext,action,altcoldisplay) {
	
	var newCELL = document.createElement('td');	
	var newUL = document.createElement('ul');	
	var newLI = document.createElement('li');	
	newCELL.setAttribute('title',txtValue);		
	if(elmDef!=undefined){
		if(elmDef!=null){			
			if(elmDef.sortas=="number"){
				licsstext = "float:right !important; padding-right:5px !important;"
				if(Number(txtValue)<0){licsstext = licsstext + "color:#c00;";}
				newLI.style.cssText =licsstext;
				newLI.style.display="block";
				newLI.style.width="100%";
				newLI.style.textAglin="right";					
				newUL.style.width="100%";
				newUL.style.textAlign="right";

										

				if(elmDef.type=="Currency" && txtValue!=" "){txtValue=epMultiEdit.CommaFormatted(txtValue);txtValue = elmDef.symbol[0] + " " + txtValue ;};

			};
		};
	};

	var text = document.createTextNode('');
	newLI.appendChild(text);
	if(txtValue==""){txtValue=" "};
	if(altcoldisplay!="undefined" && altcoldisplay!=undefined){txtValue = altcoldisplay;};

	
	
	
	newLI.innerHTML=txtValue;
	newUL.appendChild(newLI);
	if(eo==0){cellcsstext = "";}
//	if(eo==1){cellcsstext = "background-image:url(images/row01.png) !important";}
//	if(eo==2){cellcsstext = "background-image:url(images/row02.png) !important";}
//	if(csstext != undefined){cellcsstext = cellcsstext + csstext}	
	if(csstext != undefined){newCELL.style.cssText =csstext};
	newCELL.appendChild(newUL);
	if(action!=false){
		newCELL.onclick = epMultiEdit.clickTableRow;
		newCELL.ondblclick = epMultiEdit.doubleclickTableRow;	
	};
return newCELL;
},

// ****************************************************************************************************************
clickTableRow : function(e) {
	var cCell = epMultiEdit.getEventTarget(e);
	while(cCell.tagName != 'TR'){cCell = cCell.parentNode};
	q = cCell.rowIndex-1;
	var t = epMultiEdit.getEventTarget(e);
	while(t.tagName != 'TABLE'){t = t.parentNode};
	ObjName = t.getAttribute("ObjName");
	nvxgObjectDef[ObjName].selecteddataobjindex = q;
	epMultiEdit.previewParticipantData(ObjName,q);
},

// ****************************************************************************************************************
doubleclickTableRow : function(e) {
	var cCell = epMultiEdit.getEventTarget(e);
	while(cCell.tagName != 'TR'){cCell = cCell.parentNode};
	q = cCell.rowIndex-1;
	var t = epMultiEdit.getEventTarget(e);
	while(t.tagName != 'TABLE'){t = t.parentNode};
	ObjName = t.getAttribute('ObjName');
	nvxgObjectDef[ObjName].selecteddataobjindex = q;
	epMultiEdit.editParticipantData(ObjName);
},

// ****************************************************************************************************************
findArrayIndex : function(ObjName,key) {
	var ObjDef=nvxgObjectDef[ObjName];	
	var e = null;
	for (var i=0; i < ObjDef.objdata.length; i++){
		if(ObjDef.objdata[i].key == key){e=i;break;}
	};
	return e;
},

// ****************************************************************************************************************
findKeyRowIndex : function(ObjName,key) {
	var ObjDef=nvxgObjectDef[ObjName];			
	var index = null;
	var tbody = document.getElementById(ObjDef.objprefix + "UIListTBody");
	for (var i=0; i < tbody.rows.length; i++){
		t = tbody.rows[i].getAttribute('key')
		t = parseInt(t);
		if(t == key){index = i; break};
	};
	return index;
},

// ****************************************************************************************************************	
trimString :function(inputString) {
	if (typeof inputString != "string") { return inputString; }
	var retValue = inputString;
	var ch = retValue.substring(0, 1);
	while (ch == " ") { 
	 retValue = retValue.substring(1, retValue.length);
	 ch = retValue.substring(0, 1);
	};
	ch = retValue.substring(retValue.length-1, retValue.length);
	while (ch == " ") { 
	 retValue = retValue.substring(0, retValue.length-1);
	 ch = retValue.substring(retValue.length-1, retValue.length);
	};
	while (retValue.indexOf("  ") != -1) { 
	 retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
	};
	return retValue; 
},	
		
// ****************************************************************************************************************
	sortDataObj : function(ObjName,isDelete) {

		var ObjDef=nvxgObjectDef[ObjName];	
		field="sortval"
		descending= nvxgObjectDef[ObjName].sortdataorder;
		// ** Set datd for the sort
			if(isDelete){
				ObjDef.sortdatakey = "sortval";
				
			}else{
				for (var q=0; q < ObjDef.inputfields.length; q++){if(ObjDef.inputfields[q].objdatakey==ObjDef.sortdatakey){sortkeyobj=ObjDef.inputfields[q];break};};
				switch(sortkeyobj.type){
					case "TextArea":
						for (var i=0; i < ObjDef.objdata.length; i++){
							v = ObjDef.objdata[i][ObjDef.sortdatakey];				
							v=v.replace(/\r\n|\r|\n/g,"~");
							var v = v.replace(/<\/?[^>]+(>|$)/g, "");
							v = v.replace( new RegExp( "~", "gi" ), "<br/>" );
							v = encodeURIComponent(t);
							ObjDef.objdata[i].sortval=v;
						};
					  break;
					case "Checkbox":
						for (var i=0; i < ObjDef.objdata.length; i++){
							v = Number(ObjDef.objdata[i][ObjDef.sortdatakey]);				
							w =ObjDef.inputfields[q].src;
							for (var f=0; f < w.length; f++){if(w[f].cmid == v){break;};};	
							l=w[f].sortval;
							ObjDef.objdata[i].sortval=l;
						};
					  break;
					case "Radio":
						for (var i=0; i < ObjDef.objdata.length; i++){
							if(ObjDef.inputfields[q].sortas !="string"){
								v = Number(ObjDef.objdata[i][ObjDef.sortdatakey]);				
							}else{
								v = ObjDef.objdata[i][ObjDef.sortdatakey];				
							};
							w =ObjDef.inputfields[q].src;
							for (var f=0; f < w.length; f++){if(w[f].cmid == v){break;};};	
							l=w[f].label;
							if(l != undefined){
								if (l.toUpperCase()in epMultiEdit.BottomSortValues){l="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"+l;};						
							}else{l="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"};
							ObjDef.objdata[i].sortval=l;
						};
					  break;
					case 'Select':
						for (var i=0; i < ObjDef.objdata.length; i++){
							if(ObjDef.inputfields[q].sortas !="string"){
								v = Number(ObjDef.objdata[i][ObjDef.sortdatakey]);				
							}else{
								v = ObjDef.objdata[i][ObjDef.sortdatakey];				
							};						w =ObjDef.inputfields[q].src;
							if(v!=""){
								for (var f=0; f < w.length; f++){if(w[f].cmid == v){break;};};	
								l=w[f].label;
							}else{
								l=" ";
							}
							if(l != undefined){
								if (l.toUpperCase()in epMultiEdit.BottomSortValues){l="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"+l;};						
							}else{l="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"};
							ObjDef.objdata[i].sortval=l;
						};
					break;
					case 'Currency':
						for (var i=0; i < ObjDef.objdata.length; i++){
							v = ObjDef.objdata[i][ObjDef.sortdatakey];				
							ObjDef.objdata[i].sortval=Number(v);
						};
					break;
					case 'Calendar':
						for (var i=0; i < ObjDef.objdata.length; i++){
							s = ObjDef.objdata[i][ObjDef.sortdatakey];				
							sd=s.split("/");
							var v=new Date();
							v.setFullYear(Number(sd[2]),Number(sd[0])-1,Number(sd[1]));
							ObjDef.objdata[i].sortval=v;
						};
					break;								
					
					default:	// Text, Hidden
						for (var i=0; i < ObjDef.objdata.length; i++){
							v = ObjDef.objdata[i][ObjDef.sortdatakey];
							if(v==""){v=" "};	
							if(v != undefined){
								if (v.toUpperCase()in epMultiEdit.BottomSortValues){v="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"+v;};						
							}else{v="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"};
							ObjDef.objdata[i].sortval=v;
					};
				};
			};			
	// -------------------------------------------------------------------------------------------------	
	function sortStrings(a,b) { return a[field].toLowerCase().localeCompare(b[field].toLowerCase()); }
	function sortNumbers(a,b){ return a[field] - b[field]; }
	function sortBool(a,b) { return sortNumbers(b,a); }
	if(ObjDef.objdata.length !=0){
		if(ObjDef.sortas==undefined){ObjDef.sortas='string'};
		switch(ObjDef.sortas){
			case 'string' :ObjDef.objdata.sort(sortStrings);break;
			case 'number' :ObjDef.objdata.sort(sortNumbers); break;
			case 'boolean'	: ObjDef.objdata.sort(sortBool);break;
			default	: alert('Unable to preform object sort.');
		};
		if (descending) ObjDef.objdata.reverse();
	};
},
	
// ****************************************************************************************************************
getEventTarget : function(e) {
	var targ;
	if (!e) {e = window.event;}if (e.target){targ = e.target;} else if (e.srcElement) {targ = e.srcElement;}
	try{
	if (targ.nodeType == 3) {targ = targ.parentNode;	};
	}catch(err){
	
	}	
	
return targ;
},

// ****************************************************************************************************************
createElement : function(element) {
	if (typeof document.createElementNS != 'undefined') {
		return document.createElementNS('http://www.w3.org/1999/xhtml', element);
	};
	if (typeof document.createElement != 'undefined') {
		return document.createElement(element);
	};
	return false;
},

// ****************************************************************************************************************
getObjElementsByClassName : function(className,obj) {
	if(obj == undefined || obj == '' || obj == null){obj = document};
	var children = obj.getElementsByTagName('*') || obj.all;
	var elements = new Array();
	for (var i = 0; i < children.length; i++) {
		var child = children[i];
		var classNames = child.className.split(' ');
		for (var j = 0; j < classNames.length; j++) {
			if (classNames[j] == className) {
				elements.push(child);
				break;
			};
		};
	};
	return elements;
},

// ****************************************************************************************************************
clearObjectChildNodes : function(obj){
	d=obj.id;
	x = obj.childNodes.length;
	for (var i=0; i < x; i++){
		obj.removeChild(obj.childNodes[0])
	};
},	
	
// ****************************************************************************************************************
onchangeActions:function(e){
		var obj = epMultiEdit.getEventTarget(e);
		epMultiEdit.onchangeActionsEvent(obj);
},
// ****************************************************************************************************************
onkeySetBlockLabel:function(e){
		var obj = epMultiEdit.getEventTarget(e);
		epMultiEdit.setBlockLabel(obj);
},


// ****************************************************************************************************************
onchangeActionsEvent:function(obj){	

	epMultiEdit.setBlockLabel(obj);
	objContainer=obj
	while(objContainer.className != 'MultiRecordEditorDisplayPanel' && objContainer.className !="MultiRecordCloneBlock"){objContainer = objContainer.parentNode};	
	sourceHtmlType=obj.tagName.toUpperCase();
	if(sourceHtmlType=="INPUT"){sourceHtmlType=obj.type.toUpperCase()}
	ObjName=obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];		
	inputfieldid=obj.getAttribute("inputfieldid");
	if(ObjName!=null){
		for (var qx=0; qx < ObjDef.inputfields.length; qx++){
			if(ObjDef.inputfields[qx].id==inputfieldid){break};
		};
		w =ObjDef.inputfields[qx].src;
		//CheckBoxGroup as the "TRIGGER"		
		if(ObjDef.inputfields[qx].type =="CheckBoxGroup"){
			
			B=obj.getAttribute("inputfieldidB");
			elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ B +"Input");
			for (var f=0; f < w.length; f++){if(B==w[f].id){break;};};
			if(w[f].onchange!=undefined){
				for (var j=0; j < w[f].onchange.length; j++){
					if(w[f].onchange[j].display!=undefined){
						iContainer=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"InputContainer");	
						ielm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");				
						if(w[f].onchange[j].display && elm.checked){
							iContainer.style.display = "";
						}else{	
							iContainer.style.display = "none";	
							if(ielm!=undefined){if(ielm.tagName == "SELECT"){ielm.selectedIndex = -1;}else{ielm.value = ""};};
						};
					};
					if(w[f].onchange[j].required!=undefined){
						requiredflag=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"InputRequired");															
						requiredelm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");																					
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						if(w[f].onchange[j].required && elm.checked){
							requiredflag.innerHTML = "♦";
							ObjDef.inputfields[gt].required = true;
							requiredelm.setAttribute("clonerequired","true");
						}else{
							requiredflag.innerHTML = " ";	
							ObjDef.inputfields[gt].required = false;		
							requiredelm.setAttribute("clonerequired","false");						
						};
					};
				};
			};
			return;
		};


		for (var f=0; f < w.length; f++){
			if(w[f].onchange!=undefined && w[f].cmid==obj.value){
//				try{
		
				for (var j=0; j < w[f].onchange.length; j++){
					// SetRequired
					try{
		
					if(w[f].onchange[j].required!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						requiredflag=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"InputRequired");															
						requiredelm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");																					
						if(w[f].onchange[j].required ){
							requiredflag.innerHTML = "♦";
							ObjDef.inputfields[gt].required = true;
							requiredelm.setAttribute("clonerequired","true");
						}else{
							requiredflag.innerHTML = " ";	
							ObjDef.inputfields[gt].required = false;		
							requiredelm.setAttribute("clonerequired","false");													
						};
					};
					 }catch(err){};
					// SetDefaultValue
					if(w[f].onchange[j].val!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");															
						if(w[f].onchange[j].type!="Calendar"){
							elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input","INPUT");															
							if(Object.prototype.toString.call(w[f].onchange[j].val) == "[object Array]"){
								elm.value=w[f].onchange[j].val[0] + "/" + w[f].onchange[j].val[1] + "/" + w[f].onchange[j].val[2];
								sDate = w[f].onchange[j].val[2] + "" + w[f].onchange[j].val[0] + "" + w[f].onchange[j].val[1];
								elm.setAttribute("sdate",sDate);					
							}else{
								Df=w[f].onchange[j].val;
								if(Df.toUpperCase()=="NOW"){
									d=rbCalendar.serializeNow();
									right_year 	= (d.substring(0,4));
									month_num 	= (d.substring(4,6));
									thedate 	= (d.substring(6,8));
									elm.value= month_num + "/" + thedate + "/" + right_year;
									sDate = right_year + "" + month_num + "" + thedate;
									elm.setAttribute("sdate",sDate);		
								};
							};
							elm.style.color="#00f";									
						}else{
							elm.value = w[f].onchange[j].val;
						};
					};					
					// SetLabel
					if(w[f].onchange[j].label!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						elmlabel=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"InputERRTXT");															
						elmlabel.innerHTML = w[f].onchange[j].label;
					};					
					// SetSecondary List Values
					if(w[f].onchange[j].src!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");															
						elm.options.length=0;
						for (opt=0;opt<w[f].onchange[j].src.length;opt++) {
							var newOption = document.createElement('option');	
							newOption.setAttribute('value',w[f].onchange[j].src[opt].cmid);
							if(w[f].onchange[j].src[opt].title==undefined){newOption.setAttribute('title',w[f].onchange[j].src[opt].label)}else{newOption.setAttribute('title',w[f].onchange[j].src[opt].title)};		
							var text = document.createTextNode(w[f].onchange[j].src[opt].label);
							if(w[f].onchange[j].src[opt].csstext != undefined){
								newOption.style.cssText = w[f].onchange[j].src[opt].csstext;
							};
							newOption.appendChild(text);							
							elm.appendChild(newOption);
						};
						elm.selectedIndex = -1;
					};										
					
					
					
					// SetDisplay
					if(w[f].onchange[j].display!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};





						iContainer=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"InputContainer");
						if(w[f].onchange[j].display ){
							iContainer.style.display="";


						}else{
							iContainer.style.display="none";	
							//alert(ObjDef.inputfields[gt].type);
							switch (ObjDef.inputfields[gt].type){
								case "CheckBoxGroup":
									epMultiEdit.clearCheckBoxGroupAction(iContainer)
								break;
								
								case "Calendar":
									ielm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input","INPUT");
									rbCalendar.clickClearDate(ielm.id);	
								break;
								
					
								case "Text":
									ielm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");
									ielm.value = "";
								break;
								case "Select":
									ielm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");
									ielm.selectedIndex = -1;

									radopts=nvxgWIF.getObjElementsByClassName("DispalyAsRadio",document.getElementById(ObjName + "Container"));
									for (opi=0;opi<radopts.length;opi++) {
										radpar = radopts[opi].parentNode
										//radopts[opi].checked = false;
										radpar.style.color = '#333333';
									};
									

								break;
								case "Msg":
									ielm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");
								break;																
					
								default:
									// Default Action
							};

							

						};
					};
					if(w[f].onchange[j].setfocus!=undefined){
						for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[f].onchange[j].objid){break;};};
						elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[f].onchange[j].objid +"Input");															
						if(w[f].onchange[j].setfocus){elm.focus();obj.blur();};
					};
				};
//									 }catch(err){};
			};
		};
	};		
},



 CommaFormatted:function(amount) {
	var delimiter = ","; // replace comma if desired
	if(amount.indexOf(".")==-1){amount=amount+"."};
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3) {
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
},
// ****************************************************************************************************************
CloneBlock:function(e){
	
	
	
	
	var obj = epMultiEdit.getEventTarget(e);	
	ObjName = obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];

	if(ObjDef.objcount>=ObjDef.maximum){
		msg = "The maximum number("+ ObjDef.maximum +") of '" + ObjDef.recordtitle + "s' has already been reached for this section.";	
		alert(msg);
		return		
	}else{
	
	block=obj; 
	while(block.className !="MultiRecordCloneBlock"){block = block.parentNode};	
	
	blockContainer=obj; 
	while(blockContainer.className !="MultiRecordCloneBlockContainer"){blockContainer = blockContainer.parentNode};		
	var clonedata = new Object();

	var K=ObjDef.inputfields.length;
	for (I=0;I<K;I++) {
		c=ObjDef.inputfields[I].clone;
		if(c!=undefined){
			if(c){
				elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[I].id + "Input");
				clonedata[ObjDef.inputfields[I].id] = elm.value;
			};
		};
	};


//--------------------------
		CloneBlockContainer = document.getElementById(ObjName + "CloneBlockContainer");
		CloneBlock = document.createElement("DIV");
		CloneBlock.className = "MultiRecordCloneBlock";
		CloneBlock.setAttribute("cloneblockcount",0);
		CloneBlockHeader = document.createElement("DIV");
		CloneBlockHeader.className = "MultiRecordCloneBlockHeader";
		CloneBlockHeader.setAttribute("oncontextmenu","return false");	
		CloneBlockHeader.setAttribute("unselectable","on");		
	
		CloneBlockToggle = document.createElement("DIV");
		CloneBlockToggle.setAttribute("objname",ObjName);
		CloneBlockToggle.setAttribute("display","OPEN");
		CloneBlockToggle.onclick=epMultiEdit.toggleCloneBlock;	
		CloneBlockToggle.className="MultiRecordCloneBlockToggleCollaspe";
		CloneBlockToggle.title=ObjDef.toolbarlabeltitle[4];
		CloneBlockHeader.appendChild(CloneBlockToggle);	
	
	
	
		CloneBlockHeaderClose = document.createElement("DIV");
		CloneBlockHeaderClose.className="MultiRecordCloneBlockHeaderClose";
		CloneBlockHeaderClose.title=ObjDef.toolbarlabeltitle[2];
		CloneBlockHeaderClose.setAttribute("objname",ObjName);
		CloneBlockHeaderClose.onclick=epMultiEdit.deleteCloneBlock;
		CloneBlockHeader.appendChild(CloneBlockHeaderClose);
		if(ObjDef.allowcloning){
			CloneBlockHeaderClone = document.createElement("DIV");
			CloneBlockHeaderClone.setAttribute("objname",ObjName);
			CloneBlockHeaderClone.onmouseover=epMultiEdit.CloneOver;
			CloneBlockHeaderClone.onmouseout=epMultiEdit.CloneOut;	
			CloneBlockHeaderClone.onclick=epMultiEdit.CloneBlock;	
			CloneBlockHeaderClone.className="MultiRecordCloneBlockHeaderClone";
			CloneBlockHeaderClone.title=ObjDef.toolbarlabeltitle[3];
			CloneBlockHeader.appendChild(CloneBlockHeaderClone);	
		};
		CloneBlockHeaderCounter = document.createElement("DIV");
		CloneBlockHeaderCounter.className="MultiRecordCloneBlockHeaderCounter";
		TextNode = document.createTextNode("&nbsp;");
		CloneBlockHeaderCounter.appendChild(TextNode);	
		CloneBlockHeader.appendChild(CloneBlockHeaderCounter);	
		CloneBlockHeaderCounter.setAttribute("oncontextmenu","return false");	
		CloneBlockHeaderCounter.setAttribute("unselectable","on");		
		CloneBlockHeaderLabel = document.createElement("DIV");
		CloneBlockHeaderLabel.className="MultiRecordCloneBlockHeaderLabel";
		CloneBlockHeaderLabel.setAttribute("oncontextmenu","return false");	
		CloneBlockHeaderLabel.setAttribute("unselectable","on");		
		TextNode = document.createTextNode("");
		CloneBlockHeaderLabel.appendChild(TextNode);
		CloneBlockHeaderLabel.innerHTML = "<em style='color:#eee'>"+ lc["$SYS_UNDEFINED"] + "&nbsp;" + ObjDef.recordtitle+ "</em>";
		CloneBlockHeader.appendChild(CloneBlockHeaderLabel);	
		CloneBlock.appendChild(CloneBlockHeader);
		EditPanel = epMultiEdit.createEditPanelInputControls(ObjName);
		CloneBlock.appendChild(EditPanel);				
		DIV = document.createElement("DIV");	
		DIV.className ="wifClearFloat";
		CloneBlock.appendChild(DIV);	
	blockContainer.insertBefore(CloneBlock,block.nextSibling);
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<





	
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if(ObjDef.inputfields[q].src!=undefined){
				w =ObjDef.inputfields[q].src;
				if(w[0].onchange!=undefined){
					for (var j=0; j < w[0].onchange.length; j++){
						// SetRequired
						if(w[0].onchange[j].required!=undefined){
							for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[0].onchange[j].objid){break;};};
								requiredflag=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"InputRequired");
								requiredflag.innerHTML = " ";	
								ObjDef.inputfields[gt].required = false;
								elm=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"Input");								
								elm.setAttribute("cloneRequired",ObjDef.inputfields[gt].required);
																
						};
						// SetDisplay
						if(w[0].onchange[j].display!=undefined){
							for (var gt=0; gt < ObjDef.inputfields.length; gt++){if(ObjDef.inputfields[gt].id==w[0].onchange[j].objid){break;};};
							iContainer=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ w[0].onchange[j].objid +"InputContainer");
							iContainer.style.display="none";	
						};
					};
				};
			};
			
			
		};					
		nvxgWIF.intTimeObjs(CloneBlock);		
		nvxgWIF.setRadioButtonEvents(CloneBlock);
		nvxgWIF.setTextBoxes(CloneBlock);
		nvxgWIF.setTextArea(CloneBlock);
		nvxgWIF.setCheckBoxListEvents(CloneBlock);
		nvxgWIF.setSelectList(CloneBlock);	
		epMultiEdit.setCloneBlockCounter(ObjName);
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type !="Hidden"){break;};
		};
		elms=CloneBlock.getElementsByTagName('*');
		for (f=0;f<elms.length;f++) {
			if(elms[f].id!=undefined){
				if(elms[f].id==ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input"){break;}

			};
		};
		elms[f].focus();
		for (I=0;I<K;I++) {
			c=ObjDef.inputfields[I].clone;
			if(c!=undefined){
				if(c){
					elm=epMultiEdit.getElementByIdInObjContainer(CloneBlock,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[I].id + "Input");
					elm.value = clonedata[ObjDef.inputfields[I].id];
					if(ObjDef.inputfields[I].src!=undefined){
						w =ObjDef.inputfields[I].src;
						if(w[0].onchange!=undefined){					
							epMultiEdit.onchangeActionsEvent(elm);
						};
					};
					if(ObjDef.inputfields[I].blocklabel!=undefined){					
						epMultiEdit.setBlockLabel(elm);					
					};
				};
			};
		};		
	};

},
// ****************************************************************************************************************
CloneOver:function(e){
	var obj = epMultiEdit.getEventTarget(e);	
	objContainer=obj
	ObjName = obj.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.typeofUI==1){while(objContainer.className !="MultiRecordCloneBlock"){objContainer = objContainer.parentNode}};	
	var K=ObjDef.inputfields.length;
	for (I=0;I<K;I++) {
		c=ObjDef.inputfields[I].clone;
		if(c!=undefined){
			if(c){
				if(ObjDef.typeofUI==0){
					document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[I].id + "Preview").style.backgroundColor="#9CF";
				}else{
					elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[I].id + "InputERRTXT");
					elm.style.backgroundColor="#9CF";
				};
			};
		};
	};
},
// ****************************************************************************************************************
CloneOut:function(e){
	var obj = epMultiEdit.getEventTarget(e);
	objContainer=obj
	ObjName = obj.getAttribute("ObjName");
	ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.typeofUI==1){while(objContainer.className !="MultiRecordCloneBlock"){objContainer = objContainer.parentNode}};	
	var K=ObjDef.inputfields.length;
	for (I=0;I<K;I++) {
		c=ObjDef.inputfields[I].clone;
		if(c!=undefined){
			if(c){
				if(ObjDef.typeofUI==0){	
					document.getElementById(ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[I].id + "Preview").style.backgroundColor="transparent";
				}else{
					elm=epMultiEdit.getElementByIdInObjContainer(objContainer,ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_" + ObjDef.inputfields[I].id + "InputERRTXT");
					elm.style.backgroundColor="transparent";

				};
			};
		};
	};
},
// ****************************************************************************************************************
setBlockLabel:function(obj){
	//alert(obj.tagName);
	ObjName=obj.getAttribute("ObjName");
	if(ObjName==undefined){return};
	var ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.typeofUI==1){
	if(ObjDef.typeofUI==0){epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'coldisplayorder', false)};		
	blocklabelstr="";
	objContainer=obj
	while(objContainer.className !="MultiRecordCloneBlock"){objContainer = objContainer.parentNode};	
	sortord=[1,2,3,4,5,6]
	//if(ObjDef.typeofUI==0){epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'coldisplayorder', false)};					
	
	for (O=0;O<sortord.length;O++) {
	
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if(ObjDef.inputfields[q].coldisplayorder==sortord[O] &&  ObjDef.inputfields[q].blocklabel!=undefined ){	
			elmid=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input";
			elm=epMultiEdit.getElementByIdInObjContainer(objContainer,elmid);
			str="";	
			if(elm!=undefined){
				if(ObjDef.inputfields[q].type=="Select"){
					if(elm.selectedIndex !=-1){
						str = ObjDef.inputfields[q].blocklabel.replace( new RegExp( "~", "gi" ), elm.options[elm.selectedIndex].title );	
					};
				}else{
					if(elm.value!=""){
						str = ObjDef.inputfields[q].blocklabel.replace( new RegExp( "~", "gi" ), elm.value );
					};
				};
			};
			blocklabelstr = blocklabelstr + str;
		};
	};
	};
	if(blocklabelstr==""){blocklabelstr="<em style='color:#eee'>"+ lc["$SYS_UNDEFINED"] + "&nbsp;" + ObjDef.recordtitle+ "</em>"};
	z = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlockHeaderLabel',objContainer );	
	z[0].innerHTML =blocklabelstr;
	};
},
// ****************************************************************************************************************
getElementByIdInObjContainer:function(obj,id,tag){
	elms=obj.getElementsByTagName('*');
	for (i=0;i<elms.length;i++) {
		if(elms[i].id!=undefined){
		tID = elms[i].id.split("~");
			if(tag!=undefined){
				if(tID[0]==id && elms[i].tagName==tag){return elms[i]; break;};
			}else{
				if(tID[0]==id){return elms[i]; break;};
			}
		};
	};
	return undefined
},

// ****************************************************************************************************************
// ****************************************************************************************************************
getRecordLabels:function(ObjName){
	recordlabel="";
	var ObjDef=nvxgObjectDef[ObjName];
	if(ObjDef.typeofUI==1 && ObjDef.objcount!=0){
		recordlabel="<ol style='margin:0px 0px 0px 20px;padding:0px'>";		
		CloneBlockContainer =document.getElementById(ObjName + "CloneBlockContainer");
		clones = nvxgWIF.getObjElementsByClassName('MultiRecordCloneBlock',CloneBlockContainer );
		if(ObjDef.typeofUI==0){epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'coldisplayorder', false)};		
		blocklabelstr="";
		for (CL=0;CL<clones.length;CL++) {
			objContainer = clones[CL];
			blocklabelstr="";
			sortord=[1,2,3,4,5,6];
			for (O=0;O<sortord.length;O++) {
				for (var q=0; q < ObjDef.inputfields.length; q++){
					if(ObjDef.inputfields[q].coldisplayorder==sortord[O] &&  ObjDef.inputfields[q].blocklabel!=undefined ){	
						elmid=ObjDef.objprefix + ObjDef.typeofoutput + "INDEX_"+ ObjDef.inputfields[q].id +"Input";
						elm=epMultiEdit.getElementByIdInObjContainer(objContainer,elmid);
						str="";	
						if(elm!=undefined){
							if(ObjDef.inputfields[q].type=="Select"){
								if(elm.selectedIndex !=-1){
									str = ObjDef.inputfields[q].blocklabel.replace( new RegExp( "~", "gi" ), elm.options[elm.selectedIndex].title );	
								};
							}else{
								if(elm.value!=""){
									str = ObjDef.inputfields[q].blocklabel.replace( new RegExp( "~", "gi" ), elm.value );
								};
							};
						};
						blocklabelstr = blocklabelstr + str;
					};
				};
			};
			if(blocklabelstr==""){blocklabelstr="<em>" + lc["$SYS_UNDEFINED"] + "&nbsp;" + ObjDef.recordtitle+ "</em>"};
			recordlabel = recordlabel + "<li>" + blocklabelstr + "</li>";
		};
		recordlabel = recordlabel + "</ol>"
	}else{
				if(ObjDef.typeofUI==0){epMultiEdit.sortDisplayHeaderCols(ObjDef.inputfields,'coldisplayorder', false)};				
				recordlabel="<ol style='margin:0px 0px 0px 20px;padding:0px'>";	
				
				for (var i=0; i < ObjDef.objdata.length; i++){
					blocklabelstr="";										
					for (var q=0; q < ObjDef.inputfields.length; q++){

						if(ObjDef.inputfields[q].blocklabel!=undefined){
							if(ObjDef.inputfields[q].type=="Select"){
								u=ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];
								w =ObjDef.inputfields[q].src;
								for (var f=0; f < w.length; f++){
									if(w[f].cmid == u){v=w[f].label;break}	
								};
							}else{
								v= ObjDef.objdata[i][ObjDef.inputfields[q].objdatakey];	
							};
							str = ObjDef.inputfields[q].blocklabel.replace( new RegExp( "~", "gi" ), v );

						};
						blocklabelstr = blocklabelstr +str;
						str="";
					};
					recordlabel = recordlabel + "<li>" + blocklabelstr + "</li>";
				};				
				
				recordlabel = recordlabel + "</ol>"
		
	};
	
	return recordlabel;
},
// ****************************************************************************************************************
clearCheckBoxGroup:function(e)	{
		var container = epMultiEdit.getEventTarget(e);
		epMultiEdit.clearCheckBoxGroupAction(container);
},
// ****************************************************************************************************************
clearCheckBoxGroupAction:function(container)	{
				while(container.className != 'wifCheckBoxGroup'){container = container.parentNode};		
				Q=container.getElementsByTagName("INPUT");
				for (E=0;E<Q.length;E++){
					if(Q[E].type.toUpperCase() == "CHECKBOX"){
						Q[E].checked = false;
						Q[E].removeAttribute("disabled");
						Q[E].style.cursor = "default";									
						parentObj = Q[E].parentNode;
						parentObj.style.cursor = "default";	
						parentObj.style.color="#333";
						if(Q[E].getAttribute("TriggerAction")){
							epMultiEdit.onchangeActionsEvent(Q[E]);
						};
						if(Q[E].getAttribute("isother")=="true"){
							nvxgCUSTOM.clickCheckboxGroupCheckBox(Q[E]);
						};
					};
					if(Q[E].type.toUpperCase() == "TEXT" || Q[E].type.toUpperCase() == "HIDDEN"){
						Q[E].value = "";
					}					
				}
				Q=container.getElementsByTagName("LABEL");
				for (E=0;E<Q.length;E++){
						Q[E].style.color = "#333";
				}	
				Q=container.getElementsByTagName("SELECT");
				for (E=0;E<Q.length;E++){
						Q[E].selectedIndex = -1;
				}	
				
},

ToggleTableView:function(e){
	targ = epMultiEdit.getEventTarget(e);
	ObjName = targ.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];
	RecordTableContainer=document.getElementById(ObjName + "MultiRecordEditorContainer");	
	ScrollMsgCounter=document.getElementById(ObjName + "ScrollMsgCounter");	
	if(ObjDef.ToggleTableViewState){
		RecordTableContainer.style.height="213px";
		ObjDef.ToggleTableViewState=false;
		targ.className = "CollapsibleToolOpen";
		ScrollMsgCounter.style.display = "";
	}else{
		RecordTableContainer.style.height="auto";
		ObjDef.ToggleTableViewState=true;
		targ.className = "CollapsibleToolClosed";		
		ScrollMsgCounter.style.display = "none";		
	};
},

setCloneForLocationData:function(elm,LocationConfigIndex){
	var ObjDef=nvxgObjectDef[LocationsConfiguration.Configs[LocationConfigIndex].MultiEditObjName];
	CloneBlockContainer=elm;
	while(CloneBlockContainer.className != 'MultiRecordCloneBlock'){CloneBlockContainer = CloneBlockContainer.parentNode};
	LocationsConfiguration.Configs[LocationConfigIndex].CloneTarget=epMultiEdit.getElementByIdInObjContainer(CloneBlockContainer,ObjDef.objprefix + "EditPanel");
},
// ****************************************************************************************************************
mirrorSelectionOption:function(e){
	var radsel = epMultiEdit.getEventTarget(e);	
	ObjName=radsel.getAttribute("ObjName");
	var ObjDef=nvxgObjectDef[ObjName];
	CloneBlock = radsel;
	targSelID =	radsel.getAttribute("inputtarget");
	if(ObjDef.typeofUI==1){
		while(CloneBlock.className !="MultiRecordCloneBlock"){CloneBlock = CloneBlock.parentNode};
		targSel=epMultiEdit.getElementByIdInObjContainer(CloneBlock,targSelID);	
	}else{
		targSel = document.getElementById(targSelID);	
	};
	radsel.checked = true;	
	sindex = radsel.getAttribute("value");
	targSel.value = sindex;
	epMultiEdit.onchangeActionsEvent(targSel);
	radopts=document.getElementsByName(radsel.name);
	for (opi=0;opi<radopts.length;opi++) {
		radpar = radopts[opi].parentNode
		if(radopts[opi].value == sindex){
			radpar.style.color = '#0000FF';
		}else{
			radpar.style.color = '#333333';
		};
	};
},

// ****************************************************************************************************************
	lastFunction : function(){}
}
