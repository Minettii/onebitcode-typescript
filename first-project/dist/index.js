"use strict";
var _a, _b, _c;
function sendSpaceship(name, captain) {
    const spaceship = {
        name,
        captain,
        speed: 20,
        inMission: true,
        crew: [],
    };
    alert(`A nave ${spaceship.name} comandada pelo capitão ${spaceship.captain} foi enviada em uma missão.`);
    return spaceship;
}
function accelerate(targetSpeed, spaceship) {
    if (spaceship.speed > targetSpeed) {
        alert(`Reduzindo a velocidade da ${spaceship.name} para ${targetSpeed}`);
    }
    else if (spaceship.speed < targetSpeed) {
        alert(`Aumentando a velocidade da ${spaceship.name} para ${targetSpeed}`);
    }
    else {
        alert(`Mantendo a velocidade da ${spaceship.name}`);
    }
}
const spaceshipName = (_a = prompt("Insira o nome da nave a ser enviada.")) !== null && _a !== void 0 ? _a : "Nave";
const spaceshipCaptain = (_b = prompt("Insira o nome do capitão da nave.")) !== null && _b !== void 0 ? _b : "Capitão";
const currentShip = sendSpaceship(spaceshipName, spaceshipCaptain);
const speed = (_c = Number(prompt("Insira a velocidade para qual deseja acelerar."))) !== null && _c !== void 0 ? _c : 20;
accelerate(speed, currentShip);
