export class Presupuesto {
    constructor(presupuesto, restante) {
        this.presupuesto = presupuesto ?? 0;
        this.restante = restante ?? 0;
        this.gastos = [];
    }

    setPresupuesto(presupuesto) {
        this.presupuesto = presupuesto;
    }

    calcularRestante() {
        this.restante = this.presupuesto - this.gastos.length;
    }

    setRestante() {
        this.gastos.forEach(gasto => {
            this.restante -= parseFloat(gasto.cantidad);
        })
    }

    eliminarGasto(id) {

    }
}

export class UI {
    mostrarPresupuesto(obj) {
        document.querySelector('#total').textContent = obj.presupuesto;
        document.querySelector('#restante').textContent = obj.restante;
    }

    mostrarListaGastos(gastos, contenedor) {
        this.limpiarHTML(contenedor);
        gastos.forEach(gasto => {
            const divGasto = document.createElement('DIV');
            divGasto.classList.add('gasto');

            const tituloGasto = document.createElement('P');
            tituloGasto.textContent = gasto.nombre;

            const precioGasto = document.createElement('P');
            precioGasto.textContent = `$${gasto.cantidad}`;

            const borrarGasto = document.createElement('A');
            borrarGasto.classList.add('btn','btn-danger');
            borrarGasto.setAttribute('data-id', gasto.id);
            borrarGasto.setAttribute('href', '');
            borrarGasto.textContent = 'Borrar x';

            divGasto.append(tituloGasto, precioGasto, borrarGasto);
            contenedor.appendChild(divGasto);
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