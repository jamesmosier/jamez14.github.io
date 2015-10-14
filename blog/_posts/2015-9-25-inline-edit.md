---
layout: post
category: blog
title: 'AngularJS Inline Edit Directive'
date: 2015-09-25 09:00
---

I came across a great *"inline edit"* directive a while back for use with AngularJS. I found this originally on [Plunker](http://embed.plnkr.co/VLKzcd/app.js) and made it my own. The general idea is that when you click on some text (or an edit button next to the text), an input is displayed along with save/cancel buttons. This enables the user to change the text to another value quickly and easily, in place.

[Here's what the final feature looks like.](http://jsbin.com/mudefu/edit?html,js,output)

The setup for this feature can be broken up into 3 parts:

  1. Directive logic
  2. Template for use with directive
  3. Usage on your view/partial

### Usage

Normally the usage of a feature would be explained at the end (after the directive & template explaination), but in this case it is helpful to see *how* the directive is used before explaining it.

You need at least 3 directive properties:

- `inline-edit` - the text to display initially to the user & the model value. It is an object. It is the value you'd normally write like this {% raw %}`{{person.Name}}`{% endraw %}
- `on-save` - the function in your controller that will save the newly inserted value
- `on-cancel` - the value to revert to when the user clicks *cancel*

And the usage in markup looks like this...

`<div inline-edit="person.Name" on-save="vm.updatePerson(person)" on-cancel="cancelEdit(person.Name)"></div>`

### Directive

The directive contains 3 notable functions, `edit`, `save`, & `cancel`.

The `edit` function is initialized when the user begins the edit process. This function start the edit process by showing the input and buttons, stores the initial value of the input (for use with the cancel button), and focuses the input.

The `save` function invokes `handleSave` which at runtime is the function name you pass to `on-save`. Therefore on click of the `save` button, the `handleSave` value is hit in its respective controller.

Lastly, the `cancel` function hides the inline edit elements and reverts the model value to the initial text value. You can also pass a function in the `on-cancel` directive attribute if you want to perform some logic in your controller on cancel.

**Select boxes**: You can also use select boxes with this inline edit directive. An example usage of this is:
`<div inline-edit="person.Country" preset-values="countriesArray" on-save="vm.updatePersonCountry(person)" on-cancel="cancelEdit(person.Country)"></div>`

Essentially the usage is the same, aside from the `preset-values` attribute, which is an array of properties to fill the select box.


{% highlight js %}
var app = angular.module('myApp');

app.directive('inlineEdit', inlineEditDirective);

inlineEditDirective.$inject = ['$timeout', 'config'];

function inlineEditDirective($timeout, config) {

    return {
        scope: {
            model: '=inlineEdit',
            handleSave: '&onSave',
            handleCancel: '&onCancel',
            presetValues: '=presetValues'
        },
        link: function (scope, elm, attr) {
            var previousValue,
                previousSelectVal;

            scope.inputType = {
                settingValuesSelectbox: (scope.presetValues && scope.presetValues.length > 0) ? scope.presetValues : false
            };

            scope.edit = function () {
                scope.editMode = true;

                previousValue = scope.model;


                if (scope.inputType.settingValuesSelectbox) {

                } else if (scope.model !== 'true' && scope.model !== 'false') {
                    $timeout(function () {
                        elm.find('input')[0].focus();
                    }, 0, false);
                }
            };

            scope.save = function (param) {
                scope.handleSave({ value: scope.model });
                scope.editMode = false;
            };

            scope.cancel = function () {
                scope.editMode = false;
                scope.model = previousValue;
                scope.handleCancel({ value: scope.model });
            };

            scope.selectChanged = function (param) {
                previousSelectVal = param;
            };
        },
        templateUrl: config.baseUrl + '/Templates/DirectiveTemplates/inline-edit.html'
    };
}
{% endhighlight %}


### Templates

{% highlight html %}

<section>
    <div ng-show="editMode" style="display: inline;">
        <form role="form" name="inlineForm">
            <div ng-show="!inputType.settingValuesSelectbox">

                <div ng-class="{ 'has-error' : inlineForm.model.$invalid && !inlineForm.model.$pristine }">
                    <span ng-if="model == 'true' || model == 'false'">
                        <select ng-options="option as option for option in ['true', 'false']" ng-model="$parent.model" class="form-control input-sm inline-edit-selectbox"></select>
                        <button type="button" class="btn btn-default btn-xs" ng-click="cancel()">cancel</button>
                        <button class="btn btn-vtx btn-xs" ng-click="save($parent.model)" ng-disabled="inlineForm.$invalid">save</button>
                    </span>
                    <span ng-if="model != 'true' && model != 'false'">
                        <input class="form-control inline-edit-input input-xs" type="text" on-enter="save()" on-esc="cancel()" ng-model="$parent.model" required name="model">
                        <button type="button" class="btn btn-default btn-xs" ng-click="cancel()">cancel</button>
                        <button class="btn btn-vtx btn-xs" ng-click="save($parent.model)" ng-disabled="inlineForm.$invalid">
                            <span ng-hide="savingInProgress">save</span>
                        </button>
                    </span>
                </div>

            </div>

            <span ng-show="inputType.settingValuesSelectbox">
                <select class="form-control input-sm inline-edit-selectbox" on-enter="save()" on-esc="cancel()" ng-model="model" ng-change="selectChanged(model)" ng-options="option as option for option in inputType.settingValuesSelectbox"></select>
                <button type="button" class="btn btn-default btn-xs" ng-click="cancel()">cancel</button>
                <button class="btn btn-vtx btn-xs" ng-click="save(model)" ng-disabled="inlineForm.$invalid">save</button>
            </span>
        </form>
    </div>
    <div class="editable-item-name" ng-mouseenter="showEdit = true" ng-mouseleave="showEdit = false">
        <div class="inline-edit-mode" ng-hide="editMode" ng-click="edit()">{% raw %}{{model}}{% endraw %}</div>

        <a class="pull-left inline-edit-link" ng-click="edit()" ng-hide="editMode">
            <i class="fa fa-edit"></i>
        </a>
    </div>
</section>

{% endhighlight %}
