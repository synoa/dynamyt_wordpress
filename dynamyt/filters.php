<?php 
/*
 *
 * Filters
 *
 *
 */




/**
 * The length of the posts excerpt.
 */
function dynamyt_excerpt_length($length) {
  return 4;
}
add_filter('excerpt_length', 'dynamyt_excerpt_length');





/**
 * The string which gets appended after the excerpt.
 */
function dynamyt_excerpt_more($more) {
  return '...';
}
add_filter('excerpt_more', 'dynamyt_excerpt_more');





/**
 *
 */
function dynamyt_reading_link() {
  return '';
}
add_filter('excerpt_more_link', 'dynamyt_reading_link');

?>