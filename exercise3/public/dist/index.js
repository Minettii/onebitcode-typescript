"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let users = [];
function fetchUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`https://api.github.com/users/${username}`);
            const userData = yield response.json();
            if (userData.message) {
                console.log("Usuário não encontrado.");
            }
            else {
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
        }
        catch (err) {
            console.error("User Fetch error: ", err);
        }
    });
}
function showUser(username) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = users.find((user) => {
            user.login === username;
        });
        if (!user) {
            console.log(`Não foi possivel encontrar o usuário ${username}`);
            return;
        }
        let txt = `Usuário: ${user.login}\nID: ${user.id}\nNome: ${user.name}\nBio: ${user.bio}\nNúmero de repositórios: ${user.public_repos}`;
        try {
            let response = yield fetch(user.repos_url);
            let repos = yield response.json();
            let maxRepos = user.public_repos < 3 ? user.public_repos : 3;
            for (let i = 0; i < maxRepos; i++) {
                txt += `\n\nNome: ${repos[i].name}\nDescrição: ${repos[i].description}\nFork: ${repos[i].fork ? "Sim" : "Não"}\nNúmero de Stargazers: ${repos[i].stargazers_count}`;
            }
            console.log(txt);
        }
        catch (err) {
            console.error("Repos Fetch error: " + err);
        }
    });
}
function showAllUsers() {
    users.forEach((user) => {
        console.log(`Usuário: ${user.login}\nID: ${user.id}\nNome: ${user.name}\nBio: ${user.bio}\nNúmero de repositórios: ${user.public_repos}`);
    });
}
function showReposCount() {
    let repoCount = users.reduce((sum, user) => sum + user.public_repos, 0);
    console.log(`Número total de repositórios de todos os usuários: ${repoCount}`);
}
function showTopFive() {
    let sortedUsers = [...users].sort((u1, u2) => u2.public_repos - u1.public_repos);
    let maxUsers = users.length < 5 ? users.length : 5;
    let txt = "Usuários com maior número de repositórios:\n";
    for (let i = 0; i < maxUsers; i++) {
        txt += `\nUsuário: ${sortedUsers[i].name}\nNúmero de repositórios: ${sortedUsers[i].public_repos}\n`;
    }
    console.log(txt);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield fetchUser("isaacpontes");
        yield fetchUser("julianaconde");
        yield fetchUser("pcaldass");
        yield fetchUser("lucasqueirogaa");
        yield fetchUser("frans203");
        yield fetchUser("LeDragoX");
        yield showUser("isaacpontes");
        yield showUser("julianaconde");
        showAllUsers();
        showReposCount();
        showTopFive();
    });
}
main();
