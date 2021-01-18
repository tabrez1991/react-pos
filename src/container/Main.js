import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LeftPannel from "../components/LeftPannel/LeftPannel";
import RightPannel from "../components/RightPannel/RightPannel";
import { getPosData } from "../actions/main";
import ProcessSale from "../components/ProcessSale/ProcessSale";

const Main = (props) => {
  useEffect(() => {
    props.getPosData();
  }, [])
  return (
    <Fragment>
      <div className="main-container" data-test="main-container">
        {props.show_process_sell ? <ProcessSale /> : null}
        <LeftPannel />
        <RightPannel />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  show_process_sell: state.main.show_process_sell
})
export default connect(mapStateToProps, { getPosData })(Main);
