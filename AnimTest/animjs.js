// we create an element
const box = document.createElement("div")

// add it to the DOM
document.body.appendChild(box)

// add two css classes
box.classList.add("box", "faded-out")

// and remove 'faded-out' in order to fade-in our element
requestAnimationFrame(() => {
  box.classList.remove("faded-out")
}) 