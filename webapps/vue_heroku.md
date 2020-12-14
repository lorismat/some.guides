# Introduction

## Resources

[This blog article from Nick Manning](https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489) sums up the process to create a `vue.js` app in 5 minutes and deploy it to Heroku. Requires [Express](https://expressjs.com/) to set up a `node.js` server.  

## External Doc on Vue

- [Vue Doc](https://vuejs.org/)
- [VueCli](https://cli.vuejs.org/)
- [Vue Dev Tools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## External doc on deployment

- [Flask with Vue](https://stackoverflow.com/questions/46214132/how-can-i-combine-vue-js-with-flask)
- [Flask xx Node xx Heroku xx Express](https://medium.com/netscape/deploying-a-vue-js-2-x-app-to-heroku-in-5-steps-tutorial-a69845ace489)
- [Stativ Vue app with Heroku](https://medium.com/better-programming/deploying-a-vue-js-app-to-heroku-d16f95c07a04)
- [Vue Article from Full Stack Python](https://www.fullstackpython.com/vuejs.html)

## Additional Doc

- [Router with Vue.js](https://saidhayani.medium.com/understand-routing-in-vue-js-with-examples-6da96979c8e3)
- [Vue explained video](https://www.youtube.com/watch?v=Wy9q22isx3U)

# Personal notes

## On install

### Installation

- You don't have to set up the `router`, for one SPA with links only

### Dev vs Prod

- From dev (auto-reload) to prod, the `package.json` file should swith from `"start": "npm run dev"` to `"start": "node server.js"`.
- When working on the dev env, use `npm run dev` instead of `node server.js` to get live updates.

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

## On external packages

### Overall

- `axios`, `npm i axios` to facilitate api calls
- after `npm i d3`, you should call it this way: `import * as d3 from 'd3'` in any component requiring d3.

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


