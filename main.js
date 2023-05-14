document.addEventListener("DOMContentLoaded", () => {
  let users = JSON.parse(localStorage.getItem("users"));

  if (!users) {
    users = {
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
    localStorage.setItem("users", JSON.stringify(users));
  }

  const userList = document.getElementById("user-data");
  const addUserForm = document.getElementById("add-user-form");

  function createUser(user) {
    if (isUserExists(user)) {
      return;
    }

    const userInfo = users[user];
    const userElement = document.createElement("div");
    userElement.classList.add("user");
    userElement.setAttribute("data-user", user);

    const nameSpan = createSpan(`Name: ${userInfo.name}`);
    const idSpan = createSpan(`ID: ${userInfo.id}`);
    const numberSpan = createSpan(`Number: ${userInfo.number}`);
    const countrySpan = createSpan(`Country: ${userInfo.country}`);
    const editButton = createButton(
      "Edit",
      () => editUser(userInfo, user),
      "#add-user-form"
    );
    const deleteButton = createButton("Delete", () => deleteUser(user));

    userElement.appendChild(nameSpan);
    userElement.appendChild(idSpan);
    userElement.appendChild(numberSpan);
    userElement.appendChild(countrySpan);
    userElement.appendChild(editButton);
    userElement.appendChild(deleteButton);

    userList.appendChild(userElement);
  }

  function createSpan(text) {
    const span = document.createElement("span");
    span.textContent = text;
    return span;
  }

  function createButton(text, onClick, link) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);

    if (link) {
      const anchor = document.createElement("a");
      anchor.href = link;
      anchor.appendChild(button);
      return anchor;
    }

    return button;
  }

  function addUser(event) {
    event.preventDefault();
    const nameInput = document.getElementById("name");
    const idInput = document.getElementById("id");
    const numberInput = document.getElementById("number");
    const countryInput = document.getElementById("country");
    const dataKeyInput = document.getElementById("data-key");

    const newUser = {
      name: nameInput.value,
      id: idInput.value,
      number: numberInput.value,
      country: countryInput.value,
    };

    if (!newUser.name || !newUser.id || !newUser.number || !newUser.country) {
      console.log("Please fill in all fields");
      return;
    }

    const dataKey = dataKeyInput.value;
    if (dataKey) {
      users[dataKey] = newUser;
      showPopup("User successfully updated!");
    } else {
      const newUserKey = `user${Object.keys(users).length + 1}`;
      users[newUserKey] = newUser;
      showPopup("User successfully created!");
    }

    localStorage.setItem("users", JSON.stringify(users));

    userList.innerHTML = "";
    for (let user in users) {
      createUser(user);
    }

    nameInput.value = "";
    idInput.value = "";
    numberInput.value = "";
    countryInput.value = "";
    dataKeyInput.value = "";
  }

  addUserForm.addEventListener("submit", addUser);

  function deleteUser(user) {
    delete users[user];
    localStorage.setItem("users", JSON.stringify(users));

    userList.innerHTML = "";
    showPopup("User successfully deleted!");
    for (let user in users) {
      createUser(user);
    }
  }

  function editUser(userInfo, dataKey) {
    const nameInput = document.getElementById("name");
    const idInput = document.getElementById("id");
    const numberInput = document.getElementById("number");
    const countryInput = document.getElementById("country");
    const dataKeyInput = document.getElementById("data-key");

    nameInput.value = userInfo.name;
    idInput.value = userInfo.id;
    numberInput.value = userInfo.number;
    countryInput.value = userInfo.country;
    dataKeyInput.value = dataKey;

    const existingUserElement = document.querySelector(
      `.user[data-user="${userInfo}"]`
    );

    if (existingUserElement) {
      existingUserElement.remove();
    }
  }

  function isUserExists(user) {
    for (let existingUser in users) {
      if (
        users[existingUser].name === user.name &&
        users[existingUser].id === user.id &&
        users[existingUser].number === user.number &&
        users[existingUser].country === user.country
      ) {
        return true;
      }
    }

    return false;
  }

  for (let user in users) {
    createUser(user);
  }
});

function showPopup(message) {
  const popupContainer = document.getElementById("popup-container");

  const popupElement = document.createElement("div");
  popupElement.classList.add("popup");

  const messageElement = document.createElement("p");
  messageElement.textContent = message;

  popupElement.appendChild(messageElement);

  popupContainer.appendChild(popupElement);

  setTimeout(() => {
    popupContainer.removeChild(popupElement);
  }, 3000);
}
