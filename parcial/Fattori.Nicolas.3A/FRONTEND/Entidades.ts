namespace Entidades
{
    export class Producto
    {
        public codigo:number;
        public marca:string; 
        public precio:number;

        public constructor(codigo1:number,marca1:string,precio1:number)
        {
            this.codigo=codigo1;
            this.marca=marca1;
            this.precio=precio1;

        }
        protected ToString():string
        {
            return JSON.stringify({codigo:this.codigo , marca:this.marca , precio:this.precio,});
        }
    }

    export class Televisor extends Producto
    {
        public tipo:string;   
        public paisOrigen:string;
        public pathFoto:string;

        public constructor(codigo1:number,marca1:string,precio1:number,tipo1:string,paisOrigen1:string,path1:string)
        {
            super(codigo1,marca1,precio1);
            this.tipo=tipo1;
            this.paisOrigen = paisOrigen1;
            this.pathFoto=path1;
        }
        public ToJson()
        {
            let obj = JSON.parse(super.ToString());
            obj.tipo=this.tipo;
            obj.paisOrigen=this.paisOrigen;
            obj.pathFoto=this.pathFoto;
            return obj;
        }

    }
}