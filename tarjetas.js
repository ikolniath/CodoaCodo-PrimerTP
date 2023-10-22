document.addEventListener('DOMContentLoaded', () => {
    const tarjetasContainer = document.getElementById('tarjetas-container');
    const popupContainer = document.getElementById('popup-container');

    const cargarDatos = async () => {
        const response = await fetch('data/datos.json');
        const datos = await response.json();
        return datos;
    }

    const mostrarTarjetas = (datos) => {
        datos.forEach((dato, index) => {
            const { foto, nombre, apellido, especializacion } = dato;

            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.dataset.index = index;

            const fotoElement = document.createElement('div');
            fotoElement.classList.add('foto');
            fotoElement.style.backgroundImage = `url(${foto})`;

            const nombreElement = document.createElement('h2');
            nombreElement.textContent = `${nombre} ${apellido}`;

            const especializacionElement = document.createElement('p');
            especializacionElement.textContent = `${especializacion}`;

            tarjeta.appendChild(fotoElement);
            tarjeta.appendChild(nombreElement);
            tarjeta.appendChild(especializacionElement);

            tarjetasContainer.appendChild(tarjeta);

            tarjeta.addEventListener('click', () => {
                mostrarPopup(datos[index]);
            });
        });
    }

    const mostrarPopup = (info) => {
        const popupContent = `
            <div class="tarjeta">
                <div class="foto"><img src="${info.foto}" alt="${info.nombre} ${info.apellido}" class="foto"></div>
                <h2>${info.nombre} ${info.apellido}</h2>
                <p>${info.especializacion}</p>
                <p>Acerca: ${info.acerca}</p>
            </div>
        `;

        popupContainer.innerHTML = popupContent;
        popupContainer.style.display = 'block';
    }

    cargarDatos().then((datos) => {
        mostrarTarjetas(datos);
    });

    popupContainer.addEventListener('click', (event) => {
        if (event.target === popupContainer) {
            popupContainer.style.display = 'none';
        }
    });
});











        
















