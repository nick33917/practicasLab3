/// <reference path="ciudadano.ts" />
namespace Test
{
    export class Manejadora
    {
        public static AgregarCiudadano()
        {
            let nombre:string=(<HTMLInputElement>document.getElementById("txtNombre")).value;
            let apellido:string=(<HTMLInputElement>document.getElementById("txtApellido")).value;
            let edad:number=parseInt((<HTMLInputElement>document.getElementById("txtEdad")).value);
            let dni:number=parseInt((<HTMLInputElement>document.getElementById("txtDni")).value);
            let pais:string=(<HTMLSelectElement>document.getElementById("cboPais")).value;
            let hidden = (<HTMLInputElement>document.getElementById("hdnIdCiudadano")).value;
            let objCiudadano= new Entidades.Ciudadano(nombre,apellido,edad,dni,pais);
            let objCadena=JSON.stringify(objCiudadano.CiudadanoToJson());

            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
            param.append("cadenaJson",objCadena);

            if(hidden == "modificar")
            {
                param.append("caso","modificar");

                xhttp.send(param);
                Test.Manejadora.AdministrarSpinner(true);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log("El ciudadano se Modifico Correctamente");
                    }
                }

            }
            else
            {
                param.append("caso","agregar");

                xhttp.send(param);
                Test.Manejadora.AdministrarSpinner(true);
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log("El ciudadano se agrego Correctamente");
                    }
                }

            }
            (<HTMLInputElement>document.getElementById("btnAgregar")).value = "Agregar";
            (<HTMLInputElement>document.getElementById("hdnIdCiudadano")).value = "";
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);
        }


        public static MostrarCiudadanos()
        {
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
            param.append("caso","mostrar");

            xhttp.send(param);
            Test.Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let ciudadanos = JSON.parse(xhttp.responseText);
                    let tabla = "<table border='1'><tr><th>NOMBRE</th><th>APELLIDO</th><th>EDAD</th><th>PAIS</th><th>DNI</th><th colspan=2>ACCIONES</th></tr>";
                    //<th>MODIFICAR</th>
                    for(let pers of ciudadanos)
                    {
                        tabla+=`<tr><td>`+pers.nombre+`</td><td>`+pers.apellido+`</td><td>`+pers.edad+`</td><td>`+pers.pais+`</td><td>`+pers.dni+`</td><td><input type='button' id='btnEliminar' value='Eliminiar' onclick='Test.Manejadora.EliminarCiudadano(${JSON.stringify(pers)})'></td><td><input type=button id=btnModificar value=Modificar onclick='Test.Manejadora.ModificarCiudadano(${JSON.stringify(pers)})'></td></tr>`;
                     /*   let hola=`<tr>
                        <td>${ciudDatos}</td>
                        <td><button onclick='Test.Manejadora.EliminarCiudadano(${JSON.stringify(ciudadano)})'>Eliminar</button></td>
                         <td><button onclick='Test.Manejadora.ModificarCiudadano(${JSON.stringify(ciudadano)})'>Modificar</button></td>
                         </tr>`;*/
                    }
                    tabla+="</table>";
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=tabla;
                }
            }
            Test.Manejadora.AdministrarSpinner(false);

        }
        public static EliminarCiudadano(objCiud:any)
        {
            if(confirm("Esta Seguro de eliminar al Ciudadano: "+objCiud.apellido+"-"+objCiud.nombre))
            {

                let xhttp : XMLHttpRequest =  new XMLHttpRequest();
                xhttp.open("POST", "BACKEND/administrar.php", true);
                xhttp.setRequestHeader("enctype","multipart/form-data");
                
                let param :FormData = new FormData();
                param.append("caso","eliminar");
                param.append("cadenaJson",JSON.stringify(objCiud));
                
                xhttp.send(param);
                Test.Manejadora.AdministrarSpinner(true);

                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        let valor =JSON.parse(xhttp.responseText);
                        //console.log(xhttp.responseText);
                        if(valor.TodoOK)
                        {
                            console.log("Se elimino correctamente el empleado: " +objCiud.apellido+"-"+objCiud.nombre);
                            Test.Manejadora.MostrarCiudadanos();
                            

                        }
                        else
                        {
                            console.log("No se puedo eliminar el empleado: "+objCiud.apellido+"-"+objCiud.nombre);
                        }
                    }


                }

            }
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);

        }

        public static ModificarCiudadano(objCiud:any)
        {
            (<HTMLInputElement>document.getElementById("txtNombre")).value=objCiud.nombre;
            (<HTMLInputElement>document.getElementById("txtApellido")).value=objCiud.apellido;
            (<HTMLInputElement>document.getElementById("txtEdad")).value=objCiud.edad;
            (<HTMLInputElement>document.getElementById("txtDni")).value=objCiud.dni;
            (<HTMLInputElement>document.getElementById("txtDni")).readOnly=true;
            (<HTMLSelectElement>document.getElementById("cboPais")).value=objCiud.pais;
            (<HTMLInputElement>document.getElementById("btnAgregar")).value = "Modificar";
            (<HTMLInputElement>document.getElementById("hdnIdCiudadano")).value = "modificar";
            (<HTMLInputElement>document.getElementById("btnAgregar")).onclick = function(){Test.Manejadora.AgregarCiudadano()};
                

        }

        public static FiltrarCiudadanosPorPais()
        {
            let pais:string=(<HTMLSelectElement>document.getElementById("cboPais")).value;

            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
            param.append("caso","mostrar");

            xhttp.send(param);
            Test.Manejadora.AdministrarSpinner(true);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let ciudadanos = JSON.parse(xhttp.responseText);
                    let tabla = "<table border='1'><tr><th colspan=5 >PAIS: "+pais+"</th></tr>";
                    for(let pers of ciudadanos)
                    {
                        if(pers.pais == pais)
                        {
                            tabla+=`<tr><td>`+pers.nombre+`</td><td>`+pers.apellido+`</td><td>`+pers.edad+`</td><td>`+pers.pais+`</td><td>`+pers.dni+`</td></tr>`;
                        }
                    }
                    tabla+="</table>";
                    (<HTMLDivElement>document.getElementById("divTabla")).innerHTML=tabla;
                }
            }
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);
        }

        public static CargarPaisesJSON()
        {
            let xhttp : XMLHttpRequest =  new XMLHttpRequest();
            xhttp.open("POST", "BACKEND/administrar.php", true);
            xhttp.setRequestHeader("enctype","multipart/form-data");

            let param :FormData = new FormData();
           // param.append("cadenaJson",objCadena);
            param.append("caso","paises");
            xhttp.send(param);
            Test.Manejadora.AdministrarSpinner(true);
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let paises = JSON.parse(xhttp.responseText);
                    for(let pais of paises)
                    {
                        let opcion= new Option();
                        opcion.id =pais.id;
                        opcion.text = pais.descripcion;
                        (<HTMLSelectElement>document.getElementById("cboPais")).add(opcion);

                    }
                }
            }
            Test.Manejadora.LimpiarForm();
            Test.Manejadora.AdministrarSpinner(false);

        }

        public static LimpiarForm()
        {
            (<HTMLInputElement>document.getElementById("txtNombre")).value="";
            (<HTMLInputElement>document.getElementById("txtApellido")).value="";
            (<HTMLInputElement>document.getElementById("txtEdad")).value="";
            (<HTMLInputElement>document.getElementById("txtDni")).value="";
            (<HTMLInputElement>document.getElementById("txtDni")).readOnly=false;
            (<HTMLSelectElement>document.getElementById("cboPais")).value="Argentina";
        }

        public static AdministrarSpinner(flag:boolean)
        {
            if(flag)
            {
                (<HTMLImageElement>document.getElementById("imgSpinner")).src="BACKEND/gif-load.gif";
            }
            else
            {
                window.setTimeout(function () { (<HTMLImageElement>document.getElementById("imgSpinner")).src = ""; }, 2000);

            }
           

        }

    }
}
// tsc --outfile clases/manejadora.js clases/manejadora
//tsc --outfile app.js ./clases/cuidadano ./clases/persona ./clases/manejadora