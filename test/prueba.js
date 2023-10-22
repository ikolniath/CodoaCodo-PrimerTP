document.getElementById('mostrarTarjeta').addEventListener('click', function() {
    const data = {
        nombre: 'Juan',
        apellido: 'Gerez',
        edad: 30,
        dni: '12345678',
        foto: 'https://i.pinimg.com/originals/a4/c7/5a/a4c75a388a81c257128f2ce0a58f2632.jpg'
    };

    document.getElementById('nombre').textContent = data.nombre;
    document.getElementById('apellido').textContent = data.apellido;
    document.getElementById('edad').textContent = data.edad;
    document.getElementById('dni').textContent = data.dni;
    document.getElementById('foto').style.backgroundImage = `url(${data.foto})`;

    document.getElementById('popup').style.display = 'flex';

    document.addEventListener('click', function(event) {
        if (event.target.closest('.tarjeta') === null && event.target.id !== 'mostrarTarjeta') {
            document.getElementById('popup').style.display = 'none';
        }
    });
});
    


document.getElementById('cerrar').addEventListener('click', function() {
    document.getElementById('popup').style.display = 'none';
});
