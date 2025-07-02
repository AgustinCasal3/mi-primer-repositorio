let librosEstudiantes:number = 0;
let librosProfesores:number = 0;
let librosOtros:number = 0;

let multasCategorias = [0,0,0];

interface Libro {
    titulo: string,
    autor: string,
    isbn: number,
    categoria: string,
    fechaPrestamo: string,
    fechaDevolucionPrevista: string,
    tipoUsuario: string
}

interface ReporteMulta {
    titulo: string,
    diasRetraso: number,
    multa: number,
    tipoUsuario: string
}

function calcularDiasRetraso(fechaDevolucionPrevista: string): number {
  // Convertimos los strings a objetos Date
  const fechaPrevista = new Date(fechaDevolucionPrevista);
  const fechaHoy = new Date();

  // Calculamos la diferencia en milisegundos
  const diferenciaMs = fechaHoy.getTime() - fechaPrevista.getTime();

  // Convertimos a días
  const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

  // Si la diferencia es menor a 0, no hay retraso
  return diferenciaDias > 0 ? diferenciaDias : 0;
}

let montoTotalMultas = 0;
let librosRetrasados = 0;

function calcularMulta(diasRetraso: number, tipoUsuario: string): number {
    let montoMulta: number = 0;

    if (diasRetraso <= 0) {
        return 0;
    } else {
        if (tipoUsuario == "Estudiante") {
            librosRetrasados++;
            montoMulta = diasRetraso * 50;
        } else if (tipoUsuario == "Profesor") {
            librosRetrasados++;
            montoMulta = diasRetraso * 30;
        } else {
            librosRetrasados++;
            montoMulta = diasRetraso * 100;
        }

    }

    montoTotalMultas = montoTotalMultas + montoMulta;

    return montoMulta;
}

function procesarBiblioteca(libros: Libro[]): ReporteMulta[] {
    let multas: ReporteMulta[] = [];

    libros.forEach(libro => {
        const diasRetraso = calcularDiasRetraso(libro.fechaDevolucionPrevista);
        const multa = calcularMulta(diasRetraso, libro.tipoUsuario);

        multas.push({   
            titulo: libro.titulo, 
            diasRetraso: diasRetraso, 
            multa: multa,
            tipoUsuario: libro.tipoUsuario 
        });

        if (libro.tipoUsuario == "Estudiante") {
            librosEstudiantes++;
        } else if (libro.tipoUsuario == "Profesor") {
            librosProfesores++;
        } else {
            librosOtros++;
        }

        console.log(`\nLibro: ${libro.titulo}`);
        console.log(`Autor: ${libro.autor}`);
        console.log(`Usuario: ${libro.tipoUsuario}`);

        if (diasRetraso <= 0) {
            console.log(`Estado: Sin retraso.`);
        } else {
            console.log(`Dias de retraso: ${diasRetraso}`);
            console.log(`Multa: ${multa}`);

            if (libro.categoria == "Electronica") {
                multasCategorias[0] = multasCategorias[0] + multa;
            } else if (libro.categoria == "Arte") {
                multasCategorias[1] = multasCategorias[1] + multa;
            } else if (libro.categoria == "Hardware") {
                multasCategorias[2] = multasCategorias[2] + multa;
            }
        }
    });

    return multas;
}

const librosEnPrestamo: Libro[] = [
  {
    titulo: "Circuitos Eléctricos Básicos",
    autor: "John D. Irwin",
    isbn: 9781118539293,
    fechaPrestamo: "2025-06-01",
    fechaDevolucionPrevista: "2025-06-15", // Tarde
    tipoUsuario: "Estudiante",
    categoria: "Electronica"
  },
  {
    titulo: "Teoría del Arte Contemporáneo",
    autor: "Terry Smith",
    isbn: 9780520276220,
    fechaPrestamo: "2025-06-10",
    fechaDevolucionPrevista: "2025-07-10",
    tipoUsuario: "Profesor",
    categoria: "Arte"
  },
  {
    titulo: "Diseño Electrónico Digital",
    autor: "M. Morris Mano",
    isbn: 9780131989269,
    fechaPrestamo: "2025-05-20",
    fechaDevolucionPrevista: "2025-06-20", // Tarde
    tipoUsuario: "Estudiante",
    categoria: "Electronica"
  },
  {
    titulo: "Historia del Arte en Occidente",
    autor: "Hugh Honour",
    isbn: 9788497853712,
    fechaPrestamo: "2025-06-15",
    fechaDevolucionPrevista: "2025-07-15",
    tipoUsuario: "Profesor",
    categoria: "Arte"
  },
  {
    titulo: "Manual de Reparación de PC",
    autor: "Scott Mueller",
    isbn: 9780789750000,
    fechaPrestamo: "2025-06-05",
    fechaDevolucionPrevista: "2025-06-30", // Tarde
    tipoUsuario: "Investigador",
    categoria: "Hardware"
  },
  {
    titulo: "Introducción a la Electrónica",
    autor: "Earl Gates",
    isbn: 9781305505996,
    fechaPrestamo: "2025-06-22",
    fechaDevolucionPrevista: "2025-07-20",
    tipoUsuario: "Estudiante",
    categoria: "Electronica"
  },
  {
    titulo: "El Arte de la Ilustración",
    autor: "Andrew Loomis",
    isbn: 9788499088013,
    fechaPrestamo: "2025-06-18",
    fechaDevolucionPrevista: "2025-07-18",
    tipoUsuario: "Profesor",
    categoria: "Arte"
  },
  {
    titulo: "Hardware de Computadoras",
    autor: "Jean Andrews",
    isbn: 9781285096551,
    fechaPrestamo: "2025-05-30",
    fechaDevolucionPrevista: "2025-06-25", // Tarde
    tipoUsuario: "Estudiante",
    categoria: "Hardware"
  },
  {
    titulo: "Arte y percepción visual",
    autor: "Rudolf Arnheim",
    isbn: 9780520243833,
    fechaPrestamo: "2025-06-10",
    fechaDevolucionPrevista: "2025-07-10",
    tipoUsuario: "Profesor",
    categoria: "Arte"
  },
  {
    titulo: "Fundamentos de Hardware",
    autor: "Charles S. Parker",
    isbn: 9780136370993,
    fechaPrestamo: "2025-06-01",
    fechaDevolucionPrevista: "2025-06-20", // Tarde
    tipoUsuario: "Estudiante",
    categoria: "Hardware"
  }
];

function generarReporte() {
    console.log("==============================================");
    console.log("            REPORTE DE BIBLIOTECA");
    console.log("==============================================");
    
    procesarBiblioteca(librosEnPrestamo);
    
    console.log(`\n TOTAL DE MULTAS: $${montoTotalMultas}`);
    console.log(`LIBROS CON RETRASO: ${librosRetrasados} de ${librosEnPrestamo.length}`);
    console.log("\n============================================== \n");

    console.log(`Libros por Usuarios `);
    console.log(`Estudiantes: ${librosEstudiantes}`);
    console.log(`Profesores: ${librosProfesores}`);
    console.log(`Otros: ${librosOtros}`);
    console.log("\n============================================== \n");

    if (multasCategorias[0] > 0 || multasCategorias[1] > 0 || multasCategorias[2] > 0) {
        console.log(`Multas por Categoria `);
        if (multasCategorias[0] > 0) {
            console.log(`Electronica: $${multasCategorias[0]}`);
        }
    
        if (multasCategorias[1] > 0) {
            console.log(`Arte: $${multasCategorias[1]}`);
        }
    
        if (multasCategorias[2] > 0) {
            console.log(`Hardware: $${multasCategorias[2]}`);
        }
    }

}

generarReporte();