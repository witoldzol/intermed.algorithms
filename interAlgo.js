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

// -------------------  7 ----- DNA pairings (simple algo that teaches how to use 'push' and 'map' methods)

function pairElement(str) {
  //lets create array out of string characters
  var arr = str.split("");
  var test =[];
  //map method will go each element in array 
  arr.map(function(x){
    var c = ["C", "G"];
    var g = ["G", "C"];
    var t = ["T", "A"];
    var a = ["A", "T"];
    //we identify each of 4 possible characters in array, and push pairing array into our test array
    if(x=="C"){
       test.push(c);
    } else if(x=="G"){
       test.push(g);
    } else if(x=="T"){
      test.push(t);
    } else if(x=="A"){
      test.push(a);
    }
    
  });
  //beer and music
  return test;
}

pairElement("GCG");


// -------------------  8 ----- 
// -------------------  9 ----- find unique values in arrays, and arrange them in single array while preserving their original order

function uniteUnique(arr) {
  
  var test=[];
  //get all the arguments into single array
  var arrFull = Array.from(arguments);
  //flatten the array using .reduce()
  var arrFlat = arrFull.reduce(function(x,y){
    
    return x.concat(y);
    
  });
  //create new array with unique entries
  arrFlat.reduce(function(allNumbers, number){
    //
    if(number in allNumbers){
      //do nothing if there is already a number in allNumbers
    } else {
      //if we find unique number, we push it into 
      test.push(number);
    }
    //return modified array to preserve additions
    return test;
    //don't forget to add {}/[] - it is optional second argument 
    //(sets starting value of accumulator(in this instance, 'allNumbers))
  },{});
  
  
 //go get beer!... and don't forget to consider going vegan while you are at it 
 return test;
  
}

uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]);

// -------------------  10 ----- 
//--------------------- 11 -----  use .replace and regEx to replace symbols in stings, also chain method


function convertHTML(str) {
  //elements to be replaced & unicode numbers for them
  
  /* html  \u{hhhhh}
  & &amp; 00026
  < &lt; 0003C
  > &gt; 0003E
  " &quot; 00022
  ' &apos; 00027 
  */
 
//let's chain .replace()
//for elements  that occur more than once (eg "<"), we use regEx with global parameter /g
//we also use regEx and unicode for 'tricky' elements like quotes and apostrophes
//in order to use unicode matching we have to add /u 'flag' 
var test = str.replace("&","&amp;").replace(/\u{0003C}/ug, "&lt;").replace(">","&gt;").replace(/\u{00022}/ug,"&quot;").replace(/\u{00027}/ug,"&apos;"); 
  
 // win 
  return test;
}

convertHTML('Stuff in "quotation marks"');

// -------------------  12 ----- practice using boundaries in RegEx

function spinalCase(str) {
    
  // Matches a non-word boundary. This is a position where the previous and next character are of the same type: Either both   must be words, or both must be non-words. Such as between two letters or between two spaces. The beginning and end of a     string are considered non-words. Same as the matched word boundary, the matched non-word bondary is also not included in     the match.

  //For example, /\Bon/ matches "on" in "at noon", and /ye\B/ matches "ye" in "possibly yesterday".
  //\s matches whitespace
  str = str.replace(/\B([A-Z])/g, " $1").replace(/\s/g,"-").replace(/_/g, "").toLowerCase();
  
  return str;
}

spinalCase('The_Andy_Griffith_Show');

// -------------------  13 ----- create fibonacci number generator

function sumFibs(num) {
  
  var arr= [1,1];
  var limit = 0;
  
  //function
  function fibo (x){
    var test =[];
    //take last two items in array
    test = arr.slice(-2,arr.length);
    
    
    //reduce those two items to one
    limit = test.reduce(function(sum,current){
      return sum + current;
    });
    //push it to the end of array if the limit number is below or equal 'num'
    if(limit<=num){
      arr.push(limit);
    } else{return;}
    
  }
  //repeat function until 'limit' number exceeds 'num'
  //every time loop runs, it updates limit and at the end, number i is made equal to new limit
  for(i=0; i < num; i=limit){
    
      fibo(num);
  
  }
  
 //filter out even numbers
  var odd =arr.filter(function(x){
    
   return x % 2 !==0;
    
  });    
    
  //reduce array with odd number to one number
  //drink beer and go vegan because it's cool, and good, and righteous, and it's freaking 2017, leave narrowminded traditions behind
  return odd.reduce(function(total, number){
    return total + number;
  });
}

sumFibs(75025);


// -------------------  14 -----  find prime numbers
// I obtained this function from http://stackoverflow.com/questions/11966520/how-to-find-prime-numbers-between-0-100
// I couldn't come up with my own solution, so I analysed this one, and ow boy, it's so simple, yet so slick.

function sumPrimes(num) {
  
  function getPrimes(max) {
    var sieve = [];
    var primes = [];
    
    //we start with outer loop, with i=2, as this is the first prime number
    // ++i is not the same as i++, although in this case it makes no difference (from what i can tell)
    //normally ++i would increment i before is is used (i++ would use i for operation, and increment after)
    //since third operator in loop gets incremented after each iteration finishes, it makes no difference
    for (i = 2; i <= max; ++i) {
        //returns 'true' if sieve[i] is false, undefined or NaN
        //if sieve[i] returns true, number or string it will return 'false' (because of ! negation)
        if (!sieve[i]) {
            // i has not been marked -- it is prime
            primes.push(i);
            //left shift <<
            //Shifts 'i' in binary representation '1' (< 32) bits to the left, shifting in zeroes from the right
            //no idea what that means, but it's a fancy way of doing Math.floor(i) * 2 essentially.
            //if we changed to i << 2, it would turn into Math.floor(i) * 4 ... and so on
            // we dont have to use << operator, it simply reduces number of unnecessary iterations
            //
            //we increment j by i on each iteration
            for (j = i << 1; j <= max; j += i) {
                //we set j as true, and each incrementation of j by i
                //so if i =2, we will set all numbers divisible by 2 to 'true' / number / string 
                //and hence they will be rejected in outer loop
                sieve[j] = 'not prime';
                
            }
          
        }
    }
    return primes;
}
 
  
return  getPrimes(num).reduce(function(sum, num){
  return sum+num;
});

sumPrimes(977);

// -------------------  15 -----  smallest common multiple

function smallestCommons(arr) {
  //sorted arr
  var arr2=[];
  //range of examined number that needs to be prime factorized
  var arr3=[];
  //using only short array of prime numbers instead of generating them myself
  var prime =[2, 3, 5, 7, 11, 13, 17, 19, 23];
 
  var test =[];
  var test2 =[];
  
  
  //order array, smallest to highest
  arr2 = arr.sort(function(a,b){
    return a-b;
  });
  
  
  //create array with numbers in the range
  for(i=arr[0]; i<=arr[1]; i++){
    arr3.push(i);
    
  }
  
  var arrFinal=[];

   for(j=0; j < arr3.length; j++){
     //we set this variable, because we will modify arr3[j] later on, and that broke loop after second iteration(line 44)
     var divider = arr3[j];
      //first we need to find prime factors of each number
       for(i=0; i<prime.length;){
  
        if(arr[j] == 1){
          break;
        } else {
          //if we can divide evenly, that means we found prime factor
          if(arr3[j] % prime[i] === 0){
            //push prime number into holding array
             
              test.push(prime[i]);
              
                //check if all multiplications of prime numbers already add up to number we are factoring
                if(test.reduce(function(z,f){return z * f;}) / divider === 1){
                  break;
                } else{
              //if not, adjust the number we examine (get the rest after factoring)    
              arr3[j] = arr3[j] / prime[i];
                  }

          }
          //check if we can divide evenly with the same number again, if not, start iteration with i+1
          if(arr3[j] % prime[i] !== 0){
                i++;
              }


          }
          
       }
     //after we find prime factors for given number, we nest them as a separate array into 'arrFinal'
     arrFinal.push(test);
     //reset 'test' array for another iteration of outer loop
     test =[];
   }
  
  //flatten the 'arrFinal'
  var flat = arrFinal.reduce(function(a,b){
                      return a.concat(b);                 
                      });
  
  
  
  
  //remove duplicates from the flattened array
  
  var arrT =[];
  for(i=0; i<flat.length; i++){
    var a =flat[i];
    arrT[a] = arrT[a] ? a:a ;
    
  }
  
  //lets remove invalid entries, and now we have array with unique prime numbers that we found during factorization
  var keys = arrT.filter(function(a){
    return a !== null;
  });
  
  
  
  //array to hold MAX count of given prime number
  var g = [];
  
  
  //loop through array with unique prime numbers
  keys.forEach(function(key){
    
    //outer array to hold counts of prime numbers 
    var h = [];
    //loop through nested array
    for(i=0; i<arrFinal.length; i++){
      var c = arrFinal[i];
      //we define count variable
      var count = 0;
      
      //loop that goes through each element in nested array
      //we compare 'element' from 'keys array' to each element in nested array, if it matches, we increment count by 1
      for(j=0; j<c.length; j++){
          var d = c[j];
          if(d==key){
            count++;
          }
      }
      //once we have count of given key for given nested array, we push it to a holding array
      h.push(count);
      //we need to reset count before running next iteration
      count =0;
    }
      //using the spread operator we can access array via arguments? or something, I dont really remember
      //we find the highest number.
      //this number is the max factor of given prime number (we need max numbers, so we can multiply them and reject lower //counts - read on prime factorization if you forgot why I've done this in the first place)
      var n = Math.max(...h);
      //now we know how many times we need to multiply given 'key' by itself
      //lets use power method .pow(number, toPower)
      //also lets push it into final holding array (we have a lot of these here)
      g.push(Math.pow(key,n));
      
  });
  //finally, lets multiply all the contents (prim factors of original numbers to nTh power)
  //DONE! 
  return g.reduce(function(x,y){
    return x *y;
  });
  
}
  

smallestCommons([1, 13]);



// -------------------  16 -----   FLATTEN ARRAYS

function steamrollArray(arr) {

  
  //lets create a wrapping function, which we can call during .reduce method
  var test = function (arr) {
    //standard reduce method
    return arr.reduce(function(a,b){
      //ternary operator for brevity, 
      //we test if current element is an array
      //our goal is to pass only values, not arrays 
      //if we get 'true', we need to reduce it further, so we pass the currently tested element through our function until         //we fail Array.isArray test-- in that case, we pass this value into defined array (empty array)
      return a.concat(Array.isArray(b) ? test(b) : b);
      // ',[]' -- this is an initial value for first element, if we don't specify it, first element in the array would be         //used( and we dont want that because, if the first element is a nested array itself, it will not get reduced to a           //value)
    },[]);
    
  };
  
  
  
  //just to  be clear, I WOULD NEVER THOUGHT OF IT ON MY OWN. I've discovered (euphemizm for plagiarizm) this method on 
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  return test(arr);

}

steamrollArray([[["a"]], [["b"]]]);

// -------------------  17 ----- translate binary code to ascii


function binaryAgent(str) {
  //binary code rules
  // 10000000 - 128
  // 01000000 - 64
  // 00100000 - 32
  // 00010000 - 16
  // 00001000 - 8
  // 00000100 - 4
  // 00000010 - 2
  // 00000001 - 1
  
  //lets split or string so we can iterate over it easily
  var arr = str.split(" ");
  //declare holding array 
  var result= [];
  //function that iterates over 8 characters, and if any character is equal to 1
  //it calculates the value based on the position in the 8 character chain
  function binary(x){
    //set the count to 0
    var count =0;
    //iterate over the 8 char chain.
    for(i=0; i<=7; i++){
      // 2 to 7th power = 128, so all we have to do, is decrease power with each iteration
      //by one, and add up all results to get charCode for given bit
      var n = (7-i);
      //if we have '1'
      if(x.charCodeAt(i)==49){
        //the further we go in the iterations, the lower the 'n' value gets
        //up to n =0 which always gives '1'
        count = count + Math.pow(2,n);
        
      }
    }
    //once we get a 'result', which is an ascii code equivalent, we can convert it to 
    //normal character and push it into our holding array
    result.push(String.fromCharCode(count));
    
  }
  //lets iterate over main array and apply our function to each element
  for(j=0; j<arr.length; j++){
    binary(arr[j]);   
  }
  //convert holding array to a string
  //get a beer
  return result.join("");
 
  
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");



// -------------------  18 ----- 


function truthCheck(collection, pre) {
  
  
  
  function sexy(x){
    //lets define inner ternary operator for clarity
    //if(value) will return 'true' for primitive values, 'false' for NaN, undefined, 0, ""
    //this simple test will tell us if the property has valid value
    var inner = (collection[x][pre]) ? true : false;
    //first we test if the property exists for the object 'x'(x will be loop index)
    return collection[x].hasOwnProperty(pre)  ? inner : false; 
  }  

  
  //we wrap loop in function, if the loop will not return 'false', than we can return 'true' once it finishes 
  function test (){
    for(i=0; i<collection.length; i++){
      //we test if loop returns at any point 'false', if it does, we can return 'false' and be done with it
      if(!sexy(i)){
        return false;
      }
    
    }
    //if the loop didn't brake prematurely, we can return 'true' (thats why we included loop in a wrapper function)
    return true;
  }
  //call the function, get a beer and ponder meaning of life
  return test();
}

truthCheck([{"user": "Tinky-Winky", "sex": "dsaj"}, {"user": "Dipsy", "sex": "male"}, {"user": "Laa-Laa", "sex": "female"}, {"user": "Po", "sex": "female"}], "sex");

// -------------------  19 ----- closures, test for undefined values

//we define arguments in outside function as 'x' & 'y' // not sure if we have to...
function addTogether(x,y) {
  
 
  //first test if isNaN, if false (ie. it is a number), multiply arguments by 1, and strict compare to original args,
  //even if "2" passess first isNaN test, it will fail strict comparison test. 
  
  
  //first, lets test if we have more than one argument, if we do, just return sum of arguments
  if(arguments.length > 1 ){
          console.log(!isNaN(arguments[0]));
          if(isNaN(arguments[0])){
                return "undefined";
              } else if (isNaN(arguments[1])){
                return "undefined";
              } else {
                return x+y;
              }
          
      
  } else {
    //RETURN function, because we have closure, first argument (x) will be preserved in memory,
    //once the function is returned, it executes, taking in second argument(y), and adding it to the first one (x)
    return function add (y){
      return x +y;
    };
    
  }
  
  
  
  
  
}

addTogether("2",3);

// -------------------  20 ----- closures, return function, test for non numbers

//we define arguments in outside function as 'x' & 'y' // not sure if we have to...
function addTogether(x,y) {
  
 
  //lets define z for brevity in future
  var z = arguments;
  //function that will check if argument multiplied by '1' will return the same result
  //if value is other than primitive number, js will 'massage' the value to make the multiplication possible
  //so if we compare it after multiplication, using strict comparison (===), we can test if value is a number or not
  function check (z){
    //i didn't use loop (only two values, so I feel it's clearer this way) 
    if((z[0]*1) !== z[0]){
      return undefined;
    } else if((z[1]*1) !== z[1]){
      return undefined;
    } 
    //if both arguments pass the test, we can return addition
    return x + y;
    
  }
  
  
  //we will call the 'check' function only if there are two arguments
  if(arguments.length > 1 ){
     //my initial mistake was calling the function...without 'return', it took me TWO DAYS to figure out why the goddamn function
    //didn't do what it was suppouse to do...seriously..
     return check(z);
    
    //if we have only one argument  
  } else {
    //all we have to do is to test if first argument is a 'NaN' (this is very weak test, I'm using it to weed out strings etc)
    if(isNaN(z[0])){
      return undefined;
    }
    
    //RETURN function, because we have closure, first argument (x) will be preserved in memory,
    //once the function is returned, it executes, taking in second argument(y), and adding it to the first one (x)
    return function add (y){
      //we test second argument only if we include test in returned function(we have no access to 'y' at first iteration)
      if(y*1 !== y){
        return undefined;
      }
    
      return x +y;
    };
    
  }
  
}

addTogether(2, "3");

//--------------------------------------************   END OF INTERMEDIATE ALGORITHMS    *********-----------------------------
