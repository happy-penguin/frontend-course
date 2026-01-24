(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
        .filter('angularDollar', AngularDollarFilter);

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;

        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.buyItem = function (itemIndex) {
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;

        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
    }

    function ShoppingListCheckOffService() {
        var service = this;

        var toBuyItems = [
            { name: "cookies", quantity: 10, pricePerItem: 2 },
            { name: "pineapples", quantity: 5, pricePerItem: 4 },
            { name: "radishes", quantity: 4, pricePerItem: 1.2 },
            { name: "cheesecakes", quantity: 2, pricePerItem: 10 },
            { name: "fish sticks", quantity: 12, pricePerItem: 1 }
        ];

        var boughtItems = [];

        service.buyItem = function (itemIndex) {
            var item = toBuyItems[itemIndex];
            toBuyItems.splice(itemIndex, 1);
            boughtItems.push(item);
        };

        service.getToBuyItems = function () {
            return toBuyItems;
        };

        service.getBoughtItems = function () {
            return boughtItems;
        };
    }

    function AngularDollarFilter() {
        return function (input) {
            input = input || 0;
            input = parseFloat(input);
            return "$$$" + input.toFixed(2);
        };
    }

})();