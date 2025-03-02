/* 	JavaScript Document
	Redistribution and use in source and binary forms, with or without modification, is NOT permitted without written consent from NAVEX
	Privacy policy:			http://www.ethicspoint.com/en/privacypolicy.asp
	Acceptable use policy:	http://www.ethicspoint.com/en/acceptableuse.asp
	Contact information:	direct 1-971-250-4100
							toll-free 866-297-0224
							info@ethicspoint.com
							
	Author:					Austin Linnell | Sr. Web Developer
	Dept.:					Web Development/Client Interface
	codebase: 				NVXG.V5.2024.11.04
*/

var	epMIMOObjDef = {
    issueTypeTitle:true,

    // These text values are currently being pulled from the localization file.
    issueSubSectionLabel:   [lc["$MGR_ISSUEONE"],lc["$MGR_ISSUETWO"],lc["$MGR_ISSUETHREE"],lc["$MGR_ISSUEFOUR"],lc["$MGR_ISSUEFIVE"]],
    
	fields: [
        {
            id: "ActionTakenID",
            title: lc["$MGR_ACTIONTAKENID"],
            formatStr: lc["$SYS_SELECTONE"],
            issueDependency: [],
            type: "Select",
            required: true,
            size: 50,
            src:[

            ]
        },
        {
            id: "OutcomeID",
            title: lc["$MGR_PRIMARYOUTCOMEID"],
            formatStr: lc["$SYS_SELECTONE"],
            issueDependency: [],
            type: "Select",
            required: true,
            size: 50,
            src:[

            ]
        },
    ]
};
