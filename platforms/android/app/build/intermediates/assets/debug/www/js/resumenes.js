window.onload = load;

function load() {
  $(document).ready(function() {
    $.ajax({
        url: 'https://bittrex.com/api/v1.1/public/getmarketsummaries',
        method: 'GET',
        dataType: 'json',
      })
      .done(function(data) {
        $("#Table").empty();
        obj = data;
        length = obj.result.length;
        $("#Table").append('<div class="panel-group" id="panel-group">');
        for (var i = 0; i < length; i++) {
          encontrado = true;
          $("#panel-group").append('<div class="panel panel-default" id="panel' + i + '">');
          $("#panel" + i).append(
            '<div class="panel-heading">' + obj.result[i].MarketName + '</div>' +
            '<div class="panel-body">' +
            '<p>Alto: ' + obj.result[i].High + '</p>' +
            '<p>Bajo: ' + obj.result[i].Low + '</p>' +
            '<p>Volumen: ' + obj.result[i].Volume + '</p>' +
            '<p>Últimmo: ' + obj.result[i].Last + '</p>' +
            '<p>Volumen base: ' + obj.result[i].BaseVolume + '</p>' +
            '<p>Timestamp: ' + obj.result[i].TimeStamp + '</p>' +
            '<p>Oferta: ' + obj.result[i].Bid + '</p>' +
            '<p>Pedido: ' + obj.result[i].Ask + '</p>' +
            '<p>Ordenes de compra: ' + obj.result[i].OpenBuyOrders + '</p>' +
            '<p>Ordenes de venta: ' + obj.result[i].OpenSellOrders + '</p>' +
            '<p>Día anterior: ' + obj.result[i].PrevDay + '</p>' +
            '<p>Creado: ' + obj.result[i].Created + '</p>' +
            '</div>'
          );
          $("#panel-group").append('</div>');
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
