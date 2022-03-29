import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates, addFunctions} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );
            const addCardBtn = addFunctions[htmlTemplates.card];
            const addBtn = addCardBtn(board)
            domManager.addChild("#root", addBtn);
            domManager.addEventListener('#root', "click", dataHandler.createNewCard);
        }
    },
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId);
}
