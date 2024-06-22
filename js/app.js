// import Element from "./runtime/element";
// const screenWidth = window.innerWidth;
// const screenHeight = window.innerHeight;
// import BackGround from "./runtime/background";
// import Login from "./runtime/login";
// import GameInfo from "./runtime/gameinfo";
// import Music from "./runtime/music";
// import Show from "./runtime/show";

let ctx = canvas.getContext("2d"); //canvas疑似是一个全局变量，这里直接使用
// let ctx2 = canvas.getContext("2d");
// const scalx = screenWidth / 375;
// const scaly = screenHeight / 667;
const numberY = 6; //行
const numberX = 6; //
const imgW = 47.5 * scalx;
const imgH = 47.8 * scaly;
const ceilX = 45 * scalx;
const ceilY = 128 * scaly;
const animal = [0, 1, 2, 3, 4]; //元素种类
const blocksite = {
	10101: [0, 0],
	10102: [0, 69],
	10103: [0, 135],
	10104: [0, 203],
	10105: [0, 273],
	10106: [0, 340],
	10107: [0, 409],
	10108: [140, 0],
	10109: [140, 69],
	10201: [140, 135],
	10202: [140, 203],
	10203: [140, 273],
	10204: [140, 340],
	10205: [140, 409],
	10206: [267, 0],
	10207: [267, 69],
	10208: [267, 135],
	10209: [267, 203],
	10301: [267, 273],
	10302: [267, 340],
	10303: [267, 409],
	10304: [391, 29],
	10305: [391, 96],
	10306: [391, 164],
	10307: [391, 231],
	10308: [391, 299],
	10309: [391, 368],
};
const BG_IMG_SRC = "images/bg.jpg";
const BG_IMG_SRC2 = "images/play.png";
let minute = 0; //控制动画速度

class App {
	constructor() {
		this.aniId = 0;
		this.boxData = []; // 消消乐数据
		this.startCoordinates = [0, 0]; // 开始的坐标位置
		this.endCoordinates = [0, 0]; // 结束的坐标位置
		this.clickbox = []; // 点击的方块位置
		this.click = 0;
		this.success_clear = false;
		this.isClear = false;
		this.boxArray = {};
		this.selectedbox = [];
		this.speed = 0;
		this.anB = 0;
		this.maxx = 0;
		this.repeat = false;
		this.score = { num: 0, animal: 0 };
		this.hoverImage = { animal: 0, x: 0, y: 0 };
		this.hoverSpeed = 0;
		this.time0 = 0;
		this.fill = false;
		this.w = 0;
		this.draw = false;
		this.limit = 90;
		this.gameover = 0;
		this.initiate(); //初始化游戏工具类，如声音对象，背景对象，元素对象等
	}
	/**初始化游戏工具类，如声音对象，背景对象，元素对象等 */
	initiate() {
		this.login = new Login();
		this.bindLoop = this.loop.bind(this);
		this.bg = new BackGround(ctx, BG_IMG_SRC);
		this.bg2 = new BackGround(ctx, BG_IMG_SRC2); //初始化对象，还没有绘制
		this.ele = new Element(ctx);
		this.gameinfo = new GameInfo(ctx);
		this.music = new Music();
		this.bindLoop = this.step1.bind(this); //初始化游戏开始界面与监听
		// canvas.removeEventListener("touchstart", this.touchHandler);
		canvas.removeEventListener("click", this.touchHandler);
		//清空一下事件监听，防止重复绑定
		// this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
		setTimeout(this.bindLoop,500);
		//canvas参数没用
		//在浏览器下一次重绘（刷新率）之前调用回调函数来更新画面，以实现每次刷新都更新一次画面
		//返回一个id，可以用来取消动画
	}
	step1() {
		//初始化游戏界面，ctx是一个全局canvas 2D对象
		ctx.clearRect(0, 0, canvas.width, canvas.height); //清楚指定矩形内的图像，这里清屏
		this.bg.render(ctx); //bg是一个background类，render方法将一张图片绘制在ctx上
		this.login.render(ctx); //绘制开始游戏按钮
		this.touchHandler = this.touchEventHandler.bind(this);
		//将touchEventHandler绑定到this上，这样在touchEventHandler中就可以使用this了，换言之，在this（实例对象）中就可以正确地使用touchEventHandler了
		canvas.addEventListener("touchstart", this.touchHandler);
		//给canvas添加一个touchstart事件监听器，当触摸事件发生时，调用touchHandler方法
		//touchstart是web api定义的标准事件，当用户触摸屏幕时触发。触发时会创建一个事件对象，该对象包含所有与触摸有关的信息，会作为参数传递给事件处理函数
	}

	touchEventHandler(e) {
		e.preventDefault(); //preventDefault() 方法。这个方法通常用于阻止浏览器执行与事件相关联的默认动作。例如，如果这个 e 是一个点击事件，那么 e.preventDefault() 将阻止链接的默认点击行为（即导航到链接的 URL）。如果 e 是一个提交事件，那么 e.preventDefault() 将阻止表单的默认提交行为。
		let x = e.touches[0].clientX; //获取触摸事件第一个触摸点的坐标
		let y = e.touches[0].clientY;

		let area = this.login.btnArea; //获取开始游戏按钮的区域

		if (x >= area.startX && x <= area.endX && y >= area.startY && y <= area.endY) {
			this.secenceChange(); //调用secenceChange方法，进入游戏
		}
	}
	/**重玩，进入游戏，初始化游戏数据 */
	secenceChange() {
		//进入游戏
		this.availableblock = {
			//重置可用的方块数量
			10101: 4,
			10102: 4,
			10103: 4,
			10104: 4,
			10105: 4,
			10106: 4,
			10107: 4,
			10108: 4,
			10109: 4,
			10201: 4,
			10202: 4,
			10203: 4,
			10204: 4,
			10205: 4,
			10206: 4,
			10207: 4,
			10208: 4,
			10209: 4,
			10301: 4,
			10302: 4,
			10303: 4,
			10304: 4,
			10305: 4,
			10306: 4,
			10307: 4,
			10308: 4,
			10309: 4,
			// 20101: 4,
			// 20102: 4,
			// 20103: 4,
			// 20104: 4,
			// 20105: 4,
			// 20106: 4,
			// 20107: 4,
			// 20108: 4,
			// 20109: 4,
			// 20110: 4,
			// 20111: 4,
			// 20112: 4,
			// 20113: 4,
			// 20201: 4,
			// 20202: 4,
			// 20203: 4,
			// 20204: 4,
			// 20205: 4,
			// 20206: 4,
			// 20207: 4,
			// 20208: 4,
			// 20209: 4,
			// 20210: 4,
			// 20211: 4,
			// 20212: 4,
			// 20213: 4,
			// 20301: 4,
			// 20302: 4,
			// 20303: 4,
			// 20304: 4,
			// 20305: 4,
			// 20306: 4,
			// 20307: 4,
			// 20308: 4,
			// 20309: 4,
			// 20310: 4,
			// 20311: 4,
			// 20312: 4,
			// 20313: 4,
		};
		if (this.intervalId) clearInterval(this.intervalId);
		canvas.removeEventListener("touchstart", this.touchHandler);
		canvas.removeEventListener("touchend", this.touchendbind);
		//先移除检测开始事件的处理函数
		this.boxArray = {};
		window.cancelAnimationFrame(this.aniId);
		//取消动画，避免又调用了登录界面那个程序（loop）
		console.log(`成功启动，并关闭了${this.aniId}`);
		this.up = this.update.bind(this); //游戏主循环，函数传递与调用时会改变上下文环境，使用bind可以显式地将该函数与“this”绑定在一起。
		this.time0 = new Date();
		this.left = 90;
		this.intervalId = setInterval(() => {
			let time1 = new Date();
			this.left = this.limit + 1 - Math.ceil((time1 - this.time0) / 1000);
			if (this.left < 0) {
				this.gameOver();
				return;
			} else {
				this.gameinfo.renderTime(ctx, this.left);
			}
		}, 1000);

		this.bgupdate(); //初始化绘制游戏内容
		this.aniId = window.requestAnimationFrame(this.up, canvas); //下一次刷新时，回调主程序
		this.music.secen2();
	}
	gameOver() {
		this.left = 90;
		if (this.intervalId) clearInterval(this.intervalId);
		this.gameinfo.renderGameOver(ctx, this.score.num);
		// this.music.gameover();
		this.gameover = 1;
	}
	/**初始化事件监听，监听触摸结束事件 */
	initEvent() {
		// canvas.addEventListener("touchstart", this.touchHandlerStart.bind(this));
		// canvas.addEventListener("touchmove", this.touchHanderMove.bind(this));
		this.touchendbind = this.touchEnd.bind(this);
		canvas.addEventListener("touchend", this.touchendbind);
	}
	/**每次触摸之后重绘每个方块，描边，并检测是否已经选了14个方块 */
	hover() {
		//
		this.bgupdate();
		this.selectedbox = [];
		this.boxData.forEach((item, x) => {
			// 绘制每个方块
			item.forEach((it, y) => {
				// console.log(it["animal"], "it[animal]");
				this.ele.render(ctx, blocksite[it["animal"]][1], blocksite[it["animal"]][0], imgW * x + ceilX, imgH * y + ceilY); //这里blocksite的第零个位置表示y轴，第一个位置表示x轴
				if (it["match"] > 0) {
					this.selectedbox.push(Number(it.animal));
					this.ele.renderHover(ctx, imgW * x + ceilX, imgH * y + ceilY);
				}
			});
		});
		function drawRoundedRect(ctx, x, y, width, height, radius) {
			ctx.beginPath();
			ctx.moveTo(x + radius, y);
			ctx.arcTo(x + width, y, x + width, y + height, radius);
			ctx.arcTo(x + width, y + height, x, y + height, radius);
			ctx.arcTo(x, y + height, x, y, radius);
			ctx.arcTo(x, y, x + width, y, radius);
			ctx.closePath();
		
			// 设置填充颜色为棕色
			ctx.fillStyle = 'purple';
			ctx.fill();
		}
		
		// 使用方法
		drawRoundedRect(ctx, 22*scalx, 485*scaly,330*scalx, 40*scaly, 5);
		let selected = this.selectedbox.sort();
		for (let i=0;i<=selected.length-1;i++){
			this.ele.render(ctx, blocksite[selected[i]][1], blocksite[selected[i]][0],imgW/1.9 * i + 19*scalx, 490*scaly,undefined, 0.75,0.75);
		}
		if (this.selectedbox.length === 14) {
			this.success_clear = this.cal_score();
		}
	}

	againPalyArea(e) {
		let x = [],
			y = [];
		x[0] = 214 * scalx;
		x[1] = 214 * scalx + 100 * scalx;
		y[0] = screenHeight - 107 * scaly;
		y[1] = screenHeight - 36 * scaly;
		//点击重玩区域
		if (
			e.changedTouches[0].clientX > x[0] &&
			e.changedTouches[0].clientY > y[0] &&
			e.changedTouches[0].clientX < x[1] &&
			e.changedTouches[0].clientY < y[1]
		) {
			this.secenceChange();
			return true;
		}
		return false;
	}

	touchEnd(e) {
		if (this.fill) {
			return;
		}
		if (this.gameover) {
			this.gameover = 0;
			this.secenceChange();
			return;
		}
		e.preventDefault();
		if (this.againPalyArea(e)) return; //点击重玩区域
		this.success_clear = false;
		this.repeat = false;
		this.boxArray = {};
		let x = e.changedTouches[0].clientX - ceilX; //X坐标表示水平坐标
		let y = e.changedTouches[0].clientY - ceilY; //Y坐标表示垂直坐标
		this.draw = false;
		if (x > 0 && y > 0 && x < imgW * numberX && y < imgH * numberY) {
			this.startCoordinates = [x, y];
			this.clickbox[0] = Math.ceil(x / imgW) - 1;
			this.clickbox[1] = Math.ceil(y / imgH) - 1;
			let col = this.clickbox[1];
			let row = this.clickbox[0];
			this.boxData[row][col].match = !this.boxData[row][col].match;
			this.hoverImage = { animal: this.boxData[row][col].animal, x: row, y: col };
			console.log("start1");
			setTimeout(() => {
				this.hover();
			}, 0);
		}

		window.requestAnimationFrame(() => {
			// if (this.selectedbox.length === 17) {   //为了调试暂时修改
			if (this.success_clear) {
				
				this.clear();
				this.down();
				this.fillBlock();
			}
		}, canvas);
	}
	/**绘制游戏方块*/
	drawBlock() {
		this.bgupdate();
		this.draw = true;
		this.boxData.forEach((item, x) => {
			item.forEach((it, y) => {
				this.ele.render(ctx, it["animal"] * fixedW, 0, imgW * x + ceilX, imgH * y + ceilY);
			});
		});
		this.selectedbox
	}

	/**
	 * 清屏，绘制主游戏背景，绘制游戏分数
	 * */
	bgupdate() {
		ctx.clearRect(0, 0, screenWidth, screenHeight);
		this.bg2.render(ctx, 0, 0, 2, 2);
		this.gameinfo.renderGameScore(ctx);
		this.gameinfo.renderImage(ctx, this.score.num);
		this.gameinfo.renderTime(ctx, this.left);
	}
	/**未研究 */
	downgame() {
		this.bgupdate();

		this.boxData.forEach((item, x) => {
			item.forEach((it, y) => {
				if (this.boxData[x][y]["match"] > 0) {
					//  this.ele.render(ctx,it['animal']*fixedW,0,imgW*x+ceilX,imgH*y+ceilY,true);

					let key = x + "" + y;
					let tempid = this.choos(this.availableblock);
					this.availableblock[tempid]--;
					this.boxArray[key] = { x: imgW * x + ceilX, y: ceilY + imgH * y, animal: tempid, match: 0 };
					this.maxx = this.max(y, this.maxx); //y是boxData的第二维度，表示第几行，因此这里用maxx表示最深的一行
				} else {
					this.ele.render(ctx, blocksite[it["animal"]][1], blocksite[it["animal"]][0], imgW * x + ceilX, imgH * y + ceilY); //这里blocksite的第零个位置表示y轴坐标，第一个位置表示x轴
				}
			});
		});
		this.gameinfo.renderImage(ctx, this.score.num);
		console.log(this.score.num, "xxxxxxxxxxx");
	}
	/**重绘背景，隐藏要消灭的元素*/
	clear() {
		this.bgupdate();
		this.boxData.forEach((item, x) => {
			// 绘制每个方块
			item.forEach((it, y) => {
				// console.log(it["animal"], "it[animal]");
				if (this.boxData[x][y]["match"]) {
					this.ele.render(ctx, blocksite[it["animal"]][1], blocksite[it["animal"]][0], imgW * x + ceilX, imgH * y + ceilY, true); //这里blocksite的第零个位置表示y轴，第一个位置表示x轴
				} else {
					this.ele.render(ctx, blocksite[it["animal"]][1], blocksite[it["animal"]][0], imgW * x + ceilX, imgH * y + ceilY);
				}
			});
		});
		// this.boxData.forEach((item, x) => {
		// 	item.forEach((it, y) => {
		// 		if (this.boxData[x][y]["match"] > 0) {
		// 			this.ele.render(ctx, it["animal"] * fixedW, 0, imgW * x + ceilX, imgH * y + ceilY, true);
		// 			this.availableblock[it["animal"]]++;
		// 		} else {
		// 			this.ele.render(ctx, it["animal"] * fixedW, 0, imgW * x + ceilX, imgH * y + ceilY);
		// 		}
		// 	});
		// });
	}

	//检测是否重复
	isReapet() {
		this.boxData.forEach((item, x) => {
			item.forEach((it, y) => {
				let vb =
					x + 2 < numberX &&
					this.boxData[x][y]["animal"] == this.boxData[x + 1][y]["animal"] &&
					this.boxData[x + 1][y]["animal"] == this.boxData[x + 2][y]["animal"];
				let vy =
					y + 2 < numberY &&
					this.boxData[x][y]["animal"] == this.boxData[x][y + 2]["animal"] &&
					this.boxData[x][y + 1]["animal"] == this.boxData[x][y + 2]["animal"];
				if (vb) {
					++this.boxData[x][y].match;
					++this.boxData[x + 1][y].match;
					++this.boxData[x + 2][y].match;
				}
				if (vy) {
					++this.boxData[x][y].match;
					++this.boxData[x][y + 1].match;
					++this.boxData[x][y + 2].match;
				}
				if (vb || vy) {
					this.repeat = true;
				}
			});
		});
	}
	/**方块下落*/
	down() {
		for (let x = numberY - 1; x > -1; x--) {
			//行
			for (let y = 0; y < numberX; y++) {
				//列
				if (this.boxData[y][x].match) {
					for (let k = x - 1; k > -1; k--) {
						if (this.boxData[y][k].match == 0) {
							let temp = this.boxData[y][k];
							this.boxData[y][k] = this.boxData[y][x];
							this.boxData[y][x] = temp;
							break;
						}
					}
				}
			}
		}
		this.downgame();
	}
	/**填充方块的动画 */
	fillBlock() {
		this.fill = true;

		for (let key in this.boxArray) {
			this.ele.renderBoom(ctx, this.speed * 93, 0, this.boxArray[key].x, this.boxArray[key].y);
			if (this.isauto) {
				this.music.playisAudio();
			} else {
				this.music.playclearAudio();
			}
			this.ele.render(
				ctx,
				blocksite[this.boxArray[key].animal][1],
				blocksite[this.boxArray[key].animal][0],
				this.boxArray[key].x,
				minute - parseInt((this.maxx + 1) * imgH) + this.boxArray[key].y
			);
		}
		this.loopBlock();
	}
	/**最大值 */
	max(a, b) {
		return a > b ? a : b;
	}
	/**疑似 */
	loopBlock() {
		this.anB = window.requestAnimationFrame(() => {
			minute += 4;

			if (minute < parseInt((this.maxx + 1) * imgH)) {
				this.clear();
				++this.speed;

				this.fillBlock();
			} else {
				window.cancelAnimationFrame(this.anB);
				this.clear();
				for (let key in this.boxArray) {
					console.log(key, "key11");
					let ma = this.boxArray[key]["animal"] * fixedW;
					this.ele.render(ctx, ma, 0, this.boxArray[key].x, this.boxArray[key].y);
					let x = key.substring(0, 1);
					let y = key.substring(1, 2);
					this.boxData[x][y]["animal"] = this.boxArray[key]["animal"];
					this.boxData[x][y]["match"] = this.boxArray[key]["match"];
				}
				minute = 0;
				this.isauto = false;
				this.speed = 0;
				this.repeat = false;
				// this.isReapet(); //不需要检测是否重复
				console.log(this.boxData, this.repeat, "下落");
				if (this.repeat) {
					//不需要多次消除
					this.boxArray = {};
					setTimeout(() => {
						this.clear();
						this.down();
						this.isauto = true;
						this.fillBlock();
					}, 1000);
				} else {
					this.fill = false;
					this.clear();
				}
			}
		}, canvas);
	}
	touchHanderEnd(e) {
		e.preventDefault();
		canvas.removeEventListener("touchstart", this.touchHandlerStart.bind(this));
		canvas.removeEventListener("touchmove", this.touchHanderMove.bind(this));
	}
	/**游戏启动 */
	update() {
		this.enemyGenerate(); //初始化生成随机方块
		this.initEvent(); //初始化事件监听
		this.gameinfo.renderImage(ctx, this.score.num); //绘制游戏信息
		this.gameinfo.renderTime(ctx, this.left);
	}
	/**重复初始化游戏界面 */
	loop() {
		this.step1(); //初始化游戏界面
		this.aniId = window.requestAnimationFrame(this.bindLoop, canvas);
		//每次回调一次之后都会销毁该监听，所以需要重新绑定
	}
	/**随机从数组内选择一个方块 */
	choos(availableblock = this.availableblock) {
		// 创建一个数组，其中包含所有剩余的方块
		let remainingBlocks = [];
		for (let block in availableblock) {
			if (availableblock[block] > 0) {
				remainingBlocks.push(block);
			}
		}
		// 从 remainingBlocks 数组中随机选择一个元素
		let randomBlock = remainingBlocks[Math.floor(Math.random() * remainingBlocks.length)];
		return randomBlock; //返回一个牌的id
	}
	/**
	 * 随机方块生成逻辑
	 * 帧数取模定义成生成的频率
	 * 左边和左边的左边
	 * 下边和下边的下边 构建一个全局维护数组，随机从中选择
	 */
	enemyGenerate() {
		//生成方块
		this.boxData = [];
		for (let i = 0; i < numberX; i++) {
			for (let j = 0; j < numberY; j++) {
				if (j == 0) this.boxData[i] = new Array(numberY);
				let tempid = this.choos(this.availableblock);
				this.availableblock[tempid]--;
				this.boxData[i][j] = { animal: tempid, match: 0, chosen: 0 };
			}
		}

		this.boxData.forEach((item, x) => {
			// 绘制每个方块
			item.forEach((it, y) => {
				// console.log(it["animal"], "it[animal]");
				this.ele.render(ctx, blocksite[it["animal"]][1], blocksite[it["animal"]][0], imgW * x + ceilX, imgH * y + ceilY); //这里blocksite的第零个位置表示y轴，第一个位置表示x轴
			});
		});
	}
	/**判断是否胡并计算得分 */
	cal_score() {
		let type = { gen: 0, combo: 0, san: 0 };
		let data = this.selectedbox.map((x) => x % 10000).sort();
		let i = 0;
		let j = 0;
		while (i < 13) {
			//优先单独处理七对的情况
			while (j < 14 && data[j] === data[i]) j++;
			if (j - i >= 4) {
				type.gen++;
				// this.selectedbox.splice(i,5);
				i = i + 4;
				continue;
			}
			if (j - i === 3) {
				type.san++;
			}
			if (j - i === 2) {
				type.combo++;
			}
			i = j;
		}
		if (type.gen * 4 + type.combo * 2 === 14) {
			this.score.num += 100 * 4 * 2 ** type.gen;
			// this.show.qidui();
			return true;
		}
		type = { gen: type.gen, combo: 0, san: 0, lian: 0 };
		data = this.selectedbox.map((x) => x % 10000).sort();
		i = 0;
		j = 0;
		function digui(data) {
			if (data.length === 0) return -1;
			let i = 0;
			let j = 0;
			let N = data.length;
			if (i < N - 1) {
				while (j < N && data[j] === data[i]) j++;
				if (j - i >= 3) {
					type.san++;
					if (digui(data.toSpliced(i, 3)) === -1) return -1;
					type.san--;
				}
				if (j - i >= 2 && type.combo === 0) {
					type.combo++;
					if (digui(data.toSpliced(i, 2)) === -1) return -1;
					type.combo--;
				}
				if (j >= N - 1) return 0;
				let k = j;
				while (k < N && data[k] === data[j]) k++;
				if (k >= N) return 0;
				if (data[j] - 1 === data[i] && data[k] - 1 === data[j]) {
					type.lian++;
					let newdata = data.toSpliced(k, 1);
					newdata = newdata.toSpliced(j, 1);
					if (digui(newdata.toSpliced(i, 1)) === -1) return -1;
					type.lian--;
				}
			}
			return 0;
		}
		if (digui(data) === -1) {
			this.score.num += 100 * 1 * 2 ** type.gen;
			//this.show.qidui();
			return true;
		}
		return false;
	}
}
