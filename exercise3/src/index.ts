interface UserData {
	id: number;
	login: string;
	name: string;
	bio: string;
	public_repos: number;
	repos_url: string;
	message?: "Not Found";
}

interface Repository {
	name: string;
	description: string;
	fork: boolean;
	stargazers_count: number;
}

let users: UserData[] = [];

async function fetchUser(username: string) {
	try {
		const response = await fetch(
			`https://api.github.com/users/${username}`
		);
		const userData = await response.json();
		if (userData.message) {
			console.log("Usuário não encontrado.");
		} else {
			users.push({
				id: userData.id,
				login: userData.login,
				name: userData.name,
				bio: userData.bio,
				public_repos: userData.public_repos,
				repos_url: userData.repos_url,
			});
			console.log(`Usuário: ${userData.name} adicionado à lista.`);
		}
	} catch (err) {
		console.error("User Fetch error: ", err);
	}
}

async function showUser(username: string) {
	const user = users.find((user) => {
		user.login === username;
	});
	if (!user) {
		console.log(`Não foi possivel encontrar o usuário ${username}`);
		return;
	}

	let txt = `Usuário: ${user.login}\nID: ${user.id}\nNome: ${user.name}\nBio: ${user.bio}\nNúmero de repositórios: ${user.public_repos}`;
	try {
		let response = await fetch(user.repos_url);
		let repos: Repository[] = await response.json();
		let maxRepos = user.public_repos < 3 ? user.public_repos : 3;
		for (let i = 0; i < maxRepos; i++) {
			txt += `\n\nNome: ${repos[i].name}\nDescrição: ${
				repos[i].description
			}\nFork: ${repos[i].fork ? "Sim" : "Não"}\nNúmero de Stargazers: ${
				repos[i].stargazers_count
			}`;
		}
		console.log(txt);
	} catch (err) {
		console.error("Repos Fetch error: " + err);
	}
}

function showAllUsers() {
	users.forEach((user) => {
		console.log(
			`Usuário: ${user.login}\nID: ${user.id}\nNome: ${user.name}\nBio: ${user.bio}\nNúmero de repositórios: ${user.public_repos}`
		);
	});
}

function showReposCount() {
	let repoCount = users.reduce((sum, user) => sum + user.public_repos, 0);
	console.log(
		`Número total de repositórios de todos os usuários: ${repoCount}`
	);
}

function showTopFive() {
	let sortedUsers = [...users].sort(
		(u1, u2) => u2.public_repos - u1.public_repos
	);
	let maxUsers = users.length < 5 ? users.length : 5;
	let txt = "Usuários com maior número de repositórios:\n";
	for (let i = 0; i < maxUsers; i++) {
		txt += `\nUsuário: ${sortedUsers[i].name}\nNúmero de repositórios: ${sortedUsers[i].public_repos}\n`;
	}
	console.log(txt);
}

async function main() {
	await fetchUser("isaacpontes");
	await fetchUser("julianaconde");
	await fetchUser("pcaldass");
	await fetchUser("lucasqueirogaa");
	await fetchUser("frans203");
	await fetchUser("LeDragoX");

	await showUser("isaacpontes");
	await showUser("julianaconde");

	showAllUsers();
	showReposCount();
	showTopFive();
}

main();
