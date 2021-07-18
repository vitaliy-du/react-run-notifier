import * as Lib from "run-notifier";
import * as React from "react";

/**
 * Notifier listener.
 */
export type NotifierListener<Params> = React.Component | Lib.NotifierListener<Params>;

/**
 * Notifier handler.
 */
export type NotifierNotice<Params> = Lib.NotifierNotice<Params>;

/**
 * Notifier. Allows you to notify listeners.
 */
export class Notifier<Params> extends Lib.Notifier<Params> {
	/**
	 * Add notification listener.
	 *
	 * @param listener Listener;
	 * @param notice Handler. Called on listener notification;
	 * @param extra Additional arguments.
	 */
	public addListener(listener: NotifierListener<Params>, notice?: NotifierNotice<Params>, ...extra: any): void;

	/**
	 * Connect notification listener. Not required to call removeListener.
	 * Method removeListener will called before componentWillUnmount of notification react-listener.
	 *
	 * @param listener Listener;
	 * @param notice Handler. Called on listener notification;
	 * @param silent If *true*, then forceUpdate will not called in notification react-listener.
	 */
	public connectListener(listener: React.Component, notice?: NotifierNotice<Params>, silent?: boolean): void;

	/**
	 * Remove notification listener.
	 *
	 * @param listener Listener.
	 */
	public removeListener(listener: NotifierListener<Params>): void;
}