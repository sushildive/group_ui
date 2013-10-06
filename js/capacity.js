/*
 * JS for Capacity page UI.
 *
 * @author Ranjit Dhongade
 * ranjit.dhongade@nttdata.com
 * NTT Data
 */

$(document)
		.ready(
				
				function() {
					
					// START : Code to handle error when there are not metrics
					// found.
					if ($('.tab-navigation > li').length <= 0) {
						$('#tabs1').css('display', 'none');
						return;
					} else {
						$('.capacityPreloader').css('display', 'block');
					}
					// END : No metric found.

					capacity.initTable();
					capacity.metricUnit = $('.tab-navigation li.active i')
							.attr('metricUnit');
					$('#capacityListTable th').eq(-1).css('border-right-width',
							'0px');

					capacity.loop_elements(".tab-navigation li",
							capacity.init_tab);

					// Fetch elements data once tabs are loaded and render it in
					// table.
					capacity.fetchData($('.tab-navigation li.active a').attr(
							'element'), $('.tab-navigation li.active i').attr(
							'metricUnit'),$('.tab-navigation li.active i').attr(
							'metricKey'),$('.tab-navigation li.active i').attr(
							'elementTypeKey'),false);

					// update table status on drop down change
					$('#instancesPerPage').change(function() {
						capacity.fnCRUDTableStatus();
					});

					// update table status when prev or next buttons clicked.
					$('.paginationButton').click(function() {
						capacity.fnCRUDTableStatus();
					});
					// Initialize function for Tab click event.
					$('.tab-navigation li a')
							.click(
									function() {
										Error.forceRemove();
										if ($('.capacityPreloader').css(
												'display') != 'block') {
											$('.capacityPreloader').css(
													'display', 'block');
											$('.box-section-content').css(
													'display', 'none');
											$(this).parents('ul').find('li')
													.removeClass('active');
											$(this).parents('li').addClass(
													'active');
											capacity.initTable();

											var showRecordsOf = $(this).attr(
													'element');
											capacity.metricUnit = $(
													'.tab-navigation li.active i')
													.attr('metricUnit');
											
											capacity.metricKey = $(
											'.tab-navigation li.active i')
											.attr('metricKey');
											capacity.elementTypeKey = $(
											'.tab-navigation li.active i')
											.attr('elementTypeKey');
											
											//alert("unit"+capacity.metricUnit);
											//alert("key"+capacity.metricKey);
											capacity.fetchData(showRecordsOf,capacity.metricUnit,capacity.metricKey,
													capacity.elementTypeKey,true);
										}
										var colToSort = $(
												'.tab-navigation li.active')
												.get(0).tableStatus.sorted_column;
										var colSortOrder = $(
												'.tab-navigation li.active')
												.get(0).tableStatus.sorted_order;

										capacity.fnSetSortColumnSortOrder(
												colToSort, colSortOrder);
									});
				});

var capacity = {
	// table column map and sequence reference.
	columnMap : {
		"ci_item" : 0,
		"ci_item_usage" : 2,
		"ci_item_util" : 3,
		"ci_item_trend" : 4,
		"ci_item_duration" : 5
	},
	// column ascending or descending reference.
	columnOrder : {
		"asc" : 0,
		"desc" : 1
	},

	total_Row : $('#capacityListTable tbody tr').size(),
	metricUnit : null,
	actionUrl : _CONTEXT_ROOT + "/fetchCapacityData.action?solutionId="
			+ solutionID,
	colSpan : null,

	/*
	 * Default initialization of object on Tab loading.
	 */
	init_tab : function() {
		var tableStatus = {
			"tableStatus" : {
				"sorted_column" : "ci_item",
				"sorted_order" : "asc",
				"instances_per_page" : 15,
				"page_number" : 0
			}
		};
		$.extend(this, tableStatus);
	},
	/*
	 * Method used to loop a set of elements defined by the "query", triggering
	 * in their scope a function passing attributes
	 */
	loop_elements : function(query, fn) {
		var elements = $(query);
		if (elements.size() > 0)
			elements.each(function() {
				fn.call(this);
			});
	},

	/*
	 * Function to update table statuses on Tab change event or Instance per
	 * page drop down change event, or click event of column, or click event of
	 * prev / next image icons.
	 */
	fnCRUDTableStatus : function() {

		setTimeout(function() {
			var sortedCol = $('.sortable.currentlySorted').attr('id');
			var so;

			if ($('.sortable.currentlySorted').attr('class').indexOf(
					'icon-chevron-up') > -1) {
				so = 'asc';
			} else {
				so = 'desc';
			}
			var instancePerPg = $('#instancesPerPage').val();
			var pageNumber = $("#currentPageNumber_top").val() - 1;
			$.extend($('.tab-navigation li.active').get(0).tableStatus, {
				"sorted_column" : sortedCol,
				"sorted_order" : so,
				"instances_per_page" : instancePerPg,
				"page_number" : pageNumber
			});
		}, 10);
	},

	// Function to fetch data for clicked tab.
	fetchData : function(showRecordsOf,metricUnit,metricKey,elementTypeKey, flag) {
		if(metricUnit== '%'){
			metricUnit = 'percentage';
		}
		var uri = capacity.actionUrl + "&reportingMetricId=" + showRecordsOf+"&reportingUnit="+metricUnit+"&reportingKey="+metricKey+"&elementTypeKey="+elementTypeKey;
		//alert(uri);
		var callback_id = "&FN_" + new Date().getTime() + "_crossdomain";
		uri += callback_id;
		$.ajax({
			// async: false,
			url : uri,
			dataType : "json",
			type : "GET",
			success : function(data) {
				if (data.status == 'session_timeout') {
					window.location.href = _CONTEXT_ROOT
							+ '/SessionTimeOut.action';
				} else {
					$('.capacityPreloader').css('display', 'none');
					capacity.filterData(data, flag);
					$('.box-section-content').css('display', 'block');
					if (data.errorMessages != null) {
						var messages = data.errorMessages;
						var errorMessages = ' ';
						var errorMessage;
						jQuery.each(messages, function() {
							errorMessage = this + '<br/>';
							errorMessages = errorMessages + errorMessage;
						});
						capacity.throw_error(errorMessages);
					}

				}
			},
			error : function(data, jqXHR, exception) {
				$('.capacityPreloader').css('display', 'none');
				$('.box-section-content').show().html('Error fetching data.');

			}

		});

	},

	// Function to filter data retrieved from #fetchData and prepare table.
	filterData : function(serverData, flag) {

		var colorCategory;
		var trendArrow;
		var utilColor;
		var noneCheckFlag = false;
		var noneToolTipText = 'This data is not available at the moment.';
		var table = $('#capacityListTable tbody');
		// check if active tab is enabled for child metrics
		var multiMetric = capacity.isMultimetric();
		for (i = 0; i < serverData.capacityDataList.length; i++) {
			var capData = (serverData.capacityDataList[i]);
			if(capData.currentUsagePercent != '--'){
				if (capData.currentUsagePercent.split(" ")[0] < 80) { // line
					colorCategory = "green";
					// trendArrow = "arrowIcon_green_up.png";
					utilColor = "#515049";
				} else if (capData.currentUsagePercent.split(" ")[0] >= 80
						&& capData.currentUsagePercent.split(" ")[0] <= 90) {
					colorCategory = "amber";
					// trendArrow = "arrowIcon_green.png";
					utilColor = "#515049";
				} else if (capData.currentUsagePercent.split(" ")[0] > 90) {
					colorCategory = "red";
					// trendArrow = "arrowIcon_blue_up.png";
					utilColor = "#d54902";
				}
			}

			if(capData.trendAngle != '--'){
				if (capData.trendAngle >= -90 && capData.trendAngle <= -45) {
					trendArrow = "icon_capacity_blue2.png";
				} else if (capData.trendAngle >= -44 && capData.trendAngle <= -11) {
					trendArrow = "icon_capacity_blue1.png";
				} else if (capData.trendAngle >= -10 && capData.trendAngle <= 10) {
					trendArrow = "icon_capacity_green.png";
				} else if (capData.trendAngle >= 11 && capData.trendAngle <= 44) {
					trendArrow = "icon_capacity_amber.png";
				} else if (capData.trendAngle >= 45 && capData.trendAngle <= 90) {
					trendArrow = "icon_capacity_red.png";
				}
				if (capData.trendAngle == 'null' || capData.trendAngle == null) {
					// showing nothing
					capData.trendAngle = "";
					trendArrow = "";
				}
			}

			var dataMaxValue;
			if (multiMetric) {
				if (capData.maxUsage != undefined && capData.maxUsage != '--') {
					dataMaxValue = (capData.maxUsage.split(" ")[1]
							.toLowerCase().indexOf("tb") > -1 ? capData.maxUsage
							.split(" ")[0] * 1024 * 1024
							: capData.maxUsage.split(" ")[1].toLowerCase()
									.indexOf("gb") > -1 ? capData.maxUsage
									.split(" ")[0] * 1024 : capData.maxUsage
									.split(" ")[0]);
				}
			} else {
				dataMaxValue = undefined;
			}

			var utilDataValidFlag = (capacity.isValid(capData.currentUsagePercent)
					&& capacity.isValid(capData.maxUsage))
					&& capacity.isValid(capData.currentUsage);
			var trendDataValidFlag = capacity.isValid(capData.trendAngle);
			var breachDataValidFlag = capacity.isValid(capData.timeToEndpointKey)
					&& capacity.isValid(capData.timeToEndpoint);
			var childMetricValidFlag = capacity.isValid(capData.childMetricName);

			var dataUnavailableImgTag = '<td data-value="-1.7976931348623157E+10308"><img class="dataNa" src="public/assets/img/icons/question_mark_icon.png" width="22" height="21" title="'
				+ noneToolTipText + '"></td>';
			table
					.append('<tr><td data-value="'
							+ capData.elementName
							+ '">'
							+ capData.elementName
							+ '</td>'
							+ (multiMetric ? '<td data-value=" ">'
											+ capData.childMetricName + '</td>'
									: '<td data-value=" " style="display:none">&nbsp;</td>')
							+ (!utilDataValidFlag ? generateTDTag(capData.currentUsage)
									: '<td data-value="'
											+ dataMaxValue
											+ '"><div><div class="usedSpace">'
											+ capData.currentUsage
											+ '&nbsp;'
											+ '</div><div class="usedSpaceStatus_bg"><div class="usedSpaceStatus_a '
											+ colorCategory
											+ '" style="width:'
											+ capData.currentUsagePercent
													.split(" ")[0]
											+ '%"> </div></div><div class="totalSpace">of '
											+ capData.maxUsage
											+ ' </div></div></td>')
							+ (!utilDataValidFlag ? generateTDTag(capData.currentUsagePercent)
									: ' <td style="color:' + utilColor
											+ '" data-value="'
											+ capData.currentUsagePercent
											+ '">'
											+ capData.currentUsagePercent
											+ '</td>')
							+ (!trendDataValidFlag ? dataUnavailableImgTag : ' <td data-value="'
								+ capData.trendAngle 
								+ '"><img src="public/assets/img/icons/'
								+ trendArrow
								+ '" width="22" height="21"> </td>')
							+ (!breachDataValidFlag ? generateTDTag(capData.timeToEndpoint)
									: ' <td data-value="'
											+ capData.timeToEndpointKey
											+ '" style="color:' + utilColor
											+ '">' + capData.timeToEndpoint
											+ '</td>') + '</tr>');
		}
		
		
		$("#capacityListTable td img.dataNa").bind().tooltip({
			    content: function(){
			    	return $(this).attr('title');        
			    }
			});
		capacity.updateTable(flag);
	},

	// Function to apply table sorter on filtered data.
	updateTable : function(flag) {
		$('#capacityListTable th').eq(0).css('width', '150px');
		$('#capacityListTable th').eq(4).css('width', '200px');
		$('#capacityListTable th').eq(-4).css('width', '360px');
		$('#capacityListTable th').eq(-3).css('width', '100px');

		$('#capacityListTable th').eq(-2).css('width', '60px');
		$('#capacityListTable #ci_item_name').css('width', '60px');

		var columnToSort = $('.tab-navigation li.active').get(0).tableStatus.sorted_column;
		var columnSortOrder = $('.tab-navigation li.active').get(0).tableStatus.sorted_order;
		var instancePerPg = $('.tab-navigation li.active').get(0).tableStatus.instances_per_page;
		var pgNumber = $('.tab-navigation li.active').get(0).tableStatus.page_number;

		var colNumber = capacity.columnMap[columnToSort];
		var colOrderNumber = capacity.columnOrder[columnSortOrder];

		$("#instancesPerPage").val(instancePerPg);

		var dataExists = $('#capacityListTable tbody tr').length > 0;

		if (!dataExists) {
			$('#capacityListTable').removeAttr('disabled', 'disabled');

			$('#capacityListTable tbody').html(
					'<tr><td colspan="' + capacity.colSpan + '"><b>'
							+ noEleFound + '</b></td></tr>');
			$('.paginationControls.pull-right').hide();
			$('#capacityListTable').attr('disabled', 'disabled');
			$('#instancesPerPage').attr('disabled', 'disabled');
			$('.paginationControls.pull-right').hide();
		} else {
			$('.paginationControls.pull-right').show();
			$('#capacityListTable').removeAttr('disabled', 'disabled');
			$('#instancesPerPage').removeAttr('disabled', 'disabled');
		}

		var sorting = [ colNumber, colOrderNumber ];

		var headerSorters;

		if (capacity.isMultimetric()) {
			headerSorters = {
				1 : {
					sorter : false
				},
				2 : {
					sorter : 'digit'
				},
				3 : {
					sorter : 'percent'
				},
				4 : {
					sorter : 'digit'
				},
				5 : {
					sorter : 'digit'
				}
			};
		} else {
			headerSorters = {
				1 : {
					sorter : false
				},
				2 : {
					sorter : false
				},
				3 : {
					sorter : 'percent'
				},
				4 : {
					sorter : 'digit'
				},
				5 : {
					sorter : 'digit'
				}
			};
		}

		$("#capacityListTable")
				.tablesorter(
						{
							widthFixed : false,
							widgets : [ 'zebra' ],
							sortList : [ sorting ],
							cssPageSize : '.pagesize',
							headers : headerSorters,
							emptyTo : 'bottom',
							textExtraction : function(node) {
								var cell_value = $(node).text();
								var sort_value = $(node).data('value');

								return (sort_value != undefined || sort_value != 'undefined') ? sort_value
										: cell_value;
							}
						}).tablesorterPager({
					container : $("#pager"),
					page : pgNumber,
					size : instancePerPg
				});

		if (!capacity.isMultimetric()) {
			$('#ci_item_usage').removeClass('sortable');
		}

		$('.hd-gray-fade th.sortable').click(function() {
			capacity.fnSetSortColumnSortOrder($(this).attr('id'), null);
		});

		$('.input-nano.currentPageNumberTextbox').change(function() {
			capacity.fnCRUDTableStatus();
		});
	},

	// Function to handle sort up and sort down arrows on column,
	// also set the sort column and sort order in hidden fields.
	fnSetSortColumnSortOrder : function(columnId, sortOrder) {
		if (sortOrder == null || sortOrder == undefined) {
			// here when user clicks on a column header
			capacity.fnCRUDTableStatus();
		}
	},

	isMultimetric : function() {
		var result = ($('.tab-navigation li.active').find('i').attr(
				'multiMetric') == 'true');
		return result;
	},

	initTable : function() {
		$(".input-nano.currentPageNumberTextbox").unbind().change();
		// empty table
		$('#capacityListTable tbody').html('');
		var currentHtml = $('#capacityListTable').html();
		$('#capacityListTable').remove();
		$('.paginationMenu')
				.eq(0)
				.after(
						'<table id="capacityListTable" class="incidentListTable table tablesorter" data-provide="pagination" data-pager="#pager2"></table>');
		$('#capacityListTable').append(currentHtml);

		$('#ci_item_usage').html('').append('<a href="#"></a><i></i>');
		var currentTabColumnName = $('.tab-navigation li.active i').attr(
				'currentTabColumnName');

		if (capacity.isMultimetric()) {
			$('#ci_item_usage a').html(currentTabColumnName);
		} else {
			$('#ci_item_usage').append(currentTabColumnName);
		}

		if (capacity.isMultimetric()) {
			$('#ci_item_name').show();
			capacity.colSpan = 6;
		} else {
			$('#ci_item_name').hide();
			capacity.colSpan = 5;
		}

	},

	throw_error : function(message, options) {
		var newError = Error.add(message, options);
		newError.show();
	},
	
	isValid : function(data) {
		return (data != undefined && data != '--');
	}
};

var Error = {
	collector : [],
	options : {
		html : '<div class="internal-error"><span class="internal-error-message"></span><small>click to close</small></div>',
		message_query : ".internal-error-message",
		container_query : '.container-body',
		type : "inline"
	},

	add : function(message, option) {

		var thisOption = $.extend({}, Error.options);
		if (arguments.length > 0)
			$.extend(thisOption, arguments[1]);
		var newError = $(thisOption.html).css("z-idnex", Error.collector * 3);
		newError.find(thisOption.message_query).html(message);
		newError.click(Error.remove);

		Error.collector.push({
			element : newError,
			options : thisOption,
			status : "hidden",
			message : message
		});

		return {
			ref : Error.collector.length,
			options : thisOption,
			show : function() {
				Error.collector[this.ref - 1].status = "shown";
				if ($(this.options.l).find(".internal-error").size() > 0)
					$(this.options.container_query).find(
							".internal-error-message").append(
							"<br />" + Error.collector[this.ref - 1].message);
				else
					$(this.options.container_query).append(
							Error.collector[this.ref - 1].element);
			}
		};
	},

	remove : function() {
		// Error element scope
		$(this).remove();
	},

	/**
	 * Remove error popup on click of tab.
	 */
	forceRemove : function() {
		$('.internal-error').click();
	}
	
};

function generateTDTag(tdTagData) {
	return '<td data-value="-1.7976931348623157E+10308">' + tdTagData + '</td>';
}