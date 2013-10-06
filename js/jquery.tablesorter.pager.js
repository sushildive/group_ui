(function($) {
	$.extend({
		tablesorterPager: new function() {

			function updatePageDisplay(c) {
				//var s = $(c.cssPageDisplay,c.container).val((c.page+1) + c.seperator + c.totalPages);
				//alert("c.page>>"+c.page + " c.totalPages>>"+c.totalPages + " c.totalRows>>"+ c.totalRows + " c.size>>"+ c.size);
				var x = c.page + 1;
				var y = c.size;
				var n = parseInt(c.totalRows);

				if(c.page != 0){
					x = parseInt(c.page) * parseInt(c.size) + 1;
					if((x + parseInt(c.size)) < parseInt(c.totalRows)){
						y = x + parseInt(c.size) - 1;
					}else{
						y = parseInt(c.totalRows);
					}
				}

				if(c.totalRows == 1){
					x = c.totalRows;
				}

				if(parseInt(c.size) >= parseInt(c.totalRows)){
					y = c.totalRows ;
				}
//alert(x+"<<x  " + y+"<<y  " + n+"<<n");
				if(x!=0 && y!=0 && n!=0){
					$('.paginationShowingOf').html(showing+' <strong>'+x+'</strong> '+to+' <strong>'+y+'</strong> '+of+' <strong>'+n+'</strong> '+changes);
				}else{
					$('.paginationShowingOf').html('&nbsp;');
				}

				if(c.page == 0 && c.page < c.totalPages && (c.page+1) != c.totalPages){
					$('.paginationButton.previous').addClass('disabled');
					$('.paginationButton.next').removeClass('disabled');
				}else if(c.page != 0 && (c.page+1) == c.totalPages){
					$('.paginationButton.next').addClass('disabled');
					$('.paginationButton.previous').removeClass('disabled');
				}else if((c.page+1) == c.totalPages){
					$('.paginationButton.next').addClass('disabled');
					$('.paginationButton.previous').addClass('disabled');
				}else{
					$('.paginationButton.next').removeClass('disabled');
					$('.paginationButton.previous').removeClass('disabled');
				}

				
				$('.pageOf').html(' '+of+' '+c.totalPages);
				var s = $(c.cssPageDisplay,c.container).val((c.page+1));
			}
			
			function setPageSize(table,size) {
				var c = table.config;
				c.size = size;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				c.pagerPositionSet = false;
				moveToPage(table);
				fixPosition(table);
			}
			
			function fixPosition(table) {
				var c = table.config;
				if(!c.pagerPositionSet && c.positionFixed) {
					var c = table.config, o = $(table);
					if(o.offset) {
						c.container.css({
							top: o.offset().top + o.height() + 'px',
							position: 'absolute'
						});
					}
					c.pagerPositionSet = true;
				}
			}
			
			function moveToFirstPage(table) {
				var c = table.config;
				c.page = 0;
				moveToPage(table);
			}
			
			function moveToLastPage(table) {
				var c = table.config;
				c.page = (c.totalPages-1);
				moveToPage(table);
			}
			
			function moveToNextPage(table) {
				var c = table.config;
				c.page++;
				if(c.page >= (c.totalPages-1)) {
					c.page = (c.totalPages-1);
				}
				moveToPage(table);
			}
			
			function moveToPrevPage(table) {
				var c = table.config;
				c.page--;
				if(c.page <= 0) {
					c.page = 0;
				}
				moveToPage(table);
			}
						
			
			function moveToPage(table) {
				var c = table.config;
				if(c.page < 0 || c.page > (c.totalPages-1)) {
					c.page = 0;
				}
				
				renderTable(table,c.rowsCopy);
			}
			
			function renderTable(table,rows) {
				
				var c = table.config;
				var l = rows.length;
				var s = (c.page * c.size);
				var e = (s + c.size);
				if(e > rows.length ) {
					e = rows.length;
				}
				
				
				var tableBody = $(table.tBodies[0]);
				
				// clear the table body
				
				$.tablesorter.clearTableBody(table);
				
				for(var i = s; i < e; i++) {
					
					//tableBody.append(rows[i]);
					
					var o = rows[i];
					var l = o.length;
					for(var j=0; j < l; j++) {
						
						tableBody[0].appendChild(o[j]);

					}
				}
				
				fixPosition(table,tableBody);
				
				$(table).trigger("applyWidgets");
				
				if( c.page >= c.totalPages ) {
        			moveToLastPage(table);
				}
				
				updatePageDisplay(c);
			}
			
			this.appender = function(table,rows) {
				
				var c = table.config;
				
				c.rowsCopy = rows;
				c.totalRows = rows.length;
				c.totalPages = Math.ceil(c.totalRows / c.size);
				
				renderTable(table,rows);
			};
			
			this.defaults = {
				//size: parseInt($(".instancesPerPage").val()),
				offset: 0,
				//page: 0,
				totalRows: 0,
				totalPages: 0,
				container: null,
				cssNext: '.next',
				cssPrev: '.previous',
				//cssFirst: '.first',
				//cssLast: '.last',
				cssPageDisplay: '.input-nano',
				cssPageSize: '.pagesize',
				seperator: "/",
				positionFixed: false,
				appender: this.appender
			};
			
			this.construct = function(settings) {
				
				return this.each(function() {
					
					config = $.extend(this.config, $.tablesorterPager.defaults, settings);
					
					var table = this, pager = config.container;
				
					$(this).trigger("appendCache");
					
					config.size = parseInt($(".pagesize",pager).val());
					
					$(config.cssFirst,pager).click(function() {
						moveToFirstPage(table);
						return false;
					});
					$(config.cssNext,pager).click(function() {
						moveToNextPage(table);
						return false;
					});
					$(config.cssPrev,pager).click(function() {
						moveToPrevPage(table);
						return false;
					});
					$(config.cssLast,pager).click(function() {
						moveToLastPage(table);
						return false;
					});
					$(config.cssPageSize,pager).change(function() {
						setPageSize(table,parseInt($(this).val()));
						return false;
					});
					
					//adding below to have on change event for input text field.
					$(".input-nano.currentPageNumberTextbox", pager).change(function () {
			            var c = table.config;
			            var p = $(this).val();

			            if (p != c.page + 1) {
			                p = parseInt(p) - 1;
			                if (p < 0 || isNaN(p)) p = 0;
			                else if (p > c.totalPages - 1) p = c.totalPages - 1;

			                c.page = p;
			                moveToPage(table);
			            }

			            return false;
			        });
					//ends here
					
					//adding below to have on change event for select tag.
					$("#instancesPerPage", pager).change(function () {
						var c = table.config;
						c.page = 0;
						moveToPage(table);

						return false;
			        });
					//ends here					
					
				});
			};
			
		}
	});
	// extend plugin scope
	$.fn.extend({
        tablesorterPager: $.tablesorterPager.construct
	});
	
})(jQuery);				