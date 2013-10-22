// TODO match box height - some minor difference in the heights of 2 boxes when no initial scrolling
( function($) {
		$.fn.groupUI = function(options, args) {
			var defaultSettings = {
				boxHeight : 120,
				onBoxStateChange : null,
				onBoxSizeChange : null,
				fetchAvailability : null,
				staticBox : false,
				onSelectElement : null
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

				if (_this.options.staticBox) {
					// in case of static box, do not show footer part
					_this.root.find('.expanding-box-footer').hide();
				}
				// init dynatree
				$(_this.contentHolder).dynatree({
					onExpand : function(flag, node) {
						resizeBox.call(_this, flag, node);
						if (!_this.options.staticBox) {
							toggleExtendRestore.call(_this);
						}
						if (_this.options.onBoxSizeChange) {
							_this.options.onBoxSizeChange.call();
						}
					},

					onActivate : function(node) {
						if (_this.options.onSelectElement && !node.hasChildren()) {
							_this.options.onSelectElement.call(this, node);
						}
					}
				});

				// init scrollbar
				$(_this.contentHolder).customScrollbar({
					preventDefaultScroll : false
				});

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
					resizeBoxOnExtendRestore.call(_this);
					toggleExtendRestore.call(_this);

					if (_this.options.onBoxSizeChange) {
						_this.options.onBoxSizeChange.call();
					}
				});
			};

			GroupBox.prototype = {
				toggleBox : function() {
					var targetObject = this.contentHolder;

					if (isOpened.call(this)) {
						dehighlightBox.call(this);
						toggleAllNodes.call(this, false);
						targetObject.height('auto');
						targetObject.customScrollbar("resize");
						//reset scroll to top.
						targetObject.customScrollbar('scrollToY', 0);
						targetObject.customScrollbar('scrollToX', 0);
						targetObject.slideUp();
					} else {
						targetObject.slideDown();
						targetObject.height(minimumGroupHeight.call(this));
						targetObject.customScrollbar("resize");
						highlightBox.call(this);
						loadAvailability.call(this);
					}

					if (!this.options.staticBox) {
						// not a static box, update the extend/restore button
						toggleExtendRestore.call(this);
					}

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

				openExpanded : function() {
					// open box
					if (!isOpened.call(this)) {
						this.contentHolder.slideDown();
					}

					// expand all tree nodes
					toggleAllNodes.call(this, true);

					if (!isOpened.call(this)) {
						// set box height
						this.contentHolder.height(minimumGroupHeight.call(this));
						// resize the scrollbar
						$(this.contentHolder).customScrollbar("resize");
						// load availability data for unopened boxes
						loadAvailability.call(this);
					}
					// add restore/extend icon
					highlightBox.call(this);
					toggleExtendRestore.call(this);
				},

				closeRestored : function() {
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
						resizeBoxOnExtendRestore.call(this);
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
						resizeBoxOnExtendRestore.call(this);
						toggleExtendRestore.call(this);
					}
				},

				autoOpen : function(elementId, rootGroupId, parentGroupId) {
					//this.contentHolder.dynatree("getTree").activateKey(elementId);
					var tree = this.contentHolder.dynatree("getTree");
					var node = tree.getNodeByKey(elementId);

					if (node != null) {
						// open me
						this.toggleBox();
						node.getParent().expand(true);
						this.contentHolder.customScrollbar('scrollTo', this.root.find('i[keyid="' + elementId + '"]').parent());
					}
				}
			};

			function resizeBoxOnExtendRestore() {
				var newHeight;
				if (this.boxSizeHandler.hasClass('extendEnabled')) {
					// increase size
					newHeight = maximumGroupHeight.call(this);
				} else if (this.boxSizeHandler.hasClass('restoreEnabled')) {
					// decrease size
					newHeight = minimumGroupHeight.call(this);
				}
				this.contentHolder.height(newHeight);
				$(this.contentHolder).customScrollbar("resize");
			};

			function isOpened() {
				return this.root.hasClass('highlight');
			};

			function minimumGroupHeight() {
				var myActualHeight = this.contentHolder.find('.dynatree-container').height() + GroupConstants.HEIGHT_OFFSET;
				var myHieght = this.options.boxHeight >= myActualHeight ? myActualHeight : this.options.boxHeight;
				return myHieght;
			};

			function maximumGroupHeight() {
				return this.contentHolder.find('.dynatree-container').height() + GroupConstants.HEIGHT_OFFSET;
			};

			function currentVisibleHeight() {
				var vpHeight = this.contentHolder.find('.viewport').height();
				var contentHeight = maximumGroupHeight.call(this);
				return vpHeight >= contentHeight ? contentHeight : vpHeight;
			};

			function highlightBox() {
				this.root.addClass('highlight');
				this.secondaryHandler.text(GroupConstants.COLLAPSE);
			};

			function dehighlightBox() {
				this.root.removeClass('highlight');
				this.secondaryHandler.text(GroupConstants.EXPAND);
			};

			function toggleExtendRestore() {
				if (!isOpened.call(this)) {
					/*
					 * Hide extend/restore in case of following scenarios:
					 * 1. box closed
					 */
					this.boxSizeHandler.removeClass('restoreEnabled').removeClass('extendEnabled');
				} else if ((currentVisibleHeight.call(this) <= this.options.boxHeight && !this.contentHolder.find('.scroll-bar.vertical').is(':visible'))) {
					//2. height is less than or equal to max allowed and no scrollbars
					this.boxSizeHandler.removeClass('restoreEnabled').removeClass('extendEnabled');
				} else if (this.contentHolder.find('.scroll-bar.vertical').is(':visible')) {
					/*
					 * Show extend icon in following scenarios:
					 * 1. scrollbar is visible
					 */
					this.boxSizeHandler.removeClass('restoreEnabled').addClass('extendEnabled');
				} else if (currentVisibleHeight.call(this) > this.options.boxHeight && !this.contentHolder.find('.scroll-bar.vertical').is(':visible')) {
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
				var myNewHeight = currentVisibleHeight.call(this);

				if (myNewHeight <= this.options.boxHeight) {
					this.contentHolder.height(minimumGroupHeight.call(this));
				} else {
					this.contentHolder.height(myNewHeight);
				}

				this.contentHolder.customScrollbar("resize");

				if (this.options.onBoxSizeChange) {
					this.options.onBoxSizeChange.call();
				}
			};

			function loadAvailability() {
				// remove current statuses
				if (this.options.fetchAvailability) {
					// fetch availability data
					// apply availability to elements
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
		var newCls;
		var oldCls;
		var newBtnLbl;
		if (closedGroupsExists) {
			newCls = GroupConstants.OPEN_ALL_CLASS;
			oldCls = GroupConstants.CLOSE_ALL_CLASS;
			newBtnLbl = GroupConstants.OPEN_ALL;
		} else {
			newCls = GroupConstants.CLOSE_ALL_CLASS;
			newBtnLbl = GroupConstants.CLOSE_ALL;
			oldCls = GroupConstants.OPEN_ALL_CLASS;
		}

		$('button[name="toggle-all-groups"]').removeClass(oldCls).addClass(newCls).text(newBtnLbl);
	},

	updateExtendRestoreState : function() {
		var extendibleBoxExist = ($('.expanding-box').find('.extendEnabled').length > 0);
		var restorableBoxExist = ($('.expanding-box').find('.restoreEnabled').length > 0);

		var newBtnLbl;
		var exReButton = $('a.btn-extend-all');
		if (extendibleBoxExist) {
			// few boxes exist which can be extended
			exReButton.removeClass('restoreEnabled').addClass('extendEnabled');
			newBtnLbl = GroupConstants.MAXIMIZE_ALL;
		} else if (restorableBoxExist) {
			// few boxes exist which can be restored
			exReButton.removeClass('extendEnabled').addClass('restoreEnabled');
			newBtnLbl = GroupConstants.RESTORE_ALL;
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
	CLOSE_ALL_CLASS : 'cab',
	MAXIMIZE_ALL : 'Expand All',
	RESTORE_ALL : 'Restore All',
	OPEN_ALL : 'Open All',
	CLOSE_ALL : 'Close All',
	COLLAPSE : 'Collapse',
	EXPAND : 'Expand'
};
