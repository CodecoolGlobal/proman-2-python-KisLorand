import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {

    loadBoards: async function () {
        let currenBoardId = 0;
        document.querySelector("#root").innerHTML = ""
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
        document.getElementById('add-board').dataset.current_board_id = `${currenBoardId}`
        domManager.addEventListener(`#add-board[data-current_board_id="${currenBoardId}"]`,
                                    'click',
                                    displayNewBoardInput)
                        domManager.addEventListener(
                `button#add-card-${board.id}.board-add`,
                "click",
                addNewCardHandler
            );
            domManager.addEventListener(
                `.board-title[data-board-id="${board.id}"]`,
                "click",
                renameTitle
            );
        }
    }

    }
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


function showHideButtonHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    cardsManager.loadCards(boardId).then();
}


 function displayNewBoardInput(clickEvent){
             const addNewBoardInput = document.getElementById('add-new-board-input')
             if (addNewBoardInput.style.display === 'block'){
                 addNewBoardInput.style.display = 'none'
             }else {
                 addNewBoardInput.style.display = 'block'
             }
            domManager.addEventListener('#add-board-btn',
                'click', addNewBoard )
}

async function addNewBoard(){
            const inputValue = document.querySelector('#new-board').value
             if (inputValue){
             const title = {'title': inputValue}
             let response = await dataHandler.createNewBoard(title)
                 if(response)await boardsManager.loadBoards()
}}


function renameTitle(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    let board = document.querySelectorAll(".board-header");
    let title = document.querySelectorAll(".board-title");
    let InputDiv = document.createElement("div");
    let inputField = document.createElement("input");
    inputField.setAttribute("id", "board-title-text");
    let saveBtn = document.createElement("button");
    // saveBtn.setAttribute("type", "submit");
    saveBtn.innerText = "Save";

    inputField.value = title[boardId - 1].textContent;
    InputDiv.appendChild(inputField);
    InputDiv.appendChild(saveBtn);
    board[boardId - 1].removeChild(title[boardId-1]);
    board[boardId - 1].appendChild(InputDiv);

    saveBtn.addEventListener("click", () =>{
        let addCard = document.querySelectorAll(".board-add");
        board[boardId - 1].insertBefore(title[boardId-1], board[boardId - 1].firstChild);
        board[boardId - 1].removeChild(InputDiv);
    })
}

function addNewCardHandler(clickEvent) {
    const boardId = clickEvent.target.dataset.boardId;
    dataHandler.createNewCard("New Card", boardId, 1)
}

