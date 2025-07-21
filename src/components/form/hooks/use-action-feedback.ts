import { useEffect, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type OnArgs = {
  actionState: ActionState;
};

type UseActionFeedbackOptions = {
  onSuccess?: (onArgs: OnArgs) => void;
  onError?: (onArgs: OnArgs) => void;
};

const useActionFeedback = (
  actionState: ActionState,
  options: UseActionFeedbackOptions
) => {
  // keep track of previous timestamp to determine if we have a new update
  // with useRef we can keep track of the previous value without triggering a re-render
  const prevTimestamp = useRef(actionState.timestamp);
  const isUpdate = prevTimestamp.current !== actionState.timestamp;

  useEffect(() => {
    // if not an update, do nothing and return
    if (!isUpdate) return;

    if (actionState.status === "SUCCESS") {
      options.onSuccess?.({ actionState }); // if onSuccess is defined, call it
    }

    if (actionState.status === "ERROR") {
      options.onError?.({ actionState }); // if onError is defined, call it
    }

    // update previous timestamp because we have now processed the update
    // otherwise we will keep processing the same update over and over again
    prevTimestamp.current = actionState.timestamp;
  }, [actionState, options, isUpdate]);
};

export { useActionFeedback };
