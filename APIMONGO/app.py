import os
from flask import Flask, Response, request, jsonify
#from dotenv import load_dotenv
from pymongo import MongoClient
from bson.json_util import dumps
from bson import ObjectId
app = Flask(__name__)
#mongodb+srv://ernestoazamar710:JSDrzGJYLoWQcVAG@cluster0.qlbyai3.mongodb.net/?retryWrites=true&w=majority
mongo_db_url = os.environ.get("mongodb://localhost:27017")
#mongo_db_url = "mongodb+srv://ernestoazamar710:JSDrzGJYLoWQcVAG@cluster0.qlbyai3.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_db_url)
db = client['PowerFitGym']

@app.get("/users")
def get_sensors():
    users_id = request.args.get('users_id')
    filter = {} if users_id is None else {"users_id": users_id}
    sensors = list(db.users.find(filter))

    response = Response(
        response=dumps(sensors), status=200,  mimetype="application/json")
    return response

@app.get("/users/<id>")
def get_sensor(id):
    user = db.users.find_one({'_id': ObjectId(id)})
    response = Response(
        response=dumps(user), status=200,  mimetype="application/json")
    return response

if __name__ == '__main__':
    app.register_error_handler(404, 'pagina_no_encontrada')
    app.run(host='0.0.0.0')