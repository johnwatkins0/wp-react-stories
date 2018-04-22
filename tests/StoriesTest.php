<?php

use PHPUnit\Framework\TestCase;
use ColbyComms\Stories\Stories;

class StoriesTest extends TestCase {
    public function test_init() {
        global $wp_filter;
        
        Stories::init();
        $this->assertEquals( array_keys( $wp_filter ), ['init', 'wp_enqueue_scripts'] );
	}
	
    public function test_add_shortcode() {
        global $shortcode_tags;

		Stories::init();
		do_action( 'init' );

        $this->assertEquals( array_keys( $shortcode_tags ), [ Stories::SHORTCODE_TAG ] );
    }

    public function test_render_shortcode() {
        $atts = [
            'media-endpoint' => 'http://my-media-endpoint',
            'categories-endpoint' => 'http://my-categories-endpoint',
            'endpoint' => 'http://my-stories-endpoint',
            'per-page' => 10
        ];

        $output = "
				<div data-stories
					data-media-endpoint=\"{$atts['media-endpoint']}\"
					data-categories-endpoint=\"{$atts['categories-endpoint']}\"
					data-stories-endpoint=\"{$atts['endpoint']}\"
					data-per-page=\"10\"
				></div>";

		$this->assertEquals( $output, Stories::render_shortcode( $atts ) );
		
		$atts = '';
		$output = "
				<div data-stories
					data-media-endpoint=\"http://my-site/wp-json/wp/v2/media/\"
					data-categories-endpoint=\"http://my-site/wp-json/wp/v2/categories/\"
					data-stories-endpoint=\"http://my-site/wp-json/wp/v2/posts/\"
					data-per-page=\"12\"
				></div>";

		$this->assertEquals( $output, Stories::render_shortcode( $atts ) );
	}

	public function test_enqueue_script() {
		global $wp_scripts;

		Stories::init();
		do_action( 'wp_enqueue_scripts' );

		$this->assertArrayHasKey( Stories::TEXT_DOMAIN, $wp_scripts->registered );
	}

	public function test_get_dist_directory() {
		$this->assertEquals(
			Stories::get_dist_directory(),
			$_ENV['TRAVISCI']
				? '/home/travis/build/johnwatkins0/wp-react-stories/dist/'
				: dirname( __DIR__, 2 ) . '/' . Stories::TEXT_DOMAIN . '/dist/'
		);
	}

	public function test_get_dist_directory_in_theme() {
		$this->assertEquals(
			Stories::get_dist_directory( true ),
			'my-template-directory/vendor/colbycomms/wp-react-stories/dist/'
		);
	}
}