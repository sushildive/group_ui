( function($) {
		$.fn.groupUI = function(options, args) {
			var defaultSettings = {
				boxHeight : 150,
				onBoxStateChange : null,
				onBoxSizeChange : null
			};

			var settings = $.extend(defaultSettings, options);

			var GroupBox = function(opts, ele) {
				this.options = opts;
				this.root = $(ele);
				this.primaryHandler = $(this.root).find('.expanding-box-handler');
				this.secondaryHandler = $(this.root).find('.expanding-box-action');
				this.contentHolder = $(this.root).find('.expanding-box-dropdown');
				this.root.data('groupBox', this);
				// init dynatree
				$(this.root).find('.expanding-box-dropdown').dynatree({
					onExpand : function(flag, node) {
						resizeBox(flag, node, boxComponent);
					}
				});

				// init scrollbar 
				var _this = this;
				$(_this.root).find('.expanding-box-dropdown').customScrollbar();

				// primary open/close group handler 
				$(_this.root).find('.expanding-box-handler').click(function() {
					console.log(this);
					_this.toggleBox();
				});

				// footer open/close button handler
				$(_this.root).find('.expanding-box-action').click(function() {
					// click to primary box handler
					boxComponent.primaryHandler.click();
				});

				// footer extend/restore handler
				$(_this.root).find('.extend-box-action').click(function() {
					console.log('not yet implemented');
				});
			};

			GroupBox.prototype = {
				toggleBox : function() {
					var myDad = this.root;
					var targetObject = this.contentHolder;
					var myHeight;
					if (myDad.hasClass('highlight')) {
						targetObject.slideUp();
						myDad.removeClass('highlight');
						myHeight = 0;
					} else {
						targetObject.slideDown();
						myDad.addClass('highlight');
						myHeight = $(targetObject).find('.dynatree-container').height();
					}
					targetObject.height(myHeight);
					targetObject.customScrollbar("resize");

					// update global open/close button
					if (settings.onBoxStateChange) {
						settings.onBoxStateChange.call();
					}
					// update global extend/restore icon
					if (settings.onBoxSizeChange) {
						settings.onBoxSizeChange.call();
					}
				},
				openMaximized : function() {
					// TODO implement
					console.log('openMaximized not yet implemented');
					/*
					 * Steps:
					 * 1. expand all the nodes
					 * 2. set box height
					 * 3. open box
					 * 4. update open/close button state
					 * 5. update restore/extend icon
					 * 6. update global restore/exend icon
					 */
				},

				closeMinimized : function() {
					// TODO implement
					console.log('closeMinimized not yet implemented');
					/*
					 * Steps:
					 * 1. close all the nodes
					 * 2. set box height
					 * 3. remove restore/extend icon
					 * 4. update global restore/exend icon
					 * 5. update open/close button state
					 * 6. close box
					 */
				},

				maximize : function() {
					/*
					 * Steps:
					 * 1. change height
					 * 2. resize scrollbar
					 * 3. change restore/extend icon
					 * 4. change global restore/extend icon
					 */
				},

				restore : function() {
					/*
					 * Steps:
					 * 1. change height
					 * 2. resize the scrollbars
					 * 3. change restore/extend icon
					 * 4. change global restore/extend icon
					 */
				}
			};

			return this.each(function() {
				if (options == undefined)
					options = defaultSettings;
				if ( typeof (options) == "string") {
					var gb = $(this).data('groupBox');
					if (gb)
						gb[options](args);
				} else if ( typeof (options) == "object") {
					options = $.extend(defaultSettings, options);
					new GroupBox(options, $(this));
				} else
					throw "Invalid type of options";

			});

			function toggleBox(boxObject) {
				var myDad = boxObject.root;
				var targetObject = boxObject.contentHolder;
				var myHeight;
				if (myDad.hasClass('highlight')) {
					targetObject.slideUp();
					myDad.removeClass('highlight');
					myHeight = 0;
				} else {
					targetObject.slideDown();
					myDad.addClass('highlight');
					myHeight = $(targetObject).find('.dynatree-container').height();
				}
				targetObject.height(myHeight);
				targetObject.customScrollbar("resize");

				if (settings.onBoxStateChange) {
					settings.onBoxStateChange.call();
				}
			}

			function resizeBox(boxObject) {
				// TODO implement box resize code
				if (settings.onBoxSizeChange) {
					settings.onBoxSizeChange.call();
				}
			}

			function maximize(boxObject) {
				//TODO implement extend logic here

			}

			function restore(boxObject) {
				// TODO implement restore logic here
			}

		};

		/*
		 $("#tree").dynatree("getRoot").visit(function(node) {
		 node.expand(true);
		 });*/

	}(jQuery));
/**
 * group box operations
 */
var GroupUIOps = {
	/**
	 * change box height to max to remove scrollbars
	 */
	resizeMax : function() {
		alert('resizeMax yet to implement');
	},

	/**
	 * change box height to max so that
	 * a) scrolling appears if required
	 * b) scrolling do not appears if height is less than threshold height.
	 */
	resizeMin : function() {
	},

	toggleAllGroupDisplay : function() {
		var state;
		if (GroupUIOps.isOpenAll()) {
			// open all
			$('.expanding-box').not('.highlight').find('.expanding-box-handler').toggleBasicGroupDisplay();
			state = 'cab';
		} else {
			// close all
			$('.expanding-box.highlight').find('.expanding-box-handler').toggleBasicGroupDisplay();
			state = 'oab';
		}

		GroupUIOps.updateOCAllState(state);
	},

	isOpenAll : function() {
		return $('button[name="toggle-all-groups"]').hasClass('oab');
	},

	updateOCAllUI : function() {
		var closedGroupsExists = ($('.expanding-box').not('.highlight').find('.expanding-box-handler').length > 0);
		var state;
		if (closedGroupsExists) {
			state = 'oab';
		} else {
			state = 'cab';
		}

		GroupUIOps.updateOCAllState(state);
	},

	updateOCAllState : function(state) {
		var oldCls;
		var newBtnLbl;
		if (state == 'cab') {
			oldCls = 'oab';
			newBtnLbl = 'Close All';
		} else {
			oldCls = 'cab';
			newBtnLbl = 'Open All';
		}
		$('button[name="toggle-all-groups"]').removeClass(oldCls).addClass(state).text(newBtnLbl);
	}
};

$(function() {
	$('.expanding-box').groupUI({
		onBoxStateChange : function() {
			GroupUIOps.updateOCAllUI();
		},

		onBoxSizeChange : function() {
			// TODO implement box size changed
		}
	});

	$('button[name="toggle-all-groups"]').click(function() {
		if ($(this).hasClass('oab')) {
			$('.expanding-box').groupUI('openMaximized');
		} else if ($(this).hasClass('cab')) {
			$('.expanding-box').groupUI('closeMinimized');
		}
		// TODO this should lead to toggle of the button state
	});
});

