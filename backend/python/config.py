## PostgreSQL config
pg_config = {
    "host"      : "127.0.0.1",
    "database"  : "final_project",
    "user"      : "janet",
    "password"  : "",
    "port"      : "5432",
}

## pair id will be used for creating id in price table
# id in price table will be: concat(pair_id, unixtime)
pair_ids = {
    "BTC-USD"   : 1,
    "ETH-USD"   : 2,
    "SAND-USD"  : 3,
}

## time interval in seconds between downloading and inserting price data
# prime number makes it less likely to download different interval data at once
data_update_freq = {
    "1m": 59,
    "5m": 293,
    "1h": 3593,
    "1d": 86399
}