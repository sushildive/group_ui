( function($) {
		$.fn.groupUI = function(options) {
			var defaultSettings = {
				boxHeight : 150,
				onBoxStateChange : null,
				onBoxSizeChange : null

			};

			var settings = $.extend(defaultSettings, options);

			var GroupBox = function(opts, ele) {
				this.options = opts;
				this.root = $(ele);
				this.primaryHandler = $(ele).find('.expanding-box-handler');
				this.secondaryHandler = $(ele).find('.expanding-box-action');
				this.contentHolder = $(ele).find('.expanding-box-dropdown');
				this.root.data("groupBox", this);
				$(ele).find('.expanding-box-dropdown').dynatree({
					onExpand : function(flag, node) {
						resizeBox(flag, node, boxComponent);
					}
				});
				// init scrollbar, dynatree
				var _this = this;
				$(ele).find('.expanding-box-dropdown').customScrollbar();
				$(ele).find('.expanding-box-handler').click(function() {
					console.log(this);
					_this.toggleBox();
				});

				$(ele).find('.expanding-box-action').click(function() {
					// click to primary box handler
					boxComponent.primaryHandler.click();
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

					if (settings.onBoxStateChange) {
						settings.onBoxStateChange.call();
					}
				},
				openMaximized : function() {
					// TODO implement
					console.log('openMaximized not yet implemented');
					console.log(this);
				},
				closeMinimized : function() {
					// TODO implement
					console.log('closeMinimized not yet implemented');
					console.log(this);
				}
			};

			return this.each(function() {
				if (options == undefined)
					options = defaultSettings;
				if ( typeof (options) == "string") {
					var gb = $(this).data("groupbox");
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

		$.fn.groupUI.openMaximized = function() {
			// TODO implement open all feature
			console.log('openMaximized not yet implemented');
			console.log(this);
		};

		$.fn.groupUI.closeMinimized = function() {
			// TODO implement close all
			console.log('closeMinimized not yet implemented');
		};

		/*
		 $("#tree").dynatree("getRoot").visit(function(node) {
		 node.expand(true);
		 });*/

	}(jQuery));
/**
 * group box operations
 */
var boxOperations = {
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
		if (boxOperations.isOpenAll()) {
			// open all
			$('.expanding-box').not('.highlight').find('.expanding-box-handler').toggleBasicGroupDisplay();
			state = 'cab';
		} else {
			// close all
			$('.expanding-box.highlight').find('.expanding-box-handler').toggleBasicGroupDisplay();
			state = 'oab';
		}

		boxOperations.updateOCAllState(state);
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

		boxOperations.updateOCAllState(state);
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
			boxOperations.updateOCAllUI();
		}
	});
	$('button[name="toggle-all-groups"]').click(function() {
		$('.expanding-box').groupUI('openMaximized');
	});
});

