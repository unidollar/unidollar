var cardData = [
	{
		name: 'United States of America',
		code: 'us'
	},
	{
		name: 'China',
		code: 'cn'
	},
	{
		name: 'Japan',
		code: 'jp'
	},
	{
		name: 'Russia',
		code: 'ru'
	},
	{
		name: 'United Kingdom',
		code: 'gb'
	},
	{
		name: 'Germany',
		code: 'de'
	},
	{
		name: 'India',
		code: 'in'
	},
	{
		name: 'Iran',
		code: 'ir'
	},
	{
		name: 'Israel',
		code: 'il'
	},
	{
		name: 'North Korea',
		code: 'kp'
	},
	{
		name: 'Saudi Arabia',
		code: 'sa'
	},
	{
		name: 'Pakistan',
		code: 'pk'
	},
	{
		name: 'United States of America',
		code: 'us'
	},
	{
		name: 'China',
		code: 'cn'
	},
	{
		name: 'Japan',
		code: 'jp'
	},
	{
		name: 'Russia',
		code: 'ru'
	},
	{
		name: 'United Kingdom',
		code: 'gb'
	},
	{
		name: 'Germany',
		code: 'de'
	},
	{
		name: 'India',
		code: 'in'
	},
	{
		name: 'Iran',
		code: 'ir'
	},
	{
		name: 'Israel',
		code: 'il'
	},
	{
		name: 'North Korea',
		code: 'kp'
	},
	{
		name: 'Saudi Arabia',
		code: 'sa'
	},
	{
		name: 'Pakistan',
		code: 'pk'
	}
];

var abi = [
	{
		constant: true,
		inputs: [],
		name: 'allAttackInfo',
		outputs: [
			{
				internalType: 'uint256',
				name: 'jackpot',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'attackIndex',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'attackStart',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'currentBlock',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'attackDuration',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [],
		name: 'allCardsInfo',
		outputs: [
			{
				internalType: 'address[]',
				name: 'owners',
				type: 'address[]'
			},
			{
				internalType: 'uint256[]',
				name: 'currentPrices',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'currentLevels',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'attackTimes',
				type: 'uint256[]'
			},
			{
				internalType: 'uint256[]',
				name: 'shares',
				type: 'uint256[]'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: true,
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address'
			}
		],
		name: 'allInfoFor',
		outputs: [
			{
				internalType: 'uint256',
				name: 'userBalance',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userShares',
				type: 'uint256'
			},
			{
				internalType: 'uint256',
				name: 'userWithdrawable',
				type: 'uint256'
			}
		],
		payable: false,
		stateMutability: 'view',
		type: 'function'
	},
	{
		constant: false,
		inputs: [],
		name: 'startRound',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	},
	{
		constant: false,
		inputs: [],
		name: 'withdraw',
		outputs: [],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

var address = '0xEB9B6036FAdEC878AadfDc06A4cD34D22aF72d1D';
var Cards = web3.eth.contract(abi).at(address);

var tokenAbi = [
	{
		constant: false,
		inputs: [
			{
				internalType: 'address',
				name: '_to',
				type: 'address'
			},
			{
				internalType: 'uint256',
				name: '_tokens',
				type: 'uint256'
			},
			{
				internalType: 'bytes',
				name: '_data',
				type: 'bytes'
			}
		],
		name: 'transferAndCall',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool'
			}
		],
		payable: false,
		stateMutability: 'nonpayable',
		type: 'function'
	}
];

var tokenAddress = '0x14409B0Fc5C7f87b5DAd20754fE22d29A3dE8217';
var PYRO = web3.eth.contract(tokenAbi).at(tokenAddress);

var allCards = [];

function update() {
	Cards.allCardsInfo.call(function(error, data) {
		if (!error) {
			var render = $('#render');
			render.empty();
			allCards = [];
			for (var i = 0; i < data[0].length; i++) {
				var card = {
					owner: data[0][i],
					price: parseFloat(web3.fromWei(parseFloat(data[1][i]), 'ether')),
					level: parseInt(data[2][i]),
					attackTime: parseInt(data[3][i]),
					shares: parseInt(data[4][i])
				};
				var cardObj = $(`
               
          <div class="mb-3 col-12 col-lg-4 col-md-6 text-center">
          <div class="card card-frame h-100" index='${i}' price='${card.price}'>
          <div class="card-body rounded-top p-5 bg-us">
            <div class="mx-auto p-2 bg-white u-lg-avatar rounded">

          <img class="flag" src="https://pyro.network/img/${cardData[i].code}.svg" alt="">
                </div>
              </div>
							<div class="card-body">
                <div class="mb-1">
                  <span class="d-block text-dark font-weight-medium">${cardData[i].name}</span>
                </div>
              
                <span class="d-block text-secondary font-size-1">Owner: ${card.owner.slice(
									0,
									9
								)}...</span>
                <span class="d-block text-secondary font-size-1">Dividend Shares: ${card.shares}</span>
                <span class="d-block text-secondary font-size-1">Attack Time: ${moment
									.duration(card.attackTime * 15, 'seconds')
									.format('m [minutes]', { trim: 'both' })}</span>
                <a class="btn btn-xs buyCard btn-soft-red-text transition-3d-hover btn-block mt-2 text-uppercase font-weight-semi-bold lh-sm" href="">Go To War For<br /> <small>${formatNumber(
									card.price,
									5
								)} PYRO</small></a>
              </div>
            </div>
          </div>
          
        `);
				render.append(cardObj);
				card.obj = cardObj;
				allCards.push(card);
			}
			render.find('.buyCard').click(function() {
				var card = $(this).closest('.card');
				var index = parseInt(card.attr('index'));
				var price = parseFloat(card.attr('price'));
				PYRO.transferAndCall(
					address,
					web3.toWei(price, 'ether'),
					'0x' + index.toString(16).padStart(64, '0'),
					function(error, hash) {
						if (!error) {
							console.log(hash);
						} else {
							console.log(error);
						}
					}
				);
			});
			$('#filter .nav-link.active').trigger('click');
		} else {
			console.log(error);
		}
	});

	Cards.allInfoFor.call(
		web3.eth.accounts === undefined
			? '0x0000000000000000000000000000000000000001'
			: web3.eth.accounts[0],
		function(error, info) {
			if (!error) {
				$('#tokens').text(
					formatNumber(parseFloat(web3.fromWei(info[0], 'ether')), 5)
				);
				$('#withdrawable').text(
					formatNumber(parseFloat(web3.fromWei(info[2], 'ether')), 5)
				);
			} else {
				console.log(error);
			}
		}
	);

	Cards.allAttackInfo.call(function(error, info) {
		if (!error) {
			$('.jackpot').text(
				formatNumber(parseFloat(web3.fromWei(info[0], 'ether')), 5)
			);
			var index = parseInt(info[1]);
			var attackStart = parseInt(info[2]);
			var block = parseInt(info[3]);
			var duration = parseInt(info[4]);
			$('.current').text(attackStart === 0 ? 'Nobody' : cardData[index].name);
			if (attackStart === 0 || block - attackStart <= duration) {
				$('#inRound').show();
				$('#inWait').hide();
				$('#timeLeft').text(
					attackStart !== 0
						? moment
								.duration((attackStart + duration - block) * 15, 'seconds')
								.format('m [minutes] s [seconds]', { trim: 'both' })
						: '-'
				);
			} else {
				$('#inRound').hide();
				$('#inWait').show();
				var diff = block - attackStart - duration;
				$('#resetTime').text(
					diff < 40
						? moment
								.duration((40 - diff) * 15, 'seconds')
								.format('m [minutes] s [seconds]', { trim: 'both' })
						: '-'
				);
			}
		} else {
			console.log(error);
		}
	});
}

function init() {
	if (window.ethereum) {
		window.ethereum.enable();
	}

	$('.withdraw').click(function() {
		Cards.withdraw(function(error, hash) {
			if (!error) {
				console.log(hash);
			} else {
				console.log(error);
			}
		});
	});

	$('#reset').click(function() {
		Cards.startRound(function(error, hash) {
			if (!error) {
				console.log(hash);
			} else {
				console.log(error);
			}
		});
	});

	$('#filter .nav-link').click(function(e) {
		e.preventDefault();
		$('#filter .nav-link').removeClass('active');
		$(this).addClass('active');
		var filterLimit = 6;
		var states = [];
		for (var i = 0; i < allCards.length; i++) {
			states.push(true);
		}
		var orders = [];
		for (var i = 0; i < allCards.length; i++) {
			orders.push(i);
		}
		switch ($(this).attr('filter')) {
			case 'cheap': {
				var sortedPrices = [];
				for (var i = 0; i < allCards.length; i++) {
					sortedPrices.push({
						index: i,
						price: allCards[i].price
					});
				}
				sortedPrices.sort(function(a, b) {
					return a.price - b.price;
				});
				var validIndexes = [];
				for (var i = 0; i < filterLimit; i++) {
					validIndexes.push(sortedPrices[i].index);
				}
				for (var i = 0; i < allCards.length; i++) {
					states[i] = validIndexes.indexOf(i) != -1;
					orders[i] = validIndexes.indexOf(i);
				}
				break;
			}
		}

		for (var i = 0; i < allCards.length; i++) {
			if (states[i]) {
				allCards[i].obj.show();
			} else {
				allCards[i].obj.hide();
			}
			allCards[i].obj.css({ order: orders[i] });
		}
	});

	var filter = web3.eth.filter('latest');
	filter.watch(function(error, result) {
		update();
	});
	setTimeout(update, 200);
}

function log10(val) {
	return Math.log(val) / Math.log(10);
}

function formatNumber(n, maxDecimals) {
	var zeroes = Math.floor(log10(Math.abs(n)));
	var postfix = '';
	if (zeroes >= 9) {
		postfix = 'B';
		n /= 1e9;
		zeroes -= 9;
	} else if (zeroes >= 6) {
		postfix = 'M';
		n /= 1e6;
		zeroes -= 6;
	}
	zeroes = Math.min(maxDecimals, maxDecimals - zeroes);
	return (
		n.toLocaleString(undefined, {
			minimumFractionDigits: 0,
			maximumFractionDigits: Math.max(zeroes, 0)
		}) + postfix
	);
}

$(document).ready(init);