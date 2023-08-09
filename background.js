function getHistory(historyQuery) {
  chrome.history.search(historyQuery, (items) => {
    const data = items.map((item) => {
      return {
        title: item.title,
        url: item.urls,
      };
    });
    return data;
  });
}

const websites = [
  "Youtube",
  "Notion",
  "Github",
  "Stackoverflow",
  "Google",
  "Leetcode",
  "Others",
];

async function update() {
  websites.forEach(async (website) => {
    const query = {
      text: website !== "Others" ? website : "",
      maxResults: 10,
    };
    chrome.history.search(query, (items) => {
      const results = items.map((item) => {
        let title = item.title;
        if (title.length > 0 && title.charAt(0) === "(") {
          title = title.split(" ").slice(1).join(" ");
        }
        return {
          title,
          url: item.url,
        };
      });
      const list = document.getElementById(website);
      for (const historyItem of results) {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.textContent = historyItem.title;
        link.href = historyItem.url;
        link.target = "_blank";
        link.classList.add(`${website.toLowerCase()}-link`);
        listItem.appendChild(link);
        list.appendChild(listItem);
      }
    });
  });
}

update();
