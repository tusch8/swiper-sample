/**
 * 基本
 */
(function () {
	const swiper01Options = {
		// よく使うオプション(指定しているのは初期値、他のオプションは公式サイトにてhttps://swiperjs.com/swiper-api)
		allowTouchMove: true, // ナビボタン以外でスライドできる(falseだとスワイプ、ページャでスライドしなくなる)
		autoHeight: false, // 高さの自動調整(trueで現在のスライドの高さに自動調整)
		centerInsufficientSlides: false, // 'slidesPerView'未満の場合にスライドが中央に配置される(loop:trueだと使えない)
		centeredSlides: false, // アクティブなスライドを真ん中にするか
		direction: 'horizontal', // スライドする向き 'horizontal' or 'vertical'
		effect: 'slide', // スライドのエフェクト "slide", "fade", "cube", "coverflow" or "flip"
		followFinger: true, // タップ中はスライドさせない(未確認)
		grabCursor: false, // オンマウス中はカーソルが「掴む」マークになる
		initialSlide: 0, // 最初のスライド番号
		loop: false, // ループするか
		loopAdditionalSlides: 0, // ループするとき何個先読みしておくか(2週目のループが一瞬表示されないときは、1以上指定することを推奨)
		slidesPerView: 1, // スライドの数(※小数点使える)
		spaceBetween: 0, // スライド間の余白
		speed: 300, // スライドするスピード
		watchOverflow: false, // trueにするとswiperが無効になる(ナビ、ページャも消える 注:ただし使わん方が良いかも slidesPerView以下の時はクラスつけてページャなど消した方が良い)
		slidesPerColumn: 1, // 列あたりのスライド数
		slidesPerGroup: 1, // いくつずつスライドするか
		slidesOffsetBefore: 0, // 先頭前の余白
		slidesOffsetAfter: 0, // 最後の余白
		freeMode: false, // 自由スライド
		fadeEffect: {
			crossFade: true // fadeので重なってしまうとき、これを書く
		},
		pagination: { // ページャ
			el: '.swiper-pagination',
			type: 'bullets', // タイプ "bullets", "fraction", "progressbar" or "custom"
			clickable: false, // クリックで切り替えるか
			// renderBullet: function(index, className){ // ページャをカスタムするとき使用
			// アイコンのhtml
			// }
		},
		navigation: { // ナビボタン
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		// autoplay: { // 自動再生
		//   delay: 3000, // このパラメータは必須
		//   disableOnInteraction: true // 操作されたら自動再生ストップ
		// },
		// thumbs: { // サムネイルのスワイプ指定(メインのスライダーにこれを書く、サムネイルの方を上に書く※サムネイルのスライダーはloopさせないほうが良い)
		// 	swiper: thumbsSwiper
		// },
		// scrollbar: { // スクロールバー
		// el: '.swiper-scrollbar',
		// hide: false, // trueだと操作後非表示になる
		// draggable: false, // ドラッグできるか
		// },
		breakpoints: { // ブレイクポイント 768~ loop effectはレスポンシブで変更できない
			768: {
				// オプション
			},
		},
	}

	const swiper01 = new Swiper('.js-swiper01', swiper01Options);
})();


/**
 * SPのみスライド
 */
(function () {

	let swiper02 = null; // 起動判定のため

	const swiper02Options = {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
			prevEl: '.js-swiper02-prev',
			nextEl: '.js-swiper02-next',
		},
	}

	const initSwiper02 = () => {
		swiper02 = new Swiper('.js-swiper02', swiper02Options);
	}

	// ブレイクポイントを指定
	const breakPoint = matchMedia('(min-width: 768px)');

	// 初回
	onMediaChange(breakPoint);

	// ブレイクポイントを通過したかの監視
	breakPoint.addEventListener('change', onMediaChange);

	function onMediaChange(breakPoint) {
		if (breakPoint.matches) {
			// 768px以上のとき
			if (swiper02) {
				swiper02.destroy(false, true);
			}
		} else {
			// 767px以下のとき
			initSwiper02();
		}
	};
})();


/**
 * SPは1枚、PCは3枚ずつスライド
 */
(function () {

	let swiper03 = null; // 起動判定のため
	const swiper03El = document.querySelector('.js-swiper03');
	const swiper03Length = swiper03El.querySelectorAll('.swiper-slide').length;

	const swiper03Options = {
		loop: true,
		slidesPerView: 1,
		spaceBetween: 20,
		navigation: {
			prevEl: '.js-swiper03-prev',
			nextEl: '.js-swiper03-next',
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
			},
		},
	}

	const initSwiper03 = () => {
		swiper03 = new Swiper(swiper03El, swiper03Options);
	}

	// ブレイクポイントを指定
	const breakPoint = matchMedia('(min-width: 768px)');

	// 初回
	onMediaChange(breakPoint);

	// ブレイクポイントを通過したかの監視
	breakPoint.addEventListener('change', onMediaChange);

	function onMediaChange(breakPoint) {
		if (breakPoint.matches) {
			// 768px以上のとき4枚以上で発動
			if (swiper03Length > 3) {
				if (!swiper03) {
					initSwiper03();
				}
			} else {
				if (swiper03) {
					swiper03.destroy(false, true);
				}
			}
		} else {
			// 767px以下のとき2枚以上で発動
			if (swiper03Length > 1) {
				if (!swiper03) {
					initSwiper03();
				}
			} else {
				if (swiper03) {
					swiper03.destroy(false, true);
				}
			}
		}
	};
})();


/**
 * 1ページに複数の同じオプションのスライダー
 */
(function () {

	const swiper04Els = document.querySelectorAll('.js-swiper04');
	const swiper04PaginationEls = document.querySelectorAll('.js-swiper04-pagination');
	const swiper04PrevEls = document.querySelectorAll('.js-swiper04-prev');
	const swiper04NextEls = document.querySelectorAll('.js-swiper04-next');

	// ナンバー付きページャを0詰めにする関数
	const zeroPad = (num) => {
		return num.toString().padStart(2, "0");
	}

	swiper04Els.forEach((swiper04El, i) => {
		// スライダー、ページネーション、前後ボタンに連番のクラスつける
		swiper04El.classList.add('js-swiper04-' + i);
		swiper04PaginationEls[i].classList.add('js-swiper04-pagination-' + i)
		swiper04PrevEls[i].classList.add('js-swiper04-prev-' + i)
		swiper04NextEls[i].classList.add('js-swiper04-next-' + i)

		const swiper04Options = {
			centeredSlides: true,
			loop: true,
			spaceBetween: 10,
			pagination: {
				el: '.js-swiper04-pagination-' + i,
				type: 'fraction',
				// 番号付きページャを0詰する
				formatFractionCurrent: function (number) {
					let currentNum = zeroPad(number);
					return currentNum;
				},
				formatFractionTotal: function (number) {
					let totalNum = zeroPad(number);
					return totalNum;
				}
			},
			navigation: {
				nextEl: '.js-swiper04-next-' + i,
				prevEl: '.js-swiper04-prev-' + i,
			},
		}

		const swiper04 = new Swiper('.js-swiper04-' + i, swiper04Options);
	});

})();


/**
 * サムネイル付き
 */
(function () {

	const swiper05Imgs = document.querySelectorAll('.js-swiper05 .swiper-slide img');

	// スライダーの各画像のパスの配列を生成
	const swiper05ImgsSrc = Array.from(swiper05Imgs).map((val) => {
		return val.getAttribute('src');
	})

	const swiper05Options = {
		loop: true,
		pagination: {
			el: '.js-swiper05-thumbs',
			clickable: true,
			renderBullet: function (index, className) {
				// 下のサムネイルブロックを出力
				return '<div class="' + className + '"><img src="' + swiper05ImgsSrc[index] + '"></div>';
			},
		},
	};

	const swiper05 = new Swiper('.js-swiper05', swiper05Options);

}());


/**
 * ローディングつきページャ
 */
(function () {

	const swiper06Options = {
		loop: true,
		pagination: {
			el: '.js-swiper06-pagination',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + '<svg width="20" height="20" viewBox="0 0 20 20">' + '<circle class="path" cx="10" cy="10" r="9" fill="none" transform="rotate(-90 10 10)" stroke="#000"' + 'stroke-opacity="1" stroke-width="2px"></circle>' + '<circle cx="10" cy="10" r="5" fill="#000"></circle>' + '</svg></span>';
			},
		},
		autoplay: {
			delay: 3000,
		},
	};

	const swiper06 = new Swiper('.js-swiper06', swiper06Options);

	/**
	 * プログレスバーつきコンテンツスライダー
	 */
	(function () {

		const swiper07Options = {
			slidesPerView: 'auto',
			spaceBetween: 30,
			freeMode: true,
			mousewheel: {
				invert: false,
			},
			scrollbar: {
				el: '.js-swiper07-scrollbar',
				draggable: true,
			},
		};

		const swiper07 = new Swiper('.js-swiper07', swiper07Options);

	}());

}());
