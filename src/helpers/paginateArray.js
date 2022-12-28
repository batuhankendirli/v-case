const paginateArray = (arr, resultsPerPage) => {
  const paginatedArray = [];
  for (let i = 0; i < Math.ceil(arr?.length / resultsPerPage); i++) {
    let tempArr = [];
    for (let j = 0; j < resultsPerPage; j++) {
      if (typeof arr[i * resultsPerPage + j] !== 'undefined') {
        tempArr.push(arr[i * resultsPerPage + j]);
      }
    }
    paginatedArray.push(tempArr);
  }
  return paginatedArray;
};

export default paginateArray;
