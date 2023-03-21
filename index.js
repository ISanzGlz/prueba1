/*Esta información no se debe de poner de forma pública en nuestros proyectos*/
const firebaseConfig = {
    apiKey: 'AIzaSyB3ued0-zIhaH6fUEeiLse8eTDB--9ioq0',
    authDomain: 'trucker-dev-8dfaf.firebaseio.com',
    databaseURL: 'https://trucker-dev-8dfaf.firebaseio.com',
    projectId: 'trucker-dev-8dfaf',
    storageBucket: 'trucker-dev-8dfaf.appspot.com'
};

const email = 'practicas.tic@cesefor.com'
const password = 'HqfTv5PB'
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = app.auth();

app
.auth()
.signInWithEmailAndPassword(email, password)
.then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    //console.log(user)
    // ...
})
.catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
});

var company1 = "B42126235";
var company2 = "A46412854";
var user = "3dJaSwtDMjPPQbElEaRQIe4WRJG2";
var geojsonSteps;

geojsonSteps = {};
geojsonSteps['type'] = 'FeatureCollection';
geojsonSteps['features'] = [];
db.collection('truckers').where("company", "==", company1)/*.where("id", "==", "lfgHJQQsK4vLY0TvVRL4")*//*.where("userId", "==", user)*/.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => `);
        var datos = doc.data();
        var auxiliar1 = [];
        datos.steps.forEach(function(elemento) {
            
            auxiliar1.push(elemento.lon);
            auxiliar1.push(elemento.lat); 
            var posicion = elemento.position;
            var newFeature = {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": auxiliar1
                },
                "properties": {
                    "company": datos.company,
                    "userId": datos.userId,
                    "posicion": posicion,
                    "id": datos.id,
                    "fecha": elemento.creationDate
                }
            };
            
            geojsonSteps['features'].push(newFeature);
            auxiliar1 = [];
            
        });
        //console.log(geojsonSteps);
        
    });
    console.log(JSON.stringify(geojsonSteps, null, 2));
});  