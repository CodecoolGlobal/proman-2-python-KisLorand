import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js"
import {renameTitle} from "./boardsManager.js";


export let columnManager = {
    loadColumns: async function (boardId) {
        const statuses = await dataHandler.getStatuses()
        for (let status of statuses) {
            const columnBuilder = htmlFactory(htmlTemplates.column)
            const content = columnBuilder(boardId, status)
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content)
            domManager.addEventListener(
                `.board-column-title[data-column-id="${status.id}"][data-board-id="${boardId}"]`,
                'click',
                (e)=>{
                    let title = e.target
                    console.log(e.target)
                    renameTitle(status.id, 'column',title)
                }
                )
        }
        cardsManager.loadCards(boardId).then()
    }
}

