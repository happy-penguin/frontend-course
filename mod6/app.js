(function () {
    'use strict';

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = "";
        $scope.message = "";
        $scope.messageColor = "";
        $scope.borderColorClass = "";

        $scope.checkLunch = function () {
            if (!$scope.lunchMenu || $scope.lunchMenu.trim().length === 0) {
                $scope.message = "Please enter data first";
                $scope.messageColor = "red";
                $scope.borderColorClass = "border-red";
                return;
            }

            // Split by comma
            var arrayDishes = $scope.lunchMenu.split(',');

            // Filter out empty items
            var realDishes = arrayDishes.filter(function (item) {
                return item.trim() !== "";
            });

            var count = realDishes.length;

            if (count === 0) {
                // Case where user entered only commas
                $scope.message = "Please enter data first";
                $scope.messageColor = "red";
                $scope.borderColorClass = "border-red";
            } else if (count <= 3) {
                $scope.message = "Enjoy!";
                $scope.messageColor = "green";
                $scope.borderColorClass = "border-green";
            } else {
                $scope.message = "Too much!";
                $scope.messageColor = "green";
                $scope.borderColorClass = "border-green";
            }
        };
    }

})();