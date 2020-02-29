/* MATRIX CREATION */
var matrix = {
  /*
  TO DO:
    - Rotation Matrices
 
    - matrix.p.det

    - More Properties?
    - More Operations?

    -JS-DOC
  */
  make: { //2D square matrix
    identity: function(dimX, dimY){
      dimY = (dimY)? dimY : dimX;
      let m = matrix.make.empty(dimX, dimY);
      for(let i = 0; i < dimX; i++){
        for(let j = 0; j < dimY; j++){
          m[i][j] = (i == j)? 1 : 0;
        }
      }
      return m;
    },
    zero: function(dimX, dimY){
      dimY = (dimY)? dimY : dimX;
      let m = matrix.make.empty(dimX, dimY);
      for(let i = 0; i < dimX; i++){
        for(let j = 0; j < dimY; j++){
          m[i][j] = 0;
        }
      }
      return m;
    },
    empty: function(dimX, dimY){
      dimY = (dimY)? dimY : dimX;  
      let m = [];
      for(let i = 0; i < dimX; i++){
        m.push(new Array(dimY));
      }
      return m;
    },
    copy: function(m){
      let c = [];
      let dim = matrix.p.size(m);
      for(i=0; i < dim.x; i++){
          c.push([]);
          for(j = 0; j < dim.y; j++){
              c[i][j] = m[i][j];
          }
      }
      return c;
    }
  },

  p: {  //Properties
    size: function(m){
      try{
        return createVector(m.length, m[0].length);
      }
      catch(error){
        console.log(error);
        return createVector(undefined, undefined);
      }
    },
    isSquare: function(m){
      try{
        let size = matrix.p.size(m);
        if(size.x == undefined || size.y == undefined){
          throw "Undefined size of matrix";
        }
        return size.x == size.y;
      }
      catch(error){
        console.log(error);
        return false;
      }

    },
    getRow: function(m, row){
      try{
        let r = [];
        for(let i = 0; i < m.length; i++){
          r.push(m[i][row]);
        }
        return r;
      }
      catch(error){
        console.log(error);
        return null;
      }
    },
    getCol: function(m, col){
      try{
          
        let r = [];
        for(let j = 0; j < m.length; j++){
          r.push(m[col][j]);
        }
        return r;
      }
      catch(error){
        console.log(error);
        return null;
      }
    },

    det: function(m){
      try{
        if(m.length == 1){
          return m[0][0];
        }
        d = 0;
        for(let i = 0; i < m.length; i++){
          //d += m[i][0] * matrix.p.det();
        }
      }
      catch(e){
        console.log(e);
      }
    },

    subMatrix(m, posI, dimSubMx, dimSubMy){
      try{ 
        dimSubMy = (dimSubMy)? dimSubMy : dimSubMx;
        let n = matrix.make.empty(dimSubMx, dimSubMy);
        for(let i = 0; i < dimSubMx; i++){
          for(let j = 0; j < dimSubMy; j++){
            n[i][j] = m[posI.x + i][posI.y + j];
          }
        }
        return n;
      }
      catch(error){
        console.log(error);
        return null;
      }
    }
  },

  o: {
    add: function(a,b){
      try{
        let range = matrix.p.size(a).x;
        let m = matrix.make.zeroMatrix(range);
        for(let i = 0; i < range; i++){
          for(let j = 0; j < range; j++){
            m[i][j] = a[i][j] + b[i][j];
          }
        }
        return m;
      }
      catch(error){
        console.log(error);
        return null;
      }
    },
    mult: function(a, b){
      try{ // a and b with same dimensions or matrix * scalar, else error
        if(!Array.isArray(a) || !Array.isArray(b)){
          console.log("Scalar detected, attempting scalar multiplication")
          return matrix.o.scalar(a, b);
        }
        let sizeA = matrix.p.size(a);
        let sizeB = matrix.p.size(b);
        if(sizeA.x != sizeB.y){
          throw "not the same dimensions";
        }

        //let range = sizeA.x;
        let m = matrix.make.empty(sizeB.x, sizeA.y);
        for(let i = 0; i < sizeB.x; i++){
          for(let j = 0; j < sizeA.y; j++){
            m[i][j] = vector.escalar(matrix.p.getRow(a, i), matrix.p.getCol(b, j));
          }
        }
        return m;
      }
      catch(error){
        console.log(error);
        return null;
      }
    },
    sub: function(a, b){
      return matrix.o.add(a, matrix.o.scalar(b, -1));
    },
    scalar: function(n, o){
      try{
        let a = (Array.isArray(n))? n : o; //matrix
        let b = (Array.isArray(n))? o : n; //scalar

        let range = matrix.p.size(a).x;
        let m = matrix.make.zeroMatrix(range);
        for(let i = 0; i < range; i++){
          for(let j = 0; j < range; j++){
            m[i][j] = a[i][j] * b;
          }
        }
        return m;
      }
      catch(error){
        console.log(error);
        return null;
      }
    },
    removeRow: function(m, row){
      try{
        let size = matrix.p.size(m); 
        let n = matrix.make.empty(size.x - 1, size.y);
        for(let i = 0, iN = 0; i < size.x; i++){
          if(i != row){
            for(let j = 0; j < size.y; j++){
              n[iN][j] = m[i][j];
            }
            iN++;
          }
        }
        return n;
      }
      catch(error){
        console.log(error);
      }
    },
    removeCol: function(m, col){
      try{
        let size = matrix.p.size(m); 
        let n = matrix.make.empty(size.x, size.y - 1);
        for(let i = 0; i < size.x; i++){
          for(let j = 0, jN = 0; j < size.y; j++){
            if(j != col){
              n[i][jN] = m[i][j];
              jN++;
            }
          }
        }
        return n;
      }
      catch(error){
        console.log(error);
      }
    },
    transpose: function(m){
      try{
        let size = matrix.p.size(m);
        let n = matrix.make.empty(size.y, size.x);
        for(let i = 0; i < size.y; i++){
          for(let j = 0; j < size.x; j++){
            n[j][i] = m[i][j];
          }
        }
        return n;
      }
      catch(error){
        console.log(error);
      }
    },
    inverse: function(m){
      //http://blog.acipo.com/matrix-inversion-in-javascript/
      // I use Guassian Elimination to calculate the inverse:
      // (1) 'augment' the matrix (left) by the identity (on the right)
      // (2) Turn the matrix on the left into the identity by elemetry row ops
      // (3) The matrix on the right is the inverse (was the identity matrix)
      // There are 3 elemtary row ops: (I combine b and c in my code)
      // (a) Swap 2 rows
      // (b) Multiply a row by a scalar
      // (c) Add 2 rows
      
      try{
        let dim = matrix.p.size(m);    
        //if the matrix isn't square: exit (error)
        if(dim.x !== dim.y){throw "Error, not same dimension";}

        dim = dim.x;//square mtrix => dim.x == dim.y
        //create the identity matrix (I), and a copy (C) of the original
        let I = matrix.o.transpose(matrix.make.identity(dim));
        let C = matrix.make.copy(m);

        // Perform elementary row operations
        for(let i = 0; i < dim; i++){
            // get the element e on the diagonal
            let e = C[i][i];
            
            // if we have a 0 on the diagonal (we'll need to swap with a lower row)
            if(e == 0){
                //look through every row below the i'th row
                for(let ii = i + 1; ii < dim; ii++){
                    //if the ii'th row has a non-0 in the i'th col
                    if(C[ii][i] != 0){
                        //it would make the diagonal have a non-0 so swap it
                        for(let j = 0; j < dim; j++){
                            e = C[i][j];       //temp store i'th row
                            C[i][j] = C[ii][j];//replace i'th row by ii'th
                            C[ii][j] = e;      //repace ii'th by temp
                            e = I[i][j];       //temp store i'th row
                            I[i][j] = I[ii][j];//replace i'th row by ii'th
                            I[ii][j] = e;      //repace ii'th by temp
                        }
                        //don't bother checking other rows since we've swapped
                        break;
                    }
                }
                //get the new diagonal
                e = C[i][i];
                //if it's still 0, not invertable (error)
                if(e == 0){return}
            }
            
            // Scale this row down by e (so we have a 1 on the diagonal)
            for(let j = 0; j < dim; j++){
                C[i][j] = C[i][j]/e; //apply to original matrix
                I[i][j] = I[i][j]/e; //apply to identity
            }
            
            // Subtract this row (scaled appropriately for each row) from ALL of
            // the other rows so that there will be 0's in this column in the
            // rows above and below this one
            for(let ii = 0; ii < dim; ii++){
                // Only apply to other rows (we want a 1 on the diagonal)
                if(ii == i){continue;}
                
                // We want to change this element to 0
                e = C[ii][i];
                
                // Subtract (the row above(or below) scaled by e) from (the
                // current row) but start at the i'th column and assume all the
                // stuff left of diagonal is 0 (which it should be if we made this
                // algorithm correctly)
                for(let j = 0; j < dim; j++){
                    C[ii][j] -= e*C[i][j]; //apply to original matrix
                    I[ii][j] -= e*I[i][j]; //apply to identity
                }
            }
        }
        
        //we've done all operations, C should be the identity
        //matrix I should be the inverse:
        return I;
      }
      catch(error){
        console.log(error);
        return null;
      }
    }
  }
}

vector = {
  arrSum: function(arr){ //[1,3,3] -> 7
    try{
      return arr.reduce(function(a,b){
        return a + b;
      }, 0);
    }
    catch(error){
      console.log(error);
      return null;
    }
  },
  escalar: function(u, v){
    try{
      let e = 0;
      for(let i = 0; i < u.length; i++){
        e += u[i] * v[i];
      }
      return e;
    }
    catch(error){
      console.log(error);
      return null;
    }
  }
}
// function det(m){
//   try{
//     let size = matrix.p.size(m);
//     order = size.x;
//     let matrix = matrix.make.empty(order);
//     System.out.println("Enter the elements of 3x3 matrix");
//     int i,j;
//     for(i=0;i<matrix.length;i++){
//         for(j=0;j<matrix[i].length;j++){
//             try{
//                 matrix[i][j]=Integer.parseInt(br.readLine());
//             }
//             catch(Exception e){
//                 System.out.println("An error occured. Please retry");
//                 return;
//             }
//         }
//     }
//     int determinant,x,y,z;
//     x=(matrix[0][0] * (matrix[1][1] * matrix[2][2]
//                     - matrix[1][2] * matrix[2][1]));
//     y=(matrix[0][1] * (matrix[1][0] * matrix[2][2]
//                     - matrix[1][2] * matrix[2][0]));
//     z=(matrix[0][2] * (matrix[1][0] * matrix[2][1]
//                     - matrix[1][1] * matrix[2][0]));
//     determinant= x - y + z;
//     System.out.println("The modulus of the given matrix is "+ determinant);
//     }
//     catch(error){
//       console.log(error);
//       return null;
//     }
// }