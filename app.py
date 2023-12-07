from flask import Flask, render_template, url_for, request, jsonify, send_from_directory, redirect, flash, session
from database.db import database
import os



app = Flask(__name__)
app.secret_key = 'Grupo11elmejoR'

#Función para que traiga los datos de las tarjetas en nosotros,por el medio Json 
@app.route('/data/datos.json')
def get_datos_json():
    return send_from_directory('static/data', 'datos.json')

#funcion para cada una de las páginas de la web
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

@app.route('/contacto')
def contacto():
    return render_template('contacto.html')

@app.route('/servicios')
def servicios():
    return render_template('servicios.html')

@app.route('/login')
def login():
    return render_template('login.html') 

@app.route('/registro')
def registro():
    return render_template('registro.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#función Login 

@app.route('/login', methods=['GET', 'POST'])
def authenticate_user():

    dni1 = request.form['dni1']
    contrasena = request.form['contrasena']

    with database.cursor() as cursor:
        cursor.execute ("SELECT dni, password FROM users WHERE dni = %s AND password = %s", (dni1, contrasena)) 
        existing_users = cursor.fetchone()
        
        if existing_users:
            cursor.execute ("SELECT user FROM users WHERE dni = %s", (dni1,))
            rol = cursor.fetchone()
            session['logged_in'] = True
            session['dni'] = dni1
            session['role'] = str (rol[0]) # Asigna el rol del usuario
        #else:
            #return jsonify({'message': 'Usuario no existe'})
    
    return redirect(url_for('index'))

@app.route('/logout')
def logout():
    session.clear()  # Limpia la sesión
    return redirect(url_for('index'))



#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#funciones de registro 


@app.route('/registro', methods=['POST','GET'])
def addRegistro():
    name = request.form['name']
    surname = request.form['surname']
    password = request.form['password']
    dni = request.form['dni']
    email = request.form['email']
    phone = request.form['phone']
    adress = request.form['adress']
    genere = request.form['genere']
    ago = request.form['ago']


    with database.cursor() as cursor:
        cursor.execute ("SELECT * FROM users WHERE dni = %s", (dni,))
        existing_user = cursor.fetchone()
        if existing_user is None:
            if name and surname and dni and ago and genere and email and phone and adress and password:
                cursor = database.cursor()
                sql = "INSERT INTO users (name, surname, password, dni, email, phone, adress, genere, ago, user) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
                data = (name, surname, password, dni, email, phone, adress, genere, ago, 2)
                cursor.execute(sql, data)
                database.commit()  

                return jsonify({'message': 'Usuario registrado exitosamente'})
        return jsonify({'message': 'Dni ya registrado'})



@app.route('/registro_pet', methods=['POST','GET'])
def addRpet():
    pet_name = request.form['pet_name']
    ago = request.form['ago']
    pet_breed = request.form['pet_breed']
    hair_color = request.form['hair_color']
    dni = request.form['dni']  # Obtener el número de DNI del formulario principal

    if pet_name and ago and pet_breed and hair_color and dni:
        cursor = database.cursor()
        sql = "INSERT INTO pets (pet_name, pet_breed, ago, hair_color, dni) VALUES (%s, %s, %s, %s, %s)"
        data = (pet_name, pet_breed, ago, hair_color, dni)
        cursor.execute(sql, data)
        database.commit()
        cursor.close()
    return jsonify({'message': 'Mascota guardada'})
    
    



#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#funciones de users
@app.route('/users')
def users():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM users")
    myresult = cursor.fetchall()
    #tupla a diccionario
    insertObject = []
    columNames = [column[0] for column in cursor.description]
    for record in myresult:
        insertObject.append(dict(zip(columNames,record)))
    cursor.close()
    return render_template('users.html', data=insertObject)

@app.route('/users', methods=['POST','GET'],)
def adduser():
    name = request.form['name']
    surname = request.form['surname']
    dni = request.form['dni']
    ago = request.form['ago']
    genere = request.form['genere']
    email = request.form['email']
    phone = request.form['phone']
    adress = request.form['adress']

    with database.cursor() as cursor:
        cursor.execute ("SELECT * FROM users WHERE dni = %s", (dni,))
        existing_user = cursor.fetchone()
        if existing_user is None:
            if name and surname and dni and ago and genere and email and phone and adress:
                cursor = database.cursor()
                sql = "INSERT INTO users (name, surname, dni, ago, genere, email, phone, adress) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                data = (name, surname, dni, ago, genere, email, phone, adress)
                cursor.execute(sql, data)
                database.commit()
        else:
            flash('El DNI ingresado ya existe en la base de datos', 'error')    
    return redirect(url_for('users'))

@app.route('/users/<string:user_id>')
def delete(user_id):
    cursor = database.cursor()
    sql = "DELETE FROM users WHERE user_id=%s"
    data = (user_id,)
    cursor.execute(sql, data)
    database.commit()
    return redirect(url_for('users'))

@app.route('/users/<string:user_id>', methods=['POST', 'GET'])
def edit(user_id):
    if request.method == 'POST':
        name = request.form['name']
        surname = request.form['surname']
        dni = request.form['dni']
        ago = request.form['ago']
        genere = request.form['genere']
        email = request.form['email']
        phone = request.form['phone']
        adress = request.form['adress']

        if name and surname and dni and ago and genere and email and phone and adress:
            cursor = database.cursor()
            
            # Corrección: Se añadió 'user_id=%s' al final de la consulta SQL
            sql = "UPDATE users SET name=%s, surname=%s, dni=%s, ago=%s, genere=%s, email=%s, phone=%s, adress=%s WHERE user_id=%s"
            
            # Corrección: Se añadió 'user_id' al final de la tupla data
            data = (name, surname, dni, ago, genere, email, phone, adress, user_id)
            cursor.execute(sql, data)
            database.commit()
            cursor.close()
        return redirect(url_for('users'))

    return redirect(url_for('users'))

#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#funciones veterinarios 


@app.route('/veterinarios')
def veterinarios():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM veterinarios")
    myresult = cursor.fetchall()
    #tupla a diccionario
    insertObject = []
    columNames = [column[0] for column in cursor.description]
    for record in myresult:
        insertObject.append(dict(zip(columNames,record)))
    cursor.close()
    return render_template('veterinarios.html', data=insertObject)

@app.route('/veterinarios', methods=['POST', 'GET'])
def addveterinario():
    name = request.form['name']
    surname = request.form['surname']
    dni = request.form['dni']
    ago = request.form['ago']
    genere = request.form['genere']
    title = request.form['title']
    titlenumber = request.form['titlenumber']
    phone = request.form['phone']
    email = request.form['email']
    adress = request.form['adress']

    if name and surname and dni and ago and genere and title and titlenumber and phone and email and adress:
        cursor = database.cursor()
        sql = "INSERT INTO veterinarios (name, surname, dni, ago, genere, title, titlenumber, phone, email, adress) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s ,%s)"
        data = (name, surname, dni, ago, genere, title, titlenumber, phone, email, adress)
        cursor.execute(sql, data)
        database.commit()
    #else:
        #flash('Todos los campos son obligatorios', 'error')
    return redirect(url_for('veterinarios'))


@app.route('/veterinarios/<string:veterinario_id>')
def delete_veterinario(veterinario_id):
    cursor = database.cursor()
    sql = ("DELETE FROM veterinarios WHERE veterinario_id=%s")
    data = (veterinario_id,)
    cursor.execute(sql, data)
    database.commit()
    return redirect(url_for('veterinarios'))

@app.route('/veterinarios/<string:veterinario_id>', methods=['POST', 'GET'])
def edit_veterinario(veterinario_id):
    if request.method == 'POST':
        name = request.form['name']
        surname = request.form['surname']
        dni = request.form['dni']
        ago = request.form['ago']
        genere = request.form['genere']
        title = request.form['title']
        titlenumber = request.form['titlenumber']
        phone = request.form['phone']
        email = request.form['email']
        adress = request.form['adress']


        if name and surname and dni and ago and genere and title and titlenumber and phone and email and adress:
            cursor = database.cursor()
            
            # Corrección: Se añadió 'veterinario_id=%s' al final de la consulta SQL
            sql = "UPDATE veterinarios SET name=%s, surname=%s, dni=%s, ago=%s, genere=%s, title=%s, titlenumber=%s, phone=%s, email=%s, adress=%s WHERE veterinario_id=%s"
            
            # Corrección: Se añadió 'veterinario_id' al final de la tupla data
            data = (name, surname, dni, ago, genere, title, titlenumber, phone, email, adress, veterinario_id)
            cursor.execute(sql, data)
            database.commit()
            cursor.close()
        return redirect(url_for('veterinarios'))

    return redirect(url_for('veterinarios')) 

#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#funciones sucursales

@app.route('/sucursales')
def sucursales():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM sucursal")
    myresult = cursor.fetchall()
    #tupla a diccionario
    insertObject = []
    columNamess = [column[0] for column in cursor.description]
    for record in myresult:
        insertObject.append(dict(zip(columNamess,record)))
    cursor.close()
    return render_template('sucursales.html', data=insertObject)

#guardar usuarios en db
@app.route('/sucursales', methods=['POST','GET'])
def addSucursal():
    adress = request.form['adress']
    city = request.form['city']

    if adress:
        cursor = database.cursor()
        sql = "INSERT INTO sucursal (adress,city) VALUES (%s, %s)"  
        data = (adress, city)  
        cursor.execute(sql, data)
        database.commit()
        cursor.close()

        return redirect(url_for('sucursales'))


@app.route('/sucursales/<string:sucursal_id>')
def delete_sucursal(sucursal_id):
    cursor = database.cursor()
    sql = "DELETE FROM sucursal WHERE sucursal_id=%s"
    data = (sucursal_id,)
    cursor.execute(sql, data)
    database.commit()
    return redirect(url_for('sucursales'))

@app.route('/sucursales/<string:sucursal_id>', methods=['POST', 'GET'])
def edit_sucursal(sucursal_id):
    if request.method == 'POST':
        adress = request.form['adress']
        city = request.form['city']

        if adress and city:
            cursor = database.cursor()
            sql = "UPDATE sucursal SET adress=%s, city=%s WHERE sucursal_id=%s"
            data = (adress, city, sucursal_id)
            cursor.execute(sql, data)
            database.commit()
            cursor.close()
        return redirect(url_for('sucursales'))

    return redirect(url_for('sucursales'))


#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#fuciones mascotas 

@app.route('/mascotas')
def mascotas():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM pets")
    myresult = cursor.fetchall()
    #tupla a diccionario
    insertObject = []
    columNames = [column[0] for column in cursor.description]
    for record in myresult:
        insertObject.append(dict(zip(columNames,record)))
    cursor.close()
    return render_template('mascotas.html', data=insertObject)

#guardar usuarios en db
@app.route('/mascotas', methods=['POST'])
def addMascotas():
    pet_name = request.form['pet_name']
    ago = request.form['ago']
    pet_breed = request.form['pet_breed']
    hair_color = request.form['hair_color']

    if pet_name and ago and pet_breed and hair_color:
        cursor = database.cursor()
        sql = "INSERT INTO pets (pet_name, ago, pet_breed, hair_color) VALUES (%s, %s, %s, %s)"
        data = (pet_name, ago, pet_breed, hair_color)
        cursor.execute(sql, data)
        database.commit()
    #else:
        #flash('Todos los campos son obligatorios', 'error')
    return redirect(url_for('mascotas'))


@app.route('/mascotas/<string:pet_id>')
def delete_mascotas(pet_id):
    cursor = database.cursor()
    sql = "DELETE FROM pets WHERE pet_id=%s"
    data = (pet_id,)
    cursor.execute(sql, data)
    database.commit()
    return redirect(url_for('mascotas'))

@app.route('/mascotas/<string:pet_id>', methods=['POST', 'GET'])
def edit_mascotas(pet_id):
    if request.method == 'POST':
        pet_name = request.form['pet_name']
        ago = request.form['ago']
        pet_breed = request.form['pet_breed']
        hair_color = request.form['hair_color']

        if pet_name and ago and pet_breed and hair_color:
            cursor = database.cursor()
            sql = "UPDATE pets SET pet_name=%s, ago=%s, pet_breed=%s, hair_color=%s WHERE pet_id=%s"
            data = (pet_name, ago, pet_breed, hair_color, pet_id)
            cursor.execute(sql, data)
            database.commit()
            cursor.close()
            return redirect(url_for('mascotas'))

    return redirect(url_for('mascotas'))

#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#funciones especialidades 

@app.route('/especialidades')
def especialidades():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM especialidades")
    myresult = cursor.fetchall()
    #tupla a diccionario
    insertObject = []
    columnombreEspecialidads = [column[0] for column in cursor.description]
    for record in myresult:
        insertObject.append(dict(zip(columnombreEspecialidads,record)))
    cursor.close()
    return render_template('especialidades.html', data=insertObject)

#guardar usuarios en db
@app.route('/especialidades', methods=['POST','GET'])
def addEspecialidad():
    nombreEspecialidad = request.form['nombreEspecialidad']

    if nombreEspecialidad:
        cursor = database.cursor()
        sql = "INSERT INTO especialidades (nombreEspecialidad) VALUES (%s)"  # Corregido el formato de la consulta
        data = (nombreEspecialidad,)  # Asegúrate de poner la coma para crear una tupla
        cursor.execute(sql, data)
        database.commit()
        cursor.close()
        return redirect(url_for('especialidades'))
    else:
        ('El campo de nombre de especialidad no puede estar vacío', 'error')
        return redirect(url_for('especialidades'))


@app.route('/especialidades/<string:especialidad_id>')
def delete_especialidades(especialidad_id):
    cursor = database.cursor()
    sql = "DELETE FROM especialidades WHERE especialidad_id=%s"
    data = (especialidad_id,)
    cursor.execute(sql, data)
    database.commit()
    return redirect(url_for('especialidades'))

@app.route('/especialidades/<string:especialidad_id>', methods=['POST', 'GET'])
def edit_especialidades(especialidad_id):
    if request.method == 'POST':
        nombreEspecialidad = request.form['nombreEspecialidad']
        

        if nombreEspecialidad :
            cursor = database.cursor()
            
            
            sql = "UPDATE especialidades SET nombreEspecialidad=%s WHERE especialidad_id=%s"
            
            
            data = (nombreEspecialidad, especialidad_id)
            cursor.execute(sql, data)
            database.commit()
            cursor.close()
        return redirect(url_for('especialidades'))

    return redirect(url_for('especialidades'))


#-----------------------------------------------------------------------------------------------------------------------------------------------------------
#funciones turnos


@app.route('/turnos')
def turnos():
    cursor = database.cursor()
    cursor.execute("SELECT * FROM especialidades")
    especialidades = cursor.fetchall()
    cursor.execute("SELECT * FROM veterinarios")
    veterinarios = cursor.fetchall()
    cursor.execute("SELECT * FROM pets")
    mascotas = cursor.fetchall()
    cursor.close()
    return render_template('turnos.html', mascotas = mascotas, especialidades = especialidades, veterinarios = veterinarios)

@app.route('/turnos', methods=['POST', 'GET'])
def addAppointment():
    name = request.form['name']
    email = request.form['email']
    phone = request.form['phone']
    pet = request.form['pet']
    specialty = request.form['specialty']
    doctor = request.form['doctor']
    date = request.form['date']
    message = request.form['message']

    if name and email and phone and pet and specialty and doctor and date:
        cursor = database.cursor()
        sql = "INSERT INTO turnos (name, phone, email, pet_id, especialidad_id, veterinario_id, date, message) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
        data = (name, phone, email, pet, specialty, doctor, date, message)
        cursor.execute(sql, data)
        database.commit()
    else:
        ('Todos los campos son obligatorios', 'error')
    return redirect(url_for('turnos'))


#-----------------------------------------------------------------------------------------------------------------------------------------------------------


if __name__ == '__main__':
    app.run(debug=True)