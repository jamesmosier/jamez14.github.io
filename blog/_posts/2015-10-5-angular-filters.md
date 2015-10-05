---
layout: post
category: blog
title: 'Some Angular Filters I enjoy'
date: 2015-10-05 12:15
---

While working on a small AngularJS application, I've relied upon a few custom filters to fit my needs. They aren't mind blowing, but nonetheless, still useful.

The first is a "sum the values" filter. It simply takes in an array and 1 (or 2) properties that are within that array to sum against all values in the add. It just adds all values with that property together and outputs the result. The logic looks like this:

{% highlight js %}
angular.module('myApp').filter('sumValues', sumFilter);

function sumFilter() {
    return function (data, key1, key2) {
        if (typeof (data) === 'undefined' || typeof (key1) === 'undefined') {
            return 0;
        }

        var sum = 0;

        for (var i = data.length - 1; i >= 0; i--) {
            sum += parseInt(data[i][key1]);

            if (typeof (key2) !== 'undefined') {
                sum += parseInt(data[i][key2]);
            }
        }

        return sum;
    };
}
{% endhighlight %}