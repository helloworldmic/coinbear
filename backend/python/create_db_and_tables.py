import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT 
from utils import connect, show_tables, execute
from config import pg_config

## create tables
conn = connect(pg_config)

quries = [
    """
    CREATE TABLE price_1m(
                id BIGINT PRIMARY KEY,
                coin VARCHAR(255) NOT NULL,
                pair VARCHAR(255) NOT NULL,
                ts_unix INT NOT NULL,
                ts_string VARCHAR(255) NOT NULL,
                open DOUBLE PRECISION NOT NULL,
                high DOUBLE PRECISION NOT NULL,
                low DOUBLE PRECISION NOT NULL,
                close DOUBLE PRECISION NOT NULL,
                vol BIGINT NOT NULL
                )
    """,
    """
    CREATE TABLE price_5m(
                id BIGINT PRIMARY KEY,
                coin VARCHAR(255) NOT NULL,
                pair VARCHAR(255) NOT NULL,
                ts_unix INT NOT NULL,
                ts_string VARCHAR(255) NOT NULL,
                open DOUBLE PRECISION NOT NULL,
                high DOUBLE PRECISION NOT NULL,
                low DOUBLE PRECISION NOT NULL,
                close DOUBLE PRECISION NOT NULL,
                vol BIGINT NOT NULL
                )

    """,
    """
    CREATE TABLE price_1h(
                id BIGINT PRIMARY KEY,
                coin VARCHAR(255) NOT NULL,
                pair VARCHAR(255) NOT NULL,
                ts_unix INT NOT NULL,
                ts_string VARCHAR(255) NOT NULL,
                open DOUBLE PRECISION NOT NULL,
                high DOUBLE PRECISION NOT NULL,
                low DOUBLE PRECISION NOT NULL,
                close DOUBLE PRECISION NOT NULL,
                vol BIGINT NOT NULL
                )

    """,
    """
    CREATE TABLE price_1d(
                id BIGINT PRIMARY KEY,
                coin VARCHAR(255) NOT NULL,
                pair VARCHAR(255) NOT NULL,
                ts_unix INT NOT NULL,
                ts_string VARCHAR(255) NOT NULL,
                open DOUBLE PRECISION NOT NULL,
                high DOUBLE PRECISION NOT NULL,
                low DOUBLE PRECISION NOT NULL,
                close DOUBLE PRECISION NOT NULL,
                vol BIGINT NOT NULL
                )

    """

]

print('Creating tables...')
for query in quries:
    execute(conn, query)
print('Done!')

show_tables(conn)