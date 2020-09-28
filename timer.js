class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      // Se activan los callbacks
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }
    // Al crear la instancia se esperan los eventos
    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  start = () => {
    if (this.onStart) {
      // Se comprueba tiene callback y ejecuta la función
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 20); // Guardamos el ID de setInterval
  };

  pause = () => {
    clearInterval(this.interval); // Para la ejecución del timer usando el ID
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      // Pausamos el timer si llego a 0 timeRemaining y ejecutamos onComplete
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - 0.02; // Restamos 0.02seg a timeRemaining
      if (this.onTick) {
        this.onTick(this.timeRemaining); // Ejecutamos onTick para la animación
      }
    }
  };
  // Obtenemos en formato flotante el valor del input
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  // Configura el tiempo restante con 2 digitos despues del punto
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
