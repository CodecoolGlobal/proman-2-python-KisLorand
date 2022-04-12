import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {initDragAndDrop} from "./dragndrop.js"

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.board-column-content[data-board-id="${boardId}"]`, content);
            domManager.addEventListener(
                `.card[data-card-id="${card.id}"]`,
                "click",
                editCard
            );
            domManager.addEventListener(
                `.card-remove[data-card-id="${card.id}"]`,
                "click",
                deleteButtonHandler
            );
            domManager.addEventListener(
                `.card-title[data-card-id="${card.id}"]`,
                "click",
                renameTitle
            );
            startDragnDrop(boardId)
        }
    },
};

function editCard(clickEvent) {
}

function deleteButtonHandler(clickEvent) {
    const cardId = clickEvent.target.dataset.cardId;
    const card = document.querySelector(`.card[data-card-id="${cardId}"]`)
    dataHandler.getCard(cardId, "delete", `/api/cards/delete/`, cardId)
}

function renameTitle(clickEvent) {
    const cardId = clickEvent.target.dataset.cardId;
    let title = document.querySelector(`.card-title[data-card-id=\"${cardId}\"]`);
    let inputDiv = document.querySelector(`.input-div[data-card-id="${cardId}"]`);
    let inputField = document.querySelector(`.input-field[data-card-id="${cardId}"]`);
    let saveBtn = document.querySelector(`.save-btn[data-card-id="${cardId}"]`);

    title.classList.toggle("hide")
    inputField.value=title.textContent
    inputDiv.classList.toggle("hide")

    saveBtn.addEventListener("click", () =>{
    title.classList.remove("hide")
    inputDiv.classList.add("hide")
    title.textContent=inputField.value
    let table = 'cards'
    dataHandler.newBoardTitle(inputField.value, cardId, table)
    })
}

function startDragnDrop(){
    initDragAndDrop();
}