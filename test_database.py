import unittest
from database import add_task_db, get_all_tasks_db, delete_task_db

class TestDatabaseFunctions(unittest.TestCase):

    def test_add_and_get_task(self):
        title = "Тестовая задача"
        task_id = add_task_db(title)

        tasks = get_all_tasks_db()
        titles = [task[1] for task in tasks]
        self.assertIn(title, titles)

        delete_task_db(task_id)  # очистка за собой

    def test_delete_task(self):
        title = "Удаляемая задача"
        task_id = add_task_db(title)

        delete_task_db(task_id)

        tasks = get_all_tasks_db()
        ids = [task[0] for task in tasks]
        self.assertNotIn(task_id, ids)

if __name__ == "__main__":
    unittest.main()
