let firebaseUrl = "https://webdizajn-8576a-default-rtdb.firebaseio.com/"
var organizatoriFestivala = {};
var organizatoriFestivala_id = {};

var request = new XMLHttpRequest();
request.onreadystatechange = function(e) {
    if (this.readyState == 4)
        if (this.status == 200) {
            removeListCards('lista_organizatora');
            organizatoriFestivala_id = [];
            organizatoriFestivala = JSON.parse(request.responseText);
            for (var id in organizatoriFestivala) {
                var organizator = organizatoriFestivala[id];
                appendOrganizatorCard('lista_organizatora', organizator, id);
                organizatoriFestivala_id.push(id);
            }
        } else {
            // alert('Doslo je do greske! Organizatori ne mogu biti ucitani');
        }
}

request.open('GET', firebaseUrl + '/organizatoriFestivala.json');
request.send();

function appendOrganizatorCard(position, organizator, id) {
    var li_element = document.createElement('li');
    var mainDiv = document.createElement('div');
    var bodyDiv = document.createElement('div');
    var nameh5 = document.createElement('h5');
    var logoImg = document.createElement('img');
    var button = document.createElement('button');
    var addressP = document.createElement('p');
    var yearP = document.createElement('p');
    var phoneP = document.createElement('p');
    var emailP = document.createElement('p');

    mainDiv.classList.add('card');
    mainDiv.classList.add('b_change');
    bodyDiv.classList.add('card-body');
    nameh5.classList.add('card-title');
    logoImg.classList.add('img_change');
    button.classList.add('btn', 'btn-primary');

    logoImg.src = organizator.logo;
    logoImg.alt = organizator.naziv;
    nameh5.innerText = organizator.naziv;
    addressP.innerText = "Adresa: " + organizator.adresa;
    yearP.innerText = "Godina osnivanja: " + organizator.godinaOsnivanja;
    phoneP.innerText = "Kontakt telefon: " + organizator.kontaktTelefon;
    emailP.innerText = "Email: " + organizator.email;
    button.innerText = 'Saznajte više';
    button.setAttribute('id', id);
    

    button.onclick = function() {
        var url = 'pojedinacni_organizatori.html?id=' + encodeURIComponent(id);
        window.location.href = url;
    }

    bodyDiv.appendChild(nameh5);
    // bodyDiv.appendChild(addressP);
    // bodyDiv.appendChild(yearP);
    // bodyDiv.appendChild(phoneP);
    // bodyDiv.appendChild(emailP);
    bodyDiv.appendChild(document.createElement('br'));
    bodyDiv.appendChild(button);

    mainDiv.appendChild(logoImg);
    mainDiv.appendChild(bodyDiv);

    li_element.appendChild(mainDiv);
    li_element.classList.add('poboljsaj_element_lk');

    document.getElementById(position).appendChild(li_element);
}

function removeListCards(li) {
    // var liElement = document.getElementById(li);
    // while (liElement.firstChild) {
    //     liElement.removeChild(liElement.lastChild);
    // }
}


