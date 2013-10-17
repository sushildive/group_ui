// TODO reset scrolling to top when opening the box
// TODO match box height - some minor difference in the heights of 2 boxes when no initial scrolling
( function($) {
		$.fn.groupUI = function(options, args) {
			var defaultSettings = {
				boxHeight : 120,
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
				this.boxSizeHandler = $(this.root).find('.extend-box-action');
				this.root.data('groupBox', this);
				var _this = this;
				// init dynatree
				$(_this.contentHolder).dynatree({
					onExpand : function(flag, node) {
						resizeBox.call(_this, flag, node);
						toggleExtendRestore.call(_this);
						if (_this.options.onBoxSizeChange) {
							_this.options.onBoxSizeChange.call();
						}
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
				$(this.boxSizeHandler).click(function() {
					_this.resizeBoxOnExtendRestore();
					toggleExtendRestore.call(_this);

					if (_this.options.onBoxSizeChange) {
						_this.options.onBoxSizeChange.call();
					}
				});
			};

			GroupBox.prototype = {
				toggleBox : function() {
					var targetObject = this.contentHolder;

					if (this.isOpened()) {
						dehighlightBox.call(this);
						toggleAllNodes.call(this, false);
						targetObject.height('auto');
						targetObject.customScrollbar("resize");
						targetObject.slideUp();
					} else {
						targetObject.slideDown();
						targetObject.height(this.minimumGroupHeight());
						targetObject.customScrollbar("resize");
						highlightBox.call(this);
					}

					toggleExtendRestore.call(this);

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

				resizeBoxOnExtendRestore : function() {
					var newHeight;
					if (this.boxSizeHandler.hasClass('extendEnabled')) {
						// increase size
						newHeight = this.maximumGroupHeight();
					} else if (this.boxSizeHandler.hasClass('restoreEnabled')) {
						// decrease size
						newHeight = this.minimumGroupHeight();
					}
					this.contentHolder.height(newHeight);
					$(this.contentHolder).customScrollbar("resize");
				},

				openMaximized : function() {
					// open box
					if (!this.isOpened()) {
						this.contentHolder.slideDown();
					}

					// expand all tree nodes
					toggleAllNodes.call(this, true);

					if (!this.isOpened()) {
						// set box height
						this.contentHolder.height(this.minimumGroupHeight());
						// resize the scrollbar
						$(this.contentHolder).customScrollbar("resize");
					}
					// add restore/extend icon
					highlightBox.call(this);
					toggleExtendRestore.call(this);
				},

				closeMinimized : function() {
					// remove restore/extend icon
					dehighlightBox.call(this);
					// collapse all tree nodes
					toggleAllNodes.call(this, false);
					// resize box
					this.contentHolder.height('auto');
					// resize scrolling
					this.contentHolder.customScrollbar("resize");
					// close box
					this.contentHolder.slideUp();
					toggleExtendRestore.call(this);
				},

				maximize : function() {
					/*
					 * Steps:
					 * 1. change height
					 * 2. resize scrollbar
					 * 3. change restore/extend icon
					 * 4. change global restore/extend icon
					 */
					if (this.boxSizeHandler.hasClass('extendEnabled')) {
						this.resizeBoxOnExtendRestore();
						toggleExtendRestore.call(this);
					}
				},

				restore : function() {
					/*
					 * Steps:
					 * 1. change height
					 * 2. resize the scrollbars
					 * 3. change restore/extend icon
					 * 4. change global restore/extend icon
					 */
					if (this.boxSizeHandler.hasClass('restoreEnabled')) {
						this.resizeBoxOnExtendRestore();
						toggleExtendRestore.call(this);
					}
				},

				isOpened : function() {
					return this.root.hasClass('highlight');
				},

				minimumGroupHeight : function() {
					var myActualHeight = this.contentHolder.find('.dynatree-container').height() + GroupConstants.HEIGHT_OFFSET;
					var myHieght = this.options.boxHeight >= myActualHeight ? myActualHeight : this.options.boxHeight;
					return myHieght;
				},

				maximumGroupHeight : function() {
					return this.contentHolder.find('.dynatree-container').height() + GroupConstants.HEIGHT_OFFSET;
				},

				currentVisibleHeight : function() {
					var vpHeight = this.contentHolder.find('.viewport').height();
					var contentHeight = this.maximumGroupHeight();
					return vpHeight >= contentHeight ? contentHeight : vpHeight;
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

			function toggleExtendRestore() {
				if (!this.isOpened()) {
					/*
					 * Hide extend/restore in case of following scenarios:
					 * 1. box closed
					 */
					this.boxSizeHandler.removeClass('restoreEnabled').removeClass('extendEnabled');
				} else if ((this.currentVisibleHeight() <= this.options.boxHeight && !this.contentHolder.find('.scroll-bar.vertical').is(':visible'))) {
					//2. height is less than or equal to max allowed and no scrollbars
					this.boxSizeHandler.removeClass('restoreEnabled').removeClass('extendEnabled');
				} else if (this.contentHolder.find('.scroll-bar.vertical').is(':visible')) {
					/*
					 * Show extend icon in following scenarios:
					 * 1. scrollbar is visible
					 */
					this.boxSizeHandler.removeClass('restoreEnabled').addClass('extendEnabled');
				} else if (this.currentVisibleHeight() > this.options.boxHeight && !this.contentHolder.find('.scroll-bar.vertical').is(':visible')) {
					/*
					 * Show restore icon in following scenarios:
					 * 1. scrollbar is not visible
					 * 2. height is more than max allowed height
					 */
					this.boxSizeHandler.removeClass('extendEnabled').addClass('restoreEnabled');
				}
			};

			function toggleAllNodes(flag) {
				this.contentHolder.dynatree('getRoot').visit(function(node) {
					node.expand(flag);
				});
			}

			return this.each(function() {
				if (options == undefined)
					options = defaultSettings;
				if ( typeof (options) == "string") {
					var gb = $(this).data('groupBox');
					if (gb) {
						gb[options](args);
					}
				} else if ( typeof (options) == "object") {
					options = $.extend(defaultSettings, options);
					new GroupBox(options, $(this));
				} else {
					throw "Invalid type of options";
				}
			});

			function resizeBox(flag, node) {
				var myNewHeight = this.currentVisibleHeight();

				if (myNewHeight <= this.options.boxHeight) {
					this.contentHolder.height(this.minimumGroupHeight());
				} else {
					this.contentHolder.height(myNewHeight);
				}

				this.contentHolder.customScrollbar("resize");

				if (this.options.onBoxSizeChange) {
					this.options.onBoxSizeChange.call();
				}
			}

		};

	}(jQuery));
/**
 * group box operations
 */
var GroupUIOps = {
	updateOCAllUI : function() {
		var closedGroupsExists = ($('.expanding-box').not('.highlight').find('.expanding-box-handler').length > 0);
		var state;
		if (closedGroupsExists) {
			state = GroupConstants.OPEN_ALL_CLASS;
		} else {
			state = GroupConstants.CLOSE_ALL_CLASS;
		}

		GroupUIOps.updateOCAllState(state);
	},

	updateOCAllState : function(state) {
		var oldCls;
		var newBtnLbl;
		if (state == GroupConstants.CLOSE_ALL_CLASS) {
			oldCls = GroupConstants.OPEN_ALL_CLASS;
			newBtnLbl = 'Close All';
		} else {
			oldCls = GroupConstants.CLOSE_ALL_CLASS;
			newBtnLbl = 'Open All';
		}
		$('button[name="toggle-all-groups"]').removeClass(oldCls).addClass(state).text(newBtnLbl);
	},

	updateExtendRestoreState : function() {
		var extendibleBoxExist = ($('.expanding-box').find('.extendEnabled').length > 0);
		var restorableBoxExist = ($('.expanding-box').find('.restoreEnabled').length > 0);

		var newBtnLbl;
		var exReButton = $('a.btn-extend-all');
		if (extendibleBoxExist) {
			// few boxes exist which can be extended
			exReButton.removeClass('restoreEnabled').addClass('extendEnabled');
			newBtnLbl = 'Expand All';
		} else if (restorableBoxExist) {
			// few boxes exist which can be restored
			exReButton.removeClass('extendEnabled').addClass('restoreEnabled');
			newBtnLbl = 'Restore All';
		} else {
			exReButton.removeClass('extendEnabled').removeClass('restoreEnabled');
			newBtnLbl = '';
		}

		if (newBtnLbl != '') {
			exReButton.text(newBtnLbl);
		}
	}
};

var GroupConstants = {
	HEIGHT_OFFSET : 12,
	OPEN_ALL_CLASS : 'oab',
	CLOSE_ALL_CLASS : 'cab'
};

$(function() {
	$('.expanding-box').groupUI({
		onBoxStateChange : function() {
			GroupUIOps.updateOCAllUI();
		},

		onBoxSizeChange : function() {
			GroupUIOps.updateExtendRestoreState();
		},

		boxHeight : 200
	});

	$('button[name="toggle-all-groups"]').click(function() {
		if ($(this).hasClass(GroupConstants.OPEN_ALL_CLASS)) {
			$('.expanding-box').groupUI('openMaximized');
		} else if ($(this).hasClass(GroupConstants.CLOSE_ALL_CLASS)) {
			$('.expanding-box').groupUI('closeMinimized');
		}
		GroupUIOps.updateOCAllUI();
		GroupUIOps.updateExtendRestoreState();
	});

	$('a.btn-extend-all').click(function() {
		if ($(this).hasClass('extendEnabled')) {
			$('.expanding-box').groupUI('maximize');
		} else if ($(this).hasClass('restoreEnabled')) {
			$('.expanding-box').groupUI('restore');
		}
		GroupUIOps.updateExtendRestoreState();
	});
});
