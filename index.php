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
	$package_json = json_decode( file_get_contents( __DIR__ . '/package.json' ) )
		?: (object) [ 'version' => '1.0.1' ];
	$min = PROD === true ? '.min' : '';
	$dist = plugin_dir_url( __FILE__ ) . 'dist';


	wp_register_script(
		'stories', "$dist/colby-wp-react-stories$min.js",
		['react', 'react-dom', 'prop-types', 'date-fns', 'lodash'],
		$package_json->version,
		true
	);

	wp_register_style(
		'stories',
		"$dist/colby-wp-react-stories$min.css",
		['colby-bootstrap'],
		$package_json->version
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


add_filter( 'rest_prepare_category', function( $response, $taxonomy ) {
	$response->data['meta']['color'] = get_term_meta( $taxonomy->term_id, 'color', true );
	$response->data['meta']['background_color'] = get_term_meta( $taxonomy->term_id, 'background-color', true );

	return $response;
}, 10, 2 );

add_action( 'wp_footer', function() {
	global $post;

	if ( has_shortcode( $post->post_content, 'stories')
			|| has_shortcode( $post->post_content, 'stories' ) ) {
		if ( ! $_GET['category'] ) {
			return;
		}

		$category = get_category_by_slug( $_GET['category'] );

		if ( ! $category ) {
			return;
		}

		ob_start(); ?>
<script>
window.COLBY_STORIES_ACTIVE_CATEGORY = '<?php echo $category->term_id; ?>';
</script>
		<?php

		echo ob_get_clean();
	}
} );
