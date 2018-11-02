/// <reference path="../node_modules/@types/jquery/index.d.ts" /> 
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
            //console.log(fotoInput);
            //divide el string en un array(cada vez q encuentra / agrega un elemento al array)
            let pathFoto:string=(path.split('\\'))[2];

            let tele:any = new Entidades.Televisor(codigo,marca,precio,tipo,pais,pathFoto);
            let stringTele:string = JSON.stringify(tele.ToJson());

            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "./BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");
            let data : FormData = new FormData();

            let hidden= (<HTMLInputElement> document.getElementById('hdnIdModificacion')).value ;
            console.log(hidden);
            if(hidden=="modificar")
            {
                data.append("caso","modificar");

            }
            else
            {
                data.append("caso","agregar");
                (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Agregar";
            }
            
            data.append("cadenaJson",stringTele);
            if(fotoInput.files[0] != undefined)
            {
                data.append("foto",fotoInput.files[0]);

            } 
            xhttp.send(data);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200)
                {
                    console.log(xhttp.responseText);
                    let rtn= JSON.parse(xhttp.responseText);
                    if(rtn.TodoOK)
                    {
                       console.log("se agrego  o modifico correctamente el televisor");
                       Manejadora.MostrarTelevisores();
                    }
                    else
                    {
                        alert ("NO se agrego o modifico la television");
                    }
                }
            }
            (<HTMLInputElement> document.getElementById('hdnIdModificacion')).value = "";
        
        
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
                    let tabla:string ="<table border='1'><tr><th>CODIGO</th><th>MARCA</th><th>PRECIO</th><th>TIPO</th><thTIPO</th><th>PAIS</th><th>FOTO</th><th colspan='2'>ACCIONES</th></tr>";
                    for(let tele of arrayTele)
                    {
                        let pathFoto="BACKEND/fotos/"+tele.pathFoto;
                        
                                                                                                                            let objStr = JSON.stringify(tele);
                        tabla+=`<tr><td>`+tele.codigo+`</td><td>`+tele.marca+`</td><td>`+tele.precio+`</td><td>`+tele.tipo+
                        `</td><td>`+tele.paisOrigen+`</td><td><img width='100' height='100'src='`+ pathFoto+`'/></td>
                        <td><input type=button id=btnEliminar name=btnEliminar value=Eliminar onclick='PrimerParcial.Manejadora.EliminarTelevisor(`+objStr+`)'></td>
                        <td><input type=button id=btnModificar name=btnModificar value=Modificar onclick='PrimerParcial.Manejadora.ModificarTelevisor(`+objStr+`)'></td></tr>`;
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

        public static EliminarTelevisor(objTele:any)
        {
            let msj:string = "Esta seguro que quiere eliminar la television de Codigo:"+objTele.codigo+" --- Tipo:"+objTele.tipo+"?";
            let confirmacion = confirm(msj);
            if(confirmacion == true)
            {
                let xhttp : XMLHttpRequest =  new XMLHttpRequest();
                xhttp.open("POST", "./BACKEND/administrar.php", true);
                xhttp.setRequestHeader("enctype","multipart/form-data");

                let strObj= JSON.stringify(objTele);

                let data : FormData = new FormData();
                data.append("cadenaJson",strObj);
                data.append("caso","eliminar");
                xhttp.send(data);

                xhttp.onreadystatechange = () => {
                    
                    if (xhttp.readyState == 4 && xhttp.status == 200)
                    {
                        let resp=JSON.parse(xhttp.responseText);
                        if(resp.TodoOK == true)
                        {
                            console.log("se elimino la television correctamente");
                            Manejadora.MostrarTelevisores();
                        }
                        else
                        {
                            console.log("No se pudo eliminar");
                        }
                    }
                    
                }

            }
            
            
        }

        public static ModificarTelevisor(objTele:any)
        {
            (<HTMLInputElement>document.getElementById("codigo")).value = objTele.codigo;
            (<HTMLInputElement>document.getElementById("codigo")).readOnly = true;
            (<HTMLInputElement>document.getElementById("marca")).value = objTele.marca;
            (<HTMLInputElement>document.getElementById("precio")).value = objTele.precio;
            (<HTMLInputElement>document.getElementById("tipo")).value = objTele.tipo;
            (<HTMLSelectElement>document.getElementById("pais")).value = objTele.paisOrigen;
            (<HTMLImageElement>document.getElementById("imgFoto")).src = "BACKEND/fotos/" + objTele.pathFoto;
            (<HTMLInputElement> document.getElementById('hdnIdModificacion')).value = "modificar";
            (<HTMLInputElement>document.getElementById("btn-agregar")).value = "Modificar";
            Manejadora.AgregarTelevisor();
        }
    
    }


    /*
    ModificarTelevisor. Mostrará todos los datos del televisor que recibe por parámetro (objeto JSON),
    en el formulario, incluida la foto (mostrarla en “imgFoto”).
    Permitirá modificar cualquier campo, a excepción del código, dejarlo como de solo lectura. 
    Modificar el método AgregarTelevisor para cambiar el caso de “agregar” a “modificar” 
    y el texto del botón de “Agregar” a “Modificar”, según corresponda. Refrescar el listado solo si se pudo modificar,
    caso contrario, informar (por alert y consola) de lo acontecido. 
 
 
    */
 
}
//tsc --outfile FRONTEND/manejadora.js FRONTEND/manejadora//