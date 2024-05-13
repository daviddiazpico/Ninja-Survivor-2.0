function create() {
    grupoEnemigos = this.add.group();

    initSounds.call(this);
    createWorld.call(this);
    createAnimations.call(this);
    createPlayer.call(this);
    crearControles.call(this);
    crearBarraVida.call(this);
    crearBarraNivel.call(this);

    setInterval(() => {
        for (i = 0; i < 4; i++) crearHoja.call(this);
    }, 400);

    // Para que no haya que esperar los primeros 60 segundos para que aparezcan los primeros enemigos
    for (i = 0; i < numEnemigosRonda; i++) crearSerpiente.call(this)
    setInterval(() => {
        if (numRonda <= 5) {
            for (i = 0; i < numEnemigosRonda; i++) crearSerpiente.call(this);
        }
        else if (numRonda > 5 && numRonda <= 15) {
            for (i = 0; i < numEnemigosRonda; i++) crearBambu.call(this);
        }
        else {
            for (i = 0; i < numEnemigosRonda; i++) crearAranya.call(this);
        }

        //console.log("Ronda: " + numRonda)
        numRonda++;
    }, 30000);//60000

    this.physics.add.overlap(jugador, grupoEnemigos, quitarVida, null, this);
    this.input.on('pointerdown', disparar, this);
}

function createWorld() {
    mapa = this.make.tilemap({ key: 'mapa' });

    scale *= Math.max(ANCHO_PANTALLA / mapa.widthInPixels,
        ALTO_PANTALLA / mapa.heightInPixels);

    anchoMundo = mapa.widthInPixels * scale;
    altoMundo = mapa.heightInPixels * scale;

    let tileset = mapa.addTilesetImage('tileset_suelo_mapa', 'tiles');

    capaSuelo = mapa.createLayer('suelo', tileset, 0, 0).setScale(scale).setDepth(1);
    capaElementosSuelo = mapa.createLayer('complementos_suelo', tileset, 0, 0).setScale(scale).setDepth(2);
    capaJugador = mapa.createLayer('jugador', tileset, 0, 0).setScale(scale).setDepth(3);
    encimaJugador = mapa.createLayer('encima_jugador', tileset, 0, 0).setScale(scale).setDepth(4);

    capaJugador.setCollisionByProperty({ collide: true });
    capaElementosSuelo.setCollisionByProperty({ collide: true });
}

function createAnimations() {
    const anims = this.anims;

    // Jugador
    anims.create({
        key: 'jugador_derecha', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('movimiento_jugador', { start: 12, end: 15 })
    });
    anims.create({
        key: 'jugador_izquierda', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('movimiento_jugador', { start: 8, end: 11 })
    });
    anims.create({
        key: 'jugador_arriba', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('movimiento_jugador', { start: 4, end: 7 })
    });
    anims.create({
        key: 'jugador_abajo', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('movimiento_jugador', { start: 0, end: 3 })
    });
    anims.create({
        key: 'jugador_reposo',
        frames: this.anims.generateFrameNumbers('movimiento_jugador', { frames: [0] })
    });
    anims.create({
        key: 'jugador_muerto',
        frames: this.anims.generateFrameNumbers('muerto', { frames: [0] })
    });

    // hoja
    anims.create({
        key: 'caer_hoja', frameRate: 4, repeat: -1,
        frames: this.anims.generateFrameNumbers('hoja', { start: 0, end: 5 })
    });

    // Enemigos
    anims.create({
        key: 'serpiente_abajo', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('serpiente', { frames: [0, 4, 8, 12] })
    });
    anims.create({
        key: 'serpiente_arriba', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('serpiente', { frames: [1, 5, 9, 13] })
    });
    anims.create({
        key: 'serpiente_izquierda', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('serpiente', { frames: [2, 6, 10, 14] })
    });
    anims.create({
        key: 'serpiente_derecha', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('serpiente', { frames: [3, 7, 11, 15] })
    });
    anims.create({
        key: 'bambu_abajo', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('bambu', { frames: [0, 4, 8, 12] })
    });
    anims.create({
        key: 'bambu_arriba', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('bambu', { frames: [1, 5, 9, 13] })
    });
    anims.create({
        key: 'bambu_izquierda', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('bambu', { frames: [3, 7, 11, 15] })
    });
    anims.create({
        key: 'bambu_derecha', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('bambu', { frames: [2, 6, 10, 14] })
    });
    anims.create({
        key: 'aranya_abajo', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('aranya', { start: 0, end: 3 })
    });
    anims.create({
        key: 'aranya_arriba', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('aranya', { start: 4, end: 7 })
    });
    anims.create({
        key: 'aranya_izquierda', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('aranya', { start: 8, end: 11 })
    });
    anims.create({
        key: 'aranya_derecha', frameRate: 10, repeat: -1,
        frames: this.anims.generateFrameNumbers('aranya', { start: 12, end: 15 })
    });

    // Bola de fuego
    anims.create({
        key: 'bfuego_derecha', frameRate: 1,
        frames: this.anims.generateFrameNumbers('bola_derecha', { start: 0, end: 2 })
    });
    anims.create({
        key: 'bfuego_izquierda', frameRate: 1,
        frames: this.anims.generateFrameNumbers('bola_izquierda', { start: 0, end: 2 })
    });
    anims.create({
        key: 'bfuego_arriba', frameRate: 1,
        frames: this.anims.generateFrameNumbers('bola_arriba', { start: 0, end: 2 })
    });
    anims.create({
        key: 'bfuego_abajo', frameRate: 1,
        frames: this.anims.generateFrameNumbers('bola_abajo', { start: 0, end: 2 })
    });
}

function createPlayer() {
    const PUNTO_APARICION = mapa.findObject('objetos', objeto => objeto.name === 'punto_aparicion');

    jugador = this.physics.add.sprite(PUNTO_APARICION.x * scale,
        PUNTO_APARICION.y * scale, 'movimiento_jugador').setScale(scale * 1.40).
        setCollideWorldBounds(true).setDepth(3).setImmovable();

    jugador.vida = 200;
    jugador.golpeado = false;
    jugador.tiempoInmune = 0;

    this.physics.add.collider(jugador, capaSuelo);
    this.physics.add.collider(jugador, capaElementosSuelo);
    this.physics.add.collider(jugador, capaJugador);

    const camara = this.cameras.main;
    const world = this.physics.world;
    camara.startFollow(jugador);
    camara.setBounds(0, 0, anchoMundo, altoMundo);
    world.setBounds(0, 0, anchoMundo, altoMundo);
}

function crearControles() {
    keyA = this.input.keyboard.addKey('A');
    keyS = this.input.keyboard.addKey('S');
    keyD = this.input.keyboard.addKey('D');
    keyW = this.input.keyboard.addKey('W');
    puntero = this.input.activePointer;
}

function crearHoja() {
    let xHoja = Math.random() * anchoMundo;
    let yHoja = Math.random() * altoMundo;
    let hoja = this.add.sprite(xHoja, yHoja, 'hoja').setScale(scale * 1.25).setDepth(4);

    hoja.anims.play('caer_hoja', true);

    let contador = 1;

    setInterval(() => {
        if (contador == 6) {
            hoja.destroy();
        }
        else if (contador > 3) {
            hoja.alpha -= 0.50;
            hoja.x += 3;
            hoja.y += 5;
            contador++;
        }
        else {
            hoja.x += 3;
            hoja.y += 5;
            contador++;
        }
    }, 250);
}

function crearSerpiente() {
    let xSerpiente = Math.random() * anchoMundo;
    let ySerpiente = Math.random() * altoMundo;
    let serpiente = this.physics.add.sprite(xSerpiente, ySerpiente, 'serpiente').
        setScale(scale).setCollideWorldBounds(true).setDepth(3);

    grupoEnemigos.add(serpiente);

    //this.physics.add.collider(serpiente, jugador);
    this.physics.add.collider(serpiente, capaElementosSuelo);
    this.physics.add.collider(serpiente, capaSuelo);
    this.physics.add.collider(serpiente, capaJugador);

    serpiente.vida = 100;
    serpientes.push(serpiente);

    serpiente.interval = setInterval(() => {
        let vX = 0, vY = 0;

        if (jugador.x > serpiente.x) {
            vX = VELOCIDAD_SERPIENTE;
        }
        else if (jugador.x < serpiente.x) {
            vX = -VELOCIDAD_SERPIENTE;
        }
        else if (jugador.x == serpiente.x) {
            vX = 0;
        }

        if (jugador.y > serpiente.y) {
            vY = VELOCIDAD_SERPIENTE;
        }
        else if (jugador.y < serpiente.y) {
            vY = -VELOCIDAD_SERPIENTE;
        }
        else if (jugador.y == serpiente.y) {
            vY = 0;
        }

        serpiente.setVelocity(vX, vY);

        if (vX < 0) serpiente.anims.play('serpiente_izquierda', true);
        else if (vX > 0) serpiente.anims.play('serpiente_derecha', true);
        else if (vY < 0) serpiente.anims.play('serpiente_arriba', true);
        else if (vY > 0) serpiente.anims.play('serpiente_abajo', true);
    }, 100);
}

function crearBambu() {
    let xBambu = Math.random() * anchoMundo;
    let yBambu = Math.random() * altoMundo;
    let bambu = this.physics.add.sprite(xBambu, yBambu, 'bambu').
        setScale(scale).setCollideWorldBounds(true).setDepth(3);

    grupoEnemigos.add(bambu);

    //this.physics.add.collider(bambu, jugador);
    this.physics.add.collider(bambu, capaElementosSuelo);
    this.physics.add.collider(bambu, capaSuelo);
    this.physics.add.collider(bambu, capaJugador);

    bambu.vida = 150;
    bambus.push(bambu);

    bambu.interval = setInterval(() => {
        let vX = 0, vY = 0;

        if (jugador.x > bambu.x) {
            vX = VELOCIDAD_BAMBU;
        }
        else if (jugador.x < bambu.x) {
            vX = -VELOCIDAD_BAMBU;
        }
        else if (jugador.x == bambu.x) {
            vX = 0;
        }

        if (jugador.y > bambu.y) {
            vY = VELOCIDAD_BAMBU;
        }
        else if (jugador.y < bambu.y) {
            vY = -VELOCIDAD_BAMBU;
        }
        else if (jugador.y == bambu.y) {
            vY = 0;
        }

        bambu.setVelocity(vX, vY);

        if (vX < 0) bambu.anims.play('bambu_izquierda', true);
        else if (vX > 0) bambu.anims.play('bambu_derecha', true);
        else if (vY < 0) bambu.anims.play('bambu_arriba', true);
        else if (vY > 0) bambu.anims.play('bambu_abajo', true);
    }, 100);
}

function crearAranya() {
    let xAranya = Math.random() * anchoMundo;
    let yAranya = Math.random() * altoMundo;
    let aranya = this.physics.add.sprite(xAranya, yAranya, 'aranya').
        setScale(scale).setCollideWorldBounds(true).setDepth(3);

    grupoEnemigos.add(aranya);

    //this.physics.add.collider(aranya, jugador);
    this.physics.add.collider(aranya, capaElementosSuelo);
    this.physics.add.collider(aranya, capaSuelo);
    this.physics.add.collider(aranya, capaJugador);

    aranya.vida = 200;
    aranyas.push(aranya);

    aranya.interval = setInterval(() => {
        let vX = 0, vY = 0;

        if (jugador.x > aranya.x) {
            vX = VELOCIDAD_ARANYA;
        }
        else if (jugador.x < aranya.x) {
            vX = -VELOCIDAD_ARANYA;
        }
        else if (jugador.x == aranya.x) {
            vX = 0;
        }

        if (jugador.y > aranya.y) {
            vY = VELOCIDAD_ARANYA;
        }
        else if (jugador.y < aranya.y) {
            vY = -VELOCIDAD_ARANYA;
        }
        else if (jugador.y == aranya.y) {
            vY = 0;
        }

        aranya.setVelocity(vX, vY);

        if (vX < 0) aranya.anims.play('aranya_izquierda', true);
        else if (vX > 0) aranya.anims.play('aranya_derecha', true);
        else if (vY < 0) aranya.anims.play('aranya_arriba', true);
        else if (vY > 0) aranya.anims.play('aranya_abajo', true);
    }, 100);
}

function crearBarraVida() {
    barraVida = this.add.sprite(100, 25, 'barra_vida').
        setOrigin(0).setScale(scale).setDepth(5);
    barraVida.setScrollFactor(0);
}

function crearBarraNivel() {
    barraNivel = this.add.sprite(ANCHO_PANTALLA - 451, 60, 'barra_nivel').
        setOrigin(0).setDepth(5);
    barraNivel.setScrollFactor(0);
}

function disparar(evento) {
    if (evento.leftButtonDown()) {
        let bolaFuego = this.physics.add.sprite(jugador.x, jugador.y, 'bola_derecha').
            setScale(scale).setDepth(3);
        bolaFuego.setVelocity(puntero.worldX - jugador.x, puntero.worldY - jugador.y).
            body.velocity.normalize().scale(VELOCIDAD * 2.5);

        serpientes.forEach((serpiente) => {
            this.physics.add.overlap(serpiente, bolaFuego, eliminarSerpiente, null, this);
        });

        bambus.forEach((bambu) => {
            this.physics.add.overlap(bambu, bolaFuego, eliminarBambu, null, this);
        });

        aranyas.forEach((aranya) => {
            this.physics.add.overlap(aranya, bolaFuego, eliminarAranya, null, this);
        });

        setInterval(() => {
            bolaFuego.destroy();
        }, 4000);
    }
}

function eliminarSerpiente(serpiente, bolaFuego) {
    serpiente.vida -= 50;
    bolaFuego.destroy();

    if (serpiente.vida == 0) {
        clearInterval(serpiente.interval)
        serpiente.destroy();
        bolaFuego.destroy();
        xpActual += 100;
        xpActualFrame += 100;
    }
}

function eliminarBambu(bambu, bolaFuego) {
    bambu.vida -= 50;
    bolaFuego.destroy();

    if (bambu.vida == 0) {
        clearInterval(bambu.interval)
        bambu.destroy();
        bolaFuego.destroy();
        xpActual += 75;
        xpActualFrame += 75;
    }
}

function eliminarAranya(aranya, bolaFuego) {
    aranya.vida -= 50;
    bolaFuego.destroy();

    if (aranya.vida == 0) {
        clearInterval(aranya.interval)
        aranya.destroy();
        bolaFuego.destroy();
        xpActual += 100;
        xpActualFrame += 100;
    }
}

function quitarVida(jugador) {
    if (jugador.vida > 0 && !(jugador.golpeado)) {
        jugador.vida -= 20;
        jugador.golpeado = true;
        jugador.tiempoInmune = this.time.now + 3000;
        console.log(jugador.vida);
        //jugador.setTint(0xe7f24e);
        actualizarBarraVida();
    }
    else if (jugador.vida == 0){
        gameOver = true;
    }
}

function actualizarBarraVida() {
    if (contadorFrameVida < 10) {
        barraVida.setFrame(++contadorFrameVida);
    }
}

function subirNivel() {
    nivelJugador++;
    xpActual = 0;
    xpNecesariaSubirNivel += 2500;

    xpParaActualizarFrame += 250;
    contadorFrameNivel = 0;
    
    barraNivel.setFrame(contadorFrameNivel);
}

function actualizarBarraNivel() {
    if (xpActualFrame >= xpParaActualizarFrame)
    {
        if (xpActualFrame > xpParaActualizarFrame)
        {
            xpActualFrame -= xpParaActualizarFrame;
        }
        else
        {
            xpActualFrame = 0;
        }

        if (contadorFrameNivel < 10)
        {
            barraNivel.setFrame(++contadorFrameNivel);
        }
    }
}