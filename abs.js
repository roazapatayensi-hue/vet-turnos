
// Clase Encapsulamiento + Abstracción
class Mascota {
    #peso;

    constructor(nombre, peso) {
        if (new.target === Mascota) {
            throw new TypeError(
                "No se puede instanciar la clase Mascota directamente"
            );
        }

        this.nombre = nombre;
        this.peso = peso;
    }

    // Getter para acceder al peso privado
    get peso() {
        return this.#peso;
    }

    // Setter para modificar y validar el peso
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
        throw new Error(
            `${this.constructor.name} debe implementar el método hacerSonido`
        );
    }
}

// Implementación de clases hijas por herencia
class Perro extends Mascota {
    hacerSonido() {
        return "Guau Guau";
    }
}

class Gato extends Mascota {
    hacerSonido() {
        return "Miau Miau";
    }
}

// Implementación de lista privada de mascotas
class Clinica {
    #pacientes = [];

    registrar(mascota) {
        if (!(mascota instanceof Mascota)) {
            throw new TypeError("Solo se pueden registrar mascotas");
        }

        this.#pacientes.push(mascota);
    }

    // Devuelve una copia del arreglo
    get pacientes() {
        return [...this.#pacientes];
    }
}

// Conexión con el HTML principal
const clinica = new Clinica();

const lista = document.getElementById("lista");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("total");

// Función para mostrar mensajes
function mostrar(tipo, texto) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

// Función para dibujar la lista de mascotas
function dibujar() {
    lista.innerHTML = "";

    for (const m of clinica.pacientes) {
        const li = document.createElement("li");
        li.className = "Paciente";

        li.textContent = `${m.constructor.name}: ${m.nombre} - ${m.peso} kg.`;

        const detalle = document.createElement("small");
        detalle.textContent = m.hacerSonido();

        li.appendChild(detalle);
        lista.appendChild(li);
    }

    total.textContent = `Total de pacientes: ${clinica.pacientes.length}`;
}

// Registro de mascotas mediante el formulario
document.getElementById("formulario").addEventListener("submit", function(e) {

    e.preventDefault();

    const tipo = document.getElementById("tipo").value;
    const nombre = document.getElementById("nombre").value;
    const peso = Number(document.getElementById("peso").value);

    try {
        const mascota = tipo === "perro"
            ? new Perro(nombre, peso)
            : new Gato(nombre, peso);

        clinica.registrar(mascota);

        dibujar();

        mostrar("ok", `Mascota ${nombre} registrada correctamente`);

    } catch (error) {
        mostrar("error", error.message);
    }
});
