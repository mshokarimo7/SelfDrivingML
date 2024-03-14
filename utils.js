/* What linear interpolation(lerp) does is that it takes the x.left, x.right
and the ratio of number of lanes and draws the correcsponding x coordinates 
of where each lane should be, depending on the number of lanes we want for 
a give width(width is between x.left and x.right)
*/
function lerp(A, B, t){
    return A + (B-A)*t;
}

function getIntersection(A, B, C, D){

    /*
    Ix = Ax + (Bx - Ax)t = Cx + (Dx - Cx)u
    Iy = Ay + (By - Ay)t = Cy + (Dy - Cy)u

    Ax + (Bx - Ax)t = Cx + (Dx - Cx)u / - Cx
    (Ax - Cx) + (Bx - Ax)t = (Dx - Cx)u    'replacement'


    Ay + (By - Ay)t = Cy + (Dy - Cy)u / - Cy
    (Ay - Cy) + (By - Ay)t = (Dy - Cy)u / * (Dx - Cx)
    
    (Dx - Cx) (Ay - Cy) + (Dx - Cx)(By - Ay)t = 
    (Dy - Cy)(Dx - Cx)u                     Replacing (Dx - Cx)u with 'replacement'

    (Dx - Cx) (Ay - Cy) + (Dx - Cx)(By - Ay)t = 
    ((Ax - Cx) + (Bx - Ax)t) (Dy - Cy)

    (Dx - Cx)(Ay - Cy) + (Dx - Cx)(By - Ay)t = 
    (Dy - Cy)(Ax - Cx) + (Dy - Cy)(Bx - Ax)t / - (Dy - Cy)(Ax - Cx)
                                             / - (Dx - Cx)(By - Ay)t

    (Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx) = 
    (Dy - Cy)(Bx - Ax)t - (Dx - Cx)(By - Ay)t

    top = (Dx - Cx)(Ay - Cy) - (Dy - Cy)(Ax - Cx)
    bottom = (Dy - Cy)(Bx - Ax) - (Dx - Cx)(By - Ay)
    */

   const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
   const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
   const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

   if(bottom != 0){

    const t = tTop/bottom; 
    const u = uTop/bottom; 

    if(t >= 0 && t <= 1 && u >= 0 && u <= 1){
        return {
            x: lerp(A.x, B.x, t),
            y: lerp(A.y, B.y, t),
            offset: t
            }
        }
    }
   return null;
}