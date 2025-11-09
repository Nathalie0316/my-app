 export default function ProductsPage() {
   type Product = {
      id: number; 
      Name: string; 
      Category: string; 
      Rating: number;
   };
   const productList: Product[] = [
      {
         id: 1, 
         Name: "Shoes", 
         Category: "footwear", 
         Rating: 1
      },
      {
         id: 2, 
         Name: "Bag", 
         Category: "Accesories", 
         Rating: 3
      }
   ] 
   return(
    <div>
      <h1>Products Page</h1>
        <table>
          <thead>
            <tr>
              <th >ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.Name}</td>
                <td>{product.Category}</td>
                 <td>{product.Rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
 )};
