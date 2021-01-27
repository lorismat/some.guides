# Introduction

## Install vue-cli

```
npm install -g @vue/cli
```  
At least `v3.0.0` to import files fro the `public/` folder.  

Create your project:
```
vue create <YOUR-PROJECT>
```  

Start the server:
```
npm run serve
```

## Resources

## External Doc on Vue

- [Vue Doc](https://vuejs.org/)
- [VueCli](https://cli.vuejs.org/)
- [Vue Dev Tools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## External doc on deployment

- [Flask with Vue](https://stackoverflow.com/questions/46214132/how-can-i-combine-vue-js-with-flask)
- [Vue Article from Full Stack Python](https://www.fullstackpython.com/vuejs.html)

## Additional Doc

- [Router with Vue.js](https://saidhayani.medium.com/understand-routing-in-vue-js-with-examples-6da96979c8e3)
- [Vue explained video](https://www.youtube.com/watch?v=Wy9q22isx3U)

# Personal notes

## On install

### Some default config:

Some errors & warnings by default can be removed: in the `package.json` file, you can add the following:  
```
"rules": {
	"no-console": "off",
 	"no-unused-vars": "off" 
}
```

### Dev vs Prod

## Access local files

Much easier with `vue-cli v3.0.0` at least.  
Your static files should be in the `public/` folder, and can be called as follow, with `d3` for instance:  
```
mounted() {
		let dataset = d3.csv("export.csv");
		dataset.then(function(data) {
			console.log(data);
		});
}
```  

## On concepts and methods

### Specific methods to remember

- the `created` method will trigger functions once the component is created
- the `mounted` method is triggered on load

### Reminder of some concept

- Binding data to another component: 
	- first, retrieve the data and pass it to the app with `this.your_data_object = value_to_put_in_your_data_object`
	- second, bind it to your component `<MyComponent v-bind:your_data_object="your_data_object" />`
	- third, in your `MyComponent.vue`, set the data as a prop `prop: ["your_data_object"]` and specify your property properly (depending on whether it's a String, Array, Object etc.
	- fourth, call your component in the code, for example with a v-for directive.  

**Full example:**

```
// Main app script:

export default {
  name: 'App',
  components: {
		AgeDistribution
  },
	data() {
		return {
			dataset: {}
		}
	},
	created() {
		axios.get('https://spreadsheets.google.com/feeds/list/1bcJle1TljJp4t9GdIsEUBRddsSpOZWxz0cVioVI22uU/1/public/values?alt=json')
			.then(res => this.dataset = res.data.feed.entry)
			.catch(err => console.log(err));
	}
}
```

	<!-- Main app template -->
	<div class="container">
		<AgeDistribution v-bind:dataset="dataset" />
	</div>

	<!--  Component script + template -->
	<template>
		<div class="distribution">
			<div v-for="age in dataset">
				<p>{{ age.gsx$age.$t }}</p>
			</div>
		</div>
	</template>

	<script>
	import * as d3 from 'd3'

	export default {
		name: 'AgeDistribution',
		props: ["dataset"]
	}

	</script>

- add watcher to get the freshest data (after a api response upon creation for example). [Here is the official doc on watchers](https://vuejs.org/v2/guide/computed.html) and [here is a d3 implemntation article](https://www.sitepoint.com/vue-d3-data-visualization-intro/). More on watchers and `d3` below.
- when calling a function from `methods` in other objects, make sure to add `this.` prior to the function. Eg:
	```
	export default {
	name: 'AgeDistribution',
	props: ["dataset"],
	watch: {
		dataset(val) {
			this.temp(val);
		}
	},
	methods: {
		temp(x) { console.log(x) }
	}
	}
	```
- **watchers** applied with `d3`. Here is the workflow:
	- **retrieve** your data on the App component, with `mounted()` and try it out (from APIs or static files). Example:
		```
		mounted() {
		let dataset = d3.csv("export.csv");
		this.dts = dataset;
		dataset.then(function(data) {
			console.log("home", data);
		});
		}
		```
		It is retrieved, and the promise itself is set as a `prop`.  
	- **Bind** it to your secondary component: `<GraphTop :dts="dts" class="comp"/>`
	- **Catch** the promise in your secondary component with a watcher:
		```
		watch: {
			dts(val) {
			val.then(function(data) {
				console.log(data);
			})
		}}

## On external packages

### Some setup 

- `axios`, `npm i axios` to facilitate api calls
- after `npm i d3`, you should call it this way: `import * as d3 from 'd3'` in any component requiring d3. On top of this, [here is a full d3 setup article](https://www.sitepoint.com/vue-d3-data-visualization-intro/).
- bootstrap:

```
npm install vue bootstrap-vue bootstrap
```  

To call, in the `main.js` file:  
```
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```  


### Google API

- If the spreadsheet is public, [this article is really straightforward](https://albertauyeung.github.io/2020/04/26/vuejs-google-sheets.html)  
This code will retrieve the spreadsheet as a .json file:  
```
export default {
  name: 'App',
  components: {
    Header,
		Intro,
		Average
  },
	// below is a specific method, triggered once the component is created
	created() {
		axios.get('https://spreadsheets.google.com/feeds/list/1eNmGC4mZpIGx9vyL_Y0m0wEvsnlREGYoj04LH9atoTg/1/public/values?alt=json')
			.then(res => console.log(res.data))
			.catch(err => console.log(err));
	}
}
```

- If the spreadsheet is private, first generate your `credentials.json` file, check [here for google api v4](https://developers.google.com/sheets/api/quickstart/nodejs) and make sure to select `Desktop`


# External tools

- [json placeholder](https://jsonplaceholder.typicode.com/users) - emulate fake apis
- [google spreadsheet API](https://developers.google.com/sheets/api/quickstart/nodejs) - node.js, select`Desktop App` to generate credentials


