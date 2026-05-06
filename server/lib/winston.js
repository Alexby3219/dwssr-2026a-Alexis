//importamos biblioteca winston
import winston, { format } from 'winston';
import path from 'node:path';
import fs from 'node:fs';

//importamos biblioteca de transporte
import DailyRotateFile from 'winston-daily-rotate-file';
import { error, info, time } from 'node:console';

//Destructurando funciones fomat
const { combine, 
    timestamp,
    label, 
    printf, 
    colorize, 
    prettyPrint } = format;


//creamos directorio raiz
const __rootDir = path.resolve(process.cwd());

//creando ruta de logs
const logDir = path.join(__rootDir, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
}
// Definiendo esquema de colores 
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
};

//esquema de color a winston
winston.addColors(colors);

//creamos formatos de salida para los direfentes transportes
const myConsoleformat = combine(
    //AGREGANDO COLORES AL FORMATO
    colorize({ all: true }),
    // AGREGANDO UNA ETIQUETA A LOG 
    label({ label: '🎃'}),
    //AGREGANDO TIMESTAMP
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //AGREGANDO UN FORMATO PERSONALIZADO
    printf(info => `${info.timestamp} ${info.label} ${info.level}: ${info.message}`)
    );

const myFileFormat = combine(
    format.uncolorize(),
    timestamp(),
    format.json()
);

//creando transportes
const options = {
    errorFile: {
        level: 'error',
        filename: path.join(__rootDir, "logs", "error-%DATE%.log"),
        datePattern: 'YYYY-MM-DD',
        maxSize: '1048576',
        format: myFileFormat
}
};
