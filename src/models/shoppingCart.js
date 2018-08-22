module.exports = function Car(oldCar) {
    this.productos = oldCar.productos || {};
    this.CantidadTotal = oldCar.CantidadTotal || 0;
    this.TotalAPagar = oldCar.TotalAPagar || 0;


    this.agregar = function (producto, id) {
        var productoReservado = this.productos[id];
        if (!productoReservado) {
            productoReservado = this.productos[id] = { producto: producto, cantidad: 0, subtotal: 0 };
        }
        productoReservado.cantidad++;
        productoReservado.subtotal = productoReservado.producto.unitPrice * productoReservado.cantidad;
        this.CantidadTotal++;
        this.TotalAPagar += productoReservado.producto.unitPrice;
    }

    this.eliminarUno = function (id) {
        this.productos[id].cantidad--;
        console.log(this.productos[id].subtotal);
        this.productos[id].subtotal-=this.productos[id].producto.unitPrice;
        console.log(this.productos[id].subtotal);
        this.CantidadTotal--;
        this.TotalAPagar -= this.productos[id].producto.unitPrice;
        if (this.productos[id].cantidad <= 0) {
            delete this.productos[id];
        }
    }

    this.eliminarProducto = function (id) {
        this.CantidadTotal -= this.productos[id].cantidad;
        this.TotalAPagar -= this.productos[id].subtotal;
        delete this.productos[id];

    }

    this.buscarCantidad=function(id){
         return this.productos[id].cantidad;
    }

    this.arregloProductos = function () {
        var arr = [];
        for (var id in this.productos) {
            arr.push(this.productos[id]);
        }
        return arr;
    }
}