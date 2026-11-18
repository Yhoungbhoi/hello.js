// ==
// the whole code is written in JavaScript
// ==

//--- PHASE ONE: HELPER ----
function h(tag,props = {}, ...children) {
    const el = document.createElement(tag);
    Object.assign(el, props);
    children.forEach(child=>
      el.append(child)              //append accepts elements and plain text
    );
    return el;
}


//--- PHASE TWO: STYLES ----
//Creaye a <style> tag from Javascript and put CSS text inside it.
const css = `
   :root {--bg:#fff; --text:#222; --accent:#2563eb; --card:#f3f4f6; }
   body.dark { --bg:#111827; --text:#f9fafb; --card:#1f2937; }

   * { box-sizing: border-box; }
   body {
     margin:0; font-family:system-ui,sans-serif; line-height:1.6;
     background:var(--bg); color:var(--text);
     transition:background 0.3s, color 0.3s;
   }
header {
    display:flex; justify-content:space-between; align-items:center;
    padding:16px 24px;background:var(--accent); color:#fff;
}
header nav a {color:#fff; margin-left:16px; text-decoration:none; }
header nav a:hover { text-decoration:underline; }
main { max-width:700px; margin:0 auto; padding:24px; }
section { margin-bottom:40px; }
.card { background:var(--card); padding:20px; border-radius:12px; }
button {
    background:var(--accent); color:#fff; border:none;
    padding:10px 18px; border-radius:8px; font-size:16px; cursor: pointer;
}
button:hover { opacity:.85; }
input, textarea {
    width:100%; padding:10px; margin:6px; font:inherit;
}
.error { color:#dc2626; font-size:14px; font-weight:bold; }
.success { color:#16a34a; font-size:14px; font-weight:bold; }
footer { text-align:center; padding:20px; font-size:14px; color:#6b7280; opacity:.7;}
`; 
document.head.append(h("style", { textContent: css}));


//--- PHASE THREE: STATE ----
let count = 0;

//--- PHASE FOUR: BUILD THE PAGE ----
// 4a Header + navigation
const themeBtn = h("button", { textContent: "🌙"});
const header = h("header", {},
    h("h1", { textContent: "My First Website"}),
    h("nav", {},
        h("a", { href:"#about", textContent: "About"}),
        h("a", {href: "#counter", textContent: "Counter"}),
        h("a", { href:"#contact", textContent: "Contact"}),
    themeBtn
    )
);

// 4b. About section
const about = h("section", { id:"about"},
     h("h2", { textContent: "About me"}),
     h("p", { textContent: "Welcome! This is my first webpage built entirely with JavaScript. Please go easy on me."})
);

// 4c. Click counter section
const countEl = h("strong", { textContent: "0"});
const clickBtn = h("button", { textContent: "Click me"});
const counter = h("section", { id: "counter", className: "card" },
    h("h2", { textContent: "Click counter"}),
    h("p", {}, "You have clicked ",countEl, " times."),
    clickBtn
);

// 4d. Contact form section
const nameInput = h("input", { type: "text" });
const emailInput = h("input", { type: "email"});
const msgInput =h("textarea", { rows:4});
const formMsg =h("p");
const form = h("form", { noValidate: true },
    h("label", { textContent: "Name" }),    nameInput,
    h("label", { textContent: "Email" }),   emailInput,
    h("label", { textContent: "Message" }),  msgInput,
    h("button", {type: "submit", textContent: "Send" }),
    formMsg
);
const contact = h("section", { id: "contact"},
    h("h2", { textContent: "Contact"}),
    form
);


// 4e. Footer
const footer = h("footer", {},
    h("p", { textContent: `© ${new Date().getFullYear()} My Website` })
);


// 4f. Put everything on the page
document.body.append(header, h("main", {}, about, counter, contact), footer)


//--- PHASE FIVE: BEHAVIOR ----

// Click counter
clickBtn.addEventListener("click", () => {
    count++;
    countEl.textContent = count;
});

// Dark mode toggle

// 1. Work out which theme to start with
const saved = localStorage.getItem("theme");  // "dark", "light", or null
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

const startDark = saved ? saved === "dark" : systemPrefersDark;

if (startDark) {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️";
}


// 2. On click: switch the theme and save the new choice
themeBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("dark");
    themeBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
});


//Form validation
form.addEventListener("submit", (e) => {
    e.preventDefault(); // stop the page from reloading

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = msgInput.value.trim();

    if (!name || !email || !message) {
        formMsg.textContent = "Please fill in every field.";
        formMsg.className = "error";
    } else if (!email.includes("@")) {
        formMsg.textContent = "Please enter a valid email.";
        formMsg.className = "error";
    } else {
        formMsg.textContent = `Thanks, ${name}! (This demo doesn't actually send messages.)`;
        formMsg.className = "success";
        form.reset(); // clear the form fields
    }
});