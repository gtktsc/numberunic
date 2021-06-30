import { createStore, createHook } from "react-sweet-state";

const Store = createStore({
  initialState: {
    value: 1,
  },
  actions: {
    setValue:
      (value) =>
      ({ setState }) => {
        setState({
          value,
        });
      },
  },
});

export default createHook(Store);
