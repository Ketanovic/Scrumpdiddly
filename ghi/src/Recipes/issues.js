function mergeSort(values, left=null, right=null) {
    console.log(values, left, right)
    if (left == null && right == null) {
        const left = 0
        const right = values.length - 1
    }

    if (left >= right) {
        return
    }



}

let middle = (right + left) / 2;

mergeSort(values, left, middle);

mergeSort(values, middle + 1, right);
function mergeSort(values, left = null, right = null) {
  if (left === null && right === null) {
    left = 0;
    right = values.length - 1;
  }

  if (left >= right) {
    return;
  }

  const middle = Math.floor((right + left) / 2);
  mergeSort(values, left, middle);
  mergeSort(values, middle + 1, right);
  merge(values, left, middle, right);
  return values;
}

function merge(values, left, middle, right) {
  let right_start = middle + 1;
  if (values[middle] <= values[right_start]) {
    return;
  }

  while (left <= middle && right_start <= right) {
    if (values[left] <= values[right_start]) {
      left += 1;
    } else {
      const value = values[right_start];
      let index = right_start;

      while (index != left) {
        values[index] = values[index - 1];
        index -= 1;
      }

      values[left] = value;
      left += 1;
      middle += 1;
      right_start += 1;
    }
  }
}

mergeSort(values, left, middle, right);

function merge(values, left, middle, right) {
    const right_start = middle + 1

    if (values[middle] <= values[right_strart]) {
        return
    }

    while (left <= middle && right_start <= right) {
        if (values[left] <= values[right_start]) {
            left += 1
        } else {
            let value = values[right_start]
            let index = right_start
        }

    while (index != left) {
        values[index] = values[index - 1]
        index -= 1
    }

    values[left] = value

    left += 1
    middle += 1
    right_start += 1
    }
}
