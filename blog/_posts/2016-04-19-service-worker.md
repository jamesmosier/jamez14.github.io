---
layout: post
category: blog
title: 'Implementing a service worker'
date: 2016-04-19 09:30
tag: service-worker
---
## The Background

Occasionally I am asked how I learn best. I always quickly answer, "by doing!". That's why I love sites like Egghead.io & Pluralsight, because I can follow along and create something tangible. So when I wanted to learn more about service workers recently, I decided to implement one on this website you're reading now. It is the most basic of examples, because this site only serves static content, but regardless I found it beneficial in order to gain a better understanding of service workers and their uses.

Initially when hearing about service workers, in particular during Google I/O 2015, I wasn't quite sure what their purpose was. After researching, I found a few main takeaways that were of interest to me:

* They allow you to run multi-threaded JavaScript in the browser. Currently there is only 1 thread on any given browser that you can run code on, which inherently limits the speed & efficiency of your application.
* They provide you with the ability to have offline application. They can store information locally in your browser for retrieval at a later time.
* Think of it like a mini-application that gets installed when a user navigates to your website

In short, what I was hoping to do when implementing this was to allow a user to visit my site with a network connection and then visit it again at a later date with no network connection and receive the same experience. Unfortunately service workers only have limited browser support, so any real world scenarios (looking at your iPhone) are not possible (at the time of this writing).

## The Implementation

I took inspiration from Jake Archibald as well as some articles published by Google (see below for some links) for my implementation. I simply cache my static assets and then capture any Google Analytics events to replay at a later date, when the user has a network connection again. Also service workers only work over HTTPS, but luckily Cloudflare provides this for free so that step was already solved.

Initially I was experiencing issues with my service worker not caching CDN assets, Google Analytics scripts to be exact. This was solved with a function that intercepts all requests to static assets and checks whether it is a Google Analytics resource or not. If it is, it stores the request in IndexedDB for later retrieval.

Other than that, the setup and execution of the service worker code was fairly straightforward. This is a very basic example, but service workers can be much more powerful especially for more dynamic sites. If you’d like to see what I did for this one, all of the code can be found [on my Github](https://github.com/jamez14/jdm-v3/blob/master/js/sw.js).


Here are some other resources for learning more about service workers. [Jake Archibald](https://jakearchibald.com/2014/using-serviceworker-today/) [has a ton](https://jakearchibald.com/2014/service-worker-first-draft/) [of articles](https://jakearchibald.com/2014/offline-cookbook/) as well as [Google’s engineering team](https://developers.google.com/web/showcase/case-study/service-workers-iowa?hl=en).