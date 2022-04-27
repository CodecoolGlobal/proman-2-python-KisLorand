import data_manager
from psycopg2.sql import SQL, Literal, Identifier


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
        ORDER BY id
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


def update_title(table_data):
    return data_manager.execute_update(
        SQL("UPDATE {} SET {} = {} Where {} = {}").
            format(Identifier(table_data["dataTable"]), Identifier("title"), Literal(table_data["dataTitle"]),
                   Identifier("id"), Literal(table_data["dataId"])))


def add_new_board(title):
    new_board = data_manager.execute_insert(
        '''
        INSERT INTO boards (title) VALUES (%(title)s)
        ''', {'title': title})
    return new_board


def add_new_card_to_board(board_id, table_name, values):
    insert_new_card = data_manager.execute_insert(
        """   INSERT INTO cards (board_id, status_id, title, card_order) 
            VALUES (%(board_id)s, %(status_id)s, %(title)s, 0)""",
        {"table_name": table_name, "board_id": board_id, "status_id": values[2], "title": values[0]})
    return insert_new_card


def delete(payload):
    deleted_object = data_manager.execute_update(
        SQL("DELETE FROM {} WHERE {}={}").
            format(Identifier(payload["table_name"]), Identifier("id"), Literal(payload["id"]))
    )
    return deleted_object


def delete_board(board_id):
    data_manager.execute_delete(
        """ DELETE FROM boards
         WHERE id = %(board_id)s
         """, {'board_id': board_id}
    )


def get_all_statuses():
    return data_manager.execute_select('''select *
    from statuses''')


def change_status(table_data):
    return data_manager.execute_update(
        SQL("UPDATE cards SET status_id = {} Where id = {}").
            format( Literal(table_data["columnId"]), Literal(table_data["cardId"])))


def add_new_status(title):
    new_status = data_manager.execute_insert(
        '''
        INSERT INTO statuses (title) VALUES (%(title)s)
        ''', {'title': title})
    return new_status