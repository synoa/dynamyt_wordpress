<?php
/**
 * The Footer Sidebar
 *
 * @package WordPress
 * @subpackage dynamyt_wordpress
 * @since dynamyt for WordPress 1.0
 */

if ( ! is_active_sidebar( 'sidebar-3' ) ) {
	return;
}
?>

<div id="supplementary">
	<div id="footer-sidebar" class="footer-sidebar widget-area" role="complementary">
		<?php dynamic_sidebar( 'sidebar-3' ); ?>
	</div><!-- #footer-sidebar -->
</div><!-- #supplementary -->
