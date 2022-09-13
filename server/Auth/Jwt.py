import jwt
from datetime import datetime,timedelta

from decouple import config

key=config('secret')
algo=config('algos')

def Merge(dict1, dict2):
    res = {**dict1, **dict2}
    return res

def expiry_date():
    exp_date=datetime.now()+timedelta(3)
    return {"exp_date":exp_date.strftime('%d-%m-%Y')}

class auths:
    def __init__(self,payload,enc):
        self.payload=payload
        self.enc=enc

    def encoded_jwt(self):
        return jwt.encode(Merge(self.payload,expiry_date()),key,algorithm=algo)

    def decoded_jwt(self):
        return jwt.decode(self.enc, key, algorithms=algo)