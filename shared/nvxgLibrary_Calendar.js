/*jshint sub:true*/
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
rbCalendar = {
	month_name 	: [lc["$CAL_JANUARY"],lc["$CAL_FEBRUARY"],lc["$CAL_MARCH"],lc["$CAL_APRIL"],lc["$CAL_MAY"],lc["$CAL_JUNE"],lc["$CAL_JULY"],lc["$CAL_AUGUST"],lc["$CAL_SEPTEMBER"],lc["$CAL_OCTOBER"],lc["$CAL_NOVEMBER"],lc["$CAL_DECEMBER"]],
	month_abr 	: [lc["$CAL_JANABRV"],lc["$CAL_FEBABRV"],lc["$CAL_MARABRV"],lc["$CAL_APRABRV"],lc["$CAL_MAYABRV"],lc["$CAL_JUNEABRV"],lc["$CAL_JULYABRV"],lc["$CAL_AUGABRV"],lc["$CAL_SEPTABRV"],lc["$CAL_OCTABRV"],lc["$CAL_NOVABRV"],lc["$CAL_DECABRV"]],
	day_name  	: [lc["$CAL_SUNDAY"],lc["$CAL_MONDAY"],lc["$CAL_TUESDAY"],lc["$CAL_WEDNESDAY"],lc["$CAL_THURSDAY"],lc["$CAL_FRIDAY"],lc["$CAL_SATURDAY"]],
	day_abr		: [lc["$CAL_SUNDAYABRV"],lc["$CAL_MONDAYABRV"],lc["$CAL_TUESDAYABRV"],lc["$CAL_WEDNESDAYABRV"],lc["$CAL_THURSDAYABRV"],lc["$CAL_FRIDAYABRV"],lc["$CAL_SATURDAYABRV"]],	
	day_label 	: [lc["$CAL_SUNDAYTINY"],lc["$CAL_MONDAYTINY"],lc["$CAL_TUESDAYTINY"],lc["$CAL_WEDNESDAYTINY"],lc["$CAL_THURSDAYTINY"],lc["$CAL_FRIDAYTINY"],lc["$CAL_SATURDAYTINY"]],
	hascalendar:false,
	dateFormat:"",
// Day of week def (0=Sun. thru Sat., 1=Mon. - Sun.) ------------------------------------------------------------------		
	week:[ 	{days: new Array (0,1,2,3,4,5,6)},
		 	{days: new Array (1,2,3,4,5,6,0)}
		 ],	 
// Functions ----------------------------------------------------------------------------------------------------------			
	init:function (){
		lang=(document.getElementsByTagName("html")[0].lang).toUpperCase();
		rbCalendar.dateFormat=rbCalendar.getDateFormat();

		x=nvxgWIF.getObjElementsByClassName("wif33pCalendar");
		for (i=0;i<x.length;i++) {
			x[i].setAttribute("value",rbCalendar.dateFormat);
			x[i].setAttribute("hint",rbCalendar.dateFormat);	
			x[i].setAttribute("title",lc.$CAL_SELECTION);		
		}
		x=nvxgWIF.getObjElementsByClassName("wif25pCalendar");
		for (i=0;i<x.length;i++) {
			x[i].setAttribute("value",rbCalendar.dateFormat);
			x[i].setAttribute("hint",rbCalendar.dateFormat);
			x[i].setAttribute("title",lc.$CAL_SELECTION);			
		}		
		x=nvxgWIF.getObjElementsByClassName("rbImgCalendarClear");
		for (i=0;i<x.length;i++) {
			x[i].setAttribute("title",lc["$CAL_CLEARDATE"]);
		}		
		x=nvxgWIF.getObjElementsByClassName("rbImgCalendar");
		for (i=0;i<x.length;i++) {
			x[i].setAttribute("title",lc["$CAL_SETDATE"]);
		}
		if(lc.$CAL_FORMAT.indexOf("mm/dd/yyyy")>-1 && rbCalendar.dateFormat !== "mm/dd/yyyy"){
			x=document.querySelectorAll("[class^='wifFieldFormatDef']");
			for (i=0;i<x.length;i++) {
				if(x[i].innerText.indexOf(lc.$CAL_FORMAT)>-1){
					x[i].innerText = x[i].innerText.replace("mm/dd/yyyy", rbCalendar.dateFormat);
				}
			}
			lc.$CAL_FORMAT = lc.$CAL_FORMAT.replace("mm/dd/yyyy", rbCalendar.dateFormat);
			lc.$CAL_FORMATVAL = rbCalendar.dateFormat;
		}

	},
// --------------------------------------------------------------------------------------------------------------------
	getEventTarget : function(e) {
		var targ;
		if (!e) {e = window.event;}if (e.target){targ = e.target;} else if (e.srcElement) {targ = e.srcElement;}
		if (targ.nodeType == 3) {targ = targ.parentNode;	}
	return targ;
	},
// --------------------------------------------------------------------------------------------------------------------
	createElement : function(element) {
		if (typeof document.createElementNS != 'undefined') {
			return document.createElementNS('', element);
		}
		if (typeof document.createElement != 'undefined') {
			return document.createElement(element);
		}
		return false;
	},
// --------------------------------------------------------------------------------------------------------------------
	clearObjectChildNodes : function(objID){
		obj = document.getElementById(objID);
		x = obj.childNodes.length;
		for (var i=0; i < x; i++){
			obj.removeChild(obj.childNodes[0]);
		}
	},
// --------------------------------------------------------------------------------------------------------------------	
	serializeNow : function(){
			var right_now=new Date();
			var month_num = right_now.getMonth()+1;
			var thedate=right_now.getDate()
			var right_year=right_now.getYear();
			if (right_year < 2000) 
			right_year = right_year + 1900; 
			if(Number(month_num) < 10){month_num = "0" + month_num;}
			if(Number(thedate) < 10){thedate = "0" + thedate;}
			var sdate = "" + right_year + month_num + thedate ;
			return sdate;			
	},
// --------------------------------------------------------------------------------------------------------------------
	serializeDate : function(d){
		if(d == undefined){
			var right_now=new Date();
			var month_num = right_now.getMonth();
			var thedate=right_now.getDate();
			var right_year=right_now.getYear();
			if (right_year < 2000) 
			right_year = right_year + 1900; 
			if(Number(month_num) < 10){month_num = "0" + month_num;}
			if(Number(thedate) < 10){thedate = "0" + thedate;}			
			var sdate = "" + right_year + month_num + thedate ;
		}else{
			d = "" + d;
			right_year 	= Number(d.substring(0,4));
			month_num 	= Number(d.substring(4,6));
			thedate 		= Number(d.substring(6,8));
			month_num = month_num -1;
			if(String(month_num).length == 1){month_num = "0" + String(month_num)};
			if(String(thedate).length == 1){thedate = "0" + String(thedate)};
			var sdate = String(right_year) + month_num + thedate ;
		}	
		current_month = sdate;
	return sdate;
	},
// --------------------------------------------------------------------------------------------------------------------
	getLastDayOfMonth : function(d){
		right_year 	= Number(d.substring(0,4));
		month_num 	= Number(d.substring(4,6));
		thedate 		= Number(d.substring(6,8));		
		if (month_num == 0 || month_num == 2 || month_num == 4 || month_num == 6 || month_num == 7 || month_num == 9 || month_num == 11){ lastdayofmonth=31;}
		if (month_num == 3 || month_num == 5 || month_num == 8 || month_num == 10){ lastdayofmonth=30;}
		if (month_num == 1){ 
			right_year_divided=right_year/4;
			right_year_divided_string= new String(right_year_divided);
			var is_decimal = right_year_divided_string.indexOf('.');
			if (is_decimal != -1){lastdayofmonth=28;}else{lastdayofmonth=29;};
			right_year_string= new String(right_year);
			var the_century=new String(right_year_string.charAt(2)) 
			the_century= the_century + new String(right_year_string.charAt(3));
			if (the_century == "00"){ 
				right_year_divided=right_year/400;
				right_year_divided_string= new String(right_year_divided);
				var is_decimal = right_year_divided_string.indexOf('.');
				if (is_decimal != -1){lastdayofmonth=28;}else{lastdayofmonth=29;};
			}
		}
	 return lastdayofmonth;
	},
// --------------------------------------------------------------------------------------------------------------------
	getFirstDayOfMonth : function(d){
		right_year 	= Number(d.substring(0,4));
		month_num 	= Number(d.substring(4,6));
		thedate 		= Number(d.substring(6,8));		
		a = new Date(right_year,month_num,1);
		firstdayofmonth = a.getDay();
	return firstdayofmonth;
	},
// --------------------------------------------------------------------------------------------------------------------	
	initCalendar: function (){
		rbCalendar.rbCalObj=document.createElement('DIV');
		rbCalendar.rbCalObj.className = 'rbCalendarObj';
		rbCalendar.onclick.stopPropagation(); 
		rbCalendar.rbCalObj.id = 'rbCalendarObj';
		document.body.appendChild(rbCalendar.rbCalObj);
		
		rbCalendar.createCalendar('rbCalendarObj');
	},
// --------------------------------------------------------------------------------------------------------------------
	openCalendar : function(targ,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,sd){
		if(document.getElementById(targ)==undefined || (document.getElementById(targ).tagName.toUpperCase()!= "INPUT"  && document.getElementById(targ).type.toUpperCase() !="TEXT")){
			alert('Invalid Value Target');
		}else{
			formatstr=rbCalendar.dateFormat.toUpperCase();
			if(mind==undefined || mind==""){mind=-1};if(maxd==undefined || maxd==""){maxd=-1};
			if(mind < 0){mind = 365*1000};if(maxd < 0){maxd = 365*1000};//maxd = maxd +1;			
			if(wstart==undefined || wstart==""){wstart=0};			
			if(dctrl==undefined || dctrl==""){dctrl=0};						
			if(mctrl==undefined || mctrl==""){mctrl=0};						
			if(yctrl==undefined || yctrl==""){yctrl=0};						
			if(ewknd==undefined || ewknd==""){ewknd=0};
			rbCalendar.rbCalObj=document.createElement('DIV');
			rbCalendar.rbCalObj.className = 'rbCalendarObj';
			rbCalendar.rbCalObj.id = targ + 'Calendar';
			rbCalendar.rbCalObj.setAttribute('targ',targ);
			rbCalendar.onselectstart = rbCalendar.stopSelect;	
			document.body.appendChild(rbCalendar.rbCalObj);
			targ= document.getElementById(targ);
			sd = targ.getAttribute('sdate');
			if(sd == null || sd == undefined || sd == "null" || sd == undefined  || sd == "undefined"|| sd == ""){
					var right_now=new Date();
					var monthval = right_now.getMonth()+1;
					if(monthval<10){monthval="0"+monthval};
					var dayval=right_now.getDate()
					if(dayval<10){dayval="0"+dayval};				
					var yearval=right_now.getFullYear();
						sdate=yearval+""+monthval+""+dayval;
			}else{
					sdate = sd;	
			};
			rbCalendar.createCalendar(rbCalendar.rbCalObj.id,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,sdate);
		}
	},

// --------------------------------------------------------------------------------------------------------------------
	createCalendar : function(objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,cDate){

		rbCalendar.hascalendar=true;
		obj = document.getElementById(objID);
		targ = obj.getAttribute('targ');		
		sdate=document.getElementById(targ).getAttribute('sdate');
		if(wstart==undefined || wstart=="" || wstart >1){wstart = 0};
		d = rbCalendar.serializeDate(cDate);
		right_year = Number(d.substring(0,4)); month_num = Number(d.substring(4,6)); thedate = Number(d.substring(6,8));	
		sd = rbCalendar.serializeDate(cDate);ld = rbCalendar.getLastDayOfMonth(sd);fd = rbCalendar.getFirstDayOfMonth(sd);
		rbCalendar.clearObjectChildNodes(objID);
		var calTitleBar=document.createElement('DIV');
		calTitleBar.onselectstart = rbCalendar.stopSelect;								
		calTitleBar.className = 'rbCalTiteBar';			
		var CalSpace=document.createElement('DIV');
		CalSpace.setAttribute("tabindex", 0);
		CalSpace.className = 'rbCalSpace';
		var CalPreviousMonth=document.createElement('DIV');
		if(mctrl==0){				
			p = rbCalendar.getPreviousMonth(month_num,right_year);
			CalPreviousMonth = rbCalendar.setControlAttribute('rbCalPreviousMonth',lc["$CAL_PREVIOUSMONTH"],CalPreviousMonth,objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,p);
		}else{
			CalPreviousMonth.className = 'rbCalPreviousMonthDisabled';
		}
		var CalPreviousYear=document.createElement('DIV');
		if(yctrl==0){		
			p = rbCalendar.getPreviousMonth(month_num+1,right_year-1);
			CalPreviousYear = rbCalendar.setControlAttribute('rbCalPreviousyear',lc["$CAL_PREVIOUSYEAR"],CalPreviousYear,objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,p);
		}else{
			CalPreviousYear.className = 'rbCalPreviousyearDisabled';		
		}
		var CalNextYear=document.createElement('DIV');
		if(yctrl==0){		
			p = rbCalendar.getPreviousMonth(month_num+1,right_year+1);			
			CalNextYear = rbCalendar.setControlAttribute('rbCalNextyear',lc["$CAL_NEXTYEAR"],CalNextYear,objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,p);
		}else{
			CalNextYear.className = 'rbCalNextyearDisabled';	
		}
		var CalMonthLabel=document.createElement('DIV');
		CalMonthLabel.onselectstart = rbCalendar.stopSelect;								
		CalMonthLabel.className = 'rbCalMonthLabel';	
		mlabel=rbCalendar.month_name[month_num] + ' ' + right_year;
		var CalMonthLabelText = document.createTextNode(mlabel);
		CalMonthLabel.appendChild(CalMonthLabelText);
		CalMonthLabel.title=mlabel;
		var CalNextMonth=document.createElement('DIV');
		if(mctrl==0){		
			p = rbCalendar.getNextMonth(month_num,right_year);
			CalNextMonth = rbCalendar.setControlAttribute('rbCalNextMonth',lc["$CAL_NEXTMONTH"],CalNextMonth,objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,p);
		}else{
			CalNextMonth.className = 'rbCalNextMonthDisabled';
		}
		var a=new Date();		
		var CalReturnToday=document.createElement('DIV');
		if(dctrl==0){
			var CalReturnTodayText = document.createTextNode(a.getDate());
			CalReturnToday.appendChild(CalReturnTodayText);
			CalReturnToday = rbCalendar.setControlAttribute('rbCalReturnToday',lc["$CAL_RETURNTOTODAY"],CalReturnToday,objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd);			
		}else{
			CalReturnToday.className = 'rbCalReturnTodayDisabled';						
		};
		var CalClose=document.createElement('DIV');
		CalClose.className = 'rbCalClose';
		CalClose.title = lc["$CLOSE"];
		CalClose.setAttribute('objID',objID);
		CalClose.setAttribute("tabindex", 0);
		CalClose.onclick = rbCalendar.closeCal;	
		CalClose.onkeypress = rbCalendar.presskeycloseCal;
		CalClose.className = 'rbCalClose';
		fobj =CalReturnToday;
		calTitleBar.appendChild(CalReturnToday);
		calTitleBar.appendChild(CalPreviousYear);		
		calTitleBar.appendChild(CalPreviousMonth);
		calTitleBar.appendChild(CalMonthLabel);
		calTitleBar.appendChild(CalNextMonth);
		calTitleBar.appendChild(CalNextYear);		
		calTitleBar.appendChild(CalClose);			
		obj.appendChild(calTitleBar);			
		var CalContainer=document.createElement('DIV');
		var CalTable=document.createElement('TABLE');		
		CalTable.setAttribute('cellSpacing','1');
		CalTable.setAttribute('cellPadding','0');
		CalTable.setAttribute('border','0');
		CalTable.className ="rbCalTable";
		CalTable.setAttribute('width','100%');		
		var CalTBody=document.createElement('TBODY');				
		var CalTR=document.createElement('TR');						
		for (var y=0; y < rbCalendar.week[wstart].days.length; y++){
			i = rbCalendar.week[wstart].days[y];
			var CalTH=document.createElement('TH');
			var CalDIV=document.createElement('DIV');			
			var CalDIVText = document.createTextNode(rbCalendar.day_label[i]);	
			CalDIV.title = rbCalendar.day_name[i];
			CalDIV.appendChild(CalDIVText);
			CalDIV.onselectstart = rbCalendar.stopSelect;								
			if(i==0 || i == 6){CalDIV.className = 'rbDayLabelWeekend';}else{CalDIV.className = 'rbDayLabelWeekday';};			
			CalTH.appendChild(CalDIV);
			CalTR.appendChild(CalTH);			
		}
		CalTBody.appendChild(CalTR);
		var daycounter = 1;
		var cellcounter = 0;
		firstDay = rbCalendar.getFirstDayOfMonth(d);
		lastDay =  rbCalendar.getLastDayOfMonth(d);	
		var MaxDate=new Date();
		MaxDate.setDate(MaxDate.getDate()+Number(maxd));		
		var MinDate=new Date();
		MinDate.setDate(MinDate.getDate()-Number(mind));	
		//alert(Number(firstDay) + ':' + Number(lastDay));
		wks=((Number(firstDay) + Number(lastDay))/7)
		if(parseInt(wks)==wks){weeks=wks}else{weeks=parseInt(wks)+1};
		obj.style.backgroundImage= `url(${document.getElementById("filepathDepth").value}_public_includes/images/rbDropshadow${weeks}.png)`;
		obh=0;if(weeks==4){obh='160px'};if(weeks==5){obh='195px'};if(weeks==6){obh='210px'};obj.style.height = obh;
		for (var w=0; w < weeks; w++){
			var CalTR=document.createElement('TR');	
			for (var y=0; y < rbCalendar.week[wstart].days.length; y++){
			i = rbCalendar.week[wstart].days[y];		
				var CalTD=document.createElement('TD');
				CalTD.setAttribute('width','14%');
				if(cellcounter >=  (firstDay-Number(rbCalendar.week[wstart].days[0])) && daycounter <= lastDay){
					var CalDIV=document.createElement('DIV');
					var CalDIVText = document.createTextNode(daycounter);									
					j = daycounter; if(String(daycounter).length == 1){j = "0" + String(daycounter)};
					n  = Number(month_num);n = n + 1; 	if(String(n).length == 1){n = "0" + String(n)};					
					k = "" + right_year + String(n) + String(j);
					q = new Date(Number(right_year), Number(month_num), Number(j)); 
					cy=a.getYear();cm=a.getMonth() + 1;cd=a.getDate();if(Number(cd)<10){cd="0"+cd};
					cy=String(cy);cm=String(cm);if(cm.length==1){cm = "0" + cm};cd=String(cd);if(cd.length==1){cd = "0" + cd};					
					r = "" + cy + cm + cd;
					if(q>=MinDate && q<MaxDate){
						var dateenabled = true;
						if(dateenabled){
							if(i==0 || i == 6){
								if(ewknd==-1){
									CalDIV.className = 'rbDayWeekendOut';
									CalDIV.title = lc["$CAL_OUTOFRANGE"];
									CalDIV.onselectstart = rbCalendar.stopSelect;								
								}else{
									CalDIV.className = 'rbDayWeekend';
									CalDIV.title = lc["$CAL_SELECTDATE"];									
									//CalDIV = rbCalendar.isHolday(CalDIV,k,right_year,n,i,firstDay,lastDay);	
									if(sdate !='null' && sdate !=undefined){if(k==sdate){CalDIV.className = 'rbDaySelected'; var fobj=CalDIV};};
									CalDIV.setAttribute('calDate',k);
									CalDIV.setAttribute('formatstr',formatstr);
									CalDIV.setAttribute("tabindex", 0);
									CalDIV.onclick = rbCalendar.clickCalDate;
									CalDIV.onkeypress = rbCalendar.presskey;
									CalDIV.onselectstart = rbCalendar.stopSelect;		
								}
							}else{
								CalDIV.className = 'rbDayWeekday';
								CalDIV.title = lc["$CAL_SELECTDATE"];
								//CalDIV = rbCalendar.isHolday(CalDIV,k,right_year,n,i,firstDay,lastDay);
								if(k==r){CalDIV.className = 'rbDayToday'; var fobj=CalDIV};	
								if(sdate !='null' && sdate !=undefined){if(k==sdate){CalDIV.className = 'rbDaySelected'; var fobj=CalDIV};};
								CalDIV.setAttribute('calDate',k);
								CalDIV.setAttribute('formatstr',formatstr);
								CalDIV.setAttribute("tabindex", 0);
								CalDIV.onclick = rbCalendar.clickCalDate;
								CalDIV.onkeypress = rbCalendar.presskey;
								CalDIV.onselectstart = rbCalendar.stopSelect;		
							};
						}else{
							if(i==0 || i == 6){CalDIV.className = 'rbDayWeekendOut';}else{CalDIV.className = 'rbDayWeekdayOut';};
							CalDIV.title = lc["$CAL_OUTOFRANGE"];
							CalDIV.onselectstart = rbCalendar.stopSelect;								
							};
					}else{
						if(i==0 || i == 6){CalDIV.className = 'rbDayWeekendOut';}else{CalDIV.className = 'rbDayWeekdayOut';};
						CalDIV.title = lc["$CAL_OUTOFRANGE"];
						CalDIV.onselectstart = rbCalendar.stopSelect;								
					}
					CalDIV.appendChild(CalDIVText);
					daycounter = daycounter + 1;
					CalTD.appendChild(CalDIV);						
				}
				cellcounter = cellcounter + 1;
				CalTR.appendChild(CalTD);				
			}
			CalTBody.appendChild(CalTR);
		}
		CalTable.appendChild(CalTBody);		
		CalContainer.appendChild(CalTable);				
		obj.appendChild(CalContainer);	
			mytrag=document.getElementById(targ);
			did = mytrag.getAttribute("DialogInDialog");
			if(did !=undefined){
				if(did=="MultiRecordImportDialog"){
					impodid = document.getElementById("MultiRecordImportLoaded");
					didoffestLeft =impodid.scrollLeft;
					didoffestTop =impodid.scrollTop;
					if (nvxgWIF.isIE) {
						sy=document.documentElement.scrollTop + document.body.scrollTop;
					}else{
						sy=window.scrollY;
					};
					didoffestTop=didoffestTop - sy + 2;
				};
			}else{
				didoffestLeft = 0;
				didoffestTop = 0;								 
			};
		document.getElementById(targ + "Calendar").style.left = (rbCalendar.getElementLeft(targ)-1)-didoffestLeft + "px";
		document.getElementById(targ + "Calendar").style.top = (rbCalendar.getElementTop(targ)+22)-didoffestTop + "px";
	},
// --------------------------------------------------------------------------------------------------------------------
	presskey : function(e){
		var charCode;
		if(e && e.which){
			charCode = e.which;
			}else if(window.event){e = window.event;        charCode = e.keyCode;}
			if(charCode == 13) {
			rbCalendar.clickCalDate(e);
			};
	},	
// --------------------------------------------------------------------------------------------------------------------	
	clickCalDate : function (e){
		var obj = rbCalendar.getEventTarget(e);while(obj.tagName != 'DIV'){obj = obj.parentNode};
		d = obj.getAttribute('calDate');
		f = obj.getAttribute('formatstr');
		while(obj.className != 'rbCalendarObj'){obj = obj.parentNode};
		t = obj.getAttribute('targ');
		document.getElementById(t).value=rbCalendar.formatDate(d,f);
		document.getElementById(t).setAttribute('sdate',d);
		document.body.removeChild(document.getElementById(t + "Calendar"));
		document.getElementById(t).focus();
		hint = document.getElementById(t).getAttribute('hint');
		if(hint !=undefined){				
			if(document.getElementById(t).value != hint){document.getElementById(t).style.color = "#00F";}else{document.getElementById(t).style.color = "#cdcdcd"}
		};		
		
	},
// --------------------------------------------------------------------------------------------------------------------	
	clickClearDate : function (targid){
		targ= document.getElementById(targid);
		sdate=targ.setAttribute('sdate',"null");		
		hint = targ.getAttribute('hint');
		if(hint !=undefined){				
			targ.style.color = "#cdcdcd";				
			targ.value = hint;
		}else{
			targ.style.color = "#00F";			
			targ.value = "  /  /    ";				
		};		
		if(document.getElementById(targid + "Calendar")!= null){
				document.body.removeChild(document.getElementById(targid + "Calendar"));	
		};
	},	
	
// --------------------------------------------------------------------------------------------------------------------			
	setControlAttribute : function (cname,title,cobj,objID,formatstr,mind,maxd,wstart,dctrl,mctrl,yctrl,ewknd,p){
		cobj.className=cname;
		cobj.title=title;
		cobj.setAttribute('objID',objID);
		cobj.setAttribute('formatstr',formatstr);
		cobj.setAttribute('mind',mind);
		cobj.setAttribute('maxd',maxd);	
		cobj.setAttribute('wstart',wstart);	
		cobj.setAttribute('dctrl',dctrl);	
		cobj.setAttribute('mctrl',mctrl);	
		cobj.setAttribute('yctrl',yctrl);
		cobj.setAttribute('ewknd',ewknd);						
		cobj.setAttribute("tabindex", 0);
		cobj.onclick = rbCalendar.moveMonth;
		cobj.onkeypress = rbCalendar.presskeymoveMonth;
		cobj.onselectstart = rbCalendar.stopSelect;				
		if(p!=undefined){cobj.setAttribute('targetDate',p)}else{p=undefined};			
		return cobj;
	},
// --------------------------------------------------------------------------------------------------------------------		
	formatDate:function(dateval,formatstr){
	/* Options:	YYYY	= 2009
				YY		= 09
				MMMM	= Febuary
				MMM		= Feb.
				MM		= 02
				M		= 2
				DDDD	= Saturday
				DDD		= Sat.
				DD		= 05
				D		= 5
				
	  Examples:	DDDD, MMMM DD, YYYY	= Saturday, Novmber 21, 2009
	  			DD/MM/YYYY			= 11/21/2009
				MMM-YY				= Nov.-2009
	
	*/	
		if(formatstr==undefined || formatstr ==""){
			return dateval;	
		}else{
			var v = formatstr;
			formatstr = formatstr.toUpperCase();
			yearval = (dateval.substring(0,4));
			monthval= (dateval.substring(4,6));
			dayval = (dateval.substring(6,8));
			formatstr = formatstr.replace(new RegExp("\\bYYYY\\b","gi"),yearval);
			formatstr = formatstr.replace(new RegExp("\\bYY\\b","gi"),yearval.substring(2,4));
			formatstr = formatstr.replace(new RegExp("\\bMMMM\\b","gi"),rbCalendar.month_name[Number(monthval)-1]);
			formatstr = formatstr.replace(new RegExp("\\bMMM\\b","gi"),rbCalendar.month_abr[Number(monthval)-1]);	
			formatstr = formatstr.replace(new RegExp("\\bMM\\b","gi"),monthval);
			formatstr = formatstr.replace(new RegExp("\\bM\\b","gi"),Number(monthval));
			f=new Date();f.setFullYear(Number(yearval));f.setMonth(Number(monthval)-1);f.setDate(Number(dayval));	
			formatstr = formatstr.replace(new RegExp("\\bDDDD\\b","gi"),rbCalendar.day_name[f.getDay()]);
			formatstr = formatstr.replace(new RegExp("\\bDDD\\b","gi"),rbCalendar.day_abr[f.getDay()]);
			formatstr = formatstr.replace(new RegExp("\\bDD\\b","gi"),dayval);
			formatstr = formatstr.replace(new RegExp("\\bD\\b","gi"),Number(dayval));	
			if(formatstr == v){return dateval;}else{return formatstr;};
		}
	},
	// --------------------------------------------------------------------------------------------------------------------
	presskeycloseCal : function(e){
		var charCode;
		if(e && e.which){
			charCode = e.which;
			}else if(window.event){e = window.event;        charCode = e.keyCode;}
			if(charCode == 13) {
			rbCalendar.closeCal(e);
			};
	},
// --------------------------------------------------------------------------------------------------------------------	
	closeCal : function (e){
		var obj = rbCalendar.getEventTarget(e);while(obj.className != 'rbCalendarObj'){obj = obj.parentNode};
		t = obj.getAttribute('targ');
		document.body.removeChild(document.getElementById(t + "Calendar"));	
	},	
	closeCalCall:function(t){
		try{document.body.removeChild(document.getElementById(t + "Calendar"));}catch(err){};		
		
	},
// --------------------------------------------------------------------------------------------------------------------
	presskeymoveMonth : function(e){
		var charCode;
		if(e && e.which){
			charCode = e.which;
			}else if(window.event){e = window.event;        charCode = e.keyCode;}
			if(charCode == 13) {
			rbCalendar.moveMonth(e);
			};
	},	
// --------------------------------------------------------------------------------------------------------------------
	moveMonth : function (e){
		var obj = rbCalendar.getEventTarget(e);while(obj.tagName != 'DIV'){obj = obj.parentNode};
		rbCalendar.createCalendar(obj.getAttribute('objID'),obj.getAttribute('formatstr'),obj.getAttribute('mind'),obj.getAttribute('maxd'),obj.getAttribute('wstart'),obj.getAttribute('dctrl'),obj.getAttribute('mctrl'),obj.getAttribute('yctrl'),obj.getAttribute('ewknd'),obj.getAttribute('targetDate'));
	},
// --------------------------------------------------------------------------------------------------------------------
	getPreviousMonth : function (m,y){
		n = m + 1; 
		n = n - 1; if(n == 0 ){n=12; y = y-1};
		if(String(n).length == 1){n = "0" + String(n)};
		g= String(y) + String(n) + "01";
		return  g;	
	},	
// --------------------------------------------------------------------------------------------------------------------
	getNextMonth : function (m,y){
		n = m + 1;
		n = n + 1; if(n == 13 ){n=1; y = y+1};
		if(String(n).length == 1){n = "0" + String(n)};
		g= String(y) + String(n) + "01";
		return  g;	
	},	
// --------------------------------------------------------------------------------------------------------------------	
	getDateFormat: function() {
		var formats = {
			"af-za" : "yyyy/mm/dd",
			"am-et" : "dd/mm/yyyy",
			"ar-ae" : "dd/mm/yyyy",
			"ar-bh" : "dd/mm/yyyy",
			"ar-dz" : "dd/mm/yyyy",
			"ar-eg" : "dd/mm/yyyy",
			"ar-iq" : "dd/mm/yyyy",
			"ar-jo" : "dd/mm/yyyy",
			"ar-kw" : "dd/mm/yyyy",
			"ar-lb" : "dd/mm/yyyy",
			"ar-ly" : "dd/mm/yyyy",
			"ar-ma" : "dd/mm/yyyy",
			"ar-om" : "dd/mm/yyyy",
			"ar-qa" : "dd/mm/yyyy",
			"ar-sa" : "dd/mm/yyyy",
			"ar-sy" : "dd/mm/yyyy",
			"ar-tn" : "dd/mm/yyyy",
			"ar-ye" : "dd/mm/yyyy",
			"arn-cl" : "dd/mm/yyyy",
			"as-in" : "dd/mm/yyyy",
			"az-cyrl-az" : "dd/mm/yyyy",
			"az-latn-az" : "dd/mm/yyyy",
			"ba-ru" : "dd/mm/yyyy",
			"be-by" : "dd/mm/yyyy",
			"bg-bg" : "dd/mm/yyyy",
			"bn-bd" : "dd/mm/yyyy",
			"bn-in" : "dd/mm/yyyy",
			"bo-cn" : "yyyy/mm/dd",
			"br-fr" : "dd/mm/yyyy",
			"bs-cyrl-ba" : "dd/mm/yyyy",
			"bs-latn-ba" : "dd/mm/yyyy",
			"ca-es" : "dd/mm/yyyy",
			"co-fr" : "dd/mm/yyyy",
			"cs-cz" : "dd/mm/yyyy",
			"cy-gb" : "dd/mm/yyyy",
			"da-dk" : "dd/mm/yyyy",
			"de-at" : "dd/mm/yyyy",
			"de-ch" : "dd/mm/yyyy",
			"de-de" : "dd/mm/yyyy",
			"de-li" : "dd/mm/yyyy",
			"de-lu" : "dd/mm/yyyy",
			"dsb-de" : "dd/mm/yyyy",
			"dv-mv" : "dd/mm/yyyy",
			"el-gr" : "dd/mm/yyyy",
			"en-029" : "mm/dd/yyyy",
			"en-au" : "dd/mm/yyyy",
			"en-bz" : "dd/mm/yyyy",
			"en-ca" : "dd/mm/yyyy",
			"en-gb" : "dd/mm/yyyy",
			"en-ie" : "dd/mm/yyyy",
			"en-in" : "dd/mm/yyyy",
			"en-jm" : "dd/mm/yyyy",
			"en-my" : "dd/mm/yyyy",
			"en-nz" : "dd/mm/yyyy",
			"en-ph" : "mm/dd/yyyy",
			"en-sg" : "dd/mm/yyyy",
			"en-tt" : "dd/mm/yyyy",
			"en-us" : "mm/dd/yyyy",
			"en-za" : "yyyy/mm/dd",
			"en-zw" : "mm/dd/yyyy",
			"es-ar" : "dd/mm/yyyy",
			"es-bo" : "dd/mm/yyyy",
			"es-cl" : "dd/mm/yyyy",
			"es-co" : "dd/mm/yyyy",
			"es-cr" : "dd/mm/yyyy",
			"es-do" : "dd/mm/yyyy",
			"es-ec" : "dd/mm/yyyy",
			"es-es" : "dd/mm/yyyy",
			"es-gt" : "dd/mm/yyyy",
			"es-hn" : "dd/mm/yyyy",
			"es-mx" : "dd/mm/yyyy",
			"es-ni" : "dd/mm/yyyy",
			"es-pa" : "mm/dd/yyyy",
			"es-pe" : "dd/mm/yyyy",
			"es-pr" : "dd/mm/yyyy",
			"es-py" : "dd/mm/yyyy",
			"es-sv" : "dd/mm/yyyy",
			"es-us" : "mm/dd/yyyy",
			"es-uy" : "dd/mm/yyyy",
			"es-ve" : "dd/mm/yyyy",
			"et-ee" : "dd/mm/yyyy",
			"eu-es" : "yyyy/mm/dd",
			"fa-ir" : "mm/dd/yyyy",
			"fi-fi" : "dd/mm/yyyy",
			"fil-ph" : "mm/dd/yyyy",
			"fo-fo" : "dd/mm/yyyy",
			"fr-be" : "dd/mm/yyyy",
			"fr-ca" : "yyyy/mm/dd",
			"fr-ch" : "dd/mm/yyyy",
			"fr-fr" : "dd/mm/yyyy",
			"fr-lu" : "dd/mm/yyyy",
			"fr-mc" : "dd/mm/yyyy",
			"fy-nl" : "dd/mm/yyyy",
			"ga-ie" : "dd/mm/yyyy",
			"gd-gb" : "dd/mm/yyyy",
			"gl-es" : "dd/mm/yyyy",
			"gsw-fr" : "dd/mm/yyyy",
			"gu-in" : "dd/mm/yyyy",
			"ha-latn-ng" : "dd/mm/yyyy",
			"he-il" : "dd/mm/yyyy",
			"hi-in" : "dd/mm/yyyy",
			"hr-ba" : "dd/mm/yyyy",
			"hr-hr" : "dd/mm/yyyy",
			"hsb-de" : "dd/mm/yyyy",
			"hu-hu" : "yyyy/mm/dd",
			"hy-am" : "dd/mm/yyyy",
			"id-id" : "dd/mm/yyyy",
			"ig-ng" : "dd/mm/yyyy",
			"ii-cn" : "yyyy/mm/dd",
			"is-is" : "dd/mm/yyyy",
			"it-ch" : "dd/mm/yyyy",
			"it-it" : "dd/mm/yyyy",
			"iu-cans-ca" : "dd/mm/yyyy",
			"iu-latn-ca" : "dd/mm/yyyy",
			"ja-jp" : "yyyy/mm/dd",
			"ka-ge" : "dd/mm/yyyy",
			"kk-kz" : "dd/mm/yyyy",
			"kl-gl" : "dd/mm/yyyy",
			"km-kh" : "yyyy/mm/dd",
			"kn-in" : "dd/mm/yyyy",
			"ko-kr" : "yyyy/mm/dd",
			"kok-in" : "dd/mm/yyyy",
			"ky-kg" : "dd/mm/yyyy",
			"lb-lu" : "dd/mm/yyyy",
			"lo-la" : "dd/mm/yyyy",
			"lt-lt" : "yyyy/mm/dd",
			"lv-lv" : "yyyy/mm/dd",
			"mi-nz" : "dd/mm/yyyy",
			"mk-mk" : "dd/mm/yyyy",
			"ml-in" : "dd/mm/yyyy",
			"mn-mn" : "yyyy/mm/dd",
			"mn-mong-cn" : "yyyy/mm/dd",
			"moh-ca" : "mm/dd/yyyy",
			"mr-in" : "dd/mm/yyyy",
			"ms-bn" : "dd/mm/yyyy",
			"ms-my" : "dd/mm/yyyy",
			"mt-mt" : "dd/mm/yyyy",
			"nb-no" : "dd/mm/yyyy",
			"ne-np" : "mm/dd/yyyy",
			"nl-be" : "dd/mm/yyyy",
			"nl-nl" : "dd/mm/yyyy",
			"nn-no" : "dd/mm/yyyy",
			"nso-za" : "yyyy/mm/dd",
			"oc-fr" : "dd/mm/yyyy",
			"or-in" : "dd/mm/yyyy",
			"pa-in" : "dd/mm/yyyy",
			"pl-pl" : "yyyy/mm/dd",
			"prs-af" : "dd/mm/yyyy",
			"ps-af" : "dd/mm/yyyy",
			"pt-br" : "dd/mm/yyyy",
			"pt-pt" : "dd/mm/yyyy",
			"qut-gt" : "dd/mm/yyyy",
			"quz-bo" : "dd/mm/yyyy",
			"quz-ec" : "dd/mm/yyyy",
			"quz-pe" : "dd/mm/yyyy",
			"rm-ch" : "dd/mm/yyyy",
			"ro-ro" : "dd/mm/yyyy",
			"ru-ru" : "dd/mm/yyyy",
			"rw-rw" : "mm/dd/yyyy",
			"sa-in" : "dd/mm/yyyy",
			"sah-ru" : "mm/dd/yyyy",
			"se-fi" : "dd/mm/yyyy",
			"se-no" : "dd/mm/yyyy",
			"se-se" : "yyyy/mm/dd",
			"si-lk" : "yyyy/mm/dd",
			"sk-sk" : "dd/mm/yyyy",
			"sl-si" : "dd/mm/yyyy",
			"sma-no" : "dd/mm/yyyy",
			"sma-se" : "yyyy/mm/dd",
			"smj-no" : "dd/mm/yyyy",
			"smj-se" : "yyyy/mm/dd",
			"smn-fi" : "dd/mm/yyyy",
			"sms-fi" : "dd/mm/yyyy",
			"sq-al" : "yyyy/mm/dd",
			"sr-cyrl-ba" : "dd/mm/yyyy",
			"sr-cyrl-cs" : "dd/mm/yyyy",
			"sr-cyrl-me" : "dd/mm/yyyy",
			"sr-cyrl-rs" : "dd/mm/yyyy",
			"sr-latn-ba" : "dd/mm/yyyy",
			"sr-latn-cs" : "dd/mm/yyyy",
			"sr-latn-me" : "dd/mm/yyyy",
			"sr-latn-rs" : "dd/mm/yyyy",
			"sv-fi" : "dd/mm/yyyy",
			"sv-se" : "yyyy/mm/dd",
			"sw-ke" : "mm/dd/yyyy",
			"syr-sy" : "dd/mm/yyyy",
			"ta-in" : "dd/mm/yyyy",
			"te-in" : "dd/mm/yyyy",
			"tg-cyrl-tj" : "dd/mm/yyyy",
			"th-th" : "dd/mm/yyyy",
			"tk-tm" : "dd/mm/yyyy",
			"tn-za" : "yyyy/mm/dd",
			"tr-tr" : "dd/mm/yyyy",
			"tt-ru" : "dd/mm/yyyy",
			"tzm-latn-dz" : "dd/mm/yyyy",
			"ug-cn" : "yyyy/mm/dd",
			"uk-ua" : "dd/mm/yyyy",
			"ur-pk" : "dd/mm/yyyy",
			"uz-cyrl-uz" : "dd/mm/yyyy",
			"uz-latn-uz" : "dd/mm/yyyy",
			"vi-vn" : "dd/mm/yyyy",
			"wo-sn" : "dd/mm/yyyy",
			"xh-za" : "yyyy/mm/dd",
			"yo-ng" : "dd/mm/yyyy",
			"zh-cn" : "yyyy/mm/dd",
			"zh-hk" : "dd/mm/yyyy",
			"zh-mo" : "dd/mm/yyyy",
			"zh-sg" : "dd/mm/yyyy",
			"zh-tw" : "yyyy/mm/dd",
			"zu-za" : "yyyy/mm/dd"
		};
		switch(document.getElementById("dateformat").value){
			case "0":
				var navigatorLang = navigator.language || navigator.userLanguage;
				return navigatorLang && formats[navigatorLang.toLowerCase()] ? formats[navigatorLang.toLowerCase()] : "mm/dd/yyyy";
			case "1":
				return "mm/dd/yyyy";
			case "2":
				return "dd/mm/yyyy";
			case "3":
				return "yyyy/mm/dd";
			default: // Fallback
				return "mm/dd/yyyy";
		}
	},
// --------------------------------------------------------------------------------------------------------------------	
 	getElementLeft : function(Elem) {
		var elem;
		if(document.getElementById) {
			var elem = document.getElementById(Elem);
		} else if (document.all){
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
	 getElementTop : function(Elem) {
		if(document.getElementById) {	
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
	stopSelect : function(){
	return false;
	},
// --------------------------------------------------------------------------------------------------------------------
	getObjElementsByClassName : function(className,obj) {
		obj = obj || document;
return obj.getElementsByClassName(className);
	},
// --------------------------------------------------------------------------------------------------------------------	
	lastFunction : function() {}	
}
// Init Calendar Code 
if(window.addEventListener){window.addEventListener('load', rbCalendar.init, false);}else if(window.attachEvent){window.attachEvent('onload',rbCalendar.init)}

