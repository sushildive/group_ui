( function($) {
		$.fn.groupUI = function(options, args) {
			var defaultSettings = {
				boxHeight : 150,
				onBoxStateChange : null,
				onBoxSizeChange : null,
				fetchStatus : null
			};

			var settings = $.extend(defaultSettings, options);

			var GroupBox = function(opts, ele) {
				this.options = opts;
				this.root = $(ele);
				this.primaryHandler = $(this.root).find('.expanding-box-handler');
				this.secondaryHandler = $(this.root).find('.expanding-box-action');
				this.contentHolder = $(this.root).find('.expanding-box-dropdown');
				this.root.data('groupBox', this);
				var _this = this;
				// init dynatree
				$(_this.contentHolder).dynatree({
					onExpand : function(flag, node) {
						resizeBox.call(_this, flag, node);
					}
				});

				// init scrollbar
				$(_this.contentHolder).customScrollbar();

				// primary open/close group handler
				$(_this.primaryHandler).click(function() {
					_this.toggleBox();
				});

				// footer open/close button handler
				$(_this.secondaryHandler).click(function() {
					// click to primary box handler
					_this.primaryHandler.click();
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
						myHeight = 0;
						dehighlightBox.call(this);
					} else {
						toggleAllNodes.call(this, false);
						targetObject.slideDown();
						myHeight = this.minimumGroupHeight();
						highlightBox.call(this);
					}
					targetObject.height(myHeight);
					targetObject.customScrollbar("resize");

					// invoke callbacks
					// update global open/close button
					if (this.options.onBoxStateChange) {
						this.options.onBoxStateChange.call();
					}
					// update global extend/restore icon
					if (this.options.onBoxSizeChange) {
						this.options.onBoxSizeChange.call();
					}
				},

				openMaximized : function() {
					/*
					 * Steps:
					 * 1. expand all the nodes
					 * 2. set box height
					 * 3. open box
					 * 4. update open/close button state
					 * 5. update restore/extend icon
					 * 6. update global restore/exend icon
					 */
					console.log('openMaximized not yet implemented');

					// open box
					if (!this.isOpened()) {
						this.contentHolder.slideDown();
					}

					// expand all tree nodes
					toggleAllNodes.call(this, true);
					// set box height

					if (!this.isOpened()) {
						var myHieght = this.minimumGroupHeight();
						this.contentHolder.height(myHieght);
						$(this.contentHolder).customScrollbar("resize");
					}
					highlightBox.call(this);
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

					dehighlightBox.call(this);
					toggleAllNodes.call(this, false);
					var myHieght = this.minimumGroupHeight();
					this.contentHolder.height(myHieght);
					$(this.contentHolder).customScrollbar("resize");
					this.contentHolder.slideUp();
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
				},

				isOpened : function() {
					return this.root.hasClass('highlight');
				},

				minimumGroupHeight : function() {
					var myActualHeight = this.contentHolder.find('.dynatree-container').height() + 30;
					var myHieght = this.options.boxHeight >= myActualHeight ? myActualHeight : this.options.boxHeight;
					return myHieght;
				}
			};

			function highlightBox() {
				this.root.addClass('highlight');
				this.secondaryHandler.text('Collapse');
			};

			function dehighlightBox() {
				this.root.removeClass('highlight');
				this.secondaryHandler.text('Expand');
			};

			function toggleAllNodes(flag) {
				/*
				 $("#tree").dynatree("getRoot").visit(function(node) {
				 node.expand(true);
				 });*/

				this.contentHolder.dynatree('getRoot').visit(function(node) {
					node.expand(flag);
				});
			}

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

			function resizeBox(flag, node) {
				// TODO implement box resize code
				if (this.options.onBoxSizeChange) {
					this.options.onBoxSizeChange.call();
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
		GroupUIOps.updateOCAllUI();
		// TODO this should lead to toggle of the button state
	});
});

