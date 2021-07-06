'use strict';
/* Data Access Object (DAO) module for accessing tasks */

const sqlite = require('sqlite3');





// open the database
const db = new sqlite.Database('tasks.db', (err) => {
  if (err) throw err;
});



exports.filterTasks = (filter, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM TASKS WHERE user=?';
    db.all(sql, [userId], (err, rows) => {
      if (err) {
        reject(err);
        return;
      } else {

        let tasks = [];
        if (filter === 'All') {
          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user }));

        }
        if (filter === 'Important') {
          console.log("case important, date is ");
          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user })).filter(e => e.important);

        }
        if (filter === 'Private') {
          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user })).filter(e => e.private);
        }
        if (filter === 'Today') {
          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user })).filter(e => dayjs(e.deadline).format('YYYY-MM-DD').localeCompare(dayjs().format('YYYY-MM-DD')) == 0);
        }
        if (filter === 'Next7Days') {
          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user })).filter(e => dayjs().diff(dayjs(e.deadline).format("MMMM D, YYYY"), 'day', true) >= -7 && dayjs().diff(dayjs(e.deadline).format("MMMM D, YYYY"), 'day', true) <= 0);
        }
        //        if (dayjs(filter).isValid()) {
        //          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user })).filter(e => dayjs(e.deadline).format('YYYY-MM-DD').localeCompare(dayjs(filter).format('YYYY-MM-DD')) == 0);
        //        }
        if (filter === undefined || filter === null) {
          tasks = rows.map((t) => ({ id: t.id, description: t.description, important: t.important, private: t.private, deadline: t.deadline, completed: t.completed, user: t.user }));
        }

        resolve(tasks);
      }


    });
  });
}


exports.getById = (id, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM TASKS WHERE id=? AND user=?';
    db.get(sql, [id, userId], (err, row) => {
      if (err) {
        reject(err);
        return;
      } else {
        if (row == undefined) {
          reject({ error: 'Course not found.' });
        } else {
          const task = { id: row.id, description: row.description, important: row.important, private: row.private, deadline: row.deadline, completed: row.completed, user: row.user };
          console.log(row);
          resolve(task);
        }
      }
    });

  });
}
async function getLastId() {
  const sql1 = 'SELECT MAX(id) FROM TASKS';
  return new Promise((resolve, reject) => {
    db.get(sql1, [], (err, row) => {
      if (err) {
        reject(err);
        return;
      } else {


        resolve(row["MAX(id)"]);
      }
    });
  });
}
exports.createTask = (task, userId) => {
  return new Promise(async (resolve, reject) => {
    let lastId = await getLastId();
    lastId++;
    if (!dayjs().isValid(task.deadline)) {
      reject(err);
      return;
    }
    console.log("log of the create (DAO)" + [lastId, task.description, task.important, task.private, task.deadline]);
    const sql = 'INSERT INTO TASKS(id, description, important, private, deadline, completed, user) VALUES(?,?,?,?,?,0,?)';
    db.run(sql, [lastId, task.description, parseInt(task.important ? 1 : 0), parseInt(task.private ? 1 : 0), task.deadline, userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.updateTask = (task, userId) => {

  return new Promise((resolve, reject) => {

    const sql = 'UPDATE TASKS SET description=?, important=?, private=?, deadline=? WHERE id=? AND user=?';
    if (!dayjs().isValid(task.deadline)) {
      reject(err);
      return;
    }

    db.run(sql, [task.description, task.important, task.private, task.deadline, task.id, userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.markCompleted = (task, userId) => {
  return new Promise((resolve, reject) => {
    if (task.completed != 0 && task.completed != 1) {
      reject(err);
      return;
    }
    const sql = 'UPDATE TASKS SET completed=? WHERE id=? AND user=?';
    db.run(sql, [task.completed, task.id, userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};

exports.deleteTask = (id, userId) => {
  return new Promise((resolve, reject) => {
    const sql = 'DELETE FROM TASKS WHERE id=? AND user=?';
    db.run(sql, [id, userId], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this.lastID);
    });
  });
};