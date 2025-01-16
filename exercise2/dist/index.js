"use strict";
let planets = [];
function addPlanet(name, coordinates, situation) {
    let satellites = [];
    planets.push({
        name,
        coordinates,
        situation,
        satellites,
    });
}
function changeSituation(planet, situation) {
    planet.situtation = situation;
}
function addSatellite(planet, satellite) {
    planet.satellites.push(satellite);
}
function removeSatellite(planet, satellite) {
    let id = planet.satellites.indexOf(satellite);
    if (id !== -1) {
        planet.satellites.splice(id, 1);
    }
}
function showPlanets() {
    let txt = "";
    planets.forEach((planet) => {
        txt += `Planeta: ${planet.name}\nCoordenadas: ${planet.coordinates}\nSituação: ${planet.situation}\nSatélites: ${planet.satellites}\n\n`;
    });
    console.log(txt);
}
