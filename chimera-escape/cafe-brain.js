// NAME GATE
let name = localStorage.getItem("chimeraName");
const nameGate = document.getElementById("name-gate");
if (!name) nameGate.style.display = "flex";
else nameGate.style.display = "none";

document.getElementById("enter-cafe").onclick = () => {
  name = document.getElementById("username-input").value;
  localStorage.setItem("chimeraName", name);
  nameGate.style.display = "none";
};

// DRAWERS
const tea = document.getElementById("tea-drawer");
const music = document.getElementById("music-drawer");
document.getElementById("tea-btn").onclick = () =>
  tea.style.right = tea.style.right === "0px" ? "-300px" : "0px";
document.getElementById("music-btn").onclick = () =>
  music.style.top = music.style.top === "0px" ? "-250px" : "0px";

// ANCHOR POSTS (permanent lore)
const anchors = [
  {
    author: "Star",
    text:
      "Before this café had walls, it was just a kettle on a borrowed stove. People came not for tea, but for somewhere to rest."
  },
  {
    author: "Hans",
    text:
      "Earl Grey was here before most of us. I distrust any tea that has outlived its drinkers."
  },
  {
    author: "Milo",
    text:
      "Sometimes the plants lean toward the windows, like they’re trying to remember who used to sit there."
  }
];

// THREAD
let forum = JSON.parse(localStorage.getItem("chimeraForum")) || [];
const posts = document.getElementById("posts");

// RENDER
function render() {
  posts.innerHTML = "";

  anchors.forEach(m => {
    const d = document.createElement("div");
    d.className = "post star";
    d.innerHTML = `<div class="author">${m.author}</div>${m.text}`;
    posts.appendChild(d);
  });

  forum.forEach(m => {
    const d = document.createElement("div");
    d.className = "post" + (m.author !== name ? " star" : "");
    d.innerHTML = `<div class="author">${m.author}</div>${m.text}`;
    posts.appendChild(d);
  });

  posts.scrollTop = posts.scrollHeight;
}
render();

// CHARACTER KEYWORDS
const triggers = {
  Hans: ["tea", "earl", "grey", "bitter", "proper", "tradition", "china"],
  Star: ["coffee", "latte", "espresso", "warm", "memory", "remember", "home", "cup"],
  Milo: ["calm", "garden", "zen", "quiet", "plant", "leaf", "window", "sun"]
};

// CHARACTER VOICES
const replies = {
  Hans: [
    "If you must speak of tea, do try not to insult it. What kind are you drinking?",
    "Earl Grey has survived worse conversations than this. Do continue.",
    "A bitter leaf reveals more about a person than sugar ever could."
  ],
  Star: [
    "Coffee carries stories the way steam carries scent. What does yours remind you of?",
    "Some cups feel like home before you even drink them.",
    "I think warmth remembers us longer than we remember it."
  ],
  Milo: [
    "The garden listens when people grow quiet. Have you noticed that?",
    "Even leaves need rest. So do people.",
    "Sunlight feels different when you’re not in a hurry."
  ]
};

// DETECT WHO SHOULD ANSWER
function getResponder(text) {
  const lower = text.toLowerCase();

  for (let char in triggers) {
    if (triggers[char].some(word => lower.includes(word))) {
      return char;
    }
  }

  return "Star"; // default gentle reply
}

// SEND POST
document.getElementById("send-post").onclick = () => {
  const input = document.getElementById("user-post");
  const text = input.value.trim();
  if (!text) return;

  forum.push({ author: name || "Guest", text });
  input.value = "";
  localStorage.setItem("chimeraForum", JSON.stringify(forum));
  render();

  const responder = getResponder(text);

  setTimeout(() => {
    const pool = replies[responder];
    const line = pool[Math.floor(Math.random() * pool.length)];

    forum.push({ author: responder, text: line });
    localStorage.setItem("chimeraForum", JSON.stringify(forum));
    render();
  }, 7000 + Math.random() * 3000);
};

// ENTER KEY
document.getElementById("user-post").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("send-post").click();
  }
});
