document.addEventListener("DOMContentLoaded", async () => {
  // Obtiene referencias a los elementos del DOM por su ID.
  const tarjetasContainer = document.getElementById("tarjetas-container");
  const popupContainer = document.getElementById("popup-container");

  //funcion para cargar datos desde un archivo JSON
  const cargarDatos = async () => {
    const datosResponse = await fetch("/data/datos.json");
    const datos = await datosResponse.json();
    return datos;
  };

  //funcion  para obtener datos de una API de usuarios aleatorios
  const traerDatosAPI = async () => {
    try {
      const response = await fetch("https://randomuser.me/api");
      const data = await response.json();
      return data.results[0];
    } catch (error) {
      console.error("Error al obtener datos de la API:", error);
      return null;
    }
  };

  // funcion para mostrar las tarjetas con datos obtenidos
  const mostrarTarjetas = async () => {
    const datos = await cargarDatos(); // carga datos del JSON
    const randomUsers = await Promise.all([
      traerDatosAPI(),
      traerDatosAPI(),
      traerDatosAPI(),
    ]); // Obtiene datos de la API

    // repite sobre los usuarios aleatorios y los datos cargados
    randomUsers.forEach((randomUser, index) => {
      const { especializacion, acerca } = datos[index]; //extrae informacion específica de los datos
      const { picture, name } = randomUser; // Extrae información de la API
      const { first, last } = name; //extrae el nombre y apellido

      const tarjeta = document.createElement("div");
      tarjeta.classList.add("tarjeta");

      const fotoElement = document.createElement("div");
      fotoElement.classList.add("foto");
      fotoElement.style.backgroundImage = `url(${picture.large})`; // Establece la imagen de fondo

      const nombreElement = document.createElement("h2");
      nombreElement.textContent = `${first} ${last}`;

      const especializacionElement = document.createElement("p");
      especializacionElement.textContent = `${especializacion}`;

      //agrega los elementos como hijos del elemento "tarjeta"
      tarjeta.appendChild(fotoElement);
      tarjeta.appendChild(nombreElement);
      tarjeta.appendChild(especializacionElement);

      //agrega la tarjeta al contenedr de tarjetas
      tarjetasContainer.appendChild(tarjeta);

      //añade un evento de clic a la tarjeta que muestra
      tarjeta.addEventListener("click", () => {
        mostrarPopup({
          nombre: first,
          apellido: last,
          especializacion,
          acerca,
          fotoAPI: picture.large,
        });
      });
    });
  };

  //funcion para mostrar el popup
  const mostrarPopup = (info) => {
    const popupContent = `
          <div class="tarjeta">
              <div class="foto"><img src="${info.fotoAPI}" alt="${info.nombre} ${info.apellido}" class="foto"></div>
              <h2>${info.nombre} ${info.apellido}</h2>
              <p>${info.especializacion}</p>
              <p>${info.acerca}</p>
          </div>
      `;

    // contenido HTML del contenedor de popup y lo muestra
    popupContainer.innerHTML = popupContent;
    popupContainer.style.display = "block";
  };

  // inicia  la función para mostrar las tarjetas
  mostrarTarjetas();

  // añade un evento de clic al contenedor de popup para cerrarlo si se hace clic fuera
  popupContainer.addEventListener("click", (event) => {
    if (event.target === popupContainer) {
      popupContainer.style.display = "none";
    }
  });
});
