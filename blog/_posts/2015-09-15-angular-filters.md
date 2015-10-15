---
layout: post
category: blog
title: 'Some quick Angular filters'
date: 2015-09-15 12:15
---

While working on a medium sized AngularJS application, I've relied upon a few custom filters to fit my needs. They aren't mind blowing, but nonetheless, still useful.

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

And the usage is simply...
{% highlight html %}
<div>Total Hamburgers: {% raw %}{{burgersArray|sumValues:'Cheese':'Plain'}}{% endraw %}</div>
{% endhighlight %}

---

The second filter that is really useful (that I can't believe is not built in) is to convert a decimal number to a percentage.

The JavaScript uses the built in Angular `$filter` service to do its magic. We take in an input (decimal number) and returns an absolute value of a number multiplied by 100 and then tacks on a percent symbol to the end of the output.

{% highlight js %}
angular.module('myApp')
        .filter('percentage', percentageFilter);

percentageFilter.$inject = ['$filter'];

function percentageFilter($filter) {
    return function (input) {
        return $filter('number')(Math.abs(input) * 100) + '%';
    };
}
{% endhighlight %}

{% highlight html %}
<div>{% raw %}{{device.BatteryLevel | percentage}}{% endraw %}</div>
{% endhighlight %}