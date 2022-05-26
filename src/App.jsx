import { Provider } from "react-redux";
import { createStore } from "redux";
import Form from "./components/Form";
import Header from "./components/Header";

const initialState = {
  todoArray: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "add_todo":
      return {
        ...state,
        todoArray: [
          { text: action.payload, checked: false },
          ...state.todoArray,
        ],
      };
    case "delete_todo":
      return {
        ...state,
        todoArray: state.todoArray.filter(
          (item, index) => index !== action.payload
        ),
      };
    case "check_todo":
      return {
        ...state,
        todoArray: [
          ...state.todoArray.map((item, index) => {
            if (index === action.payload) {
              return { ...item, checked: !item.checked };
            }
            return item;
          }),
        ],
      };
    default:
      return state;
  }
};
const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Form />
      </div>
    </Provider>
  );
}

export default App;
