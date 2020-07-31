(function() {
    const durationSeconds = document.aws_google_auth_config.durationSeconds;
    const principalArn = document.aws_google_auth_config.principalArn;

    if (principalArn.length == 0) {
	alert("Set PrincipalArn in aws-google-auth extension options!");
	return;
    }
    
    const assertion = document.getElementsByName("SAMLResponse")[0].value;
    // console.log(assertion);

    // Only get credentials for selected role, or get credentials for all roles
    role_buttons = Array.from(document.getElementsByClassName("saml-radio"));
    checked = role_buttons.filter(rb => rb.checked)
    var roles;
    if (checked.length > 0) {
	roles = checked.map(a => a.value);
    } else {
	roles = role_buttons.map(a => a.value);
    }
    // console.log(roles);

    roles.forEach(role => {
	var sts = new AWS.STS();
	var params = {
	    DurationSeconds: durationSeconds,
	    RoleArn: role,
	    PrincipalArn: principalArn,
	    SAMLAssertion: assertion
	};
	sts.assumeRoleWithSAML(params, function(err, data) {
	    if (err) { console.log(err, err.stack); }
	    else {
		// console.log(data);
		const akey = data.Credentials.AccessKeyId;
		const skey = data.Credentials.SecretAccessKey;
		const stok = data.Credentials.SessionToken;

		msg = "# " + role + "<br />";
		msg += "export AWS_ACCESS_KEY_ID=" + akey + "<br />export AWS_SECRET_ACCESS_KEY=" + skey + "<br />export AWS_SESSION_TOKEN=" + stok;
		msg += "<br /><br />";
		document.write(msg);
	    }
	});
    });
})();
