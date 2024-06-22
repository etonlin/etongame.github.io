let atlas = new Image();
atlas.src = "images/blocks.jpeg";
let atlas2 = new Image();
atlas2.src = "images/sprit3.png";
let atlas3 = new Image();
atlas3.src = "images/boom.png";


const scalX = (30 / 375) * screenWidth;
const xs = ((46 / 375) * screenWidth - scalX) / 2;
const scalY = (49 / 375) * screenWidth;
class Element {
	render(ctx, x, y, screenX, screenY,hide,sx = 1,sy = 1) {
		if (hide) return;
		ctx.drawImage(atlas, x, y, 54, 81, screenX + xs, screenY, scalX*sx, scalY*sy);
	}
	/**输入在屏幕上绘制的像素坐标，绘制一个选中的蒙版 */
	renderHover(ctx, screenX, screenY, hide) {
		if (hide) return;
		// ctx 是一个 CanvasRenderingContext2D 对象
		ctx.strokeStyle = "white"; // 设置线条颜色为红色
		ctx.lineWidth = 2; // 设置线条宽度为2
		ctx.strokeRect(screenX, screenY, scalY, scalY);
		ctx.globalAlpha = 0.5; // 设置透明度为 0.5
		ctx.fillStyle = "black"; // 设置填充颜色为黄色
		ctx.fillRect(screenX, screenY, scalY, scalY); // 绘制一个填充的方块
		ctx.globalAlpha = 1; // 重置透明度为 1
		// ctx.draw();
		// ctx.drawImage(atlas2, x, y, 95, 93, screenX, screenY, scalX, scalY);
	}

	renderBoom(ctx, x, y, screenX, screenY, hide) {
		if (hide) return;
		ctx.drawImage(atlas3, x, y + 5, 95, 82, screenX, screenY, scalX, scalY);
	}
}
