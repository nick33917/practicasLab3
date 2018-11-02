/// <reference path="Entidades.ts" />
namespace PrimerParcial
{
    export class Manejadora
    {
        public static AgregarTelevisor() 
        {
            let codigo:number=parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
            let marca:string=(<HTMLInputElement>document.getElementById("marca")).value;
            let precio:number=parseInt((<HTMLInputElement>document.getElementById("precio")).value);
            let tipo:string=(<HTMLInputElement>document.getElementById("tipo")).value;
            let pais:string=(<HTMLSelectElement>document.getElementById("pais")).value;

            let fotoInput:any= (<HTMLInputElement>document.getElementById("foto"));
            let path:string=(<HTMLInputElement>document.getElementById("foto")).value;
            //divide el string en un array(cada vez q encuentra / agrega un elemento al array)
            let pathFoto:string=(path.split('\\'))[2];

            let tele:any = new Entidades.Televisor(codigo,marca,precio,tipo,pais,pathFoto);
            let stringTele:string = JSON.stringify(tele.ToJson());

            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");
            let data : FormData = new FormData();
            data.append("caso","agregar");
            data.append("cadenaJson",stringTele);
            data.append("foto",fotoInput.files[0]);
            xhttp.send(data);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200)
                {
                    console.log(xhttp.responseText);
                    let rtn= JSON.parse(xhttp.responseText);
                    if(rtn.TodoOK)
                    {
                       console.log("se agrego correctamente el televisor");
                    }
                    else
                    {
                        alert ("NO se agrego la television");
                    }
                }
            }

        }

        public static MostrarTelevisores()
        {
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let data : FormData = new FormData();
            data.append("caso","traer");
            xhttp.send(data);

            xhttp.onreadystatechange = () => {
                //let tabla:string = "<table>";
                if (xhttp.readyState == 4 && xhttp.status == 200)
                {
                    let arrayTele=JSON.parse(xhttp.responseText);
                    let tabla:string ="<table border='1'><tr><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th>TIPO</th><thTIPO</th><th>PAIS</th><th>FOTO</th></tr>";
                    for(let tele of arrayTele)
                    {
                        let pathFoto="BACKEND/fotos/"+tele.pathFoto;
                        tabla+=`<tr><td>`+tele.codigo+`</td><td>`+tele.marca+`</td><td>`+tele.precio+`</td><td>`+tele.tipo+
                        `</td><td>`+tele.paisOrigen+`</td><td><img width='100' height='100'src='`+ pathFoto+`'/></td></tr>`;
                    }
                    tabla+="</table>";
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML = tabla;
                                        
                }
                
            }
           

        }
        public static GuardarEnLocalStorage()
        {
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let data : FormData = new FormData();
            data.append("caso","traer");
            xhttp.send(data);

            xhttp.onreadystatechange = () => {
                
                if (xhttp.readyState == 4 && xhttp.status == 200)
                {
                    localStorage.setItem("televisores_local_storage",xhttp.responseText);
                }
                
            }


        }

        public static VerificarExistencia()
        {
            let flag :boolean = true;
            let codigo:number=parseInt((<HTMLInputElement>document.getElementById("codigo")).value);
            let str:any = localStorage.getItem("televisores_local_storage");
            let arrayJson= JSON.parse(str);
            for(let tele of arrayJson)
            {
                if(tele.codigo== codigo)
                {
                    flag=false;
                    console.log("el codigo del televisor ya existe");
                    alert("el codigo del televisor ya existe");
                    break;
                }
            }
            if(flag)
            {
                Manejadora.AgregarTelevisor();
                Manejadora.GuardarEnLocalStorage();
            }

        }
    
    }


    /*VerificarExistencia. Verifica que el televisor que se quiere agregar no exista. 
    Para ello, comparará los códigos de los televisores guardados en el LocalStorage. 
    Si el televisor existe, se mostrará (por consola y alert) lo acontecido.
     Caso contrario, agregará el nuevo televisor y se actualizará el LocalStorage (GuardarEnLocalStorage). 
    */
 
}
//tsc --outfile FRONTEND/manejadora.js FRONTEND/manejadora//