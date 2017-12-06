const { __ } = wp.i18n;
const {
	registerBlockType,
	Editable,
	MediaUploadButton,
	InspectorControls,
	BlockDescription,
	source: {
		attr,
		children,
	},
} = wp.blocks;

registerBlockType( 'gutenberg-jpagano-blocks/media-object', {
	title: __( 'Media Object' ),
	icon: 'list-view',
	category: 'formatting',
	attributes: {
		title: {
			type: 'array',
			source: children( 'h2' ),
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: attr( 'img', 'src' ),
		},
		content: {
			type: 'array',
			source: children( '.media-object__content' ),
		},
	},
	edit: ( props ) => {
		const focusedEditable = props.focus ? props.focus.editable || 'title' : null;
		const attributes = props.attributes;

		const onChangeTitle = ( value ) => {
			props.setAttributes( { title: value } );
		};
		const onFocusTitle = ( focus ) => {
			props.setFocus( _.extend( {}, focus, { editable: 'title' } ) );
		};
		const onSelectImage = ( media ) => {
			props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};
		const onChangeContent = ( value ) => {
			props.setAttributes( { content: value } );
		};
		const onFocusContent = ( focus ) => {
			props.setFocus( _.extend( {}, focus, { editable: 'content' } ) );
		};

		return [
			!! props.focus && (
				<InspectorControls key="inspector">
					<BlockDescription>
						<p>{ __( 'Media Object is a useful layout block for displaying an item, usually an image, alongside some content, usually text.' ) }</p>
					</BlockDescription>
				</InspectorControls>
			),
			<div className={ props.className }>
				<div className="media-object">
					<div className="media-object__section">
						<MediaUploadButton
							buttonProps={
								{
									className: attributes.mediaID ?
										'image-button' :
										'components-button button button-large',
								}
							}
							onSelect={ onSelectImage }
							type="image"
							value={ attributes.mediaID }
						>
							{
								attributes.mediaID ?
									<img src={ attributes.mediaURL } className="media-object__image" alt={ attributes.alt } /> :
									__( 'Upload Image' )
							}
						</MediaUploadButton>
					</div>

					<div className="media-object__section">
						<Editable
							tagName="h2"
							className="media-object__title"
							placeholder={ __( 'Media Object title' ) }
							value={ attributes.title }
							onChange={ onChangeTitle }
							focus={ focusedEditable === 'title' }
							onFocus={ onFocusTitle }
						/>
						<Editable
							tagName="div"
							multiline="p"
							className="media-object__content"
							placeholder={ __( 'Media Object content' ) }
							value={ attributes.content }
							onChange={ onChangeContent }
							focus={ focusedEditable === 'content' }
							onFocus={ onFocusContent }
						/>
					</div>
				</div>
			</div>,
		];
	},
	save: ( props ) => {
		const {
			className,
			attributes: {
				title,
				mediaURL,
				mediaAlt,
				content,
			},
		} = props;

		return (
			<div className={ className }>
				<div className="media-object">
					<div className="media-object__section">
						{
							mediaURL && (
								<img className="media-object__image" src={ mediaURL } alt={ mediaAlt } />
							)
						}
					</div>
					<div className="media-object__section">
						<h2 className="media-object__title">{title}</h2>
						<div className="media-object__content">
							{content}
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
