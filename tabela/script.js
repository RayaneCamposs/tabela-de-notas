src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js";   /* link do gráfico */

var qtdAlunos = 1;
var qtdNotas = 4;
var mediageral = 0;
var cv = 0;
var mediar = 0;

/* ------------ GRÁFICO ------------------- */

var cont_aprov = 0;
var cont_reprov = 0;
var cont_recup = 0;
var chart;

function contaSituacao(){
  cont_aprov = 0;
  cont_reprov = 0;
  cont_recup = 0;
  let rows = document.getElementsByTagName("output").length

  for(let i = 0; i < rows; i += 1){
    let situcao = document.getElementsByTagName("output")[i].id
    
    if(situcao.search("situacao")>= 0){
      let status = document.getElementsByTagName("output")[i].innerText
      
      if(status == "Aprovado"){
        cont_aprov += 1;
      } 
      if(status == "Reprovado"){
        cont_reprov += 1;
      } 
      if(status == "Recuperação"){
        cont_recup += 1;
      } 
    }


  }
 
}

function rayray() {

  contaSituacao()

  var xValues = ["Reprovado", "Aprovado", "Recuperação" ];
  var yValues = [cont_reprov, cont_aprov, cont_recup];
  var barColors = ["red","green","orange",];


  if (chart) {
    console.log("OIIIII")
    chart.chart.destroy();
  }
  chart = new Chart("myChart", {
    type: "pie",
    data: {
      labels: xValues,
      datasets: [{
        backgroundColor: barColors,
        data: yValues
      }]
    },
    options: {
      title: {
        display: true,
        text: "Modelo gráfico da situação dos nossos alunos:"
      }
    }
  });

  console.log(chart)
  chart.update();


}

/* --------------------------------------------------------- */

function verificaMedias() {
  for (let y = 1; y <= qtdAlunos; y = y + 1) {
    let media = 0;
    let resultado = 0;

    for (let x = 1; x <= qtdNotas; x++) {
      let nota = parseFloat(document.getElementById(`nota${y}${x}`).value);
      resultado = nota + resultado;
    }

    media = resultado / qtdNotas;

    mediageral = media + mediageral ;
    cv += y

    document.getElementById(`media${y}`).innerText = media;

    if (media >= 50) {
      document.getElementById(`situacao${y}`).innerText = "Aprovado";
      document.getElementById(`situacao${y}`).style.color = "Green";
      
      

    } if (media >= 40 && media < 50) {
      document.getElementById(`situacao${y}`).innerText = "Recuperação";
      document.getElementById(`situacao${y}`).style.color = "Orange";
          

    }  if (media < 40) {
      document.getElementById(`situacao${y}`).innerText = "Reprovado";
      document.getElementById(`situacao${y}`).style.color = "Red";
      
      
    }
  }
  mediar = mediageral / (cv - 1)
  document.getElementById("mediageral1").innerText = mediar
}

function criarLinha() {
  if (qtdAlunos <= 10) {
    qtdAlunos += 1;

    let row;
    let row_data;
    let row_data_input;
    let row_data_output;

    row = document.createElement("tr");
    row_data = document.createElement("td");
    row.setAttribute("id", `linha${qtdAlunos}`);
    row_data_input = document.createElement("input");
    row_data_input.classList.add("form-control");
    row_data_input.setAttribute("id", `nome${qtdAlunos}`);
    row_data_input.type = "text";
    row_data.appendChild(row_data_input);
    row.appendChild(row_data);

    for (let x = 1; x <= qtdNotas; x++) {
      row_data = document.createElement("td");
      row_data.setAttribute("id", `coluna${qtdAlunos}${x}`);
      row_data_input = document.createElement("input");
      row_data_input.classList.add("form-control");
      row_data_input.setAttribute("id", `nota${qtdAlunos}${x}`);
      row_data_input.type = "number";
      row_data_input.min = 0;
      row_data_input.max = 100;
      row_data.appendChild(row_data_input);
      row.appendChild(row_data);
    }

    row_data = document.createElement("td");
    row_data.setAttribute("id", `coluna_media${qtdAlunos}`);
    row_data_output = document.createElement("output");
    row_data_output.setAttribute("id", `media${qtdAlunos}`);
    row_data.appendChild(row_data_output);
    row.appendChild(row_data);

    row_data = document.createElement("td");
    row_data_output = document.createElement("output");
    row_data_output.setAttribute("id", `situacao${qtdAlunos}`);
    row_data.appendChild(row_data_output);
    row.appendChild(row_data);

    document.getElementById("tableBody").appendChild(row);
  }
}

function deletarLinha() {
  if (qtdAlunos > 1) {
    let child = document.getElementById(`linha${qtdAlunos}`);
    document.getElementById("tableBody").removeChild(child);
    qtdAlunos -= 1;
  }
}

function criarColuna() {
  if (qtdNotas < 6) {
    qtdNotas += 1;

    let column;
    let column_media;
    let row_data;
    let row_data_input;

    column = document.createElement("th");
    column.setAttribute("id", `coluna0${qtdNotas}`);
    column.innerHTML = `Nota ${qtdNotas}`;

    column_media = document.getElementById("coluna_media0");
    document.getElementById("linha0").insertBefore(column, column_media);

    for (let x = 1; x <= qtdAlunos; x++) {
      row_data = document.createElement("td");
      row_data.setAttribute("id", `coluna${x}${qtdNotas}`);
      row_data_input = document.createElement("input");
      row_data_input.classList.add("form-control");
      row_data_input.setAttribute("id", `nota${x}${qtdNotas}`);
      row_data_input.type = "number";
      row_data_input.min = 0;
      row_data_input.max = 100;
      row_data.appendChild(row_data_input);
      media = document.getElementById(`coluna_media${x}`);
      console.log(media);
      console.log(row_data);
      document.getElementById(`linha${x}`).insertBefore(row_data, media);
    }
  }
}

function deletarColuna() {
  if (qtdNotas > 1) {
    for (let x = 0; x <= qtdAlunos; x++) {
      let child = document.getElementById(`coluna${x}${qtdNotas}`);
      //console.log(child);
      document.getElementById(`linha${x}`).removeChild(child);
    }

    qtdNotas -= 1;
  }
}

// sort table
var tables = document.querySelectorAll("table.sortable"),
  table,
  thead,
  headers,
  i,
  j;

for (i = 0; i < tables.length; i++) {
  table = tables[i];

  if ((thead = table.querySelector("thead"))) {
    headers = thead.querySelectorAll("th");

    for (j = 0; j < headers.length; j++) {
      headers[j].innerHTML = "<a href='#'>" + headers[j].innerText + "</a>";
    }

    thead.addEventListener("click", sortTableFunction(table));
  }
}

/**
 * Create a function to sort the given table.
 */
function sortTableFunction(table) {
  return function (ev) {
    if (ev.target.tagName.toLowerCase() == "a") {
      sortRows(table, siblingIndex(ev.target.parentNode));
      ev.preventDefault();
    }
  };
}

/**
 * Get the index of a node relative to its siblings — the first (eldest) sibling
 * has index 0, the next index 1, etc.
 */
function siblingIndex(node) {
  var count = 0;

  while ((node = node.previousElementSibling)) {
    count++;
  }

  return count;
}

/**
 * Sort the given table by the numbered column (0 is the first column, etc.)
 */
function sortRows(table, columnIndex) {
  var rows = table.querySelectorAll("tbody tr"),
    sel = "thead th:nth-child(" + (columnIndex + 1) + ")",
    sel2 = "td:nth-child(" + (columnIndex + 1) + ")",
    classList = table.querySelector(sel).classList,
    values = [],
    cls = "",
    allNum = true,
    val,
    index,
    node;

  if (classList) {
    if (classList.contains("date")) {
      cls = "date";
    } else if (classList.contains("number")) {
      cls = "number";
    }
  }

  for (index = 0; index < rows.length; index++) {
    node = rows[index].querySelector(sel2);
    val = node.innerText;

    if (isNaN(val)) {
      allNum = false;
    } else {
      val = parseFloat(val);
    }

    values.push({ value: val, row: rows[index] });
  }

  if (cls == "" && allNum) {
    cls = "number";
  }

  if (cls == "number") {
    values.sort(sortNumberVal);
    values = values.reverse();
  } else if (cls == "date") {
    values.sort(sortDateVal);
  } else {
    values.sort(sortTextVal);
  }

  for (var idx = 0; idx < values.length; idx++) {
    table.querySelector("tbody").appendChild(values[idx].row);
  }
}

/**
 * Compare two 'value objects' numerically
 */
function sortNumberVal(a, b) {
  return sortNumber(a.value, b.value);
}

/**
 * Numeric sort comparison
 */
function sortNumber(a, b) {
  return a + b;
}

/**
 * Compare two 'value objects' as dates
 */
function sortDateVal(a, b) {
  var dateA = Date.parse(a.value),
    dateB = Date.parse(b.value);

  return sortNumber(dateA, dateB);
}

/**
 * Compare two 'value objects' as simple text; case-insensitive
 */
function sortTextVal(a, b) {
  var textA = (a.value + "").toUpperCase();
  var textB = (b.value + "").toUpperCase();

  if (textA < textB) {
    return -1;
  }

  if (textA > textB) {
    return 1;
  }

  return 0;
}

