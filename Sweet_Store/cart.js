// Initialize an object to store selected items, amount and prices
// An example of the structure of this object:
                                        // user ID : {
                                        //     'item name 1': [ anount, total price ],
                                        //     'item name 2': [ anount, total price],
                                        //     'item name 3': [ anount, total price]
                                        // }

const items = { };

// Function to add a new item to the selected items. This function automatically calculates
// number of ordered items and their total price.
function addItem(userName, name, amount, price) {
    if (!items.hasOwnProperty(userName)) {
        items[userName] = {};
    }

    if (!items[userName].hasOwnProperty(name)) {
        items[userName][name] = [parseInt(amount), parseInt(price) * parseInt(amount)];
    } else {
        items[userName][name] = [items[userName][name][0] + parseInt(amount), items[userName][name][1] + parseInt(price) * parseInt(amount)];
    }
};

// Export for use in other modules
module.exports = { addItem, items };
