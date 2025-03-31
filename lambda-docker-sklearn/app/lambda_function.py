import pymysql
import pandas as pd
from sklearn.linear_model import LinearRegression
import os
import json

def lambda_handler(event, context):
    # 从环境变量获取 RDS 配置
    conn = pymysql.connect(
        host=os.environ['DB_HOST'],
        user=os.environ['DB_USER'],
        password=os.environ['DB_PASS'],
        db=os.environ['DB_NAME'],
        cursorclass=pymysql.cursors.DictCursor
    )

    channel = event.get("queryStringParameters", {}).get("channel", "Twitter")

    df = pd.read_sql(
        "SELECT impressions, conversions, clicks FROM ad_metrics WHERE channel = %s",
        conn, params=[channel]
    )

    if df.empty:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "数据不足"})
        }

    X = df[["impressions", "conversions"]]
    y = df["clicks"]
    model = LinearRegression().fit(X, y)
    df["predicted_clicks"] = model.predict(X)

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({
            "r2": model.score(X, y),
            "coef": model.coef_.tolist(),
            "intercept": model.intercept_,
            "data": df.to_dict(orient="records")
        })
    }