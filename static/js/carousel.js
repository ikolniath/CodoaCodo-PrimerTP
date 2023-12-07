const Images = document.querySelectorAll(".images li img"); // usamos el selector de imagenes la lista
let currentImage = 0;
// Declaro la variable que contiene el tiempo de cambio, 5 segundos
const changeAutomatic = 5000;

//función para mostrar la imagen
function imagesShow(imageIndex) {
  Images[currentImage].classList.remove("active"); // a la imagen le quito una clase "activa"
  Images[imageIndex].classList.add("active"); // le agrego la clase, que retire anteriormente
  currentImage = imageIndex; // Igualo el número del indice a la posición de la imagen mostrada
}

//función para dividir la imagen y que avanza o retroceda según click
function changeByClickInArea(event) {
  if (event.clientX < window.innerWidth / 2) {
    // ubica el evento en un punto X despues de dividir la imagen en 2 y lo ubica a la izquierda
    const prev = currentImage - 1 < 0 ? Images.length - 1 : currentImage - 1;
    //Si la imagen al restarle 1 es menor a 0, busca el largo del arreglo y muestra la última imagen, si no, muestra la anterior
    imagesShow(prev);
  } else {
    // si no está en la izquierda lo toma como derecha
    const next = (currentImage + 1) % Images.length;
    // con el modulo nos aseguramos que cuando llega al total de las imagenes vuelve al principio del index, o sea 0
    imagesShow(next);
  }
}

const clickAreas = document.querySelectorAll(".carousel");

// Agregamos event listeners a las áreas izquierda y derecha de la imagen
clickAreas.forEach((area) => {
  area.addEventListener("click", changeByClickInArea);
});

imagesShow(currentImage); // Mostrar la primera imagen inicialmente

let autoChange; //genero variable para el temporizador

// genero la función para que cambién automáticamente las imágenes
function autoChangeImages() {
  const next = (currentImage + 1) % Images.length;
  imagesShow(next);
}

//genero la función para que el temporizador se reinicie, cuando el usuario inteactue con el carrusel
function restartAutoChange() {
  clearInterval(autoChange); //limpio el temporizador
  autoChange = setInterval(autoChangeImages, changeAutomatic); // inicio el temporizador de nuevo
}

// llamo la función de reinicio
restartAutoChange();
