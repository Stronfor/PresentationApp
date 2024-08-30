type EventCallback = (...args: any[]) => void;

const emitter = () => {
  const events: Map<string, EventCallback[]> = new Map();
  const wrapped = new Map();
  const ee = {
    on: (name: string, f: EventCallback, timeout = 0) => {
      const event = events.get(name);
      if (event) event.push(f);
      else events.set(name, [f]);
      if (timeout) setTimeout(() => {
        ee.remove(name, f);
      }, timeout);
    },
    emit: (name: string, ...data:  any[]) => {
      const event = events.get(name);
      if (event) event.forEach((f) => f(...data));
    },
    once: (name: string, f: EventCallback) => {
      const g = (...a: any) => {
        ee.remove(name, g);
        f(...a);
      };
      wrapped.set(f, g);
      ee.on(name, g);
    },
    remove: (name: string, f: EventCallback) => {
      const event = events.get(name);
      if (!event) return;
      let i = event.indexOf(f);
      if (i !== -1) {
        event.splice(i, 1);
        return;
      }
      const g = wrapped.get(f);
      if (g) {
        i = event.indexOf(g);
        if (i !== -1) event.splice(i, 1);
        if (!event.length) events.delete(name);
      }
    },
    clear: (name: string) => {
      if (name) events.delete(name);
      else events.clear();
    },
    count: (name: string) => {
      const event = events.get(name);
      return event ? event.length : 0;
    },
    listeners: (name: string) => {
      const event = events.get(name);
      return event?.slice();
    },
    names: () => [...events.keys()]
  };
  return ee;
};

// create single context for all components
const _Emitter = emitter()

export default _Emitter