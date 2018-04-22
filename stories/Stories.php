<?php
/**
 * Stories.php
 *
 * @package johnwatkins0/wp-react-stories
 */

namespace johnwatkins0\Stories;

/**
 * Main plugin class.
 */
class Stories {
	/**
	 * Version number.
	 *
	 * @var string
	 */
	const VERSION = '1.0.1';

	/**
	 * Whether this is a production environment.
	 *
	 * @var bool
	 */
	const PROD = true;

	/**
	 * The vendor name.
	 *
	 * @var string
	 */
	const VENDOR = 'johnwatkins0';

	/**
	 * Text domain.
	 *
	 * @var string
	 */
	const TEXT_DOMAIN = 'wp-react-stories';

	/**
	 * Filter prefix.
	 *
	 * @var string
	 */
	const FILTER_PREFIX = 'johnwatkins0__stories__';

	/**
	 * Filter to override whether to enqueue the script.
	 *
	 * @var string
	 */
	const ENQUEUE_SCRIPT_FILTER = self::FILTER_PREFIX . 'enqueue_script';

	/**
	 * The shortcode tag.
	 *
	 * @var string
	 */
	const SHORTCODE_TAG = 'stories';

	/**
	 * Add hooks.
	 */
	public static function init() {
		add_action( 'init', [ __CLASS__, 'add_shortcode' ] );
		add_action( 'wp_enqueue_scripts', [ __CLASS__, 'enqueue_script' ] );
	}

	/**
	 * Registers the shortcode callback.
	 *
	 * @return void
	 */
	public static function add_shortcode() {
		add_shortcode( self::SHORTCODE_TAG, [ __CLASS__, 'render_shortcode' ] );
	}

	/**
	 * The shortcode callback.
	 *
	 * @param array $atts Shortcode attributes.
	 * @return string HTML.
	 */
	public static function render_shortcode( $atts = [] ) : string {
		$atts = $atts ?: [];

		$atts['endpoint'] = $atts['endpoint']
			?? get_bloginfo( 'url' ) . '/wp-json/wp/v2/posts/';
		$atts['categories-endpoint'] = $atts['categories-endpoint']
			?? get_bloginfo( 'url' ) . '/wp-json/wp/v2/categories/';
		$atts['media-endpoint'] = $atts['media-endpoint']
			?? get_bloginfo( 'url' ) . '/wp-json/wp/v2/media/';

		$atts['per-page'] = $atts['per-page'] ?? '12';
		$per_page = "data-per-page=\"{$atts['per-page']}\"";

		return "
				<div data-stories
					data-media-endpoint=\"{$atts['media-endpoint']}\"
					data-categories-endpoint=\"{$atts['categories-endpoint']}\"
					data-stories-endpoint=\"{$atts['endpoint']}\"
					$per_page
				></div>";
	}

	/**
	 * Enqueues this plugin's script and style.
	 *
	 * @return void
	 */
	public static function enqueue_script() {
		/**
		 * Filters whether to enqueue this plugin's script.
		 *
		 * @param bool
		 */
		if ( ! apply_filters( self::ENQUEUE_SCRIPT_FILTER, true ) ) {
			return;
		}

		$min = true === self::PROD ? '.min' : '';
		$dist = self::get_dist_directory();

		wp_enqueue_script(
			self::TEXT_DOMAIN,
			"$dist/" . self::TEXT_DOMAIN . "$min.js",
			[],
			self::VERSION,
			true
		);
	}

	/**
	 * Gets the plugin's dist/ directory URL, whether this package is installed as a plugin
	 * or in a theme via composer. If the package is in neither of those places and the filter
	 * is not used, this whole thing will fail.
	 *
	 * @param bool $is_theme True to explicitly signal it's a theme context.
	 * @return string The URL.
	 */
	public static function get_dist_directory( $is_theme = false ) : string {
		if ( ! $is_theme && file_exists( dirname( __DIR__, 3 ) . '/plugins' ) ) {
			return plugin_dir_url( dirname( __DIR__ ) . '/index.php' ) . 'dist/';
		}

		return get_template_directory_uri() . '/vendor/' . self::VENDOR . '/' . self::TEXT_DOMAIN . '/dist/';
	}
}
