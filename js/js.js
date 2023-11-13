
    //Pedimos nombre al jugador

    let nombreJugador = prompt("Dime tu nombre, Jugador");//Pedimos el nombre del jugador
    document.getElementById('jugador').textContent = `${nombreJugador.toLocaleUpperCase()}`;//Lo sacamos por pantalla 


    let contadorPuntos1 = 0; // Inicializamos el contador de puntos Jugador
    let contadorPuntos2 = 0; // Inicializamos el contador de puntos Banca

    document.getElementById('pedir-cartas').disabled = true;//desabilitamos los botones del jugador, para que sea crupier primero
    document.getElementById('plantarse').disabled = true;//desabilitamos los botones del jugador para que sea crupier primero
    document.getElementById('nueva-partida').disabled = true;//desabilitamos los botones de partida nueva para no poder pulsar partida nueva


    //MANO BANCA

    function pedirCartaBanca() {

        //Creamos numeros aleatorios sobre los indices de los arrays

        const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const palos = ['C', 'T', 'P', 'D'];
        const numeroCarta = numeros[Math.floor(Math.random() * numeros.length)];
        const palo = palos[Math.floor(Math.random() * palos.length)];
        const rutaCarta = `${numeroCarta}${palo}.png`;

        //Asignamos valores a las cartas segun lo sacado en la parte anterior

        let valorCarta = 0;

        if (numeroCarta == '1') {
            valorCarta = 1;
        } else if (numeroCarta == 'J' || numeroCarta == 'Q' || numeroCarta == 'K') {
            valorCarta = 11;
        } else {
            valorCarta = parseInt(numeroCarta);
        }

        contadorPuntos2 += valorCarta;//Metemos todos los valores de las cartas en el contador

        function retardo() {
            document.getElementById('puntuacion-crupier').textContent = `${contadorPuntos2}`;//Lo sacamos por pantalla con retardo
        }

        setTimeout(retardo, 1000);


        return rutaCarta;//devolvemos ruta carta para usarla mas adelante

    }

    function agregarCartaBanca() {

        document.getElementById('mano-crupier').innerHTML = '';//Al clickar en agregar carta borramos la carta gris

        while (contadorPuntos2 <= 17) {//agregamos cartas como minimo hasta 17

            const rutaCarta = pedirCartaBanca();
            const manoSegundoJugador = document.getElementById('mano-crupier');
            manoSegundoJugador.innerHTML += `<img src="assets/images/${rutaCarta}" alt="Carta">`;

        }

        document.getElementById('pedir-cartas-crupier').disabled = true;//Desabilitamos poder pedir mas jugadas deivan

        //al salir del bucle, cuando ya tenemos las cartas de la banca establecidas, dejamos que el jugador pueda hacer su partida

        document.getElementById('pedir-cartas').disabled = false;
        document.getElementById('plantarse').disabled = false;

        //Si el contador de puntos pasa de 21, terminamos partida con mensaje de gana jugador y desabilitamos todos los botones menos el de nueva partida

        if (contadorPuntos2 > 22) {
            document.getElementById('sorry').textContent = "¡Vaya! Has superado los 21 puntos";
            document.getElementById('mensaje').textContent = `${nombreJugador.toLocaleUpperCase()} WINS`;
            document.getElementById('pedir-cartas').disabled = true;
            document.getElementById('plantarse').disabled = true;
            document.getElementById('pedir-cartas-crupier').disabled = true;
            document.getElementById('nueva-partida').disabled = false;
        }


    }


    //MANO JUGADOR



    function pedirCartaJugador() {

        const numeros = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        const palos = ['C', 'T', 'P', 'D'];
        const numeroCarta = numeros[Math.floor(Math.random() * numeros.length)];//Numeros aleatorios de las cartas
        const palo = palos[Math.floor(Math.random() * palos.length)];//Numeros aleatorios de los palos
        const rutaCarta = `${numeroCarta}${palo}.png`;//Creamos ruta carta para pasarla por DOM

        // Asignamos valores a las cartas

        let valorCarta = 0;

        if (numeroCarta === '1') {
            valorCarta = 1; // Valor de los ASses
        } else if (numeroCarta == 'J' || numeroCarta == 'Q' || numeroCarta == 'K') {
            valorCarta = 11; // Valor de los reyes
        } else {
            valorCarta = parseInt(numeroCarta); // valor del resto
        }

        // Valos sumando los valores
        contadorPuntos1 += valorCarta;

        // Mostramos en el DOM con retardo

        document.getElementById('contador-puntos').textContent = `${contadorPuntos1}`;

        return rutaCarta;
    }

    function agregarCartaJugador() {
        const rutaCarta = pedirCartaJugador();
        const manoJugador = document.getElementById('mano-jugador');
        manoJugador.innerHTML += `<img src="assets/images/${rutaCarta}" alt="Carta">`;

        if (contadorPuntos1 > 22) {
            document.getElementById('sorry').textContent = "¡Vaya! Has superado los 21 puntos";
            document.getElementById('mensaje').textContent = "BANCA WINS";
            document.getElementById('pedir-cartas').disabled = true;
            document.getElementById('plantarse').disabled = true;
            document.getElementById('pedir-cartas-crupier').disabled = true;
            document.getElementById('nueva-partida').disabled = false;


        }
    }



    // BOTON PLANTARSE

    //Al plantarse desabilitamos el boton de pedir cartas del jugador y habilitamos el de nueva partida

    function plantarse() {
        document.getElementById('pedir-cartas').disabled = true;
        document.getElementById('nueva-partida').disabled = false;
        mostrarResultado();

    }


    //QUIEN ES EL GANADOR

    function ganador() {

        //Con comparadores vemos quien tiene mas puntos o si es empate y retornamos mensaje para impresion en pantalla

        if (contadorPuntos1 > contadorPuntos2) {
            return ` ${nombreJugador.toLocaleUpperCase()} WINS`;
        } else if (contadorPuntos2 > contadorPuntos1) {
            return "BANCA WINS";
        } else if (contadorPuntos2 == contadorPuntos1) {
            return "EMPATE";
        } else if (contadorPuntos2 == 21 && contadorPuntos1 == 21) {
            return "EMPATE a 21";
        }
    }

    // Funcion para mostrar por pantalla el ganador o si es empate

    function mostrarResultado() {
        const resultado = ganador();
        document.getElementById('mensaje').textContent = resultado;


    }



    //MODO RESETEO

    function reseteoJuego() {

        /* Esta funcion se pone en marcha al pulsar el boton nueva partida, pone contadores a 0, habilita pedir cartas crupier y desabilita el pedir
        cartas del jugador, y pone los mensajes vacios. */

        contadorPuntos1 = 0;
        contadorPuntos2 = 0;

        document.getElementById('mano-jugador').innerHTML = '<img id="first1" src="assets/images/red_back.png" alt="imagen de parte de atras carta">';
        document.getElementById('mano-crupier').innerHTML = '<img id="first1" src="assets/images/grey_back.png" alt="imagen de parte de atras carta">';
        document.getElementById('contador-puntos').textContent = '0';
        document.getElementById('puntuacion-crupier').textContent = '0';
        document.getElementById('pedir-cartas').disabled = true;
        document.getElementById('pedir-cartas-crupier').disabled = false;
        document.getElementById('plantarse').disabled = true;
        document.getElementById('mensaje').textContent = '';
        document.getElementById('sorry').textContent = "";

        //Una vez reseteado todo vuelvo a pedir nombre de jugador

        nombreJugador = prompt("Dime tu nombre, Jugador");//Pedimos el nombre del jugador
        document.getElementById('jugador').textContent = `${nombreJugador.toLocaleUpperCase()}`;//Lo sacamos por pantalla 

    }
