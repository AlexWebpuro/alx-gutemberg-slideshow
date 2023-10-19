/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import moment from 'moment';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { Panel, PanelBody, TextControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */


export default function Edit( props ) {
	const [ blogs, setBlogs ] = useState( [] );
	const { attributes, setAttributes } = props;
	const { title, nameLabel, srcAPI } = attributes;
	const [ isDragStart, setIsDragStart ] = useState( false );


	const [ prevPageX, setPrevPageX ] = useState( '' );
	const [ prevScrollLeft, setPrevScrollLeft ] = useState();
	const slide = document.querySelector('.blogs-slide');
	const arrowIcon = document.querySelectorAll('.slide--item--icon');
	
	const dragStart = (e) => {
		setIsDragStart( true );
		setPrevPageX( e.pageX );
		setPrevScrollLeft( slide.scrollLeft );
	}

	const dragging = (e) => {
		if( !isDragStart ) return;
		
		let positionDiff = e.pageX - prevPageX;
		
		slide.scrollLeft = prevScrollLeft - positionDiff;
	}
	
	const handleArrow = (e) => {
		const firstImage = document.querySelectorAll('.blog--item')[0].clientWidth + 14;
		const firstImgWidth = firstImage;
		slide.scrollLeft += e.target.id == 'left' ? -firstImgWidth : firstImgWidth;
		console.log( e.target.id, firstImage );
	}

	useEffect( async () => {
		fetch( srcAPI )
			.then( response =>  response.json() )
			.then( json => {
				console.log( json );
				console.log( attributes );
				setBlogs( json );
			} )
			.catch( err => console.log( err ) );
	
	}, [] );

	return (
		<>
			<InspectorControls>
				<Panel>
					<PanelBody title="labels" initialOpen={ true } >
						<TextControl
							label='Name label'
							value={ nameLabel }
							onChange={ newNameLabel => setAttributes( { nameLabel: newNameLabel } ) }
						/>
						<TextControl
							label="API source"
							value={ srcAPI }
							onChange={ newSrcAPI => setAttributes( { srcAPI: newSrcAPI } ) }
						/>
					</PanelBody>
				</Panel>
			</InspectorControls>
			<p { ...useBlockProps() }>
				{/* <RichText
					tagName='h1'
					placeholder='Alex esto si es para ud?'
					value={ nameLabel }
					onChange={ ( newTitle ) => setAttributes( { title: newTitle } ) }
				/> */}
				<div className='blog-slide-wrapper'>
					<i 
						id='left'
						className='slide--item--icon fa-solid fa-angle-left'
						onClick={ (e) => handleArrow(e) }
						></i>
					<div
						className='blogs-slide'
						onMouseMove={ (e) => dragging(e) }
						onMouseDown={ (e) => dragStart(e) }
						onMouseUp={ (e) => setIsDragStart( false ) }
					>
							{ blogs.length == 0 ? <p className='blog--item blog-slide__loading'>Loading...</p> : '' }
							{
								blogs.map( blog => {
									const { date, episode_featured_image, title, link, jetpack_featured_media_url } = blog;

									const formatDate = moment( date ).utc().format('MMMM Do YYYY');
									return (
										<>
										<div className='blog--item'>
											<img src={ jetpack_featured_media_url } />
											<div className='blog--item-footer'>
												<h4> { title.rendered } </h4>
												<div className='blog--item--info'>
													<span className='created'><strong>Created: </strong>{ formatDate }</span>
													<a href={ link } className='btn btn__primary' target='_blank'> { __('See more', ) } </a>
												</div>
											</div>
										</div>
										</>
									)
								} )
							}
					</div>
					<i
						id='right'
						className='slide--item--icon fa-solid fa-angle-right'
						onClick={ (e) => handleArrow(e) }
					></i>
				</div>
			</p>
		</>
	);
}
