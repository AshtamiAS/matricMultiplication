let rows1, columns1, rows2, columns2;

document.querySelector('.button-multiply').addEventListener('click', function() {
    rows1 = parseInt(document.getElementById('rows1').value);
    columns1 = parseInt(document.getElementById('columns1').value);
    rows2 = parseInt(document.getElementById('rows2').value);
    columns2 = parseInt(document.getElementById('columns2').value);

    const container = document.querySelector('.matrix-container');
    container.innerHTML = ''; 

    if (columns1 === rows2) {
        createMatrix(rows1, columns1, 1);
        createMatrix(rows2, columns2, 2);
        createMultiplyButton();
    } else {
        alert("For matrix multiplication, the number of columns in the first matrix must be equal to the number of rows in the second matrix.");
    }
});

function createMatrix(rows, columns, matrixNumber) {
    const container = document.querySelector('.matrix-container');
    const matrixDiv = document.createElement('div');
    matrixDiv.className = 'matrix';
    matrixDiv.innerHTML = `<h3>Matrix ${matrixNumber}</h3>`;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.className = `matrix-${matrixNumber}`;
            input.dataset.row = i;
            input.dataset.column = j;
            matrixDiv.appendChild(input);
        }
        matrixDiv.appendChild(document.createElement('br'));
    }

    container.appendChild(matrixDiv);
}

function createMultiplyButton() {
    const container = document.querySelector('.matrix-container');
    const multiplyButtonDiv = document.createElement('div');
    multiplyButtonDiv.className = 'button-div';
    const multiplyButton = document.createElement('button');
    multiplyButton.textContent = 'MULTIPLY';
    multiplyButton.className = 'button-multiply';
    multiplyButton.addEventListener('click', function() {
        multiplyMatrices(rows1, columns1, rows2, columns2);
    });
    multiplyButtonDiv.appendChild(multiplyButton);
    container.appendChild(multiplyButtonDiv);
}

function multiplyMatrices(rows1, columns1, rows2, columns2) {
    const resultRows = rows1;
    const resultColumns = columns2;
    let allFilled = true;
    for (let i = 0; i < rows1; i++) {
        for (let j = 0; j < columns1; j++) {
            const cell1 = document.querySelector(`.matrix-1[data-row='${i}'][data-column='${j}']`);
            if (cell1.value.trim() === '') {
                alert(`Matrix 1 element at row ${i + 1}, column ${j + 1} is empty.`);
                allFilled = false;
                break;
            }
        }
        if (!allFilled) break;
    }
    if (allFilled) {
        for (let i = 0; i < rows2; i++) {
            for (let j = 0; j < columns2; j++) {
                const cell2 = document.querySelector(`.matrix-2[data-row='${i}'][data-column='${j}']`);
                if (cell2.value.trim() === '') {
                    alert(`Matrix 2 element at row ${i + 1}, column ${j + 1} is empty.`);
                    allFilled = false;
                    break;
                }
            }
            if (!allFilled) break;
        }
    }

    if (!allFilled) {
        return;
    }

    const resultContainer = document.querySelector('.result-container');
    resultContainer.innerHTML = ''; 

    const resultDiv = document.createElement('div');
    resultDiv.className = 'matrix';
    resultDiv.innerHTML = `<h3>Multiplication Result</h3>`;

    for (let i = 0; i < resultRows; i++) {
        for (let j = 0; j < resultColumns; j++) {
            let sum = 0;
            for (let k = 0; k < columns1; k++) {
                const cell1 = document.querySelector(`.matrix-1[data-row='${i}'][data-column='${k}']`);
                const cell2 = document.querySelector(`.matrix-2[data-row='${k}'][data-column='${j}']`);
                const value1 = parseFloat(cell1.value) || 0;
                const value2 = parseFloat(cell2.value) || 0;
                sum += value1 * value2;
            }
            const resultCell = document.createElement('input');
            resultCell.type = 'text';
            resultCell.className = 'result-cell';
            resultCell.readOnly = true;
            resultCell.dataset.row = i;
            resultCell.dataset.column = j;
            resultCell.value = sum;

            resultDiv.appendChild(resultCell);
        }
        resultDiv.appendChild(document.createElement('br'));
    }

    resultContainer.appendChild(resultDiv);
}
