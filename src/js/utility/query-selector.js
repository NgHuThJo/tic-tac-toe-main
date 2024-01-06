function getElement(selector) {
    return document.querySelector(selector);
}

function getAllElements(selector) {
    return document.querySelectorAll(selector);
}

export { getElement, getAllElements };