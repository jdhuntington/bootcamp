import React from "react";
import { Text, Stack } from "@uifabric/experiments";
import { Pivot, PivotItem, TextField } from "office-ui-fabric-react";
import { actions, actionsWithService } from "../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Store, FilterTypes } from "../store";

export interface TodoHeaderProps {}

interface PropsFromDispatch {
  add: (label: string) => void;
  setFilter: (f: FilterTypes) => void;
}

interface PropsFromState {
  filter: FilterTypes;
}

interface TodoHeaderState {
  labelInput: string;
}

type TodoHeaderInternalProps = PropsFromState & PropsFromDispatch;

class TodoHeader extends React.Component<
  TodoHeaderInternalProps,
  TodoHeaderState
> {
  constructor(props: TodoHeaderInternalProps) {
    super(props);
    this.state = { labelInput: undefined };
  }

  onKeyPress = (evt: React.KeyboardEvent) => {
    if (evt.charCode === 13) {
      this.props.add(this.state.labelInput);
      this.setState({ labelInput: undefined });
    }
  };

  onChange = (evt: React.FormEvent<HTMLInputElement>, newValue: string) => {
    this.setState({ labelInput: newValue });
  };

  onFilter = (item: PivotItem) => {
    this.props.setFilter(item.props.headerText as FilterTypes);
  };

  render() {
    return (
      <Stack>
        <Stack horizontal horizontalAlign="center">
          <Text variant="xxLarge">todos</Text>
        </Stack>

        <TextField
          placeholder="What needs to be done?"
          value={this.state.labelInput}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />

        <Pivot onLinkClick={this.onFilter}>
          <PivotItem headerText="all" />
          <PivotItem headerText="active" />
          <PivotItem headerText="completed" />
        </Pivot>
      </Stack>
    );
  }
}

export function mapStateToProps(
  store: Store,
  ownProps: TodoHeaderProps
): PropsFromState {
  return {
    filter: store.filter
  };
}

export function mapDispatchToProps(dispatch: Dispatch<any>): PropsFromDispatch {
  return {
    add: (label: string) => dispatch(actionsWithService.add(label)),
    setFilter: (filter: FilterTypes) => dispatch(actions.filter(filter))
  };
}

const component = connect<TodoHeaderProps>(
  mapStateToProps,
  mapDispatchToProps
)(TodoHeader);

export { component as TodoHeader };
