import View from '@ckeditor/ckeditor5-ui/src/view';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { icons } from '@ckeditor/ckeditor5-core';
export default class MapApiView extends View {
    constructor(locale) {
		console.log(icons);
        super(locale);
        const bind = this.bindTemplate;
		this.saveButtonView = this._createButton( '적용', icons.check, 'ck-button-save' );
		this.saveButtonView.delegate( 'execute' ).to( this, 'save' );

		this.cancelButtonView = this._createButton( '취소', icons.cancel, 'ck-button-cancel' );
		this.cancelButtonView.delegate( 'execute' ).to( this, 'cancel' );

        this.setTemplate({
            tag: 'div',

            attributes: {
                class: [
                    'my-modal-visible',
                    'ck-reset_all-excluded'
                ]
            },

            children: [
                {
                    tag: 'input',
                    attributes: {
                        id: 'ck-pac-input',
                        class: 'controls',
                        type: 'text',
                        placeholder: '장소를 입력해주세요'
                    },
                },
                {
                    tag: 'div',
                    attributes: {
                        id: 'ck-google-map',
                    },
                },
                this.saveButtonView,
				this.cancelButtonView
            ]
        });
    }

    render() {
        super.render();

	}
	_createButton( label, icon, className ) {
		const button = new ButtonView();

		button.set( {
			label,
			icon,
			tooltip: true,
			class: className,
			withText: true
		} );

		return button;
	}
}
