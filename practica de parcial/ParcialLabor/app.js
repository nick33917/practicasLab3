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
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._edad = edad;
        }
        Persona.prototype.ToString = function () {
            return JSON.stringify({ nombre: this._nombre, apellido: this._apellido, edad: this._edad });
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
/// <reference path="persona.ts" />
var Entidades;
(function (Entidades) {
    var Ciudadano = /** @class */ (function (_super) {
        __extends(Ciudadano, _super);
        function Ciudadano(nombre, apellido, edad, dni, pais) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this._dni = dni;
            _this._pais = pais;
            return _this;
        }
        Ciudadano.prototype.CiudadanoToJson = function () {
            var obj = JSON.parse(_super.prototype.ToString.call(this));
            obj.pais = this._pais;
            obj.dni = this._dni;
            return obj;
        };
        return Ciudadano;
    }(Entidades.Persona));
    Entidades.Ciudadano = Ciudadano;
})(Entidades || (Entidades = {}));
/// <reference path="ciudadano.ts" />
var Test;
(function (Test) {
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarCiudadano = function () {
            var nombre = document.getElementById("txtNombre").value;
            var apellido = document.getElementById("txtApellido").value;
            var edad = parseInt(document.getElementById("txtEdad").value);
            var dni = parseInt(document.getElementById("txtDni").value);
            var pais = document.getElementById("cboPais").value;
            var hidden = document.getElementById("hdnIdCiudadano").value;
            var objCiudadano = new Entidades.Ciudadano(nombre, apellido, edad, dni, pais);
            var objCadena = JSON.stringify(objCiudadano.CiudadanoToJson());
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            param.append("cadenaJson", objCadena);
            if (hidden == "modificar") {
                param.append("caso", "modificar");
                xhttp.send(param);
                Test.Manejadora.AdministrarSpinner(true);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log("El ciudadano se Modifico Correctamente");
                    }
                };
            }
            else {
                param.append("caso", "agregar");
                xhttp.send(param);
                Test.Manejadora.AdministrarSpinner(true);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log("El ciudadano se agrego Correctamente");
                    }
                };
            }
            document.getElementById("btnAgregar").value = "Agregar";
            document.getElementById("hdnIdCiudadano").value = "";
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);
        };
        Manejadora.MostrarCiudadanos = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            param.append("caso", "mostrar");
            xhttp.send(param);
            Test.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var ciudadanos = JSON.parse(xhttp.responseText);
                    var tabla = "<table border='1'><tr><th>NOMBRE</th><th>APELLIDO</th><th>EDAD</th><th>PAIS</th><th>DNI</th><th colspan=2>ACCIONES</th></tr>";
                    //<th>MODIFICAR</th>
                    for (var _i = 0, ciudadanos_1 = ciudadanos; _i < ciudadanos_1.length; _i++) {
                        var pers = ciudadanos_1[_i];
                        tabla += "<tr><td>" + pers.nombre + "</td><td>" + pers.apellido + "</td><td>" + pers.edad + "</td><td>" + pers.pais + "</td><td>" + pers.dni + ("</td><td><input type='button' id='btnEliminar' value='Eliminiar' onclick='Test.Manejadora.EliminarCiudadano(" + JSON.stringify(pers) + ")'></td><td><input type=button id=btnModificar value=Modificar onclick='Test.Manejadora.ModificarCiudadano(" + JSON.stringify(pers) + ")'></td></tr>");
                        /*   let hola=`<tr>
                           <td>${ciudDatos}</td>
                           <td><button onclick='Test.Manejadora.EliminarCiudadano(${JSON.stringify(ciudadano)})'>Eliminar</button></td>
                            <td><button onclick='Test.Manejadora.ModificarCiudadano(${JSON.stringify(ciudadano)})'>Modificar</button></td>
                            </tr>`;*/
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
            Test.Manejadora.AdministrarSpinner(false);
        };
        Manejadora.EliminarCiudadano = function (objCiud) {
            if (confirm("Esta Seguro de eliminar al Ciudadano: " + objCiud.apellido + "-" + objCiud.nombre)) {
                var xhttp_1 = new XMLHttpRequest();
                xhttp_1.open("POST", "BACKEND/administrar.php", true);
                xhttp_1.setRequestHeader("enctype", "multipart/form-data");
                var param = new FormData();
                param.append("caso", "eliminar");
                param.append("cadenaJson", JSON.stringify(objCiud));
                xhttp_1.send(param);
                Test.Manejadora.AdministrarSpinner(true);
                xhttp_1.onreadystatechange = function () {
                    if (xhttp_1.readyState == 4 && xhttp_1.status == 200) {
                        var valor = JSON.parse(xhttp_1.responseText);
                        //console.log(xhttp.responseText);
                        if (valor.TodoOK) {
                            console.log("Se elimino correctamente el empleado: " + objCiud.apellido + "-" + objCiud.nombre);
                            Test.Manejadora.MostrarCiudadanos();
                        }
                        else {
                            console.log("No se puedo eliminar el empleado: " + objCiud.apellido + "-" + objCiud.nombre);
                        }
                    }
                };
            }
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);
        };
        Manejadora.ModificarCiudadano = function (objCiud) {
            document.getElementById("txtNombre").value = objCiud.nombre;
            document.getElementById("txtApellido").value = objCiud.apellido;
            document.getElementById("txtEdad").value = objCiud.edad;
            document.getElementById("txtDni").value = objCiud.dni;
            document.getElementById("txtDni").readOnly = true;
            document.getElementById("cboPais").value = objCiud.pais;
            document.getElementById("btnAgregar").value = "Modificar";
            document.getElementById("hdnIdCiudadano").value = "modificar";
            document.getElementById("btnAgregar").onclick = function () { Test.Manejadora.AgregarCiudadano(); };
        };
        Manejadora.FiltrarCiudadanosPorPais = function () {
            var pais = document.getElementById("cboPais").value;
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            param.append("caso", "mostrar");
            xhttp.send(param);
            Test.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var ciudadanos = JSON.parse(xhttp.responseText);
                    var tabla = "<table border='1'><tr><th colspan=5 >PAIS: " + pais + "</th></tr>";
                    for (var _i = 0, ciudadanos_2 = ciudadanos; _i < ciudadanos_2.length; _i++) {
                        var pers = ciudadanos_2[_i];
                        if (pers.pais == pais) {
                            tabla += "<tr><td>" + pers.nombre + "</td><td>" + pers.apellido + "</td><td>" + pers.edad + "</td><td>" + pers.pais + "</td><td>" + pers.dni + "</td></tr>";
                        }
                    }
                    tabla += "</table>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);
        };
        Manejadora.CargarPaisesJSON = function () {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            var param = new FormData();
            // param.append("cadenaJson",objCadena);
            param.append("caso", "paises");
            xhttp.send(param);
            Test.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var paises = JSON.parse(xhttp.responseText);
                    for (var _i = 0, paises_1 = paises; _i < paises_1.length; _i++) {
                        var pais = paises_1[_i];
                        var opcion = new Option();
                        opcion.id = pais.id;
                        opcion.text = pais.descripcion;
                        document.getElementById("cboPais").add(opcion);
                    }
                }
            };
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);
        };
        Manejadora.LimpiarForm = function () {
            document.getElementById("txtNombre").value = "";
            document.getElementById("txtApellido").value = "";
            document.getElementById("txtEdad").value = "";
            document.getElementById("txtDni").value = "";
            document.getElementById("txtDni").readOnly = false;
            document.getElementById("cboPais").value = "Argentina";
        };
        Manejadora.AdministrarSpinner = function (flag) {
            if (flag) {
                document.getElementById("imgSpinner").src = "BACKEND/gif-load.gif";
            }
            else {
                window.setTimeout(function () { document.getElementById("imgSpinner").src = ""; }, 2000);
            }
        };
        return Manejadora;
    }());
    Test.Manejadora = Manejadora;
})(Test || (Test = {}));
// tsc --outfile clases/manejadora.js clases/manejadora
//tsc --outfile app.js ./clases/cuidadano ./clases/persona ./clases/manejadora
