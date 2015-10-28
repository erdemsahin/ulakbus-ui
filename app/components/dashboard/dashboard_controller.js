/**
 * Copyright (C) 2015 ZetaOps Inc.
 *
 * This file is licensed under the GNU General Public License v3
 * (GPLv3).  See LICENSE.txt for details.
 */

'use strict';

angular.module('ulakbus.dashboard', ['ngRoute'])

    .controller('DashCtrl', function ($scope, $rootScope, $timeout, $http, $cookies, RESTURL) {
        $scope.section = function (section_index) {
            $rootScope.section = section_index;
        };

        // to show search box based on authz
        $scope.$on("authz", function (event, data) {
            $scope.menuitems = data;
        });

        $scope.student_kw = "";
        $scope.staff_kw = "";

        $scope.students = [];
        $scope.staffs = [];

        $scope.search = function (where) {
            $timeout(function () {
                if (where === 'personel') {
                    // if input length greater than 2 search for the value
                    if ($scope.staff_kw.length > 2) {
                        $scope.getItems(where, $scope.staff_kw).success(function (data) {
                            $scope.staffs = data.results;
                        });
                    }
                }
                if (where === 'ogrenci') {
                    if ($scope.student_kw.length > 2) {
                        $scope.getItems(where, $scope.student_kw).success(function (data) {
                            $scope.students = data.results;
                        })
                    }
                }
            });
        };

        $scope.getItems = function (where, what) {
            return $http.get(RESTURL.url + 'ara/' + where + '/' + what);
                //.success(function (data) {
                //    return data.results;
                //});
        };

        $scope.select = function (who, type) {
            $rootScope.selectedUser = {name: who[0], tcno: who[1], key: who[2]};

            // get 'who's related transactions and manipulate sidebar menu
            $rootScope.$broadcast("menuitems", type);

            // save selected user and type to cookie
            $cookies.put("selectedUserName", who[0]);
            $cookies.put("selectedUserTcNo", who[1]);
            $cookies.put("selectedUserKey", who[2]);
            $cookies.put("selectedUserType", type);
            console.log($cookies.getAll());

        };

        // if selected user in cookie, set selectedUser
        if ($cookies.getAll()["selectedUser"]) {
            $rootScope.selectedUser = {name: $cookies.get("selectedUserName"), tcno: $cookies.get("selectedUserTcNo"), key: $cookies.get("selectedUserKey")};
            //$rootScope.$broadcast("menuitems", $cookies.get("selectedUserType"));
            console.log($cookies.getAll());
        }

    });
