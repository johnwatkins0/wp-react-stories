<?php
/**
 * Plugin Name: Stories
 * Description: A masonry-like display of posts drawn from the WordPress REST API.
 * Author: John Watkins, Colby Communications
 *
 * @package colbycomms/wp-react-stories
 */

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
	ColbyComms\Stories\Stories::init();
}
