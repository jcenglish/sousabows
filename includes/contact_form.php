<?php

//TODO GET IP ADDRESS
//
error_reporting(E_ALL);
ini_set('error_reporting', E_ALL);
//INPUT CLEANING


$firstname = $lastname = $email1 = $email2 = $subject = $message = $ipaddress = "";
$hasErrors = false;

//if ($_SERVER["REQUEST_METHOD"] == "POST") {
//    $firstname = test_input($_POST["firstname"]);
//    $lastname = test_input($_POST["firstname"]);
//    $email = test_input($_POST["email"]);
//    $website = test_input($_POST["website"]);
//    $comment = test_input($_POST["comment"]);
//    $gender = test_input($_POST["gender"]);
//}

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = str_replace("&#039;", "'", htmlspecialchars($data, ENT_QUOTES));
    return $data;
}

//ERROR HANDLING AND VALIDATION
$firstnameErr = $lastnameErr = $email1Err = $email2Err = $subjectErr = $messageErr = $ipaddressErr = "";
if ($_POST['submit']) {
    if (empty($_POST["firstname"])) {
        $firstnameErr = "Your first name is required";
        $hasErrors = true;
    } else {
        $firstname = test_input($_POST["firstname"]);
        $hasErrors = false;
        if (!preg_match("/^[\p{L} '\-]*$/u", $firstname)) {
            $firstnameErr = "Please use only letters, space, - (hyphen) and ' (apostrophe) for your name";
            $hasErrors = true;
        }
    }

    if (empty($_POST["lastname"])) {
        $lastnameErr = "Your last name is required";
        $hasErrors = true;
    } else {
        $lastname = test_input($_POST["lastname"]);
        $hasErrors = false;
        if (!preg_match("/^[\p{L} '\-]*$/u", $lastname)) {
            $lastnameErr = "Please use only letters, space, - (hyphen) and ' (apostrophe) for your name";
            $hasErrors = true;
        }
    }

    if (empty($_POST["email1"])) {
        $email1Err = "Your email address is required";
        $hasErrors = true;
    } else {
        $email1 = test_input($_POST["email1"]);
        $hasErrors = false;
        if (!filter_var($email1, FILTER_VALIDATE_EMAIL)) {
            $email1Err = "The email address you entered is invalid";
            $hasErrors = true;
        }
    }

    if (empty($_POST["email2"])) {
        $email2Err = "Please type your email address again to confirm it";
        $hasErrors = true;
    } else {
        $email2 = test_input($_POST["email2"]);
        $hasErrors = false;
        if (!filter_var($email2, FILTER_VALIDATE_EMAIL)) {
            $email2Err = "The email address you entered is invalid";
            $hasErrors = true;
        }
    }

    if ($_POST["email2"] != $_POST["email1"]) {
        $email2Err = "The email addresses do not match";
        $hasErrors = true;
    } else {
        $email2 = test_input($_POST["email2"]);
        $hasErrors = false;
    }

    if (empty($_POST["message"])) {
        $messageErr = "Please include your message";
        $hasErrors = true;
    } else {
        $message = test_input($_POST["message"]);
        $hasErrors = false;
    }

    if (empty($_POST["subject"])) {
        $messageErr = "Please include the subject of your message";
        $hasErrors = true;
    } else {
        $message = test_input($_POST["message"]);
        $hasErrors = false;
    }

    if ($hasErrors == true) {
        ?>
        <span class='error'>There was a problem with your message. Please fill out the required fields.</span>
        <?php

    } else {
        mail("jasmine@allegromusiccenter.com", $subject, $message, 'From: jasmin23@jasmineenglish.com');
        echo 'message sent';
    }
}
?>

