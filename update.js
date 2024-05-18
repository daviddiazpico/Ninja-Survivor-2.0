function update() {
    if (gameOver) {
        jugador.anims.play('jugador_muerto', true);
        return ;
    }

    let vX = 0, vY = 0;

    if (keyA.isDown) {
        vX = -VELOCIDAD;
    }
    else if (keyD.isDown) {
        vX = VELOCIDAD;
    }

    if (keyW.isDown) {
        vY = -VELOCIDAD;
    }
    else if (keyS.isDown) {
        vY = VELOCIDAD;
    }

    jugador.setVelocity(vX, vY).body.velocity.normalize().scale(VELOCIDAD);
    
    if (vX < 0) jugador.anims.play('jugador_izquierda', true);
    else if (vX > 0) jugador.anims.play('jugador_derecha', true);
    else if (vY < 0) jugador.anims.play('jugador_arriba', true);
    else if (vY > 0) jugador.anims.play('jugador_abajo', true);
    else jugador.anims.play('jugador_reposo', true);

    if (this.time.now >= jugador.tiempoInmune) {
        jugador.golpeado = false;
    }
    
    actualizarBarraNivel();
    if (xpActual >= xpNecesariaSubirNivel) {
        subirNivel();
    }
}