const TASKS = [
	{
		id: 0,
		task: "Jog around the park",
		completed: true,
	},
	{
		id: 1,
		task: "10 minutes meditation",
		completed: false,
	},
	{
		id: 2,
		task: "Jog around the park",
		completed: true,
	},
	{
		id: 3,
		task: "Pick up groceries",
		completed: false,
	},
	{
		id: 4,
		task: "Complete Todo app on frontend mentor",
		completed: false,
	},
];
const newArray = [1, 2, 3, 4, 5];
const doubleArray = [];

for (let i = 0; i < newArray.length; i++) {
	const val = newArray[i] * 2;
	doubleArray.push(val);
}
console.log(doubleArray);

const doubleWithMap = newArray.map(function (number) {
	return number * 2;
});
console.log(doubleWithMap);

newArray.forEach((number) => console.log(number));

console.log(TASKS.filter((entry) => entry.completed == true));

function sayHello(name) {
	console.log("hello " + name);
}

sayHello("adigun");
