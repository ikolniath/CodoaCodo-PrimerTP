function mostrarModalMascota() {
	$('#mascotaModal').modal('show');
}

function cerrarModal() {
	$('#mascotaModal').modal('hide');
}

function guardarMascota() {
	// Obtener los valores del formulario de mascota
	var pet_name = document.querySelector(
		'#mascotaModal input[name="pet_name"]'
	).value;
	var pet_breed = document.querySelector(
		'#mascotaModal input[name="pet_breed"]'
	).value;
	var hair_color = document.querySelector(
		'#mascotaModal input[name="hair_color"]'
	).value;
	var ago = document.querySelector('#mascotaModal select[name="ago"]').value;
	var dni = document.querySelector('input[name="dni"]').value; // Obtener el número de DNI del formulario principal
	var url = '/registro_pet';

	// Enviar los datos al servidor usando AJAX
	$.ajax({
		type: 'POST',
		url: url,
		data: {
			pet_name: pet_name,
			pet_breed: pet_breed,
			hair_color: hair_color,
			ago: ago,
			dni: dni, // Enviar el número de DNI del usuario junto con la mascota
		},
		success: function (response) {
			console.log('Mascota guardada:', response);
			limpiarFormulario(); // Limpiar el formulario de mascota
			alert(response.message);
			cerrarModal(); // Cerrar el modal después de guardar la mascota
		},
		error: function (error) {
			console.error('Error al guardar la mascota:', error);
		},
	});
}

function limpiarFormulario() {
	// Limpiar el formulario de mascota
	document.querySelector('#mascotaModal input[name="pet_name"]').value = '';
	document.querySelector('#mascotaModal input[name="pet_breed"]').value = '';
	document.querySelector('#mascotaModal input[name="hair_color"]').value = '';
	document.querySelector('#mascotaModal select[name="ago"]').selectedIndex = 0;
}

$(document).ready(function () {
	$('#registroForm').submit(function (e) {
		e.preventDefault(); // Prevenir la acción por defecto del formulario

		var formData = $(this).serialize(); // Obtener datos del formulario
		var url = '/registro';

		$.ajax({
			type: 'POST',
			url: url, // Ruta a tu función para agregar registro en Flask
			data: formData,
			success: function (response) {
				console.log('Datos guardados:', response);
				// Deshabilitar el botón después del registro exitoso
				$('#btnRegistrarPersona').prop('disabled', true);
				$('#btnRegistrarMascota').prop('disabled', false);
				alert(response.message); // Mostrar mensaje de éxito
			},
			error: function (error) {
				console.error('Error al guardar datos:', error);
				alert('Hubo un error al registrar. Por favor, inténtalo nuevamente');
			},
		});
	});
});
