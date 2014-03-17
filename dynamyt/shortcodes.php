<?php 
/*
 *
 * Shortcodes
 *
 *
 */





/*
 * Example shortcode
 */
function my_shortcode() {
  return "Hello World";
}





/*
 * A function to register all custom shortcodes.
 */
function register_dynamyt_shortcodes() {
  /*
   * 1. Name of the shortcode inside WordPress
   * 2. Function of the shortcode inside this file
   */
  add_shortcode('myshortcode', 'my_shortcode');
}

// Register all custom shortcodes for WordPress
add_action('init', 'register_dynamyt_shortcodes');

?>