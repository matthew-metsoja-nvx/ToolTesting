/* 	JavaScript Document
	Redistribution and use in source and binary forms, with or without modification, is NOT permitted without written consent from NAVEX
	Privacy policy:			http://www.ethicspoint.com/en/privacypolicy.asp
	Acceptable use policy:	http://www.ethicspoint.com/en/acceptableuse.asp
	Contact information:	direct 1-971-250-4100
							toll-free 866-297-0224
							info@ethicspoint.com
							
	Author:					Raymond M. Bodnar | Sr. Client Interface UI/UX Designer, Web Programmer
	Dept.:					Client Interface
	codebase: 				NVXG.V5.2015.10.12 | HTML5, CSS3, & Javascript Enabled
*/
var	epMultiEditImport = {
	importcolcount:0,
	importObjDef:null,	
// ****************************************************************************************************************
importData:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];	
	epMultiEditImport.importObjDef = nvxgObjectDef[ObjName];	
	nvxgWIF.createModalLayer();
	container=nvxgWIF.createFloatingDiv();	
	var tags=["DIV","SPAN","TEXTAREA","IMG"]
	for (t=0;t<tags.length;t++) {
		var elms = container.getElementsByTagName(tags[t]);		
		for (i=0;i<elms.length;i++) {
			if(elms[i].getAttribute("elm")!=null){
				eval("var " + elms[i].getAttribute("elm") + " = elms["+i+"]");		
			};
		};
	};
	container.className = "MultiRecordImportDialog";
	container.id = "MultiRecordImportDialog";	
	container.style.top="0px";
	container.style.left="0px";			
	container.style.position="fixed";
	shadow.style.display="none";
	titlebar.className="MultiRecordImportDialogTitleBar";
	titlebar.innerHTML ="Data Import&nbsp;:&nbsp;" + ObjDef.recordtitle;
	closeMenu=document.createElement('DIV');
	closeMenu.id='MultiRecordImportDialogClose';	
	closeMenu.className='MultiRecordImportDialogClose';	
	closeMenu.setAttribute("title", 'Close data import window');			
	closeMenu.onclick=nvxgWIF.closeFloatingDiv; 	
	titlebar.appendChild(closeMenu);	
	step=document.createElement('SPAN');
	step.id = "StepWatch";
	textnode = document.createTextNode("");
	step.appendChild(textnode);			
	step.innerHTML = "Step 1 of 4";
	titlebar.appendChild(step);		
	cCord=nvxgWIF.getCenterCord(divbody);
	container.style.left = (cCord[0]-355) + "px";
	dim=nvxgWIF.getWindowSize();
	h=(dim[0]-500)*.38;
	container.style.top = h+ "px";
	content.className = "MultiRecordImportDialogContentContainer";
	step1 = epMultiEditImport.importStep1(ObjName);	
	content.appendChild(step1);			
	step2 = epMultiEditImport.importStep2(ObjName);	
	content.appendChild(step2);
	step3 = epMultiEditImport.importStep3(ObjName);	
	content.appendChild(step3);	
	
	
					
	container.appendChild(content);		
	document.body.appendChild(container);	
	nvxgWIF.initPopUps(container);
	document.getElementById("STEP2").style.display="none";		
	document.getElementById("STEP3").style.display="none";			
	ObjDef.AllowImport = Number(ObjDef.maximum) - Number(ObjDef.objcount);
},


// STEP 2 ************************************************************************************
importStep1:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	epMultiEditImport.importcolcount = 0;
	importcollabel = "";
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type!="Hidden"){
			epMultiEditImport.importcolcount = epMultiEditImport.importcolcount + 1;
			var label=ObjDef.inputfields[q].label;
			if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
			importcollabel = importcollabel  + escape(labelstr + "[" + ObjDef.inputfields[q].type + "],");
			importcollabel = importcollabel  + "&#09;";
		};
	};
	importcollabel = unescape(importcollabel);	
	DataPrepareDialog=document.createElement('DIV');
	DataPrepareDialog.className = "MultiRecordImportDialogData";
	DataPrepareDialogintruc=document.createElement('DIV');
	DataPrepareDialogintruc.className = "MultiRecordImportDialogDataInstruc";
	excelstr="<a href='../documents/" + ObjDef.recordtitle + "ImportTemplate.xlsx' target='_blank'>Download " + ObjDef.recordtitle + " Import Template</a>";
	DataPrepareDialogintruc.innerHTML = "<h1><span>1.</span>Preparing Your Data For Import</h1><ol><li>Each record must match the total numbers of columns <em>(" + epMultiEditImport.importcolcount + ")</em> and data types for the in the &ldquo;" + ObjDef.recordtitle + "&rdquo; table.<br/>Use the list of &ldquo;<strong>Data Columns</strong>&rdquo; below as a guide for setting up your data for import <em>(this information can be copied directly into <span style='white-space:nowrap'>MS Excel &trade;</span>, using the link labeled &ldquo;Copy to Clipboard&rdquo;)</em>; or click here to " + excelstr + " <em>(Excel File, *.xlsx)</em>.</li><li>All data columns must be delimited by either; a &ldquo;tab&rdquo; stop, a pipe(&ldquo;<strong>|</strong>&rdquo;), or a comma character.</li><li>Each record must be delimited by a &ldquo;return&rdquo; character <em>(carriage)</em>.</li><li>Incomplete and empty rows cannot be imported; and therefore must be removed from your raw data. Ensure your data is complete before proceeding.</li><li>The maximum number of records allowed for the " + ObjDef.recordtitle + " section of this report is <strong>" + ObjDef.maximum + "</strong>. Currently <strong>" + epMultiEditImport.importObjDef.objcount +  "</strong> record(s) exsit. Excess records cannot be imported.</li></ol>";








	DataPrepareDialog.appendChild(DataPrepareDialogintruc);		
	collabelslabel=document.createElement('label');	
	collabelslabel.innerHTML = "<strong>Data Columns</strong>";
	collabelslabel.htmlFor = "collabels";
	collabelslabel.className = "MultiRecordImportDialogLabel"
	DataPrepareDialog.appendChild(collabelslabel);	
	copycol=document.createElement('A');
	textnode = document.createTextNode("Copy to Clipboard");
	copycol.appendChild(textnode);			
	copycol.title="Copy Column Header Data to Clipboard";
	copycol.style.cssFloat="right";
	copycol.style.paddingRight="4px";
	copycol.setAttribute("href","javascript:epMultiEditImport.selectall()");
	DataPrepareDialog.appendChild(copycol);	
	collabelcontainer=document.createElement('DIV');
	collabelcontainer.className = "MultiRecordImportColList";
	table=document.createElement('TABLE');
	table.id="ColumHeaderData";
	table.setAttribute("cellspacing",1);
	table.setAttribute("cellpadding",0);
	table.setAttribute("border",0);		
	row1=document.createElement('TR');
	row2=document.createElement('TR');
	row3=document.createElement('TR');		
	var thcount = 0;
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType && ObjDef.inputfields[q].type!="Hidden"){
			thcount = thcount + 1;
			thCountCell=document.createElement('TH');
			TextNode = document.createTextNode("");
			thCountCell.innerHTML = thcount;			
			thCountCell.appendChild(TextNode);										
			row1.appendChild(thCountCell);							
			tdCellLabel=document.createElement('TD');		
			var label=ObjDef.inputfields[q].label;
			if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[2]}else{labelstr=label};
			TextNode = document.createTextNode("");
			tdCellLabel.appendChild(TextNode);	
			if(ObjDef.inputfields[q].required){reqstr="<span style='float:left'>&#9830;</span>"}else{reqstr="<span>&nbsp;</span>"};			
			tdCellLabel.innerHTML = reqstr + labelstr;
			row2.appendChild(tdCellLabel);				
			tdCellType=document.createElement('TD');		
			var label=ObjDef.inputfields[q].label;
			TextNode = document.createTextNode("");
			tdCellType.appendChild(TextNode);
			labelstr = ObjDef.inputfields[q].type;
			switch (labelstr){
				case "Text":	labelstr="Text <em>(Single Line)</em>"; break;
				case "TextArea":labelstr="Text <em>(Multi-Line)</em>"; break;
				case "Select":	labelstr="List Option"; break;
				case "Calendar":labelstr="Date"; break;				
			};
			tdCellType.innerHTML = "<span>&nbsp;</span>" + labelstr + "";
			row3.appendChild(tdCellType);				
			
		};
	};	
	table.appendChild(row1);		
	table.appendChild(row2);				
	table.appendChild(row3);	
	table.onclick = 	epMultiEditImport.selectall;							
	collabelcontainer.appendChild(table);
	collabelcontainer.selectall;			
	DataPrepareDialog.appendChild(collabelcontainer);	
	importdatacontainreq=document.createElement('DIV');		
	importdatacontainreq.innerHTML="<div style='font-size:8pt; text-align:justify; margin-bottom:8px; margin-top:-8px; margin-left:0px; cursor:default'>Columns marked with a diamond <strong  style='float:none; display:inline; color:#c00'>&#9830;</strong> indicate required fields.</div>";
	DataPrepareDialog.appendChild(importdatacontainreq);	
	DataPrepareDialogToolBar = document.createElement("DIV");			
	DataPrepareDialogToolBar.className ="MultiRecord_ToolBar";
	DataPrepareDialogToolBar.style.width="665px";
	PrepareToolBar = document.createElement("UL");			
	PrepareToolBar.style.width="100%";
	PrepareToolBarNext = document.createElement("LI");	
	PrepareToolBarNext.style.cssFloat="right";
	PrepareToolBarNext.setAttribute("ObjName",ObjName);							
	PrepareToolBarNextAncorh = document.createElement("A");				
	PrepareToolBarNextAncorh.setAttribute("href","javascript:epMultiEditImport.OneTwo('"+ ObjName +"')");		
	PrepareToolBarNextAncorh.innerHTML = "Next";
	PrepareToolBarNext.appendChild(PrepareToolBarNextAncorh);	
	PrepareToolBarBack = document.createElement("LI");	
	PrepareToolBarBack.style.cssFloat="right";
	PrepareToolBarBack.innerHTML = "Back";
	PrepareToolBarCXL = document.createElement("LI");	
	PrepareToolBarCXL.style.cssFloat="right";
	PrepareToolBarCXL.setAttribute("ObjName",ObjName);							
	PrepareToolBarCXLAncorh = document.createElement("A");				
	PrepareToolBarCXLAncorh.onclick=epMultiEditImport.CancelImport;	
	PrepareToolBarCXLAncorh.innerHTML = "Cancel";
	PrepareToolBarCXLAncorh.title = "Cancel data import process";	
	PrepareToolBarCXL.appendChild(PrepareToolBarCXLAncorh);	
	PrepareToolBar.appendChild(PrepareToolBarNext);	
	PrepareToolBar.appendChild(PrepareToolBarBack);	
	PrepareToolBar.appendChild(PrepareToolBarCXL);	
	DataPrepareDialogToolBar.appendChild(PrepareToolBar);	
	DataPrepareDialog.appendChild(DataPrepareDialogToolBar);	
	MultiRecordImportDialogDataContainer = document.createElement("DIV");			
	MultiRecordImportDialogDataContainer.id="STEP1";

	MultiRecordImportDialogDataContainer.className ="MultiRecordImportDialogDataContainer";
	MultiRecordImportDialogDataContainer.appendChild(DataPrepareDialog);			
	MultiRecordImportDialogDataContainer.appendChild(DataPrepareDialogToolBar);				
	return MultiRecordImportDialogDataContainer;
	
},
// STEP 2 ************************************************************************************
	importStep2:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	DataRawImprtDialog=document.createElement('DIV');
	DataRawImprtDialog.className = "MultiRecordImportDialogData";
	DataRawImprtDialogintruc=document.createElement('DIV');
	DataRawImprtDialogintruc.className = "MultiRecordImportDialogDataInstruc";
	DataRawImprtDialogintruc.innerHTML = "<h1><span>2.</span>Loading Data For Import</h1><ol><li>Data can be copied directly into the text box below, from excel or other text editor.<br/><em>(If copying text from Excel, ensure that the complete row of data is selected for each record.)</em><br/>—or—<br/>Data can be imported via a <span class='popup' sourceid='utf8rncode' DialogInDialog='MultiRecordImportDialog' title='Click for Additional Information&hellip;'>UTF-8 encoded</span> delimited text file<em>(*.txt)</em>, by selecting a file using the browse/file button below.<br/><em style='color:#009'>(This functionality is only available for <span class='popup' sourceid='html5e'  DialogInDialog='MultiRecordImportDialog' title='Click for Additional Information&hellip;'>HTML5 enabled web browsers</span>.)</em></li><li>Data columns can delimited by; tab, coma, or pipe character.</li><li>Incomplete and empty rows cannot be imported; and therefore must be removed from your raw data. Bad row data will be indicated with a red line number, and should be fixed or removed before proceeding.</li><li>A maximum of 100 rows of raw data maybe loaded at any given time.</li><li>The maximum number of records allowed for the " + ObjDef.recordtitle + " section of this report is <strong>" + ObjDef.maximum + "</strong>.Currently <strong>" + epMultiEditImport.importObjDef.objcount +  "</strong> record<em>(s)</em> exsit. Excess records cannot be imported.</li></ol>";
	DataRawImprtDialog.appendChild(DataRawImprtDialogintruc);		
	importeddatalabel=document.createElement('label');	
	importeddatalabel.innerHTML = "<span style='color:#C00;display:inline-block; font-size:9pt;width:8px'>&#9830;</span><strong>Text / Data</strong><br/><span style='white-space:nowrap;display:inline-block;margin-top:2px;margin-left:8px'>Copy & Paste data into the box below, or select a file to import.</span>";
	importeddatalabel.htmlFor = "importeddata";
	importeddatalabel.className = "MultiRecordImportDialogLabel"
	importeddatalabel.style.width="305px";
	DataRawImprtDialog.appendChild(importeddatalabel);	
	delimiterContainer=document.createElement('DIV');
	delimiterContainer.className = "MultiRecordImportDialogDelimiterContainer";
	browsebuttonlabel=document.createElement('label');
	browsebuttonlabel.innerHTML = "<span style='color:#C00;display:inline-block; font-size:9pt;width:8px; margin-left:-8px'>&#9830;</span><strong>Delimiter</strong>";
	browsebuttonlabel.className = "MultiRecordImportDialogLabel";
	delimiterContainer.appendChild(browsebuttonlabel);		
	delimiterContainer.style.marginLeft="16px";
	var opts=["Tab","Pipe","Comma"];
	for (opt=0;opt<opts.length;opt++) {
		radioaction=document.createElement('input');	
		radioaction.type = "radio";
		radioaction.name = "ImportDelimiter";
		radioaction.id = "delimiter" + opt;	
		radioaction.onclick  =epMultiEditImport.delimterchange;
		radioaction.className = "MultiRecordImportDialogIgnoreChckbox";
		radioaction.value = opt;
		if(opt==0){radioaction.checked = true;};
		delimiterContainer.appendChild(radioaction);	
		radioactionlabel=document.createElement('label');	
		radioactionlabel.htmlFor = "delimiter" + opt;	
		radioactionlabel.className = "MultiRecordImportDialogIgnoreChckboxLabel";	
		if(opt==0 || opt==1){radioactionlabel.style.marginRight="10px"};	

		textnode = document.createTextNode("");
		radioactionlabel.appendChild(textnode);			
		radioactionlabel.innerHTML=opts[opt];
		delimiterContainer.appendChild(radioactionlabel);
	};
	DataRawImprtDialog.appendChild(delimiterContainer);
	importeddatalabel=document.createElement('label');	
	importeddatalabel.style.width="200px";
	importeddatalabel.style.cssFloat="left";
	importeddatalabel.innerHTML = "<strong>Columns Headers</strong>";
	importeddatalabel.htmlFor = "importeddata";
	importeddatalabel.className = "MultiRecordImportDialogLabel"
	importeddatalabel.style.paddingTop = "-8px";
	DataRawImprtDialog.appendChild(importeddatalabel);	
	brkln=document.createElement('BR');	
	DataRawImprtDialog.appendChild(brkln);	
	ignorechckbox=document.createElement('input');	
	ignorechckbox.type = "checkbox"
	ignorechckbox.className = "MultiRecordImportDialogIgnoreChckboxX";
	ignorechckbox.id = "IgnoreChckbox";
	ignorechckbox.onclick=epMultiEditImport.delimterchange;
	DataRawImprtDialog.appendChild(ignorechckbox);			
	ignorechckboxlabel=document.createElement('label');	
	ignorechckboxlabel.htmlFor = "IgnoreChckbox"
	ignorechckboxlabel.className = "MultiRecordImportDialogIgnoreChckboxLabel";	
	ignorechckboxlabel.style.marginTop="-2px";
	textnode = document.createTextNode("");
	ignorechckboxlabel.appendChild(textnode);
	ignorechckboxlabel.innerHTML="Ignore 1st row as columns headers.";
	ignorechckboxlabel.value = "-1";
	DataRawImprtDialog.appendChild(ignorechckboxlabel);			
	brkln=document.createElement('BR');	
	brkln.className = "wifClearFloat";
	DataRawImprtDialog.appendChild(brkln);			
	browsebutton=document.createElement('INPUT');
	browsebutton.type = "FILE";
	browsebutton.className = "MultiRecordImportDialogFileButton";
	browsebutton.id = "importfile";
	browsebutton.accept="text/*,text/plain" 
	browsebutton.onchange = epMultiEditImport.importDataText;	
	browsebutton.style.display="none";
	DataRawImprtDialog.appendChild(browsebutton);		
	customfileContainer=document.createElement('DIV');
	customfileContainer.className = "MultiRecordImportDialogCustomFile";
	browsebuttonlabel=document.createElement('label');
	browsebuttonlabel.innerHTML = "<strong>Browse & Select Text File for Import</strong>&nbsp;<em>(*.txt)</em>";
	browsebuttonlabel.htmlFor = "importfile";
	browsebuttonlabel.className = "MultiRecordImportDialogLabel";
	browsebuttonlabel.style.marginTop="2px";
	browsebuttonlabel.style.marginBottom="1px";	
	customfileContainer.appendChild(browsebuttonlabel);			
	brkln=document.createElement('BR');	
	brkln.className = "wifClearFloat";
	customfileContainer.appendChild(brkln);			
	customfileString=document.createElement('DIV');	
	customfileString.className = "MultiRecordImportDialogCustomStr";
	customfileString.innerHTML = "<em style='color:#999'>No File Selected</em>";
	customfileString.id="customfilestring";
	customfileContainer.appendChild(customfileString);
	customfileButton=document.createElement('DIV');
	customfileButton.className = "MultiRecordImportDialogCustomBttn";
	customfileButton.innerHTML = "Browse&hellip;";
	customfileButton.onclick=epMultiEditImport.BrowseFile;
	customfileContainer.appendChild(customfileButton);		
	customfileCXLButton=document.createElement('DIV');
	customfileCXLButton.className = "MultiRecordImportDialogCustomBttn";
	customfileCXLButton.innerHTML = "Clear All";
	customfileCXLButton.onclick = epMultiEditImport.clearDataText;
	customfileContainer.appendChild(customfileCXLButton);		
	DataRawImprtDialog.appendChild(customfileContainer);
	actionContainer=document.createElement('DIV');
	actionContainer.className = "MultiRecordImportDialogActionContainer";
	actionbuttonlabel=document.createElement('label');
	actionbuttonlabel.innerHTML = "<span style='color:#C00;display:inline-block; font-size:9pt;width:8px;'>&#9830;</span><strong>Import Action</strong>";
	actionbuttonlabel.className = "MultiRecordImportDialogLabel";
	actionContainer.appendChild(actionbuttonlabel);		
	actionContainer.style.marginLeft="13px";
		radioaction=document.createElement('input');	
		radioaction.type = "radio";
		radioaction.name = "ImportAction";
		radioaction.id = "ImportActionAppend";	
		radioaction.onclick  =epMultiEditImport.delimterchange;
		radioaction.className = "MultiRecordImportDialogIgnoreChckbox";
		radioaction.style.marginLeft="8px";
		radioaction.value = true;
		actionContainer.appendChild(radioaction);	
		radioaction.checked = true;
		actionlabel=document.createElement('label');	
		actionlabel.htmlFor = "ImportActionAppend"
		actionlabel.className = "MultiRecordImportDialogIgnoreChckboxLabel";	
		textnode = document.createTextNode("Append");
		actionlabel.title="Add imported records to the existing set of records.";
		actionlabel.appendChild(textnode);			
		actionContainer.appendChild(actionlabel);	
		radioaction=document.createElement('input');	
		radioaction.type = "radio";
		radioaction.name = "ImportAction";
		radioaction.id = "ImportActionReplace";	
		radioaction.onclick  =epMultiEditImport.delimterchange;
		radioaction.className = "MultiRecordImportDialogIgnoreChckbox";
		radioaction.style.marginLeft="10px";
		radioaction.value = false;
		actionContainer.appendChild(radioaction);	
		actionlabel=document.createElement('label');	
		actionlabel.htmlFor = "ImportActionReplace"
		actionlabel.className = "MultiRecordImportDialogIgnoreChckboxLabel";	
		textnode = document.createTextNode("Replace");
		actionlabel.appendChild(textnode);			
		actionlabel.title="Delete the existing set of records, and replace with the imported records.";
		actionContainer.appendChild(actionlabel);	
	DataRawImprtDialog.appendChild(actionContainer);
	importeddatarowcount=document.createElement('SPAN');
	textnode = document.createTextNode("");
	importeddatarowcount.appendChild(textnode);
	importeddatarowcount.innerHTML="<em style='color:#666'>No Rows Loaded</em>";
	importeddatarowcount.id = "ImportedDataRowCount";
	importeddatarowcount.className = "MultiRecordImportDialogRowCount";
	DataRawImprtDialog.appendChild(importeddatarowcount);	
	brkln=document.createElement('BR');	
	brkln.className = "wifClearFloat";
	DataRawImprtDialog.appendChild(brkln);			
	brkln=document.createElement('BR');	
	brkln.className = "wifClearFloat";
	DataRawImprtDialog.appendChild(brkln);			
	importeddata=document.createElement('textarea');			
	importeddata.className = "MultiRecordImportDialogImportedData";
	importeddata.id = "importeddata";
	importeddata.setAttribute("wrap","off");
	importeddata.setAttribute("rows","117");	
	importeddata.onkeyup = epMultiEditImport.manualDataText;
	importeddata.onkeydown=nvxgWIF.catchTab; 
	importeddata.onblur = epMultiEditImport.manualDataText;	
	subContainer=document.createElement('div');
	subContainer.className = "MultiRecordImportDialogRawDataSubContainer";
	subContainer.id = "TextAreaContainer";
	importeddataContainer=document.createElement('div');
	importeddataContainer.id="ImportedDataContainer";	
	importeddataContainer.className = "MultiRecordImportDialogRawDataContainer";
	importeddataCounter=document.createElement('div');
	importeddataCounter.id="MultiRecordImportDialogRawDataCounter";
	importeddataCounter.className = "MultiRecordImportDialogDataCounter";
	subContainer.appendChild(importeddataCounter);
	subContainer.appendChild(importeddata);
	importeddataContainer.appendChild(subContainer);
	DataRawImprtDialog.appendChild(importeddataContainer);	
	brkln=document.createElement('BR');	
	brkln.className = "wifClearFloat";
	DataRawImprtDialog.appendChild(brkln);			
	DataPrepareDialog.appendChild(importdatacontainreq);	
	DataPrepareDialogToolBar = document.createElement("DIV");			
	DataPrepareDialogToolBar.className ="MultiRecord_ToolBar";
	DataPrepareDialogToolBar.style.width="665px";
	PrepareToolBar = document.createElement("UL");			
	PrepareToolBar.style.width="100%";
	PrepareToolBarNext = document.createElement("LI");	
	PrepareToolBarNext.style.cssFloat="right";
	PrepareToolBarNext.setAttribute("ObjName",ObjName);							
	PrepareToolBarNextAncorh = document.createElement("A");				
	PrepareToolBarNextAncorh.setAttribute("href","javascript:epMultiEditImport.TwoThree('"+ ObjName +"')");		
	PrepareToolBarNextAncorh.innerHTML = "Next";
	PrepareToolBarNext.id="Next2Enabled"	
	PrepareToolBarNext.appendChild(PrepareToolBarNextAncorh);	


	//PrepareToolBarNextD = document.createElement("LI");	
	//PrepareToolBarNextD.style.cssFloat="right";
	//PrepareToolBarNextD.innerHTML = "Next";
	//PrepareToolBarNextD.title="Please check your data; there are no are no valid row for import.";
	//PrepareToolBarNextD.id="Next2Disabled"

	


	PrepareToolBarBack = document.createElement("LI");	
	PrepareToolBarBack.style.cssFloat="right";
	PrepareToolBarBackAncorh = document.createElement("A");				
	PrepareToolBarBackAncorh.innerHTML = "Back";
	PrepareToolBarBackAncorh.setAttribute("href","javascript:epMultiEditImport.TwoOne('"+ ObjName +"')");		
	PrepareToolBarBack.appendChild(PrepareToolBarBackAncorh);	
	PrepareToolBarCXL = document.createElement("LI");	
	PrepareToolBarCXL.style.cssFloat="right";
	PrepareToolBarCXL.setAttribute("ObjName",ObjName);							
	PrepareToolBarCXLAncorh = document.createElement("A");				
	PrepareToolBarCXLAncorh.onclick=epMultiEditImport.CancelImport;
	PrepareToolBarCXLAncorh.innerHTML = "Cancel";
	PrepareToolBarCXLAncorh.title = "Cancel data import process";	
	PrepareToolBarCXL.appendChild(PrepareToolBarCXLAncorh);	
	PrepareToolBar.appendChild(PrepareToolBarNext);	
	//PrepareToolBar.appendChild(PrepareToolBarNextD);	
	PrepareToolBar.appendChild(PrepareToolBarBack);	
	PrepareToolBar.appendChild(PrepareToolBarCXL);	
	//PrepareToolBarNext.style.display = "none";
	DataPrepareDialogToolBar.appendChild(PrepareToolBar);	
	DataPrepareDialog.appendChild(DataPrepareDialogToolBar);	

	importKey = document.createElement("DIV");	
	importKey.innerHTML="<div style='color:#eee; font-size:8pt; height:14px; line-height:14px; text-align:center; margin-left:0px'><span style='color:#666; height:12px; margin-right:2px; display:inline-block; padding:2px; '>Import Data Row Key:</span><span style='background-color:#090; height:12px; width:45px; margin-right:2px; display:inline-block; padding:2px; '>Good</span><span style='background-color:#C00; height:12px; width:45px; margin-right:2px; display:inline-block; padding:2px; '>Bad</span><span style='background-color:#333; height:12px; width:45px; margin-right:2px; display:inline-block; padding:2px; '><s>Excess<s></span></div>";
	DataPrepareDialogToolBar.appendChild(importKey);	

	
	
	MultiRecordImportDialogDataContainer = document.createElement("DIV");			
	MultiRecordImportDialogDataContainer.id="STEP2";
	MultiRecordImportDialogDataContainer.className ="MultiRecordImportDialogDataContainer";
	MultiRecordImportDialogDataContainer.appendChild(DataRawImprtDialog);			
	MultiRecordImportDialogDataContainer.appendChild(DataPrepareDialogToolBar);				
	
	
	
	return MultiRecordImportDialogDataContainer;
},

// STEP 3 ************************************************************************************
	importStep3:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	DataRawImprtDialog=document.createElement('DIV');
	DataRawImprtDialog.className = "MultiRecordImportDialogData";
	DataRawImprtDialogintruc=document.createElement('DIV');
	DataRawImprtDialogintruc.className = "MultiRecordImportDialogDataInstruc";
	DataRawImprtDialogintruc.innerHTML = "<h1><span>3.</span>Data Import Validation</h1><div style='padding:5px; height:50px; background-color:#FC9; overflow:hidden'>Mauris interdum orci erat, non pharetra purus imperdiet in. Fusce tempus risus vitae ligula lacinia, et aliquet lectus ullamcorper. Sed at pretium tellus. Donec et massa eleifend, elementum orci in, sagittis nisi. Ut lacinia nibh id scelerisque euismod. Vestibulum sollicitudin facilisis orci, eget mattis sem fringilla ut. Ut nec massa sem. Pellentesque at enim quis est suscipit suscipit id sit amet ligula. Aenean malesuada dui ut dui malesuada, scelerisque fringilla nunc pellentesque.</div>";
	DataRawImprtDialog.appendChild(DataRawImprtDialogintruc);		

	LoadedContainer=document.createElement('DIV');
	LoadedContainer.className = "MultiRecordImportLoaded";
	LoadedContainer.id = "MultiRecordImportLoaded";
	LoadedTable=document.createElement('TABLE');
	LoadedTableHeader=document.createElement('THEAD');	
	LoadedTable.id="LoaderDataTable";
	
LoadedTable.className = "MultiRecordEditorTable";
	
	LoadedTable.setAttribute("cellspacing",1);
	LoadedTable.setAttribute("cellpadding",0);
	LoadedTable.setAttribute("border",0);		
	LoadedDataTR=document.createElement('TR');
	var thcount = 0;
	LoadedDataTH=document.createElement('TH');
	LoadedDataUL=document.createElement('UL');
	LoadedDataLI=document.createElement('LI');			
	LoadedDataLI.className="pXTH";
	LoadedDataLI.style.backgroundImage="";
	TextNode = document.createTextNode("");
	LoadedDataLI.appendChild(TextNode);										
	LoadedDataLI.innerHTML = "&nbsp;";				
	LoadedDataUL.appendChild(LoadedDataLI);
	LoadedDataTH.appendChild(LoadedDataUL);
	LoadedDataTR.appendChild(LoadedDataTH);							



	for (var q=0; q < ObjDef.inputfields.length; q++){
		if (ObjDef.inputfields[q].type in epMultiEdit.InputType){
			LoadedDataTH=document.createElement('TH');
			LoadedDataUL=document.createElement('UL');
			LoadedDataLI=document.createElement('LI');			
			
			if(ObjDef.inputfields[q].type=="Hidden"){
				if(ObjDef.inputfields[q].size== undefined){ObjDef.inputfields[q].size=0};
				LoadedDataTH.style.display="none";
			};
			
			if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
				LoadedDataLI.className="p" + ObjDef.inputfields[1].size;
			}else{
				LoadedDataLI.className="p" + ObjDef.inputfields[q].size;				
			}
			

			TextNode = document.createTextNode("X");
			LoadedDataLI.appendChild(TextNode);	
			
			var label=ObjDef.inputfields[q].label;
			if(Object.prototype.toString.call(label) == "[object Array]"){labelstr=label[0]}else{labelstr=label};
			if(ObjDef.inputfields[q].required){reqstr="<span style='color:#C00; padding-left:3px'>&#9830;</span>&nbsp;"}else{reqstr="<span style='; padding-left:3px'>&nbsp;</span>&nbsp;"};			
			LoadedDataLI.innerHTML = reqstr + labelstr ;
			labelstr = ObjDef.inputfields[q].type;
			switch (labelstr){
				case "Text":	labelstr="Text (Single Line)"; break;
				case "TextArea":labelstr="Text (Multi-Line)"; break;
				case "Select":	labelstr="List Option"; break;
				case "Calendar":labelstr="Date"; break;				
			};
			LoadedDataLI.title = "Data Type: " + labelstr;
			
			LoadedDataUL.appendChild(LoadedDataLI);
			LoadedDataTH.appendChild(LoadedDataUL);
			LoadedDataTR.appendChild(LoadedDataTH);							
		};
	};	
	LoadedTableHeader.appendChild(LoadedDataTR);

	LoadedTableBody=document.createElement('TBODY');	
	LoadedTableBody.id = ObjName + "LoadedTableBody";



	LoadedTable.appendChild(LoadedTableHeader);
	LoadedTable.appendChild(LoadedTableBody);	
	LoadedContainer.appendChild(LoadedTable);
	MultiRecordImportDialogDataContainer.appendChild(LoadedContainer);			
	DataRawImprtDialog.appendChild(LoadedContainer);	
	brkln=document.createElement('BR');	
	brkln.className = "wifClearFloat";
	DataRawImprtDialog.appendChild(brkln);			
	
	
	DataPrepareDialog.appendChild(importdatacontainreq);	
	DataPrepareDialogToolBar = document.createElement("DIV");			
	DataPrepareDialogToolBar.className ="MultiRecord_ToolBar";
	DataPrepareDialogToolBar.style.width="665px";
	PrepareToolBar = document.createElement("UL");			
	PrepareToolBar.style.width="100%";


	PrepareToolBarNext = document.createElement("LI");	
	PrepareToolBarNext.style.cssFloat="right";
	PrepareToolBarNext.setAttribute("ObjName",ObjName);							
	PrepareToolBarNextAncorh = document.createElement("A");				
	PrepareToolBarNextAncorh.setAttribute("href","javascript:epMultiEditImport.ThreeFour('"+ ObjName +"')");		
	PrepareToolBarNextAncorh.innerHTML = "Finish";
	PrepareToolBarNext.id="DoImportEnabled";
	PrepareToolBarNext.appendChild(PrepareToolBarNextAncorh);	
	

	
	
	PrepareToolBarBack = document.createElement("LI");	
	PrepareToolBarBack.style.cssFloat="right";
	PrepareToolBarBackAncorh = document.createElement("A");				
	PrepareToolBarBackAncorh.innerHTML = "Back";
	PrepareToolBarBackAncorh.setAttribute("href","javascript:epMultiEditImport.ThreeTwo('"+ ObjName +"')");		
	PrepareToolBarBack.appendChild(PrepareToolBarBackAncorh);	
	PrepareToolBarCXL = document.createElement("LI");	
	PrepareToolBarCXL.style.cssFloat="right";
	PrepareToolBarCXL.setAttribute("ObjName",ObjName);							
	PrepareToolBarCXLAncorh = document.createElement("A");				
	PrepareToolBarCXLAncorh.onclick=epMultiEditImport.CancelImport;
	PrepareToolBarCXLAncorh.innerHTML = "Cancel";
	PrepareToolBarCXLAncorh.title = "Cancel data import process";	
	PrepareToolBarCXL.appendChild(PrepareToolBarCXLAncorh);	



	PrepareToolBar.appendChild(PrepareToolBarNext);	
	PrepareToolBar.appendChild(PrepareToolBarBack);	
	PrepareToolBar.appendChild(PrepareToolBarCXL);	
	DataPrepareDialogToolBar.appendChild(PrepareToolBar);	
	DataPrepareDialog.appendChild(DataPrepareDialogToolBar);	
	MultiRecordImportDialogDataContainer = document.createElement("DIV");			
	MultiRecordImportDialogDataContainer.id="STEP3";
	MultiRecordImportDialogDataContainer.className ="MultiRecordImportDialogDataContainer";
	MultiRecordImportDialogDataContainer.appendChild(DataRawImprtDialog);			
	MultiRecordImportDialogDataContainer.appendChild(DataPrepareDialogToolBar);
	return MultiRecordImportDialogDataContainer;

	
},
// ****************************************************************************************************************
BrowseFile:function(){
	document.getElementById("importfile").click();
},
// ****************************************************************************************************************
OneTwo:function(objname){
	document.getElementById("STEP1").style.display="none";		
	document.getElementById("STEP2").style.display="";				
	document.getElementById("StepWatch").innerHTML = "Step 2 of 4"	;
},
// ****************************************************************************************************************
TwoOne:function(objname){
	document.getElementById("STEP1").style.display="";		
	document.getElementById("STEP2").style.display="none";
	epMultiEditImport.clearDataText();
	document.getElementById("delimiter0").checked = true;
	document.getElementById("StepWatch").innerHTML = "Step 1 of 4";			
},
// ****************************************************************************************************************
TwoThree:function(objname){
	var proceed = true;
	var ErrMsg  = "";
	if(document.getElementById("delimiter0").checked==false && document.getElementById("delimiter1").checked==false && document.getElementById("delimiter2").checked==false){
		ErrMsg = ErrMsg + "Please select a 'Delimiter' from options provided.\n"
		proceed = false;
	};
	if(document.getElementById("ImportActionAppend").checked==false && document.getElementById("ImportActionReplace").checked==false){
		ErrMsg = ErrMsg + "Please select an 'Import Action' from options provided.\n"
		proceed = false;		
	};
	if(document.getElementById("importeddata").value.length == 0){
		ErrMsg = ErrMsg + "No data has been entered for import.\n"
		proceed = false;		
	};
	
	
	
	
	if(proceed){
		rows=epMultiEditImport.loadRowToTable(objname);
		if(rows==0){
			alert("No valid data has been entered for import.");
		}else{
			epMultiEditImport.vaildateImportedData(objname);	
			document.getElementById("STEP2").style.display="none";		
			document.getElementById("STEP3").style.display="";				
			document.getElementById("StepWatch").innerHTML = "Step 3 of 4"	;
		};
	}else{
		alert(ErrMsg);
		
	};
},

// ****************************************************************************************************************
ThreeFour:function(ObjName){
	
	r=epMultiEditImport.vaildateImportedData(ObjName);	
if(r){
	var ObjDef=nvxgObjectDef[ObjName];
	if(document.getElementById("ImportActionReplace").checked){
		ObjDef.objdata=[];	//	ClearData Already in object;
		ObjDef.currentkey =100;
		ObjDef.objcount = 0;
	};
	tbody=document.getElementById(ObjName + "LoadedTableBody")
	for (ircd=0;ircd<tbody.rows.length;ircd++) {
		ObjDef.currentkey = ObjDef.currentkey + 1;			
		var record = new Object();
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if (ObjDef.inputfields[q].type in epMultiEdit.InputType){
				ivElms=document.getElementsByName(ObjDef.inputfields[q].objdatakey);				
				tElm=ivElms[ircd];
				switch(ObjDef.inputfields[q].type){
					case "TextArea":
						t= epMultiEdit.trimString(tElm.value);
							t=t.replace(/\r\n|\r|\n/g,"~");
							var t = t.replace(/<\/?[^>]+(>|$)/g, "");
							t = t.replace( new RegExp( "~", "gi" ), "<br/>" );
							t = escape(t);
							if(ObjDef.sortdatakey==ObjDef.inputfields[q].objdatakey){S=t};
					  break;
					case 'Hidden':
					   t=epMultiEdit.trimString(ObjDef.inputfields[q].defaultval);		
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
					default:
						t=epMultiEdit.trimString(tElm.value);

						if(ObjDef.inputfields[q].hint!=undefined){
							if(t==ObjDef.inputfields[q].hint){
								t="";
							};
						};
						if(ObjDef.inputfields[q].defaultval!=undefined){
							if(t==""){
								t=ObjDef.inputfields[q].defaultval;
							};
							
						};
						if(ObjDef.sortdatakey==ObjDef.inputfields[q].objdatakey){S=t};
					 break; 
				};		
				record[ObjDef.inputfields[q].objdatakey]=t;		
			};
		};
		record['sortval']="ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ";
		record['key']=0;		
		i=ObjDef.objdata.push(record);		
		i=i-1;
		ObjDef.objdata[i].key = ObjDef.currentkey;
		ObjDef.objcount = ObjDef.objcount + 1;
	};
			
		TabItemCounter = document.getElementById(ObjName + "ItemTabCounter");
		if(TabItemCounter != undefined){
			TabItemCounter.innerHTML = ObjDef.objcount;
			if(ObjDef.objcount > 0){
				TabItemCounter.style.display = "";
			}else{
				TabItemCounter.style.display = "none";			
			};
		};			
		epMultiEdit.sortDataObj(ObjName);		
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
		

	obj =document.getElementById("MultiRecordImportDialog");
	obj.parentNode.removeChild(obj);			
	obj =document.getElementById("ModalLayer");
	obj.parentNode.removeChild(obj);			
}else{
	alert("Please address all validation issue before proceeding.\n\nInvalid fields will be highlighted in PINK.");
};
},


// ****************************************************************************************************************
ThreeTwo:function(objname){
	document.getElementById("STEP2").style.display="";		
	document.getElementById("STEP1").style.display="none";
	document.getElementById("STEP3").style.display="none";	
	document.getElementById("StepWatch").innerHTML = "Step 2 of 4";			
	tBODY  = document.getElementById(objname + "LoadedTableBody");
	while(tBODY.rows.length != 0){
		tBODY.removeChild(tBODY.rows[0]);
	};	
	
},
// ****************************************************************************************************************
loadRowToTable:function(ObjName	){
	var selectedIndexArray = [];
	var ObjDef=nvxgObjectDef[ObjName];
	LoadedTableBody =document.getElementById(ObjName + "LoadedTableBody");
	fileDisplayArea=document.getElementById("importeddata");
	content=fileDisplayArea.value;	
	content=content.split("\n");
	
	if(document.getElementById("IgnoreChckbox").checked){content.shift()};
	dop=document.getElementsByName("ImportDelimiter");
	if(dop[0].checked){delem="\t"};
	if(dop[1].checked){delem="|"};
	if(dop[2].checked){delem=","};
	importedcount = 0;
	truncount = 0;

	for (var tr=0; tr < content.length; tr++){
			
	if(tr<ObjDef.AllowImport){
		LoadedDataTR=document.createElement('TR');
		LoadedDataTH=document.createElement('TH');
		LoadedDataUL=document.createElement('UL');
		LoadedDataLI=document.createElement('LI');			
		LoadedDataLI.className="pX";
		TextNode = document.createTextNode("");
		LoadedDataLI.appendChild(TextNode);		
		LoadedDataLI.onclick=epMultiEditImport.deleteRow;								
		LoadedDataUL.appendChild(LoadedDataLI);
		LoadedDataLI.innerHTML=(tr +1 )+ ".&nbsp;";				
		LoadedDataTH.appendChild(LoadedDataUL);
		LoadedDataTR.appendChild(LoadedDataTH);		
		var myCelData = content[tr].split(delem);
		if(myCelData.length != epMultiEditImport.importcolcount){
		}else{
		tick=0;		
		for (var q=0; q < ObjDef.inputfields.length; q++){
			if (ObjDef.inputfields[q].type in epMultiEdit.InputType){
				var LoadedDataTD=document.createElement('TD');
				var sIndex = -1;
				var T = ObjDef.inputfields[q].type;
				var clrButton = null; var calButton = null;
				switch (T){
					case "Text":
						var inpoutobj=document.createElement('INPUT');
						inpoutobj.type="Text";
						if(ObjDef.inputfields[q].defaultval==undefined){ObjDef.inputfields[q].defaultval=""};
						if(myCelData[tick]=="" && ObjDef.inputfields[q].defaultval !=""){
							inpoutobj.value = ObjDef.inputfields[q].defaultval;														
						}else{
							inpoutobj.value = myCelData[tick];							
						}
						inpoutobj.onblur = epMultiEditImport.vaildateInline;
						
					break;
					case "Hidden":
						var inpoutobj=document.createElement('INPUT');
						inpoutobj.type="HIDDEN";
						inpoutobj.value = ObjDef.inputfields[q].defaultval;
					break;
	
					case "Currency":
						var inpoutobj=document.createElement('INPUT');
						inpoutobj.type="Text";
						if(ObjDef.inputfields[q].defaultval==undefined){ObjDef.inputfields[q].defaultval=""};
						if(myCelData[tick]=="" && ObjDef.inputfields[q].defaultval !=""){
							inpoutobj.value = ObjDef.inputfields[q].defaultval;														
						}else{
							inpoutobj.value = myCelData[tick];							
						}
						inpoutobj.onblur = epMultiEditImport.vaildateInline;
						inpoutobj.onblur = epMultiEditImport.vaildateInline;
					break;
					case "Calendar":
						var inpoutobj=document.createElement('INPUT');
						inpoutobj.type="Text";		
						inpoutobj.setAttribute("hint","mm/dd/yyyy");
						inpoutobj.setAttribute("fixed","0");						
						if(myCelData[tick]==""){		
							inpoutobj.value = "mm/dd/yyyy";
							sdate=rbCalendar.serializeNow();							
						}else{

							sdate=true;
							svals=myCelData[tick].split("/");
							if(svals.length!=3){
								sdate=false;
							}else{
								if(isNaN(svals[0])){sdate=false};
								if(isNaN(svals[1])){sdate=false};
								if(isNaN(svals[2])){sdate=false};								
							};
							if(sdate){
								right_year 	= Number(svals[2]);
								month_num 	= Number(svals[0]);
								thedate 		= Number(svals[1]);
//								month_num = month_num -1;
								if(String(month_num).length == 1){month_num = "0" + String(month_num)};
								if(String(thedate).length == 1){thedate = "0" + String(thedate)};
								sdate = String(right_year) + month_num + thedate ;
							}else{
								sdate=rbCalendar.serializeNow();
							};
							inpoutobj.value = myCelData[tick];	




						};
						inpoutobj.setAttribute("sdate",sdate);
						if(ObjDef.inputfields[q].mindate!=undefined){mn=ObjDef.inputfields[q].mindate}else{mn=-1;};
						inpoutobj.setAttribute("mindate",mn);
						if(ObjDef.inputfields[q].maxdate!=undefined){mx=ObjDef.inputfields[q].maxdate}else{mx=-1;};
						inpoutobj.setAttribute("maxdate",mx);
						inpoutobj.onblur = epMultiEditImport.vaildateInline;
						inpoutobj.setAttribute("DialogInDialog","MultiRecordImportDialog");	
						clrButton=document.createElement("div");
						clrButton.className = "rbImgCalendarClear";
						clrButton.tabIndex = 0;
						clrButton.title=epMultiEdit.CalendarText[1];
						clrButton.setAttribute("onClick","rbCalendar.clickClearDate('"+ ObjDef.inputfields[q].objdatakey + tr + "')");				
						clrButton.setAttribute("onkeypress","rbCalendar.clickClearDate('"+ ObjDef.inputfields[q].objdatakey + tr + "')");
						clrButton.setAttribute("DialogInDialog","MultiRecordImportDialog");
						

						calButton=document.createElement("div");
						calButton.className = "rbImgCalendar";
						calButton.tabIndex = 0;
						calButton.title=epMultiEdit.CalendarText[0];
						calButton.setAttribute("DialogInDialog","MultiRecordImportDialog");
						calButton.setAttribute("onClick","rbCalendar.openCalendar('"+ ObjDef.inputfields[q].objdatakey + tr + "','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");				
						calButton.setAttribute("onkeypress","rbCalendar.openCalendar('"+ ObjDef.inputfields[q].objdatakey + tr + "','MM/DD/YYYY'," + mn+ "," + mx+ ",0,0,0,-1,0)");								
						calButton.setAttribute("sdate",sdate);						
						
					break;				
					case "TextArea":
						var inpoutobj=document.createElement('TEXTAREA');
						if(ObjDef.inputfields[q].defaultval==undefined){ObjDef.inputfields[q].defaultval=""};
						if(myCelData[tick]=="" && ObjDef.inputfields[q].defaultval !=""){
							inpoutobj.value = ObjDef.inputfields[q].defaultval;														
						}else{
							inpoutobj.value = myCelData[tick];							
						}
						inpoutobj.onblur = epMultiEditImport.vaildateInline;
		
					break;
					case "Select":
						var inpoutobj=document.createElement('SELECT');
						for (lopt=0;lopt<ObjDef.inputfields[q].src.length;lopt++) {
							var inpopt=document.createElement('OPTION');
							inpopt.value = ObjDef.inputfields[q].src[lopt].cmid;
							inpopt.setAttribute("TEXTVAL",ObjDef.inputfields[q].src[lopt].label);
							inpoptTextNode = document.createTextNode(ObjDef.inputfields[q].src[lopt].label);
							inpopt.appendChild(inpoptTextNode);
							inpoutobj.appendChild(inpopt);
							Stxt1= ObjDef.inputfields[q].src[lopt].label.toUpperCase();
							Stxt2= myCelData[tick].toUpperCase();							
							if(Stxt1==Stxt2){sIndex=lopt};
						};
						inpoutobj.onchange = epMultiEditImport.vaildateInline;
					break;
				};
				tick=tick+1;
				
				if(Object.prototype.toString.call(ObjDef.inputfields[q].size) == "[object Array]"){
					inpoutobj.className ="wif" + ObjDef.inputfields[q].size[1] + "p" + ObjDef.inputfields[q].type; 					
				}else{
					inpoutobj.className ="wif" + ObjDef.inputfields[q].size + "p" + ObjDef.inputfields[q].type; 
				};
				
				
				hint=inpoutobj.getAttribute("hint");
				if(hint!=undefined){

					if(hint == inpoutobj.value){
						inpoutobj.style.color="#ddd";	
					}else{
						inpoutobj.style.color="#333";						
					};
				}else{
					inpoutobj.style.color="#333";
				};
				inpoutobj.style.backgroundColor = "transparent";
				inpoutobj.setAttribute("required","'" + ObjDef.inputfields[q].required + "'");
				inpoutobj.setAttribute("validate",ObjDef.inputfields[q].validate);
				inpoutobj.setAttribute("ObjName",ObjName);
				inpoutobj.name = ObjDef.inputfields[q].objdatakey;
				inpoutobj.id = ObjDef.inputfields[q].objdatakey + tr;
				inpoutobj.style.padding="0px 0px 0px 3px";
				LoadedDataTD.appendChild(inpoutobj);
				if(clrButton!=null){LoadedDataTD.appendChild(clrButton)};
				if(calButton!=null){LoadedDataTD.appendChild(calButton)};				
				
				
				LoadedDataTR.appendChild(LoadedDataTD);
				if(T=="Select"){
					inpoutobj.selectedIndex = sIndex; 
					if(sIndex==-1){selectedIndexArray.push(inpoutobj.id)};
				};
			};
			};
			LoadedTableBody.appendChild(LoadedDataTR);										
		};
	};
	};
	for (fg=0;fg<selectedIndexArray.length;fg++) {
		document.getElementById(selectedIndexArray[fg]).selectedIndex =-1;
	};
	selectedIndexArray=[];
	return LoadedTableBody.rows.length;

},
vaildateInline:function(e){
	var lElm = epMultiEdit.getEventTarget(e);
	isR=lElm.getAttribute("required");
	if(isR=="'true'"){
		vad=lElm.getAttribute("validate");
				v=vad.split("|");
				func =epValidate[v[0].toLowerCase()];
				for (var w=0; w < 7; w++){func[w]=undefined;};					
				func[0] = lElm.id;
				if(v.length==2){arg=v[1].split(",");for (var w=0; w < arg.length; w++){func[w+1] =arg[w];};};
				if(func(func[0],func[1],func[2],func[3],func[4],func[5],func[6])==-1){isclear=false; fldval=false}else{fldval=true};
				hint=ivElms.getAttribute("hint");
				if(hint!=undefined){if(hint == ivElms.value){fldval=true}};
				THObj=lElm;
				while(THObj.tagName != 'TD'){THObj = THObj.parentNode};
				if(fldval){
					hint=lElm.getAttribute("hint");
					if(hint!=undefined){
						if(hint == lElm.value){
							lElm.style.color="#bbb";	
						}else{
							lElm.style.color="#333";						
						};					
					}else{
						lElm.style.color="#333";
					};
					THObj.setAttribute("valid","true");	
				}else{
					THObj.setAttribute("valid","false");	
					lElm.style.color="#C00";						
				};
	};
},

// ****************************************************************************************************************
vaildateImportedData:function(ObjName){
	var ObjDef=nvxgObjectDef[ObjName];
	isclear = true;			
	for (var q=0; q < ObjDef.inputfields.length; q++){
		if(ObjDef.inputfields[q].required || ObjDef.inputfields[q].type == "Calendar"){
			if(ObjDef.inputfields[q].validate != undefined && ObjDef.inputfields[q].validate !=""){
				v=ObjDef.inputfields[q].validate.split("|");
				func =epValidate[v[0].toLowerCase()];
				ivElms=document.getElementsByName(ObjDef.inputfields[q].objdatakey);				
				for (var w=0; w < 7; w++){func[w]=undefined;};					
				for (myVI=0;myVI<ivElms.length;myVI++) {
					func[0] = ivElms[myVI].id;
					if(v.length==2){arg=v[1].split(",");for (var w=0; w < arg.length; w++){func[w+1] =arg[w];};};
						hint=ivElms[myVI].getAttribute("hint");
						if(hint!=undefined){
							if(hint == ivElms[myVI].value){
								fldval=true;
							}else{
								if(func(func[0],func[1],func[2],func[3],func[4],func[5],func[6])==-1){isclear=false; fldval=false}else{fldval=true};
							};
						}else{
							if(func(func[0],func[1],func[2],func[3],func[4],func[5],func[6])==-1){isclear=false; fldval=false}else{fldval=true};	
						};
						THObj=ivElms[myVI];	
						while(THObj.tagName != 'TD'){THObj = THObj.parentNode};
						if(fldval){
						
							if(hint!=undefined){
								if(hint == ivElms[myVI].value){
									ivElms[myVI].style.color="#bbb";	
								}else{
									ivElms[myVI].style.color="#333";						
								};					
							}else{
								ivElms[myVI].style.color="#333";
							};
							THObj.setAttribute("valid","true");	
						}else{
							THObj.setAttribute("valid","false");	
							ivElms[myVI].style.color="#C00";						
						};					
					};
				};
			};
		};
		return isclear;
	
	
},

// ****************************************************************************************************************
CancelImport:function(e){
	r = confirm("Are you sure you want to exit the \"Data Import Process\"?");
	if(r){nvxgWIF.closeFloatingDiv(e)};
},
// ****************************************************************************************************************
selectall:function(){
	obj=document.getElementById("ColumHeaderData");
	var sel;
    // IE
    if (document.selection) {
        sel = document.body.createTextRange();
        sel.moveToElementText(obj);
        sel.select();
    } else {
        sel = document.createRange();
        sel.setStartBefore(obj);
        sel.setEndAfter(obj);
        window.getSelection().addRange(sel);
    };
	sel.execCommand('Copy');  
},	
// ****************************************************************************************************************
clearDataText:function(e){
	progressNode=document.getElementById("ImportedDataRowCount");	
	progressNode.innerHTML = "<em  style='color#999'>Proccessing&hellip;</em>";	
	fileDisplayArea=document.getElementById("importeddata");
	fileDisplayArea.value ="";
	document.getElementById("customfilestring").innerHTML ="";
	document.getElementById("delimiter1").checked = false;
	document.getElementById("delimiter2").checked = false;
	document.getElementById("delimiter0").checked = true;
	document.getElementById("IgnoreChckbox").checked = false;	
	progressNode.innerHTML="<em style='color:#666'>No Rows Loaded</em>";
	document.getElementById("MultiRecordImportDialogRawDataCounter").innerHTML="";
	//document.getElementById("Next2Disabled").style.display="";
	//document.getElementById("Next2Enabled").style.display="none";
	document.getElementById("customfilestring").innerHTML = "<em style='color:#999'>No File Selected</em>";
	datacontainer=document.getElementById("ImportedDataContainer");
	datacontainer.scrollLeft=0;
	datacontainer.scrollTop=0;		
	browsebutton=document.getElementById("importfile");
	browsebutton.type="text";
	browsebutton.type="file";	
},
// ****************************************************************************************************************
importDataText:function(e){
	fileDisplayArea=document.getElementById("importeddata");
	fileDisplayArea.value ="";
	importeddatarowcount=document.getElementById("ImportedDataRowCount");
	var fileInput = epMultiEdit.getEventTarget(e);
	var file = fileInput.files[0];
	filename = file.name;
	filesize = file.size;
	N = Number(filename.lastIndexOf("."))+1; 
	L = filename.length;
	E = filename.substring(N,L);
	E = E.toLowerCase();
	if(E=="csv"){
		R = confirm("MS Excel CVS files are not UTF-8 Encoded by default.\nThis means data may be lost in the import process.\n\nDo you wish to continue?");
		if(R){}else{return false}
	};
	switch (E){
		case "txt":
			if(document.getElementById("delimiter0").checked != true && document.getElementById("delimiter1").checked != true){
				document.getElementById("delimiter0").checked = true;		
			};
		break;
		case "csv":
			document.getElementById("delimiter2").checked = true;	
		break;
		default:
			document.getElementById("delimiter0").checked = false;
			document.getElementById("delimiter1").checked = false;
			document.getElementById("delimiter2").checked = false;
	};
	document.getElementById("customfilestring").innerHTML = filename;	
	var textType =  "text/csv";
    progressNode = document.getElementById("ImportedDataRowCount");



	var reader = new FileReader();
		reader.onloadstart = function(e) {	
			progressNode.innerHTML = "<em  style='color#999'>Loading&hellip;</em>";
			setTimeout(s=null,50);				
		};
		reader.onloadend = function(e) {	
		progressNode.innerHTML = "<em  style='color#999'>Processing&hellip;</em>";
		setTimeout(function(){
			var	content = reader.result;
			content=String(content);
			content=content.replace(/^\s+|\s+$/g, "");
			content=content.replace(/\n\r/g, "\r");
			content=content.replace(/\n/g, "");				
			content=content.replace(/\"/g, "");				
			fileDisplayArea.value = content;
			epMultiEditImport.checkrawdata(fileDisplayArea);
			browsebutton=document.getElementById("importfile");
			browsebutton.type="text";
			browsebutton.type="file";	
			},50);
		};
		reader.error = function(e) {	
			alert("An Error has occured while tryinvg to load this file.")
			progressNode.innerHTML = "<em style='color#C00'>Error</em>";
		};
		reader.readAsText(file,"UTF-8");
		datacontainer=document.getElementById("ImportedDataContainer");
		datacontainer.scrollLeft=0;
		datacontainer.scrollTop=0;		
},



delimterchange:function(){
		epMultiEditImport.checkrawdata(document.getElementById("importeddata"));
},
manualDataText:function(e){
		fileDisplayArea = epMultiEdit.getEventTarget(e);
		epMultiEditImport.checkrawdata(fileDisplayArea);
},
deleteRawDataRow:function(row,drow){
	//r = confirm("Are you sure you want to row number " + drow + " of the raw data?");
	//if(r){
		fileDisplayArea=document.getElementById("importeddata");
		content = fileDisplayArea.value;
		newcontent="";
		returnlastchar=content.substring(Number(content.length)-1,Number(content.length));
		lines = content.split("\n");
		for (i=0;i<lines.length;i++) {
			if(i!=row){
				newcontent = newcontent + lines[i];
				if(i != (lines.length-1)){newcontent = newcontent + "\n"};
			};
		};
		fileDisplayArea.value=newcontent;
		epMultiEditImport.checkrawdata(fileDisplayArea);
	//};
},
checkrawdata:function(fileDisplayArea){
	currentRecordCount=epMultiEditImport.importObjDef.objcount;
	maximumRecordCount=epMultiEditImport.importObjDef.maximum;
		if(document.getElementById("ImportActionReplace").checked){allowedCount =maximumRecordCount;}else{allowedCount = (maximumRecordCount - currentRecordCount);};
		content = fileDisplayArea.value;
		returnlastchar=content.substring(Number(content.length)-1,Number(content.length));
		lines = content.split("\n");
		if(returnlastchar=="\n"){lines.pop();};		
		var str = "";
		var errcount=0;
		if(content.length==0){
			cn = 0;
			document.getElementById("MultiRecordImportDialogRawDataCounter").innerHTML ="";
		}else{
			
			badcoun=0;
			var delem="\t";
			dop=document.getElementsByName("ImportDelimiter");
			if(dop[0].checked){delem="\t"};
			if(dop[1].checked){delem="|"};
			if(dop[2].checked){delem=","};
			addtoo = 1;
			for (cn=0;cn<(lines.length);cn++) {
				if(cn>=100){break;};
				cols = lines[cn].split(delem);
				if(cols.length!=epMultiEditImport.importcolcount){
					errcount=errcount+1;
					badcoun=badcoun+1;
					if(cn == 0 && document.getElementById("IgnoreChckbox").checked){
						badcoun=badcoun-1;
						newstr = "<span class='MultiRecordImportDialogDataCounterCOL' style='color:#C00'>HDR:</span><br/>"	
						addtoo = 0;						
					}else{
						if(Number(cn+addtoo) > Number(allowedCount)){S1 = "<s>";S2 = "</s>";}else{S1 = "";S2 = "";}						
						newstr = "<span class='MultiRecordImportDialogDataCounterErr' title='Delete Row&hellip;' onclick='epMultiEditImport.deleteRawDataRow(" + cn + "," + ((Number(cn)+addtoo)) + ")'>" + S1 + ((Number(cn)+addtoo)) + S2 + ":</span><br/>";
					};
					str = str + newstr;
				}else{
					if(cn == 0 && document.getElementById("IgnoreChckbox").checked){
						newstr = "<span class='MultiRecordImportDialogDataCounterCOL'>HDR:</span><br/>"	
						addtoo = 0;
					}else{
						if(Number(cn+addtoo) > Number(allowedCount)){S1 = "<s>";S2 = "</s>";}else{S1 = "";S2 = "";}
						newstr = "<span class='MultiRecordImportDialogDataCounterGood' title='Delete Row&hellip;' onclick='epMultiEditImport.deleteRawDataRow(" + cn + "," + ((Number(cn)+addtoo)) + ")'>" + S1 + ((Number(cn)+addtoo)) + S2 + ":</span><br/>";
					};					
					str = str + newstr;
				};
				
			};
			document.getElementById("MultiRecordImportDialogRawDataCounter").innerHTML =str;		
			importeddatarowcount=document.getElementById("ImportedDataRowCount");
			L=lines.length;
		};
		if(cn!=0){
			if(document.getElementById("IgnoreChckbox").checked){cn=cn-1};
			if(badcoun==0){
				importeddatarowcount.innerHTML= "<em><strong>" + cn + "</strong>&nbsp;rows loaded.</em>"				
				//document.getElementById("Next2Disabled").style.display="none";
				//document.getElementById("Next2Enabled").style.display="";
			}else{
				importeddatarowcount.innerHTML= "<em><strong style='color:#C00'>" + badcoun + "</strong> of <strong>" + cn + "</strong>&nbsp;rows loaded are bad.</em>";
				//document.getElementById("Next2Disabled").style.display="";
				//document.getElementById("Next2Enabled").style.display="none";
			};
		}else{
			importeddatarowcount.innerHTML="<em style='color:#666'>No Rows Loaded</em>";
			//document.getElementById("Next2Disabled").style.display="";
			//document.getElementById("Next2Enabled").style.display="none";

		};
		
},
deleteRow:function(e){

		TRObj = epMultiEdit.getEventTarget(e);
		while(TRObj.tagName != 'TR'){TRObj = TRObj.parentNode};
		TBODYObj=TRObj.parentNode;
		TBODYObj.removeChild(TRObj);					
		pxs=nvxgWIF.getObjElementsByClassName("pX",TBODYObj);	
		for (psxc=0;psxc<pxs.length;psxc++) {
			pxs[psxc].innerHTML = (psxc + 1) + ".&nbsp;";
		};

		
	
},
// ****************************************************************************************************************
	lastFunction : function(){}
	
}
