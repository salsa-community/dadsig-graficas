# Visualizaciones

## Guía de visualización

Para elegir la visualización adecuada para representar datos y por consiguiente elegir el componente adecuado de esta 
biblioteca, es primordial preguntarse _¿qué se quiere representar?_. De manera general la representación de datos se 
puede dividir en seis categorías: _Cambios temporales_, _Distribución de los datos_, _Comparaciones_, 
_Composiciones o parte de un todo_, _Relaciones entre variables_ y _Datos geográficos_. 

De esta manera se puede elegir la visualización adecuada. Cabe mencionar que distintos tipos de representaciones pueden 
funcionar para distintas visualizaciones y viceversa.

En la siguiente tabla se relacionan los componentes de visualización de esta biblioteca con los tipos de representación 
de datos y las visualizaciones.

<html>

<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}

thead {
  background-color: #c7e9b4;
  font-weight: bold;
}

.componente {
  font-family: "Lucida Console", "Courier New", monospace;
}

</style>

<table>
    <thead>
        <tr>
            <th>Representación</th>
            <th>Visualización</th>
            <th>Componente de visualización</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Cambios temporales</td>
            <td>Series de tiempo (líneas)</td>
            <td class="componente">&ltDaiSeries/&gt</td>
        </tr>
        <tr>
            <td rowspan=2>Distribución</td>
            <td>Diagrama de cajas y bigotes</td>
            <td class="componente">&ltDaiDiagramaCajas/&gt</td>
        </tr>
        <tr>
            <td>Barras (horizontales o verticales)</td>
            <td class="componente" rowspan=2>&ltDaiBarras/&gt</td>
        </tr>
        <tr>
            <td>Comparación</td>
            <td>Barras apiladas (horizontales o verticales)</td>
        </tr>
            <td>Composición (parte de un todo)</td>
            <td>Donas</td>
            <td class="componente">&ltDaiDonas/&gt</td>
        </tr>
        <tr>
            <td>Datos geográficos</td>
            <td>Mapas coropléticos</td>
            <td class="componente">&ltDaiMapas/&gt</td>
        </tr>
    </tbody>
</table>
</html>

Los componentes de visualización se pueden hallar en la carpeta `src/components/` de esta biblioteca.

Para mayor información acerca de como representar los datos se pueden consultar las siguientes fuentes:

* [How to Choose the Right Data Visualization](https://chartio.com/learn/charts/how-to-choose-data-visualization/)
* [Chart Chooser](https://www.storytellingwithdata.com/blog/2013/04/chart-chooser)
* [Choosing a good chart](https://extremepresentation.typepad.com/blog/2006/09/choosing_a_good.html) de A. Abela
* [Essential Chart Types for Data Visualization](https://chartio.com/learn/charts/essential-chart-types-for-data-visualization/)
* [The Data Visualization Catalogue](https://datavizcatalogue.com/index.html)


