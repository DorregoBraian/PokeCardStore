import { Card, Inicio, Pokemones, Pokemon, Formulario, AlertPokemon } from "./components.js";

$(document).ready(function () {
    //código a ejecutar cuando el DOM está listo para recibir instrucciones.
    $("#main").html(Inicio());
    pokemonRamndon();
    funcionCorazon();
    localStorage.clear();
    let currentPage = 1;
    let valorSeleccionado;  // Mueve esta variable al ámbito superior

    const paginaSiguiente = () => {
        currentPage++;
        $(".h3-paguinacion").text('Pagina ' + currentPage);
        buscarPokemonPorColor(valorSeleccionado, currentPage);
        buscarPokemonPorTipo(valorSeleccionado, currentPage);
        buscarPokemonPorRegion(valorSeleccionado, currentPage);
    }

    const paginaAnterior = () => {
        if (currentPage > 1) {
            currentPage--;
            $(".h3-paguinacion").text('Pagina ' + currentPage);
            buscarPokemonPorColor(valorSeleccionado, currentPage);
            buscarPokemonPorTipo(valorSeleccionado, currentPage);
            buscarPokemonPorRegion(valorSeleccionado, currentPage);
        }
    }

    // Agregar un controlador de eventos click a todos los enlaces dentro de <nav>
    $("nav a").click(function (event) {
        // Evitar que el enlace se comporte como un enlace normal (navegar a otra página)
        event.preventDefault();

        // Obtener el texto del enlace que se hizo clic y mostrarlo en la consola
        var textoEnlace = $(this).text();

        switch (textoEnlace) {
            case "Inicio":
                $("#main").html(Inicio());
                pokemonRamndon();
                obtenerFavoritos();
                break;
            case "Pokemones":
                $("#main").html(Pokemones());
                filtroRegiones();
                filtroTipos();
                filtroColor();

                $("#region").change(function () {
                    // Obtener el valor seleccionado
                    valorSeleccionado = $(this).val(); // nombre de la reguion
                    console.log(valorSeleccionado)

                    // Muestra el indicador de carga y oculta el contenido existente
                    $("#loader").show();
                    // Borra las card existentes
                    $(".pokemones-section").empty();
                    buscarPokemonPorRegion(valorSeleccionado, 1);
                });

                $("#tipo").change(function () {
                    // Obtener el valor seleccionado
                    valorSeleccionado = $(this).val(); // nombre del tipo
                    console.log(valorSeleccionado)

                    // Muestra el indicador de carga y oculta el contenido existente
                    $("#loader").show();
                    // Borra las card existentes
                    $(".pokemones-section").empty();
                    buscarPokemonPorTipo(valorSeleccionado, 1);
                });

                $("#color").change(function () {
                    // Obtener el valor seleccionado
                    valorSeleccionado = $(this).val(); // nombre del tipo
                    console.log(valorSeleccionado)

                    // Muestra el indicador de carga y oculta el contenido existente
                    $("#loader").show();
                    // Borra las card existentes
                    $(".pokemones-section").empty();
                    buscarPokemonPorColor(valorSeleccionado, 1);
                });

                // Esto agrega un controlador de eventos al elemento seleccionado (en este caso, el elemento con el ID "main") para el evento de clic.
                $("#main").on("click", "#card-pokemon", function (event) {
                    event.preventDefault();
                    $("#main").empty();
                    var pokemonName = $(this).data("pokemon"); // nombre del pokemon
                    //console.log(pokemonName);
                    buscarPokemonPorNombre2(pokemonName.toLowerCase());

                });

                // Asignar eventos de clic a los botones
                $("#prevPage").on("click", function () {
                    paginaAnterior();
                });

                $("#nextPage").on("click", function () {
                    paginaSiguiente();
                });
                break;
            case "Formulario":
                $("#main").html(Formulario());
                botonLimpiar();
                botonEnviar();
                break;
            /*case "Contactos":

                break;*/
            default:
                break;
        }
    });
});


// --------------------------- FILTROS -----------------------------
const filtroRegiones = () => {
    var url = `https://pokeapi.co/api/v2/region/`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            //console.log(datos.results); // lista de reguines
            datos.results.forEach((region, index) => {
                //console.log(region.name);
                var regionM = region.name.charAt(0).toUpperCase() + region.name.slice(1);
                $("#region").append(`<option value='${regionM}'>${regionM}</option>`);
            });
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const filtroTipos = () => {
    var url = `https://pokeapi.co/api/v2/type`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            datos.results.forEach(tipo => {
                //console.log(region.name);
                var tipoM = tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1);
                $("#tipo").append(`<option value='${tipoM}'>${tipoM}</option>`);

            });

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const filtroColor = () => {
    var url = `https://pokeapi.co/api/v2/pokemon-color`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            //console.log(datos.results); // lista de reguines
            datos.results.forEach(tipo => {
                //console.log(region.name);
                var colorM = tipo.name.charAt(0).toUpperCase() + tipo.name.slice(1);
                $("#color").append(`<option value='${colorM}'>${colorM}</option>`);

            });

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

/* se agrega un Pokémon a la lista de favoritos en localStorage. Si el nombre no está presente en la lista, se agrega al final; si la lista excede el límite, se elimina el primer elemento. */
const agregarFavorito = (nombre) => {
    let favoritos = obtenerFavoritosArray();

    if (!favoritos.includes(nombre)) {
        favoritos.push(nombre);
        if (favoritos.length > 5) {
            favoritos.shift();
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
};

/* obtiene la lista de favoritos desde localStorage y la convierte a un array. Si no hay ninguna lista, devuelve un array vacío.*/
const obtenerFavoritosArray = () => {
    return JSON.parse(localStorage.getItem("favoritos")) || [];
};

const obtenerFavoritos = () => {
    let favoritos = obtenerFavoritosArray();

    if (favoritos.length > 0) {
        favoritos.forEach((nombre) => {
            buscarPokemonPorIdoNombre(nombre.toLowerCase())
                .then((pokemonCard) => {
                    $(".main-article2").append($(pokemonCard));
                })
                .catch((error) => {
                    console.error("Error al buscar el Pokémon:", error);
                });
        });
    } else {
        console.log("No hay ningún favorito");
    }
};

const funcionCorazon = () => {
    $("#main").on("click", "#favorito", function () {
        var currentSrc = $("#main #corazon").attr("src");
        var namePoke = $("#main #name-pokemon").text();

        if (currentSrc.includes("corazon-off.png")) {
            $("#main #corazon").attr("src", "../Img/corazon-on.png");
            agregarFavorito(namePoke);
        } else {
            $("#main #corazon").attr("src", "../Img/corazon-off.png");
            // Puedes agregar código para eliminar un favorito aquí si es necesario
        }
    });
};


/*---------------------------- Funciones que le pegan a al PokeAPI ---------------------------------------*/

/* en la reguin/ pokedex/pokemon_entries/nom pokemon --- busco por pokemon */
/*name, stats(todo son 6), types, height,weight*/

const pokemonRamndon = () => {
    //Para obtener un número aleatorio entre 1 y 898 (el número total de Pokémon en la PokeAPI)
    for (let i = 0; i < 5; i++) {
        var idRamdonDePokemon = Math.floor(Math.random() * 898) + 1;
        buscarPokemonPorIdoNombre(idRamdonDePokemon)
            .then((pokemonCard) => {
                $(".main-article").append($(pokemonCard));
            })
            .catch((error) => {
                console.error("Error al buscar el Pokémon:", error);
            });
    }
}

const buscarPokemonPorRegion = (regionName, page) => {
    var url = `https://pokeapi.co/api/v2/region/${regionName.toLowerCase()}`;
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            //console.log(datos.name); // nombre de la reguion
            //console.log(datos.pokedexes[0].url);
            buscarPokemonPorPokedexes(datos.pokedexes[0].url, page);

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const buscarPokemonPorPokedexes = (pokedexDeRegion, page) => {

    // Borra las card existentes
    $(".pokemones-section").empty();
    $.ajax({
        url: pokedexDeRegion,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            console.log(datos.pokemon_entries); // lista de pokemones
            const listRegiones = datos.pokemon_entries.slice((page - 1) * 16, page * 16);
            listRegiones.forEach(element => {
                //console.log(element.pokemon_species.name); // nombre del pokemon
                //buscarPokemonPorNombre(element.pokemon_species.name);
                buscarPokemonPorIdoNombre(element.pokemon_species.name)
                    .then((pokemonCard) => {
                        $(".pokemones-section").append($(pokemonCard));
                    })
                    .catch((error) => {
                        console.error("Error al buscar el Pokémon:", error);
                    });
            });

            // Oculta el indicador de carga una vez que los datos están cargados
            $("#loader").hide();
            // Desplázate al principio de la lista de resultados
            $("html, body").animate({ scrollTop: $("#header").offset().top }, "slow");
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const buscarPokemonPorIdoNombre = (pokeIdoPokeNombre) => {
    var url = `https://pokeapi.co/api/v2/pokemon/${pokeIdoPokeNombre}`;

    return new Promise((resolve, reject) => {
        $.ajax({
            url: url,
            type: "GET",
            dataType: "json",
            success: function (datos) {
                var nombre = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
                var peso = datos.weight + " Kg";
                var altura = datos.height;
                var hp = datos.stats[0].base_stat;
                var ataque = datos.stats[1].base_stat;
                var ataqueEspecial = datos.stats[3].base_stat;
                var defensa = datos.stats[2].base_stat;
                var defensaEspecial = datos.stats[4].base_stat;
                var velocidad = datos.stats[5].base_stat;
                var img = datos.sprites.front_default;

                resolve(Card(nombre, peso, altura, hp, velocidad, ataque, ataqueEspecial, defensa, defensaEspecial, img));
            },
            error: function (xhr, status, error) {
                reject(error);
            }
        });
    });
}

const buscarPokemonPorNombre2 = (pokeName) => {
    var url = `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`;

    // Borra las card existentes
    $(".pokemones-section").empty();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            //console.log(datos); // Pokemon especifico
            var nombre = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
            var peso = datos.weight + " Kg";
            var altura = datos.height;
            var hp = datos.stats[0].base_stat;
            var ataque = datos.stats[1].base_stat;
            var ataqueEspecial = datos.stats[3].base_stat;
            var defensa = datos.stats[2].base_stat;
            var defensaEspecial = datos.stats[4].base_stat;
            var velocidad = datos.stats[5].base_stat;
            var img = datos.sprites.front_default;

            // ----------- Para buecasr el tipo de Pokemon----------------- 
            // Array para almacenar los nombres de los tipos
            var tipos = [];
            var tipo;
            // Recorrer la lista de tipos y agregar sus nombres al array
            for (var i = 0; i < datos.types.length; i++) {
                tipos.push(datos.types[i].type.name);
            }
            // Separo los tipos por coma
            if (tipos.length > 1) {
                var lastTipo = tipos.pop();
                var tipoString = tipos.join(", ") + " y " + lastTipo;
                var tipo = tipoString;
            } else {
                var tipo = tipos[0];
            }

            // ----------- Para buecasr las habilidades del Pokemon----------------- 
            // Array para almacenar los nombres de las habilidades
            var habilidades = [];
            var habilidad;
            // Recorrer la lista de habilidades y agregar sus nombres al array
            for (var i = 0; i < datos.abilities.length; i++) {
                habilidades.push(datos.abilities[i].ability.name);
            }
            // Separo las habilidades por coma
            if (habilidades.length > 1) {
                var lastTipo = habilidades.pop();
                var tipoString = habilidades.join(", ") + " o " + lastTipo;
                var habilidad = tipoString;
            } else {
                var habilidad = habilidad[0];
            }

            // ----------- Para buecasr los items que puede llevar el Pokemon----------------- 
            // Array para almacenar los nombres de los items
            var items = [];
            var item;
            // Recorrer la lista de items y agregar sus nombres al array
            for (var i = 0; i < datos.held_items.length; i++) {
                items.push(datos.held_items[i].item.name);
            }
            // Separo los items por coma
            if (items.length > 1) {
                var lastTipo = items.pop();
                var tipoString = items.join(", ") + " o " + lastTipo;
                var item = tipoString;
            }
            if (items.length == 0) {
                var item = "ningun item"
            } else {
                var item = item[0];
            }

            // ----------- Para buecasr el nombre del juego en donde aparece el Pokemon----------------- 
            // Array para almacenar los nombres de los games
            var games = [];
            var game;
            // Recorrer la lista de games y agregar sus nombres al array
            for (var i = 0; i < datos.game_indices.length; i++) {
                games.push(datos.game_indices[i].version.name);
            }
            // Separo los games por coma
            if (games.length > 1) {
                var lastTipo = games.pop();
                var tipoString = "Pokemon " + games.join(", ") + " y " + "Pokemon " + lastTipo;
                var game = tipoString;
            }
            else {
                var game = "Pokemon " + game[0];
            }

            // ----------- Para buecasr el nombre de las peliculas en donde aparece el Pokemon----------------- 
            // Array para almacenar los nombres de los peliculas
            var movies = [];
            var movie;
            // Recorrer la lista de peliculas y agregar sus nombres al array
            for (var i = 0; i < datos.moves.length; i++) {
                movies.push(datos.moves[i].move.name);
            }
            // Separo las peliculas por coma
            if (movies.length > 1) {
                var lastTipo = movies.pop();
                var tipoString = "Pokemon " + movies.join(", ") + " y " + "Pokemon " + lastTipo;
                var movie = tipoString;
            }
            else {
                var movie = "Pokemon " + game[0];
            }

            $("#main").html(Pokemon(nombre, tipo, "--Reguion--", habilidad, item, game, movie));
            $("#div-card").html(Card(nombre, peso, altura, hp, velocidad, ataque, ataqueEspecial, defensa, defensaEspecial, img));


        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const buscarPokemonPorTipo = (typeName, page) => {
    var url = `https://pokeapi.co/api/v2/type/${typeName.toLowerCase()}`;

    // Borra las card existentes
    $(".pokemones-section").empty();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            console.log(datos.pokemon); // Lista de Pokemones de ese tipo
            const listTipo = datos.pokemon.slice((page - 1) * 16, page * 16);
            listTipo.forEach(element => {
                console.log(); // nombre del pokemon
                buscarPokemonPorIdoNombre(element.pokemon.name)
                    .then((pokemonCard) => {
                        $(".pokemones-section").append($(pokemonCard));
                    })
                    .catch((error) => {
                        console.error("Error al buscar el Pokémon:", error);
                    });

            });

            // Oculta el indicador de carga una vez que los datos están cargados
            $("#loader").hide();
            // Desplázate al principio de la lista de resultados
            $("html, body").animate({ scrollTop: $("#header").offset().top }, "slow");
        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}

const buscarPokemonPorColor = (colorName, page) => {
    var url = `https://pokeapi.co/api/v2/pokemon-color/${colorName.toLowerCase()}`;

    // Borra las card existentes
    $(".pokemones-section").empty();
    $.ajax({
        url: url,
        type: "GET",
        dataType: "json",
        success: function (datos) {
            const listColor = datos.pokemon_species.slice((page - 1) * 16, page * 16);
            console.log(listColor);
            listColor.forEach(element => {
                buscarPokemonPorIdoNombre(element.name)
                    .then((pokemonCard) => {
                        $(".pokemones-section").append($(pokemonCard));
                    })
                    .catch((error) => {
                        console.error("Error al buscar el Pokémon:", error);
                    });

            });
            // Oculta el indicador de carga una vez que los datos están cargados
            $("#loader").hide();
            // Desplázate al principio de la lista de resultados
            $("html, body").animate({ scrollTop: $("#header").offset().top }, "slow");

        },
        error: function (xhr, status, error) {
            console.log(xhr);
            console.log(status);
            console.log(error);
        }
    })
}


/* --------------------- Metodos para chequear el formulario ----------------------------------------- */

const botonLimpiar = () => {
    // Agregar un controlador de eventos al botón para limpiar los inputs
    $('#btnLimpiar').click(function (event) {
        event.preventDefault(); // Evita el comportamiento por defecto del formulario (redirección)
        $('input').val(''); // Limpiar el contenido del primer input
    });
}

const botonEnviar = () => {
    $('#btnEnviar').click(function (event) {
        event.preventDefault();

        const expresionRegular = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        const nombre = $('#nombre').val();
        const email = $('#email').val();
        const asunto = $('#asunto').val();
        const mensaje = $('#mensaje').val();

        if (expresionRegular.test(email)) {
            // Modifica el atributo 'action' del formulario con el valor de 'email'.
            $('form').attr('action', `https://formsubmit.co/${email}`);

            // Luego puedes enviar el formulario si lo deseas.
            $('form').submit();
        } else {
            // Si el correo electrónico no es válido, muestra el alert.
            $("#section-alert").html(AlertPokemon("El correo electrónico no es válido."));

            // También puedes mostrar u ocultar el alert-pokemon, dependiendo de tu diseño.
            $("#alert-pokemon").show(); // Muestra el alert-pokemon.

            // Puedes ocultar el alert después de un tiempo si lo deseas.
            setTimeout(function () {
                $("#alert-pokemon").hide(); // Oculta el alert-pokemon después de 3 segundos.
            }, 600); // 3000 milisegundos = 3 segundos
        }
    });
}

/* ------------------------------------ Cloud Translation API ----------------------------------------- */

// Reemplaza 'CLAVE_DE_API' con la clave de API de Google Cloud

const traductor = (palabra) => {
    const apiKey = 'TU_CLAVE_DE_API'; //22de1825a7de9b2a9301ab0ebd9b743f2fe30e6b
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const textoIngles = palabra;
    $.ajax({
        url: apiUrl,
        type: 'POST',
        dataType: 'json',
        data: {
            q: textoIngles,
            source: 'en',
            target: 'es'
        },
        success: function (data) {
            // debolver la palabra traducida
        },
        error: function (error) {
            console.error('Error al traducir:', error);
        }
    });
}










