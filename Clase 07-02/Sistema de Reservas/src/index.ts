interface Reserva {
    numeroReserva: string,
    nombreHuesped: string,
    tipoHabitacion: string,
    fechaIngreso: string,
    fechaSalida: string,
    temporada: string,
    tipoHuesped: string,
    serviciosAdicionales: string[]
}

interface ReporteReserva {
    numeroReserva: string,
    nombreHuesped: string,
    tipoHabitacion: string,
    diasEstadia: number,
    costoBase: number,
    costoServicio: number,
    descuento: number,
    costoTotal: number
}

interface Habitaciones {
    tipoHabitacion: string,
    cantidadPersonas: number
}

let diasEstadiaTotales = 0;
let diasEstadiaPromedio = 0;
function calcularDiasEstadia(fechaIngreso:string, fechaSalida:string) {
    let dateIngreso = new Date(fechaIngreso);
    let dateSalida = new Date(fechaSalida);

    const diferenciaMs = dateSalida.getTime() - dateIngreso.getTime();

    const diferenciaDias = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

    diasEstadiaTotales = diasEstadiaTotales + diferenciaDias; 

    return diferenciaDias;
}

function calcularCostosBase(tipoHabitacion:string, temporada:string, dias:number):number {
    let costoBase:number = 0;

    if (temporada == "alta") {
        if (tipoHabitacion == "simple") {
            costoBase = dias * 120;
        } else if (tipoHabitacion == "doble") {
            costoBase = dias * 180;
        } else if (tipoHabitacion == "suite") {
            costoBase = dias * 350;
        }
    } else if (temporada == "baja") {
        if (tipoHabitacion == "simple") {
            costoBase = dias * 80;
        } else if (tipoHabitacion == "doble") {
            costoBase = dias * 120;
        } else if (tipoHabitacion == "suite") {
            costoBase = dias * 250;
        }
    }

    return costoBase;
}

function calcularCostoServicios(servicios:string[], dias:number):number {
    let costoServicios:number = 0;

    servicios.forEach(servicio => {
        if (servicio == "desayuno") {
            costoServicios = costoServicios + (25 * dias);
        } else if (servicio == "wifi") {
            costoServicios = costoServicios + (10 * dias);
        } else if (servicio == "spa") {
            costoServicios = costoServicios + (50 * dias);
        } else if (servicio == "estacionamiento") {
            costoServicios = costoServicios + (15 * dias);
        } else if (servicio == "lavanderia") {
            costoServicios = costoServicios + (20 * dias);
        }
    });

    return costoServicios;
}

function calcularDescuento(costoBase:number, costoServicios:number, tipoHuesped:string, dias:number):number {
    let montoTotal = costoBase + costoServicios;
    let montoDescuento = 0;

    if (tipoHuesped == "vip") {
        //Se le aplica 15%
        montoDescuento = montoTotal * 0.15;
    } else if (tipoHuesped == "corporativo") {
        //Se le aplica 10%
        montoDescuento = montoTotal * 0.10;
    }

    if (dias >= 7) {
        montoDescuento = montoDescuento + (montoTotal * 0.5);
    }

    return montoDescuento;
}

let reservasPorHabitacion = [0,0,0];

let ingresosTotales = 0;

let ingresosTempALTA = 0;
let ingresosTempBAJA = 0;

let reservasProcesadasContador = 0;
function procesarReservas(reservas: Reserva[]):ReporteReserva[] {
    let reservasProcesadas: ReporteReserva[] = [];

    reservas.forEach(reserva => {
        let diasReserva = calcularDiasEstadia(reserva.fechaIngreso, reserva.fechaSalida);
        let costoBaseReserva = calcularCostosBase(reserva.tipoHabitacion, reserva.temporada, diasReserva);
        let costoServiciosReserva = calcularCostoServicios(reserva.serviciosAdicionales, diasReserva);
        let cantidadDescuentoReserva = calcularDescuento(costoBaseReserva, costoServiciosReserva, reserva.tipoHuesped, diasReserva);
        let costoTotalReserva = costoBaseReserva + costoServiciosReserva - cantidadDescuentoReserva;

        ingresosTotales = ingresosTotales + costoTotalReserva;
        reservasProcesadasContador++;

        diasEstadiaPromedio = diasEstadiaTotales / reservas.length;

        if (reserva.temporada == "alta") {
            ingresosTempALTA = ingresosTempALTA + costoTotalReserva;
        } else if (reserva.temporada == "baja") {
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
        })

        console.log(`Reserva ${reserva.numeroReserva}`);
        console.log(`Huesped: ${reserva.nombreHuesped}`);
        console.log(`Habitacion: ${reserva.tipoHabitacion}`);
        console.log(`Estadia: ${diasReserva} dias (${reserva.fechaIngreso} - ${reserva.fechaSalida})`);
        console.log(`Temporada: ${reserva.temporada}`);
        console.log(`Tipo Huesped: ${reserva.tipoHuesped}`);

        let valorTipoHabitacion = 0;
        if (reserva.temporada == "alta") {
            if (reserva.tipoHabitacion == "simple") {
                valorTipoHabitacion = 120;
                reservasPorHabitacion[0]++;
            } else if (reserva.tipoHabitacion == "doble") {
                valorTipoHabitacion = 180;
                reservasPorHabitacion[1]++;
            } else if (reserva.tipoHabitacion == "suite") {
                valorTipoHabitacion = 350;
                reservasPorHabitacion[2]++;
            }
        } else if (reserva.temporada == "baja") {
            if (reserva.tipoHabitacion == "simple") {
                valorTipoHabitacion = 80;
                reservasPorHabitacion[0]++;
            } else if (reserva.tipoHabitacion == "doble") {
                valorTipoHabitacion = 120;
                reservasPorHabitacion[1]++;
            } else if (reserva.tipoHabitacion == "suite") {
                valorTipoHabitacion = 250;
                reservasPorHabitacion[2]++;
            }
        }

        console.log(`\nCosto Base: $${costoBaseReserva} (${diasReserva} dias x $${valorTipoHabitacion})`);
        if (reserva.serviciosAdicionales.length >= 1) {
            console.log(`Servicios: $${costoServiciosReserva} (${reserva.serviciosAdicionales})`);
        }

        if (reserva.tipoHuesped == "vip") {
            console.log(`\nDescuento por tipo de usuario:`);
            console.log(`Precio antes de descuento: $${costoBaseReserva + costoServiciosReserva}`)
            console.log(`Descuento VIP: $${cantidadDescuentoReserva} (15%)`);
        } else if (reserva.tipoHuesped == "corporativo") {
            console.log(`\nDescuento por tipo de usuario:`);
            console.log(`Precio antes de descuento: $${costoBaseReserva + costoServiciosReserva}`)
            console.log(`Descuento Corporativo: $${cantidadDescuentoReserva} (10%)`);
        }

        console.log(`TOTAL: $${costoTotalReserva} \n`);
        console.log(`------------------------------------------ \n`);
    });

    return reservasProcesadas;
}

const reservas: Reserva[] = [
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

function extenderReserva(reserva: Reserva, dias: number) {
    let nuevaDateSalida = new Date(reserva.fechaSalida);
    nuevaDateSalida.setDate(nuevaDateSalida.getDate() + dias);

    console.log(`Se cambio la fecha de salida.`);
    console.log(`Fecha original: ${reserva.fechaSalida}`);
    console.log(`Nueva fecha: ${nuevaDateSalida.toDateString()}`);

    reserva.fechaSalida = nuevaDateSalida.toDateString();
}

function generarReporte() {
    console.log("==========================================");
    console.log("     REPORTE DE RESERVAS HOTEL PEPITO     ");
    console.log("========================================== \n");

    procesarReservas(reservas);

    console.log(`INGRESOS TOTALES: ${ingresosTotales}`);
    console.log(`RESERVAS PROCESADAS: ${reservasProcesadasContador}`);
    console.log("\n========================================== \n");

    console.log(`Reservas por habitacion:`);
    console.log(`Simple: ${reservasPorHabitacion[0]}`);
    console.log(`Doble: ${reservasPorHabitacion[1]}`);
    console.log(`Suite: ${reservasPorHabitacion[2]}`);
    console.log("\n========================================== \n");

    console.log(`Dias promedio:`);
    console.log(`Dias de estadia totales: ${diasEstadiaTotales}`);
    console.log(`Cantidad de reservas: ${reservas.length}`);
    console.log(`Dias de estadia promedio: ${diasEstadiaPromedio}`);
    console.log("\n========================================== \n");

    console.log(`Ingresos por Temporada:`);
    console.log(`Alta: $${ingresosTempALTA}`);
    console.log(`Baja: $${ingresosTempBAJA}`);
    console.log("\n========================================== \n")
}

generarReporte();

extenderReserva(reservas[2], 5);