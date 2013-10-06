/*
 * Configuration object
 */
var Config = {

	/*
	 * Constants
	 */
	ASSETS_FOLDER: "/public/assets/",

	SUCCESS: 		"ok",
	ERROR: 			"ko",
	SN_SUCCESS: 	"OK",
	SN_INCOMPLETE: 	"OK - INCOMPLETE",
	SN_ERROR:	 	"ERROR",
	SN_TIMEOUT:	 	"session_timeout",

	METRIC_SINGLE_LEVEL: 	"lev1",
	METRIC_SINGLE_SUBLEVEL: "lev2",
	METRIC_MULTI_SUBLEVEL: 	"lev3",

	CHART_TIME_SCOPE: 7 * 24 * 60 * 60 * 1000,

	/* Show console logs and prevent old browser to get errors from missing console
	 */
	show_log: true,	 // turn this to false if you want console.log () not to print anything
	dev: window.location.href.indexOf ("http://reporting/") > -1,	// This is only for my local environment, change the indexOf value if you want to override some settings
	timeout_url: _CONTEXT_ROOT + "/SessionTimeOut.action",

	/* get_availability_uri:
	 * Reporting portal webservice URI to retrieve availability status from Service Now
	 */
	get_availability_uri: _CONTEXT_ROOT + "/fetchServiceStatus.action?",

	/* get_chartdata_uri:
	 * Graphite server URI to retrieve charts data
	 */
	//get_chartdata_uri: "http://10.144.139.182/render?",		// OLD ENVIRONMENT
	get_chartdata_uri: _CONTEXT_ROOT + "/fetchChartData.action?",	// NEW DEV ENVIRONMENT
	get_chart_tab_uri : _CONTEXT_ROOT + "/fetchTabData.action?",

	/* chart_starting_period:
	 * Chart period selected when the charts are plotted
	  */
	//chart_starting_period: "from=" + new Date().getTime() - ( 7 * 24 * 60 * 60 * 1000) + "&until=now",
	chart_starting_period: "from=-7d&until=now",

	/*
	 * get_chart_csv_dwonload_uri
	 * CSV download action url.
	 */
	get_chart_csv_dwonload_uri: _CONTEXT_ROOT + "/fetchCsvChartData.action?",

	/* getSerieModel
	 * This is used to build the first Chart configuration object
	 */
	get_serie_model: function () {
		return {
			name: "",
			color: "",
			type: "",
			marker: {
				enabled: false
			},
			data: []
		}
	},

	/* chart_config_obj
	 * Used as config base to plot chart
	 */
	chart_config_obj: {
	    chart: {
	        renderTo: "container",
	        zoomType: "x",
			width: 679,
			marginTop: 20,
			 resetZoomButton: {
                position: {
                    x: -10,
                    y: 0
                },
                relativeTo: 'chart'
           },
           events: {
           	selection: function ( event ) {
           		if ( event.type == "selection" && event.resetSelection != true )
           			$(".tab-pane:visible .external-tool-label").hide ();
           		else if ( event.resetSelection == true )
           			$(".tab-pane:visible .external-tool-label").show ();

           	}
           }
	    },
	    title: {
			align: 'center',
			verticalAlign: "top",
			style: {
				fontSize: "16px"
			},
			useHTML: false,
			text: ''
		},
	    subtitle: {
	    	text: "",
	    	verticalAlign: "top",
	    	align: "center"
	    },
	    xAxis: [{
	        dateTimeLabelFormats: {
	        	day: '%e %b %y'
	        },
	        type: "datetime",
	        labels : { y : 20, rotation: -20, align: 'right' }
	    }],
	    yAxis: [{ // Primary yAxis
	        title: {
	            text: "Default value",
	            style: {
					color: "#009de0"
				}
	        },
			offset: 0,
			alternateGridColor: "#fdfdfd"
	    }],
	    tooltip: {
	    	valueDecimals: 2,
	    	formatter: false,
	    	valueSuffix: "",
	        useHTML: true,
	        shared: false,
	        style: {
	        	width: 300
	        },
	        xDateFormat: '%A, %B %e,%Y %H:%M'
	    },
	    legend: {
	        align: 'center',
	        verticalAlign: 'bottom',
	        backgroundColor: '#FFFFFF',
	        enabled: false,
	        maxHeight: 75
	    },
	    series: [],
	    plotOptions: {
	    	line: {
	    		lineWidth: 1,
	    		shadow: true/*,
	    		showCheckbox: true*/
	    	},
	    	spline: {
	    		lineWidth: 1,
	    		shadow: true
	    	},
	    	area: {
	    		lineWidth: 0,
	    		fillOpacity: .6,
	    		fillColor: {
					linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                    stops: [
                        [0, "rgba(240, 240, 240, .7)"],
                        [1, "rgba(200, 200, 200, .7)"]
                    ]
	    		}
	    	},
	    	series: {
	    		events: {}
	    	}
	    },
	    credits: {
                enabled: false
       },
	    exporting: { enabled: false }
	},

	/*
	 * Object usde when exporting a chart
	 */
	chart_export_config_obj: {
		title: {
			align: 'center',
			verticalAlign: "top",
			style: {
				fontSize: "16px"
			},
			useHTML: false,
			text: ''
		},
	    subtitle: {
	    	text: "",
	    	verticalAlign: "top",
	    	align: "center"
	    },
	    chart: {
	    	marginTop: 50
	    }
	},

	/*
	 * Method used to retrieve the label for multimetrics
	 * This method is appending more metrics if their lines are on the same pixel or so.
	 * If they are too close, the tooltip will aggregate the labels
	 */
	getMultiMetricTooltipFormatter: function () {
		var x = this.x;
		var y = this.y;
		var gap = ( this.series.chart.yAxis[0].max - this.series.chart.yAxis[0].min ) / this.series.chart.yAxis[0].height;
		var allSeries = this.series.chart.series;
		var aggr = "";
		var tot = 0;
		for ( var i=0; i<allSeries.length; i++) {
			var found = false;
			var serie = allSeries[i];
			if ( serie.visible == true ) {
				for ( var j=0; j<serie.data.length; j++ ) {
					if ( (serie.data[j] != undefined && serie.data[j].category == x) && ( serie.data[j].y + gap/2 > y && serie.data[j].y - gap/2 < y ) ) {
						found = serie.data[j].series.name;
						break;
					}
				}
			}
			if ( found != false ) {
				tot++;
				aggr += '<span style="color:'+serie.color+';font-weight:bold;">-</span><span style="color: #666;">' + found.toLowerCase() + ',</span> <br />';
			}
		}
		var thisDate = new Date(this.x) + " ";
		return '<span style="font-size: 10px;">' + thisDate.split("GMT")[0] + '</span><br />' + aggr.substring(0, aggr.length-14) + '<br /><span style="color:'+this.series.color +';">' + this.series.chart.Config.name + '</span>: <strong>' + (Math.round ( this.y * 100) / 100) +' '+ this.series.chart.Config.unit + '</strong>';
	},

	/*
	 * Method used to return a default metric configuration
	 * The colors array is defining all the colors that will be plotted in a multi metric chart
	 */
	getDefaultMetricConfigObject: function () {
		return {
			colors: ["#009de0", "#be006b", "#a0bf35", "#9f905d", "#b9b9b9", "#000000", "#27c4d9", "orange", "green", "blue", "black", "gray", "lightgray", "yellow", "cyan"],
			externalTools: {
				print: true,
				exportJpg: true,
				exportPdf: false,
				exportPng: false,
				exportSvg: false,
				trendAnalysis: true
			}
		}
	},

	/* Ajax config object
	 */
	get_ajax_config_object: function () {
		return {
			error: function(data) {
		        //reporting.throw_error ( "Error fetching data" );
		    },
		    complete: function(xhr, data) {
		        if (xhr.status == 0)
		            reporting.throw_error ( data );
		    }
		}
	}

}

/*
 * TESTING PURPOSES
 * if we are on a local dev environment, I'm going to override some settings
 */
if ( Config.dev === true ) {
	Config.get_availability_uri = "public/assets/js/test_availability_data.json?";
	Config.get_chartdata_uri = "public/assets/js/graphite.json?";
    Config.get_chart_tab_uri = "";
}


Config.labels = {

	// Chart
	HIDE_ALL_SERIES: 				"Hide all series",
	SWITCH_SERIE_ONOFF: 			"Click an interface to display graph",

	// Group page
	SHOW_ELEMENTS: 					VIEW_ELEMENTS,
	HIDE_ELEMENTS: 					HIDE_ELEMENTS,
	OPEN_ALL: 						OPEN_ALL,
	CLOSE_ALL: 						CLOSE_ALL,
	RESTORE_ALL: 					RESTORE_ALL,
	EXPAND_ALL: 					EXPAND_ALL,

	// Errors
	ERROR_GET_AVAILABILITY: 		ERROR_GET_AVAILABILITY,
	ERROR_NO_METRICS_FOUND:			ERROR_NO_METRICS_FOUND,
	ERROR_NO_CHART_DATA: 			ERROR_NO_CHART_DATA,
	ERROR_ELMENTNAME_NOT_FOUND: 	ERROR_ELMENTNAME_NOT_FOUND,
	ERROR_GETTING_CHART_DATA: 		ERROR_GETTING_CHART_DATA,
	LOADING:						LOADING,
	CLICK_TO_CLOSE: 				CLICK_TO_CLOSE

}


if ( typeof window.console != "object" || Config.show_log === false ) {
	window.console =  {
		log: function () { return false; },
		warn: function () { return false; },
		group: function () { return false; },
		groupEnd: function () { return false; }
	}
}
