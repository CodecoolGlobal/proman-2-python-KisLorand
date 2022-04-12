from flask import Flask, render_template, url_for, request
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()



@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and card
    """

    return render_template('index.html')


@app.route("/api/boards", methods=['POST', 'GET'])
@json_response
def get_boards():
    """
    All the boards
    """
    if request.method == 'POST':
        data = request.get_json()
        queries.add_new_board(data['title'])
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belong to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)


@app.route("/rename_board", methods=["PATCH"])
@json_response
def rename_post():
    if request.method == "PATCH":
        table_data = request.get_json()
        return queries.update_title(table_data)


@app.route("/api/boards/<int:board_id>/new_card/", methods = ["GET", "POST"])
@json_response
def add_new_card(board_id: int):
    if request.method == "POST":
        insert_values = request.get_json()
        return queries.add_new_card_to_board(board_id, "cards", insert_values)


@app.route("/api/cards/delete/", methods=["GET", "POST", "DELETE"])
@json_response
def delete_card():
    if request.method == "DELETE":
        deleted_card = request.get_json()
        return queries.delete(deleted_card)


@app.route("/api/boards/<board_id>", methods=["DELETE"])
@json_response
def delete_board(board_id):
    return queries.delete_board(board_id)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
