let socket = io();
let el;

console.log("sus");

var displayMediaOptions = {
	video: {
		cursor: "always"
	},
	audio: true
};

let bools = {
	["inputKey"]: false
}

let username;

let serverInfo = {
	messageInt: 0
}

/*const video = document.querySelector("video");
const btn = document.querySelector("button");

btn.addEventListener("click", async() => {
	if(window.location.href.split("/")[window.location.href.split("/").length - 1] != "?2") return;
	const stream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions).catch((err) => console.log(err));
	video.srcObject = stream;
})*/

socket.on('time', (timeString) => {
	console.log(timeString);
});

const inputKey = document.querySelector(".mes input");

document.addEventListener("keyup", function(event) {
	console.log(event);
	if (event.keyCode === 13) {
		if (bools["inputKey"] == true) {
			const value = inputKey.value;
			if (value.replace(/\s/g, '').length) {
				username = window.location.href.split("=")[1]
				const table = {
					username: username,
					message: value
				}
				socket.emit("newMessage", table);
				bools["inputKey"] = true;
				inputKey.value = "";
			}
		}
	}
});

socket.on("userJoinMessage", (info) => {
	const username = info;
	const message = `/${username} joined the session!!!!!!!!/`
	const desst = document.querySelector(".chat"); /* messages holder */
	const el1 = document.createElement("div"); /* holder of things bellow */
	const el2 = document.createElement("div"); /* line */
	const el3 = document.createElement("h3"); /* username */
	const el4 = document.createElement("p"); /* message */
	el2.className = "for";
	el3.innerHTML = "ADMIN_CONSOLE_UUID_!1";
	el4.innerHTML = message;
	//Appending
	el1.append(el2);
	el1.append(el3);
	el1.append(el4);
	//el1.style.cssText = `bottom: 0;`;
	el4.className = "adm";
	/*for (let int = 0; int < serverInfo.messageInt; int++) {
		if (serverInfo.messageInt < 1) break;
		const thing = document.getElementsByClassName(`id=${int}`)[0];
		thing.style.cssText = `bottom: ${(int + 1) * 10}vh;`;
		thing.className = `id=${int + 1}`;
	}*/
	el1.className = "id=0";
	desst.append(el1);
	serverInfo.messageInt = serverInfo.messageInt + 1;
})

socket.on("newMessage", (info) => {
	const username = info.username || "Guest";
	const message = info.message;
	const desst = document.querySelector(".chat .contain"); /* messages holder */
	const el1 = document.createElement("div"); /* holder of things bellow */
	const el2 = document.createElement("div"); /* line */
	const el3 = document.createElement("h3"); /* username */
	const el4 = document.createElement("p"); /* message */
	el2.className = "for";
	el3.innerHTML = username;
	el4.innerHTML = message;
	//Appending
	el1.append(el2);
	el1.append(el3);
	el1.append(el4);
	el1.style.cssText = `bottom: 0;`;
	el4.className = "p";
	if (username == "matyas") {
		el1.className = "mat";
		el3.innerHTML = "/ADMIN/ matyas";
		el3.className = "mat";
	}
	for (let int = 0; int < serverInfo.messageInt; int++) {
		if (serverInfo.messageInt < 1) break;
		const thing = document.getElementsByClassName(`id=${int}`)[0];
		thing.style.cssText = `bottom: ${(int + 1) * 10}vh;`;
		thing.className = `id=${int + 1}`;
	}
	el1.className = "id=0";
	desst.append(el1);
	serverInfo.messageInt = serverInfo.messageInt + 1;
	setTimeout(function() {
		if ($('.chat').innerHeight() > $('.chat')[0].scrollHeight) {
			//$('.chat').css("padding", "0 -55px 0 0");
			console.log($('.chat').css("padding"));
		}
	}, 2000)
})

inputKey.onfocus = function() {
	bools["inputKey"] = true;
	console.log(bools["inputKey"]);
}

inputKey.onfocusout = function() {
	bools["inputKey"] = false;
	console.log(bools["inputKey"]);
}
const theGui = document.querySelector(".chat");
setInterval(function() {
	theGui.style.cssText = "";
	theGui.style.cssText = "overflow-y: scroll;";
}, 2000)

/*(function() {
	var $scrollable = $(".chat"),
		$scrollbar = $(".scrollbar"),
		height = $scrollable.outerHeight(true),    // visible height
		scrollHeight = $scrollable.prop("scrollHeight"), // total height
		barHeight = height * height / scrollHeight;   // Scrollbar height!
	setTimeout(function() {
		$scrollbar.height(barHeight).draggable({
			axis: "y",
			containment: "parent",
			drag: function(e, ui) {
				$scrollable.scrollTop(scrollHeight / height * ui.position.top);
			}
		});
		$scrollable.on("scroll", function() {
			$scrollbar.css({ top: $scrollable.scrollTop() / height * barHeight });
		});
	}, 20000);
})*/