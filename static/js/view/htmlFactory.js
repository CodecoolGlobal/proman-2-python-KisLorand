export const htmlTemplates = {
    board: 1,
    card: 2,
    column: 3

}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.column]: columnBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="board-container">
                <section class="board" data-board-id=${board.id}>
                    <div class="board-header">
                        <div class="board-title" data-board-id=${board.id}>${board.title}</div>
                        <div class="input-div hide" data-board-id=${board.id}>
                                 <input class="input-field" data-board-id=${board.id}>
                                 <button class="save-btn" data-board-id=${board.id}>Save</button>
                        </div>
                        <button class="board-add" id="add-card-${board.id}" data-board-id=${board.id}>Add Card</button>
                        <button class="board-toggle" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
                    </div> 
                    <div class="board-columns" data-board-id="${board.id}">
                    
                    </div>
                </section>
            </div>`;
}

function cardBuilder(card) {

    return `<div class="card hide" data-card-id="${card.id}">
                <div class="card-remove" data-card-id="${card.id}"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" data-card-id=${card.id}>${card.title}</div>
                <div class="input-div hide" data-card-id=${card.id}>
                    <input class="input-field" data-card-id=${card.id}>
                    <button class="save-btn" data-card-id=${card.id}>Save</button>
                </div>
            </div>`;
}


function columnBuilder(boardId,status) {
    return `<div class="board-column" data-board-id="${boardId}"> 
    <div class="board-column-title" data-column-id='${status.id}'>${status.title}</div>
        <div class="board-column-content" data-coulmn-id="${status.id}" data-board-id="${boardId}">
        </div>
    </div>`
}