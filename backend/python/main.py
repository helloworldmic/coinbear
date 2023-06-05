from config import pg_config, pair_ids, data_update_freq
import yfinance as yf
import time
from utils import connect, show_tables, execute


def insert_df(conn, df, pair, interval, pair_id):
    coin = pair.split('-')[0]
    table_name = f'price_{interval}'
    for i, row in (df.iterrows()):
        ts_unix = int(time.mktime(i.timetuple()))
        ts_string = i.strftime("%Y-%m-%d %H:%M:%S")
        open_ = row['Open']
        close = row['Close']
        high = row['High']
        low = row['Low']
        vol = int(row['Volume'])
        id_ = str(pair_id) + str(ts_unix)
        id_ = int(id_)

        query = f"""
        INSERT into {table_name}(id, ts_unix, ts_string, open, close, high, low, vol, coin, pair) \
        values({id_}, {ts_unix}, '{ts_string}', {open_}, {close}, {high}, {low}, {vol}, '{coin}', '{pair}') \
        ON CONFLICT DO NOTHING;
        """
        execute(conn, query)


if __name__ == "__main__":
    print('Connecting into databse...')
    conn = connect(pg_config)
    print('Done!')
    print('Found tables:')
    show_tables(conn)

    start_time = int(time.time())
    is_first_time = True
    while True:
        if is_first_time:
            # download and insert all data anyway if it's the first loop
            time_diff = 0
            is_first_time = False
        else:
            time_diff = int(time.time()) - start_time
            # reset the time diff after 1d
            time_diff = time_diff % data_update_freq['1d']

        # 1m data
        if time_diff % data_update_freq['1m'] == 0:
            print('Crawling 1m data from yahoo finance...')
            all_data = {
                'BTC-USD': yf.download(tickers='BTC-USD', period='7d', interval='1m'),
                'ETH-USD': yf.download(tickers='ETH-USD', period='7d', interval='1m'),
                'SAND-USD': yf.download(tickers='SAND-USD', period='7d', interval='1m'),
            }
            print('Inserting data into databse')
            for pair, data in all_data.items():
                print(f'{pair}...')
                insert_df(conn, data, pair, interval='1m',
                          pair_id=pair_ids[pair])
            print('Done!')

        # 5m data
        if time_diff % data_update_freq['5m'] == 0:
            print('Crawling 5m data from yahoo finance...')
            all_data = {
                'BTC-USD': yf.download(tickers='BTC-USD', period='60d', interval='5m'),
                'ETH-USD': yf.download(tickers='ETH-USD', period='60d', interval='5m'),
                'SAND-USD': yf.download(tickers='SAND-USD', period='60d', interval='5m'),
            }
            print('Inserting data into databse')
            for pair, data in all_data.items():
                print(f'{pair}...')
                insert_df(conn, data, pair, interval='5m',
                          pair_id=pair_ids[pair])
            print('Done!')

        # 1h data
        if time_diff % data_update_freq['1h'] == 0:
            print('Crawling 1h data from yahoo finance...')
            all_data = {
                'BTC-USD': yf.download(tickers='BTC-USD', period='730d', interval='1h'),
                'ETH-USD': yf.download(tickers='ETH-USD', period='730d', interval='1h'),
                'SAND-USD': yf.download(tickers='SAND-USD', period='730d', interval='1h'),
            }
            print('Inserting data into databse')
            for pair, data in all_data.items():
                print(f'{pair}...')
                insert_df(conn, data, pair, interval='1h',
                          pair_id=pair_ids[pair])
            print('Done!')

        # 1d data
        if time_diff % data_update_freq['1d'] == 0:
            print('Crawling 1d data from yahoo finance...')
            all_data = {
                'BTC-USD': yf.download(tickers='BTC-USD', period='1513d', interval='1d'),
                'ETH-USD': yf.download(tickers='ETH-USD', period='1513d', interval='1d'),
                'SAND-USD': yf.download(tickers='SAND-USD', period='1513d', interval='1d'),
            }
            print('Inserting data into databse')
            for pair, data in all_data.items():
                print(f'{pair}...')
                insert_df(conn, data, pair, interval='1d',
                          pair_id=pair_ids[pair])
            print('Done!')

        # sleep a while, no hurry
        time.sleep(3)
