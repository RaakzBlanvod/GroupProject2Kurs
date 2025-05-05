from psycopg2 import pool

conn_pool = pool.SimpleConnectionPool(
    1, 10,
    user="postgres",
    password="password",
    database="task_manager",
    host="localhost",
    port="5432"
)

def get_all_tasks_db():
    conn = conn_pool.getconn()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tasks ORDER BY created_at DESC")
    tasks = cursor.fetchall()
    conn_pool.putconn(conn)
    return tasks

def add_task_db(title):
    conn = conn_pool.getconn()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO tasks (title) VALUES (%s) RETURNING id", (title,))
    task_id = cursor.fetchone()[0]
    conn.commit()
    conn_pool.putconn(conn)
    return task_id

def delete_task_db(task_id):
    conn = conn_pool.getconn()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = %s", (task_id,))
    conn.commit()
    cursor.close()
    conn_pool.putconn(conn)
