let table;
let activeCell;

//create table and buttons
window.onload = () => {
    createDefaultButtons();
    createDefaultTable(3, 5);    
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
 * function for creating main buttons
 */
function createDefaultButtons() {
    createAndInsertButton("Přidat řádek dolů", document.body).onclick = addRowBelow;
    createAndInsertButton("Přidat řádek nahoru", document.body).onclick = addRowAbove;
    createAndInsertButton("Přidat sloupec vlevo", document.body).onclick = addColumnLeft;
    createAndInsertButton("Přidat sloupec vpravo", document.body).onclick = addColumnRight;
    createAndInsertButton("Odstranit řádek", document.body).onclick = deleteRow;
    createAndInsertButton("Odstranit sloupec", document.body).onclick = deleteColumn;
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
    //let btnDiv = document.createElement("div");
    let btn = document.createElement("button");
    btn.textContent = description;
    //btnDiv.appendChild(btn);
    parent.appendChild(btn);
    return btn;
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
    let searchedArea = table.childNodes; //table.childNodes returns array of table rows
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

/**
 * function for adding a column to the left from the active cell
 */
function addColumnLeft() {
    let activeIndex = findActiveCellColumnIndex();
    for (let i = 0; i< table.childNodes.length; i++) {
        table.childNodes[i].insertBefore(createCell(), table.childNodes[i].childNodes[activeIndex])
    }
}

/**
 * function for adding a column to the right from the active cell
 */
function addColumnRight() {
    let activeIndex = findActiveCellColumnIndex();
    for (let i = 0; i< table.childNodes.length; i++) {
        if(table.childNodes[i].childNodes[activeIndex]==table.childNodes[i].lastElementChild) {
            table.childNodes[i].appendChild(createCell());
        }
        else {
            table.childNodes[i].insertBefore(createCell(), table.childNodes[i].childNodes[activeIndex+1])
        }
    }
}

/**
 * function for deleting a row of an active cell
 */
function deleteRow() {
    let activeIndex = findActiveCellColumnIndex();
    table.removeChild(table.childNodes[activeIndex]);
}

/**
 * function for deleting a column of an active cell
 */
function deleteColumn() {
    let activeIndex = findActiveCellColumnIndex();
    for (let i = 0; i<table.childNodes.length; i++) {
        table.childNodes[i].removeChild(table.childNodes[i].childNodes[activeIndex]);
    }
}