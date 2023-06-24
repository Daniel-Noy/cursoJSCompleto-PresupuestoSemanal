import { Presupuesto, UI } from "./classes.js";

const formulario = document.querySelector('#agregar-gasto');
const contenedorTareas = document.querySelector('#gastos ul');
const btnPresupuesto = document.querySelector('#btn-presupuesto');

const presupuesto = new Presupuesto();
const ui = new UI(presupuesto);

document.addEventListener('DOMContentLoaded', ()=> {
    ingresarPresupuesto();
    btnPresupuesto.addEventListener('click', ingresarPresupuesto);
    formulario.addEventListener('submit', agregarGasto);
})

function ingresarPresupuesto() {
    Swal.fire({
        confirmButtonColor: '#007bff',
        title: 'Bienvenido',
        input: 'number',
        inputLabel: 'Ingresa tu presupuesto',
        inputValidator: (value) => {
            const valor = parseFloat(value);
            if (isNaN(valor) || valor <= 0) {
            return 'Ingresa una cantidad valida'
            }
        }
    }).then( (result)=> {
        if(result.value) {
            presupuesto.setPresupuesto(result.value);
            presupuesto.setRestante();
        }
        ui.mostrarPresupuesto();
    })
}

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    //? Validacion de los inputs
    if( nombre === '' || cantidad === '') {
        ui.mostrarAlerta({
            mensaje: 'Debes llenar todos los inputs',
            tipo: 'error',
            contenedor: formulario})
        return;
    }
    
    if( isNaN( parseFloat(cantidad)) || cantidad <= 0 ) {
        ui.mostrarAlerta({
            mensaje: 'Debes ingresar una cantidad valida',
            tipo: 'error',
            contenedor: formulario})
        return;
    }

    const nuevoGasto = { id: Date.now(), nombre, cantidad };
    presupuesto.agregarGasto(nuevoGasto);

    //? Mostrar los cambios en la pantalla
    ui.mostrarListaGastos(contenedorTareas);
    ui.actualizarRestante();
    ui.mostrarAlerta({
        mensaje: 'Gasto añadido correctamente',
        tipo: 'correcto',
        contenedor: formulario
    })
    formulario.reset();
}

export function eliminarGasto(id) {
    presupuesto.eliminarGasto(id);
    ui.mostrarListaGastos(contenedorTareas);
    ui.actualizarRestante();
    ui.mostrarAlerta({
        mensaje:'Tarea eliminada',
        tipo: 'success',
        contenedor: contenedorTareas
    })
    console.log('eliminado');
}