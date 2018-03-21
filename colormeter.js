const robot = require("robotjs");
const fs = require("fs");
const Jimp = require("jimp");
const colorConvert = require("color-convert");

var locked;
var dims = 70;
var magnifiedView = document.getElementById("magnifiedView");

function screenCaptureToPNG(robotScreenPic) {
	// return new Promise((resolve, reject) => {
	// 	try {
	// 		const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
	// 		let pos = 0;
	// 		image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
	// 			image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
	// 			image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
	// 			image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
	// 			image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
	// 		});
	//
	// 		image.getBuffer(Jimp.MIME_PNG, (err, png) => {
	// 			console.log(png);
	// 			resolve(png);
	// 		});
	// 	} catch (e) {
	// 		console.error(e);
	// 		reject(e);
	// 	}
	// });

	try {
		const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
		let pos = 0;
		image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
			image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
			image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
			image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
			image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
		});

		image.getBuffer(Jimp.MIME_PNG, (err, png) => {
			console.log(png);
			return png;
		});
	} catch (e) {
		console.error(e);
		return e;
	}
}

var mouse = robot.getMousePos();
var screenView = robot.screen.capture(mouse.x, mouse.y, dims, dims);
var actualScreenView = screenCaptureToPNG(screenView);

magnifiedView.src = actualScreenView;

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
