react-run-notifier
===========

[![npm version][npm-image]][npm-url] [![license][license-image]][license-url] [![downloads][downloads-image]][downloads-url]

Allows you to notify listeners. Supported react components.

Install with [npm](https://www.npmjs.com/):

npm:
```sh
npm install react-run-notifier --save
```

### How to use

```tsx
import {Notifier} from "react-run-notifier";

const listener1 = (params: string) => console.log('listener 1.', params);
const listener2 = (params: string) => console.log('listener 2.', params);
const listener3 = (params: string) => console.log('listener 3.', params);

const notifier: Notifier<string> = new Notifier();

class TestControl extends React.Component {
    constructor(params: any) {
        super(params);

        notifier.connectListener(this, listener3); // Not required to call removeListener
    }

    componentDidMount() {
        notifier.signal('test D');
        // console --->>> listener 3. test D
    }

    render() {
        return 'test';
    }
}

// or

notifier.addListener(listener1);
notifier.addListener(listener2);
notifier.signal('test A');
// console --->>> listener 1. test A
// console --->>> listener 2. test A
notifier.removeListener(listener1);
notifier.removeListener(listener2);

// or

notifier.addListener('listener1', listener1);
notifier.addListener('listener2', listener2);
notifier.signal('test B');
// console --->>> listener 1. test B
// console --->>> listener 2. test B
notifier.removeListener('listener1');
notifier.removeListener('listener2');

// or

notifier.addListener('listener1', listener2);
notifier.addListener('listener1', listener1); // replace listener with same key
notifier.addListener('listener2', listener2);
notifier.signal('test C');
// console --->>> listener 1. test C
// console --->>> listener 2. test C
notifier.removeListener('listener1');
notifier.removeListener('listener2');
```

## Doc
```ts
/**
 * Notifier. Allows you to notify listeners.
 */
class Notifier<Params> {
    /**
     * Called before adding the first notification listener.
     * Used to initialize any activity in inheritor.
     */
    protected onStart(): void;

    /**
     * Called after removing the last notification listener.
     * Used to finalize any activity in inheritor.
     */
    protected onStop(): void;

    /**
     * Add notification listener.
     *
     * @param listener Listener;
     * @param notice Handler. Called on listener notification;
     * @param extra Additional arguments.
     */
    public addListener(listener: NotifierListener<Params>, notice?: NotifierNotice<Params>, ...extra: any): void;

    /**
     * Remove all notification listeners.
     */
    public clear(): void;

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

    /**
     * Notify listeners.
     *
     * @param params Notification parameters.
     */
    public signal(params: Params): void;
}

```

## License

[MIT](LICENSE). Copyright (c) 2021 Vitaliy Dyukar.

[npm-image]: https://img.shields.io/npm/v/react-run-notifier.svg?style=flat-square
[npm-url]: https://npmjs.org/package/react-run-notifier
[license-image]: https://img.shields.io/npm/l/react-run-notifier.svg?style=flat-square
[license-url]: https://npmjs.org/package/react-run-notifier
[downloads-image]: http://img.shields.io/npm/dm/react-run-notifier.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/react-run-notifier