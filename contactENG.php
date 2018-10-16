<?php
header("Content-Type: text/html; charset=UTF-8");

if(empty($_POST['email'])||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	     echo "<script>alert('Something went wrong. Please try again.')
       history.go(-1);</script>";
	return false;
   }


$address = strip_tags(htmlspecialchars($_POST['email']));
$to = "940822tw@gmail.com";
$subject = "FROM:$address"; // 메일 제목에 해당하는 부분
$content = "$address";
$reply = "Reply-To:$address\r"; // 답장 주소
$mailResult = mail($to,"New",$content,$reply,$address);

    if($mailResult == true){
       echo "
       <script>
       alert('Thank you :)')
       history.go(-1);
       </script>
       ";
 exit;}else{
echo "$address";
echo "$to";
echo $reply;
echo $mailResult;
}
?>
