<?php
ob_start();
$pageTitle = "Contact Us - Sousa Bows";
$pageCss = "";
$headJs = "";
$footJs = "";
?>

<?php include 'includes/header.php'; ?>
<?php
//TODO GET IP ADDRESS
//INPUT CLEANING

$hidden = $firstname = $lastname = $email1 = $email2 = $subject = $message = $ipaddress = "";
$hasErrors = "";

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
$firstnameErr = $lastnameErr = $email1Err = $email2Err = $subjectErr = $messageErr = $success = "";
if (isset($_POST["submit"])) {
    if (empty($_POST["firstname"])) {
        $firstnameErr = "Your first name is required";
    } else {
        $firstname = test_input($_POST["firstname"]);
        if (!preg_match("/^[\p{L} '\-]*$/u", $firstname)) {
            $firstnameErr = "Please use only letters, space, - (hyphen) and ' (apostrophe) for your name";
        }
    }

    if (empty($_POST["lastname"])) {
        $lastnameErr = "Your last name is required";
    } else {
        $lastname = test_input($_POST["lastname"]);
        if (!preg_match("/^[\p{L} '\-]*$/u", $lastname)) {
            $lastnameErr = "Please use only letters, space, - (hyphen) and ' (apostrophe) for your name";
        }
    }

    if (empty($_POST["email1"])) {
        $email1Err = "Your email address is required";
    } else {
        $email1 = test_input($_POST["email1"]);
        if (!filter_var($email1, FILTER_VALIDATE_EMAIL)) {
            $email1Err = "The email address you entered is invalid";
            $email1 = $email2 = "";
        }
    }

    if (empty($_POST["email2"])) {
        $email2Err = "Please confirm your email address";
    } else {
        $email2 = test_input($_POST["email2"]);
        if ($email2 != $email1) {
            $email2Err = "The email addresses do not match";
            $email1 = $email2 = "";
        }
    }



    if (empty($_POST["message"])) {
        $messageErr = "Please include your message";
    } else {
        $message = test_input($_POST["message"]);
    }

    if (empty($_POST["subject"])) {
        $subjectErr = "Please include the subject of your message";
    } else {
        $subject = test_input($_POST["subject"]);
    }

    if ($firstname && $lastname && $subject && $email1 && $email2 && $message) {
        $ipaddress = $_SERVER['REMOTE_ADDR'];
        $body = "Name: $firstname $lastname\nE-mail Address: $email2\nSubject: $subject\nMessage:\n$message\nIP Address: $ipaddress\n";
        mail("jasmine@allegromusiccenter.com", 'Sousa Bows Contact Form: ' . $subject, $body, 'From: jasmin23@jasmineenglish.com');
        header("Location: http://jasmineenglish.com/demo/sousa/contact.php?page=thankyou");
        exit();
    } else {
        $success = "";
    }
}
?>
<main>
    <div class='contact_info'>
        <div><div>
                <img src='img/icon_place.png'><span>
                    6869 SW 8<sup>th</sup> Street<br>
                    Miami, FL 33144
                </span>
            </div>
            <div>
                <a href='mailto:info@sousabows.com'>
                    <img src='img/icon_email.png'><span>info@sousabows.com</span>
                </a>
            </div>
            <div>
                <a href='tel:1+3056037775'>
                    <img src='img/icon_phone.png'><span>(305) 603-7775</span>
                </a>
            </div></div>
    </div><!--
    --><div class='contact_form'>
        <?php
        if (isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] == "page=thankyou") {
            echo "<span class='success'>Your message has been sent.</span>";
        }
        ?>

        <form method='post' action='<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>' id='contact_form' class='<?php
        if (isset($_SERVER['QUERY_STRING']) && $_SERVER['QUERY_STRING'] == "page=thankyou") {
            echo "hidden";
        }
        ?>'>
            <span class="error"><?php
                if (isset($firstnameErr)) {
                    echo $firstnameErr;
                }
                ?></span>
            <input type='text' name='firstname' placeholder='First Name' value="<?php
            if (isset($firstname)) {
                echo $firstname;
            }
            ?>">
            <span class="error"><?php
                if (isset($lastnameErr)) {
                    echo $lastnameErr;
                }
                ?></span>
            <input type='text' name='lastname' placeholder='Last Name' value="<?php
            if (isset($lastname)) {
                echo $lastname;
            }
            ?>">
            <div class='form_email'><span class="error"><?php
                if (isset($email1Err)) {
                    echo $email1Err;
                }
                ?></span>
            <input type='text' type='email' name='email1' placeholder='Email' value="<?php
            if (isset($email1)) {
                echo $email1;
            }
            ?>"></div><!--
            --><div class='form_email'><span class="error"><?php
                if (isset($email2Err)) {
                    echo $email2Err;
                }
                ?></span>
            <input type='text' type='email' name='email2' placeholder='Confirm Email' value="<?php
            if (isset($email2)) {
                echo $email2;
            }
            ?>"></div>
            <span class="error"><?php
                if (isset($subjectErr)) {
                    echo $subjectErr;
                }
                ?></span>
            <input type='text' name='subject' placeholder='Subject' value="<?php
            if (isset($subject)) {
                echo $subject;
            }
            ?>">
            <span class="error"><?php
                if (isset($messageErr)) {
                    echo $messageErr;
                }
                ?></span>
            <textarea name='message' placeholder='Your Message'><?php
                if (isset($message)) {
                    echo $message;
                }
                ?></textarea>

            <button type='submit' name='submit' form='contact_form' >Send Message</button>
        </form>
    </div>

</main>
<?php include 'includes/footer.php' ?>