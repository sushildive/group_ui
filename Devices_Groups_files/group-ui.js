$(function() {
	$('.expanding-box').groupUI({
		onBoxStateChange : function() {
			GroupUIOps.updateOCAllUI();
		},

		onBoxSizeChange : function() {
			GroupUIOps.updateExtendRestoreState();
		},

		boxHeight : 200,

		onSelectElement : function(eid, node) {
			// TODO implement element selection action
			alert('onSelectElement>>' + node);
		},

		fetchAvailability : function(grpId, responseHandlerCB, errorHandler) {
			// TODO implement availability fetching code
			// Return availability json to caller
			var _CONTEXT_ROOT = 'http://localhost:8080/reporting-portal';
			var URI = _CONTEXT_ROOT + "/fetchServiceStatus.action?" + 'groupId=' + grpId + "&auth_token=johns_token" + "&rnd=" + new Date().getTime();
			//'file:///D:/Projects/group_ui/group.response.json'
			var _this = this;
			$.ajax({
				url: URI,
				dataType: "json",
				type : "GET",
				success : function(data) {
					responseHandlerCB.call(_this, data);
				},
				error : function(data, jqXHR, exception) {
					errorHandler.call(_this, data);
				}
			});
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

	//$('.expanding-box').groupUI('autoOpen', '000000004814');
});

/*$(function() {
 $('.expanding-box').groupUI({
 staticBox : true,
 boxHeight : 340
 });
 $('.expanding-box').groupUI('autoOpen', '000000004814');
 });*/
