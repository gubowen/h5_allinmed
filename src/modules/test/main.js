/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by ? on 17/8/10.
 */
import Vue from 'vue';
import App from './App';
import fastclick from 'fastclick';
import "babel-polyfill";

fastclick.attach(document.body);


class Test {
  constructor() {
    this.init();
  }

  init() {
    console.log("asdfasdfasdf".includes("asd"));
  }
}


new Test();
