let table;
let activeCell;

//create table and buttons
window.onload = () => {
    createDefaultTable(3, 5);
    createDefaultButtons();
}


/**
 * function for creating table
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
 * function for creating a cell (td)
 * @returns new cell
 */
function createCell() {
    let td = document.createElement("td");
    let tdInput = document.createElement("input");
    tdInput.type = "text";

    //v this bude input, ktery vyvola udalost
    tdInput.onfocus = function () {
        activeCell = this;
    }

    td.appendChild(tdInput);

    return td;
}

/**
 * function for creating button
 * @param {button title} description 
 * @param {button's parent} parent 
 * @returns new button
 */
function createAndInsertButton(description, parent) {
    let btnDiv = document.createElement("div");
    let btn = document.createElement("button");
    btn.textContent = description;
    btnDiv.appendChild(btn);
    parent.appendChild(btnDiv);
    return btn;
}

/**
 * function for creating main buttons
 */
function createDefaultButtons() {
    createAndInsertButton("Přidat řádek dolů", document.body).onclick = addRowBelow;
    createAndInsertButton("Přidat řádek nahoru", document.body).onclick = addRowAbove;
    //createAndInsertButton("Přidat sloupec vlevo", document.body);
    //createAndInsertButton("Přidat sloupec vpravo", document.body);
    //createAndInsertButton("Odstranit řádek", document.body);
    //createAndInsertButton("Odstranit sloupec", document.body);
}

/**
 * function for creating new row
 * @returns new row
 */
function createRow() {
    /*
    * table = <TABLE>
    * table.firstElementChild = <TR>
    * table.firstElementChild.childNodes = [<TD>]
    * table.firstElementChild.childNodes.length = number (of tds)
    */
    let newRow = document.createElement("tr");
    for (let i = 0; i< table.firstElementChild.childNodes.length; i++) {
        newRow.appendChild(createCell());
    }
    return newRow;
}

/**
 * function for finding index of active cell's row
 * @returns index of active row
 */
function findActiveCellRowIndex() {
    let searchedArea = table.childNodes;
    let searchedElement = activeCell.parentElement.parentElement //active cell is input, first parent is td, second parent is tr
    return Array.prototype.indexOf.call(searchedArea, searchedElement);
}

/**
 * function for adding a row above the active cell
 */
function addRowAbove() {
    let row = createRow();
    let activeIndex = findActiveCellRowIndex();
    table.insertBefore(row, table.childNodes[activeIndex]);
}

/**
 * function for adding row below the active cell
 */
function addRowBelow() {
    let row = createRow();
    let activeIndex = findActiveCellRowIndex();
    if (table.lastChild == table.childNodes[activeIndex]) {
        table.appendChild(row);
    }
    else {
        table.insertBefore(row, table.childNodes[activeIndex+1]);
    }
}

/**
 * function for finding index of active cell's column
 */
function findActiveCellColumnIndex() {
    let cellsInRow = activeCell.parentElement.parentElement.childNodes; //active cell is input, first parent is td, second parent is tr, tr's childs are all cells in the row
    let td = activeCell.parentElement;
    return Array.prototype.indexOf.call(cellsInRow, td);
}

