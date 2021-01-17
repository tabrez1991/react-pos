import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import LeftPannel from "../components/LeftPannel";
import RightPannel from "../components/RightPannel";
import { getPosData } from "../actions/main";
import ProcessSale from "../components/ProcessSale";

const Main = (props) => {
  useEffect(() => {
    props.getPosData();
  }, [])
  return (
    <Fragment>
      <div className="main-container">
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
