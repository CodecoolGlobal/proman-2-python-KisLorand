import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    # remove this code once you implement the database

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    # remove this code once you implement the database

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def update_board(board_data):
    return data_manager.execute_insert(
    """
    UPDATE boards
    SET title= %(title)
    Where id = %(board_id)s
    """
    , {"title": board_data["boardTitle"], "board_id": board_data["boardId"]})


def add_new_card_to_board(board_id, table_name, values):
    insert_new_card = data_manager.execute_insert(
        "INSERT INTO cards (board_id, status_id, title, card_order) " \
            "VALUES (%(board_id)s, %(status_id)s, %(title)s, 0)",
        {"table_name": table_name, "board_id": board_id, "status_id": values[2], "title": values[0]})
    return insert_new_card

