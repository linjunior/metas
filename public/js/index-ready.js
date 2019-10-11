$(document).ready(function () {

  var nav_bar = new Template_navBar($("#nav-bar"))
  nav_bar.update()
  $('.slick').slick({
    slidesToShow: 2,
    slidesToScroll: 1
  })
  var table = $("#tabela-gastos").DataTable({
    createdRow: function (row) {
      $(row).addClass('linha-item')
    },
    columns: [
      { data: 'item' },
      { data: 'valor' },
      { data: 'local' },
      { data: 'data' },
      { data: 'obs' }
    ]
  })
  adicionarGastos(table);
})



