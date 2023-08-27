const isEvenNumberRangeSeats = (arr) => {
    let evenArr = [];
    let oddArr = [];
    arr.map((item) => {
      return item !== 62 && item % 2 === 0
        ? evenArr.push(item)
        : oddArr.push(item);
    });
    return { evenArr, oddArr };
  };

const rangeSeats = (arr) => {
    let total = [];
  
    arr.map((item, index) => {
      let box = [];
      if (index % 2 === 0) {
        box = [item, arr[index + 1]];
        total.push(box);
      }
      return item;
    });
  
    return total;
  };

export const getSeatsArr = (class_type) => {
    let boxSeatsArr = [];
    let rangeBoxSeatsArr = [];
    let rangeSideSeatsArr = [];
    if (class_type === "first") {
      boxSeatsArr = Array.from({ length: 18 }, (_, index) => index + 1);
      boxSeatsArr.splice(1, 1);
      boxSeatsArr.splice(15, 1);
      rangeBoxSeatsArr = rangeSeats(boxSeatsArr);
      return rangeBoxSeatsArr;
    } else if (class_type === "second") {
      boxSeatsArr = Array.from({ length: 32 }, (_, index) => index + 1);
      rangeBoxSeatsArr = rangeSeats(boxSeatsArr);
      return rangeBoxSeatsArr;
    } else if (class_type === "third") {
      boxSeatsArr = Array.from({ length: 32 }, (_, index) => index + 1);
      let sideSeatsArr = (start, stop, step) =>
        Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
      rangeBoxSeatsArr = rangeSeats(boxSeatsArr);
      rangeSideSeatsArr = rangeSeats(sideSeatsArr(33, 48, 1));
      return [rangeBoxSeatsArr, rangeSideSeatsArr];
    } else if (class_type === "fourth") {
      boxSeatsArr = Array.from({ length: 62 }, (_, index) => index + 1);
      let sector2 = boxSeatsArr.splice(32, 31);
      let sector1 = boxSeatsArr;
      const sideRight = isEvenNumberRangeSeats(sector1);
      const sideLeft = isEvenNumberRangeSeats(sector2);
      return [sideRight, sideLeft];
    }
  };