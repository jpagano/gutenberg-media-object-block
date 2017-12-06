<?php

/**
 * Plugin Name: Gutenberg Media Object Block
 * Plugin URI: https://github.com/jpagano/gutenberg-media-object-block
 * Description: Media Object Block for the Gutenberg editor.
 * Version: 1.0
 * Author: J.Pagano
 *
 * @package gutenberg-media-object-block
 */

defined( 'ABSPATH' ) || exit;

add_action( 'enqueue_block_editor_assets', 'gutenberg_media_object_enqueue_block_editor_assets' );

function gutenberg_media_object_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'gutenberg-media-object',
		plugins_url( 'block.build.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.build.js' )
	);
}

add_action( 'enqueue_block_assets', 'gutenberg_media_object_enqueue_block_assets' );

function gutenberg_media_object_enqueue_block_assets() {
	wp_enqueue_style(
		'gutenberg-media-object',
		plugins_url( 'style.css', __FILE__ ),
		array( 'wp-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);
}
