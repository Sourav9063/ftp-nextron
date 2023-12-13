export const incrementListState = ({
  maxLength = 200,
  setListState,
  increment = 100,
}) => {
  setListState((state) => {
    return Math.min(maxLength, state + increment);
  });
};
