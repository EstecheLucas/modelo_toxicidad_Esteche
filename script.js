// Umbral para la toxicidad (puedes ajustarlo aquí)
const umbral = 0.1;

// Cargar el modelo de toxicidad con el umbral definido
toxicity.load(umbral).then((modelo) => {
  window.modelo = modelo;  // Guardar el modelo cargado para usarlo más tarde
});

// Función que se ejecuta al hacer clic en el botón
function analizarTexto() {
  // Obtener el texto ingresado
  const texto = document.getElementById("inputText").value;

  // Verificar si el texto está vacío
  if (texto === "") {
    alert("Por favor ingresa una frase.");
    return;
  }

  // Analizar el texto usando el modelo de toxicidad
  modelo.classify([texto]).then((predicciones) => {
    let resultado = "";

    // Verificar si el texto es tóxico
    let esToxico = false;
    predicciones.forEach(prediccion => {
      prediccion.results.forEach(result => {
        if (result.match) {
          esToxico = true;
        }
      });
    });

    // Mostrar el resultado
    if (esToxico) {
      resultado = "¡Ups! La frase contiene lenguaje tóxico o dañino.";
      document.getElementById("resultado").classList.add("negativo");
    } else {
      resultado = "La frase no contiene lenguaje tóxico.";
      document.getElementById("resultado").classList.add("positivo");
    }

    document.getElementById("resultado").textContent = resultado;
  });
}
