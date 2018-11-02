namespace Entidades
{
    export class Persona
    {
        protected _nombre:string;
        protected _apellido:string; 
        protected _edad:number;

        public constructor(nombre:string,apellido:string,edad:number)
        {
            this._nombre=nombre;
            this._apellido=apellido;
            this._edad=edad;

        }
        protected ToString():string
        {
            return JSON.stringify({nombre:this._nombre , apellido:this._apellido , edad:this._edad,});
        }
    }
}