---
sidebar: auto
---

# Documentación

Para generar la documentación de nuestros componentes utilizamos VuePress, que es un generador de sitios estáticos basado en Vue, con un template por default optimizado para escribir documentación técnica. Cada página generada por VuePress contiene un HTML estático prerenderizado, lo que nos permite tener una velocidad de carga óptima.
## ¿Cómo utilizar VuePress en este proyecto?

Supongamos que necesitamos crear la documentación de un nuevo componente llamado **"Donas"**:

1. Crear la carpeta contenedora de la documentación de este componente dentro de la carpeta `docs`:
  ```bash
	mkdir docs/donas
  ``` 
2. Dentro de esta carpeta, vamos a crear los archivos que van a contener la documentación de este componente:
* `README.md`: página inicial de la documentación de tu componente.
* `ejemplos.md`: aquí puedes agregar los ejemplos varios de usos del componente.
* Si tu componente requiere alguna otra documentación en especial, puedes agregar ese archivo con la terminación `.md`.

3. Ahora vamos a agregar este componente a nuestro menú principal. Necesitas modificar el archivo `docs/.vuepress/config.js`. Para esto, agregamos un nuevo elemento al arreglo `nav`:
  ```javascript
	
	module.exports = {
		//...
		themeConfig: {
			//...
			nav:[
				//...
				{
        			text: 'Donas',
        			link: '/donas/',
				},
			]
		}
	}
 ```
4. Ya tenemos nuestro componente en la navegación principal, ahora agregaremos la documentación del componente en la barra lateral. Es muy importante que agregues **todos los enlaces** de documentación que ya creamos en el paso 2.

```javascript
	
	module.exports = {
		//...
		themeConfig: {
			//...
			sidebar:{
				//...
				 '/donas/': [ // debe ser igual al valor de la propiedad `link` del paso anterior
					{
						title: 'Donas',
						collapsable: false,
						children: [
							'', // esto es equivalente al archivo README de la carpeta de tu componente
							'ejemplos',
							'componente', //equivale a `docs/donas/componente.md`
						]
					}
				],
			}
		}
	}
 ```
5. ¡Listo! Con estos pasos completados, ya puedes visualizar la documentación de tu nuevo componente. 