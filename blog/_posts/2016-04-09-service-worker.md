---
layout: post
category: blog
title: 'Implementing a service worker'
date: 2016-04-09 09:30
tag: service-worker
published: false
---

## The Background

Occasionally I am asked how I learn best. I always quickly answer, "by doing!". That's why I love sites like Egghead.io & Pluralsight, because I can follow along and create something tangible. So when I wanted to learn more about service workers recently, I decided to implement one on this website you're reading now. It is the most basic of examples, because this site only serves static content, but regardless I found it beneficial in order to gain a better understanding of service workers and their uses.

Initially when hearing about service workers, in particular during Google I/O 2015, I wasn't quite sure what their purpose was. After researching, I found a few main takeaways that were of interest to me:

* They allow you to run multi-threaded JavaScript in the browser. Currently there is only 1 thread on any given browser that you can run code on, which inherently limits the speed & efficiency of your application.
* They provide you with the ability to have offline application. They can store information locally in your browser for retrieval at a later time.
* Think of it like a mini-application that gets installed when a user navigates to your website

In short, what I was hoping to do when implementing this was to allow a user to visit my site with a network connection and then visit it again at a later date with no network connection and receive the same experience. Unfortunately service workers only have limited browser support, so any real world scenarios (looking at your iPhone) are not possible.

## The Implementation

I took inspiration from Jake Archibald as well as some articles published by Google (see below for some links) for my implementation. I simply cache my static assets and then capture any Google Analytics events to replay at a later date, when the user has a network connection again.



{% highlight js %}
var urlsToCache = [
    '/path/to/asset1.js',
    '/path/to/asset2.js',
    '/path/to/asset3.css',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CURRENT_CACHES['offline-analytics'])
        .then(function(cache) {
            console.log('Opened cache!!!');
            return cache.addAll(urlsToCache);
        })
    );
});
{% endhighlight %}


I found a bunch of great resources for learning more about service workers. [Jake Archibald](https://jakearchibald.com/2014/using-serviceworker-today/) [has a ton](https://jakearchibald.com/2014/service-worker-first-draft/) [of articles](https://jakearchibald.com/2014/offline-cookbook/) as well as [Google’s engineering team](https://developers.google.com/web/showcase/case-study/service-workers-iowa?hl=en).