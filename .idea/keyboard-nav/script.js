//
// const gridItems = document.querySelectorAll('.grid-item');
// const grid = document.querySelector('.grid');
// let maxRow = 0;
// let maxCol = 0;
//
// calcRowsAndColumns();
//
// window.addEventListener('resize', () => calcRowsAndColumns());
// function calcRowsAndColumns() {
//     const columnsCSS = getComputedStyle(grid).gridTemplateColumns;
//     const columnsCount = columnsCSS.split(' ').length;
//     const rowsCount = Math.ceil(gridItems.length / columnsCount);
//
//     maxRow = rowsCount;
//     maxCol = columnsCount;
//
//     let rowCurrentCount = 1;
//     let colCurrentCount = 1;
//
//     gridItems.forEach((item) => {
//         if (colCurrentCount > columnsCount) {
//             colCurrentCount = 1;
//             rowCurrentCount++;
//         }
//         item.innerHTML = `row: ${rowCurrentCount} <br> col:${colCurrentCount}`;
//
//         item.dataset.col = colCurrentCount;
//         item.dataset.row = rowCurrentCount;
//
//         if (colCurrentCount <= columnsCount) {
//             colCurrentCount++;
//         }
//     })
//
//     const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
//     document.addEventListener('keydown', ($event) => {
//         const key = $event.key;
//         if (checkIfIsArrow($event)) {
//         }
//     })
// }
//
// const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
//
// document.addEventListener('keydown', ($event) => {
//     const key = $event.key;
//     if(checkIfIsArrow(key)){
//         if($event.target.classList.contains('grid-item')) {
//             $event.preventDefault();
//             $event.preventDefault();
//             const currentPosition = getRowAndColumn($event.target);
//             console.log(currentPosition);
//         }
//     }
// });
//
// function getRowAndColumn(element) {
//     return {
//         row: parseInt(element.dataset.row),
//         col: parseInt(element.dataset.col),
//     };
// }
//
// function checkIfIsArrow($event) {
//     return keys.includes($event.key);
// }
//
//
//
//
//
//




// -------------------------------------------------------------------------------------




const gridItems = document.querySelectorAll(".grid-item");
const grid = document.querySelector(".grid");

let maxRow = 0;
let maxCol = 0;

calcRowsAndColumns();

window.addEventListener("resize", () => calcRowsAndColumns());

function calcRowsAndColumns() {
    const columnsCSS = getComputedStyle(grid).gridTemplateColumns;
    const columnsCount = columnsCSS.split(" ").length;
    const rowsCount = Math.ceil(gridItems.length / columnsCount);

    maxRow = rowsCount;
    maxCol = columnsCount;

    let rowCurrentCount = 1;
    let colCurrentCount = 1;

    gridItems.forEach((item) => {
        if (colCurrentCount > columnsCount) {
            colCurrentCount = 1;
            rowCurrentCount++;
        }

        item.innerHTML = `row: ${rowCurrentCount} <br> col: ${colCurrentCount}`;

        item.dataset.col = colCurrentCount;
        item.dataset.row = rowCurrentCount;

        if (colCurrentCount <= columnsCount) {
            colCurrentCount++;
        }
    });
}

const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

document.addEventListener("keydown", ($event) => {
    const key = $event.key;

    if (checkIfIsArrow($event)) {
        if ($event.target.classList.contains("grid-item")) {
            $event.preventDefault();

            const currentPosition = getRowAndColunm(getCurrentFocus());

            if (key === "ArrowUp") {
                handleArrowKey(currentPosition, "row", -1);
            }
            if (key === "ArrowDown") {
                handleArrowKey(currentPosition, "row", 1);
            }
            if (key === "ArrowLeft") {
                handleArrowKey(currentPosition, "col", -1);
            }
            if (key === "ArrowRight") {
                handleArrowKey(currentPosition, "col", 1);
            }
        }
    }
});

function handleArrowKey(currentPosition, position, change) {
    let row = currentPosition.row;
    let col = currentPosition.col;

    if (position === "row") row = row + change;
    if (position === "col") col = col + change;

    if (col < 1) col = maxCol;
    if (col > maxCol) col = 1;

    if (row < 1) row = maxRow;
    if (row > maxRow) row = 1;

    setFocus(selectGridItem(row, col));
}

function setFocus(element) {
    if (element) element.focus();
}

function selectGridItem(row, col) {
    return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

function getRowAndColunm(element) {
    return {
        row: parseInt(element.dataset.row),
        col: parseInt(element.dataset.col)
    };
}

function getCurrentFocus() {
    return document.activeElement;
}

function checkIfIsArrow($event) {
    return keys.includes($event.key);
}
