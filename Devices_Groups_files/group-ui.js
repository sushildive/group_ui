$(function() {
	$('.expanding-box').groupUI({
		onBoxStateChange : function() {
			GroupUIOps.updateOCAllUI();
		},

		onBoxSizeChange : function() {
			GroupUIOps.updateExtendRestoreState();
		},

		boxHeight : 200,

		onSelectElement : function(eid) {
			// TODO implement element selection action
		},

		fetchAvailability : function(data) {
			// TODO implement availability fetching code
			// Return availability json to caller
		}
	});

	$('button[name="toggle-all-groups"]').click(function() {
		if ($(this).hasClass(GroupConstants.OPEN_ALL_CLASS)) {
			$('.expanding-box').groupUI('openExpanded');
		} else if ($(this).hasClass(GroupConstants.CLOSE_ALL_CLASS)) {
			$('.expanding-box').groupUI('closeRestored');
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

	$('.expanding-box').groupUI('autoOpen', '000000004814');
});

/*$(function() {
 $('.expanding-box').groupUI({
 staticBox : true,
 boxHeight : 340
 });
 $('.expanding-box').groupUI('autoOpen', '000000004814');
 });*/
