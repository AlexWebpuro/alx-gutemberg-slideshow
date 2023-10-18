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

export default function Edit() {
	const [ blogs, setBlogs ] = useState( [] );
	
	useEffect( async () => {
		let mainURL = 'https://wptavern.com/wp-json/wp/v2/posts'
		fetch( mainURL )
			.then( response =>  response.json() )
			.then( json => {
				console.log( json )
				setBlogs( json );
			} )
			.catch( err => console.log( err ) );
	
	}, []);

	return (
		<p { ...useBlockProps() }>
			<div className='blogs-slide'>
				{
				blogs.map( blog => {
					const { date, episode_featured_image, title, link } = blog;

					const formatDate = moment( date ).utc().format('MMMM Do YYYY');
					return (
						<>
						<div className='blog--item'>
							<img src={ episode_featured_image } />
							<div className='blog--item-footer'>
								<h4> { title.rendered } </h4>
								<div className='blog--item--info'>
									<span className='created'><strong>Created:</strong>{ formatDate }</span>
									<a href={ link } className='btn btn__primary'> { __('See more', ) } </a>
								</div>
							</div>
						</div>
						</>
					)
				} )
				}
			</div>
		</p>
	);
}
