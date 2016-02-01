# InfinitePhoto
A picture within a picture within picture



This is the polygon fill branch. It's nice that the other branch works, but we may want to have the ability to draw a quadrilateral instead of have it always be a rectangle. That'd be nice because there's a lot of pictures like Sam's profile picture that have pictures in the background that aren't perfectly square.

Specs: Click on the canvas, and it'll draw a point there. Four points and it'll highlight a polygon.
Maybe when you click the fourth time, you lose the option to click, it highlights the shape for you, and two buttons appear: try again, and select repeating section. Try again allows you to make a new polygon,   select repeating section picks the rectangle that you want to copy paste, and when you do that, you can click transform. You could also press go-back, to select the rectangle again.

http://www.geometrictools.com/Documentation/PerspectiveMappings.pdf
That's gonna suck.

We're assuming the quadrilateral is because there's a rectangle that you're looking at funny.

So, there's two things that happen, it can be on a slanted wall, and it can be sort of at an angle on the slanted wall. This stuff is tough!

I can't get perfect depth, because it could be small and close or big and far, but I will want the angles.

Well, one way to figure it out is do it one way and back out the answer with inverse matrices.

There are actually three angles that matter, there's also the one that I have to look at to see it. Like up/down. But we can assume it's level with the camera.

Maybe it needs to be a parallelogram. A rhombus might make sense. No, it's got to be more general. But not fully general, because it has to be convex and it has to be something else too.

Well, we can fix one part of the equation by saying how far the plane is from the origin at its closest. Let's say it's a unit distance. And everything is clearly ahead of us, so it's only 1 hemisphere we worry about. We put down three points, and they make some angle between them. That should be enough to determine something about the plane, like the 3d angle of it's normal vector. And then you
can figure out where each point goes on it, and then you can figure out where the fourth goes. What up.

Nope, that's not enough. Think about all the ways you could make a L,U right angle. You could swing the door away from you and it'd be the same if the top was eye level.

Maybe first we make the assumption that the wall is straight up, and the rectangle is flat on the wall? 

To probably a good approximation, you can rotate it until the back line is straight up. And then just trace lines from one side to the other. But, 
that's annoying for a few reasons, one of which is that it'll look distorted, and the other is that you can't know the height/width ratio.


WE ARE ABSOLUTELY PUTTING THIS AS A DEFAULT PICTURE

https://scontent-lga3-1.xx.fbcdn.net/hphotos-xpt1/v/t1.0-9/12074975_10208059570109689_9060645724821529286_n.jpg?oh=a30f0dbb19ed384b4f2a72ab9c48e044&oe=5732F044


Dad suggestion: ability to add picture frame




## IT'S TOUGH, BUT I'M GOING TO TRY AND WRITE OUT SOME DESCRIPTION OF HOW TO MAP A RECTANGLE TO A QUADRILATERAL

So, there are four sides to this picture, you need to somehow pick which side corresponds to which. That's not too hard.

Then, we do it like you'd do a bezier curve. The first thing is to divide the 'top' and 'bottom' into equal parts, no based on their real length but based on their supposed length in real life. You can do this by using the concept of a horizon point. In other words, how far you walk along it across depends on how far
apart the top and the bottom are. The closer a vertical bar is, the taller it'll be, and also the longer one horizontal inch will look.

Let's scale it to 1000*1000, then even when we mess everything up by sampling badly, it works out well. We can also give each one a length, and then do iteration and interpolation, because we're lazy as hell. Or, we can do it with math, which is probably a better idea. There's probably an easy integral, and I don't want to become a lazy thinker.


Oh wait, there's definitely a way to do this with CSS!!!!! I remember there's all of these crazy 3d rotation tools. So, maybe I should think about those instead of these. I could probably do it with iteration and regression instead of with solving.

That's something big to think about. Don't reinvent the wheel Samuel.


Projective geometry gives you a way to turn any parollelogram into a square. As well as the inverse apparently. That's a little concerning because that probably means you can make it into any rectangle.

It's sort of the opposite of this, you take a rectangle and rotate it so that it's projection covers some crazy quadrilateral.

I may need another constraint on this, like making it as close as possible.

http://math.stackexchange.com/questions/13404/mapping-irregular-quadrilateral-to-a-rectangle

That's good, but not exactly what I want.

" 
Not all rectangles are achievable by pointing a camera at a rectangle. So ignore one of the corner-points and then do a linear transform (along with a translation to match up the origin) to match up the remaining triangle. The fourth point will magically end up where it should be. I would make this an answer, but I can't be bothered to actually work out which matrix I need.

That's a good answer. Something like, they all need to be right angles, so
each one tells you its orientation in at least one way. And then maybe there's some sort of constraint thing you can do.
"

http://opencv-code.com/tutorials/automatic-perspective-correction-for-quadrilateral-objects/

OH YES!


I think the angle thing is a good idea. If you have a right angle that looks like it's not a right angle, it tells you something about its orientation. For starters, two things across from each other should by all rights have the same angle, but they probably won't, because they're different distances away. Also important is that if you rotat the rectangle around any of the sides, the angles attached won't change. So, if something looks right angled, and you rotate the shape around that corner, it'll change the orientation of the angle, but not the absolute angle itself. If something is a right angle, it tells you that the ray from your eye to the corner is perpendicular to one of the sides!

So, what do you learn from opposing corners? I really don't know, it's too tough for me. 


For now, I think that I'll assume vertical alignment.







