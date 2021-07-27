
var googleUser = null
window.onload = event => {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
           // console.log('Logged in as: ' + user.displayName);
            var googleUserId = user.uid;
            googleUser = user;
            getNotes(googleUserId);
        } else {
            window.location = 'index.html';
        }
    });
}

const getNotes = (userId) => {
    const notesRef = firebase.database().ref(`users/${userId}`)
    notesRef.on('value', (snapshot) => {
        const data = snapshot.val();
       renderDataAsHTML(data)
    })
}


const renderDataAsHTML = (data) => {
    let cards = ``;
    console.log(data)
    for(let noteItem in data){
        const note = data[noteItem];
        //console.log(`${note.title} ${note.text}`);
        cards += createCard(note)
    }
    document.querySelector("#app").innerHTML= cards
}

const createCard = (note) => {
    var newColor = randomize_color()
    return `
        <div class="column is-one-quarter">
            <div class="card" style="background:${newColor}">
                <header class="card-header">
                    <p class="card-header-title">${note.title}</p>
                   
                </header>
                <div class="card-content">
                  
                    <div class="content">${note.text}</div>
                </div>
                <footer class="card-footer"> <p>${googleUser.displayName}</p></footer>
            </div>
        </div>
    `;
}

const randomize_color = () => {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
}