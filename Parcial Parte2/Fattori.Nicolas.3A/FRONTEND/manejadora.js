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
/// <reference path="../node_modules/@types/jquery/index.d.ts" /> 
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
            //console.log(fotoInput);
            //divide el string en un array(cada vez q encuentra / agrega un elemento al array)
            var pathFoto = (path.split('\\'))[2];
            var tele = new Entidades.Televisor(codigo, marca, precio, tipo, pais, pathFoto);
            var stringTele = JSON.stringify(tele.ToJson());
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var data = new FormData();
            var hidden = document.getElementById('hdnIdModificacion').value;
            console.log(hidden);
            if (hidden == "modificar") {
                data.append("caso", "modificar");
            }
            else {
                data.append("caso", "agregar");
                document.getElementById("btn-agregar").value = "Agregar";
            }
            data.append("cadenaJson", stringTele);
            if (fotoInput.files[0] != undefined) {
                data.append("foto", fotoInput.files[0]);
            }
            xhttp.send(data);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    var rtn = JSON.parse(xhttp.responseText);
                    if (rtn.TodoOK) {
                        console.log("se agrego  o modifico correctamente el televisor");
                        Manejadora.MostrarTelevisores();
                    }
                    else {
                        alert("NO se agrego o modifico la television");
                    }
                }
            };
            document.getElementById('hdnIdModificacion').value = "";
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
                    var tabla = "<table border='1'><tr><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th>TIPO</th><thTIPO</th><th>PAIS</th><th>FOTO</th><th colspan='2'>ACCIONES</th></tr>";
                    for (var _i = 0, arrayTele_1 = arrayTele; _i < arrayTele_1.length; _i++) {
                        var tele = arrayTele_1[_i];
                        var pathFoto = "BACKEND/fotos/" + tele.pathFoto;
                        var objStr = JSON.stringify(tele);
                        tabla += "<tr><td>" + tele.codigo + "</td><td>" + tele.marca + "</td><td>" + tele.precio + "</td><td>" + tele.tipo +
                            "</td><td>" + tele.paisOrigen + "</td><td><img width='100' height='100'src='" + pathFoto + "'/></td>\n                        <td><input type=button id=btnEliminar name=btnEliminar value=Eliminar onclick='PrimerParcial.Manejadora.EliminarTelevisor(" + objStr + ")'></td>\n                        <td><input type=button id=btnModificar name=btnModificar value=Modificar onclick='PrimerParcial.Manejadora.ModificarTelevisor(" + objStr + ")'></td></tr>";
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
        Manejadora.EliminarTelevisor = function (objTele) {
            var msj = "Esta seguro que quiere eliminar la television de Codigo:" + objTele.codigo + " --- Tipo:" + objTele.tipo + "?";
            var confirmacion = confirm(msj);
            if (confirmacion == true) {
                var xhttp_1 = new XMLHttpRequest();
                xhttp_1.open("POST", "./BACKEND/administrar.php", true);
                xhttp_1.setRequestHeader("enctype", "multipart/form-data");
                var strObj = JSON.stringify(objTele);
                var data = new FormData();
                data.append("cadenaJson", strObj);
                data.append("caso", "eliminar");
                xhttp_1.send(data);
                xhttp_1.onreadystatechange = function () {
                    if (xhttp_1.readyState == 4 && xhttp_1.status == 200) {
                        var resp = JSON.parse(xhttp_1.responseText);
                        if (resp.TodoOK == true) {
                            console.log("se elimino la television correctamente");
                            Manejadora.MostrarTelevisores();
                        }
                        else {
                            console.log("No se pudo eliminar");
                        }
                    }
                };
            }
        };
        Manejadora.ModificarTelevisor = function (objTele) {
            document.getElementById("codigo").value = objTele.codigo;
            document.getElementById("codigo").readOnly = true;
            document.getElementById("marca").value = objTele.marca;
            document.getElementById("precio").value = objTele.precio;
            document.getElementById("tipo").value = objTele.tipo;
            document.getElementById("pais").value = objTele.paisOrigen;
            document.getElementById("imgFoto").src = "BACKEND/fotos/" + objTele.pathFoto;
            document.getElementById('hdnIdModificacion').value = "modificar";
            document.getElementById("btn-agregar").value = "Modificar";
            Manejadora.AgregarTelevisor();
        };
        return Manejadora;
    }());
    PrimerParcial.Manejadora = Manejadora;
    /*
    ModificarTelevisor. Mostrará todos los datos del televisor que recibe por parámetro (objeto JSON),
    en el formulario, incluida la foto (mostrarla en “imgFoto”).
    Permitirá modificar cualquier campo, a excepción del código, dejarlo como de solo lectura.
    Modificar el método AgregarTelevisor para cambiar el caso de “agregar” a “modificar”
    y el texto del botón de “Agregar” a “Modificar”, según corresponda. Refrescar el listado solo si se pudo modificar,
    caso contrario, informar (por alert y consola) de lo acontecido.
 
 
    */
})(PrimerParcial || (PrimerParcial = {}));
//tsc --outfile FRONTEND/manejadora.js FRONTEND/manejadora//
