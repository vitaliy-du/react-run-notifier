import * as Lib from "run-notifier";
import * as React from "react";

export function Notifier() {
	Lib.Notifier.constructor.call(this);

	this.connectListener = function (listener, notice, silent) {
		this.addListener(listener, notice, silent);

		const nextComponentWillUnmount = listener.componentWillUnmount;
		listener.componentWillUnmount = (...args) => {
			this.removeListener(listener);
			listener.componentWillUnmount = nextComponentWillUnmount;
			nextComponentWillUnmount && nextComponentWillUnmount(...args);
		};
	}

	this.notify = function (listener, target, params) {
		super.notify(listener, target, params);
		if (listener instanceof React.Component) target.extra.silent || listener.forceUpdate();
	};
}