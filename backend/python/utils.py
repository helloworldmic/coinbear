import psycopg2


def connect(pg_config):
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # connect to the PostgreSQL server
        print('Connecting to the PostgreSQL database...')
        conn = psycopg2.connect(**pg_config)
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    return conn

def execute(conn, query):
    """ Execute a single INSERT request """
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error} \By {query}")
        conn.rollback()
        cursor.close()
        return 1
    cursor.close()

def show_tables(conn):
    cursor = conn.cursor()
    try:
        cursor.execute("""SELECT table_name FROM information_schema.tables
                       WHERE table_schema = 'public'""")
        conn.commit()
        for table in cursor.fetchall():
            print(table)
    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Error: {error}")
        conn.rollback()
        cursor.close()
        return 1
    cursor.close()