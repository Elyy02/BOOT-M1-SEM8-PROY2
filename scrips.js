mostrartabla();
let fecha = document.getElementById("fecha");
let tema = document.getElementById("tema");
let link = document.getElementById("link");
let agregarbtn = document.getElementById("agregarbtn");

agregarbtn.addEventListener("click", function() {
    fechaval = fecha.value;
    temaval = tema.value;
    linkval = link.value;
    if (fechaval.trim() != 0 && temaval.trim() != 0 && linkval.trim() != 0) {
        let webtask = localStorage.getItem("localtask");
        if (webtask == null) {
            arreglo = [];
        } else {
            arreglo = JSON.parse(webtask);
        }
        arreglo.push({ 'task_nombre': fechaval, 'task_tema': temaval, 'task_link': linkval, 'statuscompleto': false });

        localStorage.setItem("localtask", JSON.stringify(arreglo));
        fecha.value = '';
        tema.value = '';
        link.value = '';

    }

    mostrartabla();
})

// mostrartabla
function mostrartabla() {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
        arreglo = [];
    } else {
        arreglo = JSON.parse(webtask);
    }
    let html = '';
    let tabla = document.getElementById("tabla");
    arreglo.forEach((item, index) => {

        if (item.statuscompleto == true) {
            taskCompleteValue = `<td class="completado">${item.task_nombre}</td>`;
            taskCompleteValue1 = `<td class="completado">${item.task_tema}</td>`;
            taskCompleteValue2 = `<td class="completado">${item.task_link}</td>`;
        } else {
            taskCompleteValue = `<td>${item.task_nombre}</td>`;
            taskCompleteValue1 = `<td>${item.task_tema}</td>`;
            taskCompleteValue2 = `<td>${item.task_link}</td>`;
        }
        html += `<tr>
                    <th scope="fila">${index+1}</th>
                    ${taskCompleteValue} 
                   
                    ${taskCompleteValue1}
                    ${taskCompleteValue2} 
                    <td><button type="button" onclick="editar(${index})" class="text-primary"><i class="fa fa-edit"></i>Editar</button></td>
                    <td><button type="button" onclick="borrar(${index})" class="text-danger"><i class="fa fa-trash"></i>Borrar</button></td>
                </tr>`;
    });
    tabla.innerHTML = html;
}
// editar
function editar(index) {
    let guardarindex = document.getElementById("guardarindex");
    let agregarbtn = document.getElementById("agregarbtn");
    let guardarbtn = document.getElementById("guardarbtn");
    guardarindex.value = index;
    let webtask = localStorage.getItem("localtask");
    let arreglo = JSON.parse(webtask);

    fecha.value = arreglo[index]['task_nombre'];
    tema.value = arreglo[index]['task_tema'];
    link.value = arreglo[index]['task_link'];
    // agregarbtn.style.display = "none";
    guardarbtn.style.display = "block";
}