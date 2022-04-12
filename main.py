from flask import Flask, render_template, url_for, request, session, redirect
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries
import random

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()
app.secret_key = str(random.randint(0, 16))


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


@app.route('/registration', methods=['GET', 'POST'])
def registration_page():
    if "user_name" in session:
        return redirect("/")
    if request.method == "POST":
        new_user_name = request.form.get("new-user-name")
        new_password = request.form.get("new-password")
        queries.add_new_user(new_user_name, new_password)
        return redirect('/')
    return render_template('registration.html')


@app.route('/login', methods=['GET', 'POST'])
def login_user():
    if request.method == "POST":
        input_email = request.form.get('new-user-name')
        input_password = request.form.get('new-password')
        valid_password = queries.get_user_password(input_email).get("user_password")
        if data_manager.validate_login(input_password, valid_password):
            session['user_name'] = input_email
            session['id'] = data_manager.search_user_id(input_email)
            return redirect('/')
    return render_template('login.html')


@app.route('/logout', methods=['GET', 'POST'])
def logout_user():
    session.clear()
    return redirect('/')
def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
