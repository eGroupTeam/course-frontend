import {ProductType} from '../../interfaces/entities';
const Product = (product:ProductType) => {
  return (
    <tr>
      <td>{product.desc}</td><td>{product.price}</td><button>刪除</button>
    </tr>
  )
}

export default Product