function abrirBuscador() {
  window.open("vistas/busqueda.html", "_self");
}

function abrirBuscadorMoneda() {
  window.open("vistas/busquedaMoneda.html", "_self");
}

function abrirResumenes() {
  window.open("vistas/resumenes.html", "_self");
}

function abrirInfMercado() {
  window.open("vistas/infMercado.html", "_self");
}

function goBack() {
  window.history.back();
}

function buscar() {
  var a = arguments[0];
  $("#Table").append("<h4> Resultados de " + a + "</h4>");
  $(document).ready(function() {
    $.ajax({
        url: 'http://bittrex.com/api/v1.1/public/getmarkets',
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        var encontrado = false;
        $("#Table").empty();
        obj = data;
        length = obj.result.length;
        $("#Table").append('<div class="panel-group" id="panel-group">');
        for (var i = 0; i < length; i++) {
          if (obj.result[i].MarketCurrencyLong.includes(a) || obj.result[i].MarketCurrency.includes(a)) {
            encontrado = true;
            $("#panel-group").append('<div class="panel panel-default" id="panel' + i + '">');
            $("#panel" + i).append(
              '<div class="panel-heading">' + obj.result[i].MarketCurrencyLong + ' (' + obj.result[i].MarketCurrency + ')</div>' +
              '<div class="panel-body"><center>' +
              '<img src="' + obj.result[i].LogoUrl + '" style="width:50px;height:50px;">' +
              '<p>Tipo de moneda: ' + obj.result[i].BaseCurrencyLong + '</p>' +
              '</center></div>'
            );
            $("#panel-group").append('</div>');
          }
        }
        $("#Table").append('</div>');
        if (encontrado == false) {
          $("#Table").empty();
          $("#Table").html("<h4>No se encontró resultado</h4>")
        }
      })
      .fail(function() {
        alert("fail");
      })
  });
}

function buscarMoneda() {
  var a = arguments[0];
  $("#Tabla").append("<h4> Resultados de " + a + "</h4>");
  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getcurrencies',
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        var encontrado = false;
        $("#Table").empty();
        obj = data;
        length = obj.result.length;
        $("#Table").append('<div class="panel-group" id="panel-group">');
        for (var i = 0; i < length; i++) {
          if (obj.result[i].CurrencyLong.includes(a) || obj.result[i].Currency.includes(a)) {
            encontrado = true;
            $("#panel-group").append('<div class="panel panel-default" id="panel' + i + '">');
            $("#panel" + i).append(
              '<div class="panel-heading">' + obj.result[i].CurrencyLong + ' (' + obj.result[i].Currency + ')</div>' +
              '<div class="panel-body">' +
              '<p>Confirmación Mínima: ' + obj.result[i].MinConfirmation + '</p>' +
              '<p>Cuota: ' + obj.result[i].TxFee + '</p>' +
              '<p>Activa?: ' + obj.result[i].IsActive + '</p>' +
              '<p>Tipo de moneda: ' + obj.result[i].CoinType + '</p>' +
              '</div>'
            );
            $("#panel-group").append('</div>');
          }
        }
        $("#Table").append('</div>');
        if (encontrado == false) {
          $("#Table").empty();
          $("#Table").html("<h4>No se encontró resultado</h4>")
        }
      })
      .fail(function() {
        alert("fail");
      })
  });
}

function buscarInformacionMercado() {

  $("#Table").empty();
  var a = arguments[0];

  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getmarketsummary?market=' + a,
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#Table").append("<h3>" + data.result[0].MarketName + "</h3>");
        $("#Table").append("<h4>RESUMEN 24 HORAS</h4>");
        $("#Table").append('<p>Alto: ' + data.result[0].High + '</p>' +
          '<p><b>Bajo: </b>' + data.result[0].Low + '</p>' +
          '<p><b>Volumen: </b>' + data.result[0].Volume + '</p>' +
          '<p><b>Últimmo: </b>' + data.result[0].Last + '</p>' +
          '<p><b>Volumen base: </b>' + data.result[0].BaseVolume + '</p>' +
          '<p><b>Timestamp: </b>' + data.result[0].TimeStamp + '</p>' +
          '<p><b>Oferta: </b>' + data.result[0].Bid + '</p>' +
          '<p><b>Pedido: </b>' + data.result[0].Ask + '</p>' +
          '<p><b>Ordenes de compra: </b>' + data.result[0].OpenBuyOrders + '</p>' +
          '<p><b>Ordenes de venta: </b>' + data.result[0].OpenSellOrders + '</p>' +
          '<p><b>Día anterior: </b>' + data.result[0].PrevDay + '</p>' +
          '<p><b>Creado: </b>' + data.result[0].Created + '</p>');
      })
      .fail(function() {
        alert("fail");
      })
  });
  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getticker?market=' + a,
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#Table").append("<br><h4>TICKER</h4>");
        $("#Table").append("<p><b>Bid: </b>" + data.result.Bid + "</p>");
        $("#Table").append("<p><b>Pedido: </b>" + data.result.Ask + "</p>");
        $("#Table").append("<p><b>Last: </b>" + data.result.Last + "</p>");
      })
      .fail(function() {
        alert("fail");
      })
  });
}
