<?php

global $wp_plugin_paths;

$wp_plugin_paths = [];

define( 'WP_PLUGIN_URL', '' );
define( 'ABSPATH', dirname( __DIR__ ) . '/vendor/johnpbloch/wordpress-core/' );
define( 'WPINC', 'wp-includes/' );

function get_bloginfo( $key ) {
	if ( 'url' === $key ) {
		return 'http://my-site';
	}
}
