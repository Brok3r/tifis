var tablero, direccion;
//declaramos un objeto JSON
var fondo = {
	 imagenURL: "recursos/fondo.png",
	 imagenOK: false
};
var teclas = {
	UP: 38,  //código ASCII
	DOWN: 40,
	LEFT:37,
	RIGHT: 39
};
var tifis = {
	frenteURL: "recursos/diana-frente.png",
	frenteOK: false, //true si la imagen ha cargado
	atrasURL: "recursos/diana-atras.png",
    atrasOK: false,
    derURL: "recursos/diana-der.png",
    derOK: false,
    izqURL: "recursos/diana-izq.png",
    izqOK: false,
	velocidad: 20,
	x: 100,
	y: 100,
	
};
//notacion JSON
var liz = {
	velocidad: 10,
	lizURL: "recursos/liz.png",
	lizOK: false,
	x: 400,
	y: 200
};
function inicio(){
// para dibujar sore el canvas tenemos que obtener su contexto
 var canvas = document.getElementById("campo");
 tablero = canvas.getContext("2d");
 
// al JSON le podemos declarar variables donde queremos
 fondo.imagen = new Image();  //Image() es un objeto interno de JS que permite cargar imagenes
 //console.log(fondo);
 fondo.imagen.src = fondo.imagenURL;
 //JS no espera a que se carge la imagen del servidor
// fondo.imagen.onload  = dibujarFondo; //sin (), sino la estaría invocando
//ahora utilizamos otra funcion. confirmamos que el fondo se ha dibujado
//para dibujar encima el resto de imagenes
 fondo.imagen.onload  = confirmarFondo; //cuando carga la imagen dispara la funcion cargarFondo()


  tifis.frente = new Image(); //creo una variable frente en el objeto tifis y le creo una imagen
  tifis.frente.src = "recursos/diana-frente.png";
  tifis.frente.onload = confirmarFrente;

  tifis.atras = new Image(); //creo una variable frente en el objeto tifis y le creo una imagen
  tifis.atras.src = tifis.atrasURL;
  tifis.atras.onload = confirmarAtras;

  tifis.izq = new Image(); //creo una variable frente en el objeto tifis y le creo una imagen
  tifis.izq.src = tifis.izqURL;
  tifis.izq.onload = confirmarIzq;

  tifis.der = new Image(); //creo una variable frente en el objeto tifis y le creo una imagen
  tifis.der.src = tifis.derURL;
  tifis.der.onload = confirmarDer;

  liz.lizImg = new Image();
  liz.lizImg.src =  liz.lizURL;
  liz.lizImg.onload = confirmarLiz;

  setInterval('acercarLiz()',500);

  document.addEventListener("keydown", teclado) //evento de pulsar teclas
  direccion = {

  }
}

function acercarLiz(){

	if(tifis.x < liz.x) {
			liz.x-=liz.velocidad;
	}else {
			liz.x+=liz.velocidad;
	}
	if(tifis.y < liz.y) {
			liz.y-=liz.velocidad;
	}else {
			liz.y+=liz.velocidad;
	}


	dibujar();
}

function teclado(datos){
var codigo =datos.keyCode;
if(codigo == teclas.UP) {
	if(tifis.y>0){
		 tifis.y-=tifis.velocidad;
	}
}

if(codigo == teclas.DOWN) {
	if(tifis.y<450){
 tifis.y+=tifis.velocidad; 
}
}
if(codigo == teclas.LEFT) {
	if(tifis.x>=0){
 tifis.x-=tifis.velocidad; 
}
}
if(codigo == teclas.RIGHT) {
	if(tifis.x<450){
 tifis.x+=tifis.velocidad;
 } 
}
direccion = codigo;
dibujar();
}


//Dispara la funcion cuando la imagen se ha descargado (onload)
function dibujarFondo(){
						// imagen, posicon x, posicion y)
	tablero.drawImage(fondo.imagen, 0, 0);
}

function confirmarFondo(){
	fondo.imagenOK= true;
	dibujar();

}
function confirmarFrente()
{
    tifis.frenteOK = true;
    dibujar();
}
function confirmarLiz(){
	liz.lizOK = true;
	dibujar();

}
function dibujar(){
//Capa 1: Fondo
	if(fondo.imagenOK){
	tablero.drawImage(fondo.imagen, 0, 0);
	}
// Capa 2: Tifis
var tifisDibujo = tifis.frente;
	if(tifis.frenteOK &&  tifis.atrasOK && tifis.derOK && tifis.izqOK){
		if(direccion == teclas.UP) tifisDibujo = tifis.atras;
		if(direccion == teclas.DWON) tifisDibujo = tifis.frente;
		if(direccion == teclas.LEFT) tifisDibujo = tifis.izq;
		if(direccion == teclas.RIGHT) tifisDibujo = tifis.der;
	tablero.drawImage(tifisDibujo, tifis.x , tifis.y);
	}
//Capa 3: liz
	if(liz.lizOK){
	tablero.drawImage(liz.lizImg, liz.x , liz.y);
	}
}

function movimiento(){

	tifis.x += 10;
	 dibujar();
}


function confirmarAtras()
{
    tifis.atrasOK = true;
    dibujar();
}

function confirmarDer()
{
    tifis.derOK = true;
    dibujar();
}

function confirmarIzq()
{
    tifis.izqOK = true;
    dibujar();
}
