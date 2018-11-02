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
            let pathFoto:any= (<HTMLInputElement>document.getElementById("foto"));

            //let hidden = (<HTMLInputElement>document.getElementById("hdnIdCiudadano")).value;
            
            let objTelev= new Entidades.Televisor(codigo,marca,precio,tipo,pais,codigo+"-"+marca+".JPG");
            let objCadena=JSON.stringify(objTelev.ToJson());
            console.log(objCadena);
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
            param.append("cadenaJson",objCadena);
            param.append("foto",pathFoto.files[0]);
            param.append("caso","agregar");
            xhttp.send(param);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log("El televisor se agrego Correctamente");
                }
            }
        }
        public static MostrarTelevisores()
        {
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
            param.append("caso","traer");

            xhttp.send(param);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let televisores = JSON.parse(xhttp.responseText);
                    let tabla = "<table border='1'><tr><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th></th><thTIPO</th><th>PAIS</th><th>FOTO</th></tr>";
                    
                    for(let telev of televisores)
                    {
                        let pathFoto="BACKEND/fotos/"+telev.pathFoto;
                        tabla+=`<tr><td>`+telev.codigo+`</td><td>`+telev.marca+`</td><td>`+telev.precio+`</td><td>`+telev.tipo+`</td><td>`+telev.paisOrigen+`</td><td><img width='100' height='100'src='`+ pathFoto+`'/></td></tr>`;
                    }
                    tabla+="</table>";
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=tabla;
                }
            }
           

        }

        public static GuardarEnLocalStorage()
        {
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
            param.append("caso","traer");

            xhttp.send(param);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let televisores = JSON.parse(xhttp.responseText);
                    let cadena=JSON.stringify(televisores);
                    localStorage.setItem("televisores_local_storage",cadena);
                
                      
                }
            }

        }

        public static VerificarExistencia()
        {
            let cadena = localStorage.getItem("televisores_local_storage");
        }




    }
}
//tsc --outfile FRONTEND/Manejadora.js FRONTEND/Manejadora