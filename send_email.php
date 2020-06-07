<?php 
/* 
    simple php script to send data from form to email
*/

 // Import PHPMailer classes
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\Exception;

 // Load PHPMailer files
 require 'PHPMailer/src/Exception.php';
 require 'PHPMailer/src/PHPMailer.php';
 require 'PHPMailer/src/SMTP.php';

 // Enable debugging
 $mail = new PHPMailer(false);

 $response = array(
     "code" => 0,
     "status" => "no_data",
     "message" => "No data was received."
 );

 //getting and setting $_GETs

 if(isset($_GET) && count($_GET) > 0){
    $response['code'] = 1;
    $response['status'] = "get_found";
    $response['message'] = "$_GET data found.";

    if(isset($_GET['f-name']) && $_GET['f-name'] != ""){
        $first_name = $_GET['f-name'];
    }else{
        $response['code'] = 2;
        $response['status'] = "data_missing";
        $response['message'] = "cannot find f-name";
        echo json_encode($response);
    }

    if(isset($_GET['l-name']) && $_GET['l-name'] != ""){
        $last_name = $_GET['l-name'];
    }else{
        $response['code'] = 2;
        $response['status'] = "data_missing";
        $response['message'] = "cannot find l-name";
        echo json_encode($response);
    }

    if(isset($_GET['title']) && $_GET['title'] != ""){
        $title = $_GET['title'];
    }else{
        $response['code'] = 2;
        $response['status'] = "data_missing";
        $response['message'] = "cannot find title";
        echo json_encode($response);
    }

    if(isset($_GET['address']) && $_GET['address'] != ""){
        $address = $_GET['address'];
    }else{
        $response['code'] = 2;
        $response['status'] = "data_missing";
        $response['message'] = "cannot find address";
        echo json_encode($response);
    }

    if(isset($_GET['timeslot']) && $_GET['timeslot'] != ""){
        $timeslot = $_GET['timeslot'];
    }else{
        $response['code'] = 2;
        $response['status'] = "data_missing";
        $response['message'] = "cannot find timeslot";
        echo json_encode($response);
    }

    if(isset($_GET['email']) && $_GET['email'] != ""){
        $email = $_GET['email'];
    }else{
        $response['code'] = 2;
        $response['status'] = "data_missing";
        $response['message'] = "cannot find email";
        echo json_encode($response);
    }

    
 }else{
    echo json_encode($response);
 }
 try {
     // Debug SMTP connection
     $mail->SMTPDebug = 0;

     // Enable SMTP
     $mail->isSMTP();

     // Enable SMTP Authentication
     $mail->SMTPAuth = true;

     // Server hostname
     $mail->Host = 'in-v3.mailjet.com';

     // Server username
     $mail->Username = 'xxx';

     // Server password
     $mail->Password = 'xxx';

     // Server Port
     $mail->Port = 587;

     // Enable encryption
     $mail->SMTPSecure = 'tls';

     // Sender address
     $mail->setFrom('richie@hudsondigital.co.uk');

     // Recipient address
     $mail->addAddress($email);

     // Enable HTML
     $mail->isHTML(true);

     // Message subject
     $mail->Subject = 'Conformation of appointment';

     
     // Message body (HTML)
     $mail->Body    = "Dear {$first_name} {$last_name},<br/><br/>
     You have booked your appointment with <strong>{$title}</strong>!<br/>
     at {$_GET['address']} between {$timeslot}";

     // Message body (Plaintext)
     $mail->AltBody = "Dear {$first_name} {$last_name},<br/><br/>
     You have booked your appointment with <strong>{$title}</strong>!<br/>
     at {$_GET['address']} between {$timeslot}";

     // Send the message
     $mail->send();

    $response['code'] = 4;
    $response['status'] = "email_sent";
    $response['message'] = "email sent successfully.";
    echo json_encode($response);

 } catch (Exception $e) {
     // Display error
    $response['code'] = 3;
    $response['status'] = "email_failed";
    $response['message'] = "email failed to send.";
    echo json_encode($response);
 }

?>