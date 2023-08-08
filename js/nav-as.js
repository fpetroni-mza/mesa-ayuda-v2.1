/* Estructuración del NavBar Lateral del Templates "mesa-ayuda.html" */

fetch('../json/areas-servicios/areasServicio.json')
    .then(response => response.json())
    .then(data => {
        const dataContainer = document.getElementById("nav-as");
        const ulElement = document.createElement('ul');
        ulElement.style.listStyle = "none";

        // Procesar y mostrar los datos en el contenedor

        data.forEach(item => {
            const liElement = document.createElement('li');
            const aElement = document.createElement('a');
            aElement.textContent = item.titulo;

            /* armado de href de los elementos <a> de cada <li> */
            const atributo = () => {
                const auxiliar = aElement.textContent;
                return "#as-" + auxiliar.replaceAll(" ", "-").toLowerCase()
                    .replaceAll("á", "a")
                    .replaceAll("é", "e")
                    .replaceAll("í", "i")
                    .replaceAll("ó", "o")
                    .replaceAll("ú", "u")
                    .replaceAll("ñ", "ni");
            }
            /* Asociación del "href" a los elementos */
            aElement.href = atributo();
            liElement.appendChild(aElement);
            ulElement.appendChild(liElement);
        });
        dataContainer.appendChild(ulElement);
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));