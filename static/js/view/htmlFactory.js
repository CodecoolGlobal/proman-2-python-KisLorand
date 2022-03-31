export const htmlTemplates = {
    board: 1,
    card: 2,
    input: 3,
    button: 4
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.input]: inputBuilder,
    [htmlTemplates.button]: buttonBuilder
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
                <section class="board">
                    <div class="board-header"><span class="board-title">Board 1</span>
                        <button class="board-add">Add Card</button>
                        <button class="board-toggle"><i class="fas fa-chevron-down"></i></button>
                    </div>
                    <div class="board" data-board-id=${board.id}>${board.title}</div>
                    <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
                </section>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
}

function inputBuilder(labelText){
    return `<label for="new-board">${labelText}</label>
            <input type="text" id="new-board" value="write here">`

}


function buttonBuilder(buttonText, buttonId){
    return `<button type="button" id="${buttonId}">${buttonText}</button>`
}
