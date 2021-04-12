<%@ page import="java.io.*,java.util.*,java.sql.*,com.mysql.jdbc.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<!DOCTYPE html>

<html>
<head>
<title>shrug</title>
<!--  <link rel="icon" href="${pageContext.request.contextPath}/devmech.png"
	type="image/icon type"> -->
	<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<link rel="shortcut icon" href="#">
		<script type="text/javascript">$.ajax({uri:"./WEB-INF/script.php"})</script>
	<script src='https://kit.fontawesome.com/a076d05399.js' crossorigin='anonymous'></script>
<script type="text/javascript" defer><%@include file="/WEB-INF/public/login.js"%></script>
<style><%@include file="/WEB-INF/lib/login.css"%></style>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link
	href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap"
	rel="stylesheet">
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap"
	rel="stylesheet">
</head>
<body>
	  <div class="classa">
	    <p class="thefu">Log in</p>
	  	<input type="text" class="nickname" placeholder="NICKNAME" required>
      <div class="line"></div>
	  	<input type="password" class="password" placeholder="HESLO" required>
      <div class="line"></div>
	  	<!-- <i class='fas fa-user-alt' style='font-size:36px'></i> -->
	  	<button class="btn-asp" style="padding-top:0;"><p style="opacity:1;">Turn in</p></button>
      	<!--<i class="fa fa-user"></i> -->
	  </div>
      <i class="spinner" style="opacity:0;"></i>
</body>
</html>
