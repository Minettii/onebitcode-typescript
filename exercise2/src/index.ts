let planets: Array<{
	name: string;
	coordinates: [number, number, number, number];
	situation: Situation;
	satellites: Array<string>;
}> = [];

type Situation = "habitado" | "habitável" | "inabitável" | "inexplorado";

function addPlanet(
	name: string,
	coordinates: [number, number, number, number],
	situation: Situation
) {
	let satellites: string[] = [];
	planets.push({
		name,
		coordinates,
		situation,
		satellites,
	});
}

function changeSituation(
	planet: { situtation: Situation },
	situation: Situation
) {
	planet.situtation = situation;
}

function addSatellite(
	planet: { satellites: Array<string> },
	satellite: string
) {
	planet.satellites.push(satellite);
}

function removeSatellite(
	planet: { satellites: Array<string> },
	satellite: string
) {
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
