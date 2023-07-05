import { TASK_TITLES } from "./constants";

export const getRandomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

export const getRandomTaskTitle = () => {
  console.log(getRandomItem(TASK_TITLES));
  return getRandomItem(TASK_TITLES);
};

export async function waitForRef(ref, maxRetries = 10, interval = 100) {
  if (ref.value && typeof ref.value === "object" && ref.value.$el) {
    // Ref is available, focus on the underlying DOM element
    ref.value.$el.focus();
  } else if (maxRetries > 0) {
    // Ref is not available, wait for a specified interval and try again
    await new Promise((resolve) => setTimeout(resolve, interval));
    await waitForRef(ref, maxRetries - 1, interval);
  }
}

export const calculateDraggedPosition = ({event, tasks}) => {
  const draggedIndex = event.oldIndex;
  const targetIndex = event.newIndex;
  const draggedTask = tasks[draggedIndex];
  const targetTask = tasks[targetIndex];

  let calcPosition;

  if (targetIndex > draggedIndex) {
    // Dragging down
    if (targetIndex === tasks.length - 1) {
      // If dragging to the last position, set the position as a higher value
      calcPosition = targetTask.position + 1;
    } else {
      // Calculate the new position as the average of the target and next task positions
      const nextTask = tasks[targetIndex + 1];
      calcPosition =
        targetTask.position + (nextTask.position - targetTask.position) / 2;
    }
  } else if (targetIndex < draggedIndex) {
    // Dragging up
    if (targetIndex === 0) {
      // If dragging to the first position, set the position as a fraction of the second task's position
      const secondTask = tasks[1];
      calcPosition = secondTask.position / 2;
    } else {
      // Calculate the new position as the average of the target and previous task positions
      const prevTask = tasks[targetIndex - 1];
      calcPosition =
        prevTask.position + (targetTask.position - prevTask.position) / 2;
    }
  }

  calcPosition = parseFloat(calcPosition.toFixed(3));

  // Update the position of the dragged task
  draggedTask.position = calcPosition;
  return [draggedTask, calcPosition];
};

