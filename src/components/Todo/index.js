import React, { useRef } from "react";
import "./styles.css";
import { useState } from "react";

function Todo() {
  const [val, setVal] = useState();
  const [arr, setArr] = useState(["Do Exercise", "Learn somthing new", "read the books"]);
  const [active, setActive] = useState();
  const [input, setInput] = useState("");

  const onChange = (e) => {
    setVal(e.target.value);
  };

  function addButton() {
    setArr(arr.concat([val]));
    setVal("");
  }

  const deleteButton = (index) => {
    var result = arr.concat([]);
    result.splice(index, 1);
    // console.log(result);
    setArr(result);
  };

  const changeEvent = (e) => {
    setInput(e);
  };

  const editButton = (index) => {
    setActive(index);
  };

  const handleEscape = (index, item, event) => {
    if (event.keyCode === 27) {
      setActive(false);
      const escapeArr = [...arr];
      escapeArr[index] = item;
      setArr(escapeArr);
    }
  };

  const submitEvent = (e, index, item) => {
    e.preventDefault();
    console.log(e);

    const newArr = [...arr];
    if (input === "") {
      newArr[index] = item;
      setArr(newArr);
      // alert("cancel")
    } else {
      newArr[index] = inputRef.current.value;
      setArr(newArr);
    }
    setInput("");
    setActive(false);
  };

  const inputRef = useRef();

  return (
    <div id="div1">
      <h1>To-Do List</h1>
      <form id="form1" onSubmit={(e) => e.preventDefault()}>
        <input
        id="input1"
          type="text"
          placeholder="
          Type here"
          value={val}
          onChange={onChange}
        />
       {val? (<button  type="submit" onClick={addButton}>
          + Add
        </button>) : (<button  type="submit" >
          + Add
        </button>)}
      </form>
      <div id="div2">
        <ol>
        {arr.map((item, index) => (
          <form className="form2" onSubmit={(e) => submitEvent(e, index, item)}>
            <li>
              {active !== index &&<b>{item}</b> }
              {index === active && (
                <input
                  className="input2"
                  type="text"
                  ref={inputRef}
                  defaultValue={item}
                  onChange={(e) => changeEvent(e.target.value)}
                  onKeyDown={(event) => handleEscape(index, item, event)}
                />
              )}
              {index === active ? (
                <input className="submit" type="submit" value="Submit"></input>
              ) : (
                <button  className="edit" onClick={() => editButton(index)}>
                  Edit
                </button>
              )}
              {<button className="delete" onClick={() => deleteButton(index)}>Delete</button>}
            </li>
          </form>
        ))}
        </ol>
      </div>
      </div>
  );
}

export default Todo;
