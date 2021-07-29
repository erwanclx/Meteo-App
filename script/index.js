// Langage : Javascript
const apiKey = "18fcb72d4amsh59ca4406c94b95cp19df0ejsnd735e115a760";

const errorContainer = document.querySelector("#error");

const getWeather = async (city) => {
    
    // Récupération des données depuis l'API
    const url = `https://community-open-weather-map.p.rapidapi.com/find?q=${city.replace(' ', "%20")}`;
    const data = await fetch(url, {
        headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
        }})
        .then(response => response.json());
    
    if (data.list.length > 0) {
        // Extraction des données importantes
        const town = data.list[0].name;
        const temp = data.list[0].main.temp - 273.25;
        const weather = data.list[0].weather[0].main;
        const description = data.list[0].weather[0].description;
        const humidity = data.list[0].main.humidity;
    
        // Affichage des données;
        errorContainer.style.display = "none";
        showInformationsBlocks();

        document.querySelector("#city").textContent = town;
        document.querySelector("#temp").textContent = Math.round(temp *10 ) / 10;
        document.querySelector("#conditions").textContent = description;
        document.querySelector("#humidity").textContent = humidity;
    }
    else{
        document.querySelector("#city").textContent = city;
        errorContainer.style.display = "block";
        errorContainer.textContent = "Aucune information disponible pour cette ville.";

        hiddenInformationsBlocks();
    }

}

const btnSearch = document.querySelector(".search-button");
const inputSearch = document.querySelector("#search-area");
btnSearch.addEventListener("click" , (e) => {
    e.preventDefault();
    getWeather(inputSearch.value);
    inputSearch.value = "";
});


const hiddenInformationsBlocks = () => {
    document.querySelector("#temp").parentNode.style.display = "none";
    document.querySelector("#conditions").parentNode.style.display = "none";
    document.querySelector("#humidity").parentNode.style.display = "none";
}

const showInformationsBlocks = () => {
    document.querySelector("#city").parentNode.style.display = "block";
    document.querySelector("#temp").parentNode.style.display = "block";
    document.querySelector("#conditions").parentNode.style.display = "block";
    document.querySelector("#humidity").parentNode.style.display = "block";
}
