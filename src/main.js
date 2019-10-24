const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");

const x = localStorage.getItem("x");
const xObject = JSON.parse(x);

const hashMap = xObject || [
  {
    logo: "img/掘金.png",
    logoType: "image",
    name: "掘金",
    url: "https://juejin.im"
  },
  {
    logo: "img/overflow.png",
    logoType: "image",
    name: "Stack Overflow",
    url: "http://stackoverflow.com"
  },
  {
    logo: "img/github.png",
    logoType: "image",
    name: "GitHub",
    url: "http://github.com"
  }
];

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach(node => {
    const $li = $(`
    <li>
      <a href="${node.url}" target="_blank">
        <div class="site">
          <div class="logo"><img src='/${node.logo}' alt='${
      node.name[0]
    }'></div>
          <div class="name">${node.name}</div>
        </div>
      </a>
    </li>`).insertBefore($lastLi);
  });
};

render();

$(".addButton").on("click", () => {
  let url = window.prompt("请输入网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({ logo: url[8], logoType: "text", name: url, url: url });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("x", string);
};
