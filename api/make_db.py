import pandas as pd
import sqlite3
from pandas.io import sql


def writeInSqlite(dataframe, database_file, table_name):
    conn = sqlite3.connect(database_file)
    dataframe.to_sql(name=table_name, con=conn, if_exists="replace")


def readFromSqlite(database_file, table_name):
    conn = sqlite3.connect(database_file)
    return sql.read_sql("select * from " + table_name, conn)


def generateCleanDf():
    credits_df = pd.read_csv("./movies/creditsClean.csv", error_bad_lines=False)
    movies_df = pd.read_csv("./movies/metadataClean.csv", error_bad_lines=False)
    movies_df = movies_df[
        [
            "id",
            "imdb_id",
            "genres",
            "original_title",
            "overview",
            "poster_path",
            "release_date",
            "runtime",
            "vote_average",
            "vote_count",
        ]
    ]
    credits_df.id = pd.to_numeric(credits_df.id, errors="coerce")
    movies_df.id = pd.to_numeric(movies_df.id, errors="coerce")
    movies_df = movies_df.set_index("id").join(credits_df.set_index("id"))
    movies_df.dropna(inplace=True)

    writeInSqlite(movies_df, "./movies.db", "MOVIES")


if __name__ == "__main__":
    generateCleanDf()
    print("No more database generation necessary")
    print("Use this file to test how to use the database")
