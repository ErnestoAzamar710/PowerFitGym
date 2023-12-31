import os
from flask import Flask, Response, request, jsonify
#from dotenv import load_dotenv
from pymongo import MongoClient
from bson.json_util import dumps
from bson import ObjectId
app = Flask(__name__)
mongo_db_url = os.environ.get("mongodb://localhost:27017")
#mongo_db_url = "mongodb+srv://ernesto:5pxxRajieMqw2RYw@cluster0.evjggq7.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_db_url)
db = client['PowerFitGym']

@app.get("/users")
def get_users():
    users_id = request.args.get('users_id')
    filter = {} if users_id is None else {"users_id": users_id}
    users = list(db.users.find(filter))

    response = Response(
        response=dumps(users), status=200,  mimetype="application/json")
    return response

@app.get("/users/<id>")
def get_user(id):
    user = db.users.find_one({'_id': ObjectId(id)},{'foto':0,'uid':0,'email':0,'telefono':0,'plan':0})
    response = Response(
        response=dumps(user), status=200,  mimetype="application/json")
    return response

if __name__ == '__main__':
    app.register_error_handler(404, 'pagina_no_encontrada')
    app.run(host='0.0.0.0')