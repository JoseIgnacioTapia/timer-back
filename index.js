const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");

const perimeter = circle.getAttribute("r") * 2 * Math.PI;
circle.setAttribute("stroke-dasharray", perimeter);

let duration;
const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    // Asignar solo al inicio
    if (!duration) {
      duration = totalDuration; // Guardamos el tiempo total cuando el tiempo esta en pausa y se clickea el boton start
    }
  },
  onTick(timeRemaining) {
    // Agrega el atributo a la etiqueta svg cada vez que se ejecuta tick y onTick
    circle.setAttribute(
      "stroke-dashoffset",
      (perimeter * timeRemaining) / duration - perimeter // formula para calcular la medida del atributo que dará el efecto animado
    );
  },
  onComplete() {
    console.log("Timer is completed");
  },
});
