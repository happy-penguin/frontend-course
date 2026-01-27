(function () {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective);

    // Controller
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrowCtrl = this;

        narrowCtrl.searchTerm = "";
        narrowCtrl.found = undefined;

        narrowCtrl.getMatchedMenuItems = function () {
            if (narrowCtrl.searchTerm.trim() === "") {
                narrowCtrl.found = [];
                return;
            }

            var promise = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);

            promise.then(function (response) {
                narrowCtrl.found = response;
            })
                .catch(function (error) {
                    console.log("Something went wrong: " + error);
                });
        };

        narrowCtrl.removeItem = function (itemIndex) {
            if (narrowCtrl.found) {
                narrowCtrl.found.splice(itemIndex, 1);
            }
        };
    }

    // Service
    MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: "GET",
                url: "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json"
            }).then(function (result) {
                var foundItems = [];
                var allData = result.data;

                for (var category in allData) {
                    var menuItems = allData[category].menu_items;

                    for (var i = 0; i < menuItems.length; i++) {
                        var description = menuItems[i].description;

                        if (description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
                            foundItems.push(menuItems[i]);
                        }
                    }
                }

                return foundItems;
            });
        };
    }

    // Directive
    function FoundItemsDirective() {
        var ddo = {
            restrict: 'E',
            template: `
      <div ng-if="list.foundItems.length === 0" class="error">Nothing found</div>
      <ul>
        <li ng-repeat="item in list.foundItems">
          <button class="btn btn-warning btn-xs" ng-click="list.onRemove({index: $index});">Don't want this one!</button>
          <b>{{ item.name }}</b> ({{ item.short_name }}) - {{ item.description }}
        </li>
      </ul>
    `,
            scope: {
                foundItems: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };

        return ddo;
    }

    // Directive Controller
    function FoundItemsDirectiveController() {
        var list = this;
    }

})();