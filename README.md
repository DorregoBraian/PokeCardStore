<div align="center">

<img src="./Img/Logo%20Poke%20Card.png" alt="PokeCardStore" width="180">

# PokeCardStore

**Tienda/demo de cartas Pokémon construida como proyecto frontend con HTML, CSS, JavaScript y PokeAPI.**

[![Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-ff2a38?style=flat-square)](https://dorregobraian.github.io/PokeCardStore/)
[![PokeAPI](https://img.shields.io/badge/API-PokeAPI-22d3ee?style=flat-square)](https://pokeapi.co/)
[![Año](https://img.shields.io/badge/Año-2023-a78bfa?style=flat-square)](#)

</div>

---

## Vista general

PokeCardStore es una aplicación web estática que simula una tienda de cartas Pokémon. Consume la [PokeAPI](https://pokeapi.co/) para armar un catálogo dinámico, permite filtrar Pokémon por región, tipo y color, ver el detalle de cada uno y guardar hasta cinco favoritos.

El proyecto fue pensado como práctica de frontend: manipulación del DOM, consumo de APIs REST, paginación, filtros, persistencia en `localStorage`, componentes visuales con Bootstrap y una navegación tipo SPA sin framework obligatorio.

> **Demo:** <https://dorregobraian.github.io/PokeCardStore/>

---

## Funcionalidades

### Inicio
- Carrusel de imágenes con Bootstrap 5.
- Sección **Los más populares** con cinco Pokémon aleatorios obtenidos de la API.
- Sección **Favoritos** con los Pokémon guardados por el usuario.

### Catálogo de Pokémon
- Obtención de Pokémon desde PokeAPI.
- Filtros por:
  - Región.
  - Tipo.
  - Color.
- Paginación con botones **Anterior** y **Siguiente**.
- Tarjetas con imagen, nombre, HP, peso, altura, ataque, defensa, velocidad, ataque especial y defensa especial.
- Vista de detalle al seleccionar una tarjeta.

### Detalle del Pokémon
- Nombre, tipo, región, habilidad, objeto que puede llevar, juegos y películas.
- Botones de **Comprar ahora** y **Añadir al carrito** (parte visual del prototipo).
- Botón para agregar o quitar de favoritos.
- Botón para compartir.

### Favoritos
- Lista persistida en `localStorage`.
- Límite de cinco Pokémon: al agregar uno nuevo se descarta el más antiguo.
- Renderizado dinámico en la página de inicio.

### Formulario de contacto
- Campos de nombre, correo, asunto y mensaje.
- Validación del correo con expresión regular.
- Envío mediante [FormSubmit](https://formsubmit.co/).
- Alerta visual personalizada con imagen de Pikachu cuando el correo no es válido.
- Botones para enviar, cancelar y limpiar.

### Navegación
- Header con logo, título y enlaces a Inicio, Pokemones y Formulario.
- Cambio de vistas sin recargar la página mediante jQuery.
- Footer con enlaces de cuenta, compras, categorías y redes sociales.

---

## Tecnologías

| Tecnología | Uso en el proyecto |
| --- | --- |
| **HTML5** | Estructura de las vistas y plantillas generadas desde JavaScript. |
| **CSS3** | Estilos, variables de color, tarjetas, formularios y animaciones. |
| **JavaScript ES6+** | Lógica del catálogo, filtros, paginación, favoritos y eventos. |
| **jQuery 3.6.1** | Manipulación del DOM, eventos y peticiones AJAX. |
| **Bootstrap 5.3.1** | Carrusel de inicio y componentes base. |
| **PokeAPI v2** | Regiones, tipos, colores, Pokémon y datos de detalle. |
| **localStorage** | Persistencia de favoritos en el navegador. |
| **FormSubmit** | Envío del formulario de contacto sin backend propio. |
| **Google Cloud Translation API** | Integración preparada para traducir textos; queda pendiente configurar la clave. |
| **Vue 3 + Vuex 4** | Implementación alternativa incluida en el repositorio, no activa en `index.html`. |

### Versión con Vue

El repositorio conserva una segunda aproximación del frontend con Vue 3, Vuex y componentes declarativos (`Js/vue.js`, `Js/components_vue.js`). La versión que se ejecuta actualmente es la basada en jQuery; los scripts de Vue están comentados en `index.html`.

---

## Estructura del proyecto

```text
PokeCardStore/
├── css/
│   ├── formulario.css
│   ├── header-y-footer.css
│   ├── index.css
│   ├── pokemon.css
│   └── pokemones.css
├── Img/
│   ├── carrusel 1.webp
│   ├── carrusel 3.jpg
│   ├── carrusel 4.jpg
│   ├── carrusel 5.jpg
│   ├── carrusel 6.png
│   ├── Logo Poke Card.png
│   └── ... íconos y recursos
├── Js/
│   ├── components.js
│   ├── components_vue.js
│   ├── script.js
│   └── vue.js
├── servicios/
│   ├── Pokemon Hollow.ttf
│   └── Pokemon Solid.ttf
├── index.html
└── README.md
```

### Archivos principales

- `index.html`: estructura general, CDN de Bootstrap, jQuery y punto de entrada.
- `Js/script.js`: lógica principal de la aplicación.
- `Js/components.js`: plantillas HTML generadas desde JavaScript para las tarjetas, el detalle y el formulario.
- `Js/vue.js` y `Js/components_vue.js`: versión alternativa con Vue.

---

## Cómo ejecutarlo

El proyecto no requiere compilación ni instalación de dependencias: todo se carga desde CDN.

### Opción 1: servidor local con Python

Desde la raíz del repositorio:

```bash
python -m http.server 5500
```

Luego abrir:

```text
http://127.0.0.1:5500/
```

### Opción 2: Live Server de VS Code

1. Abrir la carpeta del proyecto en VS Code.
2. Instalar la extensión **Live Server**.
3. Hacer clic derecho sobre `index.html` y elegir **Open with Live Server**.
4. Verificar que el puerto sea `5500`, porque el formulario tiene configurado ese puerto en el campo oculto `_next`.

> **Importante:** abrir `index.html` directamente con `file://` puede bloquear los módulos de JavaScript y las peticiones a la API. Conviene usar un servidor local.

---

## Consumo de PokeAPI

La aplicación usa los siguientes recursos:

```text
GET https://pokeapi.co/api/v2/region
GET https://pokeapi.co/api/v2/type
GET https://pokeapi.co/api/v2/pokemon-color
GET https://pokeapi.co/api/v2/region/{region}
GET https://pokeapi.co/api/v2/type/{tipo}
GET https://pokeapi.co/api/v2/pokemon-color/{color}
GET https://pokeapi.co/api/v2/pokemon/{id-o-nombre}
```

Los datos se transforman en tarjetas y en la vista de detalle. La paginación se calcula en el cliente sobre los resultados que devuelve cada filtro.

---

## Datos y persistencia

- Los favoritos se guardan en `localStorage` bajo la clave `favoritos`.
- Se permiten hasta cinco elementos.
- No hay backend, autenticación ni base de datos.
- Los botones de compra y carrito son parte de la simulación visual; no procesan pagos.
- El formulario se apoya en FormSubmit y no almacena mensajes en el proyecto.

---

## Limitaciones y próximos pasos

Este repositorio es una demo frontend y conserva algunas decisiones de la versión inicial:

- El carrito y la compra no están implementados; los botones son visuales.
- El formulario configura FormSubmit con el correo ingresado por el usuario. Para producción conviene fijar un destinatario propio y actualizar el campo `_next`.
- La versión actual limpia `localStorage` al iniciar, por lo que los favoritos no persisten entre recargas. Se puede quitar esa limpieza para conservarlos.
- La integración con Google Cloud Translation API está preparada, pero necesita una clave válida y manejo de errores.
- La versión con Vue no está activa.
- No hay pruebas automatizadas ni pipeline de CI/CD.

Posibles mejoras:

- Implementar un carrito real con estado persistente.
- Añadir autenticación y backend para pedidos.
- Completar la traducción automática de descripciones.
- Incorporar pruebas y un linting común.
- Mejorar la accesibilidad y el diseño responsive.

---

## Créditos

- Datos e imágenes de Pokémon: [PokeAPI](https://pokeapi.co/).
- Carrusel y componentes: [Bootstrap](https://getbootstrap.com/).
- Manipulación del DOM: [jQuery](https://jquery.com/).
- Formulario: [FormSubmit](https://formsubmit.co/).
- Pokémon y sus marcas pertenecen a Nintendo, Game Freak y Creatures Inc.

---

## Autor

**Braian Dorrego**

- GitHub: [@DorregoBraian](https://github.com/DorregoBraian)
- Repositorio: [PokeCardStore](https://github.com/DorregoBraian/PokeCardStore)

Proyecto personal con fines educativos y de portafolio.
