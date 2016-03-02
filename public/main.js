$(function() {

transactions();

var intervalThreeID = setInterval(transactions, 5000);

function transactions () {
  $.getJSON('https://www.shapeshift.io/getcoins').success(function(result) {
    $.getJSON("https://shapeshift.io/recenttx").success(function(recent) {
        $("#txs").empty();
        recent.forEach(function(obj) {
        $("#txs").append("<li>" + " " + obj.amount + "<img alt = '" +
                          result[obj.curIn].name + "' src='"+result[obj.curIn].image +
                          "'/>" + " " + "<i class='fa fa-arrow-circle-o-right'></i>" +
                          "<img alt ='" + result[obj.curOut].name + " " + "' src='" +
                          result[obj.curOut].image + "'/>" + obj.amountOut + "</li>");
        });
    });
  });
}

var intervalTwoID = setInterval(compare, 30000);

function compare() {
  $.getJSON("https://www.shapeshift.io/marketinfo/" + $("#coinOne").val() + "_" + $("#coinTwo").val()).then(function(price) {
      if ($("#coinOne").val() === $("#coinTwo").val()) {
          $("#selectedPair").empty();
          alert("Please change pair!");
      } else {
          $("#selectedPair").html(price.pair);
          $("#exchangeRate").html(price.rate);

          var val = localStorage.getItem(price.pair);
          var count = Number( val )+1;
          localStorage.setItem(price.pair, count);
      }
  }, function(e) {
      alert("There was an error! Check lines 25 through 36.", e);
  });
};

$.getJSON("https://coincap.io/history/BTC", function(data) {
  $(".container").highcharts("StockChart", {
      rangeSelector: {
          selected: 1
      },
      title: {
          text: "Bitcoin Price"
      },
      series: [{
          name: "BTC",
          data: data.price,
          tooltip: {
              valueDecimals: 4
          }
      }]
  });
});

function currencyFormat(num) {
  if (typeof num === 'string') {
      num = parseFloat(num);
  }
  return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

marketData();
var intervalID = setInterval(marketData, 5000);

function marketData() {
  $.getJSON("https://www.coincap.io/global").then(function(marketCap) {
    $("#bitcoinPrice").html("<h2>" + "$" + marketCap.btcPrice + "</h2>");
    $("#bitcoinMarketCap").html("<h3>" + currencyFormat(marketCap.btcCap) + "</h3>");
  });
}

// Fetch the 5 hottest posts on /r/Bitcoin
reddit.hot('Bitcoin').limit(5).fetch(function(res) {
    // res contains JSON parsed response from Reddit
  for (i = 1; i < res.data.children.length; i++) {
    $('#reddit').append("<table><tr><td>" + "<a href='https://www.reddit.com" + res.data.children[i].data.permalink + "'>" + res.data.children[i].data.title + "</a>" + "</td></tr></table>");
  }
});

$("#priceFinder").on("click", function() {
  return compare();
});

  $('.selectpicker').selectpicker({
    style: 'btn-success',
    size: 5
  });

$("#priceFinder").on('click', function(){
  var currencies = '';
  $('button[data-id]').each(function(i) {
    currencies += $(this).attr('title');
  });
  console.log(currencies);
});
});