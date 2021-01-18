import React from 'react';
import { connect } from 'react-redux';
import { closeProcessSell, resetItem } from "../../actions/main";

const ProcessSale = (props) => {
    console.log(props.process_sell)
    const handleClose = () => {
        props.closeProcessSell();
        props.resetItem()
    }
    return (
        <div>
            <div className="cover"></div>
            <div className="reciept-conatiner">
                <div className="reciept-header">Receipt</div>
                <div className="reciept-body">
                    <div>Sale No .:.: {props.process_sell.sale_id}</div>
                    <div style={{ textAlign: "left" }}>Date: {props.process_sell.date}</div>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th style={{ width: "100px" }}>Products</th>
                                    <th>Quantity</th>
                                    <th>SubTotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.process_sell.products.map((item, i) => (<tr key={item.id}>
                                    <td>{i + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total} EUR</td>
                                </tr>))}
                            </tbody>
                        </table>
                    </div>
                    <div className="reciept-price">
                        <div className="reciept-price-category">
                            <div><span>Total items</span><span>{props.process_sell.total_items}</span></div>
                        </div>
                        <div className="reciept-price-list">
                            <div><span>Total</span><span>{props.process_sell.total} EUR</span></div>
                            <div><span>Discount</span><span>{props.process_sell.discount}%</span></div>
                            <div><span>VAT</span><span>{props.process_sell.vat}%</span></div>
                        </div>
                    </div>
                    <div onClick={handleClose} className="close-recipt">Close</div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    process_sell: state.main.process_sell
})
export default connect(mapStateToProps, { closeProcessSell, resetItem })(ProcessSale);