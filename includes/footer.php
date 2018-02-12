<footer>
    <div>
        <div>
            <nav>
                <a href='privacy-policy.php'>Privacy Policy</a>
                <a href='terms-of-use.php'>Terms of Use</a>
                <a href='contact.php'>Contact Us</a>
            </nav><!--
            <div class='social'>
                <img src='img/icon_facebook.png' alt='' class='icon'><img src='img/icon_instagram.png' alt='' class='icon'><img src='img/icon_twitter.png' alt='' class='icon'>
            </div>--><!--
            --><div class='ctct-embed-signup subscribe'><!--Begin CTCT Sign-Up Form-->
                <div id="success_message" style="display:none;">
                    <span>Thank you for signing up!</span>
                </div><!--
                --><form data-id="embedded_signup:form" name="embedded_signup" method="POST" action="https://visitor2.constantcontact.com/api/signup">
                    <input data-id="ca:input" type="hidden" name="ca" value="f4a978f2-fe7a-420d-a9a1-ffbb65edae52"><!--
                    --><input data-id="list:input" type="hidden" name="list" value="1300720418"><!--
                    --><input data-id="source:input" type="hidden" name="source" value="EFD"><!--
                    --><input data-id="required:input" type="hidden" name="required" value="list,email"><!--
                    --><input data-id="url:input" type="hidden" name="url" value=""><!--
                    --><div class='subscribe_status' data-id="Email Address:p" ><label data-id="Email Address:label" data-name="email" class="ctct-form-required"></label></div><input placeholder='Email address for Sousa Bows updates' data-id="Email Address:input" type="text" name="email" maxlength="80"><button id='form_subscribe_btn' type="submit" name="subscribe" data-enabled="enabled"><span class='shape'></span><span class='text'>Subscribe</span></button>
                </form><!--End CTCT Sign-Up Form-->
            </div>
        </div>
    </div>
    <div class='copyright'>
        <span>Copyright &copy; <?= date('Y') ?> Sousa&nbsp;Bows Inc.</span>
    </div>
</footer>

<?php
if (!isset($headJquery)) {
    echo "<script type='text/javascript' src ='https://code.jquery.com/jquery-2.1.4.min.js'></script>";
}
?>
<script type="text/javascript" src="scripts/script.min.js"></script>
<?php
if (isset($footJs)) {
    echo $footJs;
}
?>
</div>
</body>

</html>