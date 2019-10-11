// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDE-Du2A0i7xs13R6iIDztOoLrBL7wwh-Q",
    authDomain: "metas-a716f.firebaseapp.com",
    databaseURL: "https://metas-a716f.firebaseio.com",
    projectId: "metas-a716f",
    storageBucket: "metas-a716f.appspot.com",
    messagingSenderId: "337338154410",
    appId: "1:337338154410:web:d4f493ba3577a057d23fd3",
    measurementId: "G-TF9H88GJ6V"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        if (location.pathname == '/login.html') {
            window.location.pathname = '/index.html'
        }
        var idUsuario = user.uid
        firebase.database().ref('usuarios/' + idUsuario).set({
            username: user.displayName,
            email: user.email,
            profile_picture: user.photoURL,
            tipoUsuario: 'aluno'
        });
        firebase.database().ref('usuarios/' + idUsuario + '/gastos/').on('child_removed', function (snapshot) {
            removeG_index(snapshot.val())
        })
    }
    else {
        if (location.pathname != '/login.html') {
            window.location.pathname = '/login.html'
        }
    }
})

var login = $("#login");
login.click(function () {
    $("#spinner").toggle()
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
        $("#spinner").toggle()

    }).catch(function (error) {

        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + '\n' + errorMessage);
        $("#spinner").toggle()

    })
});

var logout = $("#Logout");
logout.click(() => {
    firebase.auth().signOut().catch(function (error) {
        console.log(error);
    })
});

