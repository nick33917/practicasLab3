/// <reference path="persona.ts" />
namespace Entidades
{
    export class Ciudadano extends Persona
    {
        protected _dni:number;   
        protected _pais:string;

        public constructor(nombre:string,apellido:string,edad:number,dni:number,pais:string)
        {
            super(nombre,apellido,edad);
            this._dni=dni;
            this._pais=pais;
        }
        public CiudadanoToJson()
        {
            let obj = JSON.parse(super.ToString());
            obj.pais=this._pais;
            obj.dni=this._dni;
            return obj;
        }

    }
}