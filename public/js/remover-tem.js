function removeItem(usuario) {
    $(".linha-item").off()
    $(".linha-item").on('dblclick', function () {
        var key = $(this).attr('id')
        firebase.database().ref('usuarios/' + usuario.uid + '/gastos/' + key).remove();        
        $("#tabela-gastos").DataTable().row("#" + key).remove().draw();
    })
}