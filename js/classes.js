export class Presupuesto {
    constructor(presupuesto, restante) {
        this.presupuesto = presupuesto;
        this.restante = restante;
        this.gastos = [];
    }

    setPresupuesto(presupuesto) {
        this.presupuesto = presupuesto;
    }
    // setRestante(restante) {
    //     this.restante = restante;
    // }


    calcularRestante() {
        this.restante = this.presupuesto - this.gastos.length;

    }
}

export class UI {
    mostrarPresupuesto(obj) {
        document.querySelector('#total').textContent = obj.presupuesto;
        document.querySelector('#restante').textContent = obj.restante;
    }
}