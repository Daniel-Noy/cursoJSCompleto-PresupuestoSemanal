import { Presupuesto, UI } from "./classes.js";

const formulario = document.querySelector('#agregar-gasto');
const contenedorTareas = document.querySelector('#gastos ul');
const presupuesto = new Presupuesto();
const ui = new UI;

document.addEventListener('DOMContentLoaded', ()=> {
    ingresarPresupuesto();
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
            presupuesto.calcularRestante()
        }
        ui.mostrarPresupuesto(presupuesto);
    })
}

function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector('#gasto').value;
    const cantidad = document.querySelector('#cantidad').value;

    if( nombre === '' || cantidad === '') {
        ui.mostrarAlerta({
            mensaje: 'Debes llenar todos los inputs',
            tipo: 'error',
            contenedor: formulario})
        return;
    }
    
    if(isNaN(parseFloat(cantidad))) {
        ui.mostrarAlerta({
            mensaje: 'Debes ingresar una cantidad valida',
            tipo: 'error',
            contenedor: formulario})
        return;
    }

    const nuevoGasto = {
        id: Date.now(),
        nombre,
        cantidad
    }

    presupuesto.gastos = [...presupuesto.gastos, nuevoGasto];
    presupuesto.setRestante();
    ui.mostrarPresupuesto(presupuesto);
    ui.mostrarListaGastos(presupuesto.gastos, contenedorTareas);
    ui.mostrarAlerta({
        mensaje: 'Gasto añadido correctamente',
        tipo: 'correcto',
        contenedor: formulario
    })
    formulario.reset();
}