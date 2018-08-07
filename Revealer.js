import * as React from 'react';
import {Animated} from 'react-native';

type Props = {
  children?: React.Node,
  onClose?: () => void,
  onOpen?: () => void,
  open?: Boolean
};

export default class Revealer extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static defaultProps = {
    open: false
  }

  render() {
    const {children} = this.props;
    return (
      <Animated.View>
        {children}
      </Animated.View>
    );
  }
}
