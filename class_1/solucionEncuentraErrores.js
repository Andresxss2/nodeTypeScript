//@ts-check
const getProducstsPerson = async () => {
  const myCart = [];
  let products = [];
  const limit = 2000;

  async function getProducts() {
    const rta = await fetch("http://api.escuelajs.co/api/v1/products", {
      method: "GET",
    });
    const data = await rta.json();
    products = products.concat(data);
  }

  function getTotal() {
    let total = 0;
    if (myCart.length === 0) {
      return total;
    }
    for (let i = 0; i < myCart.length; i++) {
      total += myCart[i].price;
    }
    return total;
  }

  function addProduct(index) {
    if (products[index] === undefined) {
      console.log(`No se encuentra el producto en la posición = ${index}`);
      return;
    }

    if (getTotal() + products[index].price <= limit) {
      myCart.push(products[index]);
    }
  }

  await getProducts();
  addProduct(1);
  addProduct(2);
  const total = getTotal();

  const person = {
    name: "Nicolas",
    lastName: "Molina",
  };
  const rta = `Nombre: ${person.name} ${
    person.lastName
  }, total valor de productos:${total}, limite inversion productos:${limit}, diferencia:${
    limit - total
  }`;
  console.log(rta);
};
getProducstsPerson();
