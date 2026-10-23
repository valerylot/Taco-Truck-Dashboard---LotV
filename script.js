// ----- data -----
let itemsSold = 0;
const addedItems = [];


// ----- elements -----

const statusLine = document.getElementById("status");
const openButton = document.getElementById("open-button");
const newLocation = document.getElementById("new-location");
const locationButton = document.getElementById("location-button");
const locationDisplay = document.getElementById("location-display");
const menuList = document.getElementById("menu-list");
const newItem = document.getElementById("new-item");
const newItemDescription = document.getElementById("new-item-description");
const newItemButton = document.getElementById("new-item-button");
const itemsSoldElement = document.getElementById("items-sold");
const menuForm = document.getElementById("menu-form");


// ----- functions -----

function openTruck() {
    statusLine.textContent = "Open";
    statusLine.classList.add("open");
    statusLine.classList.remove("closed");

    openButton.textContent = "Close the truck";
    openButton.classList.remove("open");
    openButton.classList.add("closed");
};

function closeTruck() {
    statusLine.textContent = "Closed";
    statusLine.classList.add("closed");
    statusLine.classList.remove("open");

    openButton.textContent = "Open the truck";
    openButton.classList.add("open");
    openButton.classList.remove("closed");
};


function disableButton() {
    locationButton.disabled = newLocation.value === "";
};

function emptyLocation() {
    locationDisplay.replaceChildren();

    // empty state
    if (newLocation.value.trim() === "") {
        const emptyLocation = document.createElement("p");
        emptyLocation.textContent = "📍 No location currently set.";
        emptyLocation.classList.add("empty");
        locationDisplay.appendChild(emptyLocation);
        return;
    }

    const locationText = document.createElement("p");
    locationText.textContent = `📍 Today we are located at: ${newLocation.value.trim()}`;

    locationDisplay.appendChild(locationText);
};


function addingItem() {
    menuList.replaceChildren();

    // empty state
    if (addedItems.length === 0) {
        itemsSoldElement.textContent = "Items Sold Today: 0";

        const empty = document.createElement("li");
        empty.textContent = "Currently no items on the menu.";
        empty.classList.add("empty");
        menuList.appendChild(empty);
        return;
    }

    addedItems.forEach(function (item) {
        const textSpan = document.createElement("span");
        const row = document.createElement("li");
        row.textContent = `${item.item}: ${item.description}`;

        menuList.appendChild(row);

        //dynamically create a SOLD ONE button
        const soldButton = document.createElement("button");
        soldButton.textContent = "Sold One";

        //this called the class that styles the button
        soldButton.classList.add("sold-button");

        // sold button and counter
        soldButton.addEventListener("click", function (event) {
            // this is used so when you click the button, the whole item doesn't get the strikethrough and grayed out
            event.stopPropagation();
            itemsSold++;
            itemsSoldElement.textContent = `Total Items Sold: ${itemsSold}`;
        });

        //adding class for sold out toggle
        row.addEventListener("click", function () {
            if(row.classList.toggle("sold-out")){
                soldButton.disabled = true;
            };
        });



        // remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", function (event) {
            event.stopPropagation();

            //removes item from array, so it doesn't appear multiple times when you add another item
            const removeItem = addedItems.indexOf(item);
            addedItems.splice(removeItem, 1);

            //this refreshes the list
            addingItem();
        });


        row.appendChild(textSpan);//
        row.appendChild(soldButton); //
        row.appendChild(removeButton);
        menuList.appendChild(row);
    });


    itemsSoldElement.textContent = `Items sold today: ${itemsSold}`;
};


// ----- listeners -----

openButton.addEventListener("click", function () {
    if (statusLine.textContent === "Closed") {
        openTruck();
    } else {
        closeTruck();
    }
});

locationButton.addEventListener("click", function () {
    const inputValue = newLocation.value;

    if (inputValue === "") {
        return;
    }

    locationDisplay.textContent = `📍Today we are located at: ${inputValue}`;

    newLocation.value = "";
    locationButton.disabled = true;
});

newLocation.addEventListener("input", disableButton);


menuForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (newItem.value === "" || newItemDescription.value === "") {
        return;
    }

    const row = document.createElement("li");

    //adding class to add spacing for the rows
    row.classList.add("row");

    addedItems.push({
        item: newItem.value.trim(),
        description: newItemDescription.value.trim()
    });

    newItem.value = "";
    newItemDescription.value = "";
    addingItem();
});



// ----- run at load -----
locationButton.disabled = true;
addingItem();
emptyLocation();
