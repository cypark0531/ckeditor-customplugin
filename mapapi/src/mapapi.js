import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import MapApiUi from './mapapiui'
export default class MapApi extends Plugin {
	static get requires() {
		return [ MapApiUi ];
	}
	static get pluginName () {
		return "MapApi";
	}
}
