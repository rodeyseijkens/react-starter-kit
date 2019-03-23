function createSequence() {
  let start = 0;

  return {
    next() {
      start += 1;
      return String(start);
    },
  };
}

export default createSequence;
