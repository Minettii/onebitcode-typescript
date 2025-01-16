"use strict";
let spaceships = [];
function saveSpaceship(name, pilot, crewLimit) {
    let crew = [];
    let inMission = false;
    spaceships.push({ name, pilot, crewLimit, crew, inMission });
}
function addCrew(crewMember, spaceship) {
    if (spaceship.crewLimit === spaceship.crew.length) {
        alert("Não foi possível adicionar um membro à tripulação, o limite de tamanho máximo da tripulação foi atingido");
    }
    else {
        spaceship.crew.push(crewMember);
        alert("Membro adicionado à tripulação.");
    }
}
function sendToMission(spaceship) {
    if (spaceship.inMission) {
        alert("Não foi possível enviar a nave em uma missão, pois a nave já está em uma missão.");
    }
    else if (spaceship.crew.length < Math.floor(spaceship.crewLimit / 3)) {
        alert("Não foi possível enviar a nave em uma missão, pois menos de um terço de sua tripulação está preenchida.");
    }
    else {
        spaceship.inMission = true;
        alert("Nave enviada em uma missão.");
    }
}
function showSpaceships() {
    let txt = "";
    spaceships.forEach((spaceship) => {
        txt += `Nave: ${spaceship.name}\nPiloto: ${spaceship.pilot}\nLimite de tripulantes: ${spaceship.crewLimit}\n`;
        if (spaceship.crew.length === 0) {
            txt += "Atualmente não há nenhum membro na tripulação\n";
        }
        else {
            txt += "Membros da tripulação:\n";
        }
        for (let i = 0; i < spaceship.crew.length; i++) {
            txt += `Membro ${i + 1}: ${spaceship.crew[i]}\n`;
        }
        if (spaceship.inMission) {
            txt += "Atualmente a nave está em uma missão.\n\n";
        }
        else {
            txt += "Atualmente a nave não está em uma missão.\n\n";
        }
    });
    alert(txt);
}
