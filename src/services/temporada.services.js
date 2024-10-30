const Temporada = require('../models/temporada.model.js');
const Carrera = require('../models/carrera.model.js'); // Ajusta la ruta según tu estructura de carpetas
const Piloto = require("../models/piloto.model.js")
const Equipo = require("../models/equipo.model.js")

class TemporadaService {
  async getTemporadas() {
    return await Temporada.find().populate('carreras pilotos');
  }

  async getTemporadaById(id) {
    return await Temporada.findById(id).populate('carreras pilotos');
  }

  async createTemporada(data) {
    const temporada = new Temporada(data);
    return await temporada.save();
  }

  async updateTemporada(id, data) {
    return await Temporada.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTemporada(id) {
    return await Temporada.findByIdAndDelete(id);
  }

  async simularTemporada(temporadaId, pilotoIdFavorito) {
    try {
      const temporada = await Temporada.findById(temporadaId).populate('pilotos carreras');
      if (!temporada) throw new Error('Temporada no encontrada');
  
      await this.reiniciarPuntosPilotos(temporada.pilotos);
      await this.reiniciarPuntosEquipos();
  
      let posicionesFavorito = [];
  
      // Simulando todas las carreras en paralelo
      const resultadosCarreras = await Promise.all(
        temporada.carreras.map(carrera => this.simularCarrera(temporadaId, carrera._id))
      );
  
      resultadosCarreras.forEach(carreraSimulada => {
        const posicionFavorito = carreraSimulada.resultados.find(
          (resultado) => resultado.piloto.toString() === pilotoIdFavorito
        );
        if (posicionFavorito) {
          posicionesFavorito.push({ carrera: carreraSimulada.nombre, posicion: posicionFavorito.posicion });
        }
      });
  
      const pilotosOrdenados = await Piloto.find({ _id: { $in: temporada.pilotos } }).sort({ puntos: -1 });
      const posicionFinalFavorito = pilotosOrdenados.findIndex(
        (piloto) => piloto._id.toString() === pilotoIdFavorito
      ) + 1;
  
      const equiposOrdenados = await Equipo.find().sort({ puntos: -1 });
  
      return {
        campeonPiloto: pilotosOrdenados[0],
        equipoCampeon: equiposOrdenados[0],
        pilotos: pilotosOrdenados,
        equipos: equiposOrdenados,
        pilotoFavorito: {
          piloto: pilotoIdFavorito,
          posicionFinal: posicionFinalFavorito,
          posicionesPorCarrera: posicionesFavorito
        }
      };
    } catch (err) {
      console.error("Error en la simulación de la temporada:", err.message);
      throw err;
    }
  }
  
  

  // Función para reiniciar los puntos de todos los pilotos
  async reiniciarPuntosPilotos(pilotos) {
    const pilotosIds = pilotos.map(piloto => piloto._id);
    await Piloto.updateMany({ _id: { $in: pilotosIds } }, { puntos: 0 });
  }

  async reiniciarPuntosEquipos() {
    await Equipo.updateMany({}, { puntos: 0 });
  }

  // Función para simular una carrera
  async simularCarrera(temporadaId, carreraId) {
    const temporada = await Temporada.findById(temporadaId).populate('pilotos');
    if (!temporada) throw new Error('Temporada no encontrada');
  
    // Simular los resultados
    const resultados = this.simularResultados(temporada.pilotos);
  
    // Buscar la carrera
    const carrera = await Carrera.findById(carreraId);
    if (!carrera) throw new Error('Carrera no encontrada');
  
    carrera.resultados = resultados;
    await carrera.save();
  
    // Asignar puntos a los pilotos
    await this.asignarPuntos(resultados);
  
    return carrera;
  }

   

  // Simula los resultados de la carrera
  simularResultados(pilotos) {
    const pilotosBarajados = pilotos.sort(() => Math.random() - 0.5);
    return pilotosBarajados.map((piloto, index) => ({
      piloto: piloto._id,
      posicion: index + 1
    }));
  }

  // Asigna puntos a los pilotos de acuerdo a su posición
  async asignarPuntos(resultados) {
    const puntos = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];

    for (let i = 0; i < 10; i++) {
      const resultado = resultados[i];
      if (resultado) {
        const piloto = await Piloto.findById(resultado.piloto).populate('equipo');
        
        if (piloto) {
          // Asigna puntos al piloto
          await Piloto.findByIdAndUpdate(piloto._id, { $inc: { puntos: puntos[i] } });
          
          // Asigna puntos al equipo del piloto
          if (piloto.equipo) {
            await Equipo.findByIdAndUpdate(piloto.equipo._id, { $inc: { puntos: puntos[i] } });
          }
        }
      }
    }
  }
}

module.exports = new TemporadaService();
