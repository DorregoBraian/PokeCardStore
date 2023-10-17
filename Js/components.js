export const Card = (nombre, peso, altura, hp, velocidad, ataque, ataqueEspecial, defensa, defensaEspecial, img) => { //html
    return `
    <a href="" id="card-pokemon" data-pokemon="${nombre}">
    <div class="card">
        <img src="${img}" alt="">
        <h4>${nombre}</h4>
        <div class="data-pokemon">
            <table>
                <tr>
                    <th>HP</th>
                    <td>${hp}</td>
                </tr>
                <tr>
                    <th>Peso</th>
                    <td>${peso}</td>
                </tr>
                <tr>
                    <th>Ataque</th>
                    <td>${ataque}</td>
                </tr>
                <tr>
                    <th>Defensa</th>
                    <td>${defensa}</td>
                </tr>
            </table>
            <table>
                <tr>
                    <th>Velocidad</th>
                    <td>${velocidad}</td>
                </tr>
                <tr>
                    <th>Altura</th>
                    <td>${altura}</td>
                </tr>

                <tr>
                    <th>Ataque Especial </th>
                    <td>${ataqueEspecial}</td>
                </tr>
                <tr>
                    <th>Defensa Especial</th>
                    <td>${defensaEspecial}</td>
                </tr>
            </table>
        </div>
    </div>
</a>
    `
}

export const Pokemones = () => { //html
    return ` 
        <nav id="filtros">
            <select name="region" id="region">
                <option value="0" selected>Por Reguion</option>
            </select>
            <select name="tipo" id="tipo">
                <option value="0" selected>Por Tipo</option>
            </select>
            <select name="color" id="color">
                <option value="0" selected>Por Color</option>
            </select>
        </nav>
        <section class="pokemones-section">
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </section>
        <div class="btn-paginacion">
            <button id="prevPage">Anterior</button>
            <h3 class="h3-paguinacion"></h3>
            <button id="nextPage">Siguiente</button>
        </div>
    `
}

export const Inicio = () => { //html
    return `
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="./Img/carrusel 1.webp" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./Img/carrusel 3.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./Img/carrusel 4.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./Img/carrusel 5.jpg" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="./Img/carrusel 6.png" class="d-block w-100" alt="...">
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
                
            </article>
        </section>
        <section class="main-section">
            <h3>Favoritos</h3>
            <hr>
            <article class="main-article2">
                
            </article>
        </section>
    `
}

export const Pokemon = (nombre, tipo, region, habilidad, item, game, pelicula) => { //html
    return `
    <h2 id="name-pokemon">${nombre}</h2>
    <section>
        <div id="div-card">
            
        </div>
        <div class="div-botones">
            <button>Comprar Ahora</button>
            <button>Añadir al Carrito</button>
            <div class="div-botones2">
                <div id="div-favorito" >
                    <img id="corazon" src="./Img/corazon-off.png" alt="corazon">
                    <a id="favorito" href="#" rel="noopener noreferrer">Agregar a Favoritos</a>
                </div>
                <div id="div-compartir">
                    <img src="./Img/compartir.png" alt="compartir">
                    <a href="" rel="noopener noreferrer">Compartir</a>
                </div>
            </div>
        </div>
    </section>
    <hr>
    <section>
        <div id="div-descripcion">
            <h2>Descripcion</h2>
            <p>El pokemon ${nombre} es un pokemon de tipo ${tipo} y se encuentra en la region de ${region}. Las habilidades que puede llegar a tener son ${habilidad}. Al capturarlo puede llevar con sigo ${item}.</p> 
            <p>El pokemon ${nombre} aparece en juegos como ${game}.</p>
            <p>Tanbien ${nombre} aparece en peliculas como ${pelicula}</p>
        </div>
    </section>
    `
}

export const Formulario = (email) => { //html
    return `
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

export const AlertPokemon = (texto) => { //html
    return `
    <section id="alert-pokemon">
        <img src="./Img/pikachu triste.gif" alt="">
        <h3>${texto}</h3>
    </section>
    `
}

export const Carrito = () => { //html
    return `
    
    `
}




