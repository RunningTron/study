import hashlib
from conf import config

def gen_md5(val):
    md5 = hashlib.md5(val.encode("utf-8"))
    md5.update(config.MD5_SALT.encode("utf-8"))
    return md5.hexdigest()





