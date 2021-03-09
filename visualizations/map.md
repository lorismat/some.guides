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
	// https://observablehq.com/@d3/bubble-map?collection=@observablehq/maps
	const margin = 10;

	let width = 700;
	let height = 500;
	
	const svg = d3.select(".dataviz")
	    .append("svg")
	    .attr("width", "100%")
	    .attr("height", "100%")
	    .attr("viewBox", `-${margin} -${margin} ${width+2*margin} ${height+2*margin}`)
	    .style("border", "2px solid #000")
	    .style("overflow", "visible");
	
	const mapset = d3.json("../static/data/trees/france-min.json")
	
	mapset.then(function(data) {
	
	const projection = d3.geoMercator()
	 	.center([48, 2])
	 	.scale(100);
	
	 path = d3.geoPath().projection(projection);
	
		// creating the mask
		svg.append("path")
	      .datum(topojson.feature(data, data.objects["france-min"]))
	      .attr("fill", "#ddd")
	      .attr("d", path);
	})
	```
