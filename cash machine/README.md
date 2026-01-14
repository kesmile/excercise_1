# Máquina Monedera 

Software para una maquina monedera que calcula la menor cantidad de billetes y monedas para entregar una cantidad dada en dólares.

## Descripción

Este programa recibe una cantidad en dólares y devuelve el desglose óptimo usando la menor cantidad posible de billetes y monedas.

## Modendas y Billetes Disponibles

**Billetes:** 500, 200, 100, 50, 20, 10, 5, 2, 1

**Monedas:** 0.50, 0.20, 0.10, 0.05, 0.02, 0.01

## Requisitos

- Node.js (versión 12 o superior)

## Instalación

1. Abrir una terminal en la carpeta del proyecto
2. Ejecutar:

Para iniciar el programa:

```bash
npm start
```

O directamente:

```bash
node index.js
```

## Ejemplo de Uso

```
Ingrese la cantidad en dólares (o "salir" para terminar): $999.43
Cantidad: $999.43
Denominaciones usadas:
  $2 x 2 = $4.00
  $5 x 1 = $5.00
  $20 x 2 = $40.00
  $50 x 1 = $50.00
  $200 x 2 = $400.00
  $500 x 1 = $500.00
  $0.2 x 2 = $0.40
  $0.02 x 1 = $0.02
  $0.01 x 1 = $0.01
Total de billetes/monedas: 13
Resultado:
[
  500 => 1,
  200 => 2,
  100 => 0,
  50 => 1,
  20 => 2,
  10 => 0,
  5 => 1,
  2 => 2,
  1 => 0,
  0.5 => 0,
  0.2 => 2,
  0.1 => 0,
  0.05 => 0,
  0.02 => 1,
  0.01 => 1,
]

```


## Comandos Disponibles

- Ingrese cualquier cantidad numérica para procesarla
- Escriba "salir", "exit" o "q" para cerrar el programa

## Estructura del Proyecto

```
cash machine/
├── index.js          # Archivo principal con la lógica del cajero
├── package.json      # Configuración del proyecto
└── README.md         # Este archivo
```

## Autor

Kelvi Padilla

## Licencia

ISC
