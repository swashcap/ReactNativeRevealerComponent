// @flow
import * as React from 'react';
import {Animated, StyleSheet, View, ViewPropTypes} from 'react-native';
import type {LayoutEvent} from 'CoreEventTypes';

type Props = {
  children?: React.Node,
  collapsed?: boolean,
  duration?: number,
  onAnimationEnd?: () => void,
  onAnimationStart?: () => void,
  style?: ViewPropTypes.style,
};

type State = {
  animatedValue: Animated.Value,
  isAnimating: boolean,
  isMeasuring: boolean,
  isMeasured: boolean,
  wrapperHeight: number,
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  wrapperIsMeasuring: {
    position: 'absolute',
    opacity: 0,
  },
});

export default class Collapse extends React.Component<Props, State> {
  static defaultProps = {
    collapsed: true,
    duration: 250,
  };

  wrapperRef: ?View;

  constructor(props: Props) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(props.collapsed ? 0 : 1),
      isAnimating: false,
      isMeasuring: false,
      isMeasured: false,
      wrapperHeight: 0,
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { collapsed } = this.props;

    if (prevProps.collapsed !== collapsed) {
      if (this.state.isAnimating) {
        this.state.animatedValue.stopAnimation(this.doAnimation);
      } else {
        this.doAnimation();
      }
    }
  }

  doAnimation = () => {
    const { collapsed, duration } = this.props;

    const actuallyDoAnimation = () => this.setState(
      { isAnimating: true },
      () => Animated.timing(
        this.state.animatedValue,
        {
          duration,
          toValue: collapsed ? 0 : 1,
        }
      ).start(() => this.setState({ isAnimating: false }))
    );

    if (collapsed) {
      actuallyDoAnimation()
    } else {
      this.measureWrapperHeight().then(actuallyDoAnimation);
    }
  };

  handleLayout = (event: LayoutEvent) => {
    const { nativeEvent: { layout: { height } } } = event;
    const { collapsed } = this.props;
    const { isAnimating, isMeasuring, wrapperHeight } = this.state;

    if (!isAnimating && !isMeasuring && !collapsed && height !== wrapperHeight) {
      this.setState({
        wrapperHeight: height
      });
    }
  };

  measureWrapperHeight = () => new Promise((resolve) => this.setState(
    { isMeasuring: true },
    () => setTimeout(() => {
      if (this.wrapperRef) {
        this.wrapperRef.measure((x, y, width, height) => {
          this.setState(
            {
              isMeasuring: false,
              isMeasured: true,
              wrapperHeight: height
            },
            resolve
          );
        });
      } else {
        this.setState(
          { isMeasuring: false },
          resolve
        );
      }
    }, 0)
  ));

  setWrapperRef = (ref: ?View) => this.wrapperRef = ref;

  render() {
    const { children, collapsed, style, ...containerProps } = this.props;
    const {
      animatedValue,
      isAnimating,
      isMeasuring,
      isMeasured,
      wrapperHeight,
    } = this.state;

    const wrapperStyle = [];
    let containerStyle;

    if (!isMeasuring && (isMeasured || collapsed)) {
      containerStyle = [
        styles.container,
        {
          height: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, wrapperHeight],
          }),
        },
      ];
    }

    if (style) {
      wrapperStyle.push(style);
    }
    if (isMeasuring) {
      wrapperStyle.push(styles.wrapperIsMeasuring);
    }

    return (
      <Animated.View
        accessible={!collapsed}
        pointerEvents={collapsed ? 'none' : 'auto'}
        style={containerStyle}
        {...containerProps}
      >
        <View
          onLayout={this.handleLayout}
          ref={this.setWrapperRef}
          style={wrapperStyle}
         >
          {children}
        </View>
      </Animated.View>
    );
  }
}
