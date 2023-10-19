<?php
/**
 * Plugin Name:       Alx Gutermberg Slideshow
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       alx-gutermberg-slideshow
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_alx_gutermberg_slideshow_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_alx_gutermberg_slideshow_block_init' );

function alx_load_fa() {
	wp_register_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css', array(), '1', 'all' );
	wp_enqueue_style('font-awesome');
	wp_register_script('alx-slider', plugins_url() . '/alx-gutermberg-slideshow/src/main.js', array(), '1', array() );
	wp_enqueue_script('alx-slider');
}
add_action( 'enqueue_block_assets', 'alx_load_fa' );