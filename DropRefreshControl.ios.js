/**
 * @providesModule RCTRefreshControl
 * @flow
 */

import React from 'react';
import {
  DeviceEventEmitter,
  NativeModules: {
    DropRefreshControl,
  },
  processColor
} from 'react-native';

/**
 * A pull down to refresh control like the one in Apple's iOS6 Mail App.
 */

var DROP_VIEW_DID_BEGIN_REFRESHING_EVENT = 'dropViewDidBeginRefreshing';

var callbacks = {};

var subscription = DeviceEventEmitter.addListener(
  DROP_VIEW_DID_BEGIN_REFRESHING_EVENT,
  (reactTag) => callbacks[reactTag]()
);
// subscription.remove();

var RCTRefreshControl = {
  configure: function(configs, callback) {
    var nodeHandle = React.findNodeHandle(configs.node);
    var options = {
      tintColor: processColor(configs.tintColor),
      activityIndicatorViewColor: processColor(configs.activityIndicatorViewColor)
    };
    
    DropRefreshControl.configure(nodeHandle, options, (error) => {
      if (!error) {
        callbacks[nodeHandle] = callback;
      }
    });
  },
  endRefreshing: function(node) {
    var nodeHandle = React.findNodeHandle(node);
    DropRefreshControl.endRefreshing(nodeHandle);
  }
};

export default RCTRefreshControl;
