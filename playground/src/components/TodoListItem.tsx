import React from "react";
import { Stack } from "@uifabric/experiments";
import { Checkbox, IconButton, TextField } from "office-ui-fabric-react";
import { mergeStyles } from "@uifabric/styling";
import { Store } from "../store";
import { actionsWithService } from "../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";

export interface TodoListItemProps {
  todoId: string;
}

interface PropsFromState {
  id: string;
  checked: boolean;
  label: string;
}

interface PropsFromDispatch {
  edit: (id: string, label: string) => void;
  complete: (id: string) => void;
  remove: (id: string) => void;
}

export interface TodoListItemState {
  editing: boolean;
  editLabel: string;
}

const className = mergeStyles({
  selectors: {
    ".clearButton": {
      visibility: "hidden"
    },
    "&:hover .clearButton": {
      visibility: "visible"
    }
  }
});

type InternalProps = PropsFromState & PropsFromDispatch;

class TodoListItem extends React.Component<InternalProps, TodoListItemState> {
  /**
   *
   */
  constructor(props: InternalProps) {
    super(props);
    this.state = { editing: false, editLabel: undefined };
  }

  onEdit = () => {
    this.setState(prevState => ({
      editing: true,
      editLabel: prevState.editLabel || this.props.label
    }));
  };

  onDoneEdit = () => {
    this.props.edit(this.props.id, this.state.editLabel);
    this.setState(prevState => ({
      editing: false,
      editLabel: undefined
    }));
  };

  onKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.which === 13) {
      this.onDoneEdit();
    }
  };

  onChange = (evt: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ editLabel: newValue });
  };

  render() {
    const { label, checked, complete, remove, id } = this.props;

    return (
      <Stack
        horizontal
        className={className}
        verticalAlign="center"
        horizontalAlign="space-between"
      >
        {!this.state.editing && (
          <>
            <Checkbox
              label={label}
              checked={checked}
              onChange={() => complete(id)}
            />
            <div>
              <IconButton
                iconProps={{ iconName: "Edit" }}
                className="clearButton"
                onClick={this.onEdit}
              />
              <IconButton
                iconProps={{ iconName: "Cancel" }}
                className="clearButton"
                onClick={() => remove(id)}
              />
            </div>
          </>
        )}

        {this.state.editing && (
          <TextField
            value={this.state.editLabel}
            onChange={this.onChange}
            onKeyPress={this.onKeyDown}
          />
        )}
      </Stack>
    );
  }
}

export function mapStateToProps(
  store: Store,
  ownProps: TodoListItemProps
): PropsFromState {
  const todo = store.todos[ownProps.todoId];
  return {
    id: ownProps.todoId,
    checked: todo.completed,
    label: todo.label
  };
}

export function mapDispatchToProps(dispatch: Dispatch<any>): PropsFromDispatch {
  return {
    remove: (id: string) => dispatch(actionsWithService.remove(id)),
    complete: (id: string) => dispatch(actionsWithService.complete(id)),
    edit: (id: string, label: string) =>
      dispatch(actionsWithService.edit(id, label))
  };
}

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListItem);

export { component as TodoListItem };
