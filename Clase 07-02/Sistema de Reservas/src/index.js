var diasEstadiaTotales = 0;
var diasEstadiaPromedio = 0;
function calcularDiasEstadia(fechaIngreso, fechaSalida) {
    var dateIngreso = new Date(fechaIngreso);
    var dateSalida = new Date(fechaSalida);
    var diferenciaMs = dateSalida.getTime() - dateIngreso.getTime();
    var diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    diasEstadiaTotales = diasEstadiaTotales + diferenciaDias;
    return diferenciaDias;
}
function calcularCostosBase(tipoHabitacion, temporada, dias) {
    var costoBase = 0;
    if (temporada == "alta") {
        if (tipoHabitacion == "simple") {
            costoBase = dias * 120;
        }
        else if (tipoHabitacion == "doble") {
            costoBase = dias * 180;
        }
        else if (tipoHabitacion == "suite") {
            costoBase = dias * 350;
        }
    }
    else if (temporada == "baja") {
        if (tipoHabitacion == "simple") {
            costoBase = dias * 80;
        }
        else if (tipoHabitacion == "doble") {
            costoBase = dias * 120;
        }
        else if (tipoHabitacion == "suite") {
            costoBase = dias * 250;
        }
    }
    return costoBase;
}
function calcularCostoServicios(servicios, dias) {
    var costoServicios = 0;
    servicios.forEach(function (servicio) {
        if (servicio == "desayuno") {
            costoServicios = costoServicios + (25 * dias);
        }
        else if (servicio == "wifi") {
            costoServicios = costoServicios + (10 * dias);
        }
        else if (servicio == "spa") {
            costoServicios = costoServicios + (50 * dias);
        }
        else if (servicio == "estacionamiento") {
            costoServicios = costoServicios + (15 * dias);
        }
        else if (servicio == "lavanderia") {
            costoServicios = costoServicios + (20 * dias);
        }
    });
    return costoServicios;
}
function calcularDescuento(costoBase, costoServicios, tipoHuesped, dias) {
    var montoTotal = costoBase + costoServicios;
    var montoDescuento = 0;
    if (tipoHuesped == "vip") {
        //Se le aplica 15%
        montoDescuento = montoTotal * 0.15;
    }
    else if (tipoHuesped == "corporativo") {
        //Se le aplica 10%
        montoDescuento = montoTotal * 0.10;
    }
    if (dias >= 7) {
        montoDescuento = montoDescuento + (montoTotal * 0.5);
    }
    return montoDescuento;
}
var reservasPorHabitacion = [0, 0, 0];
var ingresosTotales = 0;
var ingresosTempALTA = 0;
var ingresosTempBAJA = 0;
var reservasProcesadasContador = 0;
function procesarReservas(reservas) {
    var reservasProcesadas = [];
    reservas.forEach(function (reserva) {
        var diasReserva = calcularDiasEstadia(reserva.fechaIngreso, reserva.fechaSalida);
        var costoBaseReserva = calcularCostosBase(reserva.tipoHabitacion, reserva.temporada, diasReserva);
        var costoServiciosReserva = calcularCostoServicios(reserva.serviciosAdicionales, diasReserva);
        var cantidadDescuentoReserva = calcularDescuento(costoBaseReserva, costoServiciosReserva, reserva.tipoHuesped, diasReserva);
        var costoTotalReserva = costoBaseReserva + costoServiciosReserva - cantidadDescuentoReserva;
        ingresosTotales = ingresosTotales + costoTotalReserva;
        reservasProcesadasContador++;
        diasEstadiaPromedio = diasEstadiaTotales / reservas.length;
        if (reserva.temporada == "alta") {
            ingresosTempALTA = ingresosTempALTA + costoTotalReserva;
        }
        else if (reserva.temporada == "baja") {
            ingresosTempBAJA = ingresosTempBAJA + costoTotalReserva;
        }
        reservasProcesadas.push({
            numeroReserva: reserva.numeroReserva,
            nombreHuesped: reserva.nombreHuesped,
            tipoHabitacion: reserva.tipoHabitacion,
            diasEstadia: diasReserva,
            costoBase: costoBaseReserva,
            costoServicio: costoServiciosReserva,
            descuento: cantidadDescuentoReserva,
            costoTotal: costoTotalReserva
        });
        console.log("Reserva ".concat(reserva.numeroReserva));
        console.log("Huesped: ".concat(reserva.nombreHuesped));
        console.log("Habitacion: ".concat(reserva.tipoHabitacion));
        console.log("Estadia: ".concat(diasReserva, " dias (").concat(reserva.fechaIngreso, " - ").concat(reserva.fechaSalida, ")"));
        console.log("Temporada: ".concat(reserva.temporada));
        console.log("Tipo Huesped: ".concat(reserva.tipoHuesped));
        var valorTipoHabitacion = 0;
        if (reserva.temporada == "alta") {
            if (reserva.tipoHabitacion == "simple") {
                valorTipoHabitacion = 120;
                reservasPorHabitacion[0]++;
            }
            else if (reserva.tipoHabitacion == "doble") {
                valorTipoHabitacion = 180;
                reservasPorHabitacion[1]++;
            }
            else if (reserva.tipoHabitacion == "suite") {
                valorTipoHabitacion = 350;
                reservasPorHabitacion[2]++;
            }
        }
        else if (reserva.temporada == "baja") {
            if (reserva.tipoHabitacion == "simple") {
                valorTipoHabitacion = 80;
                reservasPorHabitacion[0]++;
            }
            else if (reserva.tipoHabitacion == "doble") {
                valorTipoHabitacion = 120;
                reservasPorHabitacion[1]++;
            }
            else if (reserva.tipoHabitacion == "suite") {
                valorTipoHabitacion = 250;
                reservasPorHabitacion[2]++;
            }
        }
        console.log("\nCosto Base: $".concat(costoBaseReserva, " (").concat(diasReserva, " dias x $").concat(valorTipoHabitacion, ")"));
        if (reserva.serviciosAdicionales.length >= 1) {
            console.log("Servicios: $".concat(costoServiciosReserva, " (").concat(reserva.serviciosAdicionales, ")"));
        }
        if (reserva.tipoHuesped == "vip") {
            console.log("\nDescuento por tipo de usuario:");
            console.log("Precio antes de descuento: $".concat(costoBaseReserva + costoServiciosReserva));
            console.log("Descuento VIP: $".concat(cantidadDescuentoReserva, " (15%)"));
        }
        else if (reserva.tipoHuesped == "corporativo") {
            console.log("\nDescuento por tipo de usuario:");
            console.log("Precio antes de descuento: $".concat(costoBaseReserva + costoServiciosReserva));
            console.log("Descuento Corporativo: $".concat(cantidadDescuentoReserva, " (10%)"));
        }
        console.log("TOTAL: $".concat(costoTotalReserva, " \n"));
        console.log("------------------------------------------ \n");
    });
    return reservasProcesadas;
}
var reservas = [
    {
        numeroReserva: "RSV001",
        nombreHuesped: "Lucía Fernández",
        tipoHabitacion: "doble",
        fechaIngreso: "2025-07-10",
        fechaSalida: "2025-07-15",
        temporada: "alta",
        tipoHuesped: "regular",
        serviciosAdicionales: ["desayuno", "wifi"]
    },
    {
        numeroReserva: "RSV002",
        nombreHuesped: "Carlos Gómez",
        tipoHabitacion: "suite",
        fechaIngreso: "2025-08-05",
        fechaSalida: "2025-08-12",
        temporada: "alta",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "wifi", "spa", "estacionamiento"]
    },
    {
        numeroReserva: "RSV003",
        nombreHuesped: "María López",
        tipoHabitacion: "simple",
        fechaIngreso: "2025-09-01",
        fechaSalida: "2025-09-03",
        temporada: "baja",
        tipoHuesped: "regular",
        serviciosAdicionales: ["wifi"]
    },
    {
        numeroReserva: "RSV004",
        nombreHuesped: "Empresa TechCorp",
        tipoHabitacion: "doble",
        fechaIngreso: "2025-07-20",
        fechaSalida: "2025-07-25",
        temporada: "alta",
        tipoHuesped: "corporativo",
        serviciosAdicionales: ["wifi", "estacionamiento"]
    },
    {
        numeroReserva: "RSV005",
        nombreHuesped: "Javier Méndez",
        tipoHabitacion: "suite",
        fechaIngreso: "2025-06-10",
        fechaSalida: "2025-06-15",
        temporada: "baja",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "spa", "wifi"]
    },
    {
        numeroReserva: "RSV006",
        nombreHuesped: "Sofía Morales",
        tipoHabitacion: "simple",
        fechaIngreso: "2025-08-01",
        fechaSalida: "2025-08-05",
        temporada: "alta",
        tipoHuesped: "regular",
        serviciosAdicionales: ["desayuno"]
    },
    {
        numeroReserva: "RSV007",
        nombreHuesped: "Lucas Rivas",
        tipoHabitacion: "doble",
        fechaIngreso: "2025-05-18",
        fechaSalida: "2025-05-20",
        temporada: "baja",
        tipoHuesped: "regular",
        serviciosAdicionales: []
    },
    {
        numeroReserva: "RSV008",
        nombreHuesped: "Ana Castillo",
        tipoHabitacion: "suite",
        fechaIngreso: "2025-12-24",
        fechaSalida: "2025-12-28",
        temporada: "alta",
        tipoHuesped: "vip",
        serviciosAdicionales: ["desayuno", "wifi", "spa", "lavanderia"]
    },
    {
        numeroReserva: "RSV009",
        nombreHuesped: "Consultora GlobalBiz",
        tipoHabitacion: "doble",
        fechaIngreso: "2025-10-01",
        fechaSalida: "2025-10-07",
        temporada: "baja",
        tipoHuesped: "corporativo",
        serviciosAdicionales: ["wifi", "estacionamiento", "lavanderia"]
    },
    {
        numeroReserva: "RSV010",
        nombreHuesped: "Valentina Herrera",
        tipoHabitacion: "simple",
        fechaIngreso: "2025-07-05",
        fechaSalida: "2025-07-07",
        temporada: "alta",
        tipoHuesped: "regular",
        serviciosAdicionales: ["wifi", "desayuno"]
    }
];
function extenderReserva(reserva, dias) {
    var nuevaDateSalida = new Date(reserva.fechaSalida);
    nuevaDateSalida.setDate(nuevaDateSalida.getDate() + dias);
    console.log("Se cambio la fecha de salida.");
    console.log("Fecha original: ".concat(reserva.fechaSalida));
    console.log("Nueva fecha: ".concat(nuevaDateSalida.toDateString()));
    reserva.fechaSalida = nuevaDateSalida.toDateString();
}
function generarReporte() {
    console.log("==========================================");
    console.log("     REPORTE DE RESERVAS HOTEL PEPITO     ");
    console.log("========================================== \n");
    procesarReservas(reservas);
    console.log("INGRESOS TOTALES: ".concat(ingresosTotales));
    console.log("RESERVAS PROCESADAS: ".concat(reservasProcesadasContador));
    console.log("\n========================================== \n");
    console.log("Reservas por habitacion:");
    console.log("Simple: ".concat(reservasPorHabitacion[0]));
    console.log("Doble: ".concat(reservasPorHabitacion[1]));
    console.log("Suite: ".concat(reservasPorHabitacion[2]));
    console.log("\n========================================== \n");
    console.log("Dias promedio:");
    console.log("Dias de estadia totales: ".concat(diasEstadiaTotales));
    console.log("Cantidad de reservas: ".concat(reservas.length));
    console.log("Dias de estadia promedio: ".concat(diasEstadiaPromedio));
    console.log("\n========================================== \n");
    console.log("Ingresos por Temporada:");
    console.log("Alta: $".concat(ingresosTempALTA));
    console.log("Baja: $".concat(ingresosTempBAJA));
    console.log("\n========================================== \n");
}
generarReporte();
extenderReserva(reservas[2], 5);
