import eel
from database import *

eel.init("web")

@eel.expose
def get_all_tasks():
    return get_all_tasks_db()

if __name__ == "__main__":
    eel.start("index.html", size=(500, 600), mode='chrome')