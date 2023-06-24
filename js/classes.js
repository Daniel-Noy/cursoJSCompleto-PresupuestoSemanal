import { eliminarGasto } from "./app.js";

export class Presupuesto {
    constructor(presupuesto, restante) {
        this.presupuesto = presupuesto ?? 0;
        this.restante = restante ?? 0;
        this.gastos = [];
    }

    setPresupuesto(presupuesto) {
        this.presupuesto = presupuesto;
    }

    setRestante() {
        const gastado = this.gastos.reduce((total, gasto) => total + parseFloat(gasto.cantidad), 0);
        this.restante = this.presupuesto - gastado;
    }

    agregarGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.setRestante();
    }

    eliminarGasto(id) {
        const nuevosGastos = this.gastos.filter((gasto)=> gasto.id !== id);
        this.gastos = nuevosGastos;
        this.setRestante();
    }
}

export class UI {
    constructor(presupuesto) {
        this.presupuesto = presupuesto;
    }

    mostrarPresupuesto() {
        const {presupuesto} = this.presupuesto
        document.querySelector('#total').textContent = presupuesto;
        this.actualizarRestante();
        this.comprobarPresupuesto();
    }
    actualizarRestante() {
        const {restante} = this.presupuesto
        document.querySelector('#restante').textContent = restante;
        this.comprobarPresupuesto();
    }

    comprobarPresupuesto() {
        const {presupuesto, restante} = this.presupuesto;
        const divRestante = document.querySelector('.restante');

        if( (presupuesto / 4) >= restante) { //? 75%
            divRestante.classList.add('alert-danger');
            divRestante.classList.remove('alert-success', 'alert-warning');
        } 
        else if( (presupuesto / 2) >= restante) { //? 50%
            divRestante.classList.add('alert-warning'); 
            divRestante.classList.remove('alert-success', 'alert-danger');
        }
        else { //? +50%
            divRestante.classList.add('alert-success');
            divRestante.classList.remove('alert-danger', 'alert-warning');
        }
        
        const boton = document.querySelector('button[type="submit"]');
        if ( restante <= 0 ) {
            boton.setAttribute('disabled', '');
        } else boton.removeAttribute('disabled');
    }

    mostrarListaGastos(contenedor) {
        const {gastos} = this.presupuesto;

        this.limpiarHTML(contenedor);

        gastos.forEach(gasto => {
            const {id, nombre, cantidad} = gasto;

            const nuevoGasto = document.createElement('LI');
            nuevoGasto.classList.add('gasto');

            const tituloGasto = document.createElement('SPAN');
            tituloGasto.textContent = nombre;

            const precioGasto = document.createElement('SPAN');
            precioGasto.textContent = `$${cantidad}`;

            const borrarGasto = document.createElement('BUTTON');
            borrarGasto.classList.add('btn','btn-danger');
            borrarGasto.textContent = 'Borrar x';
            borrarGasto.addEventListener('click', (e)=> {
                eliminarGasto(id);
            });

            nuevoGasto.append(tituloGasto, precioGasto, borrarGasto);
            contenedor.appendChild(nuevoGasto);
        })
    }

    mostrarAlerta({
        mensaje = '',
        tipo = 'error',
        contenedor
    }) {
        const errorAnterior = contenedor.querySelector('.alert');
        if( errorAnterior ) errorAnterior.remove();
    
        const divMensaje = document.createElement('DIV');
        divMensaje.textContent = mensaje;
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }
        
        contenedor.appendChild(divMensaje)
    
        setTimeout(()=> {
            divMensaje.remove()
        }, 3000)
    }

    limpiarHTML(node) {
        while(node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

}