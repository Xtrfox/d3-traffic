# -*- coding: utf-8 -*-
# simple horizontal bar chart example
from numpy import *
from matplotlib import pyplot as plt

nickname=array(['Gary','Reina','Glen'])
age=array([30,40,25])

# plot horizontal bar chart
# matplotlib.pyplot.barh(bottom, width, height=0.8, left=None, hold=None, **kwargs)¶

ypos = arange(len(nickname))

plt.clf()
plt.barh(ypos, age[::-1], align='center')
plt.yticks(ypos, nickname[::-1])
plt.xlim((0,45))
plt.xlabel("Age")
plt.show()