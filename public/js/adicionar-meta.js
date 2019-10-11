var evniar = $("#encaminhar")

evniar.click(function () {
    var form = $(".meta")
    var user = firebase.auth().currentUser.uid;

    var data = {}


    form.each(function () {
        var input = $(this)
        if (input.val() == '') {
            input.addClass('border border-danger')
        } else {
            input.removeClass('border border-danger')
            data[input.data("firebase")] = input.val().trim()
        }
    })
    if (Object.keys(data).length == 3) {

        data['metaInicial'] = $("#metaInicial").val()
        data['metaFinal'] = $("#metaFinal").val()
        var now = new Date();
        data['dtInicio'] = now
        data['dataFinal'] = $("#dataFinal").val()
        
        
        firebase.database().ref("metas/" + user).set({
            metaInicial: $("#metaInicial").val(),
            metaFinal: $("#metaFinal").val(),
            dtInicio: now,
            dataFinal: $("#dataFinal").val()
        });

        /*
        firebase.database().ref("/usuarios/" + user + "/metas").push(data)
            .catch(error => {
                console.log(error);

            })*/
            
        form.each(function () {
            $(this).val('')
        })
        var dNow = new Date();
        var localidade = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
        $("#confirmacao").text('Última Atualização: ' + localidade)
        $("#confirmacao").addClass('border-success')
        $("#confirmacao").removeClass('border-danger')

    } else {
        $("#confirmacao").addClass('border-danger')
        $("#confirmacao").removeClass('border-success')
        $("#confirmacao").text('Preencha todos os dados necessários.')
    }


})

function timeStampDate(data) {
    var date = data.split("-");
    var novaData = date[1] + '/' + date[2] + '/' + date[0]
    var time = new Date(novaData).getTime()
    return time
}