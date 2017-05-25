

function addEventListenerList(list, event, fn)	// Coloca un listener en cada tecla
{
    for (var i = 0, len = list.length; i < len; i++)	// Ciclo para insertar listener
    {
        list[i].addEventListener(event, fn, false);	// Inserción de listener
    }
}

function clearout()
{
   list = document.getElementsByClassName("tecla"); // Obtiene las teclas
   for (var i = 0, len = list.length; i < len; i++)   // Ciclo para limpiar outline
   {
      list[i].style.outline = "none"; // Limpia el outline
   }
}

window.onload = function() //Acciones tras cargar la página
{
	pantalla=document.getElementById("display"); //elemento pantalla de salida
	teclas = document.getElementsByClassName("tecla");	// Obtiene las teclas
	addEventListenerList(teclas, 'mouseover', onover);	// Le adjunta un listener a cada tecla para el mouseover
   addEventListenerList(teclas, 'click', teclado); // Le adjunta un listener a cada tecla para el click
	numero("0"); // Coloca un 0 en la pantalla
}

function onover(event) // Cambia el outline para saber en que tecla está el mouse
{
   clearout(); // Limpia el resto de las teclas
   document.getElementById(event.toElement.id).style.outline = "solid 3px rgba(255, 255, 255, 0.39)"; // Coloca el outline
}

x="0"; //número en pantalla
xi=1; //iniciar número en pantalla: 1=si; 0=no;
coma=0; //estado coma decimal 0=no, 1=si;
ni=0; //número oculto o en espera.
op="no"; //operación en curso; "no" =  sin operación.

//mostrar número en pantalla según se va escribiendo:
function numero(xx)  //recoge el número pulsado en el argumento.
{
	if (x=="0" || xi==1  )
	{	// inicializar un número, 
		pantalla.innerHTML=xx; //mostrar en pantalla
		x=xx; //guardar número
		if (xx==".")
		{ //si escribimos una coma al principio del número
			pantalla.innerHTML="0."; //escribimos 0.
			x=xx; //guardar número
			coma=1;	// indica que el numero ya tiene una coma
		}
	}
	else
	{ //continuar escribiendo un número
		if(pantalla.innerHTML.replace(".","").replace("-","").length==8)	// Se verifica que no sean mas de 8 digitos
		{
			return 0;	// Termina si son mas de 8 digitos
		}
		if (xx=="." && coma==0) { //si escribimos una coma decimal pòr primera vez
			pantalla.innerHTML+=xx;
			x+=xx;
			coma=1; //cambiar el estado de la coma  
		}
		//si intentamos escribir una segunda coma decimal no realiza ninguna acción.
		else if (xx=="." && coma==1) {} 
		//Resto de casos: escribir un número del 0 al 9: 	 
		else
		{
			pantalla.innerHTML+=xx;	// Se escribe en pantalla
			x+=xx	// Se guarda el numero
		}
	}
	xi=0 //el número está iniciado y podemos ampliarlo.
}
function operar(s) {
         igualar() //si hay operaciones pendientes se realizan primero
         ni=x //ponemos el 1º número en "numero en espera" para poder escribir el segundo.
         op=s; //guardamos tipo de operación.
         xi=1; //inicializar pantalla.
         }	
function igualar() {
         if (op=="no") { //no hay ninguna operación pendiente.
            pantalla.innerHTML=x;	//mostramos el mismo número
            }
         else { //con operación pendiente resolvemos
            sl=ni+op+x; // escribimos la operación en una cadena
            sol=eval(sl); //convertimos la cadena a código y resolvemos
            
            pantalla.innerHTML=sol //mostramos la solución
            x=sol; //guardamos la solución
            op="no"; //ya no hay operaciones pendientes
            xi=1; //se puede reiniciar la pantalla.
            }
        }
function raizc() {
         x=Math.sqrt(x) //resolver raíz cuadrada.
         pantalla.innerHTML=x; //mostrar en pantalla resultado
         op="no"; //quitar operaciones pendientes.
         xi=1; //se puede reiniciar la pantalla 
     	}
function porcent() { 
         x=x/100 //dividir por 100 el número
         pantalla.innerHTML=x; //mostrar en pantalla
         igualar() //resolver y mostrar operaciones pendientes
         xi=1 //reiniciar la pantalla
         }
function opuest() { 
         nx=Number(x); //convertir en número
         nx=-nx; //cambiar de signo
         x=String(nx); //volver a convertir a cadena
         pantalla.innerHTML=x; //mostrar en pantalla.
         }
function inve() {
         nx=Number(x);
         nx=(1/nx);
         x=String(nx);		 
         pantalla.innerHTML=x;
         xi=1; //reiniciar pantalla al pulsar otro número.
         }
function borradoTotal() {
         pantalla.innerHTML=0; //poner pantalla a 0
         x="0"; //reiniciar número en pantalla
         coma=0; //reiniciar estado coma decimal 
         ni=0 //indicador de número oculto a 0;
         op="no" //borrar operación en curso.
         }
function teclado (event) { 
	     k=event.toElement.id;
	     console.log(k);
         if (!isNaN(k)) {numero(String(k))}
         if (k=="punto") {numero(".")} //teclas de coma decimal
         if (k=="por") {operar('*')} //tecla multiplicación
         if (k=="mas") {operar('+')} //tecla suma
         if (k=="menos") {operar('-')} //tecla resta
         if (k=="dividido") {operar('/')} //tecla división
         if (k=="igual") {igualar()} //Tecla igual: intro o barra espaciadora
         if (k=="sign") {opuest()} //Tecla igual: intro o barra espaciadora
         if (k=="raiz") {raizc()} //Tecla igual: intro o barra espaciadora
         if (k=="on") {borradoTotal()} //Tecla borrado total: "supr"
         show();
         }

function show()  // Evita que se muestren mas de 8 digitos en los resiltados
{
	t = parseFloat(pantalla.innerHTML);	// Obtiene el resultado
	if(String(t).replace(".","").replace("-","").length>8)	// Revisa si tiene mas de 8 digitos
	{
		n_array = String(t).split(".") // Separa el numero por punto decimal
		if(n_array.length==2) // Verifica si el numero tenía punto decimal
		{
			n_dec = n_array[1].length;	// obtiene el numero de decimales
		}
		else { n_dec = 0;}	// Indica que no tiene decimales
		if(n_dec>8){n_dec=8;}	// Limita el numero de decimales
		n_dec = n_dec - n_array[0].length; // Resta decimales si el entero es grande
		if(t<99999999 && t>-99999999){t=parseFloat(t.toFixed(n_dec)); x=t;}	// Si el numero está en rango, ajusta decimales
		else{t="muy largo"; x=0;}	// Si está fuera de rango indica que el numero es demasiado largo
	}
	pantalla.innerHTML = t // Se coloca el numero en pantalla
}