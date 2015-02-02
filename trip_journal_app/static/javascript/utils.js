function getCookie(name) {
    var value = '; ' + document.cookie;
    var parts = value.split('; ' + name + '=');
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    } else {
        return undefined;
    }
}

function scrollToElement(elem) {
    var htmlElement = document.getElementsByTagName('html')[0],
        currentY = document.getElementsByTagName('html')[0].scrollTop,
        targetY = elem.offsetTop;
    htmlElement.scrollTop = targetY;
    return;
}

function getInsideElement(parentElement, property, propertyName) {
    var i,
    children = parentElement.children;
    if (property === 'className') {
        for (i = 0; i < children.length; i++) {
            if (children[i].classList.contains(propertyName)) {
                return children[i];
            }
        }
    }
    for (i = 0; i < children.length; i++) {
        if (children[i][property] === propertyName) {
            return children[i];
        }
    }
    return;
}

