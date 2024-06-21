function maxSumaPanquecitos(N, S, A, B) {
  const { performance } = require('perf_hooks');
  const startMem = process.memoryUsage().heapUsed;
  const startTime = performance.now();

  // Verificar si las entradas son válidas
  if (N <= 0 || S <= 0 || A.length !== N || B.length !== N) {
      throw new Error("Entradas inválidas: N, S deben ser mayores que 0 y las longitudes de A y B deben ser iguales a N.");
  }

  // Inicializar los arrays de DP y decisiones
  let dpPrev = [0, 0];
  let dpCurr = [0, 0];
  let decisiones = new Array(N).fill(null);

  // Inicializar los valores base
  dpPrev[0] = A[0];
  dpPrev[1] = B[0];
  decisiones[0] = A[0] > B[0] ? 'A' : 'B';

  for (let i = 1; i < N; i++) {
      // Para la banda A
      let quedarseEnA = dpPrev[0] + A[i];
      let cambiarA = i >= S ? dpPrev[1] + A[i] : Number.NEGATIVE_INFINITY;
      if (quedarseEnA > cambiarA) {
          dpCurr[0] = quedarseEnA;
          decisiones[i] = 'A';
      } else {
          dpCurr[0] = cambiarA;
          decisiones[i] = 'B';
      }

      // Para la banda B
      let quedarseEnB = dpPrev[1] + B[i];
      let cambiarB = i >= S ? dpPrev[0] + B[i] : Number.NEGATIVE_INFINITY;
      if (quedarseEnB > cambiarB) {
          dpCurr[1] = quedarseEnB;
          decisiones[i] = 'B';
      } else {
          dpCurr[1] = cambiarB;
          decisiones[i] = 'A';
      }

      // Actualizar dpPrev para el siguiente minuto
      dpPrev[0] = dpCurr[0];
      dpPrev[1] = dpCurr[1];
  }

  // Determinar el valor máximo y la banda en el último minuto
  let valorMaximo = Math.max(dpCurr[0], dpCurr[1]);
  let ultimaBanda = dpCurr[0] > dpCurr[1] ? 0 : 1;

  // Reconstruir la secuencia de decisiones
  let secuencia = [];
  let bandaActual = ultimaBanda;
  for (let i = N - 1; i >= 0; i--) {
      secuencia.push([decisiones[i], i]);
      bandaActual = decisiones[i] === 'A' ? 0 : 1;
  }

  // Invertir la secuencia para que esté en orden de minutos
  secuencia.reverse();

  const endTime = performance.now();
  const endMem = process.memoryUsage().heapUsed;

  // Generar la salida
  console.log("Valor máximo:", valorMaximo);
  secuencia.forEach(([banda, minuto]) => {
      console.log(`${banda} ${minuto}`);
  });

  console.log(`Tiempo de ejecución: ${(endTime - startTime).toFixed(2)} ms`);
  console.log(`Memoria usada: ${(endMem - startMem) / 1024} KB`);
}

// Ejemplo de uso
const N = 5;
const S = 2;
const A = [2, 2, 2, 2, 2];
const B = [1, 1, 9, 4, 1];

try {
  maxSumaPanquecitos(N, S, A, B);
} catch (error) {
  console.error("Error durante la ejecución:", error.message);
}
