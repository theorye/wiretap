import React, { Component } from "react";
import styled from "styled-components";
import Loader from "./Loader";
import { observer } from "mobx-react";
import Footer from "./Footer";

const SidebarContainer = styled.div`background-color: #f7f7ff;`;

const Menus = styled.ul`
  box-shadow: 0 0;
  background-color: #f7f7ff;
`;

const Divider = styled.li`
  &:after {
    background-color: #f7f7ff !important;
  }
`;

class Sidebar extends Component {
  render() {
    const {
      trackers,
      setTrackerId,
      connectionInfo,
      updater,
      currrentTrackerId
    } = this.props;
    const observableTrackers = trackers.filter(tracker => tracker.isObservable);
    const logTrackers = trackers.filter(tracker => !tracker.isObservable);
    return (
      <SidebarContainer className="panel">
        <div className="panel-header text-center">
          <img
            src={require("../../assets/wiretap.png")}
            alt="Avatar XL"
            width="50"
          />
          <div className="panel-title h5 mt-10">Mobx Wiretap</div>
          <div className="panel-subtitle">
            Stare into the soul of your observables
          </div>
        </div>
        <div className="panel-body">
          <Menus className="menu">
            {observableTrackers.length > 0 && (
              <Divider className="divider" data-content="Observables" />
            )}
            {observableTrackers.map((tracker, index) => {
              const isActive = tracker.id === currrentTrackerId;
              return (
                <li
                  key={index}
                  className="menu-item"
                  onClick={() => {
                    setTrackerId(tracker.id);
                  }}
                >
                  <a href="#menus" className={isActive ? "active" : ""}>
                    {tracker.name}
                  </a>
                </li>
              );
            })}

            {logTrackers.length > 0 && (
              <Divider className="divider" data-content="Logs" />
            )}
            {logTrackers.map((tracker, index) => {
              const isActive = tracker.id === currrentTrackerId;
              return (
                <li
                  key={index}
                  className="menu-item"
                  onClick={() => {
                    setTrackerId(tracker.id);
                  }}
                >
                  <a href="#menus" className={isActive ? "active" : ""}>
                    {tracker.name}
                  </a>
                </li>
              );
            })}
          </Menus>
        </div>
        <Footer connectionInfo={connectionInfo} updater={updater} />
      </SidebarContainer>
    );
  }
}

export default observer(Sidebar);
