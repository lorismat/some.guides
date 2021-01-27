# Map setup with `d3.js`

- go to [Natural Earth](https://www.naturalearthdata.com/downloads/) and download a file of the world with the accuracy and admin levels you'd like
- import the `.shp` to **QGIS**
- Open up the attributes tables and filter it visually, then copy/paste the query
- right click on your layer and filter it with the statement
- right click and export: select only attributes you'd like, as a `.geojson` file
- import as a geo df: `gpd.read_file('../../data/ffl/your_map.geojson')`
- merge/join with your original dataframe: one line per geo (group & pivot accordingly)
- save your df as a `.json` file:  

	```
	gdf = gpd.GeoDataFrame(df, geometry='geometry')
	gdf.to_file("/path/to/map.json", driver='GeoJSON')
- convert this map to a `topojson` file to make it `d3.js` friendly with [Map Shaper](https://mapshaper.org/)
- load the data with `d3.json()`
- make sure you call the topojson lib `<script src="https://unpkg.com/topojson-client@3"></script>`  
- Then set: project, path and svg:  

	```
	const projection = d3.geoMercator()
		.center([108, 23])
		.scale(650);  

	path = d3.geoPath().projection(projection);

	svg.append("g")
 	           .selectAll("path")
 	           .data(topojson.feature(data, data.objects.map).features)
 	           .join("path")
 	             .attr("fill", "#F1F1F1")
 	             .attr("d", path)
