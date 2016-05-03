$(function() {

transactions();

var intervalThreeID = setInterval(transactions, 5000);

function transactions () {
  $.getJSON('https://www.shapeshift.io/getcoins').success(function(icon) {
    $.getJSON("https://shapeshift.io/recenttx").success(function(recent) {
        $("#txs").empty();
        recent.forEach(function(obj) {
        $("#txs").append("<td>" + " " + obj.amount.toFixed(3) + "<img alt = '" +
                          icon[obj.curIn].name + "' src='"+icon[obj.curIn].image +
                          "'/>" + " " + "<i class='fa fa-arrow-circle-o-right'></i>" +
                          "<img alt ='" + icon[obj.curOut].name + " " + "' src='" +
                          icon[obj.curOut].image + "'/>" + obj.amountOut + "</td>");
        });
    });
  });
}

function compare() {
  $.getJSON("https://www.shapeshift.io/marketinfo/" + $("#coinOne").val() + "_" + $("#coinTwo").val()).then(function(price) {
      if ($("#coinOne").val() === $("#coinTwo").val()) {
          // $("#selectedPair").empty();
          alert("Please change pair!");
      } else {
          $("#exchangeRate").html(price.rate);
      }
  }, function(e) {
      alert("There was an error! Check lines 25 through 36.", e);
  });
}

$(function () {
    $('#coinOne').change(function () {
        localStorage.setItem('coinOneChoice', this.value);
    });
    if (localStorage.getItem('coinOneChoice')) {

        $('#coinOne').val(localStorage.getItem('coinOneChoice')).trigger('change');
    }
});


$(function () {
    $('#coinTwo').change(function () {
        localStorage.setItem('coinTwoChoice', this.value);
    });
    if (localStorage.getItem('coinTwoChoice')) {

        $('#coinTwo').val(localStorage.getItem('coinTwoChoice')).trigger('change');
    }
});



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

reddit.hot('Bitcoin').limit(5).fetch(function(res) {
  for (i = 1; i < res.data.children.length; i++) {
    $('#reddit').append("<td>" + "<a href='https://www.reddit.com" + res.data.children[i].data.permalink + "'>" + res.data.children[i].data.title + "</a>" + "<p>" + "</p>" + "<p> Post authored by: " + res.data.children[i].data.author + "</p>" + "<p>" + "Number of comments: " + res.data.children[i].data.num_comments + "</p>" + "</td></tr></table>");
  }
});

$("#priceFinder").on("click", function() {
  compare();
  var intervalTwoID = setInterval(compare, 30000);

});

  $('.selectpicker').selectpicker({
    style: 'btn-success',
    size: 5
  });

// $("#priceFinder").on('click', function(){
//   var currencies = '';
//   $('button[data-id]').each(function(i) {
//     currencies += $(this).attr('title');
//   });
//   console.log("Dize", currencies);
// });
});
