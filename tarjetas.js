document.addEventListener('DOMContentLoaded', async () => {
    const tarjetasContainer = document.getElementById('tarjetas-container');
    const popupContainer = document.getElementById('popup-container');

    const cargarDatos = async () => {
        const datosResponse = await fetch('data/datos.json');
        const datos = await datosResponse.json();
        return datos;
    }

    const traerDatosAPI = async () => {
        try {
            const response = await fetch('https://randomuser.me/api');
            const data = await response.json();
            return data.results[0];
        } catch (error) {
            console.error('Error al obtener datos de la API:', error);
            return null;
        }
    }

    const mostrarTarjetas = async () => {
        const datos = await cargarDatos();
        const randomUsers = await Promise.all([traerDatosAPI(), traerDatosAPI(), traerDatosAPI()]);
        
        randomUsers.forEach((randomUser, index) => {
            const { especializacion, acerca } = datos[index];
            const { picture, name } = randomUser;
            const { first, last } = name;

            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');

            const fotoElement = document.createElement('div');
            fotoElement.classList.add('foto');
            fotoElement.style.backgroundImage = `url(${picture.large})`;

            const nombreElement = document.createElement('h2');
            nombreElement.textContent = `${first} ${last}`;

            const especializacionElement = document.createElement('p');
            especializacionElement.textContent = `${especializacion}`;

            tarjeta.appendChild(fotoElement);
            tarjeta.appendChild(nombreElement);
            tarjeta.appendChild(especializacionElement);

            tarjetasContainer.appendChild(tarjeta);

            tarjeta.addEventListener('click', () => {
                mostrarPopup({ nombre: first, apellido: last, especializacion, acerca, fotoAPI: picture.large });
            });
        });
    }

    const mostrarPopup = (info) => {
        const popupContent = `
            <div class="tarjeta">
                <div class="foto"><img src="${info.fotoAPI}" alt="${info.nombre} ${info.apellido}" class="foto"></div>
                <h2>${info.nombre} ${info.apellido}</h2>
                <p>${info.especializacion}</p>
                <p>${info.acerca}</p>
            </div>
        `;

        popupContainer.innerHTML = popupContent;
        popupContainer.style.display = 'block';
    }

    mostrarTarjetas();

    popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = 'none';
        }
    });
});















        
















