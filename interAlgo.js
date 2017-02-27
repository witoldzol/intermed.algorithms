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

function convertToRoman(num) {
  
  //created variables for clarity, not really necessary
  var a = "I"; //1
  var b = "V"; //5
  var c = "X"; //10
  var d = "L"; //50
  var e = "C"; //100
  var f = "D"; //500
  var g = "M"; //1000
  var arr =[];
  
  //lets replace arabic numbers to roman and deal with logic later
  //we loop through number, decrease it, and push replacement roman number in array
  function replace(){
    
    for (i=0; num>=1000;i++ ){
      num = num- 1000;
      arr.push(g);
    } 
    for (i=0; num>=500;i++ ){
      num = num- 500;
      arr.push(f);
    }
    for (i=0; num>=100;i++ ){
      num = num- 100;
      arr.push(e);
    }
    for (i=0; num>=50;i++ ){
      num = num- 50;
      arr.push(d);
    }
    for (i=0; num>=10;i++ ){
      num = num- 10;
      arr.push(c);
    }
    for (i=0; num>=5;i++ ){
      num = num- 5;
      arr.push(b);
    }
    for (i=0; num>=1;i++ ){
      num = num- 1;
      arr.push(a);
    } 
  } 
  //run function
  replace(num);
  //now our array 'arr' has all roman numbers that would add up to original number
  //we have to now 'prune it'
  //lets start with getting rid of all instances that has same number repeat more than 3 times (except for 'M');
  
  
  //lets separate numbers from each category into separate arrays
  //for example, all 'M's will go to arrM
  var arrM = arr.filter(function(x){
    return x === "M";
  });
  var arrD = arr.filter(function(x){
    return x === "D";
  });
  var arrC = arr.filter(function(x){
    return x === "C";
  });
  var arrL = arr.filter(function(x){
    return x === "L";
  });
  var arrX = arr.filter(function(x){
    return x === "X";
  });
  var arrV = arr.filter(function(x){
    return x === "V";
  });
  var arrI = arr.filter(function(x){
    return x === "I";
  });
  
 //this function will test first letter, and replace last three (in condense function) with a higher number 
 var foo = function upgrade(z) {
      if(z[0] == a){
        return b;
      } else if (z[0] == b){
        return c;
      } else if (z[0] == c){
        return d;
      } else if (z[0] == d){
        return e;
      } else if (z[0] == e){
        return f;
      } else if (z[0] == f){
        return g;
      } else 
        return z;
    }; 

  //condensing function
  function condense(y){
    
    if(y.length >3){
      //I use foo variable, because I couldn't find a way to put pure function 
      //so, if array has more than 3 same letters we have to 'prune' it
      //we skip first letter and replace remaining 3 with 'one step higher' letter, eg. (I)III will be replaced with V, giving us IV = win!
       y.splice(1,3, foo(y));
    } else
      //if there's less than 4 elements, we can return array as is
      return y;
  }
  
  //condense all arrays
  condense(arrI);
  condense(arrV);
  condense(arrX);
  condense(arrL);
  condense(arrC);
  condense(arrD);
  
  //concatenate all arrays (order is important, highest to lowest), and stringify them 
  var str ="";
  str = arrM.concat(arrD,arrC,arrL,arrX,arrV,arrI).join("");
 
  //final 'pruning' 
  function cleanUp (x){
   x= x.replace("VIV", "IX");
   x= x.replace("XVX", "XL");
   x= x.replace("LXL", "XC");
   x= x.replace("CLC", "CD");
   x= x.replace("DCD", "CM");
   return x; 
  }  
  //win!
  return cleanUp(str);

}

convertToRoman(950);


// -------------------  4 ----- Return objects that contain items from test object.
function whatIsInAName(collection, source) {
  // What's in a name?
  
  // Only change code below this line
  
  var keySource=  Object.keys(source); //[a,b]
  
  var l = keySource.length;
  
  var valSource = Object.values(source); //[1,2]
  
  var arr=[];
  
  var arrCheck=[];
  
  var arrFinal = [];
  
  var arrTemp =[];
  
  //function to test if all elements in array are equal to 'true'
  function isTrue(y,array){
    return y === true;
  }
  
  //main loop, that goes through 'collection' array of objects properties
  for(var prop in collection){

     //inner loop that goes tests if properties and values in 'source' array exist in 'collection'
    for(i=0; i<l; i++){

      if(collection[prop].hasOwnProperty(keySource[i]) && collection[prop][keySource[i]]  == valSource[i] ){
            //if we find property and value, we push 'true' to test array 'arrCheck'
           arrCheck.push(true);  
         } else{
            //if we find that property/value doesn't match 'collection' object, we push 'false' into test array
            arrCheck.push(false);             
         }
    }

    //after we loop through first object, we can check arrCheck
    //if arrCheck has all items equal to 'true' that means, all objects in 'source' are present in 'collection' object
    //and we can push that object into our final array
    if( arrCheck.every(isTrue)){
      arrFinal.push(collection[prop]);
    } 
    //clear arrCheck for new run
    arrCheck = [];
  }
      
    //gg no re  
    return arrFinal;  
    
  
 

  // Only change code above this line
 
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });


// -------------------  5 ----- Find a word in a string and replace it with new word preserving capitalization of first letter (EASY AS FOK)
// this challange is a joke after challange nb. 4, what the actual fuck?!

function myReplace(str, before, after) {

  var strAfter ="";
  var character = before.charAt(0); // 'before' first character
  var characterAfter = after.charAt(0); //'after' first character
  var afterArr =after.split("");
  var splice = afterArr.splice(0,1); 
  var afterSplice = afterArr.join(""); //'after' string without first letter+
  //we take firt character and capitalize it, and concatenate rest unchanged
  var capitalizedAfter = characterAfter.toUpperCase() + afterSplice;
  
  //lets test if the first character of word that we replace is a number
  // we do this because if we test for lower/upper case, number will return 'true' on both tests
  if(!isNaN(character * 1)){
    //if it's a number, just replace and enjoy beer 
     strAfter = str.replace(before, after);
    //if the first letter of word we replace is upper case
  } else if (character == character.toUpperCase()){
     //we replace with after that has capitalized first letter
     strAfter = str.replace(before, capitalizedAfter);   
      //if the first letter of word we replace is lower case, we just replace without changes
    } else if (character == character.toLowerCase()){
      strAfter = str.replace(before, after);
    }
   
  
  return strAfter;
}

myReplace("He is Sleeping on the couch", "Sleeping", "sitting");


// -------------------  6 ----- Pig Latin: find first vowel in string, start new word from that point, concatenate substring that was before
// and finally add 'ay' eg. glove = oveglay (ove + gl + ay)


function translatePigLatin(str) {
 // A, E, I, O, U, and sometimes Y. - vowels
 // Y is a consonant if it appears as first letter in the word (since examples are don't include 'y', I won't bother implementing)
  var test =[];
 //we pass string (x), and lowest index ie. first vowel we find in the string
 function pigLatin (x, index) {
   //substring that starts from first vowel
   var sub = x.substr(index);
   //substring that appears before first vowel
   var preSub = x.substr(0,index);
   return sub + preSub + "ay";
 } 
  
 //I started making case for y and !y, but didn't bother finishing case if == y 
 if(str.charAt(0) !== "y"){
    //we loop through string looking for vowels
    for(i=0; i<str.length; i++){
       //simple switch that finds and pushes index of vowels to holding array
       switch (str.charAt(i)){
         case "a":
           test.push(i);
           break;
         case "e":
           test.push(i);
           break;
         case "i":
           test.push(i);
           break;
         case "o":
           test.push(i);
           break;
         case "u":
           test.push(i);
           break;
         case "y":
           test.push(i);
           break;
       }
    } 
 } 
  //because array will naturally start with lowest index, 
  //we can simply take first element knowing it points to first encountered vowel
  var index = test[0];
  
  //if string starts with vowel, ie index = 0, we just concatenate 'way' 
  if(index === 0){
    return str + "way";
    // otherwise we run our function, and go get a beer
    } else {
    return pigLatin(str, index);
  }
  
}

translatePigLatin("glove");

// -------------------  7 ----- 
// -------------------  7 ----- 
// -------------------  7 ----- 
// -------------------  7 ----- 
