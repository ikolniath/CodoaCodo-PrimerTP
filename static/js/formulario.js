document
  .getElementById("formulario")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const time = 3000;
    let valid = true;

    const name = document.getElementById("nombre");
    if (!/^[A-Za-z\s]+$/.test(name.value)) {
      let warning = document.createElement("span");
      warning.style.color = "red";
      warning.style.display = "none";
      warning.textContent = "Ingrese solo letras";
      name.insertAdjacentElement("afterend", warning);
      warning.style.display = "inline";
      valid = false;
      setTimeout(function () {
        removeWarning(warning);
      }, time);
    }

    const apellido = document.getElementById("apellido");
    if (!/^[A-Za-z\s]+$/.test(apellido.value)) {
      let warning = document.createElement("span");
      warning.style.color = "red";
      warning.style.display = "none";
      warning.textContent = "Ingrese solo letras";
      apellido.insertAdjacentElement("afterend", warning);
      warning.style.display = "inline";
      valid = false;
      setTimeout(function () {
        removeWarning(warning);
      }, time);
    }

    const correo = document.getElementById("correo").value;
    const correoInput = document.getElementById("correo");
    if (!(correo.includes("@") && correo.includes("."))) {
      let warning = document.createElement("span");
      warning.style.color = "red";
      warning.style.display = "none";
      warning.textContent =
        "Formato de mail invalido, recuerde debe llevar '@' y '.'";
      correoInput.insertAdjacentElement("afterend", warning);
      warning.style.display = "inline";
      valid = false;
      setTimeout(function () {
        removeWarning(warning);
      }, time);
    }

    const telefono = document.getElementById("telefono");

    if (isNaN(telefono.value) || telefono.value.length < 10) {
      let warning = document.createElement("span");
      warning.style.color = "red";
      warning.style.display = "none";
      warning.textContent =
        "Recuede que deben ser solo números y debe tener 10 digitos o más";
      telefono.insertAdjacentElement("afterend", warning);
      warning.style.display = "inline";
      valid = false;
      setTimeout(function () {
        removeWarning(warning);
      }, time);
    }

    const consulta = document.getElementById("consulta");
    if (consulta.value.length > 100) {
      let warning = document.createElement("span");
      warning.style.color = "red";
      warning.style.display = "none";
      warning.textContent = "Debe tener un máximo de 100 caracteres";
      consulta.insertAdjacentElement("afterend", warning);
      warning.style.display = "inline";
      valid = false;
      setTimeout(function () {
        removeWarning(warning);
      }, time);
    }

    if (valid) {
      showPopup();

      // Obtén los datos del formulario
      const formData = new FormData(document.getElementById("formulario"));

      // Realiza una solicitud POST a Formspree
      fetch("https://formspree.io/f/xaygakby", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de Formspree:", data);
          // Aquí puedes manejar la respuesta de Formspree si lo deseas
        })
        .catch((error) => {
          console.error("Error al enviar el formulario:", error);
        });

      // Limpia los campos del formulario
      document.getElementById("nombre").value = "";
      document.getElementById("apellido").value = "";
      document.getElementById("correo").value = "";
      document.getElementById("telefono").value = "";
      document.getElementById("consulta").value = "";
    }
  });

function showPopup() {
  document.getElementById("popup").style.display = "block";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

function removeWarning(warning) {
  if (warning && warning.parentNode) {
    warning.parentNode.removeChild(warning);
  }
}


