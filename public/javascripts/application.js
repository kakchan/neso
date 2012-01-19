$( function() {
	$('.alert-message > .close').click(function () {
		$(this).parent().fadeOut('slow');
	});
	$("#published_date")
			.datepicker()
			.datepicker( "option", "dateFormat", "dd/mm/yy" )
			.val( $("#published_date").attr( "date" ) );
} );
