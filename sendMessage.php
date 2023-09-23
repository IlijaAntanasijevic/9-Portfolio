<?php
 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\Exception;
if($_SERVER["REQUEST_METHOD"] == "POST"){
  require 'vendor/autoload.php';

  $name = $_POST["name"];
  $email = $_POST["email"];
  $subject = $_POST["subject"];
  $message = $_POST["message"];

  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->Host = 'smtp.gmail.com';
  $mail->SMTPAuth = true;
  $mail->Username = 'ilija0125@gmail.com';
  $mail->Password = 'igom vfrx zmda gmwu';
  $mail->SMTPSecure = 'ssl';
  $mail->Port = 465;



  $mail->setFrom($email, $name); // User email / name
  $mail->addAddress('ilija0125@gmail.com', 'Ilija Antanasijevic');
  $mail->Subject = $subject;
  $mail->Body = "From: $email" . "\n" . "\n" . $message;

   /*
     try {
        $mail->send();
    }
    catch (Exception $ex){
        http_response_code(500);
        var_dump($ex->getMessage());
        die;
    }
    */

   if (!$mail->send()) {
      http_response_code(500);
      echo 'Error: ' . $mail->ErrorInfo;
  } else {
      http_response_code(200);
  }
}
else {
  http_response_code(404);
}