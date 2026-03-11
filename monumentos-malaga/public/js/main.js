let map;
let markersLayer;
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

function esFavorito(id) {
  return favoritos.includes(id);
}

function guardarFavoritos() {
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

document.addEventListener('DOMContentLoaded', async () => {

  // mapa
  map = L.map('map').setView([36.7213, -4.4214], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  markersLayer = L.layerGroup().addTo(map);

  // cargar datos
  const res = await fetch('/data/monumentos.geojson');
  const data = await res.json();

  const lista = document.getElementById('lista-pois');

  data.features.forEach((feat) => {

    const props = feat.properties;

    const id = props.ID;
    const nombre = props.NOMBRE;
    const desc = props.DESCRIPCION || '';
    const dir = props.DIRECCION || '';

    const coords = feat.geometry.coordinates;

    const lat = coords[1];
    const lon = coords[0];

    // marcador
    const marker = L.marker([lat, lon]).addTo(markersLayer);

    marker.on('click', () => {
      centrarYMostrar(id, nombre, desc, dir, [lat, lon]);
    });

    // item lista
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-start';
    li.dataset.id = id;

    if (esFavorito(id)) {
      li.classList.add('fav');
    }

    const contenido = document.createElement('div');
    contenido.className = 'ms-2 me-auto';

    const titulo = document.createElement('div');
    titulo.className = 'fw-bold';
    titulo.textContent = nombre;

    const direccion = document.createElement('small');
    direccion.textContent = dir;

    contenido.appendChild(titulo);
    contenido.appendChild(direccion);

    // botón favorito ❤️
    const btnFav = document.createElement('button');
    btnFav.type = 'button';
    btnFav.className = 'btn btn-sm border-0 ms-2';
    if (!LOGGED_IN) {
      btnFav.style.display = "none";
    }

    btnFav.innerHTML = esFavorito(id)
      ? '<i class="bi bi-heart-fill text-danger"></i>'
      : '<i class="bi bi-heart text-secondary"></i>';

    btnFav.addEventListener('click', (e) => {

      e.stopPropagation();

      if (!LOGGED_IN) {
        Swal.fire('Debes iniciar sesión para usar favoritos');
        return;
      }

      if (esFavorito(id)) {

        favoritos = favoritos.filter(f => f !== id);
        li.classList.remove('fav');

        btnFav.innerHTML = '<i class="bi bi-heart text-secondary"></i>';

      } else {

        favoritos.push(id);
        li.classList.add('fav');

        btnFav.innerHTML = '<i class="bi bi-heart-fill text-danger"></i>';

      }

      guardarFavoritos();
    });

    li.addEventListener('click', () => {
      centrarYMostrar(id, nombre, desc, dir, [lat, lon]);
    });

    li.appendChild(contenido);
    li.appendChild(btnFav);

    lista.appendChild(li);

  });

});

function centrarYMostrar(id, nombre, desc, dir, latlng) {

  map.setView(latlng, 17);

  Swal.fire({
    icon: 'info',
    title: nombre,
    html: `
      <p><strong>Dirección:</strong> ${dir}</p>
      <p style="text-align: justify;">${desc}</p>
    `,
    width: '35rem'
  });

}