import * as Lib from "run-notifier";
import * as React from "react";

export function Notifier() {
	Lib.Notifier.call(this);

	this.connectListener = function (listener, notice, silent) {
		this.addListener(listener, notice, silent);

		if (listener instanceof React.Component) {
			const nextComponentWillUnmount = listener.componentWillUnmount;
			listener.componentWillUnmount = (...args) => {
				this.removeListener(listener);
				listener.componentWillUnmount = nextComponentWillUnmount;
				nextComponentWillUnmount && nextComponentWillUnmount(...args);
			};
		}
	}

	var superNotify = this.notify;
	this.notify = function (listener, target, params) {
		superNotify(listener, target, params);
		if (listener instanceof React.Component) target.extra.silent || listener.forceUpdate();
	};
}
