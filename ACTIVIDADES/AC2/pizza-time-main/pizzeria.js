/*
CODIGO A COMPLETAR
*/

function calculatePrice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  let price = 5 + (0.5 * nPepperonis) + (0.3 * nBasils) + 
  (0.1 * nMushrooms);
  if (hasSauce && hasCheese) {
    price += 1 + 1.5;
  } else if (hasSauce && !hasCheese) {
    price += 1;
  } else if (!hasSauce && hasCheese) {
    price += 1.5;
  }
  return price;
}

function displayInvoice({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const price = calculatePrice({nPepperonis, nBasils, nMushrooms, hasSauce, hasCheese});
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = ""; // este comando fue agregado gracias al modelo R1 de DeepSeek
  const title = document.createElement("h2");
  title_content = document.createTextNode("Resumen de la orden");
  title.appendChild(title_content);
  orderSummary.appendChild(title);

  const ingredients_list = document.createElement("ul");

  if (nPepperonis > 0) {
    const pepperoni = document.createElement("li");
    pepperoni_content = document.createTextNode(
      `${nPepperonis} Pepperoni(s) - $${(0.5 * nPepperonis).toFixed(2)}`);
    pepperoni.appendChild(pepperoni_content);
    ingredients_list.appendChild(pepperoni);
  }
  if (nBasils > 0) {
    const albahaca = document.createElement("li");
    albahaca_content = document.createTextNode(
      `${nBasils} Albahaca(s) - $${(0.3 * nBasils).toFixed(2)}`);
    albahaca.appendChild(albahaca_content);
    ingredients_list.appendChild(albahaca);
  }
  if (nMushrooms > 0) {
    const champi = document.createElement("li");
    champi_content = document.createTextNode(
      `${nMushrooms} Champiñones(s) - $${(0.1 * nMushrooms).toFixed(2)}`);
    champi.appendChild(champi_content);
    ingredients_list.appendChild(champi);
  }
  orderSummary.appendChild(ingredients_list);

  const final_price = document.createElement("p");
  const final_price_content = document.createTextNode(
    `Precio total: $${price.toFixed(2)}`);
  final_price.appendChild(final_price_content);
  orderSummary.appendChild(final_price);
}

/*
CODIGO BASE (pueden leerlo)
*/

const form = document.querySelector("#pizza-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  // Evitamos el comportamiento default (POST a nueva URL)
  event.preventDefault();

  // Extraemos los valores del formulario usando el objeto FormData
  const formData = new FormData(event.target);
  // Creamos un objeto para contener las preferencias con su tipo apropiado
  const ingredientsData = {
    nPepperonis: +formData.get("pepperoniCount"),
    nBasils: +formData.get("basilCount"),
    nMushrooms: +formData.get("mushroomCount"),
    hasSauce: formData.get("sauceCheck") !== null,
    hasCheese: formData.get("cheeseCheck") !== null
  };
  // Usamos "destructuring assignment" para pasar un objeto a cada función
  // (ver firma de cada función, en particular al uso de llaves en los parámetros)
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#desempacar_campos_de_objetos_pasados_como_par%C3%A1metro_de_funci%C3%B3n
  const price = calculatePrice(ingredientsData);
  console.log(price);
  displayPizza(ingredientsData);
  displayInvoice(ingredientsData);
}

function displayPizza({
  nPepperonis,
  nBasils,
  nMushrooms,
  hasSauce,
  hasCheese
}) {
  const ingredientsCount = {
    pepperoni: nPepperonis,
    basil: nBasils,
    mushroom: nMushrooms
  };
  for (const ingredient in ingredientsCount) {
    // Limpiamos la capa de ingredientes de la última ejecución
    const ingredientLayerElement = document.getElementById(ingredient);
    ingredientLayerElement.innerHTML = "";
    // Agregamos ingredientes a la capa en posiciones aleatorias
    for (let i = 0; i < ingredientsCount[ingredient]; i++) {
      const ingredientElement = document.createElement("div");
      ingredientElement.className = ingredient;
      ingredientElement.style.top = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientElement.style.left = `${Math.floor(Math.random() * 60) + 20}%`;
      ingredientLayerElement.appendChild(ingredientElement);
    }
  }

  // Agregamos o quitamos la capa de salsa y queso (por medio de clases CSS)
  const sauceLayer = document.getElementById("sauce");
  hasSauce
    ? sauceLayer.classList.add("sauce")
    : sauceLayer.classList.remove("sauce");
  const cheeseLayer = document.getElementById("cheese");
  hasCheese
    ? cheeseLayer.classList.add("cheese")
    : cheeseLayer.classList.remove("cheese");
}
