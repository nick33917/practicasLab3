"use strict";
var Entidades;
(function (Entidades) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this._nombre = nombre;
            this._apellido = apellido;
            this._edad = edad;
        }
        Persona.prototype.ToString = function () {
            return JSON.stringify({ nombre: this._nombre, apellido: this._apellido, edad: this._edad, });
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=persona.js.map