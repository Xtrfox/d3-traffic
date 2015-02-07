from numpy import *
from matplotlib import pyplot as plt

fn= "../data/data_provinces.csv"


name,region=loadtxt(fn, unpack=True,delimiter=',',skiprows=1,dtype='a',usecols=arange(2))
population,lifeExpectancy,incomePerCapita,expenditurePerCapita=loadtxt(fn, unpack=True,delimiter=',',skiprows=1,usecols=arange(4)+(2))



region_list=unique(region)
color_list=array(['red','blue','green','red','blue', 'green', 'red','blue','green','red','blue', 'green', 'red','blue','green', 'red','blue'])
colors=zeros(len(name),dtype='a')
for i in arange(len(name)):
   colors[i]=color_list[region_list==region[i]][0]
    
plt.clf()
plt.scatter(incomePerCapita,lifeExpectancy,s=population/min(population)*20,alpha=0.5,c=colors)
plt.show()