document.addEventListener("DOMContentLoaded", () => {
  const users = {
    user1: { name: "queens", id: "1", number: "123456789", country: "USA" },
    user2: { name: "jordan", id: "2", number: "123456789", country: "USA" },
    user3: { name: "kobe", id: "3", number: "123456789", country: "USA" },
    user4: { name: "james", id: "4", number: "123456789", country: "USA" },
    user5: { name: "jordan", id: "5", number: "123456789", country: "USA" },
    user6: { name: "kobe", id: "6", number: "123456789", country: "USA" },
    user7: { name: "james", id: "7", number: "123456789", country: "USA" },
    user8: { name: "jordan", id: "8", number: "123456789", country: "USA" },
    user9: { name: "kobe", id: "9", number: "123456789", country: "USA" },
    user10: { name: "james", id: "10", number: "123456789", country: "USA" },
  };

  const userList = document.getElementById("user-data");
  const addUserForm = document.getElementById("add-user-form");

  function createUser(user) {
    if (!user) {
      console.log("No user");
    }
    const userInfo = users[user];
    const userElement = document.createElement("div");
    userElement.classList.add("user");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `Name: ${userInfo.name}`;
    userElement.appendChild(nameSpan);

    const idSpan = document.createElement("span");
    idSpan.textContent = `ID: ${userInfo.id}`;
    userElement.appendChild(idSpan);

    const numberSpan = document.createElement("span");
    numberSpan.textContent = `Number: ${userInfo.number}`;
    userElement.appendChild(numberSpan);

    const countrySpan = document.createElement("span");
    countrySpan.textContent = `Country: ${userInfo.country}`;
    userElement.appendChild(countrySpan);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editUser(userInfo);
    });
    userElement.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteUser(user);
    });

    userElement.appendChild(deleteButton);

    userList.appendChild(userElement);
  }

  function addUser(event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const idInput = document.getElementById("id");
    const numberInput = document.getElementById("number");
    const countryInput = document.getElementById("country");

    const newUser = {
      name: nameInput.value,
      id: idInput.value,
      number: numberInput.value,
      country: countryInput.value,
    };

    const newUserKey = `user${Object.keys(users).length + 1}`;
    users[newUserKey] = newUser;

    createUser(newUserKey);

    nameInput.value = "";
    idInput.value = "";
    numberInput.value = "";
    countryInput.value = "";
  }

  addUserForm.addEventListener("submit", addUser);

  function deleteUser(user) {
    delete users[user];
    userList.innerHTML = "";
    for (let user in users) {
      createUser(user);
    }
  }

  function editUser(user) {
    const userInfo = user
    console.log(userInfo["name"])

    const nameInput = document.getElementById("name");
    const idInput = document.getElementById("id");
    const numberInput = document.getElementById("number");
    const countryInput = document.getElementById("country");

    nameInput.value = userInfo["name"];
    idInput.value = userInfo["id"];
    numberInput.value = userInfo["number"];
    countryInput.value = userInfo["country"];

    const existingUserElement = document.querySelector(
      `.user[data-user="${user}"]`
    );

    if (existingUserElement) {
      existingUserElement.remove();
    }

    createUser(user);
  }

  for (let user in users) {
    createUser(user);
  }
});
