import {Search}from'./search';

export const SEARCH: Search =
	{
		ads: ['img/ad1.png', 'img/ad2.png', 'img/ad3.png'],
		hotSearch: ['#剧版致青春#', '#chinajoy2016#', '#林心如结婚#', '热门话题'],
		group: [[
			//group1
			{
				icon: 'img/hot_weibo.png',
				title: '热门微博',
				subTitle: '全站最热微博尽搜罗'
			},
			{
				icon: 'img/weibo_search.png',
				title: '找人',
				subTitle: ''
			}],

			//group2
			[
				{
					icon: 'img/search-toutiao.png',
					title: '微博头条',
					subTitle: '随时随地一起看新闻'
				},
				{
					icon: 'img/search-game.png',
					title: '玩游戏',
					subTitle: '微博上最火的游戏'
				},
				{
					icon: 'img/search-location.png',
					title: '周边',
					subTitle: '发现“伦教街区”新鲜事'
				}
			],

			//group3
			[{
				icon: 'img/search-pai.png',
				title: '随手拍',
				subTitle: '网红征集令'
			},
				{
					icon: 'img/search-gupiao.png',
					title: '股票',
					subTitle: ''
				},
				{
					icon: 'img/search-film.png',
					title: '电影',
					subTitle: '优惠电影就在这里！'
				}
			]
		]
	}
	;