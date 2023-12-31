const listaPessoas = document.getElementById("listaPessoas");
const btAnterior = document.getElementById("btAnterior");
const btProxima = document.getElementById("btProxima");
let contIndex = 1;
const exibirLista = (lista) => {
  listaPessoas.innerHTML = "";
  for (let i = 0; i < lista.length; ++i) {
    const li = document.createElement("li");
    listaPessoas.start = contIndex;
    const text = document.createTextNode(
      `${lista[i].name} (${lista[i].birth_year}) (${lista[i].height} cm)`
    );
    li.appendChild(text);
    listaPessoas.appendChild(li);
  }
};

const configurarBotoes = (data) => {
  const { previous, next } = data;

  btAnterior.disabled = previous === null;
  btAnterior.onclick = () => {
    contIndex = contIndex - 10;
    fetchAPI(previous);
    btAnterior.disabled = true;
  };

  btProxima.disabled = next === null;
  btProxima.onclick = () => {
    contIndex = contIndex + 10;
    fetchAPI(next);
    btProxima.disabled = true;
  };
};

const fetchAPI = (url) => {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      exibirLista(data.results);
      configurarBotoes(data);
    });
};

fetchAPI("https://swapi.dev/api/people/?page=1");