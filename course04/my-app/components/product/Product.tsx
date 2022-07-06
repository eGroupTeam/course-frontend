import {ProductType} from '../../interfaces/entities';

const Product = (product:ProductType) => {
  return (
    <tr>
      <td>型號：{product.desc}</td><td>售價：{product.price}元</td><td>庫存：{product.stock}支</td><button>修改</button><button>刪除</button>
    </tr>
  )
}

export default Product