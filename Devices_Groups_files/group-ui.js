var boxConfig = {
	boxDim : {
		maxHeight : 80
	}
};

var gui = {
	extendMe : function() {
	},

	restoreMe : function() {
	},

	toggleDisplay : function() {
	}
};

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
		alert('resizeMax yet to implement');
	},

	/**
	 * Show group box
	 */
	openUp : function() {
		$(this).slideDown();
	},

	/**
	 * Hide group box
	 */
	closeDown : function() {
		$(this).slideUp();
	},

	toggleBasicGroupDisplay : function() {
		var myDad = $(this).parent();
		var targetObject = myDad.find('.expanding-box-dropdown');
		if (myDad.hasClass('highlight')) {
			targetObject.closeDown();
			myDad.removeClass('highlight');
		} else {
			targetObject.openUp();
			myDad.addClass('highlight');
		}
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

		$(this).updateOCAllState(state);
	},

	isOpenAll : function() {
		return $('button[name="toggle-all-groups"]').hasClass('oab');
	},

	updateOCAllState2 : function() {
		var closedGroupsExists = ($('.expanding-box').not('.highlight').find('.expanding-box-handler').length > 0);
		var state;
		if (closedGroupsExists) {
			state = 'oab';
		} else {
			state = 'cab';
		}

		$(this).updateOCAllState(state);
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

/*
 (function($) {
 $.fn.groupUI = function() {
 };
 })(jQuery);*/

$(function() {
	$.extend($('.expanding-box-handler'), boxConfig);
	$(".expanding-box-dropdown").dynatree();
	$(".demo").customScrollbar();
	$(".demo").customScrollbar("resize");

	jQuery.fn.extend(boxOperations);

	$('.expanding-box-handler').click(function() {
		$(this).toggleBasicGroupDisplay();
		boxOperations.updateOCAllState2();
	});
	$('.expanding-box-action').click(function() {
		$(this).parent().parent().find('.expanding-box-handler').click();
	});

	$('button[name="toggle-all-groups"]').click(function() {
		$(this).toggleAllGroupDisplay();
	});
});
