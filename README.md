> [!NOTE]
> Useful information that users should know, even when skimming content.

# 📌 Documentación sobre la Implementación del Componente

Esta guía proporciona instrucciones detalladas para instalar y configurar correctamente el paquete **components-functions-grafosoft** en tu proyecto.

## 🚀 1. Instalación de Paquetes Necesarios  

Para garantizar el correcto funcionamiento del paquete, es necesario contar con las siguientes dependencias instaladas en tu proyecto:

json
{
  "next": ">=14.1.0",
  "next-themes": ">=0.2.1",
  "postcss": ">=8.4.31",
  "react": ">=18.2.0",
  "react-dom": ">=18.2.0",
  "tailwind-variants": ">=0.1.20",
  "tailwindcss": ">=3.4.3",
  "typescript": ">=5.0.4"
}


### 📌 Instalación rápida de dependencias  
Ejecuta el siguiente comando en la terminal de tu proyecto para instalar todas las dependencias necesarias automáticamente:  

sh
npm install next@latest next-themes@latest postcss@latest react@latest react-dom@latest tailwind-variants@latest tailwindcss@latest typescript@latest


## 📦 2. Instalación del Paquete  

Para agregar **components-functions-grafosoft** a tu proyecto, ejecuta el siguiente comando en la terminal:  

sh
npm i components-functions-grafosoft


Esto descargará e integrará el paquete en tu entorno de desarrollo.

---

Si necesitas más detalles sobre su uso o configuración, revisa la documentación oficial o consulta el código fuente del paquete. 🚀

# Componentes y Funciones

## Componentes
- `TaxView`: Componente que lista y agrega impuestos a un producto
- `TableBuyComponent`: Tabla de compra y venta de productos
- `TableAccounting`: Tabla para la realización de Nóminas y Contabilidad (Movimientos contables)
- `SearchSelectedProduct`: Componentes de búsqueda de productos
- `AutoComplete`: AutoComplete
- `WarningInvoice`: Alerta reutilizable

## Funciones
- `TruncateText`: Trunca un texto dependiendo del tamaño especificado por los parámetros
- `calculateProductBase`: Calcula la base del producto
- `calculateTax`: Calcula el impuesto de un producto vasado en la base
- `flattenObject`: Función para convertir un objeto a un objeto plano
- `unflattenObject`: Función para convertir objeto plano a un objeto 
- `formatNumToStr`: Formatea un número con puntos y comas (Retorna una cadena)
- `formatNumToNum`: Formatea un número con puntos y comas (Retorna un Numero (Float))
- `formatNumCompact`: Formatea un número solo con puntos para separar  (Retorna una cadena)
- `generateGuid`: Crea un GUID  (Globally Unique Identifier)
- `formatAccoutingProduct`: Arregla los elementos para que puedan ser utilizados por el componente de 'TableAccounting'


## Licencia
