const Food = {
  generate: (board) => ({
    x: Math.floor(board.columns * Math.random()),
    y: Math.floor(board.rows * Math.random()),
  }),
};

export default Food;
