let spoof = document.querySelector("#spoof-check");
let num_rows = 6;

class MessageBox {
  /**
   * Use to set a message box in the application
   * @param {"warning"|"error"|"message"} type - type of messageBox wanted
   * @param {string} title - text displayed on title bar
   * @param {string} message - message displayed inside body
   */
  constructor(type, title, message) {
    this.type = type;
    document.querySelector(".messageBox").classList.add(type);
    document.querySelector(".messageBox .title").textContent = title;
    document.querySelector(".messageBox .message").innerHTML = message;
    document
      .querySelector("#messageBox-ok-btn")
      .addEventListener("click", () => {
        this.hide();
      });
    this.show();
  }

  show() {
    document.querySelector(".messageBox-container").classList.remove("hidden");
    document.querySelector(".messageBox-container").style.zIndex = 1;
  }
  hide() {
    document.querySelector(".messageBox").classList.remove(this.type);
    document.querySelector(".messageBox-container").classList.add("hidden");
    setTimeout(() => {
      document.querySelector(".messageBox .title").textContent = "";
      document.querySelector(".messageBox .message").innerHTML = "";
      document.querySelector(".messageBox-container").style.zIndex = 0;
    }, 500);
  }
}

function setCalender(raw_date = null) {
  let date_cells = [...document.querySelectorAll("td")];
  if (raw_date === null)
    raw_date = document.querySelector(".input-container input").value;

  if (!raw_date.match(/^[0-9]{1,2}\/[0-9]{4}$/)) {
    new MessageBox(
      "error",
      "Invalid Date",
      "Make Sure date is in the <code>dd/yyyy</code> format"
    );
    return false;
  }

  raw_date = raw_date.split("/");
  let inp_month = parseInt(raw_date[0]);
  let inp_year = parseInt(raw_date[1]);

  // easters
  if (inp_month == 6 && inp_year == 2002) {
    new MessageBox(
      "message",
      "Message from Developer",
      "🎉 YAAY! You've just stepped into my <br>🌸✨ <strong>Birth Month & Year</strong> 🥳🥳🥳 <br>"
    );
  }
  if (inp_month == 9 && inp_year == 2003) {
    new MessageBox(
      "message",
      "Message to Simpi",
      "🌸 You just entered <strong>Simpi's Birth Month & Year</strong> 🎉<br>Time to sprinkle some extra sparkle ✨ on the calendar! <br>Here’s to your season of smiles, laughter, and a little bit of chaos 🥳💫<br>Stay awesome, Simpi — this one’s <strong>all</strong> yours "
    );
  }

  if (inp_year >= 2026 && spoof.checked) {
    new MessageBox("warning", "Warning!!!", "26 mai toh duniya khatam hai!!!");
    return false;
  }

  let first_day = new Date(inp_year, inp_month - 1, 1);
  let last_day = new Date(inp_year, inp_month, 0);
  let first_DOW = first_day.getDay();

  if (first_DOW + last_day.getDate() > 35) {
    // use 6th row
    document.getElementsByTagName("tr")[6].style.opacity = 1;
  } else {
    document.getElementsByTagName("tr")[6].style.opacity = 0;
  }

  let date_counter = 1;
  let idx;
  for (idx = 0; idx < num_rows * 7; idx++) {
    if (idx >= first_DOW && date_counter <= last_day.getDate()) {
      date_cells[idx].querySelector("span").textContent = date_counter++;
      date_cells[idx].classList.remove("void-cell");
      date_cells[idx].querySelector("span").classList.add("fill-span");
    } else {
      date_cells[idx].querySelector("span").textContent = "";
      date_cells[idx].classList.add("void-cell");
      date_cells[idx].querySelector("span").classList.remove("fill-span");
    }
  }
}

document.querySelector(".genCal-btn").addEventListener("click", () => {
  setCalender();
});

window.onload = function () {
  let date_now = new Date();
  setCalender(`${date_now.getMonth() + 1}/${date_now.getFullYear()}`);
};
