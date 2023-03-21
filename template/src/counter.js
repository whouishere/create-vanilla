let counter = 0;
const counterElement = document.querySelector('#counter');

function setCounter(num) {
    counter = num;
    counterElement.textContent = `${counter}`;
}

setCounter(counter);
