// Script de Abstracción + Encapsulamiento + Herencia para Vet Turnos
class Mascota{
    #peso; // campo privado

    constructor(nombre, peso, especie){
        if(new.target === Mascota){
            throw new Error("No se puede instanciar directamente la clase Mascota porque es abstracta ");
        }
        this.nombre = nombre;
        this.peso = peso;
        this.especie = especie;
    }
    // metodos get y set para acceder al peso privado
    get peso() {
        return this.#peso;
    }

    // metodo para dar el valor del peso al atributo privado #peso
    set peso(valor) {
        if (typeof valor !== "number" || valor <= 0 || isNaN(valor)) {
            throw new TypeError(
                "El peso debe ser un número positivo mayor a cero"
            );
        }

        this.#peso = valor;
    }

         // Contrato para hacer sonido (abstracción)
    hacerSonido() {
        throw new Error( `${this.constructor.name} debe implementar el método hacerSonido`);
    }
    //Metodo describir la mascota
    describir() {
        return `Soy ${this.nombre}, peso ${this.#peso} kg, Especie: ${this.especie}`;
    }
}

// Clases de Herencia
class Perro extends Mascota {
    constructor(nombre, peso, raza) {
        super(nombre, peso, "Perro");
        this.raza = raza;
    }

    hacerSonido() {
        return "Guau Guau";
    }

    //Cumplir el contrato de la clase padre describir
    describir() {
        return `${super.describir()}, Raza: ${this.raza}`;
    }
}

// Clases de Herencia de gato
class Gato extends Mascota {
    constructor(nombre,peso,deInterior){
        super(nombre, peso, "gato");
        this.deInterior = deInterior;
    }

    //Cumplir el contrato de la clase padre hacer sonido
    hacerSonido() {
        return "Miau Miau";
    }

    //Cumplir el contrato de la clase padre describir
    describir() {
        return `${super.describir()}, De Interior: ${this.deInterior ? "Sí" : "No"}`;
    }
}

//Clase de Herencia de Ave
class Ave extends Mascota {
    constructor(nombre, peso, puedeVolar){
        super(nombre, peso, "Ave");
        this.puedeVolar = puedeVolar;
    }

    //Cumplir el contrato de la clase padre hacer sonido
    hacerSonido() {
        return "Pío Pío";
    }

    //Cumplir el contrato de la clase padre describir
    describir() {
        return `${super.describir()}, ${this.puedeVolar ? "Puede Volar" : "No puede Volar"}`;
    }
}

//Clase Clínica
class Clinica {
    #pacientes = []; // lista privada de mascotas

    registrar(mascota) {
        if (!(mascota instanceof Mascota)) {
            throw new TypeError("Solo se pueden registrar mascotas");
        }
        this.#pacientes.push(mascota);
    }

    //Object(xasasas)
    get pacientes() {
        return [...this.#pacientes]; //imprimir una copia del arreglo para no exponer ell original
            }
}

//Datos de formulario de especie
const ETIQUETAS = {perro: "Raza", gato: "Vive en", ave: "Vuelo"};
const OPCIONES = {
    perro: ["Labrador", "Pastor Alemán", "Bulldog", "Beagle"],
    gato: ["De interior", "De calle"],
    ave: ["Puede volar", "No puede volar"]
};
//Un fábrica por especie
const fabricas = {
    perro: (nombre, peso, extra) => new Perro(nombre, peso, extra),
    gato: (nombre, peso, extra) => new Gato(nombre, peso, extra === "De interior"),
    ave: (nombre, peso, extra) => new Ave(nombre, peso, extra === "Puede volar")
};

//Conexión con el html
const clinica = new Clinica();
const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");
const selectTipo = document.getElementById("tipo");
const selectExtra = document.getElementById("extra");
const etiqueta = document.getElementById("etiqueta");

function cargarExtra(){
    const tipo = selectTipo.value;
    etiqueta.textContent = ETIQUETAS[tipo];
    selectExtra.innerHTML = "";
    for (const opcion of OPCIONES[tipo]) {
        const opt = document.createElement("option");
        opt.value = opcion;
        opt.textContent = opcion;
        selectExtra.appendChild(opt);
    }
}

function mostrar(tipo, text){
    mensaje.textContent = text;
    mensaje.className = tipo;
}

function dibujar(){
     lista.innerHTML = "";
      for (const m of clinica.pacientes) {
        const li = document.createElement("li");
        li.className = "Paciente";
        li.textContent = m.describir();

        const detalle = document.createElement("small");
        detalle.textContent = m.hacerSonido();
        li.appendChild(detalle);
        lista.appendChild(li);
    }

    total.textContent = `Total de pacientes: ${clinica.pacientes.length}`;
}
//activador del cambio de la lista selecionando gato,perro o ave
selectTipo.addEventListener("change", cargarExtra);

//Aqui se consolida la lógica del ejercicio para registrar mascotas
document.getElementById("formulario").addEventListener("submit", (e) => {
e.preventDefault();
const tipo = selectTipo.value;
const nombre = document.getElementById("nombre").value;
const peso = Number(document.getElementById("peso").value);

try {
      const mascota = fabricas[tipo](nombre, peso, selectExtra.value);
      clinica.registrar(mascota);
      dibujar();
      mostrar("exito", "Mascota registrada correctamente");
} catch (error) {
       mostrar("error", error.message);
}
});

cargarExtra();
dibujar();