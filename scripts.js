/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Vl7wmXojkqZMz5Sn","label":"reddit","bookmarks":[{"id":"Qr50r39MKOFHJ4PO","label":"r/startpages","url":"https://www.reddit.com/r/startpages/"},{"id":"001hoRkKjf3vmWhK","label":"r/typescript","url":"https://www.reddit.com/r/typescript/"},{"id":"vQTFiwLYe5L0SnbA","label":"r/reactjs","url":"https://www.reddit.com/r/reactjs/"}]},{"id":"QnhFs06XpmYLdzxo","label":"design tools","bookmarks":[{"id":"0m18bAq7HyHYTPYO","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"uy6E6J3yUACWnQnp","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"tnDwZicKy7suYVTJ","label":"haikei","url":"https://app.haikei.app/"},{"id":"JgoeP7ZrGrBRl8oj","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"9al3rO8xNXfTweKu","label":"worth reading","bookmarks":[{"id":"MlHBEmAtv1ae3n5a","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"1XL2lpYzkiAPRWAl","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"GTA8I2ixpkjaFDLp","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"5Qgq96jXdIf2q4vd","label":"sources","bookmarks":[{"id":"ayCjJy1biHDcdCuP","label":"icons","url":"https://feathericons.com/"},{"id":"yjf345stvWgETfXq","label":"gif","url":"https://designyoutrust.com/2019/05/the-chill-and-retro-motion-pixel-art-of-motocross-saito/"},{"id":"cJrDkGqBaacFp4dZ","label":"@startpage","url":"https://prettycoffee.github.io/startpage"},{"id":"892mA6HWefbuTKv1","label":"author","url":"https://prettycoffee.github.io/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
