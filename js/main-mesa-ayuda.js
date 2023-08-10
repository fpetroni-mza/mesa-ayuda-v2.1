/* Estructuración de Main del Templates "mesa-ayuda.html" */
document.addEventListener("DOMContentLoaded", function () {

    fetch('../json/areas-servicios/areasServicio.json')
        .then(response => response.json())
        .then(data => {
            const dataContainer = document.getElementById("main-mesa-ayuda");

            // Procesar y mostrar los datos en el contenedor
            data.forEach(item => {
                const sectionAS = document.createElement('section');
                /* armado idName de los elementos <section> */
                const atributo = () => {
                    const auxiliar = item.titulo;
                    return "as-" + auxiliar.replaceAll(" ", "-").toLowerCase()
                        .replaceAll("á", "a")
                        .replaceAll("é", "e")
                        .replaceAll("í", "i")
                        .replaceAll("ó", "o")
                        .replaceAll("ú", "u")
                        .replaceAll("ñ", "ni");
                };
                sectionAS.id = atributo();

                const h2AS = document.createElement('h2');
                h2AS.innerHTML = item.titulo;
                sectionAS.appendChild(h2AS);

                /* Insertar el contenido en la sección */
                for (let parrafo of item.contenido) {
                    const parr = document.createElement('p');
                    parr.innerHTML = parrafo;
                    sectionAS.appendChild(parr);
                };

                const articleAS = document.createElement('article');
                const ulDatosAS = document.createElement('ul');

                const liEncargadoAS = document.createElement('li');
                const liEstructuraMunicipalAS = document.createElement('li');
                const liContactoAS = document.createElement('li');

                liEncargadoAS.innerHTML = "<b>Encargado:</b> " + item.datos.encargado;
                liEstructuraMunicipalAS.innerHTML = "<b>Estructura Municipal:</b> " + item.datos['estructura-municipal'];
                liContactoAS.innerHTML = "<b>Contacto:</b> " + item.datos.contacto;

                ulDatosAS.appendChild(liEncargadoAS);
                ulDatosAS.appendChild(liEstructuraMunicipalAS);
                ulDatosAS.appendChild(liContactoAS);

                articleAS.appendChild(ulDatosAS);
                sectionAS.appendChild(articleAS);

                sectionAS.appendChild(tiposIncidentes(item["tipos-incidentes"]));

                dataContainer.appendChild(sectionAS);
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
})

const tiposIncidentes = function(item) {

    const articleTI = document.createElement('article');
    articleTI.classList = "article-incidente";
    const h2TI = document.createElement('h2');
    h2TI.textContent = "Listado de Incidentes";
    articleTI.appendChild(h2TI);

    // Procesar y mostrar los datos en el contenedor
    for (let ti of item) {
        const divTI = document.createElement('div');
        divTI.classList = "container-incidente";

        const h3TI = document.createElement('h3');
        h3TI.textContent = ti.tema;

        const pTI = document.createElement('p');
        pTI.innerHTML = ti.descripcion;

        divTI.appendChild(h3TI);
        divTI.appendChild(pTI);
        articleTI.appendChild(divTI);
    }
    return articleTI;
};