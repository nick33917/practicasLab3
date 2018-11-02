var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
            var fotoInput = document.getElementById("foto");
            var path = document.getElementById("foto").value;
            //divide el string en un array(cada vez q encuentra / agrega un elemento al array)
            var pathFoto = (path.split('\\'))[2];
            var tele = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            var stringTele = JSON.stringify(tele.ToJson());
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var data = new FormData();
            data.append("caso", "agregar");
            data.append("cadenaJson", stringTele);
            data.append("foto", fotoInput.files[0]);
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    var rtn = JSON.parse(xhttp.responseText);
                    if (rtn.TodoOK) {
                        console.log("se agrego correctamente el televisor");
                    }
                    else {
                        alert("NO se agrego la television");
                    }
                }
            };
        };
        Manejadora.MostrarTelevisores = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var data = new FormData();
            data.append("caso", "traer");
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                //let tabla:string = "<table>";
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var arrayTele = JSON.parse(xhttp.responseText);
                    var tabla = "<table border='1'><tr><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th>TIPO</th><thTIPO</th><th>PAIS</th><th>FOTO</th></tr>";
                    for (var _i = 0, arrayTele_1 = arrayTele; _i < arrayTele_1.length; _i++) {
                        var tele = arrayTele_1[_i];
                        var pathFoto = "BACKEND/fotos/" + tele.pathFoto;
                        tabla += "<tr><td>" + tele.codigo + "</td><td>" + tele.marca + "</td><td>" + tele.precio + "</td><td>" + tele.tipo +
                            "</td><td>" + tele.paisOrigen + "</td><td><img width='100' height='100'src='" + pathFoto + "'/></td></tr>";
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.GuardarEnLocalStorage = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var data = new FormData();
            data.append("caso", "traer");
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    localStorage.setItem("televisores_local_storage", xhttp.responseText);
                }
            };
        };
        Manejadora.VerificarExistencia = function () {
            var flag = true;
            var codigo = parseInt(document.getElementById("codigo").value);
            var str = localStorage.getItem("televisores_local_storage");
            var arrayJson = JSON.parse(str);
            for (var _i = 0, arrayJson_1 = arrayJson; _i < arrayJson_1.length; _i++) {
                var tele = arrayJson_1[_i];
                if (tele.codigo == codigo) {
                    flag = false;
                    console.log("el codigo del televisor ya existe");
                    alert("el codigo del televisor ya existe");
                    break;
                }
            }
            if (flag) {
                Manejadora.AgregarTelevisor();
                Manejadora.GuardarEnLocalStorage();
            }
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
    /*VerificarExistencia. Verifica que el televisor que se quiere agregar no exista.
    Para ello, comparará los códigos de los televisores guardados en el LocalStorage.
    Si el televisor existe, se mostrará (por consola y alert) lo acontecido.
     Caso contrario, agregará el nuevo televisor y se actualizará el LocalStorage (GuardarEnLocalStorage).
    */
})(PrimerParcial || (PrimerParcial = {}));
//tsc --outfile FRONTEND/manejadora.js FRONTEND/manejadora//
