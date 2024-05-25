document.addEventListener("DOMContentLoaded", function () {
  const firebaseUrl = "https://webdizajn-8576a-default-rtdb.firebaseio.com";

  function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
  }

  const organizatorId = getParameterByName("id");

  if (organizatorId) {
    console.log(
      `URL: ${firebaseUrl}/organizatoriFestivala/${organizatorId}.json`
    );
    fetch(`${firebaseUrl}/organizatoriFestivala/${organizatorId}.json`)
      .then((response) => response.json())
      .then((organizatorData) => {
        console.log("organizator: ", JSON.stringify(organizatorData));
        processOrganizatorResponse(organizatorData)
        fetch(`${firebaseUrl}/festivali/${organizatorData.festivali}.json`)
          .then((response) => response.json())
          .then((festivaliData) => {
            console.log("festivali: ", JSON.stringify(festivaliData));
            processFirebaseResponse(festivaliData, organizatorData);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // alert("Došlo je do greške prilikom učitavanja podataka.");
      });
  } else {
    // console.error("Error:", error);
    // alert('Nema podataka o organizatoru.');
  }
});

function appendFestivalCard(position, festival, id) {
  console.log("festiva: ", JSON.stringify(festival));
  var li_element = document.createElement("li");
  var mainDiv = document.createElement("div");
  var bodyDiv = document.createElement("div");
  var nameh5 = document.createElement("h5");
  var opisP = document.createElement("p");
  var logoImg = document.createElement("img");
  var button = document.createElement("button");
  var tipDiv = document.createElement("div");
  var prevozDiv = document.createElement("div");
  var cenaDiv = document.createElement("div");
  var maxOsobaDiv = document.createElement("div");

  mainDiv.classList.add("card");
  mainDiv.classList.add("b_change");
  bodyDiv.classList.add("card-body");
  nameh5.classList.add("card-title");
  logoImg.classList.add("img_change");
  button.classList.add("btn", "btn-primary");

  logoImg.src = festival.slike[0];
  logoImg.alt = festival.naziv;
  nameh5.innerText = festival.naziv;
  // opisP.innerText = festival.opis;
  // tipDiv.innerText = "Tip: " + festival.tip;
  // prevozDiv.innerText = "Prevoz: " + festival.prevoz;
  // cenaDiv.innerText = "Cena: " + festival.cena;
  // maxOsobaDiv.innerText = "Maksimum osoba: " + festival.maxOsoba;
  button.innerText = "Saznajte vise";
  button.setAttribute('id', id);
    

  button.onclick = function() {
      var url = 'festivali.html?id=' + encodeURIComponent(id);
      window.location.href = url;
  }
  


  bodyDiv.appendChild(nameh5);
  bodyDiv.appendChild(opisP);
  bodyDiv.appendChild(tipDiv);
  bodyDiv.appendChild(prevozDiv);
  bodyDiv.appendChild(cenaDiv);
  bodyDiv.appendChild(maxOsobaDiv);

  bodyDiv.appendChild(document.createElement('br'));
  bodyDiv.appendChild(button);

  mainDiv.appendChild(logoImg);
  mainDiv.appendChild(bodyDiv);

  li_element.appendChild(mainDiv);
  li_element.classList.add("poboljsaj_element_lk");

  document.getElementById(position).appendChild(li_element);
}

function processFirebaseResponse(response, organizatorData) {
  for (const key in response) {
    const festival = response[key];
    appendFestivalCard("festivali", festival, organizatorData.festivali);
  }
}

/* 
{
  "adresa": "Karađorđeva 12, Lazarevac, 11550",
  "email": "office@lazarevacmusicdays.rs",
  "festivali": "-MNVEu6iMr2EFlQO6TW61",
  "godinaOsnivanja": "2018",
  "kontaktTelefon": "014/7552-322",
  "logo": "https://i.imgur.com/NhAzBBF.jpeg",
  "naziv": "Lazarevac Fest"
}
*/

function processOrganizatorResponse(organizator) {
  console.log("organizator", JSON.stringify(organizator));

    var mainDiv = document.createElement('div');
    var bodyDiv = document.createElement('div');
    var nameh5 = document.createElement('h5');
    var logoImg = document.createElement('img');
    var addressP = document.createElement('p');
    var yearP = document.createElement('p');
    var phoneP = document.createElement('p');
    var emailP = document.createElement('p');

    logoImg.classList.add('img_change');
    

    logoImg.src = organizator.logo;
    logoImg.alt = organizator.naziv;
    nameh5.innerText = organizator.naziv;
    addressP.innerText = "Adresa: " + organizator.adresa;
    yearP.innerText = "Godina osnivanja: " + organizator.godinaOsnivanja;
    phoneP.innerText = "Kontakt telefon: " + organizator.kontaktTelefon;
    emailP.innerText = "Email: " + organizator.email;

        

    bodyDiv.appendChild(nameh5);
    bodyDiv.appendChild(addressP);
    bodyDiv.appendChild(yearP);
    bodyDiv.appendChild(phoneP);
    bodyDiv.appendChild(emailP);
    bodyDiv.appendChild(document.createElement('br'));
    

    mainDiv.appendChild(logoImg);
    mainDiv.appendChild(bodyDiv);

    document.getElementById("organizatorDetalji").appendChild(mainDiv);
}
