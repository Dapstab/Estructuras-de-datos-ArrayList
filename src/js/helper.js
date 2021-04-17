import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); // To make an ajax request to the API, es como axios, retorna un response object. Lo que vamos a hacer es una carrera de promesas la que se ejecute primero nos va indicar si hubo un error o si se hizo la API request
    const data = await res.json(); // Convert the response to json (Retorna una promesa).

    if (!res.ok) throw new Error(`${data.message} (${res.status})`); // El mensaje que viene de nuestra API.
    return data;
  } catch (err) {
    // console.log(err); No podemos hacer esto porque independientemente si hay un error o no queremos manejar los errores en model.js y al entrar aqui lo que queremos es lanazarlo de nuevo para que lo coja el catch de model. (Propagamos el error entre funciones async)
    throw err;
  }
};
