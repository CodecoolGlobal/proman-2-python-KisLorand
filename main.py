from flask import Flask, render_template, url_for, request
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()

@app.route("/", methods=["GET", "POST"])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belong to a board
    :param board_id: id of the parent board
    """
    return queries.get_cards_for_board(board_id)

@app.route("/rename_board", methods=["GET", "POST"])
def rename_post():
    if request.method == "POST":
        board_data = request.get_json()
        queries.update_board(board_data)

@app.route("/api/boards/<int:board_id>/new_card/", methods = ["GET", "POST"])
@json_response
def add_new_card(board_id: int):
    if request.method == "POST":
        insert_values = request.get_json()
        return queries.add_new_card_to_board(board_id, "cards", insert_values)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
