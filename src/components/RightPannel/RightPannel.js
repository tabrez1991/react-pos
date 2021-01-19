import React, { Fragment } from "react";
import { connect } from "react-redux";
import { addItem } from "../../actions/main"

const RightPannel = (props) => {
  return (
    <Fragment>
      <div className="product_list" data-test="product_list">
        {props.loader ?
          <div>Loading...</div>
          :
          props.pos_data.map((item, i) => (
            <div key={item.name} className={`product_product product_BG_${i + 1}`} onClick={() => props.addItem(item)} data-test="product_product">
              <img src={require("../../images/" + item.image)} />
              <h5>{item.name}</h5>
              <div className="hovered-details">
                <div>{item.price} EUR</div>
                <div>{item.description}</div>
              </div>
            </div>
          ))
        }
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  loader: state.main.loader,
  pos_data: state.main.pos_data
});

export default connect(mapStateToProps, { addItem })(RightPannel);
