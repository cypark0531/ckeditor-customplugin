/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import List from '@ckeditor/ckeditor5-list/src/list';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import ImageUtils from '@ckeditor/ckeditor5-image/src/imageutils'
import MapApi from './src/mapapi.js';
import Image from '@ckeditor/ckeditor5-image/src/image';
import { ImageUploadEditing } from '@ckeditor/ckeditor5-image';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';



ClassicEditor
	.create( document.querySelector( '#editor' ), {
		plugins: [ Essentials, Paragraph, Heading, List, Bold, Italic, MapApi,ImageUtils,Image, ImageUploadEditing],
		toolbar: [ 'heading', 'bold', 'italic', 'numberedList', 'bulletedList', 'googleMap'],
		mapapi : {
			googleApiKey : 'AIzaSyAOvXrdqxoqiUyYl06jOHQaE43kBdF6fvQ',
			targetButtonId : 'aa',
			defaultOption : {
				center: { lat: 37.54669201220598, lng: 126.978871 },
				zoom: 17,
				mapTypeId: "roadmap",
			}
		}
	} )
	.then( editor => {
		CKEditorInspector.attach( editor );
		console.log( 'Editor was initialized', editor );
		window.editor = editor;
	} )
	.catch( error => {
		console.error( error.stack );
	} );
