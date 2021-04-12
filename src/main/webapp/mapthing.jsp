<%@ page import="java.io.*,java.util.*,java.sql.*,com.mysql.jdbc.*"%>
<%@ page import="javax.servlet.http.*,javax.servlet.*"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/sql" prefix="sql"%>
<%@ page pageEncoding="UTF-8"%>
<!DOCTYPE html>

<html>
<head>
<title>shrug</title>
<link rel="icon" href="${pageContext.request.contextPath}/devmech.png"
	type="image/icon type">
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<script src="https://jscharting.com/JSC15/jscharting.js"></script>
<script type="text/javascript" defer><%@include file="/WEB-INF/public/client.js"%></script>
<style><%@include file="/WEB-INF/lib/style.css"%></style>
<link rel="preconnect" href="https://fonts.gstatic.com">
<link
	href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap"
	rel="stylesheet">
<link
	href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@700&display=swap"
	rel="stylesheet">
</head>
<body>
	<div class="head">
		<sql:setDataSource var="snapshot" driver="com.mysql.jdbc.Driver"
			url="jdbc:mysql://localhost:3306/db" user="root" password="pass123" />
		<!--<img src="${pageContext.request.contextPath}/devmech.png" alt="logo">-->
		<button class="menu">Menu</button>
		<button class="job">Job offers</button>
		<button class="contact">Contacts</button>
		<div class="head-userconfig">
			<!-- <img src="${pageContext.request.contextPath}/user.png"> -->
			<h3 class="nick"></h3>
		</div>
	</div>
	<img class="map" style="width: 100%; height: 100%;"
		src="./world-map.png">
	<!-- <img class="mouseExecA" style="position:absolute;width:1%;height:3%;opacity:.7;top:0px;left:0px;" src="${pageContext.request.contextPath}/mouse.png">
		<div class="mouseExecA_2" style="position:absolute;top:0px;left:0px;"><p style="height:10px;width:max-content;vertical-align:center;display:table-cell;">[NAME]</p></div>
		-->
</body>
</html>
