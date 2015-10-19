---
layout: post
category: blog
title: 'ASP.NET MVC AngularJS Routing & Setup'
date: 2015-09-20 19:00
---

Setup of an AngularJS application, in particular routing, is typically painless and super easy to get started. There are [so](https://github.com/angular/angular-seed) [many](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate) [great](https://github.com/ngbp/ngbp) [boilerplates](https://github.com/linnovate/mean). You may be wondering how this post will be different. If you spend any time in the .NET front end world and haven't ever found yourself Googling, "asp.net mvc angularjs routing" consider yourself lucky. The big issue that I encountered when trying to setup a solution in Visual Studio using .NET MVC and Angular was that MVC has routing baked in, something that Angular also does *really* well. Naturally they are both competing for your affection. I found a bunch of great articles that helped me piece together a solution that worked best for my project.

## Our Solution's Needs

The main reason we chose to keep the ASP.NET MVC architecture around was to have a familiar server side language at our disposal. The application we were building is used to manage users and settings for the numerous scanning devices our clients use to scan in patrons at an event. Therefore, we needed authentication with AES-256 encryption and we didn't want our key and vector strings hanging out in some JavaScript source file. So alas, we decided to use the server side features of ASP.NET MVC to take care of the initial login as well as changing passwords for users once they were authenticated.

## ASP.NET MVC Pieces

### Index.cshtml
A good first step in spinning up the solution is dealing with the ASP.NET MVC (MVC from here on out) features. Typically all of your MVC views would be `.cshtml` files and for good reason. Although with AngularJS, we don't have a need for the great features you get by using a server side compiled file on the clientside. The two big points that come to mind are Razor's data binding syntax and connecting views to MVC controllers. The only `.cshtml` file I kept around was `Home/Index.cshtml` file which I used as the layout for the application. You can delete all other folders and files in the Views folder. A brief version of this file looks like this:

{% highlight html %}
<!DOCTYPE html>
<html ng-app="adminApp">
<head>
    <title ng-bind="title + ' | Admin App'"></title>
    <base href="/AdminApp/" />
</head>
<body ng-cloak ng-controller="RootController">
    <div ng-view></div>

    @Scripts.Render("~/bundles/app")
</body>
</html>
{% endhighlight %}

Pretty standard stuff in the code above. The only thing to keep a mental note of is `<base href="/AdminApp/" />` which our application will rely on for routing.

**Note:** Pay attention to ensure the `_ViewStart.cshtml` file doesn't pop back up in the Views folder as we go along, when creating new controllers Visual Studio seems to regenerate this file.

### RouteConfig.cs
One of the most important files and bits of code that might not be the prettiest is the `RouteConfig.cs` file which would typically handle our MVC routing without us making any changes to it. In this case, we create a new `MapRoute` called *API* which we can use to make `$http` requests in our AngularJS app to our MVC controller and return a `JsonResult`. The second `MapRoute` is an edited version of the default, with the major change being the URL which I changed to `"{*url}"` which will capture all requests (not prefixed with `/api`) and will hit our Home/Index controller action and kick off our application by returning the `Home/Index.cshtml` view which is our layout.

{% highlight csharp %}
public class RouteConfig
{
    public static void RegisterRoutes(RouteCollection routes)
    {
        routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

        routes.MapRoute(
            name: "API",
            url: "api/{controller}/{action}",
            defaults: new { controller = "Login", action = "Authenticate" }
        );

        routes.MapRoute(
            name: "Default",
            url: "{*url}",
            defaults: new { controller = "Home", action = "Index" }
        );
    }
}
{% endhighlight %}

### New "Views" folder

MVC treats the `Views` folder with special consideration; therefore I decided it was best to create a new folder called `Templates`. You can of course call this whatever you'd like, the only purpose it has is to house our HTML files. That's right, no more `.cshtml` files - only HTML from here on out! Our only `.cshtml` file will be the `Home/Index.cshtml` file that was previously discussed.

## AngularJS Pieces

Just as a note, the main structure of my JavaScript files looks like this:

{% highlight markdown %}
Scripts/
└── app/
     ├── home/
     │     └── home.ctrl.js
     ├── root/
     │     └── root.ctrl.js
     ├── login/
     │     ├── login.ctrl.js
     │     └── login.svc.js
     ├── app.js
     ├── config.js
     └── config.route.js
{% endhighlight %}

Now that we have our server side routing in place, we now need to setup our Angular routing. We will follow a typical "stock" Angular methodology for this. You can use whatever router you please, such as [ui-router](https://github.com/angular-ui/ui-router) or any other.

### config.route.js

{% highlight js %}
(function () {
    'use strict';

    var adminApp = angular.module('adminApp');

    // Collect the routes
    adminApp.constant('routes', getRoutes());

    // Configure the routes and route resolvers
    adminApp.config(['$routeProvider', 'routes', '$locationProvider', '$httpProvider', routeConfigurator]);
    function routeConfigurator($routeProvider, routes, $locationProvider, $httpProvider) {
        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });

        $routeProvider.otherwise({ redirectTo: '/login' });
    }

    // Define the routes
    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'Templates/Login/Index.html',
                    controller: 'LoginController',
                    controllerAs: 'vm',
                    title: 'Login'
                }
            }, {
                url: '/',
                config: {
                    templateUrl: 'Templates/Home/Index.html',
                    controller: 'HomeController',
                    controllerAs: 'vm',
                    title: 'Home'
                }
            }
        ];
    }

})();

{% endhighlight %}

You've likely seen a version of this routing before when working with Angular, so I won't waste time explaining it in detail. Just notice how all of our templates point to files in the `/Template` folder, because MVC let's Angular handle all the routing.

## Conclusion

That wraps it up! You'll now have a fully functional AngularJS application, powered by ASP.NET MVC on the serverside! The only thing that MVC does for us, when it comes to routing, is point the server to the `Index.cshtml` page that then renders some markup and our Angular files. Then Angular will handle our routing from there on our.
