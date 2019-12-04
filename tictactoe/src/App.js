import React, { useEffect, useReducer, useCallback } from "react";
import { createGlobalStyle } from "styled-components";

import Table from "./components/Table";

const GlobalStyle = createGlobalStyle`
  table {
    border-collapse: collapse;
  }
  td {
    border: 3px solid black;
    width: 120px;
    height: 120px;
    text-align: center;
  }
  table, #result{
    font-size: 3em;
  }
`;

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ],
  recentCell: [-1, -1]
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      };
    case CHANGE_TURN: {
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O"
      };
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;

  // const onClickTable = useCallback(() => {
  //   dispatch({ type: SET_WINNER, winner: turn });
  // }, [turn]);

  useEffect(() => {
    const [row, cell] = recentCell;
    if (row < 0) {
      return;
    }
    let win = false;
    if (
      tableData[row][0] === turn &&
      tableData[row][1] === turn &&
      tableData[row][2] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][cell] === turn &&
      tableData[1][cell] === turn &&
      tableData[2][cell] === turn
    ) {
      win = true;
    }
    if (
      tableData[0][0] === turn &&
      tableData[1][1] === turn &&
      tableData[2][2]
    ) {
      win = true;
    }
    if (
      tableData[0][2] === turn &&
      tableData[1][1] === turn &&
      tableData[2][0]
    ) {
      win = true;
    }
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
    } else {
      dispatch({ type: CHANGE_TURN });
    }
  }, [recentCell]);

  return (
    <>
      <GlobalStyle />
      <Table tableData={tableData} dispatch={dispatch} />
      {winner && <div id="result">{winner}님의 승리 !</div>}
    </>
  );
};

export default App;
