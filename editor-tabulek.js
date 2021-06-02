let table;
let activeCell;

//create table and buttons
window.onload = () => {
    createDefaultTable(3, 5);
    createDefaultButtons();
}


/**
 * function to create table
 * @returns new table
 */
function createDefaultTable(rows, columns) {
    table = document.createElement("table");
    document.body.appendChild(table);

    //create rows
    for (let y = 0; y < rows; y++) {
        let tr = document.createElement("tr");
        table.appendChild(tr);

        //create columns
        for (let x = 0; x < columns; x++) {
            tr.appendChild(createCell());
        }
    }
}

/**
 * function to create a cell (td)
 * @returns new cell
 */
function createCell() {
    let td = document.createElement("td");
    let tdInput = document.createElement("input");
    tdInput.type = "text";

    //v this bude input, ktery vyvola udalost
    tdInput.onfocus = () => {
        activeCell = this;
    }

    td.appendChild(tdInput);

    return td;
}

/**
 * function to create button
 * @param {button title} description 
 * @param {button's parent} parent 
 * @returns new button
 */
function createAndInsertButton(description, parent) {
    let divButton = document.createElement("div");
    let btn = document.createElement("button");
    btn.textContent = description;
    divButton.appendChild(btn)
    parent.appendChild(divButton);
    return btn;
}

/**
 * function to create main buttons
 */
function createDefaultButtons() {
    createAndInsertButton("Přidat řádek dolů", document.body);
    createAndInsertButton("Přidat řádek nahoru", document.body);
    createAndInsertButton("Přidat sloupec vlevo", document.body);
    createAndInsertButton("Přidat sloupec vpravo", document.body);
    createAndInsertButton("Odstranit řádek", document.body);
    createAndInsertButton("Odstranit sloupec", document.body);
}

