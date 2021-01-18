import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeItem, processSell, resetItem } from "../../actions/main"

const LeftPannel = (props) => {
  const [state, setState] = useState({
    products: [],
    sub_total: 0,
    items: 0,
    vat: 0,
    discount: 0,
    total: 0,
    vat_i: 10,
    discount_i: 10
  });

  useEffect(() => {
    calcTotal(props.process_items, state.vat_i, state.discount_i)
    return () => {
      console.log("Leftpannel unmounted")
    }
  }, [props])

  const handleIncreament = (id) => {
    let _products = [...state.products];
    _products.forEach(element => {
      if (element.id == id) {
        element.quantity = element.quantity + 1;
        element.total = element.quantity * element.price;
      }
    });
    calcTotal(_products, state.vat_i, state.discount_i)
  }

  const handleDecreament = (id) => {
    let _products = [...state.products];
    _products.forEach(element => {
      if (element.id == id) {
        if (element.quantity > 1) {
          element.quantity = element.quantity - 1;
          element.total = element.quantity * element.price;
        }
      }
    });
    calcTotal(_products, state.vat_i, state.discount_i)
  }

  const handleVat = (e) => {
    calcTotal(state.products, e.target.value, state.discount_i)
  }

  const handleDiscount = (e) => {
    calcTotal(state.products, state.vat_i, e.target.value)
  }
  const calcTotal = (products, vat_i, discount_i) => {
    let sub_total = 0;
    let items = 0;
    let vat = 0;
    let discount = 0;
    let total = 0;
    let _vat_i = vat_i / 100;
    let _discount_i = discount_i / 100;
    let _products = products;
    _products.forEach(element => {
      sub_total += element.total;
      items += element.quantity;
      vat = sub_total * _vat_i;
      discount = sub_total * _discount_i;
      total = sub_total + vat - discount;
    });
    setState({
      ...state,
      products: products,
      sub_total: parseFloat(sub_total).toFixed(3),
      items: items,
      vat: parseFloat(vat).toFixed(3),
      discount: parseFloat(discount).toFixed(3),
      total: parseFloat(total).toFixed(3),
      vat_i: vat_i,
      discount_i: discount_i
    })
  }

  const formatDate = (date) => {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = ' ' + d.getHours(),
      min = '' + d.getMinutes(),
      sec = '' + d.getSeconds();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    if (hour.length < 2)
      hour = '0' + hour;
    if (min.length < 2)
      min = '0' + min;
    if (sec.length < 2)
      sec = '0' + sec;
    var ddate = [day, month, year].join('-');
    return ddate + [hour, min, sec].join(":")
  }
  const handleProcessSell = () => {
    if (products.length > 0) {
      let date = new Date();
      let reciept_data = {
        sale_id: date.getTime(),
        date: formatDate(date),
        products: state.products,
        total_items: state.items,
        total: state.total,
        discount: state.discount_i,
        vat: state.vat_i
      }
      props.processSell(reciept_data)
    } else {
      console.log("no item selected")
    }
  }
  const { products, sub_total, items, vat, discount, total, vat_i, discount_i } = state;
  return (
    <Fragment>
      <div className="left-container" data-test="leftContainer">
        <div className="product-details">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Products</th>
                <th>Price</th>
                <th>Qunatity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ?
                products.map(item => (<tr key={item.id}>
                  <td><img src={require("../../images/remove.svg")} onClick={() => props.removeItem(item.id)} /></td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td><span onClick={() => handleIncreament(item.id)} className="addquantity">+</span><span className="quantiyy">{item.quantity}</span><span onClick={() => handleDecreament(item.id)} className="addquantity">-</span></td>
                  <td>{item.total} EUR</td>
                </tr>))
                : <tr className="no-data"><td colSpan="5">There are no products</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="product-price">
          <div className="product-price-category">
            <div>SubTotal</div>
            <div>VAT tax</div>
            <div>Discount</div>
            <div>Total</div>
          </div>
          <div className="product-price-list">
            <div><span>{sub_total} EUR</span><span>{items} items</span></div>
            <div><input type="text" value={vat_i} onChange={handleVat} className="inputfield" /><span>{vat} EUR</span></div>
            <div><input type="text" value={discount_i} onChange={handleDiscount} className="inputfield" /><span>{discount} EUR</span></div>
            <div><span style={{ color: "#1ABC9C" }}>{total} EUR</span><span></span></div>
          </div>
        </div>
        <div className="product-buttons">
          <div onClick={props.resetItem}>Cancel Sale</div>
          <div onClick={handleProcessSell} style={products.length > 0 ? { cursor: "pointer" } : { cursor: "not-allowed" }}>Process Sale</div>
        </div>
      </div>
    </Fragment >
  );
};

const mapStateToProps = (state) => ({
  process_items: state.main.process_items
})
export default connect(mapStateToProps, { removeItem, processSell, resetItem })(LeftPannel);
