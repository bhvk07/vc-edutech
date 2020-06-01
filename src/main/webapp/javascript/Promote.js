$(document).ready(function() {
  $('#multi_div_select').multiselect({
    includeSelectAllOption : true,
      enableFiltering: true
//    nonSelectedText: 'Select an Option'
  });
      $('#multi_status_select').multiselect({
    includeSelectAllOption : true,
      enableFiltering: true

});
});
$(function() {
		var Accordion = function(el, multiple) {
				this.el = el || {};
				this.multiple = multiple || false;

				var links = this.el.find('.content-entry .title-promote');
				links.on('click', {
						el: this.el,
						multiple: this.multiple
				}, this.dropdown)
		}

		Accordion.prototype.dropdown = function(e) {
				var $el = e.data.el;
                /*alert(e.data);*/
				$this = $(this),
						$next = $this.next();

				$next.slideToggle();
				$this.parent().toggleClass('open');

				if (!e.data.multiple) {
						$el.find('.accordion-content').not($next).slideUp().parent().removeClass('open');
				};
		}
		var accordion = new Accordion($('.accordion-container'), false);
});

$('.title-promote').on('click', function (event) {
  if (!$(event.target).closest('#accordion').length) {
    $this.parent().toggleClass('open');
  }
});    
    
//});
