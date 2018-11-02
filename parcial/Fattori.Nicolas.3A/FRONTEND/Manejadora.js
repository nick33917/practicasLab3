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
/// <reference path="Entidades.ts" />
var PrimerParcial;
(function (PrimerParcial) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarTelevisor = function () {
            var codigo = parseInt(document.getElementById("codigo").value);
            var marca = document.getElementById("marca").value;
            var precio = parseInt(document.getElementById("precio").value);
            var tipo = document.getElementById("tipo").value;
            var pais = document.getElementById("pais").value;
            var pathFoto = document.getElementById("foto");
            //let hidden = (<HTMLInputElement>document.getElementById("hdnIdCiudadano")).value;
            var objTelev = new Entidades.Televisor(codigo, marca, precio, tipo, pais, codigo + "-" + marca + ".JPG");
            var objCadena = JSON.stringify(objTelev.ToJson());
            console.log(objCadena);
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            param.append("cadenaJson", objCadena);
            param.append("foto", pathFoto.files[0]);
            param.append("caso", "agregar");
            xhttp.send(param);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log("El televisor se agrego Correctamente");
                }
            };
        };
        Manejadora.MostrarTelevisores = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            param.append("caso", "traer");
            xhttp.send(param);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var televisores = JSON.parse(xhttp.responseText);
                    var tabla = "<table border='1'><tr><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th></th><thTIPO</th><th>PAIS</th><th>FOTO</th></tr>";
                    for (var _i = 0, televisores_1 = televisores; _i < televisores_1.length; _i++) {
                        var telev = televisores_1[_i];
                        var pathFoto = "BACKEND/fotos/" + telev.pathFoto;
                        tabla += "<tr><td>" + telev.codigo + "</td><td>" + telev.marca + "</td><td>" + telev.precio + "</td><td>" + telev.tipo + "</td><td>" + telev.paisOrigen + "</td><td><img width='100' height='100'src='" + pathFoto + "'/></td></tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            param.append("caso", "traer");
            xhttp.send(param);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var televisores = JSON.parse(xhttp.responseText);
                    var cadena = JSON.stringify(televisores);
                    localStorage.setItem("televisores_local_storage", cadena);
                }
            };
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
})(PrimerParcial || (PrimerParcial = {}));
//tsc --outfile FRONTEND/Manejadora.js FRONTEND/Manejadora 
