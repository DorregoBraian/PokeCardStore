const card_vue = {
    props: ['nombre', 'peso', 'altura', 'hp', 'velocidad', 'ataque', 'ataque_especial', 'defensa', 'defensa_especial', 'img'],
    methods: {
        //agrego un método que emitirá un evento cuando se haga clic en la tarjeta. 
        seleccionarPokemon() {
            this.$emit('seleccionar-pokemon', this.nombre);
        }

    },
    template: //html
        `
    <a href="#" id="card-pokemon" @click="seleccionarPokemon">
    <div class="card">
        <img :src="img" alt="">
        <h4>{{nombre}}</h4>
        <div class="data-pokemon">
            <table>
                <tr>
                    <th>HP</th>
                    <td>{{hp}}</td>
                </tr>
                <tr>
                    <th>Peso</th>
                    <td>{{peso}}</td>
                </tr>
                <tr>
                    <th>Ataque</th>
                    <td>{{ataque}}</td>
                </tr>
                <tr>
                    <th>Defensa</th>
                    <td>{{defensa}}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th>Velocidad</th>
                    <td>{{velocidad}}</td>
                </tr>
                <tr>
                    <th>Altura</th>
                    <td>{{altura}}</td>
                </tr>

                <tr>
                    <th>Ataque Especial </th>
                    <td>{{ataque_especial}}</td>
                </tr>
                <tr>
                    <th>Defensa Especial</th>
                    <td>{{defensa_especial}}</td>
                </tr>
            </table>
        </div>
    </div>
</a>
`
}

const pokemon_data_vue = {
    props: ['nombre'],

    dato() {
        return {
            nombre: 'nombre',
            tipo: '',
            game: '',
            pelicula: '',
            region: '',
            habilidad: '',
            item: '',
            img: ''
        };
    },
    mounted() {
        // Llama a la función para buscar datos cuando el componente se monta
        this.buscarPokemonPorNombre(this.nombre);
    },
    methods: {
        buscarPokemonPorNombre(nombre) {
            const url = `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`;
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    console.log(datos);
                    // Extrae la información del Pokémon

                    this.img = datos.sprites.front_default;
                    this.tipo =
                        this.game =
                        this.pelicula =
                        this.region =
                        this.habilidad =
                        this.item = ""

                })
                .catch(error => {
                    console.error('Error fetching Pokémon details:', error);
                });
        },
    },

    template: // html
        `
    <h2 id="name-pokemon">{{nombre}}+{{img}}</h2>
    <section>
        <div id="div-card">
            <img src={{img}} alt="">
        </div>
        <div class="div-botones">
            <button>Comprar Ahora</button>
            <button>Añadir al Carrito</button>
            <div class="div-botones2">
                <div id="div-favorito">
                    <img id="corazon" src="../Img/corazon-off.png" alt="corazon">
                    <a id="favorito" rel="noopener noreferrer">Agregar a Favoritos</a>
                </div>
                <div id="div-compartir">
                    <img src="../Img/compartir.png" alt="compartir">
                    <a href="" rel="noopener noreferrer">Compartir</a>
                </div>
            </div>
        </div>
    </section>
    <hr>
    <section>
        <div id="div-descripcion">
            <h2>Descripcion</h2>
            <p>El pokemon {{nombre}} es un pokemon de tipo {{tipo}} y se encuentra en la region de {{region}}. Las habilidades que puede llegar a tener son {{habilidad}}. Al capturarlo puede llevar con sigo {{item}}.</p> 
            <p>El pokemon {{nombre}} aparece en juegos como {{game}}.</p>
            <p>Tanbien {{nombre}} aparece en peliculas como {{pelicula}}</p>
        </div>
    </section>
    `
}

const inicio_vue = {
    data() {
        return {
            pokemones: [] // Almacenarás los datos de los Pokémon aquí
        };
    },
    mounted() {
        // Llenar la lista de pokemons con datos aleatorios
        for (let i = 0; i < 5; i++) {
            const randomId = Math.floor(Math.random() * 898) + 1; // Números aleatorios entre 1 y 800
            this.buscarPokemonPorId(randomId);
        }
    },
    methods: {
        buscarPokemonPorId(id) {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    //console.log(datos);
                    // Extrae la información del Pokémon
                    const nombre = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
                    const peso = datos.weight + " Kg";
                    const altura = datos.height;
                    const hp = datos.stats[0].base_stat;
                    const ataque = datos.stats[1].base_stat;
                    const ataque_especial = datos.stats[3].base_stat;
                    const defensa = datos.stats[2].base_stat;
                    const defensa_especial = datos.stats[4].base_stat;
                    const velocidad = datos.stats[5].base_stat;
                    const img = datos.sprites.front_default;

                    // Agrega la información del Pokémon al array
                    this.pokemones.push({
                        nombre,
                        peso,
                        altura,
                        hp,
                        velocidad,
                        ataque,
                        ataque_especial,
                        defensa,
                        defensa_especial,
                        img
                    });
                    //console.log(this.pokemones)
                })
                .catch(error => {
                    console.error('Error fetching Pokémon details:', error);
                });
        }
    },
    components: {
        'card_vue': card_vue
    },
    template: //html
        `
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                  <div class="carousel-item active">
                      <img src="/Img/carrusel 1.webp" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                      <img src="/Img/carrusel 3.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                      <img src="/Img/carrusel 4.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                      <img src="/Img/carrusel 5.jpg" class="d-block w-100" alt="...">
                  </div>
                  <div class="carousel-item">
                      <img src="/Img/carrusel 6.png" class="d-block w-100" alt="...">
                  </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
                  data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  <span class="visually-hidden">Next</span>
              </button>
          </div>
          <section class="main-section">
              <h3>Los mas Populares</h3>
              <hr>
              <article class="main-article">
                    <card_vue v-for="(pokemon, index) in pokemones" :key="index" :nombre="pokemon.nombre" :peso="pokemon.peso" 
                        :altura="pokemon.altura" :hp="pokemon.hp" :velocidad="pokemon.velocidad" :ataque="pokemon.ataque" 
                        :ataque_especial="pokemon.ataque_especial" :defensa="pokemon.defensa" :defensa_especial="pokemon.defensa_especial"
                        :img="pokemon.img">
                    </card_vue>  
              </article>
          </section>
          <section class="main-section">
              <h3>Favoritos</h3>
              <hr>
              <article class="main-article">
                    <card_vue v-for="(pokemon, index) in pokemones" :key="index" :nombre="pokemon.nombre" :peso="pokemon.peso" 
                        :altura="pokemon.altura" :hp="pokemon.hp" :velocidad="pokemon.velocidad" :ataque="pokemon.ataque" 
                        :ataque_especial="pokemon.ataque_especial" :defensa="pokemon.defensa" :defensa_especial="pokemon.defensa_especial"
                        :img="pokemon.img">
                    </card_vue>
              </article>
          </section>
    `
}

const pokemones_vue = {
    props: ['regiones', 'tipos', 'colores'],
    data() {
        return {
            regionSeleccionada: '0',
            tipoSeleccionada: '0',
            colorSeleccionada: '0',
            pokemones: [],  // Array para almacenar la información de los Pokémon
            itemsPorPagina: 16,  //cantidad de card_vue que se van a mostrar por pagina
            numPagina: 1,
        };
    },
    components: {
        'card_vue': card_vue,
    },
    computed: {
        paginatedList() {
            const startIndex = (this.numPagina - 1) * this.itemsPorPagina;
            const endIndex = startIndex + this.itemsPorPagina;
            return this.pokemones.slice(startIndex, endIndex);
        },
    },
    methods: {
        filtrarPorRegion() {
            // Accede al valor seleccionado
            console.log('Región seleccionada:', this.regionSeleccionada);
            this.pokemones = []; // Limpiar la lista antes de cargar nuevos datos

            const url = `https://pokeapi.co/api/v2/region/${this.regionSeleccionada.toLowerCase()}`;
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    console.log(datos);
                    // Busco por pokedex los pokemones de esa reguin
                    this.buscarPokemonPorPokedexes(datos.pokedexes[0].url);
                })
                .catch(error => {
                    console.error('Error de Busqueda de Region', error);
                });

        },

        filtrarPorTipo() {
            // Accede al valor seleccionado
            console.log('Tipo seleccionada:', this.tipoSeleccionada);
            this.pokemones = []; // Limpiar la lista antes de cargar nuevos datos

            const url = `https://pokeapi.co/api/v2/type/${this.tipoSeleccionada.toLowerCase()}`;
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    console.log(datos.pokemon); // Lista de Pokémon de ese tipo
                    datos.pokemon.forEach(element => {
                        // Llama a la función para buscar y agregar el Pokémon por nombre
                        this.buscarPokemonPorNombre(element.pokemon.name);
                    });
                })
                .catch(error => {
                    console.error('Error fetching Pokémon by type:', error);
                });
        },

        filtrarPorColor() {
            // Accede al valor seleccionado
            console.log('Color seleccionada:', this.colorSeleccionada);
            this.pokemones = []; // Limpiar la lista antes de cargar nuevos datos

            const url = `https://pokeapi.co/api/v2/pokemon-color/${this.colorSeleccionada.toLowerCase()}`;
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    console.log(datos.pokemon_species); // Lista de Pokémon de ese color
                    datos.pokemon_species.forEach(element => {
                        // Llama a la función para buscar y agregar el Pokémon por nombre
                        this.buscarPokemonPorNombre(element.name);
                    });
                })
                .catch(error => {
                    console.error('Error fetching Pokémon by color:', error);
                });
        },

        buscarPokemonPorPokedexes(pokedexDeRegion) {
            fetch(pokedexDeRegion)
                .then(response => response.json())
                .then(datos => {
                    console.log(datos);
                    //console.log(datos.pokemon_entries); // lista de pokemones
                    datos.pokemon_entries.forEach(element => {
                        //console.log(element.pokemon_species.name); // nombre del pokemon
                        this.buscarPokemonPorNombre(element.pokemon_species.name);
                    });
                })
                .catch(error => {
                    console.error('Error de Busqueda de Pokedex', error);
                });
        },

        buscarPokemonPorNombre(pokeName) {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokeName.toLowerCase()}`;
            fetch(url)
                .then(response => response.json())
                .then(datos => {
                    //console.log(datos);
                    // Extrae la información del Pokémon
                    const nombre = datos.name.charAt(0).toUpperCase() + datos.name.slice(1);
                    const peso = datos.weight + " Kg";
                    const altura = datos.height;
                    const hp = datos.stats[0].base_stat;
                    const ataque = datos.stats[1].base_stat;
                    const ataque_especial = datos.stats[3].base_stat;
                    const defensa = datos.stats[2].base_stat;
                    const defensa_especial = datos.stats[4].base_stat;
                    const velocidad = datos.stats[5].base_stat;
                    const img = datos.sprites.front_default;

                    // Agrega la información del Pokémon al array
                    this.pokemones.push({
                        nombre,
                        peso,
                        altura,
                        hp,
                        velocidad,
                        ataque,
                        ataque_especial,
                        defensa,
                        defensa_especial,
                        img
                    });
                    //console.log(this.pokemones)
                })
                .catch(error => {
                    console.error('Error fetching Pokémon details:', error);
                });
        },

        nextPage() {
            if ((this.numPagina + 1) * this.itemsPorPagina < this.pokemones.length) {
                this.numPagina++;
            }
        },

        prevPage() {
            if (this.numPagina > 1) {
                this.numPagina--;
            }
        },
        //agrega un método que emitirá un evento cuando se haga clic en la tarjeta y le paso el nombre. 
        seleccionarPokemon(nombre) {
            this.$emit('seleccionar-pokemon', nombre);
        }
    },

    template: //html
        `
        <nav id="filtros">
            <select name="region" v-model="regionSeleccionada" @change="filtrarPorRegion">
                <option value="0" selected>Por Región</option>
                <option v-for="region in regiones">{{ region }}</option>
            </select>
            <select name="tipo" v-model="tipoSeleccionada" @change="filtrarPorTipo">
                <option value="0" selected>Por Tipo</option>
                <option v-for="tipo in tipos">{{ tipo }}</option>
            </select>
            <select name="color" v-model="colorSeleccionada" @change="filtrarPorColor">
                <option value="0" selected>Por Color</option>
                <option v-for="color in colores">{{ color }}</option>
            </select>
        </nav>
        <section class="main-section">
            <card_vue v-for="(pokemon, index) in paginatedList" :key="index" :nombre="pokemon.nombre" :peso="pokemon.peso" 
                :altura="pokemon.altura" :hp="pokemon.hp" :velocidad="pokemon.velocidad" :ataque="pokemon.ataque" 
                :ataque_especial="pokemon.ataque_especial" :defensa="pokemon.defensa" :img="pokemon.img"
                :defensa_especial="pokemon.defensa_especial"
                @seleccionar-pokemon="seleccionarPokemon(pokemon.nombre)" >
            </card_vue>
            <div class="btn-paginacion">
                <button @click="prevPage" :disabled="numPagina === 1">Anterior</button>
                <h3 class="h3-paguinacion">Pagina {{ numPagina }}</h3>
                <button @click="nextPage" :disabled="numPagina * itemsPorPagina >= pokemones.length">Siguiente</button>
            </div>
        </section>
    `
}

const formulario_vue = {
    template: //html
        `
    <h3>Formulario de Envio</h3>
    <section class="section-from">
        <form action="" method="POST">
            <input id="nombre" type="text" name="name" placeholder="Nombre">
            <input id="email" type="text" name="email" placeholder="Correo electronico">
            <input id="asunto" type="text" name="asunto" placeholder="Asunto">
            <input id="mensaje" type="text" name="mensaje" placeholder="Mensaje">
            <section class="section-botones">
                <button id="btnEnviar">Enviar</button>
                <button>Cancelar</button>
                <button id="btnLimpiar">Limpiar Todo</button>
            </section>
            <input type="hidden" name="_next" value="http://127.0.0.1:5500/index.html">
            <input type="hidden" name="_captcha" value="false">
        </form>
    </section>
    <section id="section-alert">
    </section>
    `
}

const alertPokemon_vue = {
    template: //html
        `
    <section id="alert-pokemon">
        <img src="./Img/pikachu triste.gif" alt="">
        <h3>TEXTO</h3>
    </section>
    `
}




