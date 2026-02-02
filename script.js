// LOGIN
function saveUser() {
  let name = document.getElementById("name").value;
  let admission = document.getElementById("admission").value;

  if (!name || !admission) {
    alert("Fill all details");
    return;
  }

  localStorage.setItem("name", name);
  localStorage.setItem("admission", admission);

  window.location.href = "subject.html";
}

// SUBJECT
function setSubject(subject) {
  localStorage.setItem("subject", subject);
  window.location.href = "count.html";
}

// QUESTION COUNT
function setCount(count) {
  localStorage.setItem("count", count);
  localStorage.setItem("score", 0);
  localStorage.setItem("current", 0);

  window.location.href = "quiz.html";
}

// QUESTIONS DATABASE
const questions = {
  physics: [
    { q: "Unit of Force?", a: ["Newton", "Joule", "Watt"], c: 0 },
    { q: "Speed of light?", a: ["3x10^8 m/s", "300 m/s", "1500 m/s"], c: 0 }
  ],
  chemistry: [
    { q: "Symbol of Oxygen?", a: ["O", "H", "N"], c: 0 },
    { q: "pH of water?", a: ["7", "1", "10"], c: 0 }
  ],
  maths: [
    { q: "5 + 5 = ?", a: ["10", "8", "12"], c: 0 },
    { q: "Square root of 16?", a: ["4", "8", "2"], c: 0 }
  ]
};

// QUIZ LOGIC
if (window.location.pathname.includes("quiz.html")) {
  let subject = localStorage.getItem("subject");
  let current = parseInt(localStorage.getItem("current"));
  let count = parseInt(localStorage.getItem("count"));
  let score = parseInt(localStorage.getItem("score"));

  let quiz = questions[subject];

  function loadQuestion() {
    if (current >= count || current >= quiz.length) {
      window.location.href = "result.html";
      return;
    }

    let q = quiz[current];
    document.getElementById("question").innerText = q.q;

    let answers = document.getElementById("answers");
    answers.innerHTML = "";

    q.a.forEach((text, i) => {
      let btn = document.createElement("button");
      btn.innerText = text;
      btn.onclick = () => {
        if (i === q.c) score++;
        localStorage.setItem("score", score);
        current++;
        localStorage.setItem("current", current);
        loadQuestion();
      };
      answers.appendChild(btn);
    });
  }

  window.nextQuestion = loadQuestion;
  loadQuestion();
}

// RESULT PAGE
if (window.location.pathname.includes("result.html")) {
  let name = localStorage.getItem("name");
  let admission = localStorage.getItem("admission");
  let score = localStorage.getItem("score");

  document.getElementById("user").innerText = `Name: ${name} | Admission: ${admission}`;
  document.getElementById("score").innerText = `Score: ${score}`;
}

// RESTART
function restart() {
  localStorage.clear();
  window.location.href = "index.html";
}
