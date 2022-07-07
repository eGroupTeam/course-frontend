import {ProductType} from '../../interfaces/entities';
const Product = (product:ProductType) => {
  return (
    <tr>
      <td>{product.desc}</td><td>{product.price}</td><td>庫存量:{product.stock}</td><button>刪除</button>
    </tr>
  )
}

export default Product