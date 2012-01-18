$( function() {
	$('.alert-message > .close').click(function () {
		$(this).parent().fadeOut('slow');
	});
	$(".ui-date").datepicker().datepicker( "option", "dateFormat", "dd/mm/yy" );
} );
