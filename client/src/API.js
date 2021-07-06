const url = 'http://localhost:3000'; 

async function createTask(newTask){
    await fetch('api/tasks/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      }).catch(function (error) {
        console.log('Failed to store data on server: ', error);
      });
      
}

async function deleteTask(id){
    await fetch('/api/tasks/delete/'+id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(function (error) {
        console.log('Failed to delete data on server: ', error);
      });
      
}

async function updateTask(newTask){
    await fetch('/api/tasks/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      }).catch(function (error) {
        console.log('Failed to store data on server: ', error);
      });
}

async function completeTask(newTask){
    await fetch('/api/tasks/mark', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    }).catch(function (error) {
        console.log('Failed to mark as completed on server: ', error);
    });
}

async function logIn(credentials) {
  console.log("in logIn of API");

  let response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if(response.ok) {
    console.log("response is ok");
    const user = await response.json();
    return user.name;
  }
  else {
    try {
    console.log("response is NOT ok");

      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch(err) {
    console.log("response puzza di merda");

      throw err;
    }
  }
}

async function logOut() {
  await fetch('/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch('api/sessions/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}
const API = { createTask, deleteTask, updateTask, completeTask, logIn, logOut, getUserInfo };

export default API;