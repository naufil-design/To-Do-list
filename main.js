let itemsArray = JSON.parse(localStorage.getItem('items')) || [];

function add() {
  const itemName = document.getElementById('item-name').value.trim();
  if (itemName !== '') {
    const newItem = {
      name: itemName,
      checked: false,
      pinned: false
    };
    itemsArray.push(newItem);
    updateLocalStorage();
    renderItems();
    document.getElementById('item-name').value = '';
  }
}

function renderItems() {
  const listContainer = document.getElementById('list-container');
  const pinnedItemsContainer = document.getElementById('pinned-items-container');
  listContainer.innerHTML = '';
  pinnedItemsContainer.innerHTML = '';

  // Pisahkan item yang dipinned dan tidak dipinned
  itemsArray.forEach(item => {
    const container = item.pinned ? pinnedItemsContainer : listContainer;
    renderItem(item, container);
  });
}

function renderItem(item, container) {
  const addItem = document.createElement('div');
  addItem.classList.add('item');
  if (item.pinned) {
    addItem.classList.add('pinned');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('check');
  checkbox.checked = item.checked;
  checkbox.onchange = function() {
    item.checked = checkbox.checked;
    updateLocalStorage();
    renderItems();
  };
  addItem.appendChild(checkbox);

  const addItemTitle = document.createElement('p');
  addItemTitle.textContent = item.name;
  addItemTitle.style.textDecoration = item.checked ? 'line-through' : 'none';
  addItem.appendChild(addItemTitle);

  const removeButton = document.createElement('button');
  removeButton.classList.add('remove', 'icon', 'ion-md-trash');
  removeButton.onclick = function() {
    this.parentElement.classList.add('removing');

    setTimeout(() => {
    itemsArray = itemsArray.filter(i => i !== item);
    updateLocalStorage();
    renderItems();
    }, 400);
  };
  addItem.appendChild(removeButton);

  const pinButton = document.createElement('button');
  pinButton.classList.add('pin', 'icon', item.pinned ? 'ion-md-arrow-dropdown' : 'ion-md-arrow-dropup');
  pinButton.onclick = function() {
    item.pinned = !item.pinned;
    updateLocalStorage();
    renderItems();
  };
  addItem.appendChild(pinButton);

  container.appendChild(addItem);
}

function updateLocalStorage() {
  localStorage.setItem('items', JSON.stringify(itemsArray));
}

document.addEventListener('DOMContentLoaded', renderItems);