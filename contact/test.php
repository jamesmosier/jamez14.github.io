---
layout: default
title: Contact Test
permalink: /contact/test.php
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




        <div class="contact-row">
            <span class="h5"><em>Or you can send me a message below!</em></span>
        </div>





<form role="form" action="http://forms.brace.io/james@jamesdmosier.com">

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
