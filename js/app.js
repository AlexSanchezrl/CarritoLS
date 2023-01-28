//Variables

const carrito =  document.querySelector('#carrito');
const listarCursos = document.querySelector('#lista-cursos');
const contenedorTable = document.querySelector('#lista-carrito tbody');
const btnVaciar = document.querySelector('#vaciar-carrito');
let carritoCompra = [];

cargarEventListener()

function cargarEventListener(){

    //Cuando agregas un curso presionando "Agregar al Carrito"
    listarCursos.addEventListener('click', agregarCurso);


    //Eliminar cursos del carrito
    carrito.addEventListener('click', deleteCursos);

    //Vaciar el carrito

    btnVaciar.addEventListener('click', ()=>{
        carritoCompra= []; //Eliminamos los datos del arreglo que tiene los cursos

        eliminarCursos();
    })

        document.addEventListener('DOMContentLoaded', ()=>{

            carritoCompra = JSON.parse(localStorage.getItem('carritoCompra')) || [];
    
            carritoHTML();
        });
  


}

function agregarCurso(e){

    if(e.target.classList.contains('agregar-carrito')){

        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCursos(cursoSeleccionado);

    
    }
    
}
//Elimina el curso del carrito

function deleteCursos(e){

  if(e.target.classList.contains('borrar-curso')){

    const cursoId = e.target.getAttribute('data-id');
    //Eliminar del arreglo de cursos de carritoCompra por el data-id
    carritoCompra = carritoCompra.filter(curso => curso.id !== cursoId);

    carritoHTML();

    console.log(carritoCompra);
  }
    

};

//Lee el contenido del html al que le dimos click y extrae la informacion del curso

function leerDatosCursos(cursoSeleccionado){

    //console.log(cursoSeleccionado);

    //Crear objeto con la info del curso actual


    const infoCurso = {

        imagen: cursoSeleccionado.querySelector('img').src,
        titulo: cursoSeleccionado.querySelector('h4').textContent,
        precio: cursoSeleccionado.querySelector('.precio span').textContent,
        id: cursoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1


    }

    const existe = carritoCompra.some(curso => curso.id === infoCurso.id);

    if(existe){

        const cursosRepetidos = carritoCompra.map(curso=>{
            if(curso.id === infoCurso.id){

                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }
            else{
                return curso; //retorna los objetos que no son duplicados
            }
        })

        carritoCompra = [...cursosRepetidos];

    }

    else{

        carritoCompra = [...carritoCompra, infoCurso];

    }

 

    //Agregar los elementos del carrito


    console.log(carritoCompra);

    carritoHTML();

}

//Muestra el carrito de compra en el html

function carritoHTML(){

    //Limpiar el html

    eliminarCursos();

    //reccorre el carrito y lo agrega al html

    carritoCompra.forEach((cursos)=>{

        const{imagen, titulo, precio, cantidad, id} = cursos;

        const row = document.createElement('tr');

        row.innerHTML = `

        <td>
            <img src="${imagen}" width="100">
        </td>

        <td>
            ${titulo}
        </td>

        <td>
             ${precio}
        </td>

        <td>
            ${cantidad}
        </td>

        <td>
            <a  href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        
        `;

        //Agrega el html del carrito del tbody

        contenedorTable.appendChild(row);

    }
    )

    syncLs();

}

function syncLs(){
   
    localStorage.setItem('carritoCompra', JSON.stringify(carritoCompra));
}

//Elimina los cursos del tbody

function eliminarCursos(){

    //forma lenta
   // contenedorTable.innerHTML = '';

    //Forma rapida

    while(contenedorTable.firstChild){

        contenedorTable.removeChild(contenedorTable.firstChild);
    }
}

