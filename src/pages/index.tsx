import { useState } from 'react';

type Dessert = {
  id: number;
  name: string;
  price: string;
  imageSrc: string;
  quantity: number;
};

export default function DessertsPage() {
  const desserts: Dessert[] = [
    { id: 1, name: "Waffle com frutas vermelhas", price: "$6.50", imageSrc: "./image-waffle-desktop.jpg", quantity: 0 },
    { id: 2, name: "Vanilla Bean Créme Brulee", price: "$7.00", imageSrc: "./image-creme-brulee-desktop.jpg", quantity: 0 },
    { id: 3, name: "Macaron Mix of Five", price: "$8.00", imageSrc: "./image-macaron-desktop.jpg", quantity: 0 },
    { id: 4, name: "Classic Tiramisu", price: "$4.50", imageSrc: "./image-tiramisu-desktop.jpg", quantity: 0 },
    { id: 5, name: "Pistachio Baklava", price: "$4.50", imageSrc: "./image-baklava-desktop.jpg", quantity: 0 },
    { id: 6, name: "Lemon Meringue Pie", price: "$2.75", imageSrc: "./image-meringue-desktop.jpg", quantity: 0 },
  ];

  const [cart, setCart] = useState<Dessert[]>([]);

  const handleAddToCart = (dessert: Dessert) => {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((item) => item.id === dessert.id);
      if (itemInCart) {
        // Incrementa a quantidade do item no carrinho se ele já existe
        return prevCart.map((item) =>
          item.id === dessert.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Adiciona o item ao carrinho com quantidade 1 se ele ainda não está lá
        return [...prevCart, { ...dessert, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove itens com quantidade zero
    );
  };

  const calculateTotalPrice = (price: string, quantity: number) => {
    const numericPrice = parseFloat(price.replace('$', ''));
    return (numericPrice * quantity).toFixed(2);
  };

  const calculateCartTotal = () => {
    // Calcula o valor total do carrinho somando o total de cada item
    return cart.reduce((total, item) => {
      const itemTotal = parseFloat(calculateTotalPrice(item.price, item.quantity));
      return total + itemTotal;
    }, 0).toFixed(2);
  };

  return (
    <div className="flex max-w-6xl mx-auto p-6 space-x-4">
      <section className="flex-1">
        <h2 className="text-2xl font-semibold mb-4">Sobremesas</h2>
        <div className="grid grid-cols-3 gap-6">
          {desserts.map((dessert) => (
            <div key={dessert.id} className="bg-gray-50 w-52 p-4 rounded-lg shadow text-center">
              <img src={dessert.imageSrc} alt={dessert.name} className="w-full h-32 object-cover rounded-md mb-4" />
              <h3 className="text-lg font-semibold">{dessert.name}</h3>
              <p className="text-gray-600 mb-4">{dessert.price}</p>
              <button onClick={() => handleAddToCart(dessert)} className="flex items-center justify-center mx-auto bg-white text-black border-2 border-rose-500 py-1 px-3 rounded-full text-sm mt-4">
                <img src="./icon-add-to-cart.svg" alt="Ícone" className="w-4 h-4 mr-2" />
                {cart.find((item) => item.id === dessert.id) ? "Remover do carrinho" : "Adicionar ao carrinho"}
              </button>
            </div>
          ))}
        </div>
      </section>

      <aside className="w-64 bg-gray p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-rose-400">Carrinho</h2>
        {cart.length === 0 ? (
          <p className="text-rose-400">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="flex flex-col items-center mb-6 bg-gray-50 p-3 rounded-lg shadow">
                  <p className="text-lg font-semibold mb-1">{item.name}</p>
                  <p className="text-gray-600">Qtd: {item.quantity}</p>
                  <p className="text-gray-600 mb-2">Total: ${calculateTotalPrice(item.price, item.quantity)}</p>
                  <div className="flex space-x-2">
                    <button onClick={() => handleDecreaseQuantity(item.id)} className="bg-red-500 text-white py-1 px-3 rounded-full text-sm">
                      -
                    </button>
                    <button onClick={() => handleIncreaseQuantity(item.id)} className="bg-blue-500 text-white py-1 px-3 rounded-full text-sm">
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <p className="text-lg font-semibold">Preço Total: ${calculateCartTotal()}</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
