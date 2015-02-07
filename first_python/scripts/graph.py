print "Hello World"
from numpy import *
from matplotlib import pyplot as plt

#xvar = array([1,2,3,4,5])
#yvar = xvar*2

xvar,yvar=loadtxt("../data/data.csv", unpack=True,delimiter=',')


plt.clf()
plt.plot(xvar,yvar,'ko')
plt.xlim((0,6))
plt.ylim((0,12))
plt.xlabel("variable X")
plt.ylabel("variable Y")
plt.title("My First Python table")
plt.savefig("data.pdf")
plt.show()