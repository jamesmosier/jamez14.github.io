---
layout: post
category: blog
title: 'AngularJS Filter Buttons for nested object properties'
date: 2015-10-14 09:00
---

Filtering in Angular is really, really simple. The docs provide a [good overview of how to filter](https://docs.angularjs.org/api/ng/filter/filter) a list on the fly via the `filter` attribute of `ng-repeat`. What the docs leave out (at least I haven't found it anywhere) is how to filter a list on click of a button and to take it a step further: how to filter by a nested object property.

The implementation makes a lot of sense and at the end of the day, it works exactly how you think it *should*. I've created a [JS Bin example](http://jsbin.com/mazidu/13/edit?html,css,js,output) of this. The code is also below, with explanations.

<br/>

### AngularJS Controller

The controller contains an array of objects (`vm.products`) and also a quick Lodash shortcut to grab all the `specs` objects, so we can loop through them in the UI to dynamically create the buttons. You can skip this step if you'd like and either hardcode the filter buttons or use a different method to extract the objects. Don't include [Lodash](http://lodash.com) if you aren't already using it.

{% highlight js %}
var vm = this;

vm.products = [
    {name: 'T-Shirt 1', specs: {color: 'red'}},
    {name: 'T-Shirt 2', specs: {color: 'blue'}},
    {name: 'T-Shirt 3', specs: {color: 'green'}}
];

vm.specs = _.pluck(this.products, 'specs');
{% endhighlight %}

### AngularJS Flavored Markup

The markup is where the magic happens. First up are the buttons to filter the list. We hardcode the "All" filter button, because that will never change. On `ng-click` it clears the `vm.filterProducts` object (so nothing is filtered) and also sets `vm.filterToggle` property to `all` which lets our `ng-class` know which button is active.

We then loop over the `vm.specs` object, which we set in our controller. In essence, this is just our list of colors. When a user clicks one of the buttons, `vm.filterProducts` is set by creating a nested object in the markup. Because the `specs` object contains the `color` property, we need to make sure the filter knows where the `color` property lives within the array. That is why we create the nested object.

You could just as easily hardcode all the buttons (and not loop over the `vm.specs`), but just in case our `specs` records change down the road, it's better to be safe and extensible, than sorry.

{% highlight html %}
<div class="filter-btns">
  <h4>Filter Products</h4>
  <button type="button" ng-class="{'active': vm.filterToggle == 'all'}" ng-click="vm.filterProducts = {}; vm.filterToggle = 'all'">
    All
  </button>
  <button type="button" ng-repeat="spec in vm.specs" ng-class="{'active': vm.filterToggle == spec.color}" ng-click="vm.filterProducts = {specs: {color: spec.color}}; vm.filterToggle = spec.color">
    {% raw %}{{spec.color}}{% endraw %}
  </button>
</div>
{% endhighlight %}

The second part of the markup contains the `ng-repeat` with the filter attribute pointing to `vm.filterProducts`, so when a button is clicked it sets the value to be filtered. Angular handles the rest by returning a new array that is automatically displayed in the UI.

{% highlight html %}
<ul>
  <li ng-repeat="product in vm.products | filter: vm.filterProducts">
    {% raw %}{{product.name}}{% endraw %} in
    <span ng-style="{color: product.specs.color}">{% raw %}{{product.specs.color}}{% endraw %}</span>
  </li>
</ul>
{% endhighlight %}

As I mentioned, looking back at the implementation, it makes complete sense we would need to create a nested object in the UI in order for Angular to know which property we are targeting in our filter. Check out the live example on [JS Bin](http://jsbin.com/mazidu/13/edit?html,css,js,output).