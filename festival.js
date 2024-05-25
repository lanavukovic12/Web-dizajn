document.addEventListener("DOMContentLoaded", function () {
    const firebaseUrl = "https://webdizajn-8576a-default-rtdb.firebaseio.com";
  
    function getParameterByName(name) {
      const url = new URL(window.location.href);
      return url.searchParams.get(name);
    }
  
    const festivalId = getParameterByName("id");
  
    if (festivalId) {
      console.log(
        `URL: ${firebaseUrl}/festivali/${festivalId}.json`
      );
      fetch(`${firebaseUrl}/festivali/${festivalId}.json`)
        .then((response) => response.json())
        .then((festivalData) => {
          console.log("festival: ", JSON.stringify(festivalData));
             processFirebaseResponse(festivalData);
        //   processOrganizatorResponse(organizatorData)
        //   fetch(`${firebaseUrl}/festivali/${organizatorData.festivali}.json`)
        //     .then((response) => response.json())
        //     .then((festivaliData) => {
        //       console.log("festivali: ", JSON.stringify(festivaliData));
        //       processFirebaseResponse(festivaliData);
        //     });
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



  function appendFestivalCard(position, festival) {
    console.log("festiva: ", JSON.stringify(festival));
    var li_element = document.createElement("li");
    var mainDiv = document.createElement("div");
    var bodyDiv = document.createElement("div");
    var nameh5 = document.createElement("h5");
    var opisP = document.createElement("p");
    var logoImg = document.createElement("img");
    var tipDiv = document.createElement("div");
    var prevozDiv = document.createElement("div");
    var cenaDiv = document.createElement("div");
    var maxOsobaDiv = document.createElement("div");
  
    mainDiv.classList.add("card");
    mainDiv.classList.add("b_change");
    bodyDiv.classList.add("card-body");
    nameh5.classList.add("card-title");
    logoImg.classList.add("img_change");
    
  
    logoImg.src = festival.slike[0];
    logoImg.alt = festival.naziv;
    nameh5.innerText = festival.naziv;
    opisP.innerText = festival.opis;
    tipDiv.innerText = "Tip: " + festival.tip;
    prevozDiv.innerText = "Prevoz: " + festival.prevoz;
    cenaDiv.innerText = "Cena: " + festival.cena;
    maxOsobaDiv.innerText = "Maksimum osoba: " + festival.maxOsoba;
    
      
  
    
    
  
  
    bodyDiv.appendChild(nameh5);
    bodyDiv.appendChild(opisP);
    bodyDiv.appendChild(tipDiv);
    bodyDiv.appendChild(prevozDiv);
    bodyDiv.appendChild(cenaDiv);
    bodyDiv.appendChild(maxOsobaDiv);
  
    bodyDiv.appendChild(document.createElement('br'));
  
    mainDiv.appendChild(logoImg);
    mainDiv.appendChild(bodyDiv);
  
    li_element.appendChild(mainDiv);
    li_element.classList.add("poboljsaj_element_lk");
  
    document.getElementById(position).appendChild(li_element);
  }
  
  function processFirebaseResponse(response) {
    for (const key in response) {
      const festival = response[key];
      appendFestivalCard("festivali", festival);
    }
  }