import eel
from database import *

eel.init("web")

@eel.expose
def get_all_tasks():
    return get_all_tasks_db()

@eel.expose
def add_task(title):
    return add_task_db(title)

@eel.expose
def delete_task(task_id):
    delete_task_db(task_id)

if __name__ == "__main__":
    eel.start("index.html", size=(500, 600), mode='chrome')