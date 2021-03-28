
function isDef(value) {
    return value !== null && value !== undefined
}

function isDirective(str) {
    return str.includes('v-')
}

function isEvent(str) {
    return str.includes('on') || str.includes('@')
}

function isUndef(value) {
    return value === null || value === undefined
}

function createFragment() {
    return document.createDocumentFragment()
}

function getElm(el) {
    return document.querySelector(el)
}

function getTextContent(el) {
    return el.textContent
}

function setTextContent(el, str) {
    el.textContent = str
}
