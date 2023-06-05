db:
1. Go to https://www.anaconda.com/products/individual#macos download anaconda and install
2. Re-open your terminal to activate conda, you should see (base)
   (not VS code terminal)
3. $ pip install psycopg2
4. $ cd backend/python
   \*before that, plese change config.py to your database and namepython main.py
5. $ python create_db_and_tables.py (this will create tables in your db)
6. $ pip install yfinance
7. $ pythin main.py ------> is that right? (by mich )  
   error: File "main.py", line 9
   table*name = f'price*{interval}'
   ^
   SyntaxError: invalid syntax

20210106 update:
routes.ts
/trade-->/transaction
and all APIs become /api/transaction
e.g. /api/transaction/transaction

related part on the frontend: /trade
post trade form: /api/transaction/transaction

how to start:
for backend: cd backend --> yarn dev
<!-- need to create a folder called data
dataset's name:gemini_BTCUSD_2021_1min.csv
if it's changed to .xls, rmb to change back to .csv

it takes about 8 mins to insert data

to check :

select count(\*) from tablename -->
