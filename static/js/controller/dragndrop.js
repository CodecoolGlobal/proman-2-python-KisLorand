const dom = {
    isEmpty: function (el) {
        return el.children.length === 0;
    },
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

const ui = {
    mixedCardsContainer: null,
    slots: null,
    cards: null,
};

const game = {
    dragged: null,
};

export function initDragAndDrop() {
    initElements();
    initDragEvents();
}

function initElements() {
    ui.cards = document.querySelectorAll(".card");
    ui.slots = document.querySelectorAll(".card-slot");
    ui.mixedCardsContainer = document.querySelector(".mixed-cards");
    console.log(ui.cards)
    console.log(ui.slots)
    ui.cards.forEach(function (card) {
        card.setAttribute("draggable", true);
        console.log("asd")
    });
}

function initDragEvents() {
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

    ui.slots.forEach(function (slot) {
        initDropzone(slot);
    });

}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(e) {
    game.dragged = e.currentTarget;
    console.log("Drag start of", game.dragged);
    slotHighlighter();
}

function handleDragEnd(e) {
    console.log("Drag end of", game.dragged);
    slotHighlighter();

    game.dragged = null;
}

function handleDragOver(e) {
    e.preventDefault();

}

function handleDragEnter(e) {
    console.log("Drag enter of", e.currentTarget);
        e.currentTarget.style.backgroundColor = 'green';
}

function handleDragLeave(e) {
    console.log("Drag Leave of", e.currentTarget);
    e.currentTarget.style.backgroundColor = '';
}

function handleDrop(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    console.log("Drop of", dropzone);
    if (dom.hasClass(dropzone, "card-slot")) {
        if (dom.isEmpty(dropzone)) {
                dropzone.appendChild(game.dragged);
            e.currentTarget.style.backgroundColor = '';
        }
    }
    else if (dom.hasClass(dropzone, "mixed-cards")){
        e.currentTarget.style.backgroundColor = '';
            dropzone.appendChild(game.dragged);
    }

}

function slotHighlighter(){
    let allSlots = ui.slots
    for(let slot of allSlots) {
        slot.classList.toggle('card-slot-highlight');
    }

}
