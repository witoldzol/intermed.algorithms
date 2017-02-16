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
  
  //combine both arrays
  var newArr=arr1.concat(arr2);
  
  
  //NO IDEA HOW IT WORKS BUT ITS AMAZING! 
  //it will return object with unique keys, and assign whatever value we want!
  var obj = {};
  //create object and tag keys with dupli / not dupli values
  for(i=0; i<newArr.length; i++){
    var a =newArr[i]; 
    obj[a] = obj[a] ? "d" : "nd";
  }

  
  //filter out duplicate 
  var arr =Object.keys(obj).filter(function(key) {
      //return keys with value of "nd"
      return obj[key]== "nd";
  });
 
 //container for final array 
 var finalArr =[];  
 //because filtered keys from object are all returned as strings
  //we test all items, if they are true stings they will not pass 'isNaN' test
  function isItANumber(){ 
    for (i=0; i<arr.length; i++){
      if(isNaN(arr[i])){
        //if element is NaN, ie real string, we just push original value without changing it
        finalArr.push(arr[i]);
      } else
      // if we multiply * 1 js will automatically convert string number to 'true' number  
      finalArr.push(arr[i] * 1);

    }
 }
  
 //run function 
 isItANumber(); 
 
 return finalArr;

  
}

// -------------------  3 ----- Roman Numeral Converter (convert normal number to roman numerals)
