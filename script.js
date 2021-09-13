var filter = document.getElementById('filter');
var form = document.getElementById('add-Form');
var itemList = document.getElementById('items');
var para = document.getElementById('para');
var line = document.getElementById('line');
var reload = document.getElementById('clear');


form.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
itemList.addEventListener('click', completeItem);
filter.addEventListener('keyup', filterItem);
reload.addEventListener('click', reloadPage);

//For adding item to the list
function addItem(e) {
    e.preventDefault();
    // console.log("submitted");
    para.style.display = 'none';
    line.style.display = 'none';
    var newItem = document.getElementById('item');
    var val = newItem.value
    console.log(val);
    var li = document.createElement('li');
    li.className = 'list-group-item mt-2';
    li.appendChild(document.createTextNode(val));

    //Appending delete button to li
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
    var icon = document.createElement('i');
    icon.className = 'fas fa-trash';
    icon.style.color = 'white';
    deleteBtn.appendChild(icon);
    li.appendChild(deleteBtn);

    //Appending complete button to li
    var completeBtn = document.createElement('button');
    completeBtn.className = 'btn btn-success btn-sm float-end complete me-3';
    var completeIcon = document.createElement('i');
    completeIcon.className = 'fas fa-check-square';
    completeIcon.style.color = 'white';
    completeBtn.appendChild(completeIcon);
    li.appendChild(completeBtn);

    itemList.appendChild(li);
    newItem.value = '';
}

 //For deleting the item
function removeItem(e) {
    // console.log('remove');
    // console.log(e.target.parentNode.classList);
    if (e.target.parentElement.classList.contains('delete')) {
        if (confirm("Are you sure you want to delete the item?")) {
            var tar = e.target.parentElement.parentElement;
            itemList.removeChild(tar);
            var c = itemList.childElementCount;
            console.log(c);
            if (c !== 1) {
                para.style.display = 'none';
                line.style.display = 'none';
            }
            else {
                para.style.display = 'block';
                line.style.display = 'block';
            }
        }
    }
}

//For cutting the item after buying it
function completeItem(e) {
    // console.log('complete');
    // console.log(e.target.parentNode.classList);
    if (e.target.parentElement.classList.contains('complete')) {
        if (confirm("Have you bought the item?")) {
            var tar = e.target.parentElement.parentElement;
            //console.log(tar.childNodes);
            var text = tar.textContent;
            // console.log(text);
            tar.innerHTML = `<del>${text}</del>`;

            var deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-danger btn-sm float-end delete';
            var icon = document.createElement('i');
            icon.className = 'fas fa-trash';
            icon.style.color = 'white';
            deleteBtn.appendChild(icon);
            tar.appendChild(deleteBtn);

            var completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-success btn-sm float-end complete me-3';
            var completeIcon = document.createElement('i');
            completeIcon.className = 'fas fa-check-square';
            completeIcon.style.color = 'white';
            completeBtn.appendChild(completeIcon);
            tar.appendChild(completeBtn);
        }
    }
}


//For filtering the desired item
function filterItem(e) {
    var text = e.target.value.toLowerCase();
    // console.log(text);
    var items = itemList.getElementsByTagName('li');
    Array.from(items).forEach(function (item) {
        var itemName = item.firstChild.textContent;
        // console.log(itemName);
        
        //If the searched text matches with the content of the item
        if (itemName.toLowerCase().indexOf(text) != -1) {
            item.style.display = 'block';
        }
        //If the searched text does not match with the content of the item
        else {
            item.style.display = 'none';
        }
    })
}

//For clearing the entire list
function reloadPage(e) {
    console.log('reload');
    if (confirm("Do you really want to clear the list?")) {
        itemList.innerHTML = "";
        para.innerHTML = 'No items in the list ! Use "Add Items" section above to add the items.';
        para.style.display = 'block';
        line.style.display = 'block';
    }
}
