var gIndex = graficoIndex();
function removeG_index(data) {
    var dia_Semana = new Date(data.time).getDay();
    gIndex.data.datasets[0].data[dia_Semana] -= Number(data.valor)
    gIndex.update()
}


function adicionarGastos(tabela) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $("#imagem-perfil").attr('src', user.photoURL)
            var dias_gastos = [0, 0, 0, 0, 0, 0, 0, 0]
            firebase.database().ref("/usuarios/" + user.uid + "/gastos").on("child_added", function (snapshot) {
                var key = snapshot.key
                var data = snapshot.val();
                adicionar_local(data.local)
                if (itemInSemana(data.time)) {
                    var dia_Semana = new Date(data.time).getDay()
                    var graficoMax = gIndex.options.scales.yAxes[0].ticks

                    if (Number(data.valor) > graficoMax.max) {
                        var dataSetMax = Number(data.valor) + 50
                        graficoMax.max = dataSetMax
                        gIndex.update()
                    }
                    dias_gastos[dia_Semana] += Number(data.valor)
                    gIndex.data.datasets[0].data = dias_gastos
                    gIndex.update()
                }
                data.valor = Number(data.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                data['DT_RowId'] = key;
                data['remover'] = "$('<img>').attr('href', 'icons/spinner.gif')"
                tabela.rows.add([data]).draw();
                removeItem(user)
                $(".atualizacao-tabela").each(function () {
                    $(this).text("Última atualização: " + moment().format("D/M/Y, h:mm:ss a"))
                })
            })
        }
    })
};

function itemInSemana(item) {
    var dataAtual = new Date();
    dataAtual = new Date(dataAtual.setHours(0, 0, 0, 0))
    while (dataAtual.getDay() != 0) { dataAtual.setDate(dataAtual.getDate() - 1) }
    var domingo = dataAtual.getTime()
    var sabado = dataAtual.setDate(dataAtual.getDate() + 6)
    return item >= domingo && item <= sabado
}

function adicionar_local(local) {
    var itens = $(".drop-locais")
    var locais_adicionados = [ ]

    itens.map(function() {
        locais_adicionados.push(String($(this).text()));
    })

    if (!locais_adicionados.includes(local)) {
        var elemento = $("<a>").addClass("dropdown-item drop-locais").text(local)
        $("#drop-locais").append(elemento)
    }


    itens.off()
    $(".drop-locais").click(function () {
        $("#local").val($(this).text())
    })
}