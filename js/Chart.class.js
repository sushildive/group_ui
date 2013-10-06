/*
 * Chart Class
 *
 * @author Paolo Moretti
 * paolo.moretti@nttdata.com
 * NTT Data
 */

function Chart ( ChartConfig )
{
	this.config = jQuery.extend ( true, {}, ChartConfig );
	this.format = jQuery.extend ( true, {}, Config.chart_config_obj );
	this.set ( "default" );
}

Chart.prototype.draw = function ( container ) {
	this.set ( "minrange" );
	/* Percentage
	 */
	( this.config.unit == "%" ) ? this.set ( "percentage") : this.set ( "notpercentage");

	/* Multiple line, remove
	 */
	this.format.chart.renderTo = container;

	this.ChartObject = new Highcharts.Chart( this.format );
	this.ChartObject.Config = this.config;
	if ( this.config.externalTools != false )
		this.addExternalTools ();
}

Chart.prototype.setData = function ( series ) {
	this.format.series = series;
}

Chart.prototype.getExportConf = function () {
	return  ;
}

Chart.prototype.addExternalTools = function () {

	var ChartClass = this;
	var chart = ChartClass.ChartObject;

	if(this.config.externalTools.trendAnalysis == true){

		this.addButton ( {
			name: "Trend",
			action: function () {
				var seriesLen = chart.series.length;

				trend_create_overlay();

				if((chart.series[seriesLen -1].name).indexOf('Trend') > -1){
					removeTrend(this);
				}else{
					addTrend(this);
				}

				//Inner function to add trend lines.
				function addTrend(_this) {
					var points = [];
					var cssCheck = false;
					$('.loading').css('background-position','-177px -40px');
					for (var i = 0; i < seriesLen ; i++) {
						var serieName = chart.series[i].name;
						if(chart.series[i].visible && serieName != Config.labels.HIDE_ALL_SERIES) {
							var this_serie = ChartClass.format.series[i].data;
							var point = new Array();
								var trendData = regression.fitData(this_serie).data;

								point.push(serieName);
								point.push(trendData);
								points.push(point);
								cssCheck = true;
						}
	                }

					if(cssCheck){
						fadeIn();//Add overlay effect.
					}

					if(points.length > 0){
						var j = 0, limit = points.length, busy = false;

						var processor = setInterval(function() {
							if(!busy) {
								busy = true;
								var dataPoint = points[j];

								chart.addSeries({
							    	data: dataPoint[1],
							        marker: {
							        	enabled: false
							    	},
							    	showInLegend: false,
							        name: dataPoint[0] +' : Trend',
							        color:'red',
							        lineWidth:1,
							        id: 'trendid'
							    });

								if(++j == limit) {
									clearInterval(processor);
								}
								busy = false;
								if(j == limit){
									fadeOut();//Remove overlay effect.
									if(cssCheck){
										$(_this).css('background-position','-147px -40px');
									}
									$('.loading').css('background-position','-177px -10px');
								}
							}
						}, 1);
					}
			    }

				//Inner function to remove trend lines.
				function removeTrend(_this) {
					fadeIn();//Add overlay effect.

					var i = seriesLen-1, limit = 0, busy = false;

					var processor = setInterval(function() {
						if(!busy) {
							busy = true;
							var serieName = chart.series[i].name;
							if(serieName.indexOf('Trend') > -1 && serieName != Config.labels.HIDE_ALL_SERIES) {
								chart.series[i].remove();
							}
							if(--i <= limit) {
								clearInterval(processor);
							}
							if( i == limit ){
								fadeOut();//Remove overlay effect.
								$(_this).css('background-position','-147px -10px');
							}
							busy = false;
						}
					}, 1);
			    }

				//Inner function to apply overlay.
				function fadeOut(){
					$('#trend_overlay_1').fadeOut('fast');
					$('#trend_overlay_2').fadeOut('fast');
					$('#trend_overlay_3').fadeOut('fast');
				}
				//Inner function to remove overlay.
				function fadeIn(){
					$('#trend_overlay_1').fadeIn('fast');
					$('#trend_overlay_2').fadeIn('fast');
					$('#trend_overlay_3').fadeIn('fast');
				}

				//Inner function to create overlay.
				function trend_create_overlay() {
					//Chart section overlay.
					var width = $("#chart_container").outerWidth();
					var height = $("#chart_container").outerHeight();
					var offset = $("#chart_container").offset();
					var div1 = document.createElement('div');
					var span = document.createElement('span');
					$(span).css({
						background:"url('public/assets/img/icons/cal_loader.gif') no-repeat 0px 0px transparent",
						top: '50%',
						left: '50%',
						display: 'block',
						width: '32px',
						height: '32px',
						position:'absolute',
						margin:'-16px 0 0 -16px'
					});
					$(div1).css({
						opacity: '0.1',
						backgroundColor: '#000',
						width: width+'px',
						height: height+'px',
						position:'absolute',
						top: '0px',
						left: '0px',
						display: 'none',
						zIndex: 100
					}).attr('id', 'trend_overlay_1').html(span);
					$('#chart_container').append(div1);

					//Search section overlay.
					var div2 = document.createElement('div');
					$(div2).css({
						opacity: '0.1',
						width: '100%',
						height: '100%',
						position: 'center',
						top: 0,
						left: 0,
						display: 'none',
						zIndex: 100
					}).attr('id', 'trend_overlay_2');
					$('.viewGraphOption').append(div2);

					//Tab section overlay.
					width = $(".tab-navigation").outerWidth();
					height = $(".tab-navigation").outerHeight();
					offset = $(".tab-navigation").offset();
					var div3 = document.createElement('div');
					$(div3).css({
						opacity: '0.1',
						width: width+'px',
						height: height+'px',
						position: 'absolute',
						top:'0px',
						left:'0px',
						display: 'none',
						zIndex: 100
					}).attr('id', 'trend_overlay_3');
					$('.tab-container').append(div3);

				}

			}, className: "trend"
		} );}

	if ( this.config.externalTools.print === true ) {
		this.addButton ( {
			name: "Print",
			action: function () {
				$(document.body).addClass ("ChartPrint");

				var cc = Config.chart_export_config_obj;
				cc.title.text = reporting.ElementName;
				cc.subtitle.text = chart.Config.description;

				if ( $(chart.container).parents(".tab-pane:first").find (".external-tool-label").size() > 0 )
					 cc.subtitle.text += " - ";
				$(chart.container).parents(".tab-pane:first").find (".external-tool-label").each( function () {
					cc.subtitle.text += " " + $(this).text();
				});

				var printContent = '<div align="center" style="font: normal;size: 16px;">';
				printContent += '<strong>'+cc.title.text +'</strong>';
				printContent += '<br />' + cc.subtitle.text +'<br />';

				var svg = chart.getSVG();
				printContent += svg;
				printContent += '</div>';

				$('#print_div').get(0).innerHTML = printContent;

				window.print();

				$(document.body).removeClass ("ChartPrint");
			}, className: "print"
		} );
	}
	/*
	 * This must be change if we want to configure which type of export to activate
	 */
	if (
		this.config.externalTools.exportPng === true ||
		this.config.externalTools.exportPdf === true ||
		this.config.externalTools.exportJpg === true ||
		this.config.externalTools.exportSvg === true
	) {
		this.addSelectButton ( {
			name: "Export chart",
			className: "export",
			options: [
				{name: "PNG", type: "image/png"},
				{name: "PDF", type: "application/pdf"},
				{name: "JPG", type: "image/jpeg"},
				{name: "SVG", type: "image/svg+xml"},
				{name: "CSV", type: "application/csv"}
			],
			NewChartClass:ChartClass
		} );
	}

}

Chart.prototype.addIcon = function ( config ) {
	var ChartIcon = $('<button class="external-tool-icon ' + config.name + '"></button>');
	$(this.config.content).before ( ChartIcon );
}

Chart.prototype.addSelectButton = function ( config ) {
	var _this = this;
	var ChartSelectButton = $('<button class="external-tool-button ' + config.className + '" title="'+config.name+'"><span>' + config.name + '</span></button>');
	ChartSelectButton.ChartObject = this.ChartObject;
	ChartSelectButton.click( function (e) {
		e.stopPropagation();
		if ( $(".external-tool-dropdown").size() == 0 ) {
			var dropdown = $('<div class="external-tool-dropdown"></div>').css ({
				"top": ( $(this).position ().top + $(this).outerHeight () + 3) + "px",
				"left": ( $(this).position ().left - 4 ) + "px"
			})
			$('#chart_container').append ( dropdown );
			$(config.options).each ( function () {
				var thisOption = this;
				var link = $('<a>' + this.name + '</a>');

				if(this.name == 'CSV'){
					var encodedValue = encodeURIComponent(_this.ChartObject.Config.unit);

					var URL = Config.get_chart_csv_dwonload_uri + 'target='+reporting.ElementName;
					URL += '&elementKey='+_this.ChartObject.Config.key;
					URL += '&elementTypeKey='+ElementTypeKey;
					URL += '&elementDisplayName='+ElementDisplayName;
					URL += '&elementUnit='+encodedValue;
					URL += '&tabName='+_this.ChartObject.Config.name;
					URL += '&'+PeriodFrom+'&frequency='+Frequency;
					URL += '&xAxisMin='+XAxisMin;
					URL += '&xAxisMax='+XAxisMax;
					URL += '&jsonp='+new Date().getTime();
					URL += '&format=csv';

					link.attr("href",URL);

					link.click ( function () {
				        $(this).parent ( ".external-tool-dropdown").remove ();
					});
				}else{
					link.click ( function () {
						var cc = Config.chart_export_config_obj;
						cc.title.text = reporting.ElementName;
						cc.subtitle.text = _this.ChartObject.Config.description;
						if ( $(_this.ChartObject.container).parents(".tab-pane:first").find (".external-tool-label").size() > 0 )
							 cc.subtitle.text += " - ";
						$(_this.ChartObject.container).parents(".tab-pane:first").find (".external-tool-label").each( function () {
							cc.subtitle.text += " " + $(this).text()
						});
						_this.ChartObject.exportChart ({
				            type: thisOption.type,
		            		filename: "Export-" + reporting.ElementName
				        }, cc );
				        $(this).parent ( ".external-tool-dropdown").remove ();
					});
				}
				dropdown.append ( link );
			});
		} else
			$(".external-tool-dropdown").remove ();
	});
	$(this.config.content).before ( ChartSelectButton );
}

Chart.prototype.addButton = function ( config ) {
	var ChartButton = $('<button class="external-tool-button ' + config.className + '" title="'+config.name+'"><span>' + config.name + '</span></button>').click( config.action );
	$(this.config.content).before ( ChartButton );
}

Chart.prototype.addLabel = function ( config ) {
	var ChartLabel = $('<span class="external-tool-label ' + config.className + '">'+config.text+'</span>');
	$(this.config.content).before ( ChartLabel );
}

Chart.prototype.addSeparator = function ( config ) {
	var ChartSep = $('<span class="external-tool-sep">|</span>');
	$(this.config.content).before ( ChartSep );
}

Chart.prototype.getDataDetails = function ()
{
	var averageTot = false;
	var max = false;
	var min = false;
	var count = this.format.series[0].data.length;
	for ( var i=0; i<this.format.series[0].data.length; i++ ) {
		var Serie = this.format.series[0].data[i];
		if ( Serie[1] != null ) {
			if ( min == false )
				min = Serie[1];
			if ( max == false )
				max = Serie[1];
			if ( averageTot == false )
				averageTot = 0;
			if ( Serie[1] > max )
				max = Serie[1];
			if ( Serie[1] < min )
				min = Serie[1];
			averageTot += Serie[1];
		} else
			count--;
	}
	if ( averageTot != 0 ){
		averageTot = Math.round ( ( averageTot / count ) * 100 ) / 100;
		min = Math.round ( min * 100) / 100;
		max = Math.round ( max * 100) / 100;
	}

	return { average: averageTot, max: max, min: min };
}

Chart.prototype.set = function ( properties )
{
	if ( typeof properties == "string" )
		properties = new Array (properties);
	for ( var i=0; i<properties.length; i++ ) {
		var property = properties[i];
		if ( typeof this["__" + property] == "function" && typeof this.format != "undefined" ) {
			this["__" + property]();
		}
	}
}

Chart.prototype.__default = function ()
{
	this.format.yAxis[0].title.text = this.config.description;
	this.format.tooltip.valueSuffix = ' ' + this.config.unit;
}

Chart.prototype.__percentage = function ()
{
	this.format.yAxis[0].min = 0;
	this.format.yAxis[0].max = 100;
	this.format.xAxis[0].offset = 10;
	this.format.tooltip.valueSuffix = ' ' + this.config.unit;
}

Chart.prototype.__minrange = function ()
{
	this.format.xAxis[0].minRange = MaxZoom * zoomFactorInMins;
	this.format.xAxis[0].min = XAxisMin;
	this.format.xAxis[0].max = XAxisMax;
	this.format.tooltip.valueSuffix = ' ' + this.config.unit;
//	this.format.plotOptions.line.pointStart = XAxisMin;
//	this.format.plotOptions.line.pointInterval = MaxZoom * zoomFactorInMins;
}

Chart.prototype.__notpercentage = function ()
{
	this.format.yAxis[0].min = null;
	this.format.yAxis[0].max = null;
	this.format.tooltip.valueSuffix = ' ' + this.config.unit;
}

Chart.prototype.__start_empty = function ()
{
	for ( var k=0; k<this.format.series.length; k++ ){
		if ( this.format.series[k].name != Config.labels.HIDE_ALL_SERIES )
			this.format.series[k].visible = false;
	}
	this.format.title = {
		align: 'left',
		verticalAlign: "bottom",
		style: {
			fontSize: "11px",
			marginLeft: "25px",
			lineHeight: "10px"
		},
		useHTML: true,
		text: '<div class="info-image" height="10"> <span>' + Config.labels.SWITCH_SERIE_ONOFF + '</span></div>'
	};
}

Chart.prototype.__single = function ()
{
	this.format.legend.enabled = false;
	var DataDetails = this.getDataDetails ();
	this.format.DataDetails = DataDetails;
	if ( DataDetails.average != false )
		this.addLabel ( { text: "Average: <strong>" + DataDetails.average + " </strong>" + this.config.unit, className: "align-left" });
	if ( DataDetails.max != false )
		this.addLabel ( { text: "Max: <strong>" + DataDetails.max + " </strong>" + this.config.unit, className: "align-left" });
	if ( DataDetails.min != false )
		this.addLabel ( { text: "Min: <strong>" + DataDetails.min + " </strong>" + this.config.unit, className: "align-left" });
}

Chart.prototype.__multiple = function ()
{
	this.format.legend.enabled = true;
	this.format.tooltip.formatter = function() {
		return Config.getMultiMetricTooltipFormatter.call (this);
	}
	this.format.series.push ( { color: "#000", name: Config.labels.HIDE_ALL_SERIES} );
	this.format.plotOptions.series.events.legendItemClick = function(event) {
		if ( this.name === Config.labels.HIDE_ALL_SERIES )
			$.each(this.chart.series, function(index, serie) {
				if ( serie.name != Config.labels.HIDE_ALL_SERIES && !(serie.name.indexOf('Trend') > -1) )
					serie.hide ();
			});
		else {
			var selected = this.index
			$.each(this.chart.series, function(index, serie) {
				if ( index == selected )
					(this.visible && !(serie.name.indexOf('Trend') > -1) ) ? serie.hide() : serie.show ();
			});
		}
        return false;
    }
}



