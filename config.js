const ANCHO_PANTALLA = window.innerWidth;
const ALTO_PANTALLA = window.innerHeight;
const VELOCIDAD = 200;
const VELOCIDAD_SERPIENTE = 75;
const VELOCIDAD_BAMBU = 100;
const VELOCIDAD_ARANYA = 125;
const VELOCIDAD_BOSS = 100;

let config = {
    type: Phaser.CANVAS,
    width: ANCHO_PANTALLA,
    height: ALTO_PANTALLA,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
