---
layout: post
category: blog
title: 'Angular "ng-switch-when"'
date: 2015-11-01 20:10
---

During the creation of a new feature, I came across an interesting built in AngularJS directive I had never seen before, `ng-switch-when`. Its functionality is pretty straightforward and the name really says it all.

The feature I was building called for a page where a user could make a decision between two options. Choosing one of those options would show 1 of 2 wizards to create some data for an admin. I didn't want to create new routes for these wizards, so instead I used `ng-switch-when` to dynamically load the components when a user makes a selection.

The landing page, which contains the directives, went something like this...

{% highlight html %}
<div class="wrapper" ng-switch="layout">
    <div class="make-a-selection" ng-switch-default>
        <div class="option1" ng-click="changeLayout('option1')">Go to option 1</div>
        <div class="option2"  ng-click="changeLayout('option2')">Go to option 2</div>
    </div>

    <div ng-switch-when="option1" option1-component></div>
    <div ng-switch-when="option2" option2-component></div>
</div>
{% endhighlight %}

The markup above first defines an object, `layout`, which is the object in which to *switch* on. This is definied via `ng-switch="layout"`. It also declares the default view to show, which is a `div` decorated with `ng-switch-default`. Within that `div` are the two options which have click handlers which hit a function in the pages controller (defined below). Lastly, the two components, which happen to be directives, have `ng-switch-when` attributes. Those attributes contain the object, which when "true", will load the component.


The click handlers, `ng-click="changeLayout('optionN')"`, are defined in the controller below. You pass in the component name to switch to, which then sets it on the `layout` object (which remember is defined on the wrapper element in the `ng-switch`). This is what triggers the change of what component is shown.

{% highlight js %}
$scope.changeLayout = function (type) {
    $scope.layout = type;
};
{% endhighlight %}


Lastly the component directives below can contain really any logic you'd like. All of the "magic" that comes along with the `ng-switch` directive is shown above. Below is just for your reference...

{% highlight js %}
angular.module('myApp')
    .directive('option1Component', option1Component);

function option1Component () {
    return {
        scope: {},
        templateUrl: '/Templates/Option1.html',
        controller: function ($scope) {
            // directive logic
        }
    }
}
{% endhighlight %}



Overall I found the `ng-switch-when` directive to be extremely useful to load in different components on demand, as opposed to loading all logic up front and just "showing" and "hiding" the components on click. As with any directive, you can pass data between the "parent" and "child" directives using the `require` attribute on the child directive.



