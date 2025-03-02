/*jshint sub:true*/
/* 
	JavaScript Document
	Redistribution and use in source and binary forms, with or without modification, is NOT permitted without written consent from NAVEX
	Privacy policy:			http://www.ethicspoint.com/en/privacypolicy.asp
	Acceptable use policy:	http://www.ethicspoint.com/en/acceptableuse.asp
	Contact information:	direct 1-971-250-4100
							toll-free 866-297-0224
							info@ethicspoint.com
							
	Author:					Raymond M. Bodnar | Sr. Client Interface UI/UX Designer, Web Programmer
	Dept.:					Client Interface
	codebase: 				NVXG.V5.2015.10.12 | HTML5, CSS3, & Javascript Enabled
	https://demo.ethicspointvp.com/jsonservices/GetEPLocations.aspx?clientid=31053  	
*/
var LocationsConfiguration = {
	HighLightHexColors: ["#66FFFF", "#99FFCC", "#99FF99", "#CCFF99", "#FFFF99", "#FFCC99", "#FF9999", "#FF99CC", "#FF99FF", "#CC99FF", "#99CCFF", "#66CCFF"],
	Configs: [{
		HTMLTargetID: "epLocationContainer",
		UseAjax: true,
		UseEnhanced: false,
		UseAdvance: false,
		LocationSourceID: 31053,
		LockLocations: false,
		SubSearchKey: "", //"cf1"; or "" for no sub search. ONLY ON STANDARD SEARCH						
		AllowOther: false,
		//ZipLookUp:			true,
		OtherKeyIndex: "LocationID",
		PostionOtherAtTop: true, // TRUE = Top, FALSE = Bottom
		OtherLocationLabel: lc.$LOC_OTHERNOT,
		OtherLocationOn: [],
		OtherListString: "",
		DeleteLocationWith: [],
		DeleteLocationOn: [],
		Filter: [],
		SortIndex: [],
		SortToTop: [], // [] An empty array will sort locations in their natural sort order.  [{key:"cntry", values:["Spain","Poland","Turkey"]}];
		instructionsTxt: [lc.$LOC_LOCINSTUCFORM, lc.$LOC_LOCINSTUCSIMPLE, lc.$LOC_LOCINSTUCADVC01, lc.$LOC_LOCINSTUCADVC02, lc.$LOC_LOCINSTUCALLOWOTHER],
		msgTxt: [lc.$LOC_PROCESSING, lc.$LOC_LOCERR1000, lc.$LOC_LOCERR0, lc.$LOC_LOCRCDCOUNT, lc.$LOC_LOCTXTCOUNT],
		buttonTxt: [lc["$LOC_USELOCATION"], lc["$SYS_CANCEL"], lc["$SYS_CLOSE"], lc["$SYS_SORT"]],
		textSearchTxt: [lc["$LOC_SEARCON"], lc["$LOC_ALL"], lc["$LOC_MATCH"], lc["$LOC_WHOLEWORD"], lc["$LOC_TEXTCASE"], lc["$LOC_TEXTSTRING"], lc["$SYS_SEARCH"], lc["$SYS_CLEAR"], lc["$LOC_LOOKUP"], lc["$LOC_ADV_FIELD"], lc["$LOC_CRITERIA"], lc["$LOC_MATCHOPTIONS"], lc["$LOC_ADV_EXISTWHITHIN"], lc["$LOC_ADV_EXACTMATCH"], lc["$SYS_SORT"], lc["$LOC_ADV_KEY"], lc["$LOC_OTHERNOT"] + "\u2026"],
		SearchHeader: [
			//Hidden
			{ key: "cid", enchanced: "EthicsPointClientId", jasonkey: 0, datatype: "int", searchon: false, display: false },
			{ key: "lcid", enchanced: "LocationId", jasonkey: 1, datatype: "int", searchon: false, display: false, mapto: "LocationID", label: "NEVER DISPLAY", formatstr: "", htmltype: "hidden", size: 0, required: false },
			{ key: "branch", enchanced: "BranchNumber", jasonkey: 3, datatype: "string", searchon: false, display: false, mapto: "BranchNumber", label: lc["$LOC_LOCATIONBRANCH"], formatstr: "", htmltype: "hidden", size: 0, required: false },
			{ key: "cf4", enchanced: "LocationCustomField4", jasonkey: 18, datatype: "string", searchon: false, display: false, mapto: "LocationCustom4", label: lc["$LOC_LOCATIONCF4"], formatstr: "", htmltype: "hidden", size: 0, required: false },
			{ key: "cf5", enchanced: "LocationCustomField5", jasonkey: 19, datatype: "string", searchon: false, display: false, mapto: "LocationCustom5", label: lc["$LOC_LOCATIONCF5"], formatstr: "", htmltype: "hidden", size: 0, required: false },
			{ key: "cf6", enchanced: "LocationCustomField6", jasonkey: 20, datatype: "string", searchon: false, display: false, mapto: "LocationCustom6", label: lc["$LOC_LOCATIONCF6"], formatstr: "", htmltype: "hidden", size: 0, required: false },
			//Displayed
			//							{key:"cf1", 	enchanced:"LocationCustomField1",	jasonkey:15,	datatype:"string",	searchon:true,		display:true,		mapto:"LocationCustom1",		label:lc["$LOC_LOCATIONCF1"],	searchlabel:lc["$LOC_LOCATIONCF1.SEARCH"], 			formatstr:lc.$SYS_SELECTONE,			htmltype:"select",	size:25,	required:true,	listitems:[{val:100,label:"Red"},{val:200,label:"Blue"},{val:300,label:"Green"},{val:400,label:"Yellow"},{val:500,label:"White"},{val:600,label:"Grey"},{val:700,label:"Black"}]},	
			{ key: "cf1", enchanced: "LocationCustomField1", jasonkey: 15, datatype: "string", searchon: true, display: true, mapto: "LocationCustom1", label: lc["$LOC_LOCATIONCF1"], formatstr: lc.$SYS_SELECTONE, htmltype: "select", size: 25, required: true },
			{ key: "cf2", enchanced: "LocationCustomField2", jasonkey: 16, datatype: "string", searchon: true, display: true, mapto: "LocationCustom2", label: lc["$LOC_LOCATIONCF2"], formatstr: lc.$SYS_SELECTONE, htmltype: "select", size: 25, required: false, listitems: ["Cat", "Dog", "Bunny", "Snake", "Rat"] },
			{ key: "cf3", enchanced: "LocationCustomField3", jasonkey: 17, datatype: "string", searchon: true, display: true, mapto: "LocationCustom3", label: lc["$LOC_LOCATIONCF3"], formatstr: "", htmltype: "text", fixedwidth: 50, size: 15, required: true },
			{ key: "BUTTONSET", size: 33, display: true, id: "BUTTENSET" },
			{ key: "BR" },
			{ key: "name", enchanced: "Name", jasonkey: 2, datatype: "string", searchon: true, display: true, mapto: "LocationName2", label: lc["$LOC_LOCATIONNAME"], formatstr: "", htmltype: "text", fixedwidth: 175, size: 66, required: false },
			{ key: "BR" },
			{ key: "ad1", enchanced: "Address1", jasonkey: 4, datatype: "string", searchon: true, display: true, mapto: "LocationAddress", label: lc["$LOC_LOCATIONADDRESS"], formatstr: "", fixedwidth: 180, htmltype: "textarea", size: 66, required: false, attributes: [{ "rows": "2" }, { "cols": "70" }, { "onkeyup": "nvxgWIF.autoresize(this)" }, { "onpaste": "nvxgWIF.autoresize(this)" }, { "oncut": "nvxgWIF.autoresize(this)" }] },
			{ key: "BR" },
			{ key: "city", enchanced: "City", jasonkey: 6, datatype: "string", searchon: true, display: true, mapto: "LocationCity", label: lc["$LOC_LOCATIONCITY"], formatstr: "", htmltype: "text", size: 33, required: true }, //, autosuggest:true
			{ key: "state", enchanced: "State", jasonkey: 7, datatype: "string", searchon: true, display: true, mapto: "LocationState", label: lc["$LOC_LOCATIONSTATE"], formatstr: lc.$SYS_SELECTONE, htmltype: "select", size: 15, required: false },
			{ key: "zip", enchanced: "Zip", jasonkey: 8, datatype: "string", searchon: false, display: true, mapto: "LocationZip", label: lc["$LOC_LOCATIONZIP"], formatstr: "", htmltype: "text", size: 15, required: false },
			{ key: "cntry", enchanced: "Country", jasonkey: 9, datatype: "string", searchon: true, display: true, mapto: "LocationCountry", label: lc["$LOC_LOCATIONCOUNTRY"], formatstr: lc.$SYS_SELECTONE, htmltype: "select", size: 33, required: true },
			{ key: "BR" }

		]
	}, {
		HTMLTargetID: "epLocationContainer",
		UseAjax: true,
		UseEnhanced: false,
		UseAdvance: false,
		LocationSourceID: 31053,
		LockLocations: false,
		SubSearchKey: "", //"cf1"; or "" for no sub search. ONLY ON STANDARD SEARCH						
		AllowOther: false,
		//ZipLookUp:			true,
		OtherKeyIndex: "LocationID",
		PostionOtherAtTop: true, // TRUE = Top, FALSE = Bottom
		OtherLocationLabel: lc.$LOC_OTHERNOT,
		OtherLocationOn: [],
		OtherListString: "",
		DeleteLocationWith: [],
		DeleteLocationOn: [],
		Filter: [],
		SortIndex: [],
		SortToTop: [], // [] An empty array will sort locations in their natural sort order.  [{key:"cntry", values:["Spain","Poland","Turkey"]}];
		instructionsTxt: [lc["$LOC_LOCINSTUCFORM.INDEX1"], "A", lc["$LOC_LOCINSTUCADVC01"], lc["$LOC_LOCINSTUCADVC02"], lc["$LOC_LOCINSTUCALLOWOTHER"]],
		msgTxt: [lc.$LOC_PROCESSING, lc.$LOC_LOCERR1000, lc.$LOC_LOCERR0, lc.$LOC_LOCRCDCOUNT, lc.$LOC_LOCTXTCOUNT],
		buttonTxt: [lc["$LOC_USELOCATION"], lc["$SYS_CANCEL"], lc["$SYS_CLOSE"], lc["$SYS_SORT"]],
		textSearchTxt: [lc["$LOC_SEARCON"], lc["$LOC_ALL"], lc["$LOC_MATCH"], lc["$LOC_WHOLEWORD"], lc["$LOC_TEXTCASE"], lc["$LOC_TEXTSTRING"], lc["$SYS_SEARCH"], lc["$SYS_CLEAR"], lc["$LOC_LOOKUP"], lc["$LOC_ADV_FIELD"], lc["$LOC_CRITERIA"], lc["$LOC_MATCHOPTIONS"], lc["$LOC_ADV_EXISTWHITHIN"], lc["$LOC_ADV_EXACTMATCH"], lc["$SYS_SORT"], lc["$LOC_ADV_KEY"], lc["$LOC_OTHERNOT"] + "\u2026"],
		SearchHeader: [
			//Hidden
			{ key: "cid", enchanced: "EthicsPointClientId", jasonkey: 0, datatype: "int", searchon: false, display: false },
			{ key: "lcid", enchanced: "LocationId", jasonkey: 1, datatype: "int", searchon: false, display: false, mapto: "LocationID", label: "NEVER DISPLAY", formatstr: "", htmltype: "hidden", size: 0, required: false },
			{ key: "branch", enchanced: "BranchNumber", jasonkey: 3, datatype: "string", searchon: false, display: false, mapto: "BranchNumber", label: lc["$LOC_LOCATIONBRANCH"], formatstr: "", htmltype: "hidden", size: 0, required: false },
			//							{key:"cf4", 	enchanced:"LocationCustomField4",	jasonkey:18,	datatype:"string",	searchon:false,		display:false,		mapto:"LocationCustom4",		label:lc["$LOC_LOCATIONCF4"], 			formatstr:"",				htmltype:"hidden",	size:0,		required:false 	},
			//							{key:"cf5", 	enchanced:"LocationCustomField5",	jasonkey:19,	datatype:"string",	searchon:false,		display:false,		mapto:"LocationCustom5",		label:lc["$LOC_LOCATIONCF5"], 			formatstr:"",				htmltype:"hidden",	size:0,		required:false 	},
			//							{key:"cf6", 	enchanced:"LocationCustomField6",	jasonkey:20,	datatype:"string",	searchon:false,		display:false,		mapto:"LocationCustom6",		label:lc["$LOC_LOCATIONCF6"], 			formatstr:"",				htmltype:"hidden",	size:0,		required:false 	},
			//Displayed
			//							{key:"cf1", 	enchanced:"LocationCustomField1",	jasonkey:15,	datatype:"string",	searchon:true,		display:true,		mapto:"LocationCustom1",		label:lc["$LOC_LOCATIONCF1"], 			formatstr:lc.$SYS_SELECTONE,			htmltype:"select",	size:25,	required:true,	listitems:[{val:100,label:"Red"},{val:200,label:"Blue"},{val:300,label:"Green"},{val:400,label:"Yellow"},{val:500,label:"White"},{val:600,label:"Grey"},{val:700,label:"Black"}]},	
			//							{key:"cf1", 	enchanced:"LocationCustomField1",	jasonkey:15,	datatype:"string",	searchon:true,		display:true,		mapto:"LocationCustom1",		label:lc["$LOC_LOCATIONCF1"], 			formatstr:lc.$SYS_SELECTONE,			htmltype:"select",	size:25,	required:true},								
			//							{key:"cf2", 	enchanced:"LocationCustomField2",	jasonkey:16,	datatype:"string",	searchon:true,		display:true,		mapto:"LocationCustom2",		label:lc["$LOC_LOCATIONCF2"], 			formatstr:lc.$SYS_SELECTONE,			htmltype:"select",	size:25,	required:false, listitems:["Cat","Dog","Bunny","Snake","Rat"]},
			//							{key:"cf3", 	enchanced:"LocationCustomField3",	jasonkey:17,	datatype:"string",	searchon:true,		display:true,		mapto:"LocationCustom3",		label:lc["$LOC_LOCATIONCF3"], 			formatstr:"<span style='float:right'>(6-Digits)</span>",		htmltype:"text",	fixedwidth:50,	size:15,	required:true},				
			//						{key:"BUTTONSET", size:33, display:true, id:"BUTTENSET"},		
			//						{key:"BR"},						
			//							{key:"name", 	enchanced:"Name",					jasonkey:2,		datatype:"string",	searchon:true, 		display:true, 		mapto:"LocationName",			label:lc["$LOC_LOCATIONNAME"], 			formatstr:"",		htmltype:"text",	fixedwidth:175,  size:66,	required:false},
			//						{key:"BR"},
			{ key: "ad1", enchanced: "Address1", jasonkey: 4, datatype: "string", searchon: true, display: true, mapto: "LocationAddress", label: lc["$LOC_LOCATIONADDRESS"], formatstr: "", fixedwidth: 180, htmltype: "textarea", size: 66, required: false, attributes: [{ "rows": "2" }, { "cols": "70" }, { "onkeyup": "nvxgWIF.autoresize(this)" }, { "onpaste": "nvxgWIF.autoresize(this)" }, { "oncut": "nvxgWIF.autoresize(this)" }] },
			{ key: "BR" },
			{ key: "city", enchanced: "City", jasonkey: 6, datatype: "string", searchon: true, display: true, mapto: "LocationCity", label: lc["$LOC_LOCATIONCITY"], formatstr: "", htmltype: "text", size: 33, required: true }, //, autosuggest:true
			{ key: "state", enchanced: "State", jasonkey: 7, datatype: "string", searchon: true, display: true, mapto: "LocationState", label: lc["$LOC_LOCATIONSTATE"], formatstr: lc.$SYS_SELECTONE, htmltype: "select", size: 15, required: false },
			{ key: "zip", enchanced: "Zip", jasonkey: 8, datatype: "string", searchon: false, display: true, mapto: "LocationZip", label: lc["$LOC_LOCATIONZIP"], formatstr: "", htmltype: "text", size: 15, required: false },
			{ key: "cntry", enchanced: "Country", jasonkey: 9, datatype: "string", searchon: true, display: true, mapto: "LocationCountry", label: lc["$LOC_LOCATIONCOUNTRY"], formatstr: lc.$SYS_SELECTONE, htmltype: "select", size: 33, required: true },
			{ key: "BR" }
		]
	}]
};


/*
EXAMPLE
Index	Key		Enhanced
0		cid	
1		lcid	Key
2		name	Name
3		branch	BranchNumber
4		ad1		Address1
5		ad2		Address2
6		city	City
7		state	State
8		zip		Zip
9		cntry	Country
10		reg		RegionCode
11		ccode	CountryCode
12		rid		RedirectClientId
13		vid		ViolationPackageId
14		dp		DataPrivacy
15		cf1		LocationCustomField1
16		cf2		LocationCustomField2
17		cf3		LocationCustomField3
18		cf4		LocationCustomField4
19		cf5		LocationCustomField5
20		cf6		LocationCustomField6
21		cd1		CustomData1
22		cd2		CustomData2

*/