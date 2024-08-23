import pandas as pd
import requests
import matplotlib.pyplot as plt
from lighthouseweb3 import Lighthouse
import math
import os
import json
from dotenv import load_dotenv
url = requests.get("https://gateway.lighthouse.storage/ipns/k51qzi5uqu5dm1uuht9e59h4qrvqs9pjx8a3cf1sz7x7j0vyyolywu8v3abls8").text
if(url == "{}"):
    print("You need some data to run your model")
response = requests.get(f"https://gateway.lighthouse.storage/ipfs/{url}")
data=response.json()
load_dotenv()
lh = Lighthouse(token=os.getenv("LHKey"))

def calculate_historical_volatility(data, period):
    # Calculate daily percentage change in closing price
    try:
        data['daily_change'] = data['priceChange24h'] / data['price']
        # Calculate volume-weighted average daily change
        data['vwap_daily_change'] = (data['daily_change'] * data['volume24h']).rolling(window=period).sum() / data['volume24h'].rolling(window=period).sum()
    
        # Calculate liquidity-adjusted rolling standard deviation of daily change
        data['rolling_std'] = data['vwap_daily_change'].rolling(window=period).std() / data['liquidity'].rolling(window=period).mean()
    
      # Calculate historical volatility as the average rolling standard deviation over the entire period
        historical_volatility = data['rolling_std'].mean()
    
        if(math.isnan(historical_volatility)):
            return -100
        else:
            return historical_volatility
    except:
        return -100
volatility = []
coins = []
high_risk = []
mid_risk = []
low_risk = []
responses = {}
for key in data:
    token_Data = pd.DataFrame(data[key])
    historical_volatility = calculate_historical_volatility(token_Data, 4)
    if historical_volatility <  0:
        pass
    else:
        coins.append(key)
        # print(key, historical_volatility)
        volatility.append(historical_volatility)
        if(historical_volatility>1): 
            high_risk.append(key)
            responses[key] = {"volatility":historical_volatility, "risk": "high"}
        elif(historical_volatility<=1 and historical_volatility>0.01):
            mid_risk.append(key)
            responses[key] = {"volatility":historical_volatility, "risk": "mid"}
        elif(historical_volatility<=0.01):
            responses[key] = {"volatility":historical_volatility, "risk": "low"}
            low_risk.append(key)

print(responses)
result = json.dumps(responses)
write_file = open("responses.txt", "w")
write_file.write(result)
write_file.close()
tag="volatility"
upload = lh.upload(source="responses.txt", tag=tag)
print(upload['data']['Hash'])

cid_write_file = open("cid.txt", "w")
cid_write_file.write(upload['data']['Hash'])
cid_write_file.close()
uploadCID = lh.upload(source="cid.txt", tag="CID")

response = requests.get("https://api.lighthouse.storage/api/ipns/publish_record?cid="+uploadCID['data']['Hash']+"&keyName=8b014eaaacb14f5aa089a26886e92958", headers={"Authorization": "Bearer "+os.getenv("LHKey")})