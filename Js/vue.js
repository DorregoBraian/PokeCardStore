const { createApp } = Vue;
createApp({
    //Defino mis Componentes 
    components: {
        'inicio': inicio_vue,
        'pokemones': pokemones_vue,
        'formulario': formulario_vue,
        'pokemon_data_vue': pokemon_data_vue
    },

    // Defino los datos que voy a utilizar
    data() {
        return {
            // Datos del show que recive datos booleano
            inicio_visible: false,
            pokemones_visible: false,
            formulario_visible: false,
            pokemon_data_visible: false,
            pokemonSeleccionado: '',

            regiones: [], // Aquí almacenaremos las regiones y se lo envio al componente pokemon como propiedad
            tipos: [], // Aquí almacenaremos los tipos de pokemones y se lo envio al componente pokemon como propiedad
            colores: [], // Aquí almacenaremos los colores del pokemones y se lo envio al componente pokemon como propiedad
        }
    },

    mounted() {
        // Al cargar todo el DOM se inicialisa con el componente inicio
        this.inicio_visible = true;
        this.filtroRegiones();
        this.filtroTipos();
        this.filtroColor();
    },

    //defino los metodos que voy a utilizar
    methods: {
        cambiarComponente(componente) {
            // Lógica para determinar qué componente mostrar
            this.inicio_visible = false;
            this.pokemones_visible = false;
            this.formulario_visible = false;
            this.pokemon_data_visible = false;
            //console.clear();
            console.log(componente);
            switch (componente) {
                case 'inicio':
                    this.inicio_visible = true;
                    break;
                case 'pokemones':
                    this.pokemones_visible = true;
                    break;
                case 'formulario':
                    this.formulario_visible = true;
                    break;
                default:
                    this.pokemon_data_visible = true;
                    this.pokemonSeleccionado = componente;
                    //console.error('Componente no reconocido:', componente);
            }
        },

        filtroRegiones() {
            const url = 'https://pokeapi.co/api/v2/region/';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Mapeamos los nombres de las regiones y los capitalizamos
                    this.regiones = data.results.map(region => region.name.charAt(0).toUpperCase() + region.name.slice(1));
                    //console.log(this.regiones); // Agrega esta línea
                })
                .catch(error => {
                    console.error('Error fetching regions:', error);
                });
        },

        filtroTipos() {
            const url = 'https://pokeapi.co/api/v2/type';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Mapeamos los nombres de los tipos de pokemones que hay
                    this.tipos = data.results.map(region => region.name.charAt(0).toUpperCase() + region.name.slice(1));
                    //console.log(this.tipos); // Agrega esta línea
                })
                .catch(error => {
                    console.error('Error fetching regions:', error);
                });

        },

        filtroColor() {
            const url = 'https://pokeapi.co/api/v2/pokemon-color';
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Mapeamos los nombres de las colores de pokemones que hay
                    this.colores = data.results.map(region => region.name.charAt(0).toUpperCase() + region.name.slice(1));
                    //console.log(this.colores); // Agrega esta línea
                })
                .catch(error => {
                    console.error('Error fetching regions:', error);
                });
        },

    }

}).mount('#app')
