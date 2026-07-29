document.addEventListener("DOMContentLoaded", async () => {
	const themeChangerBtn = document.getElementById("theme");
	const themeImg = document.getElementById("theme-img");
	const body = document.querySelector("body");
	const listContainer = document.querySelector("ul");

	let TASKS = [];

	const entriesData = async function fetchData() {
		const response = await fetch("./tasks.json");
		const data = await response.json();
		return data;
	};
	const tabs = ["All", "Active", "Completed"];

	async function loadAndRender() {
		TASKS = await entriesData();
		renderAll();
	}

	function renderAll() {
		listContainer.innerHTML = "";
		TASKS.forEach((entry) => {
			render(entry);
		});
	}

	function render({ id, task, completed }) {
		const html = `
		<li class="todo-entry" id=${id}>
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
		renderAll();
	}

	function lineThroughAndRender(id) {
		TASKS = TASKS.map((entry) => {
			if (entry.id == id) {
				return { ...entry, completed: !entry.completed };
			}
			return entry;
		});
		renderAll();
	}

	async function init() {
		await loadAndRender();
	}

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
		
		if (e.target.closest(".entry-indicator")) {
			const li = e.target.closest("li");
			console.log(li)
			const id = li.id;
			lineThroughAndRender(id);
		}
	});
	console.log(TASKS);
	await init();
	console.log(TASKS);
});
