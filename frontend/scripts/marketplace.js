document.getElementById('item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('item-title').value;
    const description = document.getElementById('item-description').value;
    const price = document.getElementById('item-price').value;

    addItemToMarketplace(title, description, price);

    // Clear the form
    this.reset();
});

function addItemToMarketplace(title, description, price) {
    const itemList = document.getElementById('item-list');
}