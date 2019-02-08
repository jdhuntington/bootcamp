import React from "react";
import { Stack } from "@uifabric/experiments";
import { TodoFooter } from "./TodoFooter";
import { TodoHeader } from "./TodoHeader";
import { TodoList } from "./TodoList";

export class TodoApp extends React.Component {
  render() {
    return (
      <Stack horizontalAlign="center">
        <Stack style={{ width: 400 }} verticalGap={25}>
          <TodoHeader />
          <TodoList />
          <TodoFooter />
        </Stack>
      </Stack>
    );
  }
}
