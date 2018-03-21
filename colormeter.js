const robot = require("robotjs");
const fs = require("fs");
const Jimp = require("jimp");
const colorConvert = require("color-convert");

var locked;
var dims = 70;
var magnifiedView = document.getElementById("magnifiedView");

function screenCaptureToPNG(robotScreenPic) {
	return new Promise((resolve, reject) => {
		try {
			// const image = new Jimp(robotScreenPic.width, robotScreenPic.height, (err, image) => {
			// 	let pos = 0;
			// 	image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
			// 		image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
			// 		image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
			// 		image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
			// 		image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
			// 	});
			// 	image.getBase64(Jimp.MIME_PNG, (err, base64) => {
			// 		console.log(base64);
			// 		resolve(base64);
			// 	});
			//
			// });

			var image = new Jimp(robotScreenPic.width, robotScreenPic.height);
            image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
                var color = robotScreenPic.colorAt(x, y);
                var red = parseInt(color[0] + color[1], 16);
                var green = parseInt(color[2] + color[3], 16);
                var blue = parseInt(color[4] + color[5], 16);

                image.bitmap.data[idx + 0] = Number(red);
                image.bitmap.data[idx + 1] = Number(green);
                image.bitmap.data[idx + 2] = Number(blue);
                image.bitmap.data[idx + 3] = 255;
            });

			image.getBase64(Jimp.MIME_PNG, (err, base64) => {
				console.log(base64);
				resolve(base64);
			});
		} catch (e) {
			console.error(e);
			reject(e);
		}
	});

	// try {
	// 	const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
	// 	let pos = 0;
	// 	image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
	// 		image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
	// 		image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
	// 		image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
	// 		image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
	// 	});
	//
	// 	var base64;
	//
	// 	image.getBase64(Jimp.MIME_PNG, (err, png) => {
	// 		console.log(png);
	// 		base64 = png;
	// 	});
	// 	console.log('base64: ',base64);
	// 	return base64;
	// } catch (e) {
	// 	console.error(e);
	// 	return e;
	// }
}

setInterval(function() {
	var mouse = robot.getMousePos();
	var screenView = robot.screen.capture(mouse.x, mouse.y, dims, dims);
	screenCaptureToPNG(screenView).then(png => {
		magnifiedView.src = png;
	});
}, 30);

// var jimg = new jimp(dims, dims);
//
// for (var x=0; x<dims; x++) {
//     for (var y=0; y<dims; y++) {
//         var index = (y * screenView.byteWidth) + (x * screenView.bytesPerPixel);
//         var r = screenView.image[index];
//         var g = screenView.image[index+1];
//         var b = screenView.image[index+2];
//         var num = (r*256) + (g*256*256) + (b*256*256*256) + 255;
//         jimg.setPixelColor(num, x, y);
//     }
// }
//
// jimg.write("yes.png");
//
// fs.writeFileSync("yes.png", screenView.image);
//
// var actualScreenView = fs.readFileSync("yes.png", "base64");
//
// magnifedView.src = "data:image/png;base64," + actualScreenView;
