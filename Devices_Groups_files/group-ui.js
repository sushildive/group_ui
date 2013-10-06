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
		$(this).customScrollbar("resize");
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
	});
	$('.expanding-box-action').click(function() {
		$(this).parent().parent().find('.expanding-box-handler').click();
	});
});
