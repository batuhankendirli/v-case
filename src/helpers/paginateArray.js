// This function helps us achieve a paginated array.
// const someArray = [1,2,3,4,5,6,7,8,9,10]
// paginateArray(someArray, 3) => [[1,2,3],[4,5,6],[7,8,9],[10]]

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
