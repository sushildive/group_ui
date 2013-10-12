( function($) {
		$.fn.groupUI = function(options) {
			var defaultSettings = {
				boxHeight : 150,
				onBoxStateChange : null,
				onBoxSizeChange : null

			};

			var settings = $.extend(defaultSettings, options);

			return this.each(function() {
				var boxComponent = {
					root : $(this),
					primaryHandler : $(this).find('.expanding-box-handler'),
					secondaryHandler : $(this).find('.expanding-box-action'),
					contentHolder : $(this).find('.expanding-box-dropdown')
				};

				$(this).find('.expanding-box-dropdown').dynatree({
					onExpand : function(flag, node) {
						resizeBox(flag, node, boxComponent);
					}
				});
				// init scrollbar, dynatree
				$(this).find('.expanding-box-dropdown').customScrollbar();
				$(this).find('.expanding-box-handler').click(function() {
					toggleBox(boxComponent);
				});

				$(this).find('.expanding-box-action').click(function() {
					// click to primary box handler
					boxComponent.primaryHandler.click();
				});
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

			function resizeBox(flag, node, boxObject) {
				// TODO implement box resize code
				if (settings.onBoxSizeChange) {
					settings.onBoxSizeChange.call();
				}
			}

		};

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
});
