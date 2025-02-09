# API Gestor academico

En este apartado te enseñare como usar los endpoints.

![image](https://github.com/user-attachments/assets/7f288d60-85a0-40c1-88ef-efaf69ed3fcb)





Como puedes observar en la imagen, en la carpeta configs de mi proyecto encontraras el archivo de la collection.json
para que puedas utilizarlo en postman.
Dentro de esta coleccion encontraras 2 carpetas una dedicada para cada crud de cada coleccion.


# Paso 1
- Ve a register Profesor y register alumno, alli ya estaran los atributos correspondientes listos para utilizar, si deseas colocar otros datos en value esta perfecto.
- Despues de registrar, ve a login y logeate con profesor y alumno, esta funcion te dara un token unico para cada uno que te serviran en las demas funciones.
- Para editar y eliminar deberas irte a la parte de Headers en postman y alli ala par de Authorization en value despues de la palabra "Bearer" coloca el token del estudiante o profesor que deses modificar.
- En el apartado de editar deje colocado las keys y values para que puedas editar, si deseas cambiar los datos de value no hay problema.
- Recuerda colocar en el params el id del usuario que deseas editar o eliminar y tambien de colocar el token en el Headers.

  De esta manera:
  ![image](https://github.com/user-attachments/assets/d8cfbcd9-14da-4fcc-b68c-2949f2f42df6)

  ![image](https://github.com/user-attachments/assets/72ebb09f-6b22-4936-9d55-6e2ab3786d2a)


  # Paso 2
- Para crear cursos coloca el nombre del curso que deseas crear y en el headers coloca el token de igual manera.
- El token debera de ser de un teacher para que te deje crearlo.

  ![image](https://github.com/user-attachments/assets/eb259b60-2cab-4fce-8dee-0409ad65e685)



- Para asignarte a un curso ve al endpoint de Asignar curso y coloca el id del curso al que deseas asignarte.
De esta manera:
![image](https://github.com/user-attachments/assets/93fb0cb0-3ab3-40fd-b6d9-7af00a445e89)

Recuerda colocar en el Headers un token de un alumno para que te deje asignarte.

- Para listar dirigete al endpoint de listarCurso y coloca en el Headers un token de un alumno o teacher.
- Para editar ve a ActualizarCurso y en el body coloca el nombre que le quieras colocar, recuerda colocar el id del curso en el params y colocar el token del profesor en el Headers
  
- ![image](https://github.com/user-attachments/assets/90d50baf-8bb2-4108-a0e5-066b6545b7b6)
