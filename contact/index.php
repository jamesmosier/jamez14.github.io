---
layout: default
title: Contact
permalink: /contact/
---

<?php

function spamcheck($field)
{
    $field = filter_var($field, FILTER_SANITIZE_EMAIL);
    
    if (filter_var($field, FILTER_VALIDATE_EMAIL)) {
        return TRUE;
    }
    
    else {
        return FALSE;
    }
}

if (isset($_POST['email'])) {
    
    $mailcheck = spamcheck($_POST['email']);
    if ($mailcheck == FALSE) {
        $submit_message = "Please input your information again.";
    } else {
	if($_POST['emailaddress'] != '') {
		echo "Woops, didn't submit.";
	}
        $fullname    = $_POST['fullname'];
        $email   = $_POST['email'];
        $phone   = $_POST['phone'];
        $message = $_POST['message'];
        $headers = "From: James D Mosier Portfolio Site";
        $subject = "From: $fullname";
        
        $msg = "Email: $email\nPhone Number: $phone\nMessage: $message";
        mail("james@jamesdmosier.com", $subject, $msg, $headers);
        
        //mail("james@jamesdmosier.com", "From: $name", "Email: $email", "Phone Number: $phone", "Message: $message");
        //mail("james@jamesdmosier.com", $subject, $email, $phone, $message, $headers);
        
        $submit_message = "Thank you for your message, I will get back to you very soon!";
    }
}
?>

<?php if( $submit_message ){ ?>
<script type="text/javascript">
    jQuery(window).load(function(){
        //alert('<?php echo $submit_message; ?>');                
        $('.alert-success').show();
    });
</script>
<?php } ?>





<div id="map"></div>


<div class="form-wrapper">

	<div class="form-underlay"></div>

	<div class="contact-info">
		<h3 class="hidden-phone">Hi! You can contact me a few different ways...</h3>

		<div class="contact-row">
			<span class="contact-mode">Email me</span><span class="contact-data"> ... <a href="mailto:james@jamesdmosier.com">james@jamesdmosier.com</a></span>
		</div>

		<div class="contact-row">
			<span class="contact-mode">Find me being social somewhere</span> ...
			<ul class="social-list">
				<li><a href="https://github.com/jamez14" target="_blank" title="GitHub"><i class="fa github-icon"></i></a></li>	
				<li><a href="https://twitter.com/jamez14" target="_blank" title="Twitter"><i class="fa twitter-icon"></i></a></li>
				<li><a href="https://instagram.com/jamez1414" target="_blank" title="Instagram"><i class="fa instagram-icon"></i></a></li>
				<li><a href="http://lnkd.in/3meEdA" target="_blank" title="LinkedIn"><i class="fa linkedin-icon"></i></a></li>	
			</ul>
		</div>

		<div class="contact-row hidden-phone">
			<span class="h5"><em>Or you can send me a message below!</em></span>
		</div>

	</div>

	<form role="form" action="<?php echo $_SERVER['REQUEST_URI']; ?>" method="POST" enctype="multipart/form-data">

		<div class="form-row">
			<label for="name">name:
				<input type="text" name="fullname" class="contact-input" id="form_name">
			</label>
		</div>

		<div class="form-row email-send" id="emailaddressfieldonform">
			<label for="emailaddresslabelfor">Email address</label>
			<input type="text" class="form-control" name="emailaddress" id="emailaddresslabelfor" placeholder="email">
		</div>

		<div class="form-row">
			<label for="email">email:
				<input type="email" name="email" class="contact-input" id="form_email">
			</label>
		</div>

		<div class="form-row">
			<label for="phone">phone:
				<input type="tel" name="phone" class="contact-input" id="form_phone">
			</label>
		</div>

		<div class="form-row">
			<label for="message">message:
			<textarea name="message" class="contact-input input-textarea" id="form_message"></textarea>
			</label>
		</div>

		<div class="form-row text-center">
			<button type="submit" class="button-hollow">send</button>
		</div>
	</form>
</div>


 <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyASm3CwaK9qtcZEWYa-iQwHaGi3gcosAJc&sensor=false"></script>

<script type="text/javascript">

	$().gMap();

</script>