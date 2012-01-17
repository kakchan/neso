function isEmail( val ) {
	return /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test( val );
}

function validateField( form, type ) {
	var val = form[ type.name ].value;
	if ( type.min_length && val.length < type.min_length ) {
		alert( "'" + type.name + "' has to be at least " + type.min_length + " characters" );
		return false;
	} else if ( type.presence && val.length === 0 ) {
		alert( "'" + type.name + "' is not presence" );
		return false;
	} else if ( type.match_with && form[ type.match_with ].value !== val ) {
		alert( "'" + type.name + "' does not match with '" + type.match_with + "'" );
		return false;
	} else if ( type.email && !isEmail(val)) {
		alert( "'" + type.name + "' is not a valid e-mail address" );
		return false;
	}
	return true;
}

function validateForm( form, types ) {
	for ( var i=0; i < types.length; i++) {
		if ( !validateField( form, types[ i ] ) ) {
			return false;
		}
	}
	return true;
}

function user_update_click() {
	var form = document.forms[0],
			isValid = validateForm( form, [
				{ name: "username", min_length: 8 },
				{ name: "password", min_length: 8 },
				{ name: "confirm_password", presence: true },
				{ name: "password", match_with: "confirm_password" },
				{ name: "full_name", presence: true },
				{ name: "email", presence: true },
				{ name: "email", email: true }
			] );
	isValid && form.submit();
}