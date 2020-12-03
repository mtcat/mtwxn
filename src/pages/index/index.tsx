import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import { AtTabs, AtTabsPane } from "taro-ui";
import "taro-ui/dist/style/components/tabs.scss";
import "./index.scss";

const tabs = [
  { title: "天" },
  { title: "小时" },
  { title: "分" },
  { title: "秒" }
];

const style = {
  display: "flex",
  width: "100%",
  height: "147px",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "24px",
  backgroundColor: "#FAFBFC"
};

const startTime = new Date(2018, 4, 27, 13, 0, 0).getTime();

class Index extends Component {
  state = {
    current: 0,
    total: {
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
    },
    days: "",
    hours: "",
    minutes: "",
    seconds: ""
  };

  componentWillMount() {}

  componentDidMount() {
    this.cd();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleClick(value) {
    this.setState({
      current: value
    });
  }

  cd() {
    let timestamp = Date.now();

    this.setState(
      {
        total: this.total(timestamp),
        days: this.days(timestamp),
        hours: this.hours(timestamp),
        minutes: this.minutes(timestamp),
        seconds: this.seconds(timestamp)
      },
      () => {
        setTimeout(() => this.cd(), 1000);
      }
    );
  }

  total = timestamp => {
    let interval = (timestamp - startTime) / 1000,
      days = interval / (24 * 60 * 60),
      hours = (interval % (24 * 60 * 60)) / (60 * 60),
      minutes = ((interval % (24 * 60 * 60)) % (60 * 60)) / 60,
      seconds = ((interval % (24 * 60 * 60)) % (60 * 60)) % 60;

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  days = timestamp => {
    let hours = this.hours(timestamp);
    let days = hours / 24;
    return days;
  };

  hours = timestamp => {
    let minutes = this.minutes(timestamp);
    let hours = minutes / 60;
    return hours;
  };

  minutes = timestamp => {
    let seconds = this.seconds(timestamp);
    let minutes = seconds / 60;
    return minutes;
  };

  seconds = timestamp => {
    let seconds = (timestamp - startTime) / 1000;
    return seconds;
  };

  floor = num => {
    return Math.floor(num) + "";
  };

  format = num => {
    let str = this.floor(num);
    if (str.length == 1) {
      str = "0" + str;
    }
    return str;
  };

  render() {
    const { days, hours, minutes, seconds } = this.state.total;

    return (
      <>
        <AtTabs
          current={this.state.current}
          tabList={tabs}
          onClick={this.handleClick.bind(this)}
        >
          <AtTabsPane current={this.state.current} index={0}>
            <View style={style}>{`${this.floor(this.state.days)}天`}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={1}>
            <View style={style}>{`${this.floor(this.state.hours)}小时`}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={2}>
            <View style={style}>{`${this.floor(this.state.minutes)}分钟`}</View>
          </AtTabsPane>
          <AtTabsPane current={this.state.current} index={3}>
            <View style={style}>{`${this.floor(this.state.seconds)}秒`}</View>
          </AtTabsPane>
        </AtTabs>
        <View style={{ ...style, marginTop: 10 }}>{`${this.floor(
          days
        )}天${this.format(hours)}小时${this.format(minutes)}分钟${this.format(
          seconds
        )}秒`}</View>
      </>
    );
  }
}

export default Index;
