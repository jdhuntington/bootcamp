import { DefaultButton } from "office-ui-fabric-react";
import React from "react";
import { Text, Stack } from "@uifabric/experiments";
import { actions, actionsWithService } from "../actions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { Store, FilterTypes } from "../store";

export interface TodoFooterProps {}

interface PropsFromDispatch {
  clear: () => void;
}

interface PropsFromState {
  activeItemCount: number;
}

type TodoFooterInternalProps = PropsFromState & PropsFromDispatch;

const TodoFooter = (props: TodoFooterInternalProps) => {
  return (
    <Stack horizontal horizontalAlign="space-between">
      <Text>
        {props.activeItemCount} item{props.activeItemCount === 1 ? "" : "s"}{" "}
        left
      </Text>
      <DefaultButton onClick={() => props.clear()}>
        Clear Completed
      </DefaultButton>
    </Stack>
  );
};

export function mapStateToProps(
  { todos, filter }: Store,
  ownProps: {}
): PropsFromState {
  return {
    activeItemCount: 1337
  };
}

export function mapDispatchToProps(dispatch: Dispatch<any>): PropsFromDispatch {
  return {
    clear: () => dispatch(actionsWithService.clear())
  };
}

const component = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoFooter);

export { component as TodoFooter };
