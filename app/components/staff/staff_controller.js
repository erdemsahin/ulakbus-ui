/**
 * Copyright (C) 2015 ZetaOps Inc.
 *
 * This file is licensed under the GNU General Public License v3
 * (GPLv3).  See LICENSE.txt for details.
 */

'use strict';


var staff = angular.module('zaerp.staff', ['ngRoute', 'schemaForm', 'formService']);


/**
 * StaffAddEditCtrl is a controller
 * which provide a form with form generator.
 */

staff.controller('StaffAddEditCtrl', function ($scope, $rootScope, $http, $log, Generator, $routeParams) {
    $scope.url = 'personel_duzenle_basitlestirilmis';
    var form_params = {};
    if ($routeParams.id) {
        form_params['object_id'] = $routeParams.id;
        form_params['cmd'] = 'edit_object';
    }
    else {
        form_params['cmd'] = 'add_object';
    }
    if ($rootScope.staffwfclear){
        form_params['clear_wf'] = 1;
    } else{
        $rootScope.staffwfclear = 1
    }

    Generator.get_form($scope.url, form_params).then(function (object) {
        var d = object.data.forms;
        // add form, schema and model to scope object
        for (var key in d)
            $scope[key] = d[key];
        $scope.initialModel = angular.copy($scope.model);
        $scope.form.push(
            {
                type: "submit",
                title: "Save"
            }
        );
    });
    $scope.onSubmit = function (form) {
        $scope.$broadcast('schemaFormValidate');
        if (form.$valid) {
            Generator.submit($scope);
        }
    }
});

// todo: for single point of failure code a "get item" service and use it to
// retrieve list and single item

/**
 * Staff List Controller
 */

staff.controller('StaffListCtrl', function ($scope, $rootScope, Generator) {
    var form_params = {};
    if ($rootScope.staffwfclear){
        form_params['clear_wf'] = 1;
    } else{
        $rootScope.staffwfclear = 1
    }
    Generator.get_form('personel_duzenle_basitlestirilmis', form_params)
        .then(function (res) {
            console.log(res);
            $scope.staffs = res.data.employees;
        });
});

/**
 * Staff Show Controller
 */
staff.controller('StaffShowCtrl', function ($scope, $rootScope, Generator, $routeParams) {
    var form_params = {"object_id": $routeParams.id};
    if ($rootScope.staffwfclear){
        form_params['clear_wf'] = 1;
    } else{
        $rootScope.staffwfclear = 1
    }
    Generator.get_form('personel_duzenle_basitlestirilmis', form_params).then(function (res) {
        $scope.staff = res.data[0];
    })
});