package com.patiplaytvos

import android.os.Bundle;
import android.view.KeyEvent
import com.github.kevinejohn.keyevent.KeyEventModule


import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
   override fun onKeyDown(keyCode: Int, event: KeyEvent): Boolean {
    // // Uncomment this if key events should only trigger once when key is held down
    // if (event.getRepeatCount() == 0) {
    //   KeyEventModule.getInstance().onKeyDownEvent(keyCode, event)
    // }

    // // This will trigger the key repeat if the key is held down
    // // Comment this out if uncommenting the above
    KeyEventModule.getInstance().onKeyDownEvent(keyCode, event)

    // // Uncomment this if you want the default keyboard behavior
    // return super.onKeyDown(keyCode, event)

    // // The default keyboard behaviour wll be overridden
    // // This is similar to what e.preventDefault() does in a browser
    // // comment this if uncommenting the above
    super.onKeyDown(keyCode, event)
    return true
  }

  override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean {
    KeyEventModule.getInstance().onKeyUpEvent(keyCode, event)

    // // Uncomment this if you want the default keyboard behavior
    // return super.onKeyUp(keyCode, event)

    // // The default keyboard behaviour wll be overridden
    // // This is similar to what e.preventDefault() does in a browser
    // // comment this if uncommenting the above
    super.onKeyUp(keyCode, event)
    return true
  }

  override fun onKeyMultiple(keyCode: Int, repeatCount: Int, event: KeyEvent): Boolean {
      KeyEventModule.getInstance().onKeyMultipleEvent(keyCode, repeatCount, event)
      return super.onKeyMultiple(keyCode, repeatCount, event)
  }

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "patiplaytvos"

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
