# COVID-19 Dashboard | Server

## Dataset

https://www.kaggle.com/sudalairajkumar/novel-corona-virus-2019-dataset?select=covid_19_data.csv

## Import CSV Dataset to MongoDb Atlas

- Install *mongoimport* by following https://docs.atlas.mongodb.com/import/mongoimport/

- `mongoimport --uri "mongodb+srv://<username>:<password></password>@cluster0.etvin.mongodb.net/data" --collection covid19_data --drop --type=csv --headerline --file .\covid_19_data.csv`