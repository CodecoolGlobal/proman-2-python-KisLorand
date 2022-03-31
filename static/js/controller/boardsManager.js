import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {

    loadBoards: async function () {
        let currenBoardId = 0;
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            currenBoardId = board.id
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.toggle-board-button[data-board-id="${board.id}"]`,
                "click",
                showHideButtonHandler
            );

        }
        document.getElementById('add-board').dataset.current_board_id = `${currenBoardId}`
        domManager.addEventListener(`#add-board[data-current_board_id="${currenBoardId}"]`,
                                    'click',
                                    addNewBoard)
    },
    // addCards: async function () {
    //     const addCardBtn = addFunctions[htmlTemplates.card];
    //     const addBtn = addCardBtn(board)
    //     domManager.addChild("#root", addBtn);
    //     domManager.addEventListener(
    //         '#root',
    //         "click",
    //         addNewCardHandler
    //     );
    // }
};

function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId).then();
}


function  addNewBoard(clickEvent){
    let inputBuilder = htmlFactory(htmlTemplates.input)
    //let newBoardContainer = document.getElementById('new-board-container')
    const input = inputBuilder('Add New Board Name')
    const buttonBuilder = htmlFactory(htmlTemplates.button)
    const addBoardButton = buttonBuilder('Add','add-board-btn')
    domManager.addChild('#new-board-container',input )
    domManager.addChild('#new-board-container',addBoardButton )
     let inputValue = document.querySelector('#new-board').value
     const title = {'title': inputValue}
    domManager.addEventListener('#add-board-btn',
                                'click',
         async () => {
        console.log('szai')
                console.log(title)
               await dataHandler.createNewBoard(title)})


}


function addNewCardHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.createNewCard("kacsa", boardId, "done")
}