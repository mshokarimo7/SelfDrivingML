/* What linear interpolation(lerp) does is that it takes the x.left, x.right
and the ratio of number of lanes and draws the correcsponding x coordinates 
of where each lane should be, depending on the number of lanes we want for 
a give width(width is between x.left and x.right)
*/
function lerp(A, B, t){
    return A + (B-A)*t;
}

function getIntersection(A, B, C, D){
     
}
