interface Estudiante {
    nombre: string;
    notas: number[];
}

interface ReporteEstudiante {
    nombre: string;
    promedio: number;
    estado: string;
}

let estudiantes: Estudiante[] = [];

function registrarEstudiante(nombre: string, notas: number[]) {
    let nuevoEstudiante: Estudiante = {
        nombre: nombre,
        notas: notas
    }
    estudiantes.push(nuevoEstudiante);
}

function calcularPromedio(notas: number[]): number {
    let suma = 0;
    for (let i = 0; i < notas.length; i++) {
        suma = suma + notas[i]!;
    }
    return suma / notas.length;
}

function determinarEstado(promedio: number): string {
    if (promedio >= 7) {
        return "Promocionado";
    } else if (promedio >= 4) {
        return "Aprobado";
    } else {
        return "Desaprobado";
    }
}

function generarReporte(): ReporteEstudiante[] {
    let reporte: ReporteEstudiante[] = [];
    for (let i = 0; i < estudiantes.length; i++) {
        let promedio = calcularPromedio(estudiantes[i]!.notas);
        let estado = determinarEstado(promedio);

        let datos: ReporteEstudiante = {
            nombre: estudiantes[i]!.nombre,
            promedio: promedio,
            estado: estado
        }
        reporte.push(datos);
    }
    return reporte;
}

// Ejemplo de uso
registrarEstudiante("Ana", [10, 8, 9]);
registrarEstudiante("Luis", [6, 5, 4]);
registrarEstudiante("Marta", [2, 3, 1]);

let reporteFinal = generarReporte();
console.log("=== Reporte de Notas ===");
for (let i = 0; i < reporteFinal.length; i++) {
    console.log(`${reporteFinal[i]!.nombre} - Promedio: ${reporteFinal[i]!.promedio.toFixed(2)} - Estado: ${reporteFinal[i]!.estado}`);
}
