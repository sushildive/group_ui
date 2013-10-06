//jquery.treeview
;(function($) {
	var extensionMethods = {
        /*
         * retrieve the id of the element
         * this is some context within the existing plugin
         */
        showTime: function(){
            console.log('now is >' +new Date().getTime());
        }
    };

	$.extend(true, $.fn.tWeb.prototype., extensionMethods);
}