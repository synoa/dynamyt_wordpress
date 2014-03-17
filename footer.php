<?php
/**
 * The template for displaying the footer
 *
 * Contains footer content and the closing of the #main and #page div elements.
 *
 * @package WordPress
 * @subpackage dynamyt_wordpress
 * @since dynamyt for WordPress 1.0
 */
?>

		</div><!-- #main -->

		<footer id="colophon" class="site-footer" role="contentinfo">

			<?php get_sidebar( 'footer' ); ?>

			<div class="site-info">
				<?php do_action( 'dynamyt_wordpress_credits' ); ?>
			</div><!-- .site-info -->
		</footer><!-- #colophon -->
	</div><!-- #page -->





	<?php wp_footer(); ?>





  <?php 
    // Load the JS after the DOM has finished loading. 
  ?>
  <script type="text/javascript">
    // Add a script element as a child of the body
    function loaded() {
      // The default scripts of the page
      var element = document.createElement('script');
      element.type = 'text/javascript';
      element.src = "<?php echo get_template_directory_uri(); ?>/app/js/scripts.js";
      document.body.appendChild(element);
    };

    // Check for browser support of event handling capability
    if (window.addEventListener) {
      window.addEventListener("load", loaded, false);
    } else if (window.attachEvent) {
      window.attachEvent("onload", loaded);
    } else {
      window.onload = loaded;
    }
  </script>
</body>
</html>