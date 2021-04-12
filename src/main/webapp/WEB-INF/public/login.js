let db = false;
let socket;

function init() {
	/*if (window.location.protocol == 'http:') {
		socketConnect((window.location.protocol === "https:" ? "wss:" : "ws:") + "//" + window.location.host + window.location.pathname + "message-endpoint);
	} else {
		socketConnect((window.location.protocol === "https:" ? "wss:" : "ws:") + "//" + window.location.host + window.location.pathname + "message-endpoint");
	}*/
	const url = (window.location.protocol === "https:" ? "wss:" : "ws:") + "//" + window.location.host + window.location.pathname + "server";
	socketConnect(url);
};

$("html").on("click", "button", function(evt) {
	var btn = $(evt.currentTarget);
	var x = evt.pageX - btn.offset().left;
	var y = evt.pageY - btn.offset().top;

	const ap = $("<span/>").appendTo(btn).css({
		left: x,
		top: y
	});
	setTimeout(function() { ap.remove(); }, 1000);
	$(btn[0].className);
});

let loading = false

function socketConnect(host) {
	if ('WebSocket' in window) {
		socket = new WebSocket(host);
	} else if ('MozWebSocket' in window) {
		socket = new MozWebSocket(host);
	} else {
		console.log('Error: WebSocket is not supported by this browser.');
		return;
	}
	socket.onopen = function() {
		socketStateOnline = true
		console.log("Socket: stream opened");
	}
	socket.onclose = function() {
		console.log('Info: WebSocket closed.');
		socketStateOnline = false;
	};
	let firsttime = false

	socket.onmessage = function(message) {
		console.log(message.data);
		if (message.data.includes("200")) {
			loading = false;
			const nick = message.data.split(", ")[1];
			document.querySelector(".classa button").style.cssText = "background-color:#ADFF2F;padding-top:500px;";
			document.querySelector(".classa button .thefunn").innerHTML = "Success!";
			document.querySelector(".spinner").style.cssText = "opacity:0;position:absolute;top:30%;";
			setTimeout(function() {
				location.href = "./mapthing.jsp?name=" + nick;
			}, 2000);
			db = true;
		} else if (message.data.includes("404") && firsttime == true) {
			loading = false
			document.querySelector(".spinner").style.cssText = "opacity:0;position:absolute;top:30%;";
			document.querySelector(".classa button .thefunn").innerHTML = "ERR::PASSWORD_CHECK_FAIL";
			document.querySelector(".classa button .thefunn").style.cssText = "position:absolute;top:25%;left:16%;font-size:25px;";
			let querry = document.querySelector(".classa button");
			setTimeout(function() {
				querry.style["padding-top"] = "0";
				document.querySelector(".classa button .thefunn").remove();
				document.querySelector(".classa button p").style.opacity = "1";
				querry.className = "btn-asp";
				db = false;
			}, 2000);
			querry.className = "btn-fail";
		}
		firsttime = true
	};
}

window.onload = function() {
	init();
	console.log("Document Ready.")
	document.querySelector(".classa button").addEventListener("click", () => {
		if (db == false) {
			loading = true;
			const val = document.querySelector(".classa .nickname").value;
			const val2 = document.querySelector(".classa .password").value;
			if (val.length < 1 || val2.length < 1) { return; };
			db = true
			setTimeout(function() { socket.send("content:logIn;" + val + ", " + val2); }, Math.floor(Math.random() * 2000));
			let querry = document.querySelector(".classa button")
			querry.style["padding-top"] = "500px";
			document.querySelector(".classa button p").style.opacity = "0";
			querry.className = "btn-load";
			let thingInt = 1;
			let txt = "...";
			const thing = document.createElement("p");
			let inter;
			inter = setInterval(function() {
				if (loading == false) return clearInterval(inter);
				switch (thingInt) {
					case 1: {
						thingInt += 1;
						txt = "Please wait.";
						thing.innerHTML = txt;
						break;
					}
					case 2: {
						thingInt += 1;
						txt = "Please wait..";
						thing.innerHTML = txt;
						break;
					}
					case 3: {
						thingInt += 1;
						txt = "Please wait...";
						thing.innerHTML = txt;
						break;
					}
					case 4: {
						thingInt = 1;
						break;
					}
				}
				thing.innerHTML = txt;
			}, 300);
			thing.className = "thefunn";
			thing.style.cssText = "position:absolute;top:25%;left:36%;font-size:25px;";
			querry.append(thing);
			document.querySelector(".spinner").style.cssText = "opacity:1;position:absolute;top:30%;";
		}
	})
}
