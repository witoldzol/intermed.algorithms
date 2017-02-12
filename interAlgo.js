// -------------------  1 ---- Find total of all elements in array and numbers in between them eg [1,4], total of 1,2,3,4;


function sumAll(arr) {
//find minimum    
  var max = Math.max.apply(null, arr);
  //find max in array
  var min = Math.min.apply(null, arr);
  //create variable for array to hold all numbers
  var totalArray=[];
  //I tried originally for(i=min-1, i <= max, i++) which worked only if min = 1, 
  //if higher than that it wouldn't start incrementing at right place
  //eg. min =3 would create first element as min=3 + i(3-1) = 5!! (thats why it worked when min=0, but wouldn't above it)
  //so i decided to start from i=0 and increment times difference of max-min.
  for(i=0; i <= max-min; i++){
      
    totalArray.push(min+i);
    
  }

  return totalArray.reduce(function(a,b){
    return a+b;
  });
  
}

sumAll(arr);

// -------------------  2 ----- remove all repeating elements in two arrays

function diffArray(arr1, arr2) {
  
  var newArr=arr1.concat(arr2);
  //return newArr.indexOf(3);
  
  var arrTest = {};
  for(i=0; i<newArr.length; i++){
    var a =newArr[i];
    arrTest[a] = arrTest[a] ? '' : arrTest.push(a);
  }
  
  
  return arrTest.filter(function(x){
    return x!=="";
    
  });
  
  
  
  
}

diffArray(["diorite", "andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]);


// -------------------  2 -----
// -------------------  2 -----
// -------------------  2 -----