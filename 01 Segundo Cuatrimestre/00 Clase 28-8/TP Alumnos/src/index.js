var estudiantes = [];
function registrarEstudiante(nombre, notas) {
    var nuevoEstudiante = {
        nombre: nombre,
        notas: notas
    };
    estudiantes.push(nuevoEstudiante);
}
function calcularPromedio(notas) {
    var suma = 0;
    for (var i = 0; i < notas.length; i++) {
        suma = suma + notas[i];
    }
    return suma / notas.length;
}
function determinarEstado(promedio) {
    if (promedio >= 7) {
        return "Promocionado";
    }
    else if (promedio >= 4) {
        return "Aprobado";
    }
    else {
        return "Desaprobado";
    }
}
function generarReporte() {
    var reporte = [];
    for (var i = 0; i < estudiantes.length; i++) {
        var promedio = calcularPromedio(estudiantes[i].notas);
        var estado = determinarEstado(promedio);
        var datos = {
            nombre: estudiantes[i].nombre,
            promedio: promedio,
            estado: estado
        };
        reporte.push(datos);
    }
    return reporte;
}
// Ejemplo de uso
registrarEstudiante("Ana", [10, 8, 9]);
registrarEstudiante("Luis", [6, 5, 4]);
registrarEstudiante("Marta", [2, 3, 1]);
var reporteFinal = generarReporte();
console.log("=== Reporte de Notas ===");
for (var i = 0; i < reporteFinal.length; i++) {
    console.log("".concat(reporteFinal[i].nombre, " - Promedio: ").concat(reporteFinal[i].promedio.toFixed(2), " - Estado: ").concat(reporteFinal[i].estado));
}
