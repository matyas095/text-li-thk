"use strict";

//const socket = new WebSocket('ws://' + window.location.host + '/skola_ang/admin');

console.log("Loading completed");

let socket;
let socketStateOnline = false;
let nickname;

function socketConnect(host) {
	if ('WebSocket' in window) {
		socket = new WebSocket(host);
	} else if ('MozWebSocket' in window) {
		socket = new MozWebSocket(host);
	} else {
		console.log('Error: WebSocket is not supported by this browser.');
		return;
	}

	nickname = window.location.href.split("=")[1]
	document.querySelector(".head .nick").innerHTML = nickname;

	socket.onopen = function() {
		socketStateOnline = true
		socket.send("content:mouseMove;args:120X, 60Y, [mouseExecA]");
		socket.send("content:sessionOpen;args:" + nickname);
		console.log("Stream: opened");
		document.addEventListener("click", function(e) {
			if (socketStateOnline == true) {
				if (e.pageY < 110) return;
				setTimeout(function() { socket.send("content:mouseClick;args: " + e.pageX + ", " + e.pageY); }, 150);
			}
		})
		document.addEventListener("mousemove", function(e) {
			if (socketStateOnline == true) {
				//setTimeout(function() { socket.send("content:mouseMove;args: " + e.pageX + ", " + e.pageY + ", [mouseExecA]"); }, 150);
				setTimeout(function() { socket.send("content:mouseMove;args: " + e.pageX + ", " + e.pageY + ", [" + nickname + "]"); }, 150);
			}
		})
	}
	socket.onclose = function() {
		console.log('Info: WebSocket closed.');
		socketStateOnline = false;
	};

	socket.onmessage = function(message) {
		let [int, args] = patternexecte(message.data);
		console.log(message.data);
		if (int == undefined || args == undefined) return;
		//console.log(int, args);
		switch (int) {
			case 1: {
				const regex = (args.match(/\[(.*?)\]/));
				const elementName = regex[1];
				const remArgs = args.replace(", " + regex[0], "");
				//const quer = document.querySelector(".mouseExecA=" + elementName);
				const quer = document.getElementsByClassName("mouseExecA=" + elementName)[0];
				const query = document.getElementsByClassName("mouseExecA_2=" + elementName)[0];
				//const query = document.querySelector(".mouseExecA_2=" + elementName);
				const numbersArgs = remArgs.match(/\d+/g);
				quer.style.left = numbersArgs[0] + "px";
				quer.style.top = numbersArgs[1] + "px";
				const xAdd = parseInt(numbersArgs[0]) + 17;
				const yAdd = parseInt(numbersArgs[1]) + 12;
				query.style.left = xAdd + "px";
				query.style.top = yAdd + "px";
				break;
			}
			case 2: {
				console.log(document.getElementsByClassName("mouseExecA=" + args).length);
				if (document.getElementsByClassName("mouseExecA=" + args).length > 0) return;
				console.log("D");
				if (args == "404") return;
				const newVar = document.createElement("img");
				const newVar2 = document.createElement("div");
				const newVar3 = document.createElement("p");
				newVar2.classList.add("mouseExecA_2=" + args);
				newVar2.style.cssText = "position:absolute;top:0px;left:0px;height:max-content;width:max-content;background-color:#fff;opacity:.8;";
				newVar3.style.cssText = "height:10px;width:max-content;vertical-align:center;display:table-cell;font-family:'Bree Serif',serif;font-size:12px;";
				newVar3.innerHTML = args;
				newVar.className = "mouseExecA=" + args;
				newVar.setAttribute("src", "../../mouse.png");
				newVar.style.cssText = "position: absolute; width: 1%; height: 3%; opacity: 0.7; top: 321px; left: 1087px;"
				document.body.append(newVar);
				document.body.append(newVar2);
				newVar2.append(newVar3);
				break;
			}
			case 3: {
				const [x, y] = args.split(", ");
				const ap = $("<span/>").appendTo($("body")).css({
					left: parseInt(x),
					top: parseInt(y)
				});
				ap.addClass("circle-CL");
				setTimeout(function() { ap.remove(); }, 450);
				break;
			}
		}
	};
}

function init() {
	/*if (window.location.protocol == 'http:') {
		socketConnect((window.location.protocol === "https:" ? "wss:" : "ws:") + "//" + window.location.host + window.location.pathname + "message-endpoint);
	} else {
		socketConnect((window.location.protocol === "https:" ? "wss:" : "ws:") + "//" + window.location.host + window.location.pathname + "message-endpoint");
	}*/
	const url = "wss://test-the-funny.herokuapp.com/server";
	socketConnect(url);
};

function patternexecte(msg) {
	const pattern = (/\(([^)]+)\)/);
	let executable = msg.match(pattern)[1];
	executable = String(executable);
	switch (executable) {
		case "mouseMove": {
			const args = (msg.split("(" + executable + ")")[1].split(":")[2]);
			return [1, args];
		}
		case "newAccount": {
			const args = (msg.split("(" + executable + ")")[1].split(":")[2]);
			return [2, args];
		}
		case "mouseClick": {
			const args = (msg.split("(" + executable + ")")[1].split(":")[2]);
			return [3, args];
		}
	}
	return [undefined, undefined];
}

setTimeout(function() { init(); }, 1000);

