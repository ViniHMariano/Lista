const lists = localStorage.getItem("lists")

const showListCreator = () => {
  const listCreator = document.getElementById("list-creator")
  listCreator.style.display = "flex";
}

const hashItem = (index, list) => {
  const row = document.querySelectorAll("#show-list-item-row")[index]

  const name = row.getElementsByTagName("td")[0]
  name.style.textDecoration = "line-through"

  let listData = []
  listData = listData.concat(JSON.parse(localStorage.getItem("lists") || "[]"));
  listData.map((listUno, index) => {
    if (JSON.stringify(listUno) === JSON.stringify(list)) {
      console.log(list)
      console.log(listData[index])
      listData[index].items[index].canceled = true 
      localStorage.setItem("lists", JSON.stringify(listData));
    }
  })
}

const showListShower = (list) => {
  console.log(list)

  const listTitle = document.createElement("h1")
  listTitle.className = 'show-list-header-info'
  listTitle.textContent = list.name
  
  const listDate = document.createElement("h1")
  listDate.className = 'show-list-header-info'
  listDate.textContent = list.date

  const listHeader = document.getElementById("show-list-header")
  listHeader.appendChild(listTitle)
  listHeader.appendChild(listDate)

  const listTable = document.getElementById("items-info-shower-table")

  const tr = document.createElement("tr")
  tr.id = "header-row-items-table"

  const blank = document.createElement("th")
  blank.textContent = ""
  const item = document.createElement("th")
  item.textContent = "Item"
  const qtd = document.createElement("th")
  qtd.textContent = "Qtd"
  const und = document.createElement("th")
  und.textContent = "Und"

  tr.appendChild(blank)
  tr.appendChild(item)
  tr.appendChild(qtd)
  tr.appendChild(und)

  const containerList = document.getElementById("items-info-shower-table")
  containerList.appendChild(tr)

  list.items.map((item, index) => {
    const listRow = document.createElement("tr")
    listRow.id = "show-list-item-row"

    if (!item.canceled) {
      const cancel = document.createElement("td")
      cancel.textContent = "X"
      cancel.onclick = hashItem.bind(this, index, list)
      cancel.style.fontSize = "20px"
      listRow.appendChild(cancel)
    }

    const itemRow = document.createElement("td")
    if (item.canceled) {
      itemRow.style.textDecoration = "line-through"
    }
    itemRow.textContent = item.Item 

    const qtd = document.createElement("td")
    qtd.textContent = item.Qtd

    const und = document.createElement("td")
    und.textContent = item.Und

    console.log(qtd)

    listRow.appendChild(itemRow)
    listRow.appendChild(qtd)
    listRow.appendChild(und)

    listTable.appendChild(listRow)
  })

  const listShowerContainer = document.getElementById("list-shower-container")
  const listShower = document.getElementById("list-shower")
  listShower.style.display = "flex"
  listShowerContainer.style.display = "flex"
}

const showCancelButton = (index) => {
  const cancelButton = document.getElementsByClassName("cancel-button")[index]
  cancelButton.style.display = "flex"
}

const hideCancelButton = (index) => {
  const cancelButton = document.getElementsByClassName("cancel-button")[index]
  cancelButton.style.display = "none"
}

const closeListShower = () => {
  const listShower = document.getElementById("list-shower-container")
  const listHeader = document.getElementById("show-list-header")
  listHeader.innerHTML= ""

  const listTable = document.getElementById("items-info-shower-table")
  listTable.innerHTML = ""

  const tr = document.createElement("tr")
  tr.id = "header-row-items-table"

  const item = document.createElement("th")
  item.textContent = "Item"
  const qtd = document.createElement("th")
  qtd.textContent = "Qtd"
  const und = document.createElement("th")
  und.textContent = "Und"

  tr.appendChild(item)
  tr.appendChild(qtd)
  tr.appendChild(und)

  listShower.style.display = "none"
}

const changeListName = (name) => {
  const listName = document.getElementById("list-info-title")

  listName.textContent = name
}

const hashList = (list, index) => {
  const listTitle = document.getElementsByClassName("list-title")[index]
  listTitle.style.textDecoration = "line-through"

  const listDate = document.getElementsByClassName("list-date")[index]
  listDate.style.textDecoration = "line-through"

  let listData = []
  listData = listData.concat(JSON.parse(localStorage.getItem("lists") || "[]"));
  listData[index].canceled = true;
  localStorage.setItem("lists", JSON.stringify(listData));
}

const createList = (list, container, index) => {
  const cancelButton = document.createElement("button")
  cancelButton.className = "cancel-button"
  cancelButton.textContent = `X`
  cancelButton.onclick = hashList.bind(this, list, index)
  const listTitle = document.createElement("list-title")
  listTitle.className = "list-title"
  listTitle.textContent = list.name
  if (list.canceled) listTitle.style.textDecoration = "line-through"
  const listDate = document.createElement("list-date")
  if (list.canceled) listDate.style.textDecoration = "line-through"
  listDate.className = "list-date"
  listDate.textContent = list.date
  container.appendChild(cancelButton)
  container.appendChild(listTitle)
  container.appendChild(listDate)
}

if (!lists) {
  const noListContainer = document.getElementById("no-lists")
  if (noListContainer) {
    noListContainer.style.display = "flex"
  }
} else {
  const listsContainer = document.getElementById("with-lists")
  if (listsContainer) {
    listsContainer.style.display = "flex"
    let lists = []
    lists = lists.concat(JSON.parse(localStorage.getItem("lists") || "[]"));
    lists.forEach((list, index) => {
      const listContainer = document.createElement("div")
      listContainer.className = "list-container"
      if (!list.canceled) {
        listContainer.onmouseenter = showCancelButton.bind(this, index)
        listContainer.onmouseleave = hideCancelButton.bind(this, index)
      }
      listContainer.onclick = showListShower.bind(this, list)
      listsContainer.appendChild(listContainer)
      createList(list, listContainer, index)
      console.log(list)
    })
  }
}
