---
layout: post
title:  TrailFinder
featured-image: /images/post-thumbs/trailfinder-iphone.png
date:   2014-06-01 00:00:20
categories: portfolio
tags: 
- foo 
- bar
- foobar
---

<section class="feature-image">
	<img src="/images/post-img/trailfinder-iphone.jpg" alt="Trailfinder open source app">
</section>

<section class="post-intro">
	<h1>{{page.title}}</h1>
	<p><a href="http://github.com/jamez14/trailfinder" target="_blank">TrailFinder</a> is an open source, AngularJS and Google Maps API &amp; Fusion Tables API driven application.</p> 
	 <p>TrailFinder is a “passion project” of mine, based on my love of riding my bike on the local tow path(s) in the Northeast Ohio area. When I began to learn more about the local parks and towpaths, I realized I didn’t know the best (and fastest) way to hope on a trail and ride.</p>
	 <p>TrailFinder is still under development. The future of the app includes making it accessable on iOS &amp; Android using the Phonegap framework.</p>
	 <a href="http://github.com/jamez14/trailfinder" target="_blank" class="view-project tooltip">View Project<span class="tool-title">on GitHub!</span></a>
	 <!-- <p>Trail Finder allows the user to find the nearest tow path trail to them via geolocation (Google Maps API) and pulls data from a Google Fusion Table (Google Fusion API) full of names and coordinates. It then calculates the distance from the users location to the location of the nearest tow path trailheads.</p> -->  	
  	<ul class="tags">
		{% for tag in page.tags %}
			<li><a>{{ tag }}</a></li>
		{% endfor %}
	</ul>

</section>


<!-- ![Trailfinder open source app](/images/post-img/trailfinder-iphone.jpg "Trailfinder open source app") -->