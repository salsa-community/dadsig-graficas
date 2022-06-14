# Visualizaciones

## Guía de visualización

Para elegir la visualización adecuada para representar datos y por consiguiente elegir el componente adecuado de esta 
biblioteca, es primordial preguntarse _¿qué se quiere representar?_. 

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



