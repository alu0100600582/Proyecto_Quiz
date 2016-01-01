## Práctica: Quiz. Preguntas de Selección Simple y Múltiple
### Descripción de la Práctica

En esta práctica vamos a implementar preguntas de selección simple y múltiple a nuestro proyecto Quiz.

### Requisitos de la Práctica:

Añada preguntas de selección simple:

seleccion múltiple

y de selección múltiple:

selección simple

Estas dos preguntas podrían construirse/formularse como sigue:

            this.q.push(
              { pregunta: new PreguntaSeleccionSimple('¿Capital de Grecia?',·
                                                      ['Madrid', 'Roma', 'Atenas']),
                respuesta: new Respuesta('Atenas')
              },  
              { pregunta: new PreguntaSeleccionMultiple('¿Que animales son mamíferos?',·
                                        ['Ornitorrinco', 'Canguro', 'Ballena', 'Gato']),
                respuesta: new Respuesta(['Ballena', 'Gato'])

Para las de selección múltiple la respuesta viene caracterizada por un Array por lo que deberá actualizar la factoría o constructor Respuesta:

        ...
        else if (x instanceof Array){
                  return function(res){
                       ...  
                 };  
        }

Cada tipo de pregunta tiene un atributo o método vista o html o como lo quiera llamar. Para construir el valor de dicha propiedad procure que su código javascript no esté lleno de concatenaciones de cadenas, si es necesario use templates.

Queremos que la respuesta llegue a nuestra aplicación en forma de Array. Si añadimos como sufijo unos corchetes al nombre de nuestro select , Express (y Rails, PHP, etc.) dejarán los datos enviados en un array:

                      <select name="respuesta[]" multiple>
                           ...
                      </select>




---

Enlace a la Comunidad de la Asignatura: https://plus.google.com/u/1/communities/111920114018766363342?cfem=1

Mi GitHub page: http://alu0100600582.github.io/

Repositorio Github: https://github.com/alu0100600582/Quiz_Multiple

Despliegue en Heroku: http://quiz-sytw.herokuapp.com/
