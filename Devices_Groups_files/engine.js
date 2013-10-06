/*
 * Colt engine
 *
 * Requires Config.js, jquery.min.js, jquery.tinyscrollbar.min.js
 */
// DOM ready function

var DOMready=(function(){var win=window,doc=win.document,dce=doc.createElement,supportAEL=!!doc.addEventListener,queue=[],exec,loaded,fallback_onload,explorerTimer,readyStateTimer,isIE=(function(){var undef,v=3,div=doc.createElement('div'),all=div.getElementsByTagName('i');while(div.innerHTML='<!--[if gt IE '+(++v)+']><i></i><![endif]-->',all[0]);return v>4?v:undef}());function process(){loaded=true;if(supportAEL){doc.removeEventListener("DOMContentLoaded",process,false)}while((exec=queue.shift())){exec()}}return function(fn){if(loaded){return fn()}if(supportAEL){doc.addEventListener("DOMContentLoaded",process,false)}else if(isIE<9){explorerTimer=win.setInterval(function(){if(doc.body){try{dce('div').doScroll('left');win.clearInterval(explorerTimer)}catch(e){return}process();return}},10);function checkReadyState(){if(doc.readyState=='complete'){doc.detachEvent('onreadystatechange',checkReadyState);win.clearInterval(explorerTimer);win.clearInterval(readyStateTimer);process()}}doc.attachEvent('onreadystatechange',checkReadyState);readyStateTimer=win.setInterval(function(){checkReadyState()},10)}fallback_onload=function(){process();if(supportAEL){doc.removeEventListener('load',fallback_onload,false)}else{doc.detachEvent('onload',fallback_onload)}};if(supportAEL){doc.addEventListener('load',fallback_onload,false)}else{doc.attachEvent('onload',fallback_onload)}queue.push(fn)}}());

DOMready( function () {
	/*
	 * When DOM is ready, the Chart class is included to be loaded.
	 * Once the Chart class is loaded, reporting.chart_class_ready function is called.
	 */
	reporting.lazy_load ( "#chart_container", "public/assets/js/Chart.class.js", reporting.chart_tab_class_ready );

	/*
	 * See below for reporting.loop_elements and reporting.run_layout_helpers description
	 */
	reporting.loop_elements ( ".group-solution-item", expanding_box.init_box, reporting.on_open_group );
	//Below line commented as element page now has nested groups impl.
	//reporting.loop_elements ( ".element-page-sidebar", reporting.call_group_availability );
	reporting.loop_elements ( ".elementp .group-solution-item", reporting.call_group_availability );
	reporting.loop_elements ( ".tab-container", tab.init_tab, tab.init_ended );

	reporting.run_layout_helpers ();
	Jsp.fnJspOnLoad();

	$('.scrollbar1').tinyscrollbar();

	$(document).click(function (){
		$('div.otherTabs_dd').css({ "z-index":"-1",'top':'-400px' });
		$('.tab-navigation b.active_dd').removeClass('active_dd');
		$( ".external-tool-dropdown").remove ();
	});

	$('.scrollbar div').click(function (e){
		e.stopPropagation();
	});

	$('.otherTabs_dd .overview ul li').live('click',function (){	
		var currentTabConfig = $(this)[0].tabConfig;
		var previousTabConfig = $('.tab-navigation b.active_dd').parent('li')[0].tabConfig;
		$('.tab-navigation b.active_dd').parent('li')[0].tabConfig = currentTabConfig;

		//main tabs
		var openDDtab = $('.tab-navigation b.active_dd').parent('li').index();
		var parentTabClass = $('.tab-navigation b.active_dd').parent('li').attr('class');

		var openDDtabSequence = $('.tab-navigation b.active_dd').parent('li').attr('displaysequence');		
		var ddClickedTabOrder = $(this).attr('displaysequence');
		var elementType = $(this).attr('elementtype');
		var openDDtabElementType = $('.tab-navigation li').eq(openDDtab).attr('elementtype');

		var firstafteritem = $(".otherTabs_dd ul").children().filter( function () {
		    return ($(this).attr('displaysequence') > openDDtabSequence);
		} ).eq(0);

		var tabText =$(this).text();
		var previoustabText = $('.tab-navigation li').eq(openDDtab).find('>a').text();
		var metricType1 = $('.tab-navigation li').eq(openDDtab).attr('key');
		var metricType = $(this).attr('key');

		$('.tab-navigation li').eq(openDDtab).find('>a').text(tabText);
		$('.tab-navigation li').eq(openDDtab).attr('key',metricType);		
		$('.tab-navigation li').eq(openDDtab).attr('displaysequence',ddClickedTabOrder);
		$('.tab-navigation li').eq(openDDtab).attr('elementtype',elementType);

		//firstafteritem.before('<li displaysequence="'+openDDtabSequence+'" key="'+metricType1+'" elementtype="'+openDDtabElementType+'"><a>'+previoustabText+'</a></li>');
		$(".otherTabs_dd ul").append('<li displaysequence="'+openDDtabSequence+'" key="'+metricType1+'" elementtype="'+openDDtabElementType+'"><a href="#">'+previoustabText+'</a></li>');

		var thisTabObject = $('li[key="' + metricType1 + '"]').get(0);
		var tabConfig = {tabConfig:previousTabConfig};
		$.extend(thisTabObject, tabConfig);

		$('div.otherTabs_dd').css({ "z-index":"-1",'top':'-400px' });
		$('.tab-navigation b.active_dd').removeClass('active_dd');
		$('.tab-navigation b.active_dd').parent('li').attr('displaysequence');
		$(this).remove();
		if("active-tab" == parentTabClass){
			$(".tab-navigation li.active-tab").click();
		}

		$("div.otherTabs_dd ul li").sort(function(obj1, obj2){
			// order drop down items by display sequence in ASC order
			return parseInt($(obj1).attr('displaysequence')) > parseInt($(obj2).attr('displaysequence')) ? 1 : -1;
		}).appendTo("div.otherTabs_dd ul");
	});

	$('.tab-navigation li').live('click',function (){
		$('.loadingChart').remove();
		var key =($(".tab-navigation li.active-tab").attr('key'));
		var elementType = ($(".tab-navigation li.active-tab").attr('elementType'));

		var chartKey = key.replace('.*', '_').replace('.*', '_').replace('.', '_');

		if($('#chart_' +chartKey).attr('data-highcharts-chart') == undefined || $('#chart_' +chartKey).attr('data-highcharts-chart') == null){
			reporting.chart_class_ready(key,elementType,$(".tab-navigation li.active-tab")[0].tabConfig);
		}

		$('.tab-pane').css('display','none');

		$('#chart_' +chartKey).parent('div').css('display','block');
	});
});

/*
 * reporting object is the main object of engine.js.
 */
var reporting = {

	/*
	 * Init variables
	 */
	system_loaded: true,				// Used by lazy_loader method
	system_loaded_callbacks: [],		// Used by lazy_loader method
	system_components_loading: [],		// Used by lazy_loader method
	callback_collector: {},				// NOT_USED: This colletor was initially used to reference a set of callbacks to be associated with chart istances.
	handling_group_id: false,			// Group ID storage

	/*
	 * Method to fix/prepare some UI behaviors
	 */
	run_layout_helpers: function ()
	{
		/*
		 * LI Rows "float clearer" generator
		 * Used in groups page to wrap boxes after 4 group elements
		 */
		if ( $(".group-solution-container").size() == 1 )
			$(".group-solution-container li.group-solution-item:nth-child(4n)").after ( $('<li class="row-end"></li>'));

		/* Auto-open groups with highlight class */
		function getParams(){
			var idx = document.URL.indexOf('?');
			var params = new Array();
			if (idx != -1) {
				var pairs = document.URL.substring(idx+1, document.URL.length).split('&');
				for (var i=0; i<pairs.length; i++){
					nameVal = pairs[i].split('=');
					params[nameVal[0]] = nameVal[1];
				}
			}
			return params;
		}

		subgroupid = $('.element-selected').attr('elementid');

		expanding_box.check_autoOpen (subgroupid);

		/* Custom scroll */
		$('.layout-col-small.scrollbar-container').filter(":visible").tinyscrollbar();
		$('.layout-col-small.scrollbar-container').filter(":visible").tinyscrollbar_h({ axis: 'x'});
		/*
		 * Scroll to selected item
		 * Used in element page to scroll the custom scrollbar to display the selected element on the left Column
		 */
		if ( $(".element-selected").size() > 0 ) {
			var scrollTo = $(".element-selected").position().top - ( $(".element-selected").outerHeight () * 3);
			if ( scrollTo > $(".elements-list").outerHeight() - $(".viewport").outerHeight() )
				scrollTo = $(".elements-list").outerHeight() - $(".viewport").outerHeight();
			$('.scrollbar-container').tinyscrollbar_update( scrollTo > 0 ? scrollTo : 0 );
		}
	},

	/*
	 * When displaying an element page, this method is called to get the availability status of each element
	 */
	call_group_availability: function ()
	{
		var group_id = $(this).attr ("groupId");
		reporting.open_group_callback ( group_id, true );
	},

	/*
	 * When opening a group, this function is called to see if I have to call the open_group_callback
	 */
	on_open_group: function ()
	{
		var group_box = this;
		var group_id = $(this).parents(".group-solution-item:first").attr ("groupId");
		if ( $(group_box).is (".highlight") ) {
			reporting.open_group_callback ( group_id );
		}
	},

	/*
	 * Clicking a group, this function is called to start the ajax call to reporting portal to have the availability JSON
	 */
	open_group_callback: function ( group_id, element_page )
	{
		reporting.handling_group_id = group_id;
		$.ajax( $.extend ( Config.get_ajax_config_object (), {
			url: Config.get_availability_uri + 'groupId=' + group_id + "&rnd=" + new Date().getTime(),
			dataType: "json",
			success: reporting.handle_availability,
			error: function(data) {
				reporting.throw_error ( Config.labels.ERROR_GET_AVAILABILITY + ( element_page === true ? "" : " for group: " ) + $("[groupId="+reporting.handling_group_id+"]").find ( ".group-title").text () );
		        $(".element-list-item").addClass ("availablerror");
		    }
		}));
	},

	/*
	 * Method used to read the availability JSON object
	 */
	handle_availability: function ( data, status, xhr ) {
		if ( data.status == Config.SN_TIMEOUT ) {
			window.location.href = Config.timeout_url;
		} else {
			if ( data.status == Config.SUCCESS ) {
				// Successfull
				for ( var i=0; i<data.elementList.length; i++ ) {
					//var className = (data.elementList[i].elementStatus == "R") ? "notavailable" : "available";
					//var className = (data.elementList[i].elementStatus == "R") ? "notavailable" : "available";
					var className;
						if(data.elementList[i].elementStatus == "R"){
							className = "notavailable"; 
					} 
						if(data.elementList[i].elementStatus == "A"){
							className = "warning"; 
					} 
						if(data.elementList[i].elementStatus == "G"){
							className = "available"; 
					} 
					reporting.loop_elements_by_id ( data.elementList[i].elementId, function () {
						var item = $(this);
						item.removeClass ("notavailable").removeClass ("available").removeClass("warning");
						if ( item.is ( ".element-selected" ) ) {
							// This updates the availability percentage
							$(".last-month-percent-availability").text ( data.elementList[i].lastMonthAvailability );
							$(".current-month-percent-availability").text ( data.elementList[i].currentMonthAvailability );
						}
						item.addClass ( className );
					});
				}
			}

			if ( data.serviceNowData.responceCode == Config.SN_INCOMPLETE || data.serviceNowData.responceCode == Config.SN_ERROR) {
				// Incomplete, applying gray icon to unrecognized elements
				var notAvailableIds = data.serviceNowData.notAvailableID;
				for ( var j=0; j<notAvailableIds.length; j++) {
					reporting.loop_elements_by_id ( notAvailableIds[j], function () {
						$(this).removeClass ("notavailable").removeClass ("available").addClass ( "availablerror" );
					});
				}
			}
		}
	},

	/*
	 * Method used to display a visual error using Error class
	 */
	throw_error: function ( message, options )
	{
		var newError = Error.add ( message, options );
		newError.show ();
	},

	/*
	 * Method used to loop elements by ID with a callback for each element
	 */
	loop_elements_by_id: function ( elementId, callback )
	{
		var items = $("[elementId" + ( elementId == "*" ? "" : "=" + elementId ) + "]");
		items.each ( callback );
	},

	/*
	 * Method used to loop a set of elements defined by the "query", triggering in their scope a function passing attributes
	 */
	loop_elements: function ( query, fn, attributes )
	{
		var elements = $( query );
		if ( elements.size() > 0 )
			elements.each ( function () {
				fn.call ( this, attributes);
			} );
	},

	/*
	 * Method used to lazy_load a script if an element defined by the "query" is present and invoke a callback (fn)
	 */
	lazy_load: function ( query, script, fn )
	{
		var elements = $( query );
		if ( elements.size() > 0 ) {
			if ( typeof script == "string" )
				$.getScript( script, reporting.get_lazy_load_callback ( script, fn ) );
			else
				for( var j=0; j < script.length; j++) {
					$.getScript( script[j], reporting.get_lazy_load_callback ( script, fn ) );
				}
		}
	},

	/*
	 * Method used to take the right callback
	 */
	get_lazy_load_callback: function ( scr, fn )
	{
		// Lazy loanding has a deferred script to load, put on wait the reporting system
		this.system_loaded = false;
		this.system_components_loading.push ( scr );
		if ( typeof fn == "function")
			this.system_loaded_callbacks.push ( fn );
		return function () {
			reporting.system_components_loading = jQuery.grep( reporting.system_components_loading, function ( value ) {
				return value != scr;
			});
			if ( reporting.system_components_loading.length == 0 ) {
				for ( var i = 0; i < reporting.system_loaded_callbacks.length; i++ ) {
					reporting.system_loaded_callbacks[i]();
				}
				reporting.system_loaded = true;
			}
		};
	},
	/*
	 * Method called once the Chart class script has loaded.
	 * Used to hit the action to retrieve the  metrics JSON object and invoke reporting.new_charts_tab () to build the tabs.
	 */
	chart_tab_class_ready: function ()
	{
		if ( typeof ElementName == "string" ) {
			// ElementName is present on page, hit the configuration action
			reporting.ElementName = ElementName;

			/*
			 * This callback collector was initially used to store more callbacks using the Graphite cross-domain JSONP request.
			 * This is actually useless, but anyway working properly and ready for future improvements
			 */
			var callback_id = "FN_" + new Date().getTime() + "_crossdomain";
			reporting.callback_collector[callback_id] = null;	// Not using cross-domain trick
			var Uri = Config.get_chart_tab_uri;
			Uri += 'target=' + ElementName;

			Uri += '&' + Config.chart_starting_period + '&format=json&jsonp=reporting.callback_collector.' + callback_id;

			$.ajax ( $.extend ( Config.get_ajax_config_object (), {
				url: Uri,
				complete: function ( xhr ,callback_id) {
					/*
					 * Once the configuration is loaded, invoke new_charts to build the interface passing the JSON string and the callback identifier
					 */
					reporting.new_charts_tab (xhr);
				},
				error: function(){
					reporting.throw_error ( Config.labels.ERROR_GETTING_CHART_DATA );
				}
			}) );
		} else
			reporting.throw_error ( Config.labels.ERROR_ELMENTNAME_NOT_FOUND );
	},
	/*
	 * Method used to Generate Tab on UI.
	 */
	new_charts_tab: function ( xhr, reference_id)
	{
		// Evaluating JSON string to Javascript object
		eval ('var ChartsConfig = ' + xhr.responseText);
		var tabCounter = 0;
		var tabSelected = true;
		if ( ChartsConfig.status == Config.SUCCESS ) {

			//var data_loaded = ChartsConfig.metricData[ Config.dev ? "reporting.callback_collector.FN_1361274121766_crossdomain" : reference_id ];
			var Metrics = ChartsConfig.metricVOs;
			if ( Metrics.length > 0 ) {
				// Metrics and data present, proceed
				var max = -1;
				for ( var i=0; i<Metrics.length; i++ ) {
					var MetricConfig = Metrics[i];
					if ( MetricConfig.active === true ) {
						var chartKey = MetricConfig.key.replace('.*', '_').replace('.*', '_').replace('.', '_');

						MetricConfig.content = $('<div id="chart_' + chartKey + '"></div>');
						MetricConfig = $.extend ( Config.getDefaultMetricConfigObject (), MetricConfig );
						MetricConfig.tabElement = tab.add_tab ( MetricConfig ,i,Metrics.length);

					} else{
						console.warn ( "Metric " + MetricConfig.key + " not active, skip");
					}

					$(".tab-navigation li").each(function() {
					    var h = $(this).height();
					    max = h > max ? h : max;
					});
				}
			} else{
				reporting.throw_error ( Config.labels.ERROR_NO_METRICS_FOUND );
			}

			$(".tab-navigation li").height(max);

			tab.do_select_active ();

			if ($(".tab-navigation li.active-tab")) {
				var key =($(".tab-navigation li.active-tab").attr('key'));
				var elementType = ($(".tab-navigation li.active-tab").attr('elementType'));
 				reporting.chart_class_ready(key,elementType,$(".tab-navigation li.active-tab")[0].tabConfig);
			}
		}
	},

	/*
	 * Method called once the Chart class script has loaded.
	 * Used to hit the action to retrieve the Chart and metrics JSON object and invoke reporting.new_charts () to build the interface
	 */
	chart_class_ready: function (key,elementType,metricConfig)
	{
		if ( typeof ElementName == "string" ) {
			// ElementName is present on page, hit the configuration action
			reporting.ElementName = ElementName;

			/*
			 * This callback collector was initially used to store more callbacks using the Graphite cross-domain JSONP request.
			 * This is actually useless, but anyway working properly and ready for future improvements
			 */
			var callback_id = "FN_" + new Date().getTime() + "_crossdomain";
			reporting.callback_collector[callback_id] = null;	// Not using cross-domain trick
			var Uri = Config.get_chartdata_uri;
			Uri += 'target=' + ElementName+'&key='+key+'&elementType='+elementType;

			var flag = false;
			if(PeriodFrom != null && PeriodFrom != '' && PeriodFrom != undefined){
				Uri += '&' + PeriodFrom + '&frequency='+Frequency+'&format=json&jsonp=reporting.callback_collector.' + callback_id;
				flag = true;
			}else{
				Uri += '&' + Config.chart_starting_period + '&format=json&jsonp=reporting.callback_collector.' + callback_id;
			}

			//Add loading effect to tab container.
			$('.tab-container').append('<div class="loadingChart">'+Config.labels.LOADING+'</div>');

			$.ajax ( $.extend ( Config.get_ajax_config_object (), {
				url: Uri,
				complete: function ( xhr ) {
					/*
					 * Once the configuration is loaded, invoke new_charts to build the interface passing the JSON string and the callback identifier
					 */
					$('.loadingChart').remove();
					reporting.new_charts_generation ( xhr, "reporting.callback_collector." + callback_id, flag ,key,metricConfig);
				},
				error: function(){
					$('.loadingChart').remove();
					reporting.throw_error ( Config.labels.ERROR_GETTING_CHART_DATA );
				}
			}) );
		} else
			reporting.throw_error ( Config.labels.ERROR_ELMENTNAME_NOT_FOUND );
	},
	/*
	 * Method used to build the interface having the configuration object
	 */
	new_charts_generation: function ( xhr, reference_id, flag,key ,metricConfig)
	{
		// Evaluating JSON string to Javascript object
		eval ('var ChartsConfig = ' + xhr.responseText);

		var tabCounter = 0;
		var tabSelected = true;
		var chartKey = key.replace('.*', '_').replace('.*', '_').replace('.', '_');
		if ( ChartsConfig.status == Config.SUCCESS ) {

			var data_loaded = ChartsConfig.metricData[ Config.dev ? "reporting.callback_collector.FN_1361274121766_crossdomain" : reference_id ];
			if(data_loaded == null){
//				reporting.throw_error ( Config.labels.ERROR_GETTING_CHART_DATA );
				$("#chart_"+chartKey).html ( Config.labels.ERROR_GETTING_CHART_DATA );
			}else if ( typeof data_loaded == undefined || data_loaded.length == 0 ) {
				//reporting.throw_error ( Config.labels.ERROR_NO_CHART_DATA );
				//$(".tab-loading-message").text (Config.labels.ERROR_NO_CHART_DATA);
				$("#chart_"+chartKey).html ( Config.labels.ERROR_NO_CHART_DATA );
			} else {
				var max = -1;
				if(flag){
					$('#chart_' +chartKey).parent('div').find('.external-tool-button,.external-tool-label').remove();
					$('#chart_' +chartKey).html('');
				}

				metricConfig = $.extend ( Config.getDefaultMetricConfigObject (), metricConfig );
				var ChartData = reporting.parseGraphiteData ( data_loaded, metricConfig, flag,key);
				if ( ChartData.length > 0 ) {
					var ch = new Chart ( metricConfig );
					ch.setData ( ChartData );
					if ( ChartData.length == 1 )
						ch.set ("single");
					/*
					 * WILL BE REMOVED
					 * This is only for release 1 porpuses
					 */
					if ( ChartData.length > 1 ) {
						ch.set ( "multiple" );
						//MetricConfig.key
						if ( (key).indexOf("if-util") > -1 )
							ch.set ( "start_empty" );
					}
					/*
					 * End of WILL BE REMOVED code
					 */
					ch.draw ( metricConfig.content.attr ("id") );
				} else {
					$("#chart_"+chartKey).html ( "<div align='left'>"+Config.labels.ERROR_NO_CHART_DATA +"</div>");
				}

				$(".tab-navigation li").each(function() {
					var h = $(this).height();
					max = h > max ? h : max;
				});

				$(".tab-navigation li").height(max);
			}

			tab.do_select_active ();

		} else {
			$(".tab-loading-message").html ( Config.labels.ERROR_NO_CHART_DATA );
			$("#chart_"+chartKey).html ( Config.labels.ERROR_NO_CHART_DATA );
			reporting.throw_error ( Config.labels.ERROR_GETTING_CHART_DATA );
		}
	},

	/*
	 * Method used to parse the Graphite data retrived hitting the action
	 */
	parseGraphiteData: function ( graphiteData, chartConfigObject, flag,key)
	{
		var returning_data = [];
		var color_index = -1;

		for ( var i=0; i<graphiteData.length; i++ ) {

			// Single metric data
			var this_serie = graphiteData[i];
			var points = [];
			color_index++;
			var localKey =key;// chartConfigObject.key;
			if(localKey.indexOf('.*') > -1){
				localKey = localKey.split('.')[0];
			}
			// Graphite data has values for all metrics, filtering what I need {.key}
			if ( this_serie.target.indexOf (localKey) > -1 ) {

				if(flag){
					var val = this_serie.target.split(',')[0];
					//movingAverage(colt.firewall.colt.cms.de.gfarghl-fw002.mem-used,12)
					chartConfigObject.schema = val.split ( localKey )[1].split (".").length;
				}else{
					chartConfigObject.schema = this_serie.target.split ( localKey )[1].split (".").length;
				}

				for ( var j=0; j < this_serie.datapoints.length; j++) {
					var dataPoint = this_serie.datapoints[j];
					var dpNumber = dataPoint[0];
					if(dpNumber != null && dpNumber != 'null' && dpNumber > 0){

						var point = new Array();
						point.push ( dataPoint[1] * 1000 );
						point.push ( Math.round(dpNumber * 100) / 100 );

						points.push ( point );
					}
				}

				if(points.length > 0){

					var this_serie_model 	= Config.get_serie_model ();
					this_serie_model.name 	= localKey;

					if(flag){
						var val = this_serie.target.split(',')[0];
						if ( chartConfigObject.schema == 2 )
							this_serie_model.name = val.split ( localKey )[1].split (".")[1].toUpperCase();

						if ( chartConfigObject.schema == 3 )
							this_serie_model.name = val.split ( localKey )[1].split (".")[1].toUpperCase() + " " + val.split ( localKey )[1].split (".")[2].toUpperCase();
					}else{
						if ( chartConfigObject.schema == 2 )
							this_serie_model.name = this_serie.target.split ( localKey )[1].split (".")[1].toUpperCase();

						if ( chartConfigObject.schema == 3 )
							this_serie_model.name = this_serie.target.split ( localKey )[1].split (".")[1].toUpperCase() + " " + this_serie.target.split ( localKey )[1].split (".")[2].toUpperCase();
					}

					this_serie_model.type 	= chartConfigObject.chartType || "line";
					this_serie_model.color 	= typeof chartConfigObject.colors == "string" ? chartConfigObject.colors : chartConfigObject.colors[color_index];
					this_serie_model.data 	= points;

					//Enabling marker to show ghost points on Chart.
					this_serie_model.marker.enabled = (points.length <= 10);

					returning_data.push ( this_serie_model );
				}
			} else
				color_index--;
		}
		return returning_data;
	}

};

/*
 * Object used to handle groups page
 */
var expanding_box = {
	__maximumWidth : 215,
	__minimumHeight : 135,
	__zindex: 100,
	__maximumElementsInWindow: 15,
	__maximumHeight: 390,
	__collector: [],
	__externalUIStarted: false,
	__toggleAllAction: "open",

	init_box: function ( callback )
	{
		this.__expandStatus 		= false;
		this.__extendStatus 		= false;
		this.__extendable 			= false;
		this.__restoreStatus		= false;
		this.restrictCallforOnce 	= false;
		this.BoxElement 			= $(this).find (".expanding-box");
		this.__elements 			= $(this).find (".element-list-item");
		this.__elementsCount 		= this.__elements.size ();

		this.__elementsFirsrLevel	=  $(this).find (".groupTitleElement");
		this.____elementsFirsrLevelCount = this.__elementsFirsrLevel.length;

		this.__autoOpen				= $(this).find (".expanding-box").hasClass ("highlight");
		this.BoxElement 			= $(this).find (".expanding-box");
		this.BoxDropdown 			= $(this).find (".expanding-box-dropdown");
		this.Scroller 				= $(this).find (".scrollbar-container");
		this.Scrollbar				= this.Scroller.find (".scrollbar");
		this.Scrollbar_h				= this.Scroller.find (".scrollbar_h");
		this.Viewport 				= $(this).find (".viewport");
		this.Overview 				= $(this).find (".overview");
		this.ElementsCounter 		= $(this).find (".group-elements-count:first");
		this.ToggleButtons 			= $(this).find (".expanding-box-handler, .expanding-box-action");
		this.ToggleButtonss 			= $(this).find (".expanding-box-action");
		this.collapsElementGroup 	= $(this).find (".groupTitleElement");
		this.FooterButton 			= $(this).find (".expanding-box-action:first");
		this.ExtendButton 			= $(this).find (".extend-box-action");
		this.elementWrapper			= $(this).find (".elementWrapper");
		this.subgroupsInGroup		= $(this).find (".elementWrapper ul");
		this.subgroupsInGroupLength		= this.subgroupsInGroup.length;
		this.GroupHeaderLink		= $(this).find('.elementWrapper a');
		this.visibleElementinGroup	= $(this).find (".elementWrapper li:visible");
		this.visibleElementCountsinGroup	= this.visibleElementinGroup.size();
		this.GroupId 				= $(this).attr ("groupId");

		this.onOpenAllCallback = function ( action ) {
			if ( ( action == "open" && this.__expandStatus === false && this.__extendStatus === false ) ||
				 ( action == "close" && this.__expandStatus === true && this.__extendStatus === true) ){

				this.Viewport.find('.elementWrapper ul').css('display','block');									
				// for open all groups accept the group is allready opened with subgroup collapsed
				expanding_box.on_click.call (this, 'all');
			}else if(
					 ( action == "open" && this.__expandStatus === true && this.__extendStatus === false  ) ||
					 ( action == "open" && this.__expandStatus === true && this.__extendStatus === true  ) || 
					 ( action == "close" && this.__expandStatus === false && this.__extendStatus === true ) || 
					 ( action == "close" && this.__expandStatus === true && this.__extendStatus === true )
					)
			{
				if ( this.subgroupsInGroupLength != 0 && this.__restoreStatus == true) {
					this.Viewport.find('.elementWrapper ul').css('display','block');
					expanding_box.on_click.call (this, 'resize'); // only for groups are allready opened with subgroup collapsed
				}

			} else {
				expanding_box.on_click.call (this, 'all'); // for close all groups accept the group is allready opened with subgroup collapsed
				this.Viewport.find('.elementWrapper ul').css('display','none');
			}
		},

		this.onExtendAllCallback = function ( action ) {
			if ( ( action == "extend" && this.__extendStatus === false ) || (action == "restore" && this.__extendStatus === true) ){

				this.ExtendButton.click ();

			}else if(( action == "extend" && this.__expandStatus === true && this.__extendStatus === true ) || 
				  (action == "restore" && this.__expandStatus === false && this.__extendStatus === false) ){
				// blank
			}else {
				this.ExtendButton.click ();
			}
		},
		
		this.refreshUI = function (senderCnt) {
			if ( expanding_box.__collector.length == expanding_box.get_expanded_items ().length ) 	// All boxes has been opened
				$("[name=toggle-all-groups]").text ( Config.labels.CLOSE_ALL );
			else
				$("[name=toggle-all-groups]").text ( Config.labels.OPEN_ALL );

			if ( expanding_box.get_extendable_items (true).length == 0 ) {
				$(".btn-extend-all").hide ();
			} else {
				if ( this.__extendable == true && this.__expandStatus == true )
					$(".btn-extend-all").show ();
					var txtExtend;

					if(expanding_box.get_extended_items ( true ).length == expanding_box.get_extendable_items ( true ).length){
						if( senderCnt == '4') {
							$(".btn-extend-all").addClass('btn-extend-all-up');
							txtExtend = Config.labels.RESTORE_ALL;
							$(".btn-extend-all").text(txtExtend);
						}
					}else{
						if(senderCnt == '4') {
							txtExtend = Config.labels.EXPAND_ALL;
							$(".btn-extend-all").removeClass('btn-extend-all-up');
							$(".btn-extend-all").text(txtExtend);
						}
					}

//				if(senderCnt == '4'){
					//if($(".btn-extend-all").hasClass('btn-extend-all-up')) {
//						$(".btn-extend-all").removeClass('btn-extend-all-up');
//					}else if (expanding_box.get_extended_items ( true ).length != 0){
////						$(".btn-extend-all").addClass('btn-extend-all-up');
//					}else{
//						$(".btn-extend-all").addClass('btn-extend-all-up');
//					}
//				}

			}
		},

		expanding_box.init_box_ui.call (this);
		if ( expanding_box.__externalUIStarted === false ){
			expanding_box.init_external_ui ();			
		}

		expanding_box.__collector.push ( this );

	},

	check_autoOpen: function (subgroupid)
	{
		expanding_box.broadcast ( function () {
			if ( this.__autoOpen ) {

				this.elementWrapper.find('li li[elementid="'+subgroupid+'"]').parents('ul').css('display','block');
				this.ToggleButtonss.click ();
				/*if(this.elementWrapper.find('li ul[elementid="'+subgroupid+'"]').parents('ul').length) {
					//					
				}*/
				this.Viewport.height ( expanding_box.__maximumHeight );
			}
		});
	},

	broadcast: function ( callback, params )
	{
		for ( var i=0; i<this.__collector.length; i++ ) {
			callback.call ( this.__collector[i], params );
		}
	},

	init_external_ui: function ()
	{
		$(".btn-extend-all").click ( function () {
			$(this).attr ("href", null);
			var action = ( expanding_box.get_extended_items (true).length == expanding_box.get_extendable_items (true).length ) ? "restore" : "extend";
//			alert('1>' + action);
			expanding_box.broadcast ( function () {
				this.onExtendAllCallback ( action );
			});
		});
		$("[name=toggle-all-groups]").click ( function () {
			$(this).attr ("href", null);
			var action = ( expanding_box.__collector.length == expanding_box.get_expanded_items ().length ) ? "close" : "open";
			expanding_box.broadcast ( function () {
				this.onOpenAllCallback ( action );
			} );
		});
		expanding_box.__externalUIStarted = true;
	},

	init_box_ui: function ()
	{
		var GroupBox = this;
		// Applying Events
		this.ToggleButtons.removeAttr ("href").on ( "click", function (e) {
//			e.preventDefault ();
			expanding_box.on_click.call ( GroupBox );
		} );
	},
	
	on_click: function (sender)
	{
		var isChrome = window.chrome;
		var _this = this;
		var elementInWindowNew;
		var elementInWindow = null;
		this.__expandStatus = this.__expandStatus == true ? false : true;

		_this.GroupHeaderLink.bind('click', function (e){
			setTimeout(function () {
			expanding_box.open_sub_groups(_this);
			},300);
		}); // open subgroup code end here

		var totalEle = _this.____elementsFirsrLevelCount + _this.__elementsCount;
		//open subgroup code start here
		if(_this.____elementsFirsrLevelCount < 15) {
			elementInWindowNew = _this.____elementsFirsrLevelCount;	
		} else {
			elementInWindowNew = _this.__elementsCount;	
		}

		if ( totalEle > expanding_box.__maximumElementsInWindow  && sender != undefined) {
			expanding_box.init_extend_button.call ( _this );
		}

		if ( this.__elementsCount > 15 && sender == undefined) { //open single group
			// If elements are more than what can be windowed start extend function
			this.Viewport.height ( expanding_box.__maximumHeight );
			this.Overview.css ("position", "absolute");
			if(_this.__expandStatus == true && _this.restrictCallforOnce == false) {
				_this.restrictCallforOnce = true;
			}
	
			_this.__restoreStatus = true;
			_this.__extendable = true;
	
			if(_this.____elementsFirsrLevelCount == 0){
				expanding_box.init_extend_button.call ( _this );
			}

		}else if (this.__elementsCount < 15 && sender == undefined) {
			setTimeout ( function () { //delay given for complete open group sliding	
				_this.Scrollbar_h.hide ();
				_this.Viewport.height (_this.elementWrapper.height() );
				_this.Overview.css ("position", "absolute");
	//			_this.ExtendButton.hide();
	//			$(".btn-extend-all").hide ();
				_this.Scrollbar.hide ();
				_this.__extendable = false;
				_this.__restoreStatus = true;
			},150);
		} else if (sender == 'all' && totalEle < 10) {//Open All groups
			setTimeout ( function () {
				_this.Viewport.height (_this.elementWrapper.height());
			});
			_this.Overview.css ("position", "absolute");	
		}/* 
		else if (this.__elementsCount > 15 && _this.____elementsFirsrLevelCount < 15 && sender != 'all') {
						setTimeout ( function () { //delay given for complete open group sliding
							if(_this.elementWrapper.height() < 390){
							_this.Viewport.animate({
							height:(_this.elementWrapper.height() ) });
							_this.Scrollbar.hide ();	
							}
							_this.ExtendButton.hide();
							if(expanding_box.get_expanded_items ().length <= 0) {
							$(".btn-extend-all").hide ();
						} 
						_this.Overview.css ("position", "absolute");
						_this.__extendable = false;
						_this.__extendStatus = false;
						},'fast');
		}*/
		else if (sender == 'all' && totalEle >= 10) {//Open All groups
			_this.Viewport.height ( expanding_box.__maximumHeight );
			_this.Overview.css ("position", "absolute");
			_this.Scrollbar.show ();
			/*
			 if(_this.restrictCallforOnce == false){
				expanding_box.init_extend_button.call( _this );
			} else {
				// expanding_box.init_extend_button.call( _this );
				_this.ExtendButton.attr ("href", null).show ();
			}
	 		*/
			setTimeout ( function () {
				if ($(_this).find('ul ul ul:visible').length > 0 ){
					_this.Scroller.tinyscrollbar_h ();
					_this.Scroller.tinyscrollbar_update_h ();
					_this.Scrollbar_h.show ();
				} else {
					_this.Scrollbar_h.hide ();
				}
			},500);

			_this.__restoreStatus = true;
			_this.restrictCallforOnce = true;
			_this.__extendable = true;

		} else if(sender == 'resize' && _this.__elementsCount > 7 ) {//Resize open group to maximumm allowed size
			_this.__expandStatus = true;
			var tempHeight = expanding_box.__maximumHeight;
	//		expanding_box.init_extend_button.call ( _this );
			_this.Viewport.animate({
				height:	tempHeight
			});
			setTimeout ( function () {
				_this.Scroller.tinyscrollbar_update ();
				_this.Scrollbar.show ();
	//			if (_this.Viewport.find('.elementWrapper ul>ul>ul:visible').length > 0 ) {  // Horizontal scroll will apear when third level subgroup is opened
				if ($(_this).find('ul ul ul:visible').length > 0 ){
					_this.Scroller.tinyscrollbar_h ();
					_this.Scroller.tinyscrollbar_update_h ();
					_this.Scrollbar_h.show ();
				} else {
					_this.Scrollbar_h.hide ();
				}

				_this.__expandStatus = true;
				_this.__restoreStatus = true;
				_this.__extendable = true;
			},500);

			_this.__extendable = true;
	//		_this.ExtendButton.show();
			_this.Overview.css ("position", "absolute");

		}else if(sender == 'resize' && _this.__elementsCount <= 7 ) {
			_this.__expandStatus = true;
			_this.__extendable = false;
			_this.Viewport.height (_this.elementWrapper.height());
			_this.Overview.css ("position", "absolute");
		} else {
			if (_this.__elementsCount > 15) {
				// blank
			} else {
				_this.Scrollbar_h.hide ();		
			}
		}

		if (sender != 'resize') { // slide toggle will escaped from loop when group is allready open

			this.BoxDropdown.slideToggle (function () {
				if (!_this.__expandStatus && _this.__extendStatus) {
					if ( _this.__extendStatus == false ) {
						_this.BoxElement.addClass ("extended");
						_this.Scrollbar.hide ();
					} else {
						_this.BoxElement.removeClass ("extended");
						_this.Scrollbar.show ();
					}

					_this.Scroller.tinyscrollbar_update ();
						//_this.refreshUI ('6');
				}

				if (_this.__expandStatus == false) {
	//				_this.ExtendButton.hide();
	//				_this.Viewport.height ('auto');
					_this.elementWrapper.find('ul').css('display','none');
				} else {
					if (this.__elementsCount > 12){
	//					_this.ExtendButton.show();
					}
				}

				( _this.__expandStatus == true ) ? _this.BoxElement.addClass ("highlight") : _this.BoxElement.removeClass ("highlight");
				_this.Scroller.tinyscrollbar ();
	
				// Horizontal scroll will apear when third level of subgroup is open
				if (_this.Viewport.find('.elementWrapper ul>ul:visible').length > 0 ) {
					_this.Scroller.tinyscrollbar_h ();
					_this.Scroller.tinyscrollbar_update_h ();
					_this.Scrollbar_h.show ();
				} else {
					_this.Scrollbar_h.hide ();		
				}
			});
		}

		if ( this.__expandStatus == true ) {	// If I'm expanding, is better to add the class from the beginning
			this.BoxElement.addClass ("highlight");
			this.FooterButton.text ( Config.labels.HIDE_ELEMENTS );
		} else {
			this.BoxElement.removeClass ("highlight");
			this.FooterButton.text ( Config.labels.SHOW_ELEMENTS );
		}

		// Getting availability status if opening a Group box
		if ( this.__expandStatus === true )
			$.ajax( $.extend ( Config.ajax_config_object, {
				url: Config.get_availability_uri + 'groupId=' + _this.GroupId + "&rnd=" + new Date().getTime(),
				dataType: "json",
				success: reporting.handle_availability,
				error: function(data) {
					reporting.throw_error ( Config.labels.ERROR_GET_AVAILABILITY + " for group: " + $("[groupId="+_this.GroupId+"]:first").find ( ".group-title").text () );
			        $(".element-list-item").addClass ("available");
					$('.elements-list li ul').parent('li').removeClass('availablerror').addClass('groupTitleElement');
					$('.elements-list ul li:first-child, .elementWrapper ul li:first-child').prepend('<i class="showLink"></i>').before('');
			    }
			}));

		this.refreshUI ('1');
	},//END on_click() function.

	open_sub_groups: function (_this) {
		var isChrome = window.chrome;

		if (_this.elementWrapper.height() > 390 && _this.__restoreStatus == false && _this.restrictCallforOnce == false && _this.__extendable == false) {			
			_this.Viewport.height ( expanding_box.__maximumHeight );
			expanding_box.init_extend_button.call ( _this, 'openingGroup');
			_this.Overview.css ("position", "absolute");
			_this.__restoreStatus = _this.__restoreStatus == false ? true : false;
			_this.Scroller.tinyscrollbar ();
			_this.Scroller.tinyscrollbar_update ();
			_this.Scrollbar.show ();
			_this.__extendable = true;
			_this.__expandStatus = true;
			_this.refreshUI ('2');
		} else if (_this.elementWrapper.height() > 390 && _this.__extendStatus==false ){
			expanding_box.init_extend_button.call ( _this, 'openingGroup');
			_this.Viewport.height ( expanding_box.__maximumHeight );
			_this.Overview.css ("position", "absolute");
			_this.Scroller.tinyscrollbar ();
			_this.Scroller.tinyscrollbar_update ();
			_this.Scrollbar.show ();
//			_this.ExtendButton.show();
			_this.__expandStatus = true;
			_this.__extendable = true;
			_this.refreshUI ('3');
		}else if (_this.elementWrapper.height() > 390 && _this.__extendStatus==true ){
			expanding_box.init_extend_button.call ( _this, 'openingGroup');
			_this.Viewport.height (_this.elementWrapper.height());

		}else if (_this.elementWrapper.height() < 390) {
			_this.BoxElement.removeClass ("extended");
			_this.Scrollbar.hide ();
			_this.Viewport.height (_this.elementWrapper.height());
			_this.Overview.css ("top", "0");
//			_this.ExtendButton.hide();
			_this.Scroller.tinyscrollbar_update ();
//			if(expanding_box.get_expanded_items ().length == 1) {
//				$(".btn-extend-all").hide ();
//			}
			_this.__extendable = false;

		}

		if ($(_this).find('ul ul ul:visible').length > 0 ){
			_this.Scroller.tinyscrollbar_h({ axis: 'x'});
			_this.Scroller.tinyscrollbar_update_h ();
			_this.Scrollbar_h.show ();
		}else{	
			_this.Scroller.tinyscrollbar_h({ axis: 'x'});
			_this.Scroller.tinyscrollbar_update_h ();
			_this.Scrollbar_h.hide ();
		}

	},//END open_sub_groups() function.

	get_expanded_items: function ()
	{
		var ret = [];
		for ( var i=0; i<this.__collector.length; i++ ) {
			if ( this.__collector[i].__expandStatus == true )
				ret.push (this.__collector[i]);
		}
		return ret;
	},

	get_extended_items: function ( visibility_filter )
	{
		var ret = [];
		for ( var i=0; i<this.__collector.length; i++ ) {
			if ( expanding_box.__collector[i].__extendStatus == true  && ( visibility_filter != true || this.__collector[i].__extendStatus == true ))
				ret.push (expanding_box.__collector[i]);
		}
		return ret;
	},

	get_extendable_items: function ( visibility_filter )
	{
		var ret = [];
		for ( var i=0; i<this.__collector.length; i++ ) {
			if ( this.__collector[i].__extendable === true && ( visibility_filter != true || this.__collector[i].__expandStatus == true ) )
				ret.push (this.__collector[i]);
		}
		return ret;
	},

	init_extend_button: function ()
	{
		this.__extendable = true;
		var _this = this;
		this.ToggleButtons.bind ("click", function () {
			if ( _this.__expandStatus == false )
				_this.ExtendButton.hide ();
			else
				_this.ExtendButton.show ();
		});

		this.ExtendButton.attr ("href", null).show ().on ( "click", function () {			
			if (_this.__extendStatus == false && _this.__expandStatus == true ) {
				_this.Viewport.height ( _this.Viewport.find (".overview").height ());
				_this.BoxElement.addClass ("extended");
				_this.Viewport.find (".overview").css('position','absolute');
				_this.Scrollbar.hide ();
				_this.Viewport.find (".overview").css('top', '0');

			} else if (_this.__extendStatus == true && _this.__expandStatus == true && _this.Viewport.height () >= 390){

				_this.Viewport.height (expanding_box.__maximumHeight);
				_this.BoxElement.removeClass ("extended");
				_this.Scrollbar.show ();
				_this.Viewport.find (".overview").css('position','absolute');
			}

			_this.Scroller.tinyscrollbar_update ();

			if(_this.elementWrapper.height() >= 390 ) {
				_this.__extendStatus = (_this.__extendStatus === false) ? true : false;
				//if(_this.__extendStatus == false)
				_this.__extendable = true;
			} else {
				_this.__extendStatus=false;
//			_this.__expandStatus=false;
			}

			_this.refreshUI ('4');
		});
	}
};

/*
 * Object used in element page to build metrics TAB
 */
var tab = {

	nav_query: 		".tab-navigation",
	nav_item_query:	"li",
	cont_query: 	".tab-content",
	pane_query: 	".tab-pane",
	act_class: 		"active-tab",
	act_query: 		"li.active-tab",
	act_link_query:	"a",
	act_dd_query:	"b",
	loading_msg: 	".tab-loading-message",
	dd_options:		"a.sub-tabs",
	conf: 			false,
	__active: 		false,

	get_conf: function () {
		return {
			container: 		$(this),
			tabs: 			$(this).find ( tab.nav_query ),
			activeTab: 		$(this).find ( tab.nav_query + " " + tab.act_query ),
			activeTabIndex:	$(this).find ( tab.nav_query + " " + tab.act_query ).size () > 0 ? $(this).find ( tab.nav_query + " " + tab.act_query + " " + tab.act_link_query ).attr ("href").replace("#", "") : 0,
			content: 		$(this).find ( tab.cont_query ),
			loadingMessage:	$(this).find ( tab.loading_msg )
		};
	},

	init_tab: function () {
		var conf = tab.get_conf.call ( this );
		tab.Conf = conf;
		conf.tabs.find ( tab.nav_item_query ).unbind( "click").bind ( "click", function () {
			tab.on_click_tab.call ( this, conf );
		} );
		conf.tabs.find ( tab.act_dd_query ).unbind( "click").bind ( "click", function (e) {
			e.stopPropagation();
			tab.on_click_tab_dd_ico.call ( this, conf );
		} );
		conf.tabs.find ( tab.dd_options ).unbind( "click").bind ( "click", function () {
			tab.on_click_dd_options.call ( this, conf );
		} );

		this.conf = conf;
		tab.on_open_content ( conf );
	},

	do_select_active: function ()
	{
		if ( this.__active === false ) {
			var active = $(this.act_query ).size () > 0 ? $(this.act_query ) : $(this.nav_query ).find ( this.nav_item_query + ":not(.tab-disabled):first");
			tab.on_click_tab.call ( active, tab.Conf);
			this.__active = true;
		}
	},

	disable: function ( MetricConf )
	{
//		$( MetricConf.tabElement ).addClass ("tab-disabled").find ("a").attr ("title", Config.labels.ERROR_NO_CHART_DATA );
	},

	add_message: function ( message ) {
		if ( $(".tab-loading-message").size() > 0 )
			$(".tab-loading-message").html ( message );
	},

	reset_tabs: function () {
		$( this.nav_query ).html ("");
		$( this.cont_query ).html ("");
	},

	add_tab: function ( obj, loop, MetricsLength ) {

		obj.content.html ("");
		var newTab = "";

		if (MetricsLength <= 4){
			newTab = $('<li key="'+obj.key+'" elementType="'+obj.elementType+'" displaySequence="'+obj.displaySequence+'"><a href="#3">' + obj.name + '</a></li>');
		}else {
			newTab = $('<li key="'+obj.key+'" elementType="'+obj.elementType+'" displaySequence="'+obj.displaySequence+'"><a href="#3">' + obj.name + '</a><b></b></li>');
		}

		if (loop <= 3){
			$( this.nav_query ).append ( newTab );
			$(".tab-loading-message").remove ();
		} else {
    	   $('.otherTabs_dd .overview ul').append(newTab);
		}

		var newContent = $( this.cont_query ).append ( $('<div class="tab-pane"></div>').append ( obj.content ) );
		tab.init_tab.call ( $(".tab-container") );

		var currentTabObject = $('li[key="' + obj.key +  '"]').get(0);
		var tabConfig = {tabConfig:obj};
		$.extend(newContent, tabConfig);
		$.extend(currentTabObject, tabConfig);

		var contentHeight = $('.scrollbar1 .viewport ul').height();
		if(contentHeight > 400){
			$('.scrollbar1 .viewport').height(360);
		}else {
			$('.scrollbar1 .viewport').height(contentHeight);
		}

		$('.scrollbar1').tinyscrollbar_update();
		return newTab;
	},

	on_click_tab: function ( conf ) {
		if ( !$(this).is (".tab-disabled")) {
			$(conf.activeTab).removeClass ( tab.act_class );
			conf.activeTab = $(this).addClass ( tab.act_class );
			conf.activeTabIndex = $( conf.container ).find ( tab.nav_query + " " + tab.nav_item_query ).index ( $(this) );

			tab.on_open_content ( conf );
		}
	},

	on_click_tab_dd_ico: function (conf) {
		var clickedTabIco = $(this).parent('li').index();
		var dropDownLeft = clickedTabIco*175;
		var tabHeight = $('.tab-navigation').height();

		$('.otherTabs_dd').css({ "left":dropDownLeft,'top':tabHeight });	

		if($(this).hasClass("active_dd")){
			$('div.otherTabs_dd').css({ "z-index":"-1",'top':'-400px' });			
			$('.tab-navigation b').removeClass('active_dd');
		}else{
			$('.tab-navigation b').removeClass('active_dd');
			$('.otherTabs_dd').css('z-index','105');
			$(this).addClass('active_dd');
		}
	},

	on_click_dd_options: function (conf){

	},

	on_open_content: function ( conf ) {
		$(conf.content).find( tab.pane_query ).show ();
		$(conf.content).find( tab.pane_query + ":eq(" + (conf.activeTabIndex) + ")").show ();
	}
};

/*
 * Object used to generate UI errors
 */
var Error = {

	collector: [],
	options:
	{
		html: '<div class="internal-error"><span class="internal-error-message"></span><small>Click to close</small></div>',
		message_query: ".internal-error-message",
		container_query: '.nav.secondary-nav',
		type: "inline"
	},

	add: function ( message, option )
	{
		var thisOption = $.extend ( {}, Error.options );
		if ( arguments.length > 0 )
			$.extend ( thisOption, arguments[1] );
		var newError = $( thisOption.html ).css ("z-idnex", Error.collector * 3 );
		newError.find ( thisOption.message_query ).html ( message );
		newError.click ( Error.remove );

		Error.collector.push ( {
			element: 	newError,
			options: 	thisOption,
			status: 	"hidden",
			message: 	message
		});

		return {
			ref: Error.collector.length,
			options: thisOption,
			show: function () {
				Error.collector[this.ref-1].status = "shown";
				if ( $(this.options.container_query).find ( ".internal-error" ).size () > 0 )
					$(this.options.container_query).find ( ".internal-error-message" ).append ( "<br />" + Error.collector[this.ref-1].message );
				else
					$(this.options.container_query).append ( Error.collector[this.ref-1].element );
			}
		}
	},

	remove: function ()
	{
		// Error element scope
		$(this).remove ();
	}

};

var Jsp = {

		/* Funtion to be called on Quick Search button click.*/
		fnQuickSearch: function (param) {

			MaxZoom = 300000;
			Frequency = "5min";

			if(param == 'hour'){
				param = 'from=-1hour&until=now';
				DataPoints = 1 * 60 / 5;

				XAxisMin  = today.getTime() - (60 * 1000 * 60);
				XAxisMax  = today.getTime();
			}else if(param == 'day'){
				param = 'from=-1d&until=now';

				XAxisMin  = today.getTime() - (60 * 1000 * 60 * 24);
				XAxisMax  = today.getTime();
			}else if(param == 'week'){
				param = 'from=-7d&until=now';

				XAxisMin  = today.getTime() - (60 * 1000 * 60 * 24 * 7);
				XAxisMax  = today.getTime();
			}else if(param == 'month'){
				param = 'from=-1month&until=now';
				var day = today.getDate();

				XAxisMin  = new Date(year, month -1 , day).getTime();
				XAxisMax  = new Date(year, month, day).getTime();
			}else{
				var frm = 'from=-1y';
				var untl = '&until=now';
				param = frm + untl;

				MaxZoom = 86400000; // 1 day.

				XAxisMin  = new Date(year-1, month-1, today.getDate()).getTime();
				XAxisMax  = today.getTime();
				Frequency = "1day";
			}
			PeriodFrom = param;

			Jsp.fnClearChartSection();

			var key =($(".tab-navigation li.active-tab").attr('key'));
			var elementType = ($(".tab-navigation li.active-tab").attr('elementType'));
			reporting.chart_class_ready(key,elementType,$(".tab-navigation li.active-tab")[0].tabConfig);
//			reporting.chart_class_ready ();
		},

		/* Function to View Graph for selected date difference. */
		fnViewGraph: function (){
			var date1 = $('#startDatePicker').val();
			var date2 = $('#endDatePicker').val();
			Frequency = "5min";

			if(date1.length <= 1 || date2.length <= 1){
				alert('Please select a date range to view graphs.');
				return;
			}

			var sDate = Jsp.fnFormatDate(date1);
			var sDateTime = $('#startDateTime').val();

			var eDate = Jsp.fnFormatDate(date2);
			var eDateTime = $('#endDateTime').val();

			if(sDateTime == '00:00' && eDateTime == '00:00'){
				PeriodFrom = "from="+sDate + "&until=" + eDate;
			}else{
				PeriodFrom = "from="+sDateTime + "_" + sDate + "&until=" + eDateTime + "_" + eDate;
			}

			XAxisMin  = Jsp.fnGetTimeOfDate(date1, sDateTime);
			XAxisMax  = Jsp.fnGetTimeOfDate(date2, eDateTime);

			var days = Jsp.fnGetDiffInDays(date1, date2, sDateTime, eDateTime);

			if(days <= 60 && days != 0){
				MaxZoom = 300000; // 5 mins
			}else if(days > 60 && days <= 120){
				MaxZoom = 1000000; // 15 mins
				Frequency = "15min";
			}else if(days > 120 && days <= 180){
				MaxZoom = 3600000; // 1 hour
				Frequency = "1hour";
			}else if(days > 180 && days <= 1460){
				MaxZoom = 86400000; // 1 day.
				Frequency = "1day";
			}

			Jsp.fnClearChartSection();
			// Ajax call to render chart.
			var key =($(".tab-navigation li.active-tab").attr('key'));
			var elementType = ($(".tab-navigation li.active-tab").attr('elementType'));
			reporting.chart_class_ready(key,elementType,$(".tab-navigation li.active-tab")[0].tabConfig);
		},

		//Function to clear out the chart section before loading search generated chart on it.
		fnClearChartSection: function(){
			$('#chart_container').children('.tab-pane').each(function () {
				$(this).find('.external-tool-button,.external-tool-label').remove();
				$(this).children('div').removeAttr('data-highcharts-chart');
				$(this).children('div').html('');
			});
		},

		/* Function to format date in yyyyMMdd.*/
		fnFormatDate: function (date){
			if(date != null){
				var values = date.split("/");
//				date = values[2] + values[1] + values[0] ;
				date = values[2] + values[0] + values[1] ; 
			}
			return date;
		},
		
		/* Function to get time from date selected.*/
		fnGetTimeOfDate: function (date, time){
			var values = date.split("/");
			var timeValues = time.split(":");
			date = values[2] + values[1] + values[0] ;
			//return new Date(values[2], values[1] -1, values[0], timeValues[0]).getTime();
			//new Date(year, month, day, hours, minutes, seconds, milliseconds)
			return new Date(values[2], values[0] -1, values[1], timeValues[0]).getTime();
		},

		/* Function to calculate date difference in days. */
		fnGetDiffInDays:function (date1, date2, sDateTime, eDateTime) {
			var timeValues = sDateTime.split(":");
			var values = date1.split("/");
			//new Date(year, month, day, hours, minutes, seconds, milliseconds)
			var d1 = new Date(values[2] , values[0]-1 , values[1], timeValues[0], timeValues[1]);

			timeValues = eDateTime.split(":");
			values = date2.split("/");
			var d2 = new Date(values[2] , values[0]-1 , values[1], timeValues[0], timeValues[1]);

	        var t2 = d2.getTime();
	        var t1 = d1.getTime();

	        return parseInt((t2-t1)/(24*3600*1000));
	    },

	    fnJspOnLoad: function() {
			var months = [ 'Jan', 'Feb', 'March', 'April', 'May', 'June', 'July',
					'Aug', 'Sept', 'Oct', 'Nov', 'Dec' ];
			var date = new Date();

			var today = date.getDate();
			var str = today.toString();

			if (str.length == 1 && str.indexOf("1") == 0) {
				today = today + "st";
			} else if (str.length == 1 && str.indexOf("2") == 0) {
				today = "1st - " + today + "nd";
			} else if (str.length == 1 && str.indexOf("3") == 0) {
				today = "1st - " + today + "rd";
			} else if (str.lastIndexOf("1") == 1 && str.indexOf("11") != 0) {
				today = "1st - " + today + "st";
			} else if (str.lastIndexOf("2") == 1 && str.indexOf("12") != 0) {
				today = "1st - " + today + "nd";
			} else if (str.lastIndexOf("3") == 1 && str.indexOf("13") != 0) {
				today = "1st - " + today + "rd";
			} else {
				today = "1st - " + today + "th";
			}

			var month = date.getMonth();
			var lastMonth = month - 1;
			if (lastMonth < 0) {
				lastMonth = 11;
			}

			$('#lastMonth').html(' ' + months[lastMonth]
					+ ' ' + date.getFullYear());
			$('#currentMonth').html(' ' + months[month] + ' '
					+ today);
		}
};


var opt = false;
$(document).ready(function (){		
	$(".elementWrapper").accordion({
		accordion:false,speed: 150,closedSign:'',openedSign:''
	});
	$('.elementWrapper ul>a').css('color','#009ee5');
	$('.elements-list ul li:first-child, .elementWrapper ul li:first-child').prepend('<i class="showLink"></i>').before('');
});	