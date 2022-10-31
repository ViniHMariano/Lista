const hideListCreator = () => {
  const listCreator = document.getElementById("list-creator");
  listCreator.style.display = "none";
};

const addItemInRow = (row, itemInfo) => {
  const itemName = document.createElement("td");
  itemName.textContent = itemInfo.name;
  const itemUnd = document.createElement("td");
  itemUnd.textContent = itemInfo.und;
  const itemQtd = document.createElement("td");
  itemQtd.textContent = itemInfo.qtd;
  row.appendChild(itemName);
  row.appendChild(itemUnd);
  row.appendChild(itemQtd);
};

const addItemInTable = (table, row) => {
  table.appendChild(row);
};

const addItem = () => {
  const item = document.getElementById("item-name").value;
  const und = document.getElementById("item-und").value;
  const qtd = document.getElementById("item-qtd").value;

  if (item.length && qtd.length && und.length) {
    const row = document.createElement("tr");
    row.id = "item-row";
    addItemInRow(row, {
      name: item,
      und: und,
      qtd: qtd,
    });

    const table = document.getElementById("items-info-table");
    addItemInTable(table, row);
  } else {
    console.log("Some info is missing");
  }
};

function getFormmatedDate() {
  var data = new Date(),
    dia = data.getDate().toString(),
    diaF = dia.length == 1 ? "0" + dia : dia,
    mes = (data.getMonth() + 1).toString(),
    mesF = mes.length == 1 ? "0" + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

const createNewList = (list, container, index) => {
  const cancelButton = document.createElement("button");
  cancelButton.className = "cancel-button";
  cancelButton.textContent = `X`;
  cancelButton.onclick = hashList.bind(this, list, index);
  const listTitle = document.createElement("list-title");
  listTitle.className = "list-title";
  listTitle.textContent = list.name;
  if (list.canceled) listTitle.style.textDecoration = "line-through";
  const listDate = document.createElement("list-date");
  if (list.canceled) listDate.style.textDecoration = "line-through";
  listDate.className = "list-date";
  listDate.textContent = list.date;
  container.appendChild(cancelButton);
  container.appendChild(listTitle);
  container.appendChild(listDate);
};

const saveList = () => {
  const itens = document.querySelectorAll("#item-row");
  const itensToSave = [];
  itens.forEach((each, index) => {
    console.log(index);
    const itemDesc = [...each.children];
    const item = {};
    itemDesc.forEach((children, index) => {
      const headerRow = document.getElementById("header-row-items-table");
      item[headerRow.children[index].textContent] = children.textContent;
      console.log(headerRow.children[index].textContent, children.textContent);
    });
    itensToSave.push(item);
  });
  const listName = document.getElementById("list-info-title").textContent;
  let list = [
    {
      name: listName,
      date: getFormmatedDate(),
      items: [...itensToSave],
    },
  ];

  list = list.concat(JSON.parse(localStorage.getItem("lists") || "[]"));
  localStorage.setItem("lists", JSON.stringify(list));
  const listContainer = document.createElement("div");
  listContainer.className = "list-container";
  const listsContainer = document.getElementById("with-lists");
  listsContainer.style.display = "flex";
  listContainer.onclick = showListShower.bind(this, list);
  listsContainer.appendChild(listContainer);
  createNewList({ name: list[0].name, date: list[0].date }, listContainer, list.length - 1);

  hideListCreator();
};
