let mapa, jugador, keyA, keyW, keyS, keyD, puntero, barraVida, 
    barraNivel, contadorFrameVida = 0, contadorFrameNivel = 0;
let capaSuelo, capaElementosSuelo, capaJugador, encimaJugador;
let anchoMundo, altoMundo, punto_aparicion;
let scale = 1.75, gameOver = false;
let numEnemigosRonda = 1, xpActual = 0, nivelJugador = 0, 
    xpNecesariaSubirNivel = 2500, xpParaActualizarFrame = 250, xpActualFrame = 0;
let numRondaReal = 1, numRondaHastaBoss = 1, textoRonda;
let serpientes = [], bambus = [], aranyas = [], grupoEnemigos;

function preload() {
    this.load.image("tiles", "assets/mapa/tileset_suelo_mapa.png");
    this.load.tilemapTiledJSON("mapa", "assets/mapa/mapa.json");
    this.load.spritesheet("movimiento_jugador", "assets/jugador/walk.png", { frameWidth: 15, frameHeight: 16 });
    this.load.spritesheet("muerto", "assets/jugador/dead.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("hoja", "assets/complementos/hoja.png", { frameWidth: 9, frameHeight: 7 });
    this.load.spritesheet("serpiente", "assets/enemigos/serpiente.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("bambu", "assets/enemigos/bambu.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet("aranya", "assets/enemigos/aranya.png", { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('bola_derecha', "assets/complementos/bola_derecha.png", { frameWidth: 15, frameHeight: 7 });
    this.load.spritesheet('bola_izquierda', "assets/complementos/bola_izquierda.png", { frameWidth: 15, frameHeight: 7 });
    this.load.spritesheet('bola_arriba', "assets/complementos/bola_arriba.png", { frameWidth: 8, frameHeight: 15 });
    this.load.spritesheet('bola_abajo', "assets/complementos/bola_abajo.png", { frameWidth: 8, frameHeight: 15 });
    this.load.spritesheet('barra_vida', "assets/complementos/barra_vida.png", { frameWidth: 164, frameHeight: 48 });
    this.load.spritesheet('barra_nivel', "assets/complementos/barra_nivel.png", { frameWidth: 351, frameHeight: 35 });
    this.load.spritesheet('boss_andar', "/assets/enemigos/bossFinal_andar.png", { frameWidth: 53, frameHeight: 34 });
    this.load.spritesheet('boss_trans', "assets/enemigos/bossFinal_trans.png", { frameWidth: 65, frameHeight: 52 });
    this.load.spritesheet('boss_reposo', "assets/enemigos/bossFinal_reposo.png", { frameWidth: 55, frameHeight: 33 });
}

function initSounds() {

}