<?php
/**
 * dynamyt for WordPress back compat functionality
 *
 * Prevents dynamyt for WordPress from running on WordPress versions prior to 3.6,
 * since this theme is not meant to be backward compatible beyond that
 * and relies on many newer functions and markup changes introduced in 3.6.
 *
 * @package WordPress
 * @subpackage dynamyt_wordpress
 * @since dynamyt for WordPress 1.0
 */

/**
 * Prevent switching to dynamyt for WordPress on old versions of WordPress.
 *
 * Switches to the default theme.
 *
 * @since dynamyt for WordPress 1.0
 *
 * @return void
 */
function dynamyt_wordpress_switch_theme() {
	switch_theme( WP_DEFAULT_THEME, WP_DEFAULT_THEME );
	unset( $_GET['activated'] );
	add_action( 'admin_notices', 'dynamyt_wordpress_upgrade_notice' );
}
add_action( 'after_switch_theme', 'dynamyt_wordpress_switch_theme' );

/**
 * Add message for unsuccessful theme switch.
 *
 * Prints an update nag after an unsuccessful attempt to switch to
 * dynamyt for WordPress on WordPress versions prior to 3.6.
 *
 * @since dynamyt for WordPress 1.0
 *
 * @return void
 */
function dynamyt_wordpress_upgrade_notice() {
	$message = sprintf( __( 'dynamyt for WordPress requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'dynamyt_wordpress' ), $GLOBALS['wp_version'] );
	printf( '<div class="error"><p>%s</p></div>', $message );
}

/**
 * Prevent the Theme Customizer from being loaded on WordPress versions prior to 3.6.
 *
 * @since dynamyt for WordPress 1.0
 *
 * @return void
 */
function dynamyt_wordpress_customize() {
	wp_die( sprintf( __( 'dynamyt for WordPress requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'dynamyt_wordpress' ), $GLOBALS['wp_version'] ), '', array(
		'back_link' => true,
	) );
}
add_action( 'load-customize.php', 'dynamyt_wordpress_customize' );

/**
 * Prevent the Theme Preview from being loaded on WordPress versions prior to 3.4.
 *
 * @since dynamyt for WordPress 1.0
 *
 * @return void
 */
function dynamyt_wordpress_preview() {
	if ( isset( $_GET['preview'] ) ) {
		wp_die( sprintf( __( 'dynamyt for WordPress requires at least WordPress version 3.6. You are running version %s. Please upgrade and try again.', 'dynamyt_wordpress' ), $GLOBALS['wp_version'] ) );
	}
}
add_action( 'template_redirect', 'dynamyt_wordpress_preview' );
