document.addEventListener("DOMContentLoaded", async () => {
	const themeChangerBtn = document.getElementById("theme");
	const themeImg = document.getElementById("theme-img");
	const body = document.querySelector("body");
  const listContainer = document.querySelector("ul");
  const tabSwitcherContainer = document.querySelector("#base-of-main");
	const inputElement = document.getElementById("input-bar")

	let TASKS = [];

	const entriesData = async function fetchData() {
		const response = await fetch("./tasks.json");
		const data = await response.json();
		return data;
	};
	const tabs = ["All", "Active", "Completed"];

	async function loadAndRender() {
    TASKS = JSON.parse(localStorage.getItem("TASKS")) || await entriesData();
		renderAll();
  }

  function saveToStorage(taskArr) {
    localStorage.setItem("TASKS", JSON.stringify(taskArr))
  }

	function renderAll(taskArr = TASKS) {
		listContainer.innerHTML = "";
		taskArr.forEach((entry) => {
			render(entry);
		});
	}

	function render({ id, task, completed }) {
		const html = `
		<li class="todo-entry" id=${id} draggable="true">
			<span class="entry-indicator"><div><img id="" src="assets/icon-check.svg" style="display:${completed ? "block" : "none"}" /></div></span>
			<p style="text-decoration:${completed ? "line-through" : "none"}">${task}</p>
			<span class="close-box"
				><img src="./assets/icon-cross.svg" alt=""
			/></span>
		</li>
		`;
		listContainer.insertAdjacentHTML("beforeend", html);
	}

	function deleteAndRender(id) {
    TASKS = TASKS.filter((entry) => entry.id.toString() !== id.toString());
    saveToStorage(TASKS)
		renderAll();
	}

	function lineThroughAndRender(id) {
		TASKS = TASKS.map((entry) => {
			if (entry.id == id) {
				return { ...entry, completed: !entry.completed };
			}
			return entry;
    });
		saveToStorage(TASKS)
		renderAll();
	}

	function loadCompletedAndRender() {
		console.log("loading completed and render");
		const completed = TASKS.filter((entry) => entry.completed == true);
		renderAll(completed);
	}

	function loadActiveAndRender() {
		console.log("loading active and render");
		const active = TASKS.filter((entry) => entry.completed == false);
		renderAll(active);
	}

	function clearCompletedAndRender() {
		TASKS = TASKS.filter((entry) => {
			return !entry.completed;
    });
		saveToStorage(TASKS)
		renderAll();
  }

  function addEntryAndRender(newTask) {
    const newId = TASKS[TASKS.length - 1]["id"] + 1
    const newObj = {
      id: newId,
      task: newTask,
      completed: false
    }
    TASKS.push(newObj)
    saveToStorage(TASKS)
    renderAll()
  }

	async function init() {
		await loadAndRender();
  }

  inputElement.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      const newEntry = inputElement.value
      inputElement.value = "";
      addEntryAndRender(newEntry)
    }
  })

	themeChangerBtn.onclick = function () {
		const htmlClassList = document.documentElement.classList;
		if (htmlClassList.contains("light-theme")) {
			htmlClassList.remove("light-theme");
			themeImg.src = "./assets/icon-sun.svg";
		} else {
			htmlClassList.add("light-theme");
			themeImg.src = "./assets/icon-moon.svg";
		}
	};

	listContainer.addEventListener("click", async (e) => {
		if (e.target.closest(".close-box")) {
			const li = e.target.closest("li");
			const id = li.id;
			deleteAndRender(id);
			li.remove();
    }

    listContainer.addEventListener("dragstart", function (e) {
      console.log("ahh")
      console.log(e)
		})

		if (e.target.closest(".entry-indicator")) {
			const li = e.target.closest("li");
			console.log(li);
			const id = li.id;
			lineThroughAndRender(id);
		}
  });


	tabSwitcherContainer.addEventListener("click", (e) => {
		if (e.target.closest(".all")) {
			renderAll();
		}

		if (e.target.closest(".completed")) {
			loadCompletedAndRender();
		}

		if (e.target.closest(".active")) {
			loadActiveAndRender();
		}

		if (e.target.closest(".clear-completed")) {
			console.log("hehe");
			clearCompletedAndRender();
		}
	});
	await init();
});
