from flask import Blueprint,jsonify

bm = Blueprint("bm",__name__,url_prefix="/bm")


@bm.route("/list",endpoint="lsbm")
def bm_list():
    return jsonify({"bm":[1,2,3]})