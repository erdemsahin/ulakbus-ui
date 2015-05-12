'use strict';

// TODO: clean console log items
// TODO: password hash or not??
// TODO: who field can be removed??

var login = angular.module('zaerp.login', ['ngRoute', 'schemaForm']);
login.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'LoginCtrl'
        });
    }]);
login.controller('LoginCtrl', function ($scope, $http, $location, $rootScope, AUTH_EVENTS, LoginService) {
        $scope.schema =
        {
            title: "Login",
            type: "object",
            properties: {
                email: {
                    type: "email",
                    title: "Email"
                },
                password: {
                    type: "string",
                    title: "Password"
                },
                remember: {
                    type: "boolean",
                    title: "Remember me?"
                },
                who: {
                    title: "Who are you?",
                    type: "string",
                    enum: ["student", "stuff", "dean"]
                }
            },
            required: ["email", "password", "who"]
        };
        $scope.model = {
            email: "user@example.com",
            remember: false
        };
        $scope.form = [
            {
                key: "email",
                type: "email"
            },
            {
                key: "password",
                type: "password"
            },
            "remember",
            "who",
            {
                type: "submit",
                title: "Save"
            }
        ];
        $scope.onSubmit = function(form){
            //$scope.$broadcast('schemaFormValidate');
            console.log(form);
            if (form.$valid){
                $rootScope.loggedInUser = true;
                $location.path("/dashboard");

                var credentials = {email: form.email, password: form.password};

                var loginResponse = LoginService.login(credentials);
                console.log(loginResponse);

                //$http.post('http://127.0.0.1:8003/#/login', form.email).
                //    success(function(data, status, headers, config){
                //        console.log(data);
                //    }).
                //    error(function(data, status, headers, config){
                //        console.log("form submit failed: "+status);
                //    });
            }
            else {
                console.log("not valid");
            }
        }
    });