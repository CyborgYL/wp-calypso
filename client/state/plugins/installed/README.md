Installed Plugins
=================

A module for managing installed plugins on connected sites.

## Actions

### `fetch( sites: Array )`

### `install( site: Object, plugin: Object )`

### `update( site: Object, plugin: Object )`

### `remove( site: Object, plugin: Object )`

### `activate( site: Object, plugin: Object )`

### `deactivate( site: Object, plugin: Object )`

### `enableAutoupdate( site: Object, plugin: Object )`

### `disableAutoupdate( site: Object, plugin: Object )`

### `toggleAutoUpdates( site: Object, plugin: Object )`

### `removeNotice( site: Object, plugin: Object )`

## Selectors

### `isRequesting( state: Object, siteId: Number|String )`

### `hasRequested( state: Object, siteId: Number|String )`

### `getPlugins( state: Object, sites: Array, pluginFilter: Object )`

Get plugins installed on a list of sites (can also be just one site, but it should still be an array). Each plugin returned also lists the sites it's installed on in a `sites` property. Can be filtered by `active`, `inactive`, `updates`.

### `getPluginsWithUpdates( state: Object, sites: Array )`

### `getLogsForPlugin( state: Object, siteId: Number|String, pluginId: String )`

Get the most recent status for a plugin action (including "inProgress" for currently-running actions).

### `isPluginDoingAction( state: Object, siteId: Number|String, pluginId: String )`

Checks if this site/plugin is busy doing an action.

## Reducer

Data from the aforementioned actions is added to the global state tree, under `plugins.installed`, with the following structure:

```js
state.plugins.installed = {
	isRequesting: {
		'exampleSiteId': false,
	}
	hasRequested: {
		'exampleSiteId': true,
	}
	plugins: {
		'exampleSiteId': [ {
			id: 'akismet/akismet',
			slug: 'akismet',
			active: true,
			name: 'Akismet',
			plugin_url: 'https://akismet.com/',
			version: '3.1.11',
			description: 'Used by millions, Akismet is quite possibly the best way in the world to <strong>protect your blog from spam</strong>. It keeps your site protected even while you sleep. To get started: 1) Click the "Activate" link to the left of this description, 2) <a href="https://akismet.com/get/">Sign up for an Akismet plan</a> to get an API key, and 3) Go to your Akismet configuration page, and save your API key.',
			author: 'Automattic',
			author_url: 'https://automattic.com/wordpress-plugins/',
			network: false,
			autoupdate: true
		}, {
			id: 'hello-dolly/hello',
			slug: 'hello-dolly',
			active: false,
			name: 'Hello Dolly',
			plugin_url: 'https://wordpress.org/plugins/hello-dolly/',
			version: '1.6',
			description: 'This is not just a plugin, it symbolizes the hope and enthusiasm of an entire generation summed up in two words sung most famously by Louis Armstrong: Hello, Dolly. When activated you will randomly see a lyric from <cite>Hello, Dolly</cite> in the upper right of your admin screen on every page',
			author: 'Matt Mullenweg',
			author_url: 'http://ma.tt/',
			network: false,
			autoupdate: true
		} ],
		'exampleSiteIdTwo': [ … ],
		…
	},
	logs: {
		'exampleSiteIdTwo': {
			'akismet/akismet': {
				status: 'error',
				action: INSTALL_PLUGIN,
				error: createError( 'no_package', 'Download failed.' ),
			}
		}
	}
```