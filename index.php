<?php
/**
 * Plugin Name: Colby Stories
 * Description: A React-based, masonry-like display of categorized posts drawn from the WordPress REST API.
 * Author: John Watkins, Colby Communications
 */

function render_stories( $atts ) {
	$atts = $atts ?: [];

	if ( ! $atts['endpoint'] ) {
		return '';
	}

	$per_page = $atts['per-page'] ? " data-per-page={$atts['per-page']}" : '';

	return "<div data-stories class=stories-container data-endpoint={$atts['endpoint']} {$atts['per-page']}></div>";
}

function init_stories() {
	add_shortcode( 'stories', 'render_stories' );
}

add_action( 'init', 'init_stories' );

add_action( 'wp_enqueue_scripts', function() {
	$min = PROD === true ? '.min' : '';
	$dist = PROD === true
		? 'http://unpkg.com/colby-wp-react-stories@latest/dist'
		: plugin_dir_url( __FILE__ ) . 'dist';


	wp_register_script(
		'stories', "$dist/colby-wp-react-stories$min.js",
		['react', 'react-dom', 'prop-types', 'date-fns', 'lodash'],
		'',
		true
	);

	wp_register_style(
		'stories',
		"$dist/colby-wp-react-stories$min.css",
		['colby-bootstrap'],
		''
	);
}, 10, 1 );


function maybe_enqueue_stories() {
	global $post;

	if ( has_shortcode( $post->post_content, 'stories')
			|| has_shortcode( $post->post_content, 'stories' ) ) {
		wp_enqueue_script( 'stories' );
		wp_enqueue_style( 'stories' );
	}
}

add_action( 'wp_enqueue_scripts', 'maybe_enqueue_stories' );
