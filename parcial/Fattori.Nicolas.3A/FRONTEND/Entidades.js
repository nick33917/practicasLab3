var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var Producto = /** @class */ (function () {
        function Producto(codigo1, marca1, precio1) {
            this.codigo = codigo1;
            this.marca = marca1;
            this.precio = precio1;
        }
        Producto.prototype.ToString = function () {
            return JSON.stringify({ codigo: this.codigo, marca: this.marca, precio: this.precio });
        };
        return Producto;
    }());
    Entidades.Producto = Producto;
    var Televisor = /** @class */ (function (_super) {
        __extends(Televisor, _super);
        function Televisor(codigo1, marca1, precio1, tipo1, paisOrigen1, path1) {
            var _this = _super.call(this, codigo1, marca1, precio1) || this;
            _this.tipo = tipo1;
            _this.paisOrigen = paisOrigen1;
            _this.pathFoto = path1;
            return _this;
        }
        Televisor.prototype.ToJson = function () {
            var obj = JSON.parse(_super.prototype.ToString.call(this));
            obj.tipo = this.tipo;
            obj.paisOrigen = this.paisOrigen;
            obj.pathFoto = this.pathFoto;
            return obj;
        };
        return Televisor;
    }(Producto));
    Entidades.Televisor = Televisor;
})(Entidades || (Entidades = {}));
