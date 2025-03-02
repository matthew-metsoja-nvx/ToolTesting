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

var	ASC = false;
var	DSC = true;
var	SortOrder = ASC;
var  SortAChr = "\u25BC"
var  SortDChr = "\u25B2";
var	SortChr = SortAChr;
var	rowcount = 0;
var	SubSearchKeyID = 0;
var  OtherPrefix="zzzzzzzzzzzzzzzz";
var	selectedLocationIndex = null;
var	selectedLocationString = null;
//Global Vars
var	dragOK			=	false;     
var	dragXoffset		=	0;    
var	dragYoffset		=	0;    
var	FAQ_X			=	'0px';
var	FAQ_Y			=	'0px';
var	mouseX			=	0;
var	mouseY			=	0;	
var	SearchWindowWidth	=	730;
var	SearchWindowHeight	=	410;
var jsonServicesBasePath;
var  dbname=null;

//Config Vars
var		selectedLocationID	=	null;
var		config				=	null;
var		seachOnText 		= "";
var 	searchObj 		= null;
var		searchIE6Hack		= null;
var 	resultsObj 		= null;
var 	loaderObj 		= null;
var		myRegExp  = null;
var  	searchIE6Hack = null;

var	epLoactionsSearch = {
	Locations:null,
	RawRecordDataCount:null,
	ProcessedRecordDataCount:null,
	TextSearchCount:null,
	List:null,
	fieldsIndexMap: { cid: 0, clid: 1, name: 2, branch: 3, ad1: 4, ad2: 5, city: 6, state: 7, zip: 8, cntry: 9, reg: 10, ccode: 11, rid: 12, vid: 13, dp: 14, cf1: 15, cf2: 16, cf3: 17, cf4: 18, cf5: 19, cf6: 20, cd1: 21, cd2: 22, cd3: 23, cd4: 24, cd5: 25, cd6: 26, cd7: 27, cd8: 28, cd9: 29, cd10: 30, cd11: 31, cd12: 32, cd13: 33, cd14: 34, cd15: 35, cd16: 36, cd17: 37, cd18: 38, cd19: 39, cd20: 40, cd21: 41, cd22: 42, cd23: 43, cd24: 44, cd25: 45, cd26: 46, cd27: 47, cd28: 48, cd29: 49, cd30: 50, cd31: 51, cd32: 52, cd33: 53, cd34: 54, cd35: 55, cd36: 56, cd37: 57, cd38: 58, cd39: 59, cd40: 60 },
	GlobalFilterObjArr: [],
	GlobalFilterString: null,
// --------------------------------------------------------------------------------------------------------------------	
	/**
	 * Initializes location selection for the specified location configuration
	 * @param {number} ConfigIndex
	*/
	init: function(ConfigIndex) {
		if (ConfigIndex == undefined) {
			ConfigIndex = 0;
		}

		jsonServicesBasePath = `${document.getElementById("filepathDepth").value}../jsonservices/`;
		dbname = document.getElementById("dbname")?.value.trim();

		if (LocationsConfiguration.Configs[ConfigIndex].UseAjax) {
			if (LocationsConfiguration.Configs[ConfigIndex].UseEnhanced) {
				LocationsConfiguration.Configs[ConfigIndex].JSONServiceLOC = "GetEnhancedLocations";
				LocationsConfiguration.Configs[ConfigIndex].JSONServiceINFO = "GetEnhancedLocationInfo";
			} else {
				LocationsConfiguration.Configs[ConfigIndex].JSONServiceLOC = "GetEPLocations";
				LocationsConfiguration.Configs[ConfigIndex].JSONServiceINFO = "GetEPLocationInfo";
			}
		}

		if (LocationsConfiguration.Configs[ConfigIndex].Filter?.length) {
			const globalFilterObjArr = LocationsConfiguration.Configs[ConfigIndex].Filter;
			// Add exactMatch key to all global filters so that the value does not have to be supplied in the location search config
			const reformattedGlobalFilterObjArr = globalFilterObjArr.map(obj => {
				obj.exactMatch = true;
				return obj;
			});
			epLoactionsSearch.GlobalFilterString = epLoactionsSearch.createFilterString({ filters: reformattedGlobalFilterObjArr });
			epLoactionsSearch.GlobalFilterObjArr = LocationsConfiguration.Configs[ConfigIndex].Filter;
		} else {
			// Reset GlobalFilterString and GlobalFilterObjArr in case we're swapping location configs on a subsequent init and the new location config has an empty or non-existent Filter array
			epLoactionsSearch.GlobalFilterString = null;
			epLoactionsSearch.GlobalFilterObjArr = [];
		}

		epLoactionsSearch.setLocationDisplay(ConfigIndex);
		nvxgWIF.initPopUps();
	},
	/**
	 *
	 * @param {string} field
	 * @returns {number} Column identifier number for the specified location field
	*/
	getFieldIndex: function(field) {
		return epLoactionsSearch.fieldsIndexMap[field];
	},
	/**
	 * Creates filter string for JSON Services location calls
	 * @param { { filters: [{ field: string, value: string, exactMatch: boolean }], sortBy?: string } } options
	*/
	createFilterString: function(options) {
		let filterObjArr = options.filters;
		const sortByField = options?.sortBy;

		let filterString = '';

		if (epLoactionsSearch.GlobalFilterObjArr.length) {
			filterObjArr = epLoactionsSearch.GlobalFilterObjArr.concat(filterObjArr);
		}

		filterObjArr.forEach((obj, counter) => {
			counter += 1;
			const { field, value, exactMatch } = obj;
			const fieldIndex = epLoactionsSearch.getFieldIndex(field);
			if (fieldIndex) {
				filterString += `&index${counter}=${fieldIndex}&str${counter}=${value}&word${counter}=${exactMatch}`;
			} else {
				console.error(`[LOCATION SEARCH] Did not execute filter on field "${field}" because its database column identifier was not found.`);
			}
		});

		// Set string count
		const filterCount = filterObjArr.length;
		filterString += `&strcount=${filterCount}`;

		// Set sort, if provided
		if (sortByField) {
			filterString += `&sort=${sortByField}`;
		}

		return filterString;
	},
// --------------------------------------------------------------------------------------------------------------------		
	setRequired:function(kl,val,ConfigIndex){
		keys=kl.split(",")
		for (var k=0; k < keys.length; k++){		
			for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
					if(keys[k]==LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key){LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].required=val};
			};
		};		
	},

// --------------------------------------------------------------------------------------------------------------------		
	setLocationDisplay:function(ConfigIndex){
		var loctarg=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].HTMLTargetID); //document.getElementById("epLocationContainer");
		if(loctarg==undefined){
			alert("Target OBEJCT does not exsit.\n\nConfigIndex: " + ConfigIndex + "\nObject: " + LocationsConfiguration.Configs[ConfigIndex].HTMLTargetID) ;
			return false;
		};
		
			instructions=document.createElement('DIV');		
			instructionstxt = document.createTextNode('');
			instructions.appendChild(instructionstxt);
			htmlstr = LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[0];
			if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){htmlstr = htmlstr + LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[4]};
			
			htmlstr = epLoactionsSearch.instructionTextSwap(htmlstr,ConfigIndex);
			instructions.className = "reportformLocationInstructions";
			instructions.innerHTML = htmlstr;
			loctarg.appendChild(instructions);
//		if(LocationsConfiguration.Configs[ConfigIndex].ZipLookUp == undefined){
//		xzip=0;
//		for (var i=0; cv < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; cv++){
//			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[cv].key=="city" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[cv].display){xzip=xzip+1};
//			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[cv].key=="state" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[cv].display){xzip=xzip+1};
//			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[cv].key=="zip" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[cv].display){xzip=xzip+1};						
//		};
//		if(xzip==3){LocationsConfiguration.Configs[ConfigIndex].ZipLookUp = true};
//	};
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key=="BR" || LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key=="H4" || LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key=="BUTTONSET"){
				switch (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key){
					case "BR":
						htmlbreak=document.createElement('br');
						htmlbreak.className="wifClearFloat";
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display==undefined){LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display=true}
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display==false){htmlbreak.style.display="none"}
						loctarg.appendChild(htmlbreak);	
					break;
		
					case "H4":
						htmlh4=document.createElement('h4');
						htmlh4txt = document.createTextNode("");
						htmlh4.appendChild(htmlh4txt);
						htmlh4.innerHTML=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].label
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display==undefined){LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display=true}
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display==false){htmlh4.style.display="none"}
						loctarg.appendChild(htmlh4);	
					break;
					case "BUTTONSET":
						buttonset=document.createElement('DIV');
						buttonset.className ="wif" + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].size + "pContainer";
						buttonset.style.marginTop="10px";
//						buttonset.style.marginBottom="20px";
						buttonsettxt = document.createTextNode('');
						buttonset.appendChild(buttonsettxt);
						var htmlstr="<div id=\"wifSeachNavBar\" class=\"subLevelNavBar\" style=\"margin-left:4px;padding-top:10px;margin-bottom:10px;\"><a href=\"javascript:epLoactionsSearch.clearLocationData("+ConfigIndex+")\" warning=\"true\">BUTTON2</a><a href=\"javascript:epLoactionsSearch.runQuery(" + ConfigIndex + ")\"  warning=\"false\" id=\"SearchLocationsButton" + ConfigIndex + "\">BUTTON1</a></div>"
						htmlstr=htmlstr.replace('BUTTON1',LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[8]);						
						htmlstr=htmlstr.replace('BUTTON2',LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[7]);												
						buttonset.innerHTML = htmlstr;
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display==undefined){LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display=true}
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display==false){buttonset.style.display="none"}
						loctarg.appendChild(buttonset);	
					break;
					default:
						// Default Action
				};
			};
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto !=undefined){
				container=document.createElement('DIV');
				container.className ="wif" + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].size + "pContainer";
				container.id = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key + "Container";				
				instructions=document.createElement('DIV');
				instructions.className ="wifInstructions";
				required=document.createElement('DIV');
				required.className ="wifRequiredFlag";
				requiredtxt = document.createTextNode('');
				required.appendChild(requiredtxt);
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].required){required.innerHTML="♦"}else{required.innerHTML=" "};
				err=document.createElement('label');
				err.className ="defaultText";
				err.id=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto+"ERRTXT";
				err.htmlFor=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto;
				errtxt = document.createTextNode("");
				err.appendChild(errtxt);
				err.innerHTML = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].label;				
				instructions.appendChild(required);
				instructions.appendChild(err);		
				container.appendChild(instructions);					
				inputcontainer=document.createElement('DIV');
				inputcontainer.className ="wif" + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].size + "pInputContainer";
				switch (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype){
					case "select":
						inputcontrol=document.createElement('select');		
						inputcontrol.setAttribute("required", LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].required + "");		
						SubSearchKeyID=epLoactionsSearch.getLoctionKeyIndex(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey,ConfigIndex);
						if(LocationsConfiguration.Configs[ConfigIndex].UseAjax && LocationsConfiguration.Configs[ConfigIndex].SubSearchKey !="" && SubSearchKeyID ==i){
							inputcontrol.setAttribute("ConfigIndex",ConfigIndex);
							inputcontrol.onchange = epLoactionsSearch.runQuery;
						};
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].required != true){
							optioncontrol=document.createElement('option');
							optioncontroltxt = document.createTextNode("");							
							optioncontrol.appendChild(optioncontroltxt);		
							inputcontrol.appendChild(optioncontrol);		
						};
						ajaxkey=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key;if(ajaxkey=="cntry"){ajaxkey="country"};
						epLoactionsSearch.getListValuesQuery(ajaxkey,inputcontrol,i,ConfigIndex);

//						if(LocationsConfiguration.Configs[ConfigIndex].ZipLookUp = true){
//							if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key == "city" || LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key == "state"){
//								inputcontrol.setAttribute("ConfigIndex",ConfigIndex);																							
//								inputcontrol.setAttribute("Key",LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key);	
//								if (inputcontrol.addEventListener) {  // all browsers except IE before version 9
//									inputcontrol.addEventListener ("change", epLoactionsSearch.ZipCodeLookUp);
//								}else{
//									if (inputcontrol.attachEvent) {   // IE before version 9
//										inputcontrol.attachEvent ("onchange", epLoactionsSearch.ZipCodeLookUp);
//									};
//								};
//							};
//						};				

						
					break;
					case "textarea":
						inputcontrol=document.createElement('textarea');		
					break;
					default:
						inputcontrol=document.createElement('input');								
						inputcontrol.type = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype;
						if(LocationsConfiguration.Configs[ConfigIndex].UseAjax && SubSearchKeyID !=null && SubSearchKeyID ==i){
							inputcontrol.onkeydown = epLoactionsSearch.onEnterKey;
							inputcontrol.setAttribute("ConfigIndex",ConfigIndex);
						};			
						
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].autosuggest != undefined){
							if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype=="text"){
								ajaxkey=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key;if(ajaxkey=="cntry"){ajaxkey="country"};								
								datalist=document.createElement('datalist');
								datalist.id="datalist"+LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto;								
								inputcontrol.setAttribute("list",datalist.id);	
								inputcontrol.setAttribute("ConfigIndex",ConfigIndex);															
								epLoactionsSearch.getListValuesQuery(ajaxkey,datalist,i,ConfigIndex);		
								inputcontainer.appendChild(datalist);			
								datalist.style.display="none";
							};
						};	
											
//						if(LocationsConfiguration.Configs[ConfigIndex].ZipLookUp = true){
//							if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key == "city" || LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key == "state"){
//								inputcontrol.setAttribute("ConfigIndex",ConfigIndex);																							
//								inputcontrol.setAttribute("Key",LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key);	
//								if (inputcontrol.addEventListener) {  // all browsers except IE before version 9
//									inputcontrol.addEventListener ("blur", epLoactionsSearch.ZipCodeLookUp);
//								}else{
//									if (inputcontrol.attachEvent) {   // IE before version 9
//										inputcontrol.attachEvent ("onblur", epLoactionsSearch.ZipCodeLookUp);
//									};
//								};
//							};
//						};		
								
						
				};
				inputcontrol.id=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto;
				inputcontrol.name=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto;		
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].csstext != undefined){
					inputcontrol.style.cssText = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].csstext;
					
				};

				
				
				cl="wif" + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].size + "p"+ LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype.charAt(0).toUpperCase() + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype.substring(1,this.length).toLowerCase() + "";
				cl=cl.replace('Textarea','TextArea');
				inputcontrol.className =cl
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].attributes!=undefined){
					for (var a=0; a < LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].attributes.length; a++){
						objdata=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].attributes[a];
						for (var key in objdata) {
						   var value = objdata[key];
						   inputcontrol.setAttribute(key, value);
						};
					};
				};
				inputcontainer.appendChild(inputcontrol);
				
			if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){				
				preview=document.createElement('DIV');
				preview.className ="wifPreviewString";
				preview.style.marginLeft="-4px";
				previewtxt = document.createTextNode("");				
				preview.appendChild(previewtxt);			
				preview.innerHTML=" ";
				preview.id=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Preview";
				if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey == LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key){preview.style.display="none"};
				inputcontainer.appendChild(preview);										
			};
				container.appendChild(inputcontainer);										
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].formatstr!=""){
					formatstr=document.createElement('div');
					formatstr.className ="wifFieldFormatDef";
					formatstrtxt = document.createTextNode("");
					formatstr.appendChild(formatstrtxt);
					formatstr.innerHTML=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].formatstr;
					formatstr.id = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Format";
					container.appendChild(formatstr);	
					if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey != LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key){formatstr.style.display="none"}};
				};
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display ==false){container.style.display="none"}
				loctarg.appendChild(container);	
				};
		};
		if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){
			epLoactionsSearch.LockLocationFields(true,ConfigIndex);
		  }else{
			epLoactionsSearch.LockLocationFields(false,ConfigIndex);			  
		};
		epLoactionsSearch.Locations=null;
		epLoactionsSearch.List=null;	
		nvxgWIF.setTextBoxes(loctarg);
		nvxgWIF.setTextArea(loctarg);
		nvxgWIF.setSelectList(loctarg);				
	},

// --------------------------------------------------------------------------------------------------------------------	
	onEnterKey:function(event, element){
		var theKey = event.keyCode;
		var theConfig = element.getAttribute('configindex');
		if(theKey == 13){
			epLoactionsSearch.runSearch(theConfig);
		}
	},
// --------------------------------------------------------------------------------------------------------------------	
	runQuery:function(ConfigIndex,PassSearchStr){
		if(PassSearchStr==undefined){PassSearchStr=""};
		//alert("ConfigIndex:"+ConfigIndex);
		if(isNaN(ConfigIndex)){
			e=ConfigIndex;
			var obj = epLoactionsSearch.getEventTarget(e);
			ConfigIndex=Number(obj.getAttribute("ConfigIndex"));			
		}
		const usesCmLocations = LocationsConfiguration.Configs[ConfigIndex]?.UseEnhanced;
//alert("ConfigIndex:"+ConfigIndex);
	SubSearchKeyID=epLoactionsSearch.getLoctionKeyIndex(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey,ConfigIndex);
	if(LocationsConfiguration.Configs[ConfigIndex].UseAjax){

		if(LocationsConfiguration.Configs[ConfigIndex].UseAdvance){

			epLoactionsSearch.openSearch(ConfigIndex)		
		}else{
			xURL="";
			if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey !="" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].jasonkey !=0){
				keyval=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].mapto).value;
		
				if(keyval==""){
					slab = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].label;
					slab=nvxgWIF.removeHTMLTags(slab);
					if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].htmltype=="select"){
						msg="You must select a \""+slab+"\" value in order to perform a search.";
					}else{
						msg="You must enter a a \""+slab+"\" value in order to perform a search.";				
					};
					document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].mapto).focus();
					alert(msg);
				}else{
					const baseUrl = jsonServicesBasePath + LocationsConfiguration.Configs[ConfigIndex].JSONServiceLOC + ".aspx?clientid=" + LocationsConfiguration.Configs[ConfigIndex].LocationSourceID;	
					const filterObjArr = [{
						field: LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].key,
						value: escape(keyval),
						exactMatch: true
					}];
					const filterString = epLoactionsSearch.createFilterString({ filters: filterObjArr });

					xURL = baseUrl + filterString;
					if (usesCmLocations && dbname) {
						xURL += `&clientkey=${dbname}`;
					}
				}
			} else {
				xURL = jsonServicesBasePath + LocationsConfiguration.Configs[ConfigIndex].JSONServiceLOC + ".aspx?clientid=" + LocationsConfiguration.Configs[ConfigIndex].LocationSourceID;

				if (epLoactionsSearch.GlobalFilterString) {
					xURL += epLoactionsSearch.GlobalFilterString;
				}	

				if (usesCmLocations && dbname) {
					xURL += `&clientkey=${dbname}`;
				}
			}
				if(xURL!=""){
					epLoactionsSearch.load(xURL,function(http){
							if(http.readyState == 4){
								HTTPresponseText=http.responseText;
								if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){
									for (i=0;i<LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length;i++) {
										if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key!="BUTTONSET" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key!="BR" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key!="H4"){
											var re = new RegExp(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].enchanced+"\":","g");
											HTTPresponseText = HTTPresponseText.replace(re,LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key+"\":");
										};
									};
								};
								var re = new RegExp("null","g");
								HTTPresponseText = HTTPresponseText.replace(re,'""');
								eval(HTTPresponseText);
								epLoactionsSearch.Locations=Locations;
								epLoactionsSearch.RawRecordDataCount=Locations.length;
								epLoactionsSearch.cleanLocations(ConfigIndex);
								if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){epLoactionsSearch.addLocation(ConfigIndex);};
								epLoactionsSearch.openSearch(ConfigIndex);
								
								document.getElementById("wifSearchForText"+ConfigIndex).value = PassSearchStr;
							}else{
								// Do nothing
							}
						}
					);		
				};
			};
	}else{
		epLoactionsSearch.openSearch(ConfigIndex);		
	};
},
//--------------------------
getListValuesQuery:function(key,targ,i,ConfigIndex){
	if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listitems != undefined && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listitems.length != 0){

		for (var d=0; d < (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listitems.length); d++){
			opt=document.createElement('option');
			staticoption=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listitems[d];			
			if(Object.prototype.toString.call(staticoption) == "[object Object]"){
				opttxt = document.createTextNode(staticoption.label);							
				opt.value = staticoption.val;
			}else{
				opttxt = document.createTextNode(staticoption);							
				opt.value=staticoption;	
			};
			opt.appendChild(opttxt);		
			targ.appendChild(opt);		
		};
		targ.selectedIndex = -1;
	
	}else{
		io=[];
		if(LocationsConfiguration.Configs[ConfigIndex].SortToTop.length !=0){
			for (v=0;v<LocationsConfiguration.Configs[ConfigIndex].SortToTop.length;v++) {
				if(LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].key == "cntry"){K="country"}else{K=LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].key};
				if(K==key){
					for (O=0;O<LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].values.length;O++) {					
						opt=document.createElement('option');
						opttxt = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].values[O]);							
						//opt.title=LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].values[O];
						opt.value=LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].values[O];
						opt.appendChild(opttxt);		
						targ.appendChild(opt);		
						io[LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].values[O]]=LocationsConfiguration.Configs[ConfigIndex].SortToTop[v].values[O];
					};
				};
			};
		};

		const usesCmLocations = LocationsConfiguration.Configs[ConfigIndex]?.UseEnhanced;
		xURL= jsonServicesBasePath + LocationsConfiguration.Configs[ConfigIndex].JSONServiceINFO + ".aspx?clientid=" + LocationsConfiguration.Configs[ConfigIndex].LocationSourceID + "&column=" + key;

		if (epLoactionsSearch.GlobalFilterString) {
			xURL += epLoactionsSearch.GlobalFilterString;
		}

		if (usesCmLocations && dbname) {
			xURL += `&clientkey=${dbname}`;
		}

//		alert(xURL);
		epLoactionsSearch.load(xURL,function(http){
			if(http.readyState == 4){
				eval(http.responseText);
				deletelocationon=LocationsConfiguration.Configs[ConfigIndex].DeleteLocationOn;
				if(deletelocationon.indexOf(key)!=-1){
					for (dl=0;dl<LocationsConfiguration.Configs[ConfigIndex].DeleteLocationWith.length;dl++) {
					while(LocationItems.indexOf(LocationsConfiguration.Configs[ConfigIndex].DeleteLocationWith[dl]) !=-1){
						iof = LocationItems.indexOf(LocationsConfiguration.Configs[ConfigIndex].DeleteLocationWith[dl]);
						LocationItems[iof]="~";
					};	
				};
				LocationItems.sort(epLoactionsSearch.alphaNumSort);
				while(LocationItems[LocationItems.length-1] == "~"){
					LocationItems.pop();
				};
				};
				for (var d=0; d < (LocationItems.length); d++){
					if (LocationItems[d] in io){
						// Do Nothing
					}else{
						LocationItems.sort(epLoactionsSearch.alphaNumSort);
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].allowemptyoption == undefined){allowemptyoption=false}else{allowemptyoption=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].allowemptyoption};
						if(allowemptyoption==false && LocationItems[d]==""){}else{
								opt=document.createElement('option');
								opttxt = document.createTextNode(LocationItems[d]);							
								opt.value=LocationItems[d];
								opt.appendChild(opttxt);		
								targ.appendChild(opt);		
						};
						
					};
				};

						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].allowotheropt==undefined){LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].allowotheropt=false};
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].allowotheropt){
							opt=document.createElement('option');
							opttxt = document.createTextNode('');							
							opt.value=999999999;
							opt.style.color="#555";
							opt.appendChild(opttxt);		
							opt.innerHTML = LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[16];
							targ.appendChild(opt);	
							if (targ.addEventListener) {  // all browsers except IE before version 9
								targ.addEventListener ("change", epLoactionsSearch.getOtherVal);
							}
							else {
								if (targ.attachEvent) {   // IE before version 9
									targ.attachEvent ("onchange", epLoactionsSearch.getOtherVal);
								};
							};
						};
					targ.selectedIndex = -1;
					LocationItems =null;
				}else{
					// Do nothing
				}
			}
		);		
	};
},
// --------------------------------------------------------------------------------------------------------------------	
getOtherVal:function(e){
		var obj = epLoactionsSearch.getEventTarget(e);
		ConfigIndex = Number(obj.getAttribute("ConfigIndex"));
		if(obj.value==999999999){
			var otherval=prompt("Enter value for " + LocationsConfiguration.Configs[ConfigIndex].OtherListString,"");
			if (otherval!=null && otherval!="")  {
				opt=document.createElement('option');
				opttxt = document.createTextNode(otherval);							
				opt.value=otherval;
				opt.style.color="#C00";
				opt.appendChild(opttxt);	
				obj.appendChild(opt);	
				si=obj.options.length-1;
				obj.selectedIndex=si;
			}else{
				obj.selectedIndex = -1;	
			}
			obj.onchange();
		};
		
			
},
// --------------------------------------------------------------------------------------------------------------------	
	load:function(url,fn){
		var http = null;
		try{
			http = new XMLHttpRequest();
		}catch(e){
			try{
				http = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				http = new ActiveXObject("Microsoft.XMLHTTP");
			}
		}
		if(http == null){
			alert("ERROR An error occurred while trying to access location data. Please try again. |" + xURL);
		}else{
			http.onreadystatechange = function(){	
				fn(http);
			}
			try{
				http.open("GET",url,true);
				http.send(null);
			}catch(err){
				alert(err + "|" + xURL);
			}
		}
		

	},

// --------------------------------------------------------------------------------------------------------------------
cleanLocations:function(ConfigIndex){
var dirtyCount = 0;
	if(epLoactionsSearch.Locations.length==0){return};
	for (var i=0; i < (epLoactionsSearch.Locations.length); i++){
		isDirtyLocation = false;
		for (var d=0; d < (LocationsConfiguration.Configs[ConfigIndex].DeleteLocationOn.length); d++){
			test=epLoactionsSearch.Locations[i][LocationsConfiguration.Configs[ConfigIndex].DeleteLocationOn[d]];
//			alert(LocationsConfiguration.Configs[ConfigIndex].DeleteLocationOn[d] + "|" + test + "|")
			if (test!=null){
				for (var s=0; s < (LocationsConfiguration.Configs[ConfigIndex].DeleteLocationWith.length); s++){			
				if(LocationsConfiguration.Configs[ConfigIndex].DeleteLocationWith[s]==""){
					if(test=="null" || test==null || test=="" || test.length==0){isDirtyLocation=true;dirtyCount++;break}					
				}else{
					e=test.indexOf(LocationsConfiguration.Configs[ConfigIndex].DeleteLocationWith[s]);
					if(e!=-1){
						isDirtyLocation=true;dirtyCount++;break}
				};
			};
				
			if(isDirtyLocation){break};
			}else{
				epLoactionsSearch.Locations[i][LocationsConfiguration.Configs[ConfigIndex].DeleteLocationOn[d]]="";
			};
		};

		if(isDirtyLocation){
			if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){
				epLoactionsSearch.Locations[i].LocationId=-1;
			}else{
				epLoactionsSearch.Locations[i].lcid=-1;
			};
		};

	};

	if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){
		for (var i=0; i < (epLoactionsSearch.Locations.length); i++){
			if(epLoactionsSearch.Locations[i].LocationId==undefined){epLoactionsSearch.Locations[i].LocationId=i;}
		};
		epLoactionsSearch.sortLocations("LocationId",false,ConfigIndex);				

	}else{
		epLoactionsSearch.sortLocations("lcid",false,ConfigIndex);				
	};
//	try{
		var dirtyCountCleaned = 0;
		if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){		
		testarry = epLoactionsSearch.Locations; 
			while(epLoactionsSearch.Locations[0].LocationId==-1){
				epLoactionsSearch.Locations.shift(0);	
				dirtyCountCleaned++;
			};
		}else{
			while(epLoactionsSearch.Locations[0].lcid==-1){
				epLoactionsSearch.Locations.shift(0);	
			};
		};
//alert(dirtyCount+":"+dirtyCountCleaned);		
},
// --------------------------------------------------------------------------------------------------------------------
	getLocation : function(ConfigIndex){ 
	
			if(searchObj == null){
			if(nvxgWIF.isIE6){
				searchIE6Hack=document.createElement('IFRAME');
				searchIE6Hack.setAttribute("id", 'IE6Hack');	
				searchIE6Hack.setAttribute("src", '../blank.html');	
				searchIE6Hack.className ='searchIE6HackContainer';
				searchIE6Hack.scr="../blank.html";
			}
			searchObj=document.createElement('DIV');
			searchObj.setAttribute("id", 'wifLocationsSearchContainer'  + ConfigIndex);	
			searchObj.className ='wifLocationsSearchContainer';
						
			searchContent=document.createElement('DIV');
			searchContent.setAttribute("id", 'wifLocationsSearchContent'  + ConfigIndex);	
			searchContent.className ='wifLocationsSearchContent';
			
			
			r = epLoactionsSearch.getWindowSize();
			dim = r.split("|");
			searchObj.style.left = (dim[0]/2) - (SearchWindowWidth/2) + 'px';
			searchObj.style.top  = (((dim[1]/2) - (SearchWindowHeight/2)) + document.documentElement.scrollTop)  + 'px';
			if(nvxgWIF.isIE6){			
				searchIE6Hack.style.left = (dim[0]/2) - (SearchWindowWidth/2) + 'px';
				searchIE6Hack.style.top  = (((dim[1]/2) - (SearchWindowHeight/2)) + document.documentElement.scrollTop)  + 'px';
			}
			titleObj=document.createElement('DIV');
			titleObj.setAttribute("id", 'wifLocationsSearchTitleBar' + ConfigIndex);	
			titleObj.className ='wifLocationsSearchTitleBar';
			titleObj.setAttribute("ConfigIndex",ConfigIndex);
			titleObj.onmousedown=epLoactionsSearch.dragHandler;

			
			closeMenu=document.createElement('DIV');
			closeMenu.setAttribute("id", 'wifLocationsSearchTitleBarClose' + ConfigIndex);	
			closeMenu.className = "wifLocationsSearchTitleBarClose";
			closeMenu.setAttribute("title", LocationsConfiguration.Configs[ConfigIndex].buttonTxt[2]);			
			closeMenu.setAttribute("ConfigIndex",ConfigIndex);
			closeMenu.onclick=epLoactionsSearch.closeSearch; 	
			
			titleObj.appendChild(closeMenu);	
			titleTextObj=document.createElement('DIV');
			titleTextObj.setAttribute("id", 'wifLocationsSearchTitleText' + ConfigIndex);	
			titleTextObj.setAttribute("ConfigIndex",ConfigIndex);			
			titleTextObj.className ='wifLocationsSearchTitleText';
			if(LocationsConfiguration.Configs[ConfigIndex].LocationName !=undefined){
			titletext = LocationsConfiguration.Configs[ConfigIndex].LocationName
			}else{
			titletext = document.getElementById("clientname").value;
			};
			titleTextObjText = document.createTextNode(titletext);
			titleTextObj.appendChild(titleTextObjText);		
			titleTextObj.id="searchtitle" +  + ConfigIndex;
			titleObj.appendChild(titleTextObj);		
			searchContent.appendChild(titleObj);		
			
if(LocationsConfiguration.Configs[ConfigIndex].UseAdvance==false){
// SIMPLE TEXT SEARCH				
			txtSearchContainer=document.createElement('DIV');			
			instrucObj=document.createElement('DIV');
			instrucObj.setAttribute("id", 'wifLocationsSearchInstructions' + ConfigIndex);	
			instrucObj.className ='wifLocationsSearchInstructions';
			instrucObjText = document.createTextNode("");	
			instrucObj.appendChild(instrucObjText);		
			txtSearchContainer.appendChild(instrucObj);	
			htmlstr = LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[1];
			if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){htmlstr = htmlstr + LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[4]};
			htmlstr = epLoactionsSearch.instructionTextSwap(htmlstr,ConfigIndex);
			instrucObj.innerHTML = htmlstr;
			forBlockObj=document.createElement('DIV');
			forBlockObj.setAttribute("id", 'wifLocationsSearchForBlock' + ConfigIndex);	
			forBlockObj.className ='wifLocationsSearchForBlock';
			
			txtSearchContainer.appendChild(forBlockObj);	
var criteriaHTML="<table width='100%' border='0' cellspacing='0' cellpadding='0' class='textSearchControls'><tr><td><fieldset><legend>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[0] + "</legend><select id='wifSearchOnSubBlockSelect" + ConfigIndex + "' required='false'></select></fieldset></td><td><fieldset style='padding-right:38px'><legend>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[2] + "</legend><label for='checkboxMatchWholeWord" + ConfigIndex + "'><input type='checkbox' id='checkboxMatchWholeWord" + ConfigIndex + "'>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[3] + "</label><label for='checkboxMatchCase" + ConfigIndex + "'><input type='checkbox' id='checkboxMatchCase" + ConfigIndex + "'>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[4] + "</label></fieldset></td><td> </td><td style='width:100%; padding-right:5px'><fieldset style='width:100%'><legend>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[5] + "</legend><input ConfigIndex=" + ConfigIndex +" id='wifSearchForText" + ConfigIndex + "' type='text' onkeypress='epLoactionsSearch.onEnterKey(event, this)' ></fieldset></td><td><fieldset class='subLevelNavBar' style='margin-right:0px; padding-right:5px' nofloat=\"true\"><legend> </legend><a href=\"javascript:epLoactionsSearch.runSearch('"+ConfigIndex+"');void(0);\" style='float:none important; clear:both'>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[6] + "</a> <a href=\"javascript:epLoactionsSearch.clearSearch("+ConfigIndex+");void(0)\" style='float:none important' warning=\"true\">" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[7] + "</a></fieldset></td></tr></table>";
			forBlockObj.innerHTML = criteriaHTML;
			loaderObj = epLoactionsSearch.buildLoaderObj(ConfigIndex);			
						
			searchBlockObj=document.createElement('DIV');
			resultsObj = searchBlockObj;
			searchBlockObj.setAttribute("id", 'wifLocationsSearchBlock' + ConfigIndex);	
			searchBlockObj.className ='wifLocationsSearchBlock';
			searchBlockObj.appendChild(loadingBlockObj);			
			txtSearchContainer.appendChild(searchBlockObj);	
			
			txtSearchContainer.className = "txtSearchContainer";
			
			cancelButtonObj=document.createElement('A');			
			cancelButtonObj.setAttribute("id", 'wifSearchButtonCancel' + ConfigIndex);	
			cancelButtonObj.setAttribute("warn", "true");				
			cancelButtonObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[1]);
			cancelButtonObj.appendChild(cancelButtonObjText);
			cancelButtonObj.setAttribute("ConfigIndex",ConfigIndex);
			cancelButtonObj.href="javascript:epLoactionsSearch.closeSearch();void(0)";			
			
			returnButtonObj=document.createElement('A');
			returnButtonObj.setAttribute("id", 'wifSearchButtonReturnData' + ConfigIndex);	
			returnButtonObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[0]);
			returnButtonObj.appendChild(returnButtonObjText);
			returnButtonObj.href="javascript:epLoactionsSearch.returnLocationData();void(0)";			
			returnButtonObj.setAttribute("ConfigIndex",ConfigIndex); 							
			
			returnButtonDisObj=document.createElement('A');
			returnButtonDisObj.setAttribute("id", 'wifSearchButtonReturnDataDisabled' + ConfigIndex);
			returnButtonDisObj.setAttribute("disabled", "disabled");
			returnButtonDisObj.href="javascript:void(0)";
			returnButtonDisObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[0]);
			returnButtonDisObj.appendChild(returnButtonDisObjText);
			
			spanBlockObj=document.createElement('div');
			spanBlockObj.className="subLevelNavBar";
			spanBlockObj.style.cssText="float:none; clear:both"
//			spanBlockObj.setAttribute("nofloat","true"); 							
			spanBlockObj.appendChild(cancelButtonObj);	
			spanBlockObj.appendChild(returnButtonDisObj);						
			spanBlockObj.appendChild(returnButtonObj);





			
			
			countBlockObj=document.createElement('DIV');
			countBlockObj.setAttribute("id", 'wifLocationsCountLabel' + ConfigIndex);	
			countBlockObj.className ='wifLocationsCountLabel';
			countBlockObjText = document.createTextNode('');
			
			
			
			countBlockObj.appendChild(countBlockObjText);			
			returnBlockObj=document.createElement('DIV');
			returnBlockObj.setAttribute("id", 'wifLocationsReturnBlock' + ConfigIndex);	
			returnBlockObj.className ='wifLocationsReturnBlock';


			htmlbreak=document.createElement('br');
			htmlbreak.className="wifClearFloat";
			
			
			returnBlockObj.appendChild(htmlbreak);										
			returnBlockObj.appendChild(countBlockObj);				
			returnBlockObj.appendChild(htmlbreak);							
			returnBlockObj.appendChild(spanBlockObj);	
			returnBlockObj.appendChild(htmlbreak);							
						
			
			
			
//			returnBlockObj.appendChild(cancelButtonObj);	
//			returnBlockObj.appendChild(returnButtonObj);
//			returnBlockObj.appendChild(returnButtonDisObj);			

			txtSearchContainer.appendChild(returnBlockObj);
			if(nvxgWIF.isIE6){			
				document.body.appendChild(searchIE6Hack);			
			}
			searchContent.appendChild(txtSearchContainer);			
			searchObj.appendChild(searchContent);
			document.body.appendChild(searchObj);

			document.getElementById("wifSearchButtonReturnData" + ConfigIndex).style.display = 'none';			
			epLoactionsSearch.loadSearchOnOptions(ConfigIndex);
			for (var s=0; s < LocationsConfiguration.Configs[ConfigIndex].SortIndex.length; s++){
				epLoactionsSearch.sortLocations(LocationsConfiguration.Configs[ConfigIndex].SortIndex[s],SortOrder,ConfigIndex);
			};
		}else{
// ADVANCE SEARCH			
			advSearchContainer=document.createElement('DIV');	
			advSearchContainer.className = "advSearchContainer";
			advSearchContainer.id = "advSearchContainerCriteria" + ConfigIndex;			
			instrucObj=document.createElement('DIV');
			instrucObj.setAttribute("id", 'wifLocationsSearchInstructions' + ConfigIndex);	
			instrucObj.className ='wifLocationsSearchInstructions';
			instrucObjText = document.createTextNode("");	
			instrucObj.appendChild(instrucObjText);		
			advSearchContainer.appendChild(instrucObj);	
			htmlstr = LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[2];
			htmlstr = epLoactionsSearch.instructionTextSwap(htmlstr,ConfigIndex);
			instrucObj.innerHTML = htmlstr;			
			advOptionContainer=document.createElement('DIV');
			advOptionContainer.id = "advOptionContainer" + ConfigIndex;
			advOptionContainer.className="advOptionContainer";
			advOptionContainer.style.width="100%";
			advOptionTable=epLoactionsSearch.buildAdvOptionTable(ConfigIndex);
			advOptionContainer.appendChild(advOptionTable);																			
			advSearchContainer.appendChild(advOptionContainer);		
			
			
			returnBlockObj=document.createElement('DIV');
			returnBlockObj.setAttribute("id", 'wifLocationsOptionBlock' + ConfigIndex);	
			returnBlockObj.className ='wifLocationsReturnBlock';
			
			
			spanButtons=document.createElement('div');
			spanButtons.style.paddingTop="8px";
			spanButtons.className="subLevelNavBar";
			advButtonObj01=document.createElement('A');
			advButtonObj01.href="javascript:epLoactionsSearch.clearAdvOptionTable("+ ConfigIndex + ")";
			advButtonObj01txt = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[7]);
			advButtonObj01.appendChild(advButtonObj01txt);
			advButtonObj02=document.createElement('A');
			advButtonObj02.href="javascript:epLoactionsSearch.runAdvanceSearch("+ ConfigIndex + ")";
			advButtonObj02txt = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[6]);
			advButtonObj02.appendChild(advButtonObj02txt);
			advButtonObj03=document.createElement('A');
			advButtonObj03.setAttribute("ConfigIndex",ConfigIndex);
			advButtonObj03.setAttribute("warning","true");			
//			advButtonObj03.style.marginRight="8px";
			advButtonObj03.onclick = epLoactionsSearch.closeSearch;
			advButtonObj03txt = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[1]);
			advButtonObj03.appendChild(advButtonObj03txt);
			spanButtons.appendChild(advButtonObj03);	
			spanButtons.appendChild(advButtonObj01);				
			spanButtons.appendChild(advButtonObj02);	
			
			
			returnBlockObj.appendChild(spanButtons);				
	htmlbreak=document.createElement('br');
	htmlbreak.className="wifClearFloat";
	returnBlockObj.appendChild(htmlbreak);																			
			
			advSearchContainer.appendChild(returnBlockObj);
			searchContent.appendChild(advSearchContainer);				
			searchObj.appendChild(searchContent);			
			document.body.appendChild(searchObj);
			d	= 	advOptionTable.getElementsByTagName("SELECT");
			for (i=0;i<d.length;i++) {
				d[i].selectedIndex = -1;
			};
			
		};
		};
		

	},
buildLoaderObj:function(ConfigIndex){
			loadingBlockObj=document.createElement('DIV');
			loadingBlockObj.setAttribute("id", 'wifSearchLoading' + ConfigIndex);	
			loadingBlockObj.className ='wifSearchLoading';
			loadingBlockObjObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].msgTxt[0]);	
			var target = document.getElementById('wifSearchLoading' + ConfigIndex);
			var spinner = new Spinner(spinopts).spin(target);
			loadingBlockObj.appendChild(loadingBlockObjObjText);
			return loadingBlockObj;
},
	

buildAdvOptionTable:function(ConfigIndex){
			advOptionTable=document.createElement('TABLE');				
			advOptionTable.id="advSearchControls"+ConfigIndex;			
			advOptionTable.border="0";
			advOptionTable.cellspacing="4";
			advOptionTable.cellpadding="0";
			advOptionTable.className="advSearchControls";
			advOptionTHead=document.createElement('THEAD');				
			advOptionTR=document.createElement('TR');				
			advOptionTH1=document.createElement('TH');
			advOptionTH1B=document.createElement('TH');
			advOptionTH1C=document.createElement('TH');			
			advOptionTH2=document.createElement('TH');
			advOptionTH3=document.createElement('TH');
			advOptionTH4=document.createElement('TH');		
			advOptionTH1.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[9];	
			advOptionTH1B.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[14];							
			advOptionTH1C.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[15];				
			advOptionTH2.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[10];	
			advOptionTH3.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[11];	
			advOptionTH4.innerHTML="&nbsp;";										
			advOptionTR.appendChild(advOptionTH1);
			advOptionTR.appendChild(advOptionTH1C);														
			advOptionTR.appendChild(advOptionTH1B);											
			advOptionTR.appendChild(advOptionTH2);				
			advOptionTR.appendChild(advOptionTH3);				
//			advOptionTR.appendChild(advOptionTH4);				
			advOptionTHead.appendChild(advOptionTR);				
			advOptionTable.appendChild(advOptionTHead);																			
			advOptionTBody=document.createElement('TBODY');				

		var ColorKeyCount = 0;
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
			const LocationHeader = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i];
			if(LocationHeader.key!="BR" && LocationHeader.key!="H4" && LocationHeader.key!="BUTTONSET"  && LocationHeader.searchon){
				advOptionTR=document.createElement('TR');				
				advOptionTD1=document.createElement('TH'); 
				advOptionLABEL=document.createElement('LABEL');
				advOptionLABEL.onclick = epLoactionsSearch.selectSearchSortLabel;
				advOptionLABEL.setAttribute("ConfigIndex",ConfigIndex );
				advOptionLABEL.setAttribute("LocKey",LocationHeader.key);				
				advOptionLABELtxtx = document.createTextNode(LocationHeader.label);							
				advOptionLABEL.htmlFor= "SearchSort" + ConfigIndex + LocationHeader.key ;				
				advOptionLABEL.appendChild(advOptionLABELtxtx);									
				advOptionTD1.appendChild(advOptionLABEL);									
				advOptionTD1B=document.createElement('TD');				
				advOptionSPAN=document.createElement('SPAN'); 				
				advOptionSPAN.innerHTML = " ";
				advOptionSPAN.style.backgroundColor=LocationsConfiguration.HighLightHexColors[ColorKeyCount];
				ColorKeyCount=ColorKeyCount+1; if(ColorKeyCount==12){ColorKeyCount=0};
				advOptionTD1B.appendChild(advOptionSPAN);					
				advOptionTD1C=document.createElement('TD');				
				guielm=document.createElement('INPUT');					
				guielm.type = "radio";
				guielm.name = "SearchSort" + ConfigIndex;
				guielm.id = "SearchSort" + ConfigIndex + LocationHeader.key ;
				//if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){
				//	guielm.value = LocationHeader.enchanced;				
				//}else{
					guielm.value = LocationHeader.key;					
				//};
				guielm.title=LocationsConfiguration.Configs[ConfigIndex].buttonTxt[3];
				if(LocationHeader.key !="ad1"){
					if(LocationHeader.key==LocationsConfiguration.Configs[ConfigIndex].SortIndex[LocationsConfiguration.Configs[ConfigIndex].SortIndex.length-1]){guielm.checked= true};
					advOptionTD1C.appendChild(guielm);		
				};
				advOptionTD2=document.createElement('TD');
				advOptionTD3=document.createElement('TD');				
				if(LocationHeader.htmltype == "select"){
					guielm=document.createElement('SELECT');
					guielm.id = "Criteria" + ConfigIndex + LocationHeader.key ;					
					guielm.setAttribute("KEY",LocationHeader.key);
					guielm.setAttribute("CONFIGINDEX",ConfigIndex);	
					guielm.onchange = epLoactionsSearch.setOperator;				
					optioncontrol=document.createElement('option');
					optioncontroltxt = document.createTextNode("");							
					optioncontrol.appendChild(optioncontroltxt);		
					guielm.appendChild(optioncontrol);		
					ajaxkey=LocationHeader.key;if(ajaxkey=="cntry"){ajaxkey="country"};
					epLoactionsSearch.getListValuesQuery(ajaxkey,guielm,i,ConfigIndex);
					advOptionTD2.appendChild(guielm);									
					advOptionTD3SPAN=document.createElement('SPAN');				
					advOptionTD3SPAN.innerHTML=" ";
					advOptionTD3SPAN.id = "Operator" + ConfigIndex + LocationHeader.key ;					
					advOptionTD3.appendChild(advOptionTD3SPAN);		
				}else{
					guielm=document.createElement('INPUT');					
					guielm.type = "text";
					if(LocationHeader.autosuggest){
						guielm.setAttribute("list","datalist" + LocationHeader.mapto);	
					};
					
					
					guielm.id = "Criteria" + ConfigIndex + LocationHeader.key ;				
					if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].attributes!=undefined){
						for (var a=0; a < LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].attributes.length; a++){
							objdata=LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].attributes[a];
							for (var key in objdata) {
							   var value = objdata[key];
							   guielm.setAttribute(key, value);
							};
						};
					};
					if(guielm.addEventListener){
						 guielm.addEventListener("blur", epLoactionsSearch.setOperator);
					} else {
						 guielm.attachEvent("onblur", epLoactionsSearch.setOperator);
					};							
					if(guielm.addEventListener){
						 guielm.addEventListener("keyup", epLoactionsSearch.setOperator);
					} else {
						 guielm.attachEvent("onkeyup", epLoactionsSearch.setOperator);
					};					
					
					
					
					advOptionTD2.appendChild(guielm);		
					guielm.setAttribute("KEY",LocationHeader.key);
					guielm.setAttribute("CONFIGINDEX",ConfigIndex);					
					if(LocationHeader.key !="ad1"){
						OperatorSelect=document.createElement('SELECT');	
						OperatorSelect.setAttribute("KEY",LocationHeader.key);
						OperatorSelect.setAttribute("CONFIGINDEX",ConfigIndex);					
						OperatorSelect.id = "Operator" + ConfigIndex + LocationHeader.key ;					
						OperatorOption1=document.createElement('OPTION');OperatorOption1.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[12];	
						OperatorOption2=document.createElement('OPTION');OperatorOption2.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[13];
						OperatorSelect.appendChild(OperatorOption1);							
						OperatorSelect.appendChild(OperatorOption2);
						OperatorSelect.disabled=true;
						advOptionTD3.appendChild(OperatorSelect);																			
						OperatorSelect.selectedIndex = -1;						
					}else{
					advOptionTD3SPAN=document.createElement('SPAN');		
					advOptionTD3SPAN.id = "Operator" + ConfigIndex + LocationHeader.key ;												
					advOptionTD3SPAN.innerHTML=" ";
					advOptionTD3.appendChild(advOptionTD3SPAN);		
					
					};
				};
				var advOptionTD4=document.createElement('TD');		
				advOptionTR.appendChild(advOptionTD1);	
				advOptionTR.appendChild(advOptionTD1B);	
				advOptionTR.appendChild(advOptionTD1C);	
				advOptionTR.appendChild(advOptionTD2);				
				advOptionTR.appendChild(advOptionTD3);				
				advOptionTBody.appendChild(advOptionTR);				
				advOptionTable.appendChild(advOptionTBody);																			
				advOptionTD4.innerHTML=" ";
			};
		
		};



	return advOptionTable
},
// --------------------------------------------------------------------------------------------------------------------	
	selectSearchSortLabel:function(e){
		var obj = epLoactionsSearch.getEventTarget(e);
		ConfigIndex=obj.getAttribute("ConfigIndex");
		LocKey=obj.getAttribute("LocKey");		
		targ = document.getElementById("Criteria" + ConfigIndex + LocKey );
//		alert(LocKey);
		targ.focus();
	},
// --------------------------------------------------------------------------------------------------------------------	
clearAdvOptionTable:function(ConfigIndex){
	nvxgWIF.removeObj("advSearchControls"+ConfigIndex);
	advOptionTable=epLoactionsSearch.buildAdvOptionTable(ConfigIndex);
	advOptionContainer=document.getElementById("advOptionContainer" + ConfigIndex);
	htmlbreak=document.createElement('br');
	htmlbreak.className="wifClearFloat";
	advOptionContainer.appendChild(htmlbreak);																			
	advOptionContainer.appendChild(advOptionTable);																			
	advOptionContainer.appendChild(htmlbreak);																				
	
	d	= 	advOptionTable.getElementsByTagName("SELECT");
	for (i=0;i<d.length;i++) {
		d[i].selectedIndex = -1;
	};

},
// --------------------------------------------------------------------------------------------------------------------	
runAdvanceSearch: function(ConfigIndex) {
	const LocationConfig = LocationsConfiguration.Configs[ConfigIndex];
	const usesCmLocations = LocationConfig?.UseEnhanced;
	const filterObjArr = [];
	
	for (let i = 0; i < LocationConfig.SearchHeader.length; i++) {
		const LocationHeader = LocationConfig.SearchHeader[i];
		if (LocationHeader.key != "BR" && LocationHeader.key != "H4" && LocationHeader.key !="BUTTONSET" && LocationHeader.searchon) {
			if (LocationHeader.htmltype == "select") {
				const slem = document.getElementById("Criteria" + ConfigIndex + LocationHeader.key);					
				if (slem.selected != 0 && slem.value != "") {
					const { key: field } = LocationHeader;
					const value = escape(slem.value);
					const exactMatch = true;

					filterObjArr.push({ field, value, exactMatch });
				}
			} else {
				const slem = document.getElementById("Criteria" + ConfigIndex + LocationHeader.key) ;					
				const teststr = epLoactionsSearch.trimString(slem.value);
				if (teststr.length != 0) {
					const { key: field } = LocationHeader;
					const value = escape(teststr);
					const exactMatch = document.getElementById("Operator" + ConfigIndex + LocationHeader.key).selectedIndex == 1;

					filterObjArr.push({ field, value, exactMatch });
				}
			}
		}
	}

	const filterStringOpts = { filters: filterObjArr };
	const sortByField = document.querySelector(`[name="SearchSort${ConfigIndex}"]:checked`)?.value;
	if (sortByField) {
		LocationConfig.SortIndex.length = 0;
		LocationConfig.SortIndex[0] = sortByField;

		filterStringOpts.sortBy = sortByField;
	}

	const filterString = epLoactionsSearch.createFilterString(filterStringOpts);
	let xURL = jsonServicesBasePath + LocationConfig.JSONServiceLOC + ".aspx?clientid=" + LocationConfig.LocationSourceID + filterString;
	if (usesCmLocations && dbname) {
		xURL += `&clientkey=${dbname}`;
	}

	document.getElementById("advSearchContainerCriteria" + ConfigIndex).style.display = "none";
	const LOADER = epLoactionsSearch.buildLoaderObj(ConfigIndex);
	const obj = document.getElementById("wifLocationsSearchContainer" + ConfigIndex);
	obj.appendChild(LOADER);

	if (xURL != "") {
		epLoactionsSearch.load(xURL, function(http) {
			if (http.readyState == 4) {
				let HTTPresponseText = http.responseText;
				if (LocationConfig.UseEnhanced) {
					for (i = 0; i < LocationConfig.SearchHeader.length; i++) {
						if (LocationConfig.SearchHeader[i].key != "BUTTONSET" && LocationConfig.SearchHeader[i].key != "BR" && LocationConfig.SearchHeader[i].key != "H4") {
							const regExp = new RegExp(LocationConfig.SearchHeader[i].enchanced + "\":", "g");
							HTTPresponseText = HTTPresponseText.replace(regExp, LocationConfig.SearchHeader[i].key + "\":");
						}
					}
				}
				const regExp = new RegExp("null", "g");
				HTTPresponseText = HTTPresponseText.replace(regExp, '""');
				eval(HTTPresponseText);

				epLoactionsSearch.Locations = Locations;
				epLoactionsSearch.RawRecordDataCount = Locations.length;

				epLoactionsSearch.cleanLocations(ConfigIndex);
				
				if (LocationConfig.AllowOther) {
					epLoactionsSearch.addLocation(ConfigIndex);
				}

				epLoactionsSearch.loadAdvanceSearch(ConfigIndex);
			}
		});
	}
},
loadAdvanceSearch:function(ConfigIndex){

								
								
			advSearchResultsContainer=document.createElement('DIV');	
			advSearchResultsContainer.className = "advSearchContainer";
			advSearchResultsContainer.id = "advSearchContainerResults" + ConfigIndex;			
			instrucResultsObj=document.createElement('DIV');
			instrucResultsObj.setAttribute("id", 'wifLocationsSearchResultsInstructions' + ConfigIndex);	
			instrucResultsObj.className ='wifLocationsSearchInstructions';
			instrucResultsObjText = document.createTextNode("");	
			instrucResultsObj.appendChild(instrucResultsObjText);		
			
			advSearchResultsContainer.appendChild(instrucResultsObj);	
			htmlstr = LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[3];
			if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){htmlstr = htmlstr + LocationsConfiguration.Configs[ConfigIndex].instructionsTxt[4]};
			htmlstr = epLoactionsSearch.instructionTextSwap(htmlstr,ConfigIndex);
			instrucResultsObj.innerHTML = htmlstr;			
			nvxgWIF.removeObj('wifSearchLoading' + ConfigIndex);

			searchContent.appendChild(advSearchResultsContainer);
			
			selectedLocationID = null;
			config = ConfigIndex;
			rowcount = 0;
			
			
			
			searchBlockObj=document.createElement('DIV');
			searchBlockObj.setAttribute("id", 'wifLocationsSearchBlock' + ConfigIndex);	
			searchBlockObj.className ='wifLocationsAdvSearchBlock';


			searchTable=document.createElement('table');
			searchTable.setAttribute("id", 'wifRecordTable'+ConfigIndex);	
			searchTable.className = "wifRecordTable";		
			searchTable.setAttribute("cellPadding", 0);			
			searchTable.setAttribute("cellSpacing", 0);			
			searchTable.setAttribute("border", 0);			
			thead = epLoactionsSearch.createTableHeaders(ConfigIndex);
			tbody = epLoactionsSearch.createAdvanceTableBody(ConfigIndex);			
			searchTable.appendChild(thead);					
			searchTable.appendChild(tbody);								
			searchBlockObj.appendChild(searchTable);
			
			
			searchContent.appendChild(searchBlockObj);					
			
			returnBlockObj=document.createElement('DIV');
			returnBlockObj.setAttribute("id", 'wifLocationsReturnBlock' + ConfigIndex);	
			returnBlockObj.className ='wifLocationsReturnBlock';
			returnBlockObj.style.height="40pt"
			returnBlockObj.style.marginTop="6px";
			
			
			
			
			cancelButtonObj=document.createElement('A');			
			cancelButtonObj.setAttribute("id", 'wifSearchButtonCancel' + ConfigIndex);	
			cancelButtonObj.setAttribute("warning", "true");				
			cancelButtonObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[1]);
			cancelButtonObj.appendChild(cancelButtonObjText);
			cancelButtonObj.setAttribute("ConfigIndex",ConfigIndex);
			cancelButtonObj.href="javascript:epLoactionsSearch.closeSearch();void(0)";			

			returnButtonObj=document.createElement('A');
			returnButtonObj.setAttribute("id", 'wifSearchButtonReturnData' + ConfigIndex);	
			returnButtonObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[0]);
			returnButtonObj.appendChild(returnButtonObjText);
			returnButtonObj.href="javascript:epLoactionsSearch.returnLocationData();void(0)";			
			returnButtonObj.setAttribute("ConfigIndex",ConfigIndex); 							
			returnButtonObj.style.display="none";

			
			returnButtonDisObj=document.createElement('A');
			returnButtonDisObj.setAttribute("id", 'wifSearchButtonReturnDataDisabled' + ConfigIndex);
			returnButtonDisObj.setAttribute("disabled", "disabled");
			returnButtonDisObj.href="javascript:void(0)";
			returnButtonDisObjText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].buttonTxt[0]);
			returnButtonDisObj.appendChild(returnButtonDisObjText);

			countBlockObj=document.createElement('DIV');
			countBlockObj.setAttribute("id", 'wifLocationsCountLabel' + ConfigIndex);	
			countBlockObj.className ='wifLocationsCountLabel';
	
		htmlbreak=document.createElement('br');
		htmlbreak.className="wifClearFloat";

			countBlockObjText = document.createTextNode("");										
			countBlockObj.appendChild(countBlockObjText);
			returnBlockObj.appendChild(countBlockObj);																						
			

			spanBlockObj=document.createElement('div');
			spanBlockObj.className="subLevelNavBar";
			spanBlockObj.appendChild(cancelButtonObj);	
			spanBlockObj.appendChild(returnButtonObj);
			spanBlockObj.appendChild(returnButtonDisObj);			

			spanBlockObj.appendChild(htmlbreak);				


	
			returnBlockObj.appendChild(spanBlockObj);																						
				returnBlockObj.appendChild(htmlbreak);																						

			
			
		if(epLoactionsSearch.RawRecordDataCount >= 1000){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[1]};
		if(epLoactionsSearch.RawRecordDataCount == 0){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[2]};		
		if(epLoactionsSearch.RawRecordDataCount > 0 && epLoactionsSearch.RawRecordDataCount < 1000){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[3]};				
		epLoactionsSearch.ProcessedRecordDataCount=tbody.rows.length;
		countBlockObj.innerHTML = epLoactionsSearch.instructionTextSwap(str,ConfigIndex);
//		searchBlockObj.style.cursor="auto";
		searchContent.appendChild(returnBlockObj);																						
		searchContent.style.paddingBottom="10px";
		searchContent.appendChild(htmlbreak);																								
},
// --------------------------------------------------------------------------------------------------------------------	
	createAdvanceTableBody : function(ConfigIndex){
		tbody=document.createElement('tbody');	
		
		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){
			for (var i=0; i < epLoactionsSearch.Locations.length-1; i++){
				if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){
					if(epLoactionsSearch.Locations[0].LocationId==-1){break};
				}else{
					if(epLoactionsSearch.Locations[i].lcid==-1){break};
				};
			}
			OtherRow = epLoactionsSearch.createAdvanceTableRow(i,myRegExp,ConfigIndex);
			OtherRow.setAttribute("isother","isother");		
		};

		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther && LocationsConfiguration.Configs[ConfigIndex].PostionOtherAtTop && epLoactionsSearch.Locations.length!=1){tbody.appendChild(OtherRow)};			

		for (var i=0; i < (epLoactionsSearch.Locations.length); i++){
			testString = "";

					tr = epLoactionsSearch.createAdvanceTableRow(i,"",ConfigIndex);
					tbody.appendChild(tr);
		}
		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther && LocationsConfiguration.Configs[ConfigIndex].PostionOtherAtTop==false){tbody.appendChild(OtherRow)};			
		return tbody;

		

	},

// --------------------------------------------------------------------------------------------------------------------
	createAdvanceTableRow : function(index,myRegExp,ConfigIndex){

		tr=document.createElement('tr');
		tr.setAttribute("locationid", epLoactionsSearch.Locations[index].lcid);
		tr.setAttribute("tabindex", 0);		
		tr.setAttribute("ConfigIndex",ConfigIndex);
		
		tr.onclick=epLoactionsSearch.selectLocation; 									
		tr.ondblclick=epLoactionsSearch.returnLocationData; 
		tr.onkeypress=epLoactionsSearch.presskey; 
		tr.onfocus=epLoactionsSearch.selectLocation; 		
		myhcolor=0;
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){		
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].searchon){
				td=document.createElement('td');
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol != undefined){
				th.setAttribute("width",LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol); 
				};
				ul=document.createElement('ul');
				li=document.createElement('li');
				tempText = epLoactionsSearch.Locations[index][LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key] + "";


				liText = document.createTextNode('');
				
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth != undefined){
					td.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth + 4)+ 'px';
					ul.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth + 2)+ 'px';
					li.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth) + 'px';
				};

				li.appendChild(liText);
				tempText = tempText.replace("null","");
				tempText = tempText.replace("undefined","");
				tempText = tempText.replace(LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel,"<em style='color:#CC0000'>" + LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel + "</em>");
				tempText = tempText.replace(OtherPrefix,"");
				slemstr = "Criteria" + ConfigIndex + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key + "";	
				j = document.getElementById(slemstr).value;
				if(tempText.indexOf(LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel)!=-1){j=""};
				if(j !="" ){
					h = tempText;
					q = h.toUpperCase();
					k = j.toUpperCase();
					s = q.indexOf(k);
					w = q.length
					t = j.length;
					s = q.indexOf(j.toUpperCase());
					a = tempText.substr(0,s);
					b = tempText.substr(s,t);
					c = tempText.substr(s+t,w-s+1+t+1);
					tempText = a + "<span style='background-color:" + LocationsConfiguration.HighLightHexColors[myhcolor] +"'>" + b  + "</span>" + c;
				};
				li.innerHTML = tempText;
				ul.appendChild(li);
				td.appendChild(ul);
				tr.appendChild(td);	
				tempText = null;
				

				myhcolor=myhcolor+1;			
			}
		}
		rowcount = rowcount + 1;
		return tr;
	},

// --------------------------------------------------------------------------------------------------------------------
	loadSearchOnOptions : function(ConfigIndex){
		selectObj = document.getElementById("wifSearchOnSubBlockSelect" + ConfigIndex);
		newOption=document.createElement('option');
		newOptionText = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[1]);
		newOption.setAttribute("value", '-1');	
		newOption.setAttribute("selected", 'true');	
		newOption.appendChild(newOptionText);
		selectObj.appendChild(newOption);		
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].searchon){
				newOption=document.createElement('option');
				text=nvxgWIF.removeHTMLTags(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].label);
				newOptionText = document.createTextNode(text);
				newOption.setAttribute("value", LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key);
				//alldictionary = alldictionary + "," + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key 
				newOption.appendChild(newOptionText);
				selectObj.appendChild(newOption);		
			};
		};
	},
// --------------------------------------------------------------------------------------------------------------------
	preformSearch : function(ConfigIndex){
		selectedLocationID = null;
		config = ConfigIndex;
		document.getElementById("wifSearchButtonReturnDataDisabled" + ConfigIndex).style.display = '';
		document.getElementById("wifSearchButtonReturnData" + ConfigIndex).style.display = 'none';		
		rowcount = 0;
		countLabel = document.getElementById("wifLocationsCountLabel" + ConfigIndex);
		countLabel.innerHTML = '';
		epLoactionsSearch.clearResults(ConfigIndex);
		searchTable=document.createElement('table');
		searchTable.setAttribute("id", 'wifRecordTable'+ConfigIndex);	
		searchTable.className = "wifRecordTable";		
		searchTable.setAttribute("cellPadding", 0);			
		searchTable.setAttribute("cellSpacing", 0);			
		searchTable.setAttribute("border", 0);			
		thead = epLoactionsSearch.createTableHeaders(ConfigIndex);
		searchTable.appendChild(thead);	
		
		tbody = epLoactionsSearch.createTableBody(ConfigIndex);

		searchTable.appendChild(tbody);			
		resultsObj.appendChild(searchTable);
		if(tbody.rows.length>0 && seachOnText !=""){tbody.rows[0].focus()}else{document.getElementById("wifSearchForText" + ConfigIndex).focus();};
		epLoactionsSearch.ProcessedRecordDataCount=tbody.rows.length;

		
		if(epLoactionsSearch.RawRecordDataCount >= 1000){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[1]};
		if(epLoactionsSearch.RawRecordDataCount == 0){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[2]};		
		if(epLoactionsSearch.RawRecordDataCount > 0 && epLoactionsSearch.RawRecordDataCount < 1000){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[3]};				
		epLoactionsSearch.ProcessedRecordDataCount=tbody.rows.length;
		txtstr=epLoactionsSearch.trimString(document.getElementById("wifSearchForText" + ConfigIndex).value);;
		if(epLoactionsSearch.TextSearchCount > 0 && txtstr!="")  {str= LocationsConfiguration.Configs[ConfigIndex].msgTxt[3]};
		if(epLoactionsSearch.TextSearchCount == 0  && txtstr!=""){str=LocationsConfiguration.Configs[ConfigIndex].msgTxt[2]};				
		countLabel.innerHTML = epLoactionsSearch.instructionTextSwap(str,ConfigIndex);
		
		
		
			

	},
// --------------------------------------------------------------------------------------------------------------------//
	createTableHeaders : function(ConfigIndex){
		thead=document.createElement('thead');		
		tr=document.createElement('tr');			
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){		
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].searchon){
				th=document.createElement('th');
				text = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].searchlabel ? LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].searchlabel : LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].label;				
				th.setAttribute("title", LocationsConfiguration.Configs[ConfigIndex].buttonTxt[3]);	
				ul=document.createElement('ul');
				li=document.createElement('li');
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key == LocationsConfiguration.Configs[ConfigIndex].SortIndex){text = text + ' ' + SortChr;};
				liText = document.createTextNode("");
				th.setAttribute("arrycolindex", LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key);
				th.onclick = epLoactionsSearch.setSort;
				th.setAttribute("ConfigIndex",ConfigIndex);
//				th.onmouseover = epLoactionsSearch.mouseoverHeader;
//				th.onfocus = epLoactionsSearch.mouseoverHeader;				
//				th.onmouseout = epLoactionsSearch.mouseoutHeader;
//				th.onblur = epLoactionsSearch.mouseoutHeader;
				th.onkeypress = epLoactionsSearch.headerpresskey;				
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth != undefined){
					th.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth + 4)+ 'px';
				}
				th.setAttribute("ConfigIndex",ConfigIndex);
				th.setAttribute("scope","col");				
				th.setAttribute("tabindex", 0);

				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol != undefined){
					th.setAttribute("width",LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol); 
					//we = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol + 'px';
					//alert(we)
					};
				li.appendChild(liText);
				li.innerHTML=text;
				ul.appendChild(li);		
				th.appendChild(ul);						
				tr.appendChild(th);	
			};
		};
		thead.appendChild(tr);		
		return thead;
	},	
// --------------------------------------------------------------------------------------------------------------------
	headerpresskey : function(e){
		var charCode;
		if(e && e.which){
			charCode = e.which;
			}else if(window.event){e = window.event;        charCode = e.keyCode;}
			if(charCode == 13) {
				epLoactionsSearch.setSort(e);
			};
	},	
// --------------------------------------------------------------------------------------------------------------------
	createTableBody : function(ConfigIndex){
		epLoactionsSearch.TextSearchCount=0;
		seachOnIndex = document.getElementById("wifSearchOnSubBlockSelect" + ConfigIndex).value;		
		seachOnText = epLoactionsSearch.trimString(document.getElementById("wifSearchForText" + ConfigIndex).value);
		var seachOnWholeWord = "";
		if(document.getElementById("checkboxMatchWholeWord" + ConfigIndex).checked){seachOnWholeWord = "\\b"}else{gIsWholeWordMatch=""};
		if(document.getElementById("checkboxMatchCase" + ConfigIndex).checked){seachOnCase = "g"}else{seachOnCase="gi"};
		regTEXT = seachOnWholeWord + seachOnText + seachOnWholeWord;
		tbody=document.createElement('tbody');	
		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){
			for (var i=0; i < epLoactionsSearch.Locations.length-1; i++){
				if(LocationsConfiguration.Configs[ConfigIndex].UseEnhanced){
					if(epLoactionsSearch.Locations[0].LocationId==-1){break};
				}else{
					if(epLoactionsSearch.Locations[i].lcid==-1){break};
				};
			};
			OtherRow = epLoactionsSearch.createTableRow(i,myRegExp,ConfigIndex);
			OtherRow.setAttribute("isother","isother");

		};
		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther && LocationsConfiguration.Configs[ConfigIndex].PostionOtherAtTop){tbody.appendChild(OtherRow)};			
		var testString = "";
		for (var i=0; i < (epLoactionsSearch.Locations.length); i++){
			testString = "";
			if(seachOnIndex == -1){
				for (var e=0; e < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; e++){		
					if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[e].searchon){
						//testString = testString + " " + epLoactionsSearch.getKeyValue(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[e].key,i);
						
						testString = testString + " " + epLoactionsSearch.Locations[i][LocationsConfiguration.Configs[ConfigIndex].SearchHeader[e].key];
					}
				}
			}else{
				testString = epLoactionsSearch.Locations[i][seachOnIndex];
				//testString = epLoactionsSearch.getKeyValue(seachOnIndex,i);
			}

			if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey!=""){
				if(epLoactionsSearch.Locations[i][LocationsConfiguration.Configs[ConfigIndex].SubSearchKey]==document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[epLoactionsSearch.getLoctionKeyIndex(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey,ConfigIndex)].mapto).value){
					myRegExp = new RegExp();
					myRegExp.compile(regTEXT,seachOnCase);
					foundit = testString.search(myRegExp) ;
					if(foundit != -1 ){
						
						tr = epLoactionsSearch.createTableRow(i,myRegExp,ConfigIndex);
						tbody.appendChild(tr);
						epLoactionsSearch.TextSearchCount=epLoactionsSearch.TextSearchCount +1;
					}

				}
			}else{
				myRegExp = new RegExp();
				myRegExp.compile(regTEXT,seachOnCase);
				foundit = testString.search(myRegExp) ;
				if(foundit != -1 ){
					tr = epLoactionsSearch.createTableRow(i,myRegExp,ConfigIndex);
					tbody.appendChild(tr);
						epLoactionsSearch.TextSearchCount=epLoactionsSearch.TextSearchCount +1;					
				}				
			}
		};

		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther && LocationsConfiguration.Configs[ConfigIndex].PostionOtherAtTop==false){tbody.appendChild(OtherRow)};			
		return tbody;
	},
// --------------------------------------------------------------------------------------------------------------------
	presskey : function(e){
		var charCode;
		if(e && e.which){
			charCode = e.which;
			}else if(window.event){e = window.event;        charCode = e.keyCode;}
			if(charCode == 13) {
			var obj = epLoactionsSearch.getEventTarget(e);
			ConfigIndex = Number(obj.getAttribute("ConfigIndex"));
			epLoactionsSearch.selectLocation(e);
			epLoactionsSearch.returnLocationData(e);
			};
	},
// --------------------------------------------------------------------------------------------------------------------
	setRowFocus : function(e){
		var row = epLoactionsSearch.getEventTarget(e);
		row.scrollIntoView();
	},
// --------------------------------------------------------------------------------------------------------------------
	createTableRow : function(index,myRegExp,ConfigIndex){
		seachOnText = epLoactionsSearch.trimString(document.getElementById("wifSearchForText" + ConfigIndex).value);
		seachOnIndex = document.getElementById("wifSearchOnSubBlockSelect" + ConfigIndex).value;
		tr=document.createElement('tr');
		tr.setAttribute("locationid", epLoactionsSearch.Locations[index].lcid);
		tr.setAttribute("tabindex", 0);		
		tr.setAttribute("ConfigIndex",ConfigIndex);	
		tr.onclick=epLoactionsSearch.selectLocation; 									
		tr.ondblclick=epLoactionsSearch.returnLocationData; 
		tr.onkeypress=epLoactionsSearch.presskey; 
		tr.onfocus=epLoactionsSearch.selectLocation; 		
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){		
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].searchon){
				td=document.createElement('td');
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol != undefined){
					th.setAttribute("width",LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedcol); 
				};
				ul=document.createElement('ul');
				li=document.createElement('li');
				tempText = epLoactionsSearch.Locations[index][LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key] + "";
				if(seachOnIndex==LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key || seachOnIndex== -1){
					if(tempText!="null"){
						h = tempText;						
						j = seachOnText;
						q = h.toUpperCase();
						k = j.toUpperCase();
						s = q.indexOf(k);
						if(s!=-1 && seachOnText !='' ){
							w = q.length
							t = seachOnText.length;
							s = q.indexOf(seachOnText.toUpperCase());
							a = tempText.substr(0,s);
							b = tempText.substr(s,t);
							c = tempText.substr(s+t,w-s+1+t+1);
							if(document.getElementById("checkboxMatchCase" + ConfigIndex).checked){
								if(b == j){tempText = a + "<span style='background-color:" + LocationsConfiguration.HighLightHexColors[0] + "'>" + b + "</span>" + c;};
							}else{
								tempText = a + "<span style='background-color:" + LocationsConfiguration.HighLightHexColors[0] + "'>" + b + "</span>" + c;
							}
						};
					};
				}
				liText = document.createTextNode('');
				
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth != undefined){
					td.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth + 4)+ 'px';
					ul.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth + 2)+ 'px';
					li.style.width = (LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].fixedwidth) + 'px';
				};
				li.appendChild(liText);
				tempText = tempText.replace("null","");
				tempText = tempText.replace(LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel,"<em style='color:#CC0000'>" + LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel + "</em>");
				tempText = tempText.replace(OtherPrefix,"");
				
				li.innerHTML = tempText;
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].csstext != undefined){
				li.style.cssText = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].csstext;
				};
				ul.appendChild(li);
				td.appendChild(ul);
				tr.appendChild(td);				
			}
		}
		rowcount = rowcount + 1;
		return tr;
	},	
// --------------------------------------------------------------------------------------------------------------------
	clearResults : function(ConfigIndex){
		if(resultsObj.childNodes.length != 0){
			resultsObj.removeChild(resultsObj.childNodes[0]);
		};
		countLabel = document.getElementById("wifLocationsCountLabel" + ConfigIndex);
		countLabel.innerHTML = '';		
	},	
// --------------------------------------------------------------------------------------------------------------------
	dragHandler : function(e){ 
		var htype='-moz-grabbing'; 
		if (e == null) {e = window.event; htype='move';}
		var target = e.target != null ? e.target : e.srcElement; orgCursor=target.style.cursor;
		ConfigIndex = target.getAttribute("ConfigIndex");  
		while(target.id != 'wifLocationsSearchContainer' + ConfigIndex){if(target.tagName != 'BODY'){target = target.parentNode;}else{break}}; 
		if (target.id=='wifLocationsSearchContainer' + ConfigIndex) { 
			savedTarget=target;
			target.style.cursor=htype; 
			dragOK=true;
			dragXoffset=e.clientX-parseInt(searchObj.style.left);
			dragYoffset=e.clientY-parseInt(searchObj.style.top);
			document.onmousemove=epLoactionsSearch.moveHandler;
			document.onmouseup=epLoactionsSearch.cleanup;return false;
		};
	},
// --------------------------------------------------------------------------------------------------------------------
	getEventTarget : function(e) {var targ;if (!e) {e = window.event;}if (e.target){targ = e.target;} else if (e.srcElement) {targ = e.srcElement;}if (targ.nodeType == 3) {targ = targ.parentNode;	}return targ;},
// --------------------------------------------------------------------------------------------------------------------
	moveHandler : function(e){	if (e == null) { e = window.event } if (e.button<=1&&dragOK){
		savedTarget.style.left=e.clientX-dragXoffset+'px';savedTarget.style.top=e.clientY-dragYoffset+'px';FAQ_X = e.clientX-dragXoffset+'px';FAQ_Y =e.clientY-dragYoffset+'px';
		if(nvxgWIF.isIE6){
			searchIE6Hack.style.left=e.clientX-dragXoffset+'px';searchIE6Hack.style.top=e.clientY-dragYoffset+'px';
		};
		return false;}},
// --------------------------------------------------------------------------------------------------------------------
	norightmouse : function(){	return false;},
// --------------------------------------------------------------------------------------------------------------------
	cleanup : function(e){document.onmousemove=null;document.onmouseup=null;savedTarget.style.cursor=orgCursor;dragOK=false;},
// --------------------------------------------------------------------------------------------------------------------
	getWindowSize : function(){
		var myWidth = 0, myHeight = 0;
		myWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
		myHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
		return myWidth + "|"+ myHeight;
	},
// --------------------------------------------------------------------------------------------------------------------
	clearSearch : function(ConfigIndex){
		epLoactionsSearch.clearResults(ConfigIndex);
		document.getElementById("wifSearchOnSubBlockSelect" + ConfigIndex).selectedIndex = 0;		
		document.getElementById("wifSearchForText" + ConfigIndex).value = '';
		document.getElementById("checkboxMatchWholeWord" + ConfigIndex).checked =false;
		document.getElementById("checkboxMatchCase" + ConfigIndex).checked=false;
		document.getElementById("wifSearchButtonReturnDataDisabled" + ConfigIndex).style.display = '';
		document.getElementById("wifSearchButtonReturnData" + ConfigIndex).style.display = 'none';		
	},
// --------------------------------------------------------------------------------------------------------------------
	runSearch : function(ConfigIndex){
		epLoactionsSearch.clearResults(ConfigIndex);
		myRegExp = null;
		selectedLocationID = null;
		config = ConfigIndex;
		resultsObj.appendChild(loaderObj);
		for (var s=0; s < LocationsConfiguration.Configs[ConfigIndex].SortIndex.length; s++){
			epLoactionsSearch.sortLocations(LocationsConfiguration.Configs[ConfigIndex].SortIndex[s],SortOrder,ConfigIndex);
		};
		setTimeout("epLoactionsSearch.preformSearch(" + ConfigIndex + ")", 1);
	},
// --------------------------------------------------------------------------------------------------------------------
	openSearch : function(ConfigIndex){
		epLoactionsSearch.getLocation(ConfigIndex);
		if(LocationsConfiguration.Configs[ConfigIndex].UseAdvance==false){epLoactionsSearch.runSearch(ConfigIndex);};
		r = epLoactionsSearch.getWindowSize();
		dim = r.split("|");
		searchObj.style.left = (dim[0]/2) - (SearchWindowWidth/2) + 'px';
		searchObj.style.top  = (((dim[1]/2) - (SearchWindowHeight/2)) + document.documentElement.scrollTop)  + 'px';
		searchObj.style.display = '';	
		if(nvxgWIF.isIE6){
			searchIE6Hack.style.display = '';
			searchIE6Hack.style.left = (dim[0]/2) - (SearchWindowWidth/2) + 'px';
			searchIE6Hack.style.top  = (((dim[1]/2) - (SearchWindowHeight/2)) + document.documentElement.scrollTop)  + 'px';
		};
		if(LocationsConfiguration.Configs[ConfigIndex].LocationName !=undefined){
			titletext = LocationsConfiguration.Configs[ConfigIndex].LocationName
		}else{
			titletext = document.getElementById("clientname").value;
		};

		if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey!=""){
			document.getElementById("searchtitle" + ConfigIndex).innerHTML ="<span>" + titletext + " : " + document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[epLoactionsSearch.getLoctionKeyIndex(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey,ConfigIndex)].mapto).value + "</span>";
		}else{
			document.getElementById("searchtitle" + ConfigIndex).innerHTML ="<span>" + titletext+ "</span>";
		};
	},

// --------------------------------------------------------------------------------------------------------------------
	closeSearch : function(){
		searchObj.style.display = 'none';		
		if(nvxgWIF.isIE6){searchIE6Hack.style.display = 'none'};	
		document.body.removeChild(searchObj);
		searchObj = null;
		config = null;
		resultsObj = null;
		loaderObj	= null;
		myRegExp = null;
		selectedLocationID = null;
		epLoactionsSearch.Locations=null;
		epLoactionsSearch.List=null;
	},
// --------------------------------------------------------------------------------------------------------------------
	selectLocation : function(e){
		var row = epLoactionsSearch.getEventTarget(e);
		while(row.tagName != 'TR'){row = row.parentNode};
		ConfigIndex=Number(row.getAttribute("ConfigIndex"));
		config = ConfigIndex;	
		selectedLocationID = row.getAttribute('locationid');
		t=document.getElementById("wifRecordTable" + ConfigIndex);
		for (var i=1; i < t.rows.length; i++){	
			t.rows[i].removeAttribute("selected");
		};
		row.setAttribute("selected","selected");	

		document.getElementById("wifSearchButtonReturnData"+ ConfigIndex).style.display = '';		
		document.getElementById("wifSearchButtonReturnDataDisabled" + ConfigIndex).style.display = 'none';		
	},
// --------------------------------------------------------------------------------------------------------------------
returnLocationData : function(){
	var isMultiEditObj=false;
	var isInClone=false;
	if(LocationsConfiguration.UseEnhanced){Ky="LocationId"}else{Ky="lcid"}
// Location data in Location Array		

	for (var e=0; e < epLoactionsSearch.Locations.length; e++){
		//alert(selectedLocationID +":"+ epLoactionsSearch.Locations[e][Ky])
		if(selectedLocationID == epLoactionsSearch.Locations[e][Ky]){break};
	}
	
		ConfigIndex=config;
		if(LocationsConfiguration.Configs[ConfigIndex].MultiEditObjName != undefined){
			isMultiEditObj=true;
			var ObjDef=nvxgObjectDef[LocationsConfiguration.Configs[ConfigIndex].MultiEditObjName];
			if(ObjDef.typeofUI==1){isInClone=true;}else{isInClone=false};
		}else{
			isMultiEditObj=false;
		};
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
				tempText = epLoactionsSearch.Locations[e][LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key]				
			if(tempText!="null" && tempText!=null && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto != undefined){
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].datatype=="string"){tempText = tempText.replace('zzzzzzzzzzzzzzzz','')};

				if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){
					pre=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Preview");
					pre.innerHTML = tempText;
				};

				if(isInClone){
				elm=epMultiEdit.getElementByIdInObjContainer(LocationsConfiguration.Configs[ConfigIndex].CloneTarget,LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
				}else{
				elm=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
				};

				 if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey != LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key){
					elm.value = tempText;
				 };
				if(isMultiEditObj){
					if(elm.tagName=="SELECT"){
						hastrig=elm.options[0].getAttribute("triggeraction");
						if(hastrig=="true"){
							elm.setAttribute("ObjName",LocationsConfiguration.Configs[ConfigIndex].MultiEditObjName);
							epMultiEdit.onchangeActionsEvent(elm);			
						};
					};
					if(elm.tagName=="INPUT"){
						setblock=elm.getAttribute("setblocklabel");
						if(setblock=="true"){epMultiEdit.setBlockLabel(elm)};
					};					
				};

			};
		};
		epLoactionsSearch.closeSearch(ConfigIndex);
		if(LocationsConfiguration.Configs[ConfigIndex].MultiEditObjName==undefined){

			
			if(Number(document.getElementById("LocationID").value) ==-1){
//				epLoactionsSearch.clearLocationData(ConfigIndex);						
				epLoactionsSearch.LockLocationFields(false,ConfigIndex);
			  }else{
				epLoactionsSearch.LockLocationFields(true,ConfigIndex);			  
			};
		};
	},
// --------------------------------------------------------------------------------------------------------------------	
	LockLocationFields:function(lock,ConfigIndex){
		if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){	
		if(lock){
			for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto != undefined && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display){
					if(epLoactionsSearch.getLoctionKeyIndex(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey,ConfigIndex)==i){
					
					}else{
						elm=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
						pre=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Preview");
						par=elm.parentNode;
						elm.style.display = "none";
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].formatstr != undefined && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].formatstr!="" && LocationsConfiguration.Configs[ConfigIndex].SubSearchKey != LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key){
							fro=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Format");
							fro.style.display = "none";
						};
						pre.style.display = "";
						par.style.border="0px";
						par.style.backgroundColor="transparent";
					};
				};
			};
		}else{
			for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto != undefined && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display){
					elm=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
					pre=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Preview");
					par=elm.parentNode;
					elm.style.display = "";
					if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].formatstr != undefined && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].formatstr!=""){
						fro=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Format");
						fro.style.display = "";
					};
					pre.style.display = "none";
					par.style.border="1px solid #ccc";
					par.style.backgroundColor="#ffffff";
				};
			};
			for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto != undefined && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].display){	
					if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype=="text" || LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype=="select" || LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype=="textarea"){break;}
				};
			};
			elm=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
			elm.focus();
		};
	};
		

	},
	
// --------------------------------------------------------------------------------------------------------------------
	clearLocationData : function(ConfigIndex){
//		alert(ConfigIndex);
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto != undefined){
				elm = document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
				pre = document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto + "Preview");
//alert(elm.id +":"+ LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype);
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].htmltype=="select"){
					elm.selectedIndex =-1;
					
				}else{
					elm.value="";
				}
				if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){pre.innerHTML = " "};	
			};
		};
		if(LocationsConfiguration.Configs[ConfigIndex].LockLocations){
			epLoactionsSearch.LockLocationFields(true,ConfigIndex);
		}else{
			epLoactionsSearch.LockLocationFields(false,ConfigIndex);			
		};
	},	
// --------------------------------------------------------------------------------------------------------------------
	setSort : function(e){
		var obj = epLoactionsSearch.getEventTarget(e);
		while(obj.tagName != 'TH'){obj = obj.parentNode};
		ConfigIndex=Number(obj.getAttribute("ConfigIndex"));		
		i = obj.getAttribute('arrycolindex');
		if(LocationsConfiguration.Configs[ConfigIndex].SortIndex == i){
			if(SortOrder == ASC){
				SortOrder = DSC; SortChr = SortDChr;
			  }else{
				SortOrder = ASC;  SortChr = SortAChr;	
			}
		  }else{
			LocationsConfiguration.Configs[ConfigIndex].SortIndex = [i];	
		}

		epLoactionsSearch.clearResults(ConfigIndex);
		resultsObj.appendChild(loaderObj);
		for (var s=0; s < LocationsConfiguration.Configs[ConfigIndex].SortIndex.length; s++){
			epLoactionsSearch.sortLocations(LocationsConfiguration.Configs[ConfigIndex].SortIndex[s],SortOrder,ConfigIndex);
		}

		setTimeout("epLoactionsSearch.preformSearch(" + ConfigIndex + ")", 1);
	},
// --------------------------------------------------------------------------------------------------------------------
	sortLocations 	:	function(field, descending,ConfigIndex) {
		if(epLoactionsSearch.Locations.length==0){return};
		for (var v=0; v < epLoactionsSearch.Locations.length; v++){
			if(LocationsConfiguration.Configs[ConfigIndex].SortToTop.length==0){
				epLoactionsSearch.Locations[v].sortonval = epLoactionsSearch.Locations[v][field];				
			}else{
				testtop=null;
				for (t=0;t<LocationsConfiguration.Configs[ConfigIndex].SortToTop.length;t++) {
					for (k=0;k<LocationsConfiguration.Configs[ConfigIndex].SortToTop[t].values.length;k++) {
						if(LocationsConfiguration.Configs[ConfigIndex].SortToTop[t].key == field && epLoactionsSearch.Locations[v][field] == LocationsConfiguration.Configs[ConfigIndex].SortToTop[t].values[k]){
							sortoveride="~";for (o=0;o<k;o++){sortoveride=sortoveride+"~";};
							epLoactionsSearch.Locations[v].sortonval = sortoveride;break;	
						}else{
							epLoactionsSearch.Locations[v].sortonval = epLoactionsSearch.Locations[v][field];				
						};
					};				
				};
			};
		};		
		var sample = epLoactionsSearch.Locations[0]['sortonval'];
		switch((typeof sample).toLowerCase() ) {
			case 'string' : epLoactionsSearch.Locations.sort(sortStrings); break;
			case 'number' : epLoactionsSearch.Locations.sort(sortNumbers);break;
			case 'boolean'	: epLoactionsSearch.Locations.sort(sortBool);break;
		}
		if (descending) epLoactionsSearch.Locations.reverse();
		function sortStrings(a,b) { return a['sortonval'].toLowerCase().localeCompare(b['sortonval'].toLowerCase()); }
		function sortNumbers(a,b){ return a['sortonval'] - b['sortonval']; }
		function sortBool(a,b) { return sortNumbers(b,a); }
	},
// --------------------------------------------------------------------------------------------------------------------			
	alphaNumSort:function (a,b){
	  function chunkify(t) {
	    var tz = [], x = 0, y = -1, n = 0, i, j;
	
	    while (i = (j = t.charAt(x++)).charCodeAt(0)) {
		 var m = (i == 46 || (i >=48 && i <= 57));
		 if (m !== n) {
		   tz[++y] = "";
		   n = m;
		 }
		 tz[y] += j;
	    }
	    return tz;
	  }
	
	  var aa = chunkify(a);
	  var bb = chunkify(b);
	
	  for (x = 0; aa[x] && bb[x]; x++) {
	    if (aa[x] !== bb[x]) {
		 var c = Number(aa[x]), d = Number(bb[x]);
		 if (c == aa[x] && d == bb[x]) {
		   return c - d;
		 } else return (aa[x] > bb[x]) ? 1 : -1;
	    }
	  }
	  return aa.length - bb.length;
	
	},		
// --------------------------------------------------------------------------------------------------------------------			
	trimString :function(inputString) {
		if (typeof inputString != "string") { return inputString; }
		var retValue = inputString;
		var ch = retValue.substring(0, 1);
		while (ch == " ") { // Check for spaces at the beginning of the string
		 retValue = retValue.substring(1, retValue.length);
		 ch = retValue.substring(0, 1);
		}
		ch = retValue.substring(retValue.length-1, retValue.length);
		while (ch == " ") { // Check for spaces at the end of the string
		 retValue = retValue.substring(0, retValue.length-1);
		 ch = retValue.substring(retValue.length-1, retValue.length);
		}
		while (retValue.indexOf("  ") != -1) { // Note that there are two spaces in the string - look for multiple spaces within the string
		 retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length); // Again, there are two spaces in each of the strings
		}
		return retValue; // Return the trimmed string back to the user
	},
	

// --------------------------------------------------------------------------------------------------------------------				
	getLoctionKeyIndex:function(key,ConfigIndex){
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].key==key){
				return i				
			};
		};
		return false
	},
// --------------------------------------------------------------------------------------------------------------------					
	loadListOptions:function(){
		for (var i=0; i < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; i++){
			if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval!=undefined){
				if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval.length>0){
					LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval.sort(epLoactionsSearch.alphaNumSort);
					targList = document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].mapto);
					for (var o=0; o < LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval.length; o++){
						if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval[o]!="" && LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval[o]!=null ){						
							var newOption = document.createElement('option');
							newOption.value = LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval[o];
							text = document.createTextNode(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval[o]);				
							newOption.appendChild(text);
							targList.appendChild(newOption);

						};
					};
				};
				LocationsConfiguration.Configs[ConfigIndex].SearchHeader[i].listval==undefined;  //Clear 
			};
		};
	},	

// --------------------------------------------------------------------------------------------------------------------				
	onchangeSearch:function(e,ConfigIndex){	
		var obj = epLoactionsSearch.getEventTarget(e);
		ConfigIndex=Number(obj.getAttribute("ConfigIndex"));
		epLoactionsSearch.runQuery(ConfigIndex);
		nvxgWIF.toggleElements('wifSeachNavBar','');
	},
// --------------------------------------------------------------------------------------------------------------------				
	addLocation : function (ConfigIndex){
		var other = new Object();
			other['cid']=		OtherPrefix;		
			other['lcid']=-1;		
			other['name']=		OtherPrefix;		
			other['branch']=	OtherPrefix;				
			other['ad1']=		OtherPrefix;		
			other['ad2']=		"";		
			other['city']=		OtherPrefix;		
			other['state']=	OtherPrefix;	
			other['cntry']=	OtherPrefix;	
			other['zip']=		OtherPrefix;		
			other['reg']=		OtherPrefix;		
			other['ccode']=	OtherPrefix;				
			other['rid']=		0;		
			other['vid']=		OtherPrefix;		
			other['dp']=		OtherPrefix;		
			other['cf1']=		OtherPrefix;						
			other['cf2']=		OtherPrefix;		
			other['cf3']=		OtherPrefix;		
			other['cf4']=		OtherPrefix;		
			other['cf5']=		OtherPrefix;						
			other['cf6']=		OtherPrefix;		
			other['misc1']=	OtherPrefix;	
			other['misc2']=	OtherPrefix;	
			for (var a=0; a < LocationsConfiguration.Configs[ConfigIndex].OtherLocationOn.length; a++){
				other[LocationsConfiguration.Configs[ConfigIndex].OtherLocationOn[a]] = other[LocationsConfiguration.Configs[ConfigIndex].OtherLocationOn[a]] + LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel;
			}
		epLoactionsSearch.Locations.push(other);
		other = null;	
	},	
	
	instructionTextSwap : function(htmlstr,ConfigIndex){
		if(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey !=""){
			SubSearchKeyID=epLoactionsSearch.getLoctionKeyIndex(LocationsConfiguration.Configs[ConfigIndex].SubSearchKey,ConfigIndex);
			htmlstr=htmlstr.replace("[SUBSEARCHLABEL]","<span style='color:#000; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].SearchHeader[SubSearchKeyID].label + "</span>");						
		};
		htmlstr=htmlstr.replace("[OTHERLABEL]","<em style='color:#C00; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel  + "</em>");												
		htmlstr=htmlstr.replace("[LOOKUP]","<span style='color:#000; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[8] + "</span>");												
		htmlstr=htmlstr.replace("[CLEAR]","<span style='color:#000; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[7] + "</span>");
		htmlstr=htmlstr.replace("[USELOCATION]","<span style='color:#000; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].buttonTxt[0] + "</span>");		
		htmlstr=htmlstr.replace("[CANCEL]","<span style='color:#000; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].buttonTxt[1] + "</span>");		
		rowcount = epLoactionsSearch.ProcessedRecordDataCount;
		if(LocationsConfiguration.Configs[ConfigIndex].AllowOther){rowcount=rowcount-1};
		//if(LocationsConfiguration.Configs[ConfigIndex].PostionOtherAtTop){rowcount=rowcount-1};		
		htmlstr=htmlstr.replace("[ROWCOUNT]","<span style='color:#000; white-space:nowrap'>" + rowcount + "</span>");					
		htmlstr=htmlstr.replace("[OTHER]","<span style='color:#C00; white-space:nowrap'>" + LocationsConfiguration.Configs[ConfigIndex].OtherLocationLabel + "</span>");								
		
		
		return htmlstr															
	},

// --------------------------------------------------------------------------------------------------------------------		
setOperator:function(e){
	var obj = epLoactionsSearch.getEventTarget(e);
	Key = obj.getAttribute("KEY");
	if(Key=="ad1"){return false};
	ConfigIndex= Number(obj.getAttribute("CONFIGINDEX"));
	operator= document.getElementById("Operator" + ConfigIndex + Key);												
	if(obj.tagName=="SELECT"){
		if(obj.selectedIndex!=0){
			operator.innerHTML=LocationsConfiguration.Configs[ConfigIndex].textSearchTxt[13];;			
		}else{
			operator.innerHTML=" ";						
		};
	}else{
		srctxt = obj.value;
		//obj.value = srctxt;
		if(srctxt.length ==""){
			operator.selectedIndex =-1;
			operator.style.backgroundColor ="#ECECEC";
			operator.disabled=true;			
		}else{
			operator.disabled=false;
			operator.style.backgroundColor ="#FFFFFF";			
			if(operator.selectedIndex == -1){
				operator.selectedIndex = 0;
			};			
		};
	};

},
// --------------------------------------------------------------------------------------------------------------------		
ZipCodeLookUp:function(e){
/*	
	var obj = epLoactionsSearch.getEventTarget(e);
	ConfigIndex = obj.getAttribute("ConfigIndex");	
	var St=null; var Cty=null; var ZaipMap;
	for (var zp=0; zp < LocationsConfiguration.Configs[ConfigIndex].SearchHeader.length; zp++){
		if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].key	== "city"){Cty=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].mapto).value;};
		if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].key	== "state"){St=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].mapto).value;};
		if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].key	== "zip"){ZipObj=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].mapto);};		
		if(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].key	== "cntry"){CntryObj=document.getElementById(LocationsConfiguration.Configs[ConfigIndex].SearchHeader[zp].mapto);};				
	};
	if(St==""){St=null};if(Cty==""){Cty=null};
	if(St!=null && Cty!=null){
		xURL= jsonServicesBasePath + LocationsConfiguration.Configs[ConfigIndex].JSONServiceLOC + ".aspx?clientid=" + LocationsConfiguration.Configs[ConfigIndex].LocationSourceID + "&strcount=2&index1=6&str1=" + escape(Cty) + "&index2=7&str2=" + escape(St);
		epLoactionsSearch.load(xURL,function(http){
			if(http.readyState == 4){
				eval(http.responseText);
				if(Locations.length==0){
					if(CntryObj.tagName =="SELECT"){CntryObj.selectedIndex=-1}else{CntryObj.value = ""};
					ZipObj.value = "";				
				}else{
					if(document.getElementById(ZipObj.id + "datalist")!=undefined){nvxgWIF.removeObj(ZipObj.id + "datalist");}				
					ZipObj.removeAttribute("list");
					if(Locations.length==1){
						ZipObj.value = Locations[0].zip;
					}else{
						var MyZipList=[];
						for (z=0;z<Locations.length;z++){
							if(MyZipList.indexOf(Locations[z].zip)==-1){MyZipList.push(Locations[z].zip)};
						};
						if(MyZipList.length==1){
							ZipObj.value = MyZipList[0];
						}else{
							ZipParent=ZipObj.parentNode;
							MyZipList.sort();
							datalist=document.createElement('datalist');
							datalist.id=ZipObj.id + "datalist";								
							ZipObj.setAttribute("list",ZipObj.id + "datalist");	
							for (dl=0;dl<MyZipList.length;dl++) {
								dataopt=document.createElement('option');
								dataopt.value = MyZipList[dl];
								datalist.appendChild(dataopt);		
							};
							ZipParent.appendChild(datalist);			
							datalist.style.display="none";
						};
					};
					CntryObj.value = Locations[0].cntry;
				};
			}else{
				// Do nothing
			};
		}
		);
	};
*/	
},
// --------------------------------------------------------------------------------------------------------------------		
setOperatorDisablede:function(e){
	var obj = epLoactionsSearch.getEventTarget(e);
	Key = obj.getAttribute("KEY");
	ConfigIndex= Number(obj.getAttribute("CONFIGINDEX"));
	operator= document.getElementById("Operator" + ConfigIndex + Key);												
	
},
// --------------------------------------------------------------------------------------------------------------------		
	lastFunction : function(){}
}


