function cal_score(collectbox) {
	let type = { gen: 0, combo: 0, san: 0 };
	let score = 0;
	let data = collectbox.map((x) => x % 10000).sort();
	console.log(data);
	let i = (j = 0);
	while (i < 13) {
		//优先单独处理七对的情况
		while (j < 14 && data[j] === data[i]) j++;
		if (j - i >= 4) {
			type.gen++;
			//data.splice(i, 5);
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
		score += 100 * 4 * 2 ** type.gen;
		//this.show.qidui();
		return score;
	}
	type = { gen: type.gen, combo: 0, san: 0, lian: 0 };
	data = collectbox.map((x) => x % 10000).sort();
	i = j = 0;
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
		score += 100 * 1 * 2 ** type.gen;
		//this.show.qidui();
		return score;
	}
	score += 100 * 1 * 2 ** type.gen;
	console.log(type);
	return score;
	while (i < 14) {
		while (j < 14 && data[j] === data[i]) j++;
		if (data[i] != data[j] - 1) {
			//如果不相连
			if (j - i <= 1) return -1;
			if (j - i === 2) {
				if (type.combo != 0) return -1;
				type.combo++;
			}
		}
	}
}

let data = [0, 1, 2, 4, 4, 4, 5, 6, 7, 3, 4, 5, 3, 3];
console.log(cal_score(data));
