// js/app.js
import { getUserData } from "./queries.js";
import { queryAPI } from "./graphql.js";
import { drawXpGraph, drawAuditGraph } from "./charts.js";
import { login, logout } from "./auth.js";
import { calcLevel } from "./calc.js";

const userName = document.getElementById("user-name");
const userXpLabel = document.getElementById("xp");
const userLevelLabel = document.getElementById("level");
const userAuditLabel = document.getElementById("tasks");

window.addEventListener('load', async () => {
  const token = localStorage.getItem('jwt');
  if (token) {
    try {
      const data = await queryAPI(getUserData);
      processData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      promptLogin();
    }
  } else {
    promptLogin();
  }
});

function promptLogin() {
  const username = prompt("Enter your email/username:");
  const password = prompt("Enter your password:");
  if (username && password) {
    login(username, password).then(() => {
      location.reload();
    });
  } else {
    alert("Username and password are required.");
  }
}



function processData(data) {
  const user = data.user[0];
  userName.innerText = user.login;

  const xpTransactions = user.transactions.filter(tx => tx.type === "xp");
  const totalXp = data.xp.aggregate.sum.amount;
  if (totalXp > 1000000) {
    userXpLabel.innerText = "Gained xp: " + (Math.round(totalXp / 10000) / 100) + "MB";
  } else if (xp > 1000) {
    userXpLabel.innerText = "Gained xp: " + (Math.round(totalXp / 10) / 100) + "kB";
  }
  //userXpLabel.innerText = "Gained xp: " + totalXp;
  userLevelLabel.innerText = "Current lvl: " + data.level[0].amount;

  // Prepare data for charts
  drawXpGraph(xpTransactions);
  drawAuditGraph(user.audits);

  //const givenAudits = user.audits.filter(audit => audit.type === "up").length;
  //const receivedAudits = user.audits.filter(audit => audit.type === "down").length;
  const auditRatio = user.auditRatio.toFixed(2);
  userAuditLabel.innerText = "Audit ratio: " + auditRatio;
}

// Add logout button functionality
document.getElementById("logout-btn").addEventListener("click", () => {
  logout();
});
